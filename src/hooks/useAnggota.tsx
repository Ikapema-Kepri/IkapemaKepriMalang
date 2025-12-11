import { useState, useEffect } from 'react';
import { Anggota, ApiResponse } from '@/types';

export const useAnggota = () => {
  const [members, setMembers] = useState<Anggota[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Anggota>>({});
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(20);

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    setLoading(true);
    try {
      const response = await fetch('/api/anggota?limit=1000');
      if (!response.ok) {
        const errorData: ApiResponse = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse<Anggota[]> = await response.json();
      if (data.data) {
        setMembers(data.data);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Gagal memuat anggota.');
      }
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus anggota ini?')) return;
    try {
      const response = await fetch(`/api/anggota/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData: ApiResponse = await response.json();
        throw new Error(errorData.message || 'Gagal menghapus anggota.');
      }
      setMembers((prev) => prev.filter((m) => m.id !== id));
      // Reset to page 1 if current page becomes empty after deletion
      const newTotalPages = Math.ceil((members.length - 1) / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(1);
      }
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Gagal menghapus anggota.');
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
      isActive: member.isActive ?? true,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    try {
      const response = await fetch(`/api/anggota/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal mengedit anggota.');
      setEditId(null);
      setEditData({});
      fetchMembers();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Gagal mengedit anggota.');
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  // Pagination calculations
  const totalPages = Math.ceil(members.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = members.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setEditId(null); // Cancel any ongoing edit when changing pages
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setEditId(null);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setEditId(null);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
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

  return {
    members,
    currentMembers,
    loading,
    error,
    editId,
    editData,
    currentPage,
    itemsPerPage,
    totalPages,
    startIndex,
    endIndex,
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
  };
};
