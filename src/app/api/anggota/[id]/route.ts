import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';
import { doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import cloudinary from '../../../../lib/cloudinary';
import { Buffer } from 'buffer';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ message: 'ID tidak ditemukan.' }, { status: 400 });
    }

    const docRef = doc(db, 'anggota', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ message: 'Anggota tidak ditemukan.' }, { status: 404 });
    }

    const oldData = docSnap.data();
    if (oldData.anggotaPublicId) {
      try {
        await cloudinary.uploader.destroy(oldData.anggotaPublicId);
      } catch (e) {
        console.error('Failed to destroy Cloudinary image:', e);
      }
    }

    await deleteDoc(docRef);
    return NextResponse.json({ message: 'Anggota berhasil dihapus.' }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: 'Gagal menghapus anggota.', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const formData = await req.formData();

    const docRef = doc(db, 'anggota', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ message: 'Anggota tidak ditemukan.' }, { status: 404 });
    }

    const oldData = docSnap.data();
    const updateData: any = {
      updatedAt: new Date().toISOString(),
    };

    const namaAnggota = formData.get('namaAnggota') as string | null;
    if (namaAnggota !== null) updateData.namaAnggota = namaAnggota;

    const universitas = formData.get('universitas') as string | null;
    if (universitas !== null) updateData.universitas = universitas;

    const programStudi = formData.get('programStudi') as string | null;
    if (programStudi !== null) updateData.programStudi = programStudi;

    const angkatan = formData.get('angkatan') as string | null;
    if (angkatan !== null) updateData.angkatan = angkatan;

    const isActive = formData.get('isActive');
    if (isActive !== null) updateData.isActive = (isActive === 'true');

    const file = formData.get('image') as File | null;
    const deleteImage = formData.get('deleteImage') === 'true';

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: 'auto', folder: 'anggota' },
          (error: any, result: any) => {
            if (error || !result) reject(error || new Error('Upload to Cloudinary failed'));
            else resolve(result);
          }
        ).end(buffer);
      });

      if (oldData.anggotaPublicId) {
        try { await cloudinary.uploader.destroy(oldData.anggotaPublicId); } catch(delErr) {}
      }
      
      // Optimasi gambar menjadi rasio 1:1 (kotak)
      const optimizedUrl = uploadResult.secure_url.replace('/upload/', '/upload/c_fill,ar_1:1,g_auto/');
      
      updateData.photoURL = optimizedUrl;
      updateData.anggotaPublicId = uploadResult.public_id;
    } else if (deleteImage) {
      if (oldData.anggotaPublicId) {
        try { await cloudinary.uploader.destroy(oldData.anggotaPublicId); } catch(delErr) {}
      }
      updateData.photoURL = null;
      updateData.anggotaPublicId = null;
    }

    await updateDoc(docRef, updateData);
    return NextResponse.json({ message: 'Anggota berhasil diupdate.' }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: 'Gagal mengupdate anggota.', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}