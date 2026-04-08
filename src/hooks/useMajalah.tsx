import { useState, useCallback } from 'react';
import useSWR from 'swr';
import { Majalah, ApiResponse } from '@/types';

interface MajalahResponse {
  majalah: Majalah | null;
}

const fetcher = async (url: string): Promise<MajalahResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorData: ApiResponse = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  const data: ApiResponse<Majalah> = await response.json();
  return {
    majalah: data.data || null
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

interface UseMajalahProps {
  isAdmin?: boolean;
}

export const useMajalah = ({ isAdmin = false }: UseMajalahProps = {}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data, error, isLoading, isValidating, mutate } = useSWR<MajalahResponse>(
    '/api/majalah',
    fetcher,
    swrConfig
  );

  const majalah = data?.majalah || null;

  // Debugging: Log koneksi Firebase
  console.log('🔥 Firebase Connection Debug (useMajalah):', {
    majalah,
    isLoading,
    isValidating,
    error: error?.message,
    hasData: !!majalah,
    apiResponse: data,
    timestamp: new Date().toISOString()
  });

  const createMajalah = useCallback(async (majalahData: Omit<Majalah, 'id'> | FormData) => {
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    setIsSubmitting(true);
    try {
      const isFormData = majalahData instanceof FormData;
      const response = await fetch('/api/majalah', {
        method: 'POST',
        ...(isFormData 
          ? { body: majalahData }
          : { 
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(majalahData),
            }
        ),
      });

      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal membuat majalah.');

      await mutate();
      return { success: true, message: 'Majalah berhasil dibuat.' };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Gagal membuat majalah.';
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [isAdmin, mutate]);

  const updateMajalah = useCallback(async (majalahData: Partial<Majalah> | FormData) => {
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    setIsSubmitting(true);
    try {
      const isFormData = majalahData instanceof FormData;
      const response = await fetch('/api/majalah', {
        method: 'PUT',
        ...(isFormData 
          ? { body: majalahData }
          : { 
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(majalahData),
            }
        ),
      });

      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal mengupdate majalah.');

      await mutate();
      return { success: true, message: 'Majalah berhasil diupdate.' };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Gagal mengupdate majalah.';
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [isAdmin, mutate]);

  const createOrUpdateMajalah = useCallback(async (majalahData: Omit<Majalah, 'id'> | FormData) => {
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    setIsSubmitting(true);
    try {
      // Check if majalah already exists
      if (majalah) {
        // Update existing majalah
        return await updateMajalah(majalahData);
      } else {
        // Create new majalah
        return await createMajalah(majalahData);
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Gagal memproses majalah.';
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [isAdmin, majalah, createMajalah, updateMajalah]);

  const refreshMajalah = useCallback(async () => {
    await mutate();
  }, [mutate]);

  const getMajalah = useCallback(async () => {
    try {
      await mutate();
      return { success: true, data: majalah };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to fetch majalah' };
    }
  }, [mutate, majalah]);

  return {
    majalah,
    loading: isLoading,
    error: error?.message || null,
    isValidating,
    isSubmitting,
    createMajalah,
    updateMajalah,
    createOrUpdateMajalah, // Combined create/update function
    refreshMajalah,
    getMajalah,
    mutate,
  };
};

