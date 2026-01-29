import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';
import { doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';

const handlers = {
  async GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
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
      const { id } = params;
      const body = await req.json();
      const { bannerUrl, bannerPath } = body;

      if (!bannerUrl) {
        return NextResponse.json(
          { message: 'Banner URL wajib diisi.' },
          { status: 400 }
        );
      }

      const docRef = doc(db, 'banner', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Banner tidak ditemukan.' },
          { status: 404 }
        );
      }

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

  async DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;

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
