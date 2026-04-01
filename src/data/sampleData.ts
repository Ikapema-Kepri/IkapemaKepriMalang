
export interface Member {
  id: number;
  nama: string;
  universitas: string;
  prodi: string;
  angkatan: number;
  email: string;
  status: 'Active' | 'Pending' | 'Inactive';
  avatar: string;
}

export interface Alumni {
  id: number;
  nama: string;
  nim: string;
  universitas: string;
  prodi: string;
  angkatan: number;
  tahun_lulus: number;
  pekerjaan: string;
  perusahaan: string;
  linkedin: string;
  email: string;
  telepon: string;
  alamat: string;
  status: 'Terverifikasi' | 'Belum Terverifikasi';
}

export interface Berita {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  thumbnail: string;
  category: string;
  tags: string[];
  author: string;
  status: 'Published' | 'Draft' | 'Archived';
  published_at: string | Date | any;
  created_at: string | Date | any;
  updated_at: string | Date | any;
  views: number;
  is_featured: boolean;
}

export const members: Member[] = [
  { id: 1, nama: "Rina Pratama", universitas: "Universitas Brawijaya", prodi: "Teknologi Informasi", angkatan: 2021, email: "rina@ub.ac.id", status: "Active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rina" },
  { id: 2, nama: "Toni Wirawan", universitas: "Universitas Negeri Malang", prodi: "Sistem Informasi", angkatan: 2020, email: "toni@unm.ac.id", status: "Pending", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Toni" },
  { id: 3, nama: "Siti Aulia", universitas: "Universitas Brawijaya", prodi: "Informatika", angkatan: 2019, email: "siti@ub.ac.id", status: "Inactive", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti" },
  { id: 4, nama: "Ahmad Fauzi", universitas: "Universitas Airlangga", prodi: "Teknik Komputer", angkatan: 2022, email: "ahmad@unair.ac.id", status: "Active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad" },
  { id: 5, nama: "Dewi Sartika", universitas: "Universitas Brawijaya", prodi: "Teknologi Informasi", angkatan: 2021, email: "dewi@ub.ac.id", status: "Active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi" },
  { id: 6, nama: "Budi Santoso", universitas: "Universitas Negeri Malang", prodi: "Informatika", angkatan: 2020, email: "budi@unm.ac.id", status: "Pending", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi" },
  { id: 7, nama: "Maya Putri", universitas: "Universitas Airlangga", prodi: "Sistem Informasi", angkatan: 2023, email: "maya@unair.ac.id", status: "Active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya" },
  { id: 8, nama: "Rizki Ramadan", universitas: "Universitas Brawijaya", prodi: "Teknik Komputer", angkatan: 2022, email: "rizki@ub.ac.id", status: "Active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rizki" },
];

export const alumni: Alumni[] = [
  { id: 1, nama: "Dewi Lestari", nim: "235150700111001", universitas: "Universitas Brawijaya", prodi: "Teknologi Informasi", angkatan: 2015, tahun_lulus: 2019, pekerjaan: "Software Engineer", perusahaan: "TechCorp Indonesia", linkedin: "https://linkedin.com/in/dewil", email: "dewi.lestari@gmail.com", telepon: "081234567890", alamat: "Jakarta Selatan", status: "Terverifikasi" },
  { id: 2, nama: "Agus Santoso", nim: "235150700111002", universitas: "Universitas Airlangga", prodi: "Sistem Informasi", angkatan: 2014, tahun_lulus: 2018, pekerjaan: "Product Manager", perusahaan: "StartupX", linkedin: "", email: "agus.santoso@yahoo.com", telepon: "082345678901", alamat: "Surabaya", status: "Belum Terverifikasi" },
  { id: 3, nama: "Fitri Handayani", nim: "235150700111003", universitas: "Universitas Brawijaya", prodi: "Informatika", angkatan: 2016, tahun_lulus: 2020, pekerjaan: "Data Analyst", perusahaan: "Gojek", linkedin: "https://linkedin.com/in/fitri", email: "fitri.h@gmail.com", telepon: "083456789012", alamat: "Bandung", status: "Terverifikasi" },
  { id: 4, nama: "Hendro Wijaya", nim: "235150700111004", universitas: "Universitas Negeri Malang", prodi: "Teknik Komputer", angkatan: 2015, tahun_lulus: 2019, pekerjaan: "DevOps Engineer", perusahaan: "Tokopedia", linkedin: "https://linkedin.com/in/hendro", email: "hendro.w@outlook.com", telepon: "084567890123", alamat: "Jakarta Pusat", status: "Terverifikasi" },
];

export const berita: Berita[] = [
  {
    id: "1",
    title: "Ikapema Goes To School",
    slug: "ikapema-goes-to-school",
    summary: "Roadshow sosialisasi kampus ke SMA se-Malang. Kegiatan ini bertujuan untuk memperkenalkan dunia perkuliahan kepada siswa-siswi SMA.",
    content: "<p>Roadshow sosialisasi kampus ke SMA se-Malang. Kegiatan ini bertujuan untuk memperkenalkan dunia perkuliahan kepada siswa-siswi SMA.</p>\n<p>Acara ini diselenggarakan setiap tahunnya agar para siswa...</p>",
    thumbnail: "/kegiatan/IGS.webp",
    category: "event",
    tags: ["roadshow", "kampus", "sma"],
    author: "Departemen Eksternal",
    status: "Published",
    published_at: "2025-11-10T08:00:00Z",
    created_at: "2025-11-01T08:00:00Z",
    updated_at: "2025-11-10T08:00:00Z",
    views: 125,
    is_featured: true
  },
  {
    id: "2",
    title: "Workshop UI/UX Design",
    slug: "workshop-ui-ux-design",
    summary: "Workshop intensif untuk meningkatkan skill desain antarmuka bagi anggota Ikapema. Materi mencakup Figma dan prototyping.",
    content: "<p>Workshop intensif untuk meningkatkan skill desain antarmuka bagi anggota Ikapema. Materi mencakup Figma dan prototyping.</p>\n<p>Tersedia sertifikat bagi seluruh peserta yang hadir secara penuh.</p>",
    thumbnail: "/kegiatan/Gathering.webp",
    category: "workshop",
    tags: ["uiux", "design", "figma"],
    author: "Departemen Kominfo",
    status: "Draft",
    published_at: null,
    created_at: "2025-12-01T08:00:00Z",
    updated_at: "2025-12-01T08:00:00Z",
    views: 0,
    is_featured: false
  },
  {
    id: "3",
    title: "Ikapema Career Fair 2025",
    slug: "ikapema-career-fair-2025",
    summary: "Pameran karir tahunan yang menghadirkan berbagai perusahaan teknologi terkemuka untuk rekrutmen alumni dan anggota.",
    content: "<p>Pameran karir tahunan yang menghadirkan berbagai perusahaan teknologi terkemuka untuk rekrutmen alumni dan anggota.</p>",
    thumbnail: "/kegiatan/ODI.webp",
    category: "event",
    tags: ["careerfair", "rekrutmen", "alumni"],
    author: "Departemen Eksternal",
    status: "Published",
    published_at: "2025-10-15T08:00:00Z",
    created_at: "2025-10-01T08:00:00Z",
    updated_at: "2025-10-15T08:00:00Z",
    views: 540,
    is_featured: true
  },
  {
    id: "4",
    title: "Hackathon Ikapema",
    slug: "hackathon-ikapema",
    summary: "Kompetisi programming 24 jam untuk mengembangkan solusi teknologi inovatif. Terbuka untuk semua anggota aktif.",
    content: "<p>Kompetisi programming 24 jam untuk mengembangkan solusi teknologi inovatif. Terbuka untuk semua anggota aktif.</p>\n<p>Dipersilakan membentuk tim maksimum 3 orang.</p>",
    thumbnail: "/kegiatan/TOPH.webp",
    category: "competition",
    tags: ["hackathon", "programming", "lomba"],
    author: "Departemen Kominfo",
    status: "Archived",
    published_at: "2025-09-20T08:00:00Z",
    created_at: "2025-09-10T08:00:00Z",
    updated_at: "2025-09-25T08:00:00Z",
    views: 95,
    is_featured: false
  },
  {
    id: "5",
    title: "Hackathon Ikapema",
    slug: "hackathon-ikapema",
    summary: "Kompetisi programming 24 jam untuk mengembangkan solusi teknologi inovatif. Terbuka untuk semua anggota aktif.",
    content: "<p>Kompetisi programming 24 jam untuk mengembangkan solusi teknologi inovatif. Terbuka untuk semua anggota aktif.</p>\n<p>Dipersilakan membentuk tim maksimum 3 orang.</p>",
    thumbnail: "/kegiatan/TOPH.webp",
    category: "competition",
    tags: ["hackathon", "programming", "lomba"],
    author: "Departemen Kominfo",
    status: "Archived",
    published_at: "2025-09-20T08:00:00Z",
    created_at: "2025-09-10T08:00:00Z",
    updated_at: "2025-09-25T08:00:00Z",
    views: 95,
    is_featured: false
  },
  {
    id: "6",
    title: "Hackathon Ikapema",
    slug: "hackathon-ikapema",
    summary: "Kompetisi programming 24 jam untuk mengembangkan solusi teknologi inovatif. Terbuka untuk semua anggota aktif.",
    content: "<p>Kompetisi programming 24 jam untuk mengembangkan solusi teknologi inovatif. Terbuka untuk semua anggota aktif.</p>\n<p>Dipersilakan membentuk tim maksimum 3 orang.</p>",
    thumbnail: "/kegiatan/TOPH.webp",
    category: "competition",
    tags: ["hackathon", "programming", "lomba"],
    author: "Departemen Kominfo",
    status: "Archived",
    published_at: "2025-09-20T08:00:00Z",
    created_at: "2025-09-10T08:00:00Z",
    updated_at: "2025-09-25T08:00:00Z",
    views: 95,
    is_featured: false
  },
  {
    id: "7",
    title: "Hackathon Ikapema",
    slug: "hackathon-ikapema",
    summary: "Kompetisi programming 24 jam untuk mengembangkan solusi teknologi inovatif. Terbuka untuk semua anggota aktif.",
    content: "<p>Kompetisi programming 24 jam untuk mengembangkan solusi teknologi inovatif. Terbuka untuk semua anggota aktif.</p>\n<p>Dipersilakan membentuk tim maksimum 3 orang.</p>",
    thumbnail: "/kegiatan/TOPH.webp",
    category: "competition",
    tags: ["hackathon", "programming", "lomba"],
    author: "Departemen Kominfo",
    status: "Archived",
    published_at: "2025-09-20T08:00:00Z",
    created_at: "2025-09-10T08:00:00Z",
    updated_at: "2025-09-25T08:00:00Z",
    views: 95,
    is_featured: false
  },
  {
    id: "8",
    title: "Hackathon Ikapema",
    slug: "hackathon-ikapema",
    summary: "Kompetisi programming 24 jam untuk mengembangkan solusi teknologi inovatif. Terbuka untuk semua anggota aktif.",
    content: "<p>Kompetisi programming 24 jam untuk mengembangkan solusi teknologi inovatif. Terbuka untuk semua anggota aktif.</p>\n<p>Dipersilakan membentuk tim maksimum 3 orang.</p>",
    thumbnail: "/kegiatan/TOPH.webp",
    category: "competition",
    tags: ["hackathon", "programming", "lomba"],
    author: "Departemen Kominfo",
    status: "Archived",
    published_at: "2025-09-20T08:00:00Z",
    created_at: "2025-09-10T08:00:00Z",
    updated_at: "2025-09-25T08:00:00Z",
    views: 95,
    is_featured: false
  },
];

export type ActivityType = 'tambah' | 'update' | 'publish' | 'verifikasi' | 'hapus';

export interface Activity {
  id: number;
  type: ActivityType;
  message: string;
  time: string;
}

export const recentActivities: Activity[] = [
  { id: 1, type: 'tambah',     message: 'Anggota Maya Putri berhasil ditambahkan',             time: '5 menit lalu' },
  { id: 2, type: 'update',     message: 'Anggota Toni Wirawan berhasil diperbarui statusnya',   time: '1 jam lalu' },
  { id: 3, type: 'publish',    message: 'Berita Workshop UI/UX berhasil dipublikasikan',         time: '2 jam lalu' },
  { id: 4, type: 'verifikasi', message: 'Alumni Fitri Handayani berhasil diverifikasi',          time: '3 jam lalu' },
  { id: 5, type: 'hapus',      message: 'Anggota User Test berhasil dihapus',                   time: '1 hari lalu' },
  { id: 6, type: 'tambah',     message: 'Anggota Rizki Ramadan berhasil ditambahkan',            time: '1 hari lalu' },
  { id: 7, type: 'update',     message: 'Kontak Asrama Kepri berhasil diperbarui',               time: '2 hari lalu' },
];

export const universities = [
  "Semua Universitas",
  "Universitas Brawijaya",
  "Universitas Negeri Malang", 
  "Universitas Airlangga",
];

export const angkatanOptions = [
  "Semua Angkatan",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
];

export const statusOptions = [
  "Semua Status",
  "Active",
  "Pending",
  "Inactive",
];

export const dashboardStats = [
    {
      title: 'Total Anggota',
      value: '500',
      icon: '👥',
      iconBgColor: 'bg-bg-success',
      valueColor: 'border-success',
      iconColor: 'text-success',
      trend: { value: 12, isPositive: true }
  },  
  {
      title: 'Anggota Aktif',
      value: '300',
      icon: '📈',
      iconBgColor: 'bg-bg-notice',
      valueColor: 'border-notice',
      iconColor: 'text-notice',
      trend: { value: 8, isPositive: true }
  },  
  {
      title: 'Total Alumni',
      value: '400',
      icon: '🎓',
      iconBgColor: 'bg-bg-warning',
      valueColor: 'border-warning',
      iconColor: 'text-warning',
      trend: { value: 5, isPositive: true }
  },  
  {
      title: 'Berita Terpublikasi',
      value: '200',
      icon: '📰',
      iconBgColor: 'bg-bg-info',
      valueColor: 'border-info',
      iconColor: 'text-info',
      trend: { value: 5, isPositive: true }
  },  



]

export interface KegiatanItem {
  id: number;
  title: string;
  description: string;
  label: string;
  photoUrl: string;
}

export interface BeritaKegiatanItem {
  id: number;
  title: string;
  description: string;
  label: string;
  date: string;
  photoUrl: string;
  status: 'Published' | 'Draft';
}

export interface AlumniShowcaseItem {
  id: number;
  nama: string;
  tempatBekerja: string;
  testimoni: string;
  photoUrl: string;
}

export const sampleAlumniShowcase: AlumniShowcaseItem[] = [
  { id: 1, nama: 'Dewi Lestari', tempatBekerja: 'Software Engineer — TechCorp Indonesia', testimoni: 'Pengalaman bersama Ikapema membentuk karakter kepemimpinan dan jaringan pertemanan yang sangat berharga bagi karir saya.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DewiLestari' },
  { id: 2, nama: 'Agus Santoso', tempatBekerja: 'Product Manager — StartupX', testimoni: 'Ikapema mengajarkan saya nilai kerja keras, kerja sama, dan rasa cinta terhadap tanah Kepri meskipun merantau jauh.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AgusSantoso' },
  { id: 3, nama: 'Fitri Handayani', tempatBekerja: 'Data Analyst — Gojek', testimoni: 'Bergabung dengan Ikapema adalah salah satu keputusan terbaik selama kuliah. Banyak program yang benar-benar mempersiapkan kita menghadapi dunia kerja.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FitriHandayani' },
  { id: 4, nama: 'Hendro Wijaya', tempatBekerja: 'DevOps Engineer — Tokopedia', testimoni: 'Rasa kekeluargaan di Ikapema tidak ada duanya. Bahkan setelah lulus, ikatan itu masih terus terasa kuat.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HendroWijaya' },
];

export const sampleKegiatan: KegiatanItem[] = [
  { id: 1, title: 'Ikapema Goes to Kampung Budaya', description: 'Kegiatan menampilkan budaya khas Kepulauan Riau kepada khalayak umum di Kampung Budaya Malang.', label: 'Departemen Kominfo', photoUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800' },
  { id: 2, title: 'I-Holiday', description: 'Kegiatan liburan bersama anggota Ikapema untuk mempererat kekeluargaan dan melepas penat perkuliahan.', label: 'Departemen Internal', photoUrl: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800' },
  { id: 3, title: 'I-Fest', description: 'Perlombaan futsal antar mahasiswa forum daerah di Malang Raya untuk mendukung gaya hidup sehat.', label: 'Departemen Eksternal', photoUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800' },
  { id: 4, title: 'Workshop UI/UX Design', description: 'Workshop intensif meningkatkan skill desain antarmuka bagi anggota Ikapema menggunakan Figma.', label: 'Departemen Kominfo', photoUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800' },
  { id: 5, title: 'Ikapema Career Fair 2025', description: 'Pameran karir menghadirkan perusahaan teknologi terkemuka untuk rekrutmen alumni dan anggota.', label: 'Departemen Eksternal', photoUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800' },
];

export const sampleBeritaKegiatan: BeritaKegiatanItem[] = [
  { id: 1, title: 'Ikapema Goes to Kampung Budaya', description: 'Kegiatan menampilkan budaya khas Kepulauan Riau kepada khalayak umum di Kampung Budaya Malang.', label: 'Departemen Kominfo', date: '2025-11-10', photoUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800', status: 'Published' },
  { id: 2, title: 'I-Holiday', description: 'Kegiatan liburan bersama anggota Ikapema untuk mempererat kekeluargaan dan melepas penat perkuliahan.', label: 'Departemen Internal', date: '2025-12-01', photoUrl: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800', status: 'Draft' },
  { id: 3, title: 'I-Fest', description: 'Perlombaan futsal antar mahasiswa forum daerah di Malang Raya untuk mendukung gaya hidup sehat.', label: 'Departemen Eksternal', date: '2025-10-15', photoUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', status: 'Published' },
  { id: 4, title: 'Workshop UI/UX Design', description: 'Workshop intensif meningkatkan skill desain antarmuka bagi anggota Ikapema menggunakan Figma.', label: 'Departemen Kominfo', date: '2025-12-01', photoUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800', status: 'Draft' },
  { id: 5, title: 'Ikapema Career Fair 2025', description: 'Pameran karir menghadirkan perusahaan teknologi terkemuka untuk rekrutmen alumni dan anggota.', label: 'Departemen Eksternal', date: '2025-10-15', photoUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800', status: 'Published' },
];
