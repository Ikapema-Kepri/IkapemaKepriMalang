import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

const handlers = {
  async GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
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
      const { id } = params;
      const body = await req.json();
      const { namaKetua, jabatan, sambutan: sambutanText, photoURL, isActive } = body;

      if (!namaKetua || !jabatan || !sambutanText) {
        return NextResponse.json(
          { message: 'Nama Ketua, Jabatan, dan Sambutan wajib diisi.' },
          { status: 400 }
        );
      }

      const docRef = doc(db, 'sambutan', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Sambutan tidak ditemukan.' },
          { status: 404 }
        );
      }

      await updateDoc(docRef, {
        namaKetua,
        jabatan,
        sambutan: sambutanText,
        photoURL: photoURL || null,
        isActive: isActive ?? true,
        updatedAt: new Date().toISOString(),
      });

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
//       const { id } = params;

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

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  return handlers.DELETE(req, context);
}