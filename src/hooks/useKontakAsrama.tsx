import { useState, useCallback } from 'react';
import useSWR from 'swr';
import { KontakAsrama, ApiResponse } from '@/types';

interface KontakAsramaResponse {
  kontakAsrama: KontakAsrama | null;
}

const fetcher = async (url: string): Promise<KontakAsramaResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorData: ApiResponse = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  const data: ApiResponse<KontakAsrama> = await response.json();
  return {
    kontakAsrama: data.data || null
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

interface UseContactAsramaProps {
  isAdmin?: boolean;
}

export const useContactAsrama = ({ isAdmin = false }: UseContactAsramaProps = {}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data, error, isLoading, isValidating, mutate } = useSWR<KontakAsramaResponse>(
    '/api/contactAsrama',
    fetcher,
    swrConfig
  );

  const kontakAsrama = data?.kontakAsrama || null;

  // Debugging: Log koneksi Firebase
  console.log('🔥 Firebase Connection Debug (useContactAsrama):', {
    kontakAsrama,
    isLoading,
    isValidating,
    error: error?.message,
    hasData: !!kontakAsrama,
    apiResponse: data,
    timestamp: new Date().toISOString()
  });

  const createContactAsrama = useCallback(async (contactData: Omit<KontakAsrama, 'id'>) => {
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contactAsrama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });

      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal membuat kontak asrama.');

      await mutate();
      return { success: true, message: 'Kontak asrama berhasil dibuat.' };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Gagal membuat kontak asrama.';
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [isAdmin, mutate]);

  const updateContactAsrama = useCallback(async (contactData: Partial<KontakAsrama>) => {
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contactAsrama/mainContact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });

      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal mengupdate kontak asrama.');

      await mutate();
      return { success: true, message: 'Kontak asrama berhasil diupdate.' };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Gagal mengupdate kontak asrama.';
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [isAdmin, mutate]);

  const refreshContactAsrama = useCallback(async () => {
    await mutate();
  }, [mutate]);

  const getContactAsrama = useCallback(async () => {
    try {
      await mutate();
      return { success: true, data: kontakAsrama };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to fetch contact asrama' };
    }
  }, [mutate, kontakAsrama]);

  return {
    kontakAsrama,
    loading: isLoading,
    error: error?.message || null,
    isValidating,
    isSubmitting,
    createContactAsrama,
    updateContactAsrama,
    refreshContactAsrama,
    getContactAsrama,
    mutate,
  };
};

