import React from 'react';
import { LucideIcon } from 'lucide-react';
import { KontakInstagram, KontakWhatsapp, KontakEmail, KontakSekretariat } from '@/types';

type AnyContact = KontakInstagram | KontakWhatsapp | KontakEmail | KontakSekretariat;

interface KontakCardProps {
    icon: LucideIcon;
    label: string;
    data?: AnyContact | null;
    cta: string;
    accent: string;
}

const KontakCard = ({ icon: Icon, label, data, cta, accent }: KontakCardProps) => {
  // Fungsi penolong untuk menetapkan value dan tautan otomatis berdasarkan "id" tipe kontak
  const getDisplayData = () => {
    if (!data) return { value: '-', href: '#' };

    switch (data.id) {
      case 'instagram':
        return {
          value: data.username || "@ikapemakeprimalang",
          href: data.url || "https://www.instagram.com/ikapemakeprimalang/"
        };
      case 'whatsapp':
        return {
          value: `${data.namaKontak || "Nova Syahfitri"} - ${data.departemen || "Humas"}`,
          href: data.nomorApi ? `https://wa.me/${data.nomorApi}?text=${encodeURIComponent(data.pesanDefault || '')}` : "https://wa.link/1yq1z6"
        };
      case 'email':
        return {
          value: data.alamatEmail || "ikapemakepri.malang@gmail.com",
          href: `mailto:${data.alamatEmail || "ikapemakepri.malang@gmail.com"}`
        };
      case 'sekretariat':
        return {
          value: data.namaLokasi || "Asrama Putra Ikapema",
          href: data.mapsUrl
        };
      default:
        return { value: '-', href: '#' };
    }
  };

  const { value, href } = getDisplayData();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)] transition-[var(--transition-smooth)] hover:shadow-[var(--shadow-elegant)]"
    >
      <div
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-25"
        style={{ background: accent }}
        aria-hidden
      />
      <div
        className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md"
        style={{ background: accent }}
      >
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold text-foreground break-all">{value}</p>
      <p className="mt-4 inline-flex items-center text-sm font-medium text-brand">
        {cta}
        <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
      </p>
    </a>
  );
};

export default KontakCard;
