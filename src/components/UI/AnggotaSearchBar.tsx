import React, { useState } from "react";

interface AnggotaSearchBarProps {
  onSearch?: (query: string) => void;
}

const AnggotaSearchBar: React.FC<AnggotaSearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center gap-4 my-8"
      style={{ width: "100%" }}
    >
      <input
        type="text"
        placeholder="Cari anggota"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-[16px] h-[64px] w-[1434px] px-6 text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A3CC] transition"
      />
      <button
        type="submit"
        className="rounded-[16px] h-[64px] w-[268px] bg-gradient-to-r from-[#005266] to-[#00A3CC] text-white font-semibold text-xl shadow hover:from-[#00394d] hover:to-[#008fb3] transition"
      >
        Cari
      </button>
    </form>
  );
};

export default AnggotaSearchBar;