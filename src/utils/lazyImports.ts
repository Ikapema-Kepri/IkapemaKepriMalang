import { lazy } from 'react';

// Lazy load komponen berdasarkan route
export const lazyRoutes = {
  Beranda: lazy(() => import('../app/beranda/page')),
  Tentang: lazy(() => import('../app/tentang/page')),
  Struktur: lazy(() => import('../app/struktur/pengurus/page')),
  Anggota: lazy(() => import('../app/struktur/anggota/page')),
  Kontak: lazy(() => import('../app/kontak/page')),
  Admin: lazy(() => import('../app/admin/page')),
};

// Lazy load komponen section
export const lazySections = {
  HeroSection: lazy(() => import('../components/BerandaSection/HeroSection/HeroSection')),
  TentangSection: lazy(() => import('../components/BerandaSection/TentangSection/TentangSection')),
  KegiatanSection: lazy(() => import('../components/BerandaSection/KegiatanSection/KegiatanSection')),
  SambutanSection: lazy(() => import('../components/BerandaSection/SambutanSection/SambutanSection')),
  FaqSection: lazy(() => import('../components/BerandaSection/FaqSection/FaqSection')),
  AsramaSection: lazy(() => import('../components/BerandaSection/AsramaSection/AsramaSection')),
  EmagzSection: lazy(() => import('../components/BerandaSection/EmagzSection/EmagzSection')),
};

// Lazy load UI components
export const lazyUI = {
  ProfileCard: lazy(() => import('../components/UI/ProfileCard')),
  MemberList: lazy(() => import('../components/UI/MemberList')),
  AsramaCard: lazy(() => import('../components/UI/AsramaCard')),
  FaqCard: lazy(() => import('../components/UI/FaqCard')),
  AddMemberForm: lazy(() => import('../components/UI/AddMemberForm')),
};