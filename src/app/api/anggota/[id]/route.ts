import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ message: 'ID tidak ditemukan.' }, { status: 400 });
    }
    await deleteDoc(doc(db, 'anggota', id));
    return NextResponse.json({ message: 'Anggota berhasil dihapus.' }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: 'Gagal menghapus anggota.', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    await updateDoc(doc(db, 'anggota', id), body);
    return NextResponse.json({ message: 'Anggota berhasil diupdate.' }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: 'Gagal mengupdate anggota.', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}