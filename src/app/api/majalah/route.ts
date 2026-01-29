import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const handlers = {
  async GET() {
    try {
      // Fetch majalah with fixed ID "majalah"
      const docRef = doc(db, 'majalah', 'majalah');
      const docSnap = await getDoc(docRef);

      let majalah = null;
      if (docSnap.exists()) {
        majalah = {
          id: docSnap.id,
          ...docSnap.data()
        };
      }

      const response = NextResponse.json({
        message: 'Data majalah berhasil diambil.',
        data: majalah,
        timestamp: new Date().toISOString()
      });

      // Cache for 5 minutes, revalidate in background
      response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=60');

      return response;
    } catch (error: unknown) {
      console.error('Error fetching majalah:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data majalah.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async POST(req: NextRequest) {
    try {
      const body = await req.json();
      const { filePath, fileUrl } = body;

      if (!fileUrl) {
        return NextResponse.json(
          { message: 'File URL majalah wajib diisi.' },
          { status: 400 }
        );
      }

      // Check if majalah already exists
      const docRef = doc(db, 'majalah', 'majalah');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return NextResponse.json(
          { message: 'Majalah sudah ada. Gunakan PUT untuk mengupdate.' },
          { status: 400 }
        );
      }

      // Create majalah with fixed ID "majalah"
      await setDoc(docRef, {
        filePath: filePath || null,
        fileUrl,
        updatedAt: new Date().toISOString(),
      });

      return NextResponse.json(
        { message: 'Majalah berhasil dibuat!', id: 'majalah' },
        { status: 201 }
      );
    } catch (error: unknown) {
      console.error('Error creating majalah:', error);
      return NextResponse.json(
        { message: 'Gagal membuat majalah.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async PUT(req: NextRequest) {
    try {
      const body = await req.json();
      const { filePath, fileUrl } = body;

      if (!fileUrl) {
        return NextResponse.json(
          { message: 'File URL majalah wajib diisi.' },
          { status: 400 }
        );
      }

      // Update majalah with fixed ID "majalah"
      const docRef = doc(db, 'majalah', 'majalah');
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
