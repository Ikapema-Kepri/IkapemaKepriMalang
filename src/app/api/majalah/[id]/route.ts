import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';
import { doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';

const handlers = {
  async GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      const docRef = doc(db, 'majalah', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Majalah tidak ditemukan.' },
          { status: 404 }
        );
      }

      const majalah = {
        id: docSnap.id,
        ...docSnap.data()
      };

      const response = NextResponse.json({
        message: 'Data majalah berhasil diambil.',
        data: majalah,
        timestamp: new Date().toISOString()
      });

      // Cache for 5 minutes, revalidate in background
      response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=60');

      return response;
    } catch (error: unknown) {
      console.error('Error fetching majalah by ID:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data majalah.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      const body = await req.json();
      const { filePath, fileUrl } = body;

      if (!fileUrl) {
        return NextResponse.json(
          { message: 'File URL majalah wajib diisi.' },
          { status: 400 }
        );
      }

      const docRef = doc(db, 'majalah', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Majalah tidak ditemukan.' },
          { status: 404 }
        );
      }

      await updateDoc(docRef, {
        filePath: filePath || null,
        fileUrl,
        updatedAt: new Date().toISOString(),
      });

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

  async DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;

      const docRef = doc(db, 'majalah', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Majalah tidak ditemukan.' },
          { status: 404 }
        );
      }

      await deleteDoc(docRef);

      return NextResponse.json(
        { message: 'Majalah berhasil dihapus!' },
        { status: 200 }
      );
    } catch (error: unknown) {
      console.error('Error deleting majalah:', error);
      return NextResponse.json(
        { message: 'Gagal menghapus majalah.', error: error instanceof Error ? error.message : String(error) },
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
