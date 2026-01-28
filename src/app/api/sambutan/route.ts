import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, query, orderBy, limit } from 'firebase/firestore';
import { fetchPaginatedData } from '../../../lib/firestore-service';
import { Sambutan } from '@/types';

const sambutanCol = collection(db, 'sambutan');

const handlers = {
  async GET() {
    try {
      // Fetch latest sambutan using firestore service
      const { data } = await fetchPaginatedData<Sambutan>(
        'sambutan',
        { 
          pageSize: 1,
          orderByField: 'updatedAt',
          orderDirection: 'desc'
        }
      );

      const sambutan = data.length > 0 ? data[0] : null;

      const response = NextResponse.json({
        message: 'Data sambutan berhasil diambil.',
        data: sambutan,
        timestamp: new Date().toISOString()
      });

      // Cache for 5 minutes, revalidate in background
      response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=60');

      return response;
    } catch (error: unknown) {
      console.error('Error fetching sambutan:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data sambutan.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async POST(req: NextRequest) {
    try {
      const body = await req.json();
      const { fullName, period, content, photoUrl, photoPath } = body;

      if (!fullName || !period || !content) {
        return NextResponse.json(
          { message: 'Nama lengkap, periode, dan konten sambutan wajib diisi.' },
          { status: 400 }
        );
      }

      // Check if sambutan already exists (only allow one sambutan)
      const existingQuery = query(sambutanCol, limit(1));
      const existingSnapshot = await getDocs(existingQuery);

      if (!existingSnapshot.empty) {
        return NextResponse.json(
          { message: 'Sambutan sudah ada. Hanya satu sambutan yang diperbolehkan.' },
          { status: 400 }
        );
      }

      const docRef = await addDoc(sambutanCol, {
        fullName,
        period,
        content,
        photoUrl: photoUrl || null,
        photoPath: photoPath || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return NextResponse.json(
        { message: 'Sambutan berhasil dibuat!', id: docRef.id },
        { status: 201 }
      );
    } catch (error: unknown) {
      console.error('Error creating sambutan:', error);
      return NextResponse.json(
        { message: 'Gagal membuat sambutan.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async PUT(req: NextRequest) {
    try {
      const body = await req.json();
      const { fullName, period, content, photoUrl, photoPath } = body;

      if (!fullName || !period || !content) {
        return NextResponse.json(
          { message: 'Nama lengkap, periode, dan konten sambutan wajib diisi.' },
          { status: 400 }
        );
      }

      // Get the existing sambutan
      const q = query(sambutanCol, orderBy('updatedAt', 'desc'), limit(1));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return NextResponse.json(
          { message: 'Sambutan tidak ditemukan.' },
          { status: 404 }
        );
      }

      const docRef = snapshot.docs[0].ref;
      await updateDoc(docRef, {
        fullName,
        period,
        content,
        photoUrl: photoUrl || null,
        photoPath: photoPath || null,
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

export async function DELETE() {
  return handlers.DELETE();
}