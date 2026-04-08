"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useBerita } from "@/hooks/useBerita";
import BeritaCard from "@/components/UI/berita-card";
import AnggotaPagination from "@/components/struktur/anggota/AnggotaPagination";

type SortOption = "terbaru" | "terlama" | "terpopuler";
const ITEMS_PER_PAGE = 6;

const BeritaPage: React.FC = () => {
  const [isIOS, setIsIOS] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  const { beritas, loading } = useBerita();

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("terbaru");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Animation Refs
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, {
    once: false,
    margin: "-10px 0px -100px 0px",
    amount: 0.3,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const detectIOS = () => {
      return (
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
      );
    };
    setIsIOS(detectIOS());
  }, []);

  // Filter & Sort Logic
  const filteredBerita = useMemo(() => {
    let result = beritas.filter((b) => b.status === "Published");

    // Search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(lowerSearch) ||
          b.summary.toLowerCase().includes(lowerSearch) ||
          (b.category && b.category.toLowerCase().includes(lowerSearch))
      );
    }

    // Sort order
    result.sort((a, b) => {
      if (sortBy === "terpopuler") {
        return (b.views || 0) - (a.views || 0);
      }
      
      const dateA = a.published_at ? new Date(a.published_at).getTime() : 0;
      const dateB = b.published_at ? new Date(b.published_at).getTime() : 0;

      if (sortBy === "terbaru") {
        return dateB - dateA;
      } else { // terlama
        return dateA - dateB;
      }
    });

    return result;
  }, [beritas, searchTerm, sortBy]);

  // Derived Pagination Data
  const totalPages = Math.ceil(filteredBerita.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBerita = filteredBerita.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const headingBeritaSRC = isIOS
    ? "/heading/HeadingBerita.webp"
    : "/heading/HeadingBerita.svg";

  return (
    <div
      className={`min-h-screen bg-[#F5F9FA] transition-opacity duration-1000 ease-out pb-0 ${
        isPageLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Animated Header Section using Framer Motion logic */}
      <section className="w-full pt-36 md:pt-44 pb-24 px-4 text-center relative z-10 bg-gradient-to-b from-[#005266] to-[#00A3CC] rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-lg">
        <div
          ref={headerRef}
          className={`flex flex-col items-center justify-center transition-all duration-1200 ease-out delay-100 ${
            isHeaderInView && isPageLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          {/* Image replacing the plain "Berita" text */}
          <div
            className={`flex items-center justify-center gap-4 transition-all duration-800 delay-300 ${
              isHeaderInView && isPageLoaded
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-6 scale-95"
            }`}
          >
            <Image
              src={headingBeritaSRC}
              alt="Heading Berita"
              width={454}
              height={100}
              className="h-13 md:h-22 lg:h-[18.356vh] w-auto max-w-[90%]"
            />
          </div>

          <p
            className={`text-lg md:text-xl lg:text-2xl font-medium text-white/95 max-w-2xl mx-auto mt-6 transition-all duration-800 delay-500 ${
              isHeaderInView && isPageLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Kumpulan Informasi Terkini dan Kegiatan
            <br className="hidden sm:block" />
            Seputar Pelajar Mahasiswa Kepulauan Riau — Malang.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="w-full relative z-0 -mt-16 pt-24 pb-48 px-4 sm:px-6 lg:px-8 min-h-[70vh]">
        <div className="max-w-7xl mx-auto">
          
          {/* Controls: Search & Filter */}
          <div className="flex flex-col md:flex-row gap-5 items-center justify-between mb-12 bg-white p-4 sm:p-5 rounded-3xl shadow-sm border border-gray-100">
            {/* Search Input */}
            <div className="relative w-full md:w-[28rem]">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Cari berita..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset page on query
                }}
                className="block w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A3CC] focus:bg-white text-gray-900 transition-all sm:text-sm"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative w-full md:w-auto flex items-center gap-3">
              <div className="flex items-center gap-3 text-gray-700 bg-gray-50 px-4 py-3.5 rounded-2xl border border-gray-200 focus-within:ring-2 focus-within:ring-[#00A3CC] focus-within:bg-white transition-all">
                <SlidersHorizontal className="w-5 h-5 text-[#00A3CC]" />
                <span className="text-sm font-normal hidden sm:inline text-gray-500">Urutkan: </span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as SortOption);
                    setCurrentPage(1); // Reset page on sort
                  }}
                  className="bg-transparent text-sm font-normal focus:outline-none text-[#00A3CC] cursor-pointer w-full"
                >
                  <option value="terbaru">Terbaru</option>
                  <option value="terpopuler">Terpopuler</option>
                  <option value="terlama">Terlama</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid Berita */}
          {loading ? (
             <div className="flex justify-center items-center py-20 min-h-[300px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A3CC]"></div>
             </div>
          ) : filteredBerita.length > 0 ? (
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8 w-full mb-10">
                {paginatedBerita.map((item) => (
                  <BeritaCard key={item.id} berita={item} />
                ))}
              </div>
              
              {/* Pagination UI wrapper */}
              {totalPages > 1 && (
                <div className="inline-flex items-center justify-center mt-2">
                  <AnggotaPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20 px-4 bg-transparent max-w-2xl mx-auto mt-10">
              <div className="inline-flex items-center justify-center mb-6 opacity-60">
                <Search className="h-16 w-16 text-[#00A3CC]" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight">Tidak ada berita saat ini</h3>
              <p className="text-gray-500 text-base">Nantikan berita selanjutnya!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BeritaPage;