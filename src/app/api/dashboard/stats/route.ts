import { NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export async function GET() {
  try {
    // ── 1. Total Anggota (isActive === true) ──────────────────────────────
    const anggotaCol = collection(db, 'anggota');
    const anggotaActiveQuery = query(anggotaCol, where('isActive', '==', true));
    const anggotaActiveSnap = await getDocs(anggotaActiveQuery);
    const totalAnggotaAktif = anggotaActiveSnap.size;

    // ── 2. Total Alumni (isActive === false) ──────────────────────────────
    const alumniQuery = query(anggotaCol, where('isActive', '==', false));
    const alumniSnap = await getDocs(alumniQuery);
    const totalAlumni = alumniSnap.size;

    // ── 3. Total Anggota (aktif + alumni) ─────────────────────────────────
    const totalAnggota = totalAnggotaAktif + totalAlumni;

    // ── 4. Total Berita Terpublikasi ──────────────────────────────────────
    const beritaCol = collection(db, 'berita');
    const beritaPublishedQuery = query(beritaCol, where('status', '==', 'Published'));
    const beritaSnap = await getDocs(beritaPublishedQuery);
    const totalBeritaPublished = beritaSnap.size;

    const response = NextResponse.json({
      message: 'Statistik dashboard berhasil diambil.',
      data: {
        totalAnggota,
        totalAnggotaAktif,
        totalAlumni,
        totalBeritaPublished,
      },
      timestamp: new Date().toISOString(),
    });

    // Cache selama 60 detik
    response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=30');

    return response;
  } catch (error: unknown) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { message: 'Gagal mengambil statistik dashboard.', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
