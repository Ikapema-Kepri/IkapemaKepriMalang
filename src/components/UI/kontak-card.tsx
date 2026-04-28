import React from 'react';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';

interface KontakCardProps {
    icon: LucideIcon    ;
    label: string;
    value: string;
    href: string;
    cta: string;
    accent: string;
}

const KontakCard = ({ icon: Icon, label, value, href, cta, accent }: KontakCardProps) => {
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
