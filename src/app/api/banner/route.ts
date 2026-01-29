import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const handlers = {
  async GET() {
    try {
      const docRef = doc(db, 'banner', 'banner');
      const docSnap = await getDoc(docRef);

      let banner = null;
      if (docSnap.exists()) {
        banner = {
          id: docSnap.id,
          ...docSnap.data()
        };
      }

      const response = NextResponse.json({
        message: 'Data banner berhasil diambil.',
        data: banner,
        timestamp: new Date().toISOString()
      });
      response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=60');

      return response;
    } catch (error: unknown) {
      console.error('Error fetching banner:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data banner.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async POST(req: NextRequest) {
    try {
      const body = await req.json();
      const { bannerUrl, bannerPath } = body;

      if (!bannerUrl) {
        return NextResponse.json(
          { message: 'Banner URL wajib diisi.' },
          { status: 400 }
        );
      }

      const docRef = doc(db, 'banner', 'banner');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return NextResponse.json(
          { message: 'Banner sudah ada. Gunakan PUT untuk mengupdate.' },
          { status: 400 }
        );
      }

      await setDoc(docRef, {
        bannerUrl,
        bannerPath: bannerPath || null,
        updatedAt: new Date().toISOString(),
      });

      return NextResponse.json(
        { message: 'Banner berhasil dibuat!', id: 'banner' },
        { status: 201 }
      );
    } catch (error: unknown) {
      console.error('Error creating banner:', error);
      return NextResponse.json(
        { message: 'Gagal membuat banner.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async PUT(req: NextRequest) {
    try {
      const body = await req.json();
      const { bannerUrl, bannerPath } = body;

      if (!bannerUrl) {
        return NextResponse.json(
          { message: 'Banner URL wajib diisi.' },
          { status: 400 }
        );
      }

      const docRef = doc(db, 'banner', 'banner');
      await updateDoc(docRef, {
        bannerUrl,
        bannerPath: bannerPath || null,
        updatedAt: new Date().toISOString(),
      });

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
