import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { fetchPaginatedData } from '../../../lib/firestore-service';
import { AlumniShowcase, CloudinaryUploadResult } from '@/types';
import cloudinary from '../../../lib/cloudinary';
import { Buffer } from 'buffer';

const alumniShowcaseCol = collection(db, 'alumniShowcase');

const handlers = {
  async GET() {
    try {
      const { data } = await fetchPaginatedData<AlumniShowcase>(
        'alumniShowcase',
        {
          pageSize: 50,
          orderByField: 'createdAt',
          orderDirection: 'desc',
        }
      );

      const response = NextResponse.json({
        message: 'Data alumni showcase berhasil diambil.',
        data,
        timestamp: new Date().toISOString(),
      });

      response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
      return response;
    } catch (error: unknown) {
      console.error('Error fetching alumni showcase:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data alumni showcase.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async POST(req: NextRequest) {
    try {
      const formData = await req.formData();
      const nama = formData.get('nama') as string | null;
      const tempatBekerja = formData.get('tempatBekerja') as string | null;
      const testimoni = formData.get('testimoni') as string | null;
      const file = formData.get('image') as File | null;

      if (!nama) {
        return NextResponse.json(
          { message: 'Nama alumni wajib diisi.' },
          { status: 400 }
        );
      }

      const createData: Record<string, unknown> = {
        nama,
        tempatBekerja: tempatBekerja || null,
        testimoni: testimoni || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: 'auto', folder: 'alumni-showcase' },
            (error: Error | null, result: unknown) => {
              if (error || !result) {
                reject(error ?? new Error('Upload to Cloudinary failed'));
                return;
              }
              resolve(result as CloudinaryUploadResult);
            }
          ).end(buffer);
        });

        createData.photoUrl = uploadResult.secure_url;
        createData.alumniShowcasePublicId = uploadResult.public_id;
      }

      const docRef = await addDoc(alumniShowcaseCol, createData);

      return NextResponse.json(
        { message: 'Alumni showcase berhasil ditambahkan!', id: docRef.id },
        { status: 201 }
      );
    } catch (error: unknown) {
      console.error('Error creating alumni showcase:', error);
      return NextResponse.json(
        { message: 'Gagal menambah alumni showcase.', error: error instanceof Error ? error.message : String(error) },
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
