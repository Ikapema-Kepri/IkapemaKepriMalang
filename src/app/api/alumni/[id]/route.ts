import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ message: 'ID tidak ditemukan.' }, { status: 400 });
    }
    await deleteDoc(doc(db, 'anggota', id));
    return NextResponse.json({ message: 'Alumni berhasil dihapus.' }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: 'Gagal menghapus alumni.', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Normalize isActive to boolean to avoid string 'true'/'false' being stored in Firestore
    if ('isActive' in body) {
      body.isActive = body.isActive === true || body.isActive === 'true';
    }

    await updateDoc(doc(db, 'anggota', id), body);
    return NextResponse.json({ message: 'Alumni berhasil diupdate.' }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: 'Gagal mengupdate alumni.', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
