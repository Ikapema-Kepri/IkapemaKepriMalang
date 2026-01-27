"use client";
import ListAnggota from "@/components/dashboard/anggota/list-anggota";
import SearchField from "@/components/UI/search-field";
import React, { useState } from "react";

const AnggotaPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <SearchField 
                    placeholder="Cari nama, universitas, atau program studi..." 
                    className="max-w-2xl" 
                    size="lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <ListAnggota searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>
    );
};

export default AnggotaPage;