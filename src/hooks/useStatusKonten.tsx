import useSWR from "swr";

export interface StatusKonten {
    status: string;
    count: number;
}

interface ApiResponse {
  message: string;
  data: StatusKonten[];
  timestamp: string;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Gagal mengambil data status konten');
  }
  const json: ApiResponse = await response.json();
  return json.data;
};

export default function useStatusKonten() {
    const { data, error, isLoading } = useSWR<StatusKonten[]>(
        '/api/dashboard/content',
        fetcher,
        {
            revalidateOnFocus: false,
            dedupingInterval: 30000,
            refreshInterval: 60000,
        }
    );
    return {
        statusKonten: data ?? [],
        loading: isLoading,
        error: error?.message || null,
    };
}

