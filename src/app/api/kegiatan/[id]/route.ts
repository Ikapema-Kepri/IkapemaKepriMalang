import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';
import { doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';

const handlers = {
  async GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      const docRef = doc(db, 'kegiatan', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Kegiatan tidak ditemukan.' },
          { status: 404 }
        );
      }

      const kegiatan = {
        id: docSnap.id,
        ...docSnap.data()
      };

      const response = NextResponse.json({
        message: 'Data kegiatan berhasil diambil.',
        data: kegiatan,
        timestamp: new Date().toISOString()
      });

      // Cache for 5 minutes, revalidate in background
      response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=60');

      return response;
    } catch (error: unknown) {
      console.error('Error fetching kegiatan by ID:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data kegiatan.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      const body = await req.json();
      const { title, description, label, photoUrl, photoPath } = body;

      if (!title || !description) {
        return NextResponse.json(
          { message: 'Judul dan deskripsi kegiatan wajib diisi.' },
          { status: 400 }
        );
      }

      const docRef = doc(db, 'kegiatan', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Kegiatan tidak ditemukan.' },
          { status: 404 }
        );
      }

      await updateDoc(docRef, {
        title,
        description,
        label: label || null,
        photoUrl: photoUrl || null,
        photoPath: photoPath || null,
        updatedAt: new Date().toISOString(),
      });

      return NextResponse.json(
        { message: 'Kegiatan berhasil diupdate!' },
        { status: 200 }
      );
    } catch (error: unknown) {
      console.error('Error updating kegiatan:', error);
      return NextResponse.json(
        { message: 'Gagal mengupdate kegiatan.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;

      const docRef = doc(db, 'kegiatan', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Kegiatan tidak ditemukan.' },
          { status: 404 }
        );
      }

      await deleteDoc(docRef);

      return NextResponse.json(
        { message: 'Kegiatan berhasil dihapus!' },
        { status: 200 }
      );
    } catch (error: unknown) {
      console.error('Error deleting kegiatan:', error);
      return NextResponse.json(
        { message: 'Gagal menghapus kegiatan.', error: error instanceof Error ? error.message : String(error) },
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
