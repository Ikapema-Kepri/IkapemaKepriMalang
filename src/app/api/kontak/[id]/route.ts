import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const VALID_IDS = ['instagram', 'whatsapp', 'email', 'sekretariat'] as const;
type KontakId = (typeof VALID_IDS)[number];

// Field whitelist per kontak type — mencegah data sembarangan masuk
const ALLOWED_FIELDS: Record<KontakId, string[]> = {
  instagram: ['username', 'url', 'isActive'],
  whatsapp: ['namaKontak', 'nomorKontak', 'nomorApi', 'departemen', 'pesanDefault', 'isActive'],
  email: ['alamatEmail', 'isActive'],
  sekretariat: ['namaLokasi', 'alamat', 'gmapsUrl', 'jamOperasional', 'isActive'],
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!VALID_IDS.includes(id as KontakId)) {
      return NextResponse.json({ message: 'ID kontak tidak valid.' }, { status: 400 });
    }

    const docSnap = await getDoc(doc(db, 'kontak', id));
    if (!docSnap.exists()) {
      return NextResponse.json({ message: 'Kontak tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Data kontak berhasil diambil.',
      data: { id: docSnap.id, ...docSnap.data() },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: 'Gagal mengambil data kontak.', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!VALID_IDS.includes(id as KontakId)) {
      return NextResponse.json({ message: 'ID kontak tidak valid.' }, { status: 400 });
    }

    // Selalu terima JSON (kontak tidak punya gambar)
    const body = await req.json();

    // Filter hanya field yang diizinkan untuk id ini
    const allowedFields = ALLOWED_FIELDS[id as KontakId];
    const updateData: Record<string, unknown> = { updatedAt: new Date().toISOString() };
    for (const field of allowedFields) {
      if (field in body) {
        updateData[field] = body[field];
      }
    }

    const docRef = doc(db, 'kontak', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, updateData);
    } else {
      // Dokumen belum ada — buat baru (upsert)
      await setDoc(docRef, { ...updateData, createdAt: new Date().toISOString() });
    }

    return NextResponse.json({ message: 'Kontak berhasil disimpan.' }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error updating kontak:', error);
    return NextResponse.json(
      { message: 'Gagal menyimpan kontak.', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
