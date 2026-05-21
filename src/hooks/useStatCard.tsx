import useSWR from 'swr';

interface DashboardStats {
  totalAnggota: number;
  totalAnggotaAktif: number;
  totalAlumni: number;
  totalBeritaPublished: number;
}

interface StatsApiResponse {
  message: string;
  data: DashboardStats;
  timestamp: string;
}

const fetcher = async (url: string): Promise<DashboardStats> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Gagal mengambil statistik dashboard.');
  }
  const json: StatsApiResponse = await response.json();
  return json.data;
};

export const useStatCard = () => {
  const { data, error, isLoading } = useSWR<DashboardStats>(
    '/api/dashboard/stats',
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
      refreshInterval: 60000, // Auto-refresh setiap 60 detik
    }
  );

  return {
    stats: data ?? null,
    loading: isLoading,
    error: error?.message || null,
  };
};
