import React from "react";
import { FiRefreshCw } from "react-icons/fi";

interface AnggotaErrorStateProps {
  onRetry: () => void;
}

const AnggotaErrorState: React.FC<AnggotaErrorStateProps> = ({ onRetry }) => {
  return (
    <div className="flex flex-col items-center mt-2">
      <span className="text-red-600 text-sm font-semibold mb-2">
        Gagal memuat anggota. Silahkan coba lagi
      </span>
      <button
        onClick={onRetry}
        className="p-3 bg-white text-[#007A99] rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
        aria-label="Muat ulang"
      >
        <FiRefreshCw className="h-7 w-7" />
      </button>
    </div>
  );
};

export default AnggotaErrorState;
