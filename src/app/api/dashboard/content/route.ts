import { NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    const beritaCol = collection(db, 'berita');
    const snapshot = await getDocs(beritaCol);

    const counts: Record<string, number> = {
      Draft: 0,
      Published: 0,
      Archived: 0,
    };

    snapshot.docs.forEach((docSnap) => {
      const data = docSnap.data();
      const status = data.status || 'Draft';
      if (status in counts) {
        counts[status]++;
      } else {
        counts[status] = 1;
      }
    });

    const data = Object.entries(counts).map(([status, count]) => ({
      status,
      count,
    }));

    const response = NextResponse.json({
      message: 'Status berita berhasil diambil.',
      data,
      timestamp: new Date().toISOString(),
    });

    response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
    return response;
  } catch (error: unknown) {
    console.error('Error fetching content status:', error);
    return NextResponse.json(
      { message: 'Gagal mengambil status berita.', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}