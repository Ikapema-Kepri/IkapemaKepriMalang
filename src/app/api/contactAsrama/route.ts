import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, addDoc, getDocs, updateDoc, query, orderBy, limit} from 'firebase/firestore';
import { fetchPaginatedData } from '../../../lib/firestore-service';
import { KontakAsrama } from '@/types';

const contactAsramaCol = collection(db, 'kontakAsrama');

const handlers = {
  async GET() {
    try {
      // Fetch latest contact asrama using firestore service
      const { data } = await fetchPaginatedData<KontakAsrama>(
        'kontakAsrama',
        { 
          pageSize: 1,
          orderByField: 'updatedAt',
          orderDirection: 'desc'
        }
      );

      const contactAsrama = data.length > 0 ? data[0] : null;

      const response = NextResponse.json({
        message: 'Data kontak asrama berhasil diambil.',
        data: contactAsrama,
        timestamp: new Date().toISOString()
      });

      // Cache for 5 minutes, revalidate in background
      response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=60');

      return response;
    } catch (error: unknown) {
      console.error('Error fetching contact asrama:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data kontak asrama.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async POST(req: NextRequest) {
    try {
      const body = await req.json();
      const { buttonLabel, whatsappUrl, isActive } = body;

      if (!whatsappUrl) {
        return NextResponse.json(
          { message: 'WhatsApp URL wajib diisi.' },
          { status: 400 }
        );
      }

      // Check if contact asrama already exists (only allow one contact)
      const existingQuery = query(contactAsramaCol, limit(1));
      const existingSnapshot = await getDocs(existingQuery);

      if (!existingSnapshot.empty) {
        return NextResponse.json(
          { message: 'Kontak asrama sudah ada. Hanya satu kontak yang diperbolehkan.' },
          { status: 400 }
        );
      }

      const docRef = await addDoc(contactAsramaCol, {
        buttonLabel: buttonLabel || 'Lihat Detail Asrama',
        whatsappUrl,
        isActive: isActive ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return NextResponse.json(
        { message: 'Kontak asrama berhasil dibuat!', id: docRef.id },
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

  async PUT(req: NextRequest) {
    try {
      const body = await req.json();
      const { buttonLabel, whatsappUrl, isActive } = body;

      if (!whatsappUrl) {
        return NextResponse.json(
          { message: 'WhatsApp URL wajib diisi.' },
          { status: 400 }
        );
      }

      // Get the existing contact asrama
      const q = query(contactAsramaCol, orderBy('updatedAt', 'desc'), limit(1));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return NextResponse.json(
          { message: 'Kontak asrama tidak ditemukan.' },
          { status: 404 }
        );
      }

      const docRef = snapshot.docs[0].ref;
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
