// types/index.ts
export interface Anggota {
  id?: string; // ID Firestore bersifat opsional saat membuat, wajib saat mengambil
  namaAnggota: string;
  universitas: string;
  programStudi: string;
  photoURL?: string | null; // Opsional dan bisa null
}

export interface ApiResponse<T = unknown> {
  message: string;
  data?: T;
  error?: string;
  id?: string;
}