"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, CalendarDays } from "lucide-react";
import { Berita } from "@/data/sampleData";

interface BeritaCardProps {
  berita: Berita;
}

const BeritaCard = ({ berita }: BeritaCardProps) => {
  // Format date safely
  const formattedDate = berita.published_at 
    ? new Date(berita.published_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
      })
    : "Belum dipublikasi";

  return (
    <Link href={`/berita/${berita.slug}`} className="group block h-full">
      <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:-translate-y-1">
        {/* Thumbnail Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={berita.thumbnail || "/LogoIkapema.webp"}
            alt={berita.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Category Badge */}
          {berita.category && (
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#00A3CC] uppercase tracking-wider shadow-sm">
              {berita.category}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-grow p-4 sm:p-5">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#00A3CC] transition-colors duration-200">
            {berita.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
            {berita.summary}
          </p>
          
          {/* Footer Card: Meta information */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 pt-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-gray-400" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-gray-400" />
              <span>{berita.views || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BeritaCard;
