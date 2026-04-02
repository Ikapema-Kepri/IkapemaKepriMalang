import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import cloudinary from '../../../lib/cloudinary';
import { CloudinaryUploadResult } from '@/types';
import { Buffer } from 'buffer';

const handlers = {
  async GET() {
    try {
      // Fetch majalah with fixed ID "majalah"
      const docRef = doc(db, 'majalah', 'majalah');
      const docSnap = await getDoc(docRef);

      let majalah = null;
      if (docSnap.exists()) {
        majalah = {
          id: docSnap.id,
          ...docSnap.data()
        };
      }

      const response = NextResponse.json({
        message: 'Data majalah berhasil diambil.',
        data: majalah,
        timestamp: new Date().toISOString()
      });

      // Cache for 5 minutes, revalidate in background
      response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=60');

      return response;
    } catch (error: unknown) {
      console.error('Error fetching majalah:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data majalah.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async POST(req: NextRequest) {
    try {
      const formData = await req.formData();
      const title = formData.get('title') as string | null;
      const fileUrl = formData.get('fileUrl') as string | null;
      const file = formData.get('image') as File | null;

      if (!fileUrl) {
        return NextResponse.json(
          { message: 'File URL majalah wajib diisi.' },
          { status: 400 }
        );
      }

      // Check if majalah already exists
      const docRef = doc(db, 'majalah', 'majalah');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return NextResponse.json(
          { message: 'Majalah sudah ada. Gunakan PUT untuk mengupdate.' },
          { status: 400 }
        );
      }

      const createData: Record<string, unknown> = {
        title: title || null,
        fileUrl,
        updatedAt: new Date().toISOString(),
      };

      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: 'auto', folder: 'majalah' },
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
        createData.majalahPublicId = uploadResult.public_id;
      }

      // Create majalah with fixed ID "majalah"
      await setDoc(docRef, createData);

      return NextResponse.json(
        { message: 'Majalah berhasil dibuat!', id: 'majalah' },
        { status: 201 }
      );
    } catch (error: unknown) {
      console.error('Error creating majalah:', error);
      return NextResponse.json(
        { message: 'Gagal membuat majalah.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async PUT(req: NextRequest) {
    try {
      const formData = await req.formData();
      const title = formData.get('title') as string | null;
      const fileUrl = formData.get('fileUrl') as string | null;
      const file = formData.get('image') as File | null;
      const deleteImage = formData.get('deleteImage') === 'true';

      if (!fileUrl) {
        return NextResponse.json(
          { message: 'File URL majalah wajib diisi.' },
          { status: 400 }
        );
      }

      // Update majalah with fixed ID "majalah"
      const docRef = doc(db, 'majalah', 'majalah');
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Majalah tidak ditemukan.' },
          { status: 404 }
        );
      }
      
      const oldData = docSnap.data();

      const updateData: Record<string, unknown> = {
        title: title || null,
        fileUrl,
        updatedAt: new Date().toISOString(),
      };

      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: 'auto', folder: 'majalah' },
            (error: Error | null, result: unknown) => {
              if (error || !result) {
                reject(error ?? new Error('Upload to Cloudinary failed'));
                return;
              }
              resolve(result as CloudinaryUploadResult);
            }
          ).end(buffer);
        });

        if (oldData.majalahPublicId) {
          try { await cloudinary.uploader.destroy(oldData.majalahPublicId); } catch { console.error('Cloudinary destroy failed'); }
        }
        updateData.photoUrl = uploadResult.secure_url;
        updateData.majalahPublicId = uploadResult.public_id;
      } else if (deleteImage) {
        if (oldData.majalahPublicId) {
          try { await cloudinary.uploader.destroy(oldData.majalahPublicId); } catch { console.error('Cloudinary destroy failed'); }
        }
        updateData.photoUrl = null;
        updateData.photoPath = null;
        updateData.majalahPublicId = null;
      }

      await updateDoc(docRef, updateData);

      return NextResponse.json(
        { message: 'Majalah berhasil diupdate!' },
        { status: 200 }
      );
    } catch (error: unknown) {
      console.error('Error updating majalah:', error);
      return NextResponse.json(
        { message: 'Gagal mengupdate majalah.', error: error instanceof Error ? error.message : String(error) },
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

export async function PUT(req: NextRequest) {
  return handlers.PUT(req);
}
