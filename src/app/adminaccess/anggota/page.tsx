"use client";
import ListAnggota from "@/components/dashboard/anggota/list-anggota";
import SearchField from "@/components/UI/search-field";
import AddMemberModal from "@/components/UI/add-member-form";
import React, { useState } from "react";

const AnggotaPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between gap-4">
                <SearchField 
                    placeholder="🔍 Cari anggota..." 
                    className="flex-1 max-w-3xl" 
                    size="md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="shrink-0 px-4 py-2 text-sm font-medium rounded-sm bg-[#00CCFF] text-white hover:bg-[#00b3e0] transition-colors"
                >
                    + Tambah Anggota
                </button>
            </div>
            <ListAnggota searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <AddMemberModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => setSearchQuery("")}
            />
        </div>
    );
};

export default AnggotaPage;