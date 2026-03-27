import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { fetchPaginatedData } from '../../../lib/firestore-service';
import { Kegiatan } from '@/types';
import cloudinary from '../../../lib/cloudinary';
import { Buffer } from 'buffer';

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
      const formData = await req.formData();
      const title = formData.get('title') as string | null;
      const description = formData.get('description') as string | null;
      const label = formData.get('label') as string | null;
      const file = formData.get('image') as File | null;

      if (!title || !description) {
        return NextResponse.json(
          { message: 'Judul dan deskripsi kegiatan wajib diisi.' },
          { status: 400 }
        );
      }

      const createData: any = {
        title,
        description,
        label: label || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: 'auto', folder: 'kegiatan' },
            (error: any, result: any) => {
              if (error || !result) {
                reject(error ?? new Error('Upload to Cloudinary failed'));
                return;
              }
              resolve(result);
            }
          ).end(buffer);
        });

        createData.photoUrl = uploadResult.secure_url;
        createData.kegiatanPublicId = uploadResult.public_id;
      }

      const docRef = await addDoc(kegiatanCol, createData);

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
