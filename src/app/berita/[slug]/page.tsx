"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Eye, User } from "lucide-react";
import { berita } from "@/data/sampleData";

export default function BeritaDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const detail = berita.find((b) => b.slug === resolvedParams.slug);

  if (!detail) {
    return (
      <div className="min-h-screen bg-[#F5F9FA] flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Berita Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-8">Maaf, artikel yang Anda cari tidak tersedia atau telah dihapus.</p>
        <Link 
          href="/berita" 
          className="flex items-center gap-2 px-6 py-3 bg-[#00A3CC] text-white rounded-full font-medium hover:bg-[#008BB0] transition-colors shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Berita
        </Link>
      </div>
    );
  }

  const formattedDate = detail.published_at
    ? new Date(detail.published_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Belum dipublikasi";

  return (
    <div className="min-h-screen bg-[#F5F9FA] pb-24 pt-28 md:pt-36">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back button */}
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 text-[#00A3CC] hover:text-[#008BB0] font-bold mb-10 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Daftar Berita
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          {detail.category && (
            <span className="inline-block px-3 py-1 bg-[#E5FAFF] text-[#00A3CC] rounded-full text-xs font-bold uppercase tracking-wide mb-5">
              {detail.category}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
            {detail.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#00A3CC]" />
              <span className="font-semibold text-gray-800">{detail.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-gray-400" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-gray-400" />
              <span>{detail.views || 0} tayangan</span>
            </div>
          </div>
        </div>

        {/* Article Thumbnail */}
        <div className="relative w-full aspect-[21/9] md:aspect-[16/7] rounded-3xl overflow-hidden mb-12 shadow-lg bg-gray-100 border border-gray-100">
          <Image
            src={detail.thumbnail || "/LogoIkapema.webp"}
            alt={detail.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        {/* Menggunakan dangerouslySetInnerHTML karena `content` seringnya Rich Text/HTML */}
        <article
          className="prose prose-lg md:prose-xl prose-[#00A3CC] max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: detail.content }}
        />

        {/* Tags */}
        {detail.tags && detail.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider flex items-center gap-2">
              Tags:
            </h3>
            <div className="flex flex-wrap gap-2">
              {detail.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 bg-gray-200/50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer border border-gray-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
