import { useState, useCallback, useMemo } from 'react';
import useSWR from 'swr';
import { AlumniShowcase, ApiResponse } from '@/types';

interface AlumniShowcaseResponse {
  alumniShowcase: AlumniShowcase[];
}

const fetcher = async (url: string): Promise<AlumniShowcaseResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorData: ApiResponse = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  const data: ApiResponse<AlumniShowcase[]> = await response.json();
  return {
    alumniShowcase: data.data || [],
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

interface UseAlumniShowcaseProps {
  isAdmin?: boolean;
}

export const useAlumniShowcase = ({ isAdmin = false }: UseAlumniShowcaseProps = {}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data, error, isLoading, isValidating, mutate } = useSWR<AlumniShowcaseResponse>(
    '/api/alumni-showcase',
    fetcher,
    swrConfig
  );

  const alumniShowcase = useMemo(() => data?.alumniShowcase || [], [data?.alumniShowcase]);

  const createAlumniShowcase = useCallback(async (payload: FormData) => {
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/alumni-showcase', {
        method: 'POST',
        body: payload,
      });

      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal menambah alumni showcase.');

      await mutate();
      return { success: true, message: 'Alumni showcase berhasil ditambahkan.' };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Gagal menambah alumni showcase.';
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [isAdmin, mutate]);

  const updateAlumniShowcase = useCallback(async (id: string, payload: FormData) => {
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/alumni-showcase/${id}`, {
        method: 'PUT',
        body: payload,
      });

      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal mengupdate alumni showcase.');

      await mutate();
      return { success: true, message: 'Alumni showcase berhasil diupdate.' };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Gagal mengupdate alumni showcase.';
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [isAdmin, mutate]);

  const deleteAlumniShowcase = useCallback(async (id: string) => {
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/alumni-showcase/${id}`, {
        method: 'DELETE',
      });

      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal menghapus alumni showcase.');

      await mutate();
      return { success: true, message: 'Alumni showcase berhasil dihapus.' };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Gagal menghapus alumni showcase.';
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [isAdmin, mutate]);

  return {
    alumniShowcase,
    loading: isLoading,
    error: error?.message || null,
    isValidating,
    isSubmitting,
    createAlumniShowcase,
    updateAlumniShowcase,
    deleteAlumniShowcase,
    mutate,
  };
};
