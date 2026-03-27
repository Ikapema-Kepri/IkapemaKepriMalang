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

export interface Banner {
  id?: string;
  bannerUrl?: string;
  bannerPath?: string;
  title?: string;
  subtitle?: string;
  updatedAt?: string;
}

export interface Sambutan {
  id?: string;
  content: string;
  fullName: string;
  period: string;
  photoPath?: string;
  photoUrl?: string;
  updatedAt?: string;
}

export interface Asrama {
  id?: string;
  name?: string;
  address?: string;
  photoUrl?: string;
  photoPath?: string;
  updatedAt?: string;
}

export interface Kegiatan {
  id?: string;
  title?: string;
  description?: string;
  label?: string;
  photoUrl?: string;
  photoPath?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface KontakAsrama {
  id?: string;
  buttonLabel?: string;
  whatsappUrl?: string;
  isActive?: boolean;
  updatedAt?: string;
  createdAt?: string;
}

export interface Majalah {
  id?: string;
  filePath?: string;
  fileUrl?: string;
  updatedAt?: string;
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