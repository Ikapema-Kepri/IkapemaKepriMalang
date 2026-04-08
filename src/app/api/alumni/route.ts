import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { fetchPaginatedData } from '../../../lib/firestore-service';
import { Anggota, PaginationInfo } from '@/types';

const anggotaCol = collection(db, 'anggota');

const handlers = {
  async POST(req: NextRequest) {
    try {
      const body = await req.json();
      const { namaAnggota, universitas, programStudi, angkatan, photoURL } = body;

      if (!namaAnggota || !universitas || !programStudi) {
        return NextResponse.json(
          { message: 'Nama Alumni, Universitas, dan Program Studi wajib diisi.' },
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
        angkatan: angkatan || '',
        photoURL: photoURL || null,
        isActive: false, // Alumni selalu isActive = false
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return NextResponse.json(
        { message: 'Alumni berhasil ditambahkan!', id: docRef.id, alumniId: nextId },
        { status: 201 }
      );
    } catch (error: unknown) {
      return NextResponse.json(
        { message: 'Gagal menambahkan alumni.', error: error instanceof Error ? error.message : String(error) },
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
      const validSortFields = ['createdAt', 'namaAnggota', 'universitas', 'programStudi', 'idAnggota'] as const;
      const validSortBy = validSortFields.includes(sortBy as typeof validSortFields[number]) ? sortBy : 'createdAt';
      const validOrder = (order === 'asc' || order === 'desc') ? order : 'desc';

      // Fetch all data using firestore service
      const { data: anggotaList } = await fetchPaginatedData<Anggota>(
        'anggota',
        { 
          pageSize: 1000, // Large limit to get all data for client-side filtering
          orderByField: validSortBy,
          orderDirection: validOrder as 'asc' | 'desc'
        }
      );

      // Filter only alumni (isActive === false or string 'false' for legacy data)
      let filteredList = anggotaList.filter(a => a.isActive === false || (a.isActive as unknown) === 'false');

      // Filter by search query (nama, universitas, programStudi)
      if (search && search.trim() !== "") {
        const q = search.trim().toLowerCase();
        filteredList = filteredList.filter(
          (a) =>
            (a.namaAnggota && a.namaAnggota.toLowerCase().includes(q)) ||
            (a.universitas && a.universitas.toLowerCase().includes(q)) ||
            (a.programStudi && a.programStudi.toLowerCase().includes(q))
        );
      }

      // Calculate pagination
      const totalItems = filteredList.length;
      const totalPages = Math.ceil(totalItems / pageLimit);
      const startIndex = (currentPage - 1) * pageLimit;
      const endIndex = startIndex + pageLimit;
      const paginatedData = filteredList.slice(startIndex, endIndex);

      const pagination: PaginationInfo = {
        currentPage,
        totalPages,
        totalItems,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1
      };

      // Add caching headers for better performance
      const response = NextResponse.json({
        message: 'Daftar alumni berhasil diambil.',
        data: paginatedData,
        pagination,
        timestamp: new Date().toISOString()
      });

      // Cache for 60 seconds, revalidate in background
      response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
      
      return response;
    } catch (error: unknown) {
      console.error('Error fetching alumni:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data alumni.', error: error instanceof Error ? error.message : String(error) },
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
