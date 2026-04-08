import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Asrama } from '@/types';

const handlers = {
  async GET() {
    try {
      // Fetch specific asrama documents (putra and putri)
      const asramaIds = ['asramaPutra', 'asramaPutri'];
      const asramaPromises = asramaIds.map(id => getDoc(doc(db, 'asrama', id)));
      const snapshots = await Promise.all(asramaPromises);

      const asrama: Asrama[] = snapshots
        .map((docSnap) => {
          if (docSnap.exists()) {
            return {
              id: docSnap.id,
              ...docSnap.data()
            } as Asrama;
          }
          return null;
        })
        .filter((asrama): asrama is Asrama => asrama !== null);

      const response = NextResponse.json({
        message: 'Data asrama berhasil diambil.',
        data: asrama,
        timestamp: new Date().toISOString()
      });

      // Cache for 5 minutes, revalidate in background
      response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=60');

      return response;
    } catch (error: unknown) {
      console.error('Error fetching asrama:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data asrama.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },
};

export async function GET() {
  return handlers.GET();
}

