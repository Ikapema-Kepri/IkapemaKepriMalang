import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
// import { KontakAsrama } from '@/types';

const handlers = {
  async GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      const docRef = doc(db, 'kontakAsrama', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Kontak asrama tidak ditemukan.' },
          { status: 404 }
        );
      }

      const contactAsrama = {
        id: docSnap.id,
        ...docSnap.data()
      };

      const response = NextResponse.json({
        message: 'Data kontak asrama berhasil diambil.',
        data: contactAsrama,
        timestamp: new Date().toISOString()
      });

      // Cache for 5 minutes, revalidate in background
      response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=60');

      return response;
    } catch (error: unknown) {
      console.error('Error fetching contact asrama by ID:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data kontak asrama.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      const body = await req.json();
      const { buttonLabel, whatsappUrl, isActive } = body;

      if (!whatsappUrl) {
        return NextResponse.json(
          { message: 'WhatsApp URL wajib diisi.' },
          { status: 400 }
        );
      }

      const docRef = doc(db, 'kontakAsrama', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { message: 'Kontak asrama tidak ditemukan.' },
          { status: 404 }
        );
      }

      await updateDoc(docRef, {
        buttonLabel: buttonLabel || 'Lihat Detail Asrama',
        whatsappUrl,
        isActive: isActive ?? true,
        updatedAt: new Date().toISOString(),
      });

      return NextResponse.json(
        { message: 'Kontak asrama berhasil diupdate!' },
        { status: 200 }
      );
    } catch (error: unknown) {
      console.error('Error updating contact asrama:', error);
      return NextResponse.json(
        { message: 'Gagal mengupdate kontak asrama.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      const body = await req.json();
      const { buttonLabel, whatsappUrl, isActive } = body;

      if (!whatsappUrl) {
        return NextResponse.json(
          { message: 'WhatsApp URL wajib diisi.' },
          { status: 400 }
        );
      }

      // Check if document with this ID already exists
      const docRef = doc(db, 'kontakAsrama', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return NextResponse.json(
          { message: 'Kontak asrama dengan ID ini sudah ada. Gunakan PUT untuk update.' },
          { status: 400 }
        );
      }

      // For fixed ID "mainContact", we can create it directly
      await setDoc(docRef, {
        buttonLabel: buttonLabel || 'Lihat Detail Asrama',
        whatsappUrl,
        isActive: isActive ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return NextResponse.json(
        { message: 'Kontak asrama berhasil dibuat!', id },
        { status: 201 }
      );
    } catch (error: unknown) {
      console.error('Error creating contact asrama:', error);
      return NextResponse.json(
        { message: 'Gagal membuat kontak asrama.', error: error instanceof Error ? error.message : String(error) },
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

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  return handlers.POST(req, context);
}
