import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore';
import cloudinary from '../../../lib/cloudinary';
import { CloudinaryUploadResult } from '@/types';
import { Buffer } from 'buffer';

const handlers = {
  async GET() {
    try {
      const beritaRef = collection(db, 'berita');
      // Fetch ordered by created_at desc
      const q = query(beritaRef, orderBy('created_at', 'desc'));
      const snapshot = await getDocs(q);

      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const response = NextResponse.json({
        message: 'Berhasil mengambil daftar berita.',
        data: items,
        timestamp: new Date().toISOString()
      });

      response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=30');

      return response;
    } catch (error: unknown) {
      console.error('Error fetching berita:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil daftar berita.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async POST(req: NextRequest) {
    try {
      const formData = await req.formData();
      const title = formData.get('title') as string | null;
      const slug = formData.get('slug') as string | null;
      const summary = formData.get('summary') as string | null;
      const content = formData.get('content') as string | null;
      const category = formData.get('category') as string | null;
      const tags = formData.get('tags') as string | null; // JSON stringified array
      const author = formData.get('author') as string | null;
      const status = formData.get('status') as string | null;
      const is_featuredStr = formData.get('is_featured') as string | null;
      const is_featured = is_featuredStr === 'true';
      const file = formData.get('image') as File | null;
      const published_at = formData.get('published_at') as string | null;
      const views = parseInt(formData.get('views') as string || '0');

      if (!title) {
         return NextResponse.json({ message: 'Title is required' }, { status: 400 });
      }

      let thumbnailUrl = '';
      let thumbnailPublicId = '';

      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: 'auto', folder: 'berita' },
            (error: Error | null, result: unknown) => {
              if (error || !result) {
                reject(error ?? new Error('Upload to Cloudinary failed'));
                return;
              }
              resolve(result as CloudinaryUploadResult);
            }
          ).end(buffer);
        });

        thumbnailUrl = uploadResult.secure_url;
        thumbnailPublicId = uploadResult.public_id;
      }

      const tagsArray = tags ? JSON.parse(tags) : [];
      const automaticSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      const newBerita = {
        title,
        slug: automaticSlug,
        summary: summary || '',
        content: content || summary || '',
        category: category || 'Umum',
        tags: tagsArray,
        author: author || 'Admin',
        status: status || 'Draft',
        thumbnail: thumbnailUrl,
        thumbnailPublicId,
        views,
        is_featured,
        published_at: published_at || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'berita'), newBerita);

      return NextResponse.json(
        { message: 'Berita berhasil dibuat!', data: { id: docRef.id, ...newBerita } },
        { status: 201 }
      );
    } catch (error: unknown) {
      console.error('Error creating berita:', error);
      return NextResponse.json(
        { message: 'Gagal membuat berita.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  }
};

export async function GET() {
  return handlers.GET();
}

export async function POST(req: NextRequest) {
  return handlers.POST(req);
}
