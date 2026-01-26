import ListAnggota from "@/components/anggota/list-anggota";
import SearchField from "@/components/UI/search-field";

import React from "react";

const AnggotaPage : React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <SearchField placeholder="Cari anggota..." className="max-w-md" size="lg" />

            <ListAnggota/>
        </div>
    )
}

export default AnggotaPage;