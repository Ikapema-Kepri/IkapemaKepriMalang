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
      const docRef = doc(db, 'banner', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Banner tidak ditemukan.' },
          { status: 404 }
        );
      }

      const banner = {
        id: docSnap.id,
        ...docSnap.data()
      };

      const response = NextResponse.json({
        message: 'Data banner berhasil diambil.',
        data: banner,
        timestamp: new Date().toISOString()
      });

      response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=60');

      return response;
    } catch (error: unknown) {
      console.error('Error fetching banner by ID:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data banner.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = await Promise.resolve(params);

      const docRef = doc(db, 'banner', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Banner tidak ditemukan.' },
          { status: 404 }
        );
      }

      const oldData = docSnap.data();

      const formData = await req.formData();
      const title = formData.get('title') as string | null;
      const subtitle = formData.get('subtitle') as string | null;
      const file = formData.get('image') as File | null;

      const updateData: Record<string, unknown> = {
        updatedAt: new Date().toISOString(),
      };

      if (title !== null) updateData.title = title;
      if (subtitle !== null) updateData.subtitle = subtitle;

      if (file && file.size > 0) {
        // Upload gambar baru ke Cloudinary
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: 'auto', folder: 'banner' },
            (error: Error | null, result: unknown) => {
              if (error || !result) {
                reject(error ?? new Error('Upload to Cloudinary failed'));
                return;
              }
              resolve(result as CloudinaryUploadResult);
            }
          ).end(buffer);
        });

        // Hapus gambar lama pakai public_id
        if (oldData.bannerPublicId) {
          try {
            await cloudinary.uploader.destroy(oldData.bannerPublicId);
          } catch (delError) {
            console.error('Error deleting old image from Cloudinary:', delError);
          }
        }

        updateData.bannerUrl = uploadResult.secure_url;
        updateData.bannerPublicId = uploadResult.public_id;
      }

      await updateDoc(docRef, updateData);

      return NextResponse.json(
        { message: 'Banner berhasil diupdate!' },
        { status: 200 }
      );
    } catch (error: unknown) {
      console.error('Error updating banner:', error);
      return NextResponse.json(
        { message: 'Gagal mengupdate banner.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = await Promise.resolve(params);

      const docRef = doc(db, 'banner', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Banner tidak ditemukan.' },
          { status: 404 }
        );
      }

      await deleteDoc(docRef);

      return NextResponse.json(
        { message: 'Banner berhasil dihapus!' },
        { status: 200 }
      );
    } catch (error: unknown) {
      console.error('Error deleting banner:', error);
      return NextResponse.json(
        { message: 'Gagal menghapus banner.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },
};

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  return handlers.GET(req, context);
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  return handlers.PUT(req, context);
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  return handlers.DELETE(req, context);
}
