import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
// import { Asrama } from '@/types';

const handlers = {
  async GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;

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
      const { id } = params;
      const body = await req.json();
      const { name, address, photoUrl, photoPath } = body;

      // Validasi ID
      if (!['asramaPutra', 'asramaPutri'].includes(id)) {
        return NextResponse.json(
          { message: 'ID asrama tidak valid.' },
          { status: 400 }
        );
      }

      if (!name || !address) {
        return NextResponse.json(
          { message: 'Nama dan alamat asrama wajib diisi.' },
          { status: 400 }
        );
      }

      const docRef = doc(db, 'asrama', id);

      // Check if asrama already exists
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return NextResponse.json(
          { message: 'Asrama sudah ada. Gunakan PUT untuk mengupdate.' },
          { status: 400 }
        );
      }

      await setDoc(docRef, {
        name,
        address,
        photoUrl: photoUrl || null,
        photoPath: photoPath || null,
        updatedAt: new Date().toISOString(),
      });

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
      const { id } = params;
      const body = await req.json();
      const { name, address, photoUrl, photoPath } = body;

      // Validasi ID
      if (!['asramaPutra', 'asramaPutri'].includes(id)) {
        return NextResponse.json(
          { message: 'ID asrama tidak valid.' },
          { status: 400 }
        );
      }

      if (!name || !address) {
        return NextResponse.json(
          { message: 'Nama dan alamat asrama wajib diisi.' },
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

      await updateDoc(docRef, {
        name,
        address,
        photoUrl: photoUrl || null,
        photoPath: photoPath || null,
        updatedAt: new Date().toISOString(),
      });

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