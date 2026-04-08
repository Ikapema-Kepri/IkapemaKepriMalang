import { useState, useCallback } from 'react';
import useSWR from 'swr';
import { Berita, ApiResponse } from '@/types';

interface BeritaResponse {
  beritas: Berita[];
}

interface SingleBeritaResponse {
  berita: Berita | null;
}

const fetcher = async (url: string): Promise<BeritaResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorData: ApiResponse = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  const data: ApiResponse<Berita[]> = await response.json();
  return {
    beritas: data.data || []
  };
};

const singleFetcher = async (url: string): Promise<SingleBeritaResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) return { berita: null };
    const errorData: ApiResponse = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  const data: ApiResponse<Berita> = await response.json();
  return {
    berita: data.data || null
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

interface UseBeritaProps {
  isAdmin?: boolean;
}

export const useBerita = ({ isAdmin = false }: UseBeritaProps = {}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data, error, isLoading, isValidating, mutate } = useSWR<BeritaResponse>(
    '/api/berita',
    fetcher,
    swrConfig
  );

  const beritas = data?.beritas || [];

  const createBerita = useCallback(async (beritaData: Omit<Berita, 'id'> | FormData) => {
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    setIsSubmitting(true);
    try {
      const isFormData = beritaData instanceof FormData;
      const response = await fetch('/api/berita', {
        method: 'POST',
        ...(isFormData 
          ? { body: beritaData }
          : { 
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(beritaData)
            }
        ),
      });

      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal membuat berita.');

      await mutate();
      return { success: true, message: 'Berita berhasil dibuat.' };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Gagal membuat berita.';
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [isAdmin, mutate]);

  const updateBerita = useCallback(async (beritaData: Partial<Berita> | FormData, id?: string) => {
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    setIsSubmitting(true);
    try {
      const isFormData = beritaData instanceof FormData;
      const targetId = id || (isFormData ? beritaData.get('id') : beritaData.id);

      if (!targetId) throw new Error('ID Berita tidak ditemukan.');
      const url = `/api/berita/${targetId}`;

      const response = await fetch(url, {
        method: 'PUT',
        ...(isFormData 
          ? { body: beritaData } 
          : { 
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(beritaData),
            }
        ),
      });

      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal mengupdate berita.');

      await mutate();
      return { success: true, message: 'Berita berhasil diupdate.' };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Gagal mengupdate berita.';
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [isAdmin, mutate]);

  const deleteBerita = useCallback(async (id: string) => {
     if (!isAdmin) return { success: false, message: 'Unauthorized' };
     setIsSubmitting(true);
     try {
       const response = await fetch(`/api/berita/${id}`, {
         method: 'DELETE',
       });
       
       const data: ApiResponse = await response.json();
       if (!response.ok) throw new Error(data.message || 'Gagal menghapus berita.');
       
       await mutate();
       return { success: true, message: 'Berita berhasil dihapus.' };
     } catch (e: unknown) {
       const message = e instanceof Error ? e.message : 'Gagal menghapus berita.';
       return { success: false, message };
     } finally {
       setIsSubmitting(false);
     }
  }, [isAdmin, mutate]);

  const createOrUpdateBerita = useCallback(async (beritaData: Partial<Berita> | FormData, id?: string) => {
    if (!isAdmin) return { success: false, message: 'Unauthorized' };
    
    const isFormData = beritaData instanceof FormData;
    const targetId = id || (isFormData ? beritaData.get('id') as string : (beritaData as Partial<Berita>).id);

    if (targetId) {
        return await updateBerita(beritaData, targetId);
    } else {
        return await createBerita(beritaData as Omit<Berita, 'id'> | FormData);
    }
  }, [isAdmin, createBerita, updateBerita]);

  const refreshBerita = useCallback(async () => {
    await mutate();
  }, [mutate]);

  return {
    beritas,
    loading: isLoading,
    error: error?.message || null,
    isValidating,
    isSubmitting,
    createBerita,
    updateBerita,
    deleteBerita,
    createOrUpdateBerita,
    refreshBerita,
    mutate,
  };
};

export const useBeritaBySlug = (slug?: string) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<SingleBeritaResponse>(
    slug ? `/api/berita/slug/${slug}` : null,
    singleFetcher,
    swrConfig
  );

  return {
    berita: data?.berita || null,
    loading: isLoading,
    error: error?.message || null,
    isValidating,
    mutate,
  };
};
