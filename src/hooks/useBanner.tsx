import { useState, useCallback } from 'react';
import useSWR from 'swr';
import { Banner, ApiResponse } from '@/types';

interface BannerResponse {
  banner: Banner | null;
}

const fetcher = async (url: string): Promise<BannerResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorData: ApiResponse = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  const data: ApiResponse<Banner> = await response.json();
  return {
    banner: data.data || null
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

interface UseBannerProps {
  isAdmin?: boolean;
}

export const useBanner = ({ isAdmin = false }: UseBannerProps = {}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data, error, isLoading, isValidating, mutate } = useSWR<BannerResponse>(
    '/api/banner',
    fetcher,
    swrConfig
  );

  const banner = data?.banner || null;

  // Debugging: Log koneksi Firebase
  console.log('🔥 Firebase Connection Debug (useBanner):', {
    banner,
    isLoading,
    isValidating,
    error: error?.message,
    hasData: !!banner,
    apiResponse: data,
    timestamp: new Date().toISOString()
  });

  const createBanner = useCallback(async (bannerData: Omit<Banner, 'id'>) => {
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/banner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bannerData),
      });

      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal membuat banner.');

      await mutate();
      return { success: true, message: 'Banner berhasil dibuat.' };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Gagal membuat banner.';
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [isAdmin, mutate]);

  const updateBanner = useCallback(async (bannerData: Partial<Banner>) => {
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/banner', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bannerData),
      });

      const data: ApiResponse = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal mengupdate banner.');

      await mutate();
      return { success: true, message: 'Banner berhasil diupdate.' };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Gagal mengupdate banner.';
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [isAdmin, mutate]);

  const createOrUpdateBanner = useCallback(async (bannerData: Omit<Banner, 'id'>) => {
    if (!isAdmin) return { success: false, message: 'Unauthorized' };

    setIsSubmitting(true);
    try {
      // Check if banner already exists
      if (banner) {
        // Update existing banner
        return await updateBanner(bannerData);
      } else {
        // Create new banner
        return await createBanner(bannerData);
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Gagal memproses banner.';
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [isAdmin, banner, createBanner, updateBanner]);

  const refreshBanner = useCallback(async () => {
    await mutate();
  }, [mutate]);

  const getBanner = useCallback(async () => {
    try {
      await mutate();
      return { success: true, data: banner };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Failed to fetch banner' };
    }
  }, [mutate, banner]);

  return {
    banner,
    loading: isLoading,
    error: error?.message || null,
    isValidating,
    isSubmitting,
    createBanner,
    updateBanner,
    createOrUpdateBanner, // Combined create/update function
    refreshBanner,
    getBanner,
    mutate,
  };
};
