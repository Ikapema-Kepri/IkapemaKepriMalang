import { useState, useCallback } from 'react';
import useSWR from 'swr';
import { Asrama, ApiResponse } from '@/types';

interface AsramaResponse {
  asrama: Asrama[];
}

const fetcher = async (url: string): Promise<AsramaResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorData: ApiResponse = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  const data: ApiResponse<Asrama[]> = await response.json();
  return {
    asrama: data.data || []
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

interface UseAsramaProps {
  isAdmin?: boolean;
}

export const useAsrama = ({ isAdmin = false }: UseAsramaProps = {}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data, error, isLoading, isValidating, mutate } = useSWR<AsramaResponse>(
    '/api/asrama',
    fetcher,
    swrConfig
  );

  const asrama = data?.asrama || [];

  // Pisahkan asrama putra dan putri
  const asramaPutra = asrama.find(a => a.id === 'asramaPutra') || null;
  const asramaPutri = asrama.find(a => a.id === 'asramaPutri') || null;

  // Debugging: Log koneksi Firebase
  console.log('🔥 Firebase Connection Debug (useAsrama):', {
    asrama,
    asramaPutra,
    asramaPutri,
    isLoading,
    isValidating,
    error: error?.message,
    hasData: asrama.length > 0,
    apiResponse: data,
    timestamp: new Date().toISOString()
  });

  const updateAsrama = useCallback(async (id: string, asramaData: Partial<Asrama> | FormData) => {
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    // Validasi ID
    if (!['asramaPutra', 'asramaPutri'].includes(id)) {
      return { success: false, message: 'ID asrama tidak valid' };
    }

    setIsSubmitting(true);
    try {
      const isFormData = asramaData instanceof FormData;
      const response = await fetch(`/api/asrama/${id}`, {
        method: 'PUT',
        ...(isFormData 
          ? { body: asramaData }
          : { 
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(asramaData),
            }
        ),
      });

      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal mengupdate asrama.');

      await mutate();
      return { success: true, message: 'Asrama berhasil diupdate.' };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Gagal mengupdate asrama.';
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [isAdmin, mutate]);

  const createAsrama = useCallback(async (id: string, asramaData: Omit<Asrama, 'id'> | FormData) => {
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    // Validasi ID
    if (!['asramaPutra', 'asramaPutri'].includes(id)) {
      return { success: false, message: 'ID asrama tidak valid' };
    }

    setIsSubmitting(true);
    try {
      const isFormData = asramaData instanceof FormData;
      const response = await fetch(`/api/asrama/${id}`, {
        method: 'POST',
        ...(isFormData 
          ? { body: asramaData }
          : { 
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(asramaData),
            }
        ),
      });

      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal membuat asrama.');

      await mutate();
      return { success: true, message: 'Asrama berhasil dibuat.' };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Gagal membuat asrama.';
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [isAdmin, mutate]);

  const refreshAsrama = useCallback(async () => {
    await mutate();
  }, [mutate]);

  const getAsrama = useCallback(async () => {
    try {
      await mutate();
      return { success: true, data: asrama };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to fetch asrama' };
    }
  }, [mutate, asrama]);

  return {
    asrama,
    asramaPutra,
    asramaPutri,
    loading: isLoading,
    error: error?.message || null,
    isValidating,
    isSubmitting,
    updateAsrama,
    createAsrama,
    refreshAsrama,
    getAsrama,
    mutate,
  };
};