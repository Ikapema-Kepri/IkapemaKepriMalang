import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';
import { doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';
import cloudinary from '../../../../lib/cloudinary';
import { CloudinaryUploadResult } from '@/types';
import { optimizeImageToWebp } from '@/lib/serverImageUtils';

const handlers = {
  async PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = await Promise.resolve(params);
      const docRef = doc(db, 'alumniShowcase', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Alumni showcase tidak ditemukan.' },
          { status: 404 }
        );
      }

      const oldData = docSnap.data();

      const formData = await req.formData();
      const nama = formData.get('nama') as string | null;
      const tempatBekerja = formData.get('tempatBekerja') as string | null;
      const testimoni = formData.get('testimoni') as string | null;
      const file = formData.get('image') as File | null;
      const deleteImage = formData.get('deleteImage') === 'true';

      if (!nama) {
        return NextResponse.json(
          { message: 'Nama alumni wajib diisi.' },
          { status: 400 }
        );
      }

      const updateData: Record<string, unknown> = {
        nama,
        tempatBekerja: tempatBekerja || null,
        testimoni: testimoni || null,
        updatedAt: new Date().toISOString(),
      };

      if (file && file.size > 0) {
        const webpBuffer = await optimizeImageToWebp(file);

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
          ).end(webpBuffer);
        });

        // Hapus foto lama
        if (oldData.alumniShowcasePublicId) {
          try {
            await cloudinary.uploader.destroy(oldData.alumniShowcasePublicId);
          } catch (delError) {
            console.error('Error deleting old image from Cloudinary:', delError);
          }
        }

        updateData.photoUrl = uploadResult.secure_url;
        updateData.alumniShowcasePublicId = uploadResult.public_id;
      } else if (deleteImage) {
        if (oldData.alumniShowcasePublicId) {
          try {
            await cloudinary.uploader.destroy(oldData.alumniShowcasePublicId);
          } catch (delError) {
            console.error('Error deleting old image from Cloudinary:', delError);
          }
        }
        updateData.photoUrl = null;
        updateData.photoPath = null;
        updateData.alumniShowcasePublicId = null;
      }

      await updateDoc(docRef, updateData);

      return NextResponse.json(
        { message: 'Alumni showcase berhasil diupdate!' },
        { status: 200 }
      );
    } catch (error: unknown) {
      console.error('Error updating alumni showcase:', error);
      return NextResponse.json(
        { message: 'Gagal mengupdate alumni showcase.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = await Promise.resolve(params);
      const docRef = doc(db, 'alumniShowcase', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Alumni showcase tidak ditemukan.' },
          { status: 404 }
        );
      }

      const oldData = docSnap.data();

      if (oldData.alumniShowcasePublicId) {
        try {
          await cloudinary.uploader.destroy(oldData.alumniShowcasePublicId);
        } catch (delError) {
          console.error('Error deleting old image from Cloudinary:', delError);
        }
      }

      await deleteDoc(docRef);

      return NextResponse.json(
        { message: 'Alumni showcase berhasil dihapus!' },
        { status: 200 }
      );
    } catch (error: unknown) {
      console.error('Error deleting alumni showcase:', error);
      return NextResponse.json(
        { message: 'Gagal menghapus alumni showcase.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },
};

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  return handlers.PUT(req, context);
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  return handlers.DELETE(req, context);
}
