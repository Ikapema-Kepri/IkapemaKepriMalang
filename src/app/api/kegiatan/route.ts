import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { fetchPaginatedData } from '../../../lib/firestore-service';
import { Kegiatan } from '@/types';

const kegiatanCol = collection(db, 'kegiatan');

const handlers = {
  async GET() {
    try {
      // Fetch all kegiatan using firestore service
      const { data } = await fetchPaginatedData<Kegiatan>(
        'kegiatan',
        {
          pageSize: 50, // Get more kegiatan for listing
          orderByField: 'createdAt',
          orderDirection: 'desc'
        }
      );

      const response = NextResponse.json({
        message: 'Data kegiatan berhasil diambil.',
        data: data,
        timestamp: new Date().toISOString()
      });

      // Cache for 5 minutes, revalidate in background
      response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=60');

      return response;
    } catch (error: unknown) {
      console.error('Error fetching kegiatan:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data kegiatan.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async POST(req: NextRequest) {
    try {
      const body = await req.json();
      const { title, description, label, photoUrl, photoPath } = body;

      if (!title || !description) {
        return NextResponse.json(
          { message: 'Judul dan deskripsi kegiatan wajib diisi.' },
          { status: 400 }
        );
      }

      const docRef = await addDoc(kegiatanCol, {
        title,
        description,
        label: label || null,
        photoUrl: photoUrl || null,
        photoPath: photoPath || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return NextResponse.json(
        { message: 'Kegiatan berhasil dibuat!', id: docRef.id },
        { status: 201 }
      );
    } catch (error: unknown) {
      console.error('Error creating kegiatan:', error);
      return NextResponse.json(
        { message: 'Gagal membuat kegiatan.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },
};

export async function GET() {
  return handlers.GET();
}

export async function POST(req: NextRequest) {
  return handlers.POST(req);
}
