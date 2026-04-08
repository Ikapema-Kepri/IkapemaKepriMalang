import { useState, useCallback, useEffect } from 'react';
import useSWR from 'swr';
import { Anggota, ApiResponse, PaginationInfo } from '@/types';

interface AlumniResponse {
  members: Anggota[];
  pagination: PaginationInfo;
}

const fetcher = async (url: string): Promise<AlumniResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorData: ApiResponse = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  const data: ApiResponse<Anggota[]> = await response.json();
  return {
    members: data.data || [],
    pagination: data.pagination || {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      hasNext: false,
      hasPrev: false
    }
  };
};

const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 10000,
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  refreshInterval: 0,
  shouldRetryOnError: true,
  keepPreviousData: true,
};

interface UseAlumniProps {
  initialSearch?: string;
  itemsPerPage?: number;
}

export const useAlumni = ({ initialSearch = '', itemsPerPage = 20 }: UseAlumniProps = {}) => {
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Anggota>>({});
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(initialSearch);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);

      if (searchQuery !== debouncedSearch) {
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, debouncedSearch]);

  const buildApiUrl = useCallback(() => {
    const params = new URLSearchParams({
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
      sortBy: 'createdAt',
      order: 'desc'
    });
    
    if (debouncedSearch.trim()) {
      params.append('search', debouncedSearch.trim());
    }
    
    return `/api/alumni?${params.toString()}`;
  }, [currentPage, itemsPerPage, debouncedSearch]);

  const { data, error, isLoading, isValidating, mutate } = useSWR<AlumniResponse>(
    buildApiUrl(),
    fetcher,
    swrConfig
  );

  const members = data?.members || [];
  const pagination = data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNext: false,
    hasPrev: false
  };

  const fetchMembers = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await mutate();
    } finally {
      setTimeout(() => setIsRefreshing(false), 300);
    }
  }, [mutate]);

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus alumni ini?')) return;
    try {
      const response = await fetch(`/api/anggota/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData: ApiResponse = await response.json();
        throw new Error(errorData.message || 'Gagal menghapus alumni.');
      }
      if (data) {
        await mutate(
          {
            ...data,
            members: members.filter((m) => m.id !== id),
            pagination: {
              ...pagination,
              totalItems: pagination.totalItems - 1
            }
          },
          { revalidate: false }
        );
      }
      await mutate();

      if (members.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Gagal menghapus alumni.');
      await mutate();
    }
  };

  const handleEditClick = (member: Anggota) => {
    setEditId(member.id ?? null);
    setEditData({
      namaAnggota: member.namaAnggota,
      universitas: member.universitas,
      programStudi: member.programStudi,
      angkatan: member.angkatan,
      photoURL: member.photoURL || '',
      isActive: member.isActive ?? false,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    try {
      const payload = {
        ...editData,
        isActive: editData.isActive === true || (editData.isActive as unknown) === 'true',
      };
      const response = await fetch(`/api/anggota/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal mengedit alumni.');
      
      setEditId(null);
      setEditData({});
      
      await mutate();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Gagal mengedit alumni.');
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setEditId(null);
  };

  const handlePrevPage = () => {
    if (pagination.hasPrev) {
      setCurrentPage(currentPage - 1);
      setEditId(null);
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNext) {
      setCurrentPage(currentPage + 1);
      setEditId(null);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    const totalPages = pagination.totalPages;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const isInitialLoading = isLoading && !data;

  return {
    members,
    currentMembers: members,
    loading: isInitialLoading,
    error: error?.message || null,
    isValidating,
    isRefreshing,
    editId,
    editData,
    currentPage,
    itemsPerPage,
    totalPages: pagination.totalPages,
    totalItems: pagination.totalItems,
    hasNext: pagination.hasNext,
    hasPrev: pagination.hasPrev,
    startIndex: (currentPage - 1) * itemsPerPage,
    endIndex: Math.min(currentPage * itemsPerPage, pagination.totalItems),
    searchQuery,
    debouncedSearch,
    handleSearch,
    handleDelete,
    handleEditClick,
    handleEditChange,
    handleEditSubmit,
    cancelEdit,
    handlePageChange,
    handlePrevPage,
    handleNextPage,
    getPageNumbers,
    fetchMembers,
    mutate,
    setEditData,
  };
};
