"use client";
import ListAlumni from "@/components/dashboard/alumni/list-alumni";
import SearchField from "@/components/UI/search-field";
import React, { useState } from "react";

const AlumniPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between gap-4">
                <SearchField 
                    placeholder="🔍 Cari alumni..." 
                    className="flex-1 max-w-3xl" 
                    size="md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <ListAlumni searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>
    );
};

export default AlumniPage;