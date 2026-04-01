import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { fetchPaginatedData } from '../../../lib/firestore-service';
import { Anggota, PaginationInfo } from '@/types';
import cloudinary from '../../../lib/cloudinary';
import { Buffer } from 'buffer';

const anggotaCol = collection(db, 'anggota');

const handlers = {
  async POST(req: NextRequest) {
    try {
      const formData = await req.formData();
      const namaAnggota = formData.get('namaAnggota') as string | null;
      const universitas = formData.get('universitas') as string | null;
      const programStudi = formData.get('programStudi') as string | null;
      const angkatan = formData.get('angkatan') as string | null;
      const isActive = formData.get('isActive');
      const file = formData.get('image') as File | null;

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

      const createData: any = {
        idAnggota: nextId,
        namaAnggota,
        universitas,
        programStudi,
        angkatan: angkatan || '',
        photoURL: null,
        anggotaPublicId: null,
        isActive: isActive !== null ? (isActive === 'true') : true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: 'auto', folder: 'anggota' },
            (error: any, result: any) => {
              if (error || !result) {
                reject(error || new Error('Upload failed'));
                return;
              }
              resolve(result);
            }
          ).end(buffer);
        });
        
        // Optimasi gambar menjadi rasio 1:1 (kotak) sesuai permintaan
        const optimizedUrl = uploadResult.secure_url.replace('/upload/', '/upload/c_fill,ar_1:1/');

        createData.photoURL = optimizedUrl;
        createData.anggotaPublicId = uploadResult.public_id;
      }

      const docRef = await addDoc(anggotaCol, createData);

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
      const validSortFields = ['createdAt', 'namaAnggota', 'universitas', 'programStudi', 'idAnggota'] as const;
      const validSortBy = validSortFields.includes(sortBy as typeof validSortFields[number]) ? sortBy : 'createdAt';
      const validOrder = (order === 'asc' || order === 'desc') ? order : 'desc';

      // Fetch all data using firestore service (will be optimized with cursor-based pagination later)
      const { data: anggotaList } = await fetchPaginatedData<Anggota>(
        'anggota',
        { 
          pageSize: 1000, // Large limit to get all data for client-side filtering
          orderByField: validSortBy,
          orderDirection: validOrder as 'asc' | 'desc'
        }
      );

      // Filter only active members (isActive === true, handles both boolean and legacy string values)
      let filteredList = anggotaList.filter(a => a.isActive === true || (a.isActive as unknown) === 'true');

      // Filter by search query (nama, universitas, programStudi)
      // Note: For better performance, consider using Algolia or Typesense for full-text search
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