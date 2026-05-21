import useSWR from 'swr';

export interface KomposisiItem {
  angkatan: string;
  jumlah: number;
}

interface ApiResponse {
  message: string;
  data: KomposisiItem[];
  timestamp: string;
}

const fetcher = async (url: string): Promise<KomposisiItem[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Gagal mengambil data komposisi anggota.');
  }
  const json: ApiResponse = await response.json();
  return json.data;
};

export const useKomposisiMember = () => {
  const { data, error, isLoading } = useSWR<KomposisiItem[]>(
    '/api/dashboard/composition',
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
      refreshInterval: 60000, // Refresh otomatis setiap 60 detik
    }
  );

  return {
    composition: data ?? [],
    loading: isLoading,
    error: error?.message || null,
  };
};
