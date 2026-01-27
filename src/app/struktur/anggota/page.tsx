"use client";

import React, { useState } from "react";
import AnggotaSearchBar from "@/components/UI/anggota-search-bar";
import AnggotaHeader from "@/components/struktur/anggota/AnggotaHeader";
import AnggotaErrorState from "@/components/struktur/anggota/AnggotaErrorState";
import AnggotaPaginationInfo from "@/components/struktur/anggota/AnggotaPaginationInfo";
import AnggotaEmptyState from "@/components/struktur/anggota/AnggotaEmptyState";
import AnggotaGrid from "@/components/struktur/anggota/AnggotaGrid";
import AnggotaPagination from "@/components/struktur/anggota/AnggotaPagination";
import { useAnggota } from "@/hooks/useAnggota";

const SKELETON_COUNT = 24;
const ITEMS_PER_PAGE = 24;

const AnggotaPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    members: currentMembers,
    loading,
    error,
    fetchMembers,
    currentPage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    debouncedSearch,
    isValidating,
    handlePageChange,
    handleSearch,
  } = useAnggota({
    initialSearch: searchQuery,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const handleSearchLocal = (query: string) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  const handlePageChangeLocal = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      handlePageChange(newPage);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    handleSearch("");
  };

  return (
    <div className="w-full pt-[12.5vh] sm:pt-[13.5vh] md:pt-[14.5vh] lg:pt-[17.133vh] px-[4%] sm:px-[3%] md:px-[4%] lg:px-[6%] xl:px-[8%] bg-[#E5FAFF] min-h-screen">
      <AnggotaHeader />

      <section className="flex gap-4 flex-col">
        <AnggotaSearchBar onSearch={handleSearchLocal} />
        {error && <AnggotaErrorState onRetry={fetchMembers} />}
      </section>

      {!loading && currentMembers.length > 0 && !error && (
        <AnggotaPaginationInfo
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
          isValidating={isValidating}
        />
      )}

      {!loading && !error && currentMembers.length === 0 && (
        <AnggotaEmptyState
          hasSearchQuery={!!debouncedSearch}
          onClearSearch={handleClearSearch}
        />
      )}

      <AnggotaGrid
        members={currentMembers}
        loading={loading}
        error={error}
        skeletonCount={SKELETON_COUNT}
      />

      {!error && (
        <AnggotaPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChangeLocal}
        />
      )}

      {!error && totalPages <= 1 && <div className="bg-[#E5FAFF] h-16"></div>}
    </div>
  );
};

export default AnggotaPage;
