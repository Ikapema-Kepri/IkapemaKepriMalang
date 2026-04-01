import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';
import { doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';
import cloudinary from '../../../../lib/cloudinary';
import { Buffer } from 'buffer';

const handlers = {
  async GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = await Promise.resolve(params);
      const docRef = doc(db, 'berita', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Berita tidak ditemukan.' },
          { status: 404 }
        );
      }

      const berita = {
        id: docSnap.id,
        ...docSnap.data()
      };

      const response = NextResponse.json({
        message: 'Data berita berhasil diambil.',
        data: berita,
        timestamp: new Date().toISOString()
      });

      response.headers.set('Cache-Control', 's-maxage=120, stale-while-revalidate=60');

      return response;
    } catch (error: unknown) {
      console.error('Error fetching berita by ID:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data berita.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = await Promise.resolve(params);

      const docRef = doc(db, 'berita', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Berita tidak ditemukan.' },
          { status: 404 }
        );
      }

      const oldData = docSnap.data();

      const formData = await req.formData();
      const title = formData.get('title') as string | null;
      const slug = formData.get('slug') as string | null;
      const summary = formData.get('summary') as string | null;
      const content = formData.get('content') as string | null;
      const category = formData.get('category') as string | null;
      const tags = formData.get('tags') as string | null;
      const author = formData.get('author') as string | null;
      const status = formData.get('status') as string | null;
      const is_featuredStr = formData.get('is_featured') as string | null;
      const published_at = formData.get('published_at') as string | null;
      const viewsStr = formData.get('views') as string | null;
      const file = formData.get('image') as File | null;

      const updateData: any = {
        updated_at: new Date().toISOString(),
      };

      if (title !== null) {
        updateData.title = title;
        if (!slug && !oldData.slug) {
            updateData.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }
      }
      if (slug !== null) updateData.slug = slug;
      if (summary !== null) updateData.summary = summary;
      if (content !== null) updateData.content = content;
      if (category !== null) updateData.category = category;
      if (tags !== null) updateData.tags = JSON.parse(tags);
      if (author !== null) updateData.author = author;
      if (status !== null) updateData.status = status;
      if (is_featuredStr !== null) updateData.is_featured = is_featuredStr === 'true';
      if (published_at !== null) updateData.published_at = published_at;
      if (viewsStr !== null) updateData.views = parseInt(viewsStr);

      if (file && file.size > 0) {
        // Upload gambar baru ke Cloudinary
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: 'auto', folder: 'berita' },
            (error: any, result: any) => {
              if (error || !result) {
                reject(error ?? new Error('Upload to Cloudinary failed'));
                return;
              }
              resolve(result);
            }
          ).end(buffer);
        });

        // Hapus gambar lama pakai public_id
        if (oldData.thumbnailPublicId) {
          try {
            await cloudinary.uploader.destroy(oldData.thumbnailPublicId);
          } catch (delError) {
            console.error('Error deleting old image from Cloudinary:', delError);
          }
        }

        updateData.thumbnail = uploadResult.secure_url;
        updateData.thumbnailPublicId = uploadResult.public_id;
      }

      await updateDoc(docRef, updateData);

      return NextResponse.json(
        { message: 'Berita berhasil diupdate!' },
        { status: 200 }
      );
    } catch (error: unknown) {
      console.error('Error updating berita:', error);
      return NextResponse.json(
        { message: 'Gagal mengupdate berita.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = await Promise.resolve(params);

      const docRef = doc(db, 'berita', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Berita tidak ditemukan.' },
          { status: 404 }
        );
      }

      const oldData = docSnap.data();

      if (oldData.thumbnailPublicId) {
        try {
          await cloudinary.uploader.destroy(oldData.thumbnailPublicId);
        } catch (delError) {
          console.error('Error deleting image from Cloudinary:', delError);
        }
      }

      await deleteDoc(docRef);

      return NextResponse.json(
        { message: 'Berita berhasil dihapus!' },
        { status: 200 }
      );
    } catch (error: unknown) {
      console.error('Error deleting berita:', error);
      return NextResponse.json(
        { message: 'Gagal menghapus berita.', error: error instanceof Error ? error.message : String(error) },
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
