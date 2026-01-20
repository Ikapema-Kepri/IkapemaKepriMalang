// types/index.ts
export interface Anggota {
  id?: string; // ID Firestore bersifat opsional saat membuat, wajib saat mengambil
  namaAnggota: string;
  universitas: string;
  programStudi: string;
  angkatan: string;
  photoURL?: string | null; // Opsional dan bisa null
  isActive?: boolean; // Status aktif/tidak aktif anggota
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiResponse<T = unknown> {
  message: string;
  data?: T;
  error?: string;
  id?: string;
  pagination?: PaginationInfo;
}