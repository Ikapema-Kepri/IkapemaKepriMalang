import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const KONTAK_IDS = ['instagram', 'whatsapp', 'email', 'sekretariat'] as const;

export async function GET() {
  try {
    const promises = KONTAK_IDS.map((id) => getDoc(doc(db, 'kontak', id)));
    const snapshots = await Promise.all(promises);

    const [instagramSnap, whatsappSnap, emailSnap, sekretariatSnap] = snapshots;

    const result = {
      kontakInstagram: instagramSnap.exists()
        ? { id: 'instagram', ...instagramSnap.data() }
        : null,
      kontakWhatsapp: whatsappSnap.exists()
        ? { id: 'whatsapp', ...whatsappSnap.data() }
        : null,
      kontakEmail: emailSnap.exists()
        ? { id: 'email', ...emailSnap.data() }
        : null,
      kontakSekretariat: sekretariatSnap.exists()
        ? { id: 'sekretariat', ...sekretariatSnap.data() }
        : null,
    };

    return NextResponse.json({
      message: 'Data kontak berhasil diambil.',
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error('Error fetching kontak:', error);
    return NextResponse.json(
      { message: 'Gagal mengambil data kontak.', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
