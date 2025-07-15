// pages/api/anggota/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Anggota, ApiResponse } from '../../../types'; // Impor tipe data

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Anggota>>
) {
  const { id } = req.query; // ID anggota dari URL

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'ID anggota tidak valid.' });
  }

  const docRef = doc(db, 'anggota', id);

  if (req.method === 'GET') {
    try {
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return res.status(404).json({ message: 'Anggota tidak ditemukan.' });
      }

      res.status(200).json({ message: 'Anggota berhasil diambil.', data: { id: docSnap.id, ...docSnap.data() } as Anggota });
    } catch (error: unknown) {
      console.error('Error fetching member:', error);
      res.status(500).json({ 
        message: 'Gagal mengambil data anggota.', 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
  } else if (req.method === 'PUT') {
    try {
      const { namaAnggota, universitas, programStudi, photoURL } = req.body as Anggota;

      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        return res.status(404).json({ message: 'Anggota tidak ditemukan.' });
      }

      await updateDoc(docRef, {
        namaAnggota,
        universitas,
        programStudi,
        photoURL: photoURL || null
      });

      res.status(200).json({ message: 'Anggota berhasil diperbarui!' });
    } catch (error: unknown) {
      console.error('Error updating member:', error);
      res.status(500).json({ 
        message: 'Gagal memperbarui anggota.', 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
  } else if (req.method === 'DELETE') {
    try {
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        return res.status(404).json({ message: 'Anggota tidak ditemukan.' });
      }

      await deleteDoc(docRef);
      res.status(200).json({ message: 'Anggota berhasil dihapus!' });
    } catch (error: unknown) {
      console.error('Error deleting member:', error);
      res.status(500).json({ message: 'Gagal menghapus anggota.', error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}