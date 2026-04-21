import { useState, useCallback} from 'react';
import useSWR from 'swr';
import { KontakInstagram, KontakWhatsapp, KontakEmail, KontakSekretariat, ApiResponse } from '@/types';

interface KontakResponse {
  kontakInstagram: KontakInstagram | null;
  kontakWhatsapp: KontakWhatsapp | null;
  kontakEmail: KontakEmail | null;
  kontakSekretariat: KontakSekretariat | null;
}

const fetcher = async(url: string): Promise<KontakResponse> => {
    const response = await fetch(url);
    if(!response.ok) {
        const errorData: ApiResponse = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data: ApiResponse<KontakResponse> = await response.json();
    return {
        kontakInstagram: data.data?.kontakInstagram || null,
        kontakWhatsapp: data.data?.kontakWhatsapp || null,
        kontakEmail: data.data?.kontakEmail || null,
        kontakSekretariat: data.data?.kontakSekretariat || null,
    };
}

const swrConfig = {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 10000,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
    refreshInterval: 0,
    shouldRetryOnError: true,
    keepPreviousData: true,
}

interface UseKontakProps {
    isAdmin?: boolean;
}

export const useKontak = ({ isAdmin = false }: UseKontakProps = {}) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    
    const { data, error, isLoading, isValidating, mutate } = useSWR<KontakResponse>(
        '/api/kontak',
        fetcher,
        swrConfig
    );

    const kontakInstagram = data?.kontakInstagram || null;
    const kontakWhatsapp = data?.kontakWhatsapp || null;
    const kontakEmail = data?.kontakEmail || null;
    const kontakSekretariat = data?.kontakSekretariat || null;

    console.log('🔥 Firebase Connection Debug (useKontak):', {
        kontakInstagram,
        kontakWhatsapp,
        kontakEmail,
        kontakSekretariat,
        isLoading,
        isValidating,
        error: error?.message,
        hasData: data !== null,
        apiResponse: data,
        timestamp: new Date().toISOString(),
    });

    const updateKontak = useCallback(async (id: string, kontakData: Partial<KontakInstagram | KontakWhatsapp | KontakEmail | KontakSekretariat> | FormData) => {
        if (!isAdmin) return { success: false, message: 'Unauthorized' };

        setIsSubmitting(true);
        try {
            const isFormData = kontakData instanceof FormData;
            const response = await fetch(`/api/kontak/${id}`, {
                method: 'PUT',
                ...(isFormData 
                    ? { body: kontakData }
                    : { 
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(kontakData),
                    }
                ),
            });

            const data: ApiResponse = await response.json();
            if (!response.ok) throw new Error(data.message || 'Gagal mengupdate kontak.');

            await mutate();
            return { success: true, message: 'Kontak berhasil diupdate.' };
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : 'Gagal mengupdate kontak.';
            return { success: false, message };
        } finally {
            setIsSubmitting(false);
        }
    }, [isAdmin, mutate]);

    const refreshKontak = useCallback(async () => {
        await mutate();
    }, [mutate]);

    const getKontak = useCallback(async () => {
        try {
            await mutate();
            return { success: true, data: { kontakInstagram, kontakWhatsapp, kontakEmail, kontakSekretariat } };
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Failed to fetch kontak' };
        }
    }, [mutate, kontakInstagram, kontakWhatsapp, kontakEmail, kontakSekretariat]);

    return {
        kontakInstagram,
        kontakWhatsapp,
        kontakEmail,
        kontakSekretariat,
        loading: isLoading,
        error: error?.message || null,
        isValidating,
        isSubmitting,
        updateKontak,
        refreshKontak,
        getKontak,
        mutate,
    };
};