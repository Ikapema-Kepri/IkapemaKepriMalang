import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { CloudinaryUploadResult } from '@/types';
import cloudinary from '../../../../lib/cloudinary';
import { optimizeImageToWebp } from '@/lib/serverImageUtils';

const handlers = {
  async GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = await Promise.resolve(params);
      const docRef = doc(db, 'sambutan', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Sambutan tidak ditemukan.' },
          { status: 404 }
        );
      }

      const sambutan = {
        id: docSnap.id,
        ...docSnap.data()
      };

      const response = NextResponse.json({
        message: 'Data sambutan berhasil diambil.',
        data: sambutan,
        timestamp: new Date().toISOString()
      });

      // Cache for 5 minutes, revalidate in background
      response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=60');

      return response;
    } catch (error: unknown) {
      console.error('Error fetching sambutan by ID:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data sambutan.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = await Promise.resolve(params);
      
      const docRef = doc(db, 'sambutan', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Sambutan tidak ditemukan.' },
          { status: 404 }
        );
      }

      const oldData = docSnap.data();

      const formData = await req.formData();
      const fullName = formData.get('fullName') as string | null;
      const period = formData.get('period') as string | null;
      const content = formData.get('content') as string | null;
      const file = formData.get('image') as File | null;
      const deleteImage = formData.get('deleteImage') === 'true';

      if (!fullName || !period || !content) {
        return NextResponse.json(
          { message: 'Nama lengkap, periode, dan konten sambutan wajib diisi.' },
          { status: 400 }
        );
      }

      const updateData: Record<string, unknown> = {
        fullName,
        period,
        content,
        updatedAt: new Date().toISOString(),
      };

      if (file && file.size > 0) {
        // Upload gambar baru ke Cloudinary
        // const arrayBuffer = await file.arrayBuffer();
        // const buffer = Buffer.from(arrayBuffer);
        const webpBuffer = await optimizeImageToWebp(file);

        const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: 'auto', folder: 'sambutan' },
            (error: Error | null, result: unknown) => {
              if (error || !result) {
                reject(error ?? new Error('Upload to Cloudinary failed'));
                return;
              }
              resolve(result as CloudinaryUploadResult);
            }
          ).end(webpBuffer);
        });

        // Hapus gambar lama pakai public_id
        if (oldData.sambutanPublicId) {
          try {
            await cloudinary.uploader.destroy(oldData.sambutanPublicId);
          } catch (delError) {
            console.error('Error deleting old image from Cloudinary:', delError);
          }
        }

        updateData.photoUrl = uploadResult.secure_url;
        updateData.sambutanPublicId = uploadResult.public_id;
      } else if (deleteImage) {
        if (oldData.sambutanPublicId) {
          try {
            await cloudinary.uploader.destroy(oldData.sambutanPublicId);
          } catch (delError) {
            console.error('Error deleting old image from Cloudinary:', delError);
          }
        }
        updateData.photoUrl = null;
        updateData.photoPath = null;
        updateData.sambutanPublicId = null;
      }

      await updateDoc(docRef, updateData);

      return NextResponse.json(
        { message: 'Sambutan berhasil diupdate!' },
        { status: 200 }
      );
    } catch (error: unknown) {
      console.error('Error updating sambutan:', error);
      return NextResponse.json(
        { message: 'Gagal mengupdate sambutan.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

//   async DELETE(req: NextRequest, { params }: { params: { id: string } }) {
//     try {
//       const { id } = await Promise.resolve(params);

//       const docRef = doc(db, 'sambutan', id);
//       const docSnap = await getDoc(docRef);

//       if (!docSnap.exists()) {
//         return NextResponse.json(
//           { message: 'Sambutan tidak ditemukan.' },
//           { status: 404 }
//         );
//       }

//       await deleteDoc(docRef);

//       return NextResponse.json(
//         { message: 'Sambutan berhasil dihapus!' },
//         { status: 200 }
//       );
//     } catch (error: unknown) {
//       console.error('Error deleting sambutan:', error);
//       return NextResponse.json(
//         { message: 'Gagal menghapus sambutan.', error: error instanceof Error ? error.message : String(error) },
//         { status: 500 }
//       );
//     }
//   }
};

// Next.js App Router handler
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  return handlers.GET(req, context);
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  return handlers.PUT(req, context);
}

// export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
//   return handlers.DELETE(req, context);
// }