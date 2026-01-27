import React from "react";

interface AnggotaEmptyStateProps {
  hasSearchQuery: boolean;
  onClearSearch: () => void;
}

const AnggotaEmptyState: React.FC<AnggotaEmptyStateProps> = ({
  hasSearchQuery,
  onClearSearch,
}) => {
  return (
    <div className="text-center py-12">
      <p className="text-[#002933] mb-4 font-semibold">
        {hasSearchQuery ? "Anggota Tidak Ditemukan" : "Belum Ada Anggota"}
      </p>
      {hasSearchQuery && (
        <button
          onClick={onClearSearch}
          className="px-4 py-2 bg-[#00A3CC] text-white font-semibold text-sm rounded-full hover:bg-[#005266] transition-colors"
        >
          Lihat Semua Anggota
        </button>
      )}
    </div>
  );
};

export default AnggotaEmptyState;
