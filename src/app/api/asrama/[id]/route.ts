import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import cloudinary from '../../../../lib/cloudinary';
import { Buffer } from 'buffer';

const handlers = {
  async GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = await Promise.resolve(params);

      // Validasi ID
      if (!['asramaPutra', 'asramaPutri'].includes(id)) {
        return NextResponse.json(
          { message: 'ID asrama tidak valid.' },
          { status: 400 }
        );
      }

      const docRef = doc(db, 'asrama', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Asrama tidak ditemukan.' },
          { status: 404 }
        );
      }

      const asrama = {
        id: docSnap.id,
        ...docSnap.data()
      };

      const response = NextResponse.json({
        message: 'Data asrama berhasil diambil.',
        data: asrama,
        timestamp: new Date().toISOString()
      });

      // Cache for 5 minutes, revalidate in background
      response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=60');

      return response;
    } catch (error: unknown) {
      console.error('Error fetching asrama by ID:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data asrama.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = await Promise.resolve(params);

      if (!['asramaPutra', 'asramaPutri'].includes(id)) {
        return NextResponse.json(
          { message: 'ID asrama tidak valid.' },
          { status: 400 }
        );
      }

      const docRef = doc(db, 'asrama', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return NextResponse.json(
          { message: 'Asrama sudah ada. Gunakan PUT untuk mengupdate.' },
          { status: 400 }
        );
      }

      const formData = await req.formData();
      const name = formData.get('name') as string | null;
      const address = formData.get('address') as string | null;
      const file = formData.get('image') as File | null;

      if (!name || !address) {
        return NextResponse.json(
          { message: 'Nama dan alamat asrama wajib diisi.' },
          { status: 400 }
        );
      }

      const createData: any = {
        name,
        address,
        updatedAt: new Date().toISOString(),
      };

      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: 'auto', folder: 'asrama' },
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
        createData.asramaPublicId = uploadResult.public_id;
      }

      await setDoc(docRef, createData);

      return NextResponse.json(
        { message: 'Asrama berhasil dibuat!', id },
        { status: 201 }
      );
    } catch (error: unknown) {
      console.error('Error creating asrama:', error);
      return NextResponse.json(
        { message: 'Gagal membuat asrama.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = await Promise.resolve(params);

      if (!['asramaPutra', 'asramaPutri'].includes(id)) {
        return NextResponse.json(
          { message: 'ID asrama tidak valid.' },
          { status: 400 }
        );
      }

      const docRef = doc(db, 'asrama', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Asrama tidak ditemukan.' },
          { status: 404 }
        );
      }

      const oldData = docSnap.data();

      const formData = await req.formData();
      const name = formData.get('name') as string | null;
      const address = formData.get('address') as string | null;
      const file = formData.get('image') as File | null;
      const deleteImage = formData.get('deleteImage') === 'true';

      if (!name || !address) {
        return NextResponse.json(
          { message: 'Nama dan alamat asrama wajib diisi.' },
          { status: 400 }
        );
      }

      const updateData: any = {
        name,
        address,
        updatedAt: new Date().toISOString(),
      };

      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: 'auto', folder: 'asrama' },
            (error: any, result: any) => {
              if (error || !result) {
                reject(error ?? new Error('Upload to Cloudinary failed'));
                return;
              }
              resolve(result);
            }
          ).end(buffer);
        });

        if (oldData.asramaPublicId) {
          try {
            await cloudinary.uploader.destroy(oldData.asramaPublicId);
          } catch (delError) {
            console.error('Error deleting old image from Cloudinary:', delError);
          }
        }

        updateData.photoUrl = uploadResult.secure_url;
        updateData.asramaPublicId = uploadResult.public_id;
      } else if (deleteImage) {
        if (oldData.asramaPublicId) {
          try {
            await cloudinary.uploader.destroy(oldData.asramaPublicId);
          } catch (delError) {
            console.error('Error deleting old image from Cloudinary:', delError);
          }
        }
        updateData.photoUrl = null;
        updateData.photoPath = null;
        updateData.asramaPublicId = null;
      }

      await updateDoc(docRef, updateData);

      return NextResponse.json(
        { message: 'Asrama berhasil diupdate!' },
        { status: 200 }
      );
    } catch (error: unknown) {
      console.error('Error updating asrama:', error);
      return NextResponse.json(
        { message: 'Gagal mengupdate asrama.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },
};

// Next.js App Router handler
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  return handlers.GET(req, context);
}

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  return handlers.POST(req, context);
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  return handlers.PUT(req, context);
}