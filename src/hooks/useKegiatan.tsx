import { useState, useCallback } from 'react';
import useSWR from 'swr';
import { Kegiatan, ApiResponse } from '@/types';

interface KegiatanResponse {
  kegiatan: Kegiatan[];
}

const fetcher = async (url: string): Promise<KegiatanResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorData: ApiResponse = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  const data: ApiResponse<Kegiatan[]> = await response.json();
  return {
    kegiatan: data.data || []
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

interface UseKegiatanProps {
  isAdmin?: boolean;
}

export const useKegiatan = ({ isAdmin = false }: UseKegiatanProps = {}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data, error, isLoading, isValidating, mutate } = useSWR<KegiatanResponse>(
    '/api/kegiatan',
    fetcher,
    swrConfig
  );

  const kegiatan = data?.kegiatan || [];

  // Debugging: Log koneksi Firebase
  console.log('🔥 Firebase Connection Debug (useKegiatan):', {
    kegiatan,
    isLoading,
    isValidating,
    error: error?.message,
    hasData: kegiatan.length > 0,
    apiResponse: data,
    timestamp: new Date().toISOString()
  });

  const createKegiatan = useCallback(async (kegiatanData: Omit<Kegiatan, 'id'>) => {
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/kegiatan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(kegiatanData),
      });

      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal membuat kegiatan.');

      await mutate();
      return { success: true, message: 'Kegiatan berhasil dibuat.' };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Gagal membuat kegiatan.';
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [isAdmin, mutate]);

  const updateKegiatan = useCallback(async (id: string, kegiatanData: Partial<Kegiatan>) => {
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/kegiatan/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(kegiatanData),
      });

      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal mengupdate kegiatan.');

      await mutate();
      return { success: true, message: 'Kegiatan berhasil diupdate.' };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Gagal mengupdate kegiatan.';
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [isAdmin, mutate]);

  const deleteKegiatan = useCallback(async (id: string) => {
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/kegiatan/${id}`, {
        method: 'DELETE',
      });

      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal menghapus kegiatan.');

      await mutate();
      return { success: true, message: 'Kegiatan berhasil dihapus.' };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Gagal menghapus kegiatan.';
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [isAdmin, mutate]);

  const refreshKegiatan = useCallback(async () => {
    await mutate();
  }, [mutate]);

  const getKegiatan = useCallback(async () => {
    try {
      await mutate();
      return { success: true, data: kegiatan };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to fetch kegiatan' };
    }
  }, [mutate, kegiatan]);

  return {
    kegiatan,
    loading: isLoading,
    error: error?.message || null,
    isValidating,
    isSubmitting,
    createKegiatan,
    updateKegiatan,
    deleteKegiatan,
    refreshKegiatan,
    getKegiatan,
    mutate,
  };
};

