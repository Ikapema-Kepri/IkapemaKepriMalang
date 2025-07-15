import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';

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

      // Ambil id terbesar saat ini
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

  async GET(_req: NextRequest) {
    try {
      const anggotaSnapshot = await getDocs(anggotaCol);
      const anggotaList = anggotaSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return NextResponse.json({
        message: 'Daftar anggota berhasil diambil.',
        data: anggotaList
      });
    } catch (error: unknown) {
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