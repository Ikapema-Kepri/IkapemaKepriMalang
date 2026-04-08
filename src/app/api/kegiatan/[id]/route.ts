import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';
import { doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';
import cloudinary from '../../../../lib/cloudinary';
import { CloudinaryUploadResult } from '@/types';
import { Buffer } from 'buffer';

const handlers = {
  async GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = await Promise.resolve(params);
      const docRef = doc(db, 'kegiatan', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Kegiatan tidak ditemukan.' },
          { status: 404 }
        );
      }

      const kegiatan = {
        id: docSnap.id,
        ...docSnap.data()
      };

      const response = NextResponse.json({
        message: 'Data kegiatan berhasil diambil.',
        data: kegiatan,
        timestamp: new Date().toISOString()
      });

      // Cache for 5 minutes, revalidate in background
      response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=60');

      return response;
    } catch (error: unknown) {
      console.error('Error fetching kegiatan by ID:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data kegiatan.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = await Promise.resolve(params);
      const docRef = doc(db, 'kegiatan', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Kegiatan tidak ditemukan.' },
          { status: 404 }
        );
      }

      const oldData = docSnap.data();

      const formData = await req.formData();
      const title = formData.get('title') as string | null;
      const description = formData.get('description') as string | null;
      const label = formData.get('label') as string | null;
      const file = formData.get('image') as File | null;
      const deleteImage = formData.get('deleteImage') === 'true';

      if (!title || !description) {
        return NextResponse.json(
          { message: 'Judul dan deskripsi kegiatan wajib diisi.' },
          { status: 400 }
        );
      }

      const updateData: Record<string, unknown> = {
        title,
        description,
        label: label || null,
        updatedAt: new Date().toISOString(),
      };

      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: 'auto', folder: 'kegiatan' },
            (error: Error | null, result: unknown) => {
              if (error || !result) {
                reject(error ?? new Error('Upload to Cloudinary failed'));
                return;
              }
              resolve(result as CloudinaryUploadResult);
            }
          ).end(buffer);
        });

        if (oldData.kegiatanPublicId) {
          try {
            await cloudinary.uploader.destroy(oldData.kegiatanPublicId);
          } catch (delError) {
            console.error('Error deleting old image from Cloudinary:', delError);
          }
        }

        updateData.photoUrl = uploadResult.secure_url;
        updateData.kegiatanPublicId = uploadResult.public_id;
      } else if (deleteImage) {
        if (oldData.kegiatanPublicId) {
          try {
            await cloudinary.uploader.destroy(oldData.kegiatanPublicId);
          } catch (delError) {
            console.error('Error deleting old image from Cloudinary:', delError);
          }
        }
        updateData.photoUrl = null;
        updateData.photoPath = null;
        updateData.kegiatanPublicId = null;
      }

      await updateDoc(docRef, updateData);

      return NextResponse.json(
        { message: 'Kegiatan berhasil diupdate!' },
        { status: 200 }
      );
    } catch (error: unknown) {
      console.error('Error updating kegiatan:', error);
      return NextResponse.json(
        { message: 'Gagal mengupdate kegiatan.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = await Promise.resolve(params);

      const docRef = doc(db, 'kegiatan', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Kegiatan tidak ditemukan.' },
          { status: 404 }
        );
      }

      const oldData = docSnap.data();

      // Hapus gambar lama pakai public_id
      if (oldData.kegiatanPublicId) {
        try {
          await cloudinary.uploader.destroy(oldData.kegiatanPublicId);
        } catch (delError) {
          console.error('Error deleting old image from Cloudinary:', delError);
        }
      }

      await deleteDoc(docRef);

      return NextResponse.json(
        { message: 'Kegiatan berhasil dihapus!' },
        { status: 200 }
      );
    } catch (error: unknown) {
      console.error('Error deleting kegiatan:', error);
      return NextResponse.json(
        { message: 'Gagal menghapus kegiatan.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },
};

// Next.js App Router handler
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  return handlers.GET(req, context);
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  return handlers.PUT(req, context);
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  return handlers.DELETE(req, context);
}
