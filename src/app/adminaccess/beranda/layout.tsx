"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const subNavItems = [
  { label: "🖼 Hero",     href: "/adminaccess/beranda/hero" },
  { label: "👤 Sambutan", href: "/adminaccess/beranda/sambutan" },
  { label: "🏠 Asrama",   href: "/adminaccess/beranda/asrama" },
  { label: "📅 Kegiatan", href: "/adminaccess/beranda/kegiatan" },
  { label: "🎓 Alumni",   href: "/adminaccess/beranda/alumni" },
  { label: "📖 Majalah",  href: "/adminaccess/beranda/majalah" },
];

export default function BerandaLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <nav className="flex flex-wrap gap-3">
          {subNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium whitespace-nowrap border rounded-sm transition-colors",
                  isActive
                    ? "text-white bg-[#002933]"
                    : "border-1 bg-white text-muted-foreground hover:text-foreground hover:border-[#002933]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div>{children}</div>
    </div>
  );
}
