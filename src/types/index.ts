// types/index.ts
export interface Anggota {
  id?: string;
  namaAnggota: string;
  universitas: string;
  programStudi: string;
  angkatan: string;
  photoURL?: string | null;
  anggotaPublicId?: string;
  isActive?: boolean;
}

export interface Banner {
  id?: string;
  bannerUrl?: string;
  bannerPath?: string;
  title?: string;
  subtitle?: string;
  bannerPublicId?: string;
  updatedAt?: string;
}

export interface Berita {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  thumbnail: string;
  thumbnailPublicId?: string;
  category: string;
  tags?: string[];
  author: string;
  status: 'Published' | 'Draft' | 'Archived';
  published_at?: string | Date | null;
  created_at?: string | Date | null;
  updated_at?: string | Date | null;
  views?: number;
  is_featured?: boolean;
}

export interface Sambutan {
  id?: string;
  content: string;
  fullName: string;
  period: string;
  photoPath?: string;
  photoUrl?: string;
  sambutanPublicId?: string;
  updatedAt?: string;
}

export interface Asrama {
  id?: string;
  name?: string;
  address?: string;
  photoUrl?: string;
  photoPath?: string;
  asramaPublicId?: string;
  updatedAt?: string;
}

export interface Kegiatan {
  id?: string;
  title?: string;
  description?: string;
  label?: string;
  photoUrl?: string;
  photoPath?: string;
  kegiatanPublicId?: string;
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
  title?: string;
  photoUrl?: string;
  majalahPublicId?: string;
  updatedAt?: string;
}
export interface BaseKontak {
  isActive?: boolean;
  updatedAt?: string;
  createdAt?: string;
}

export interface KontakInstagram extends BaseKontak {
  id: 'instagram'; // Harus persis 'instagram'
  username?: string;
  url?: string;
}

export interface KontakWhatsapp extends BaseKontak {
  id: 'whatsapp'; // Harus persis 'whatsapp'
  namaKontak?: string;
  nomorKontak?: string;
  nomorApi?: string;
  departemen?: string;
  pesanDefault?: string;
}

export interface KontakEmail extends BaseKontak {
  id: 'email'; // Harus persis 'email'
  alamatEmail?: string;
}

export interface KontakSekretariat extends BaseKontak {
  id: 'sekretariat'; // Harus persis 'sekretariat'
  namaLokasi?: string;
  alamat?: string;
  mapsUrl?: string;
  mapsEmbedUrl?: string;
  jamOperasional?: string;
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

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  [key: string]: unknown;
}