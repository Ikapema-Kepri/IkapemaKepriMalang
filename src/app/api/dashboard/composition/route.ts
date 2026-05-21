import { NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    const currentYear = new Date().getFullYear();
    const recentYears = [
      currentYear.toString(),
      (currentYear - 1).toString(),
      (currentYear - 2).toString(),
      (currentYear - 3).toString(),
    ];

    const anggotaCol = collection(db, 'anggota');
    const snapshot = await getDocs(anggotaCol);

    // Inisialisasi map dengan 4 tahun terbaru + Lainnya
    const compositionMap: Record<string, number> = {
      [recentYears[0]]: 0,
      [recentYears[1]]: 0,
      [recentYears[2]]: 0,
      [recentYears[3]]: 0,
      'Lainnya': 0,
    };

    snapshot.docs.forEach((docSnap) => {
      const data = docSnap.data();
      const isActive = data.isActive === true || data.isActive === 'true';

      // Kita hanya menghitung komposisi untuk anggota aktif
      if (isActive) {
        // Normalisasi angkatan ke string
        const angkatan = (data.angkatan || '').toString().trim();

        if (recentYears.includes(angkatan)) {
          compositionMap[angkatan] = (compositionMap[angkatan] || 0) + 1;
        } else {
          compositionMap['Lainnya'] = (compositionMap['Lainnya'] || 0) + 1;
        }
      }
    });

    // Format menjadi array yang terurut dari tahun terbaru ke terlama, dengan Lainnya di akhir
    const data = [
      { angkatan: recentYears[0], jumlah: compositionMap[recentYears[0]] },
      { angkatan: recentYears[1], jumlah: compositionMap[recentYears[1]] },
      { angkatan: recentYears[2], jumlah: compositionMap[recentYears[2]] },
      { angkatan: recentYears[3], jumlah: compositionMap[recentYears[3]] },
      { angkatan: 'Lainnya', jumlah: compositionMap['Lainnya'] },
    ];

    const response = NextResponse.json({
      message: 'Komposisi anggota berhasil diambil.',
      data,
      timestamp: new Date().toISOString(),
    });

    response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
    return response;
  } catch (error: unknown) {
    console.error('Error fetching member composition:', error);
    return NextResponse.json(
      { message: 'Gagal mengambil komposisi anggota.', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}