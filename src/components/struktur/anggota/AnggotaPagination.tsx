import React from "react";

interface AnggotaPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const AnggotaPagination: React.FC<AnggotaPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="flex justify-center items-center gap-1 sm:gap-2 mt-8 pb-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm rounded-full bg-[#00A3CC] text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-[#005266] transition-colors"
      >
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Prev</span>
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-2 py-1 sm:px-5 sm:py-2 text-xs sm:text-sm rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            1
          </button>
          {startPage > 2 && <span className="px-1 sm:px-2 text-xs sm:text-base">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full transition-colors ${
            page === currentPage
              ? "bg-[#00A3CC] text-white"
              : "bg-white border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-1 sm:px-2 text-xs sm:text-base">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-2 py-1 sm:px-5 sm:py-2 text-xs sm:text-sm rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm rounded-full bg-[#00A3CC] text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-[#005266] transition-colors"
      >
        <span className="hidden sm:inline">Next</span>
        <span className="sm:hidden">Next</span>
      </button>
    </div>
  );
};

export default AnggotaPagination;
