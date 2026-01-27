import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Anggota, PaginationInfo } from '@/types';

const anggotaCol = collection(db, 'anggota');

const handlers = {
  async POST(req: NextRequest) {
    try {
      const body = await req.json();
      const { namaAnggota, universitas, programStudi, photoURL } = body;

      if (!namaAnggota || !universitas || !programStudi) {
        return NextResponse.json(
          { message: 'Nama Anggota, Universitas, dan Program Studi wajib diisi.' },
          { status: 400 }
        );
      }

      const q = query(anggotaCol, orderBy('idAnggota', 'desc'), limit(1));
      const snapshot = await getDocs(q);
      let nextId = 1;
      if (!snapshot.empty) {
        const lastId = snapshot.docs[0].data().idAnggota;
        nextId = typeof lastId === 'number' ? lastId + 1 : 1;
      }

      const docRef = await addDoc(anggotaCol, {
        idAnggota: nextId,
        namaAnggota,
        universitas,
        programStudi,
        photoURL: photoURL || null,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return NextResponse.json(
        { message: 'Anggota berhasil ditambahkan!', id: docRef.id, anggotaId: nextId },
        { status: 201 }
      );
    } catch (error: unknown) {
      return NextResponse.json(
        { message: 'Gagal menambahkan anggota.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },

  async GET(req: NextRequest) {
    try {
      const { search, page = '1', limit = '24', sortBy = 'createdAt', order = 'desc' } = Object.fromEntries(req.nextUrl.searchParams.entries());
      const currentPage = parseInt(page);
      const pageLimit = Math.min(parseInt(limit), 100); // Max 100 items per request
      
      // Build optimized Firestore query
      const firestoreQuery = query(
        anggotaCol,
        orderBy(sortBy as any, order as any)
      );

      // Fetch all data (for now, will optimize with cursor-based pagination later)
      const anggotaSnapshot = await getDocs(firestoreQuery);
      let anggotaList = anggotaSnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Anggota)
      }));

      // Filter by search query (nama, universitas, programStudi)
      // Note: For better performance, consider using Algolia or Typesense for full-text search
      if (search && search.trim() !== "") {
        const q = search.trim().toLowerCase();
        anggotaList = anggotaList.filter(
          (a) =>
            (a.namaAnggota && a.namaAnggota.toLowerCase().includes(q)) ||
            (a.universitas && a.universitas.toLowerCase().includes(q)) ||
            (a.programStudi && a.programStudi.toLowerCase().includes(q))
        );
      }

      // Calculate pagination
      const totalItems = anggotaList.length;
      const totalPages = Math.ceil(totalItems / pageLimit);
      const startIndex = (currentPage - 1) * pageLimit;
      const endIndex = startIndex + pageLimit;
      const paginatedData = anggotaList.slice(startIndex, endIndex);

      const pagination: PaginationInfo = {
        currentPage,
        totalPages,
        totalItems,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1
      };

      // Add caching headers for better performance
      const response = NextResponse.json({
        message: 'Daftar anggota berhasil diambil.',
        data: paginatedData,
        pagination,
        timestamp: new Date().toISOString()
      });

      // Cache for 60 seconds, revalidate in background
      response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
      
      return response;
    } catch (error: unknown) {
      console.error('Error fetching anggota:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data anggota.', error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  }
};

// Next.js App Router handler
export async function GET(req: NextRequest) {
  return handlers.GET(req);
}

export async function POST(req: NextRequest) {
  return handlers.POST(req);
}