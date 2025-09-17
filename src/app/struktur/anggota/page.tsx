"use client";

import ProfileCard from "@/components/UI/ProfileCard";
import ProfileCardSkeleton from "@/components/UI/ProfileCardSkeleton";
import React, { useEffect, useState } from "react";
import { Anggota, ApiResponse, PaginationInfo } from "../../../types";
import AnggotaSearchBar from "@/components/UI/AnggotaSearchBar";
import Image from "next/image";
import { FiRefreshCw } from "react-icons/fi";

const SKELETON_COUNT = 24;

const AnggotaPage: React.FC = () => {
  const [members, setMembers] = useState<Anggota[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchMembers(searchQuery, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchMembers(query?: string, page: number = 1) {
    setLoading(true);
    setError(null);
    try {
      let url = `/api/anggota?page=${page}&limit=24`;
      if (query && query.trim() !== "") {
        url += `&search=${encodeURIComponent(query.trim())}`;
      }
      const response = await fetch(url);
      const data: ApiResponse<Anggota[]> = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      setMembers(data.data ?? []);
      if (data.pagination) {
        setPagination(data.pagination);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Gagal memuat anggota.");
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchMembers(query, 1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchMembers(searchQuery, newPage);
    }
  };

  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-8 pb-8">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={!pagination.hasPrev}
          className="px-3 py-2 rounded-full bg-[#00A3CC] text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-[#005266] transition-colors"
        >
          Previous
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-5 py-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              1
            </button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-full transition-colors ${
              page === pagination.currentPage
                ? "bg-[#00A3CC] text-white"
                : "bg-white border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < pagination.totalPages && (
          <>
            {endPage < pagination.totalPages - 1 && <span className="px-2">...</span>}
            <button
              onClick={() => handlePageChange(pagination.totalPages)}
              className="px-5 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              {pagination.totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={!pagination.hasNext}
          className="px-3 py-2 rounded-full bg-[#00A3CC] text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-[#005266] transition-colors"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="w-full pt-[17.133vh] px-[2%] sm:px-[3%] md:px-[4%] lg:px-[6%] xl:px-[8%] bg-[#E5FAFF] min-h-screen">
      <section className="text-center">
        <div className="flex items-center justify-center gap-4">
          <Image
            src="/heading/HeadingAnggota.svg"
            alt="Heading Anggota"
            width={454}
            height={100}
            className="h-10 md:h-20 lg:h-[12.356vh] w-auto max-w-[90%]"
          />
        </div>
      </section>

      <section className="flex gap-4 flex-col">
        <AnggotaSearchBar onSearch={handleSearch} />
        {error && (
          <div className="flex flex-col items-center mt-2">
            <span className="text-red-600 text-sm font-semibold mb-2">Gagal memuat anggota. Silahkan coba lagi</span>
            <button
              onClick={() => fetchMembers(searchQuery, pagination.currentPage)}
              className="p-3 bg-white text-[#007A99] rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
              aria-label="Muat ulang"
            >
              <FiRefreshCw className="h-7 w-7" />
            </button>
          </div>
        )}
      </section>

      {/* Pagination Info */}
      {!loading && pagination.totalItems > 0 && !error && (
        <div className="text-center font-bold text-sm text-[#002933]">
          Menampilkan {members.length} dari {pagination.totalItems} anggota
        </div>
      )}

      <section className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 lg:gap-4 md:pt-4 lg:pt-6 justify-items-center">
        {loading && !error ? (
          <div className="col-span-full w-full mb-20">
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 lg:gap-4">
              {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
                <ProfileCardSkeleton key={idx} />
              ))}
            </div>
          </div>
        ) : (
          !error &&
          members.map((member) => (
            <ProfileCard
              key={member.id}
              name={member.namaAnggota}
              department={member.programStudi}
              angkatan={member.angkatan}
              imageUrl={member.photoURL || ""}
              logoUrl={
                member.universitas ? `/logoKampus/${member.universitas}.svg` : "/Andreas.jpg"
              }
            />
          ))
        )}
      </section>

      {/* Pagination Controls */}
      {!error && renderPagination()}
    </div>
  );
};

export default AnggotaPage;
