import { useState, useCallback } from 'react';
import useSWR from 'swr';
import { Sambutan, ApiResponse } from '@/types';

interface SambutanResponse {
  sambutan: Sambutan | null;
}

const fetcher = async (url: string): Promise<SambutanResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorData: ApiResponse = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  const data: ApiResponse<Sambutan> = await response.json();
  return {
    sambutan: data.data || null
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

interface UseSambutanProps {
  isAdmin?: boolean;
}

export const useSambutan = ({ isAdmin = false }: UseSambutanProps = {}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data, error, isLoading, isValidating, mutate } = useSWR<SambutanResponse>(
    '/api/sambutan',
    fetcher,
    swrConfig
  );

  const sambutan = data?.sambutan || null;

  // Debugging: Log koneksi Firebase
  console.log('🔥 Firebase Connection Debug (useSambutan):', {
    sambutan,
    isLoading,
    isValidating,
    error: error?.message,
    hasData: !!sambutan,
    apiResponse: data,
    timestamp: new Date().toISOString()
  });

  const createSambutan = useCallback(async (sambutanData: Omit<Sambutan, 'id'> | FormData) => {
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    setIsSubmitting(true);
    try {
      const isFormData = sambutanData instanceof FormData;
      const response = await fetch('/api/sambutan', {
        method: 'POST',
        ...(isFormData 
          ? { body: sambutanData }
          : { 
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(sambutanData)
            }
        ),
      });

      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal membuat sambutan.');

      await mutate();
      return { success: true, message: 'Sambutan berhasil dibuat.' };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Gagal membuat sambutan.';
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [isAdmin, mutate]);

  const updateSambutan = useCallback(async (sambutanData: Partial<Sambutan> | FormData) => {
    if (!isAdmin || !sambutan?.id) return { success: false, message: 'Unauthorized or no data' };

    setIsSubmitting(true);
    try {
      const isFormData = sambutanData instanceof FormData;
      const response = await fetch(`/api/sambutan/${sambutan.id}`, {
        method: 'PUT',
        ...(isFormData 
          ? { body: sambutanData }
          : { 
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(sambutanData),
            }
        ),
      });

      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal mengupdate sambutan.');

      await mutate();
      return { success: true, message: 'Sambutan berhasil diupdate.' };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Gagal mengupdate sambutan.';
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [isAdmin, sambutan?.id, mutate]);

  const refreshSambutan = useCallback(async () => {
    await mutate();
  }, [mutate]);

  const getSambutan = useCallback(async () => {
    try {
      await mutate();
      return { success: true, data: sambutan };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to fetch sambutan' };
    }
  }, [mutate, sambutan]);

  return {
    sambutan,
    loading: isLoading,
    error: error?.message || null,
    isValidating,
    isSubmitting,
    createSambutan,
    updateSambutan,
    refreshSambutan,
    getSambutan,
    mutate,
  };
};

