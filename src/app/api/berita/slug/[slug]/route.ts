import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../../lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = await Promise.resolve(params);

    const beritaRef = collection(db, 'berita');
    const q = query(beritaRef, where('slug', '==', slug), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return NextResponse.json(
        { message: 'Berita tidak ditemukan.' },
        { status: 404 }
      );
    }

    const docSnap = snapshot.docs[0];
    const berita = {
      id: docSnap.id,
      ...docSnap.data()
    };

    const response = NextResponse.json({
      message: 'Data berita berhasil diambil.',
      data: berita,
      timestamp: new Date().toISOString()
    });

    response.headers.set('Cache-Control', 's-maxage=120, stale-while-revalidate=60');

    return response;
  } catch (error: unknown) {
    console.error('Error fetching berita by slug:', error);
    return NextResponse.json(
      { message: 'Gagal mengambil data berita.', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
