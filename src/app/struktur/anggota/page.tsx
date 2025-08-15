"use client";

import ProfileCard from "@/components/UI/ProfileCard";
import ProfileCardSkeleton from "@/components/UI/ProfileCardSkeleton";
import React, { useEffect, useState } from "react";
import { Anggota, ApiResponse } from "../../../types";
import AnggotaSearchBar from "@/components/UI/AnggotaSearchBar";
import Image from "next/image";

const SKELETON_COUNT = 6;

const AnggotaPage: React.FC = () => {
  const [members, setMembers] = useState<Anggota[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchMembers(query?: string) {
    setLoading(true);
    setError(null);
    try {
      let url = "/api/anggota";
      if (query && query.trim() !== "") {
        url += `?search=${encodeURIComponent(query.trim())}`;
      }
      const response = await fetch(url);
      const data: ApiResponse<Anggota[]> = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      setMembers(data.data ?? []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Gagal memuat anggota.");
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (query: string) => {
    fetchMembers(query);
  };

  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!loading && members.length === 0) return <p>Belum ada anggota.</p>;

  return (
    <div className="container pt-32 px-4 sm:px-6 md:px-8 lg:px-24 bg-[#E5FAFF]">
        <section className="text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Image
              src="/heading/HeadingAnggota.svg"
              alt="Heading Anggota"
              width={454}
              height={100}
              className="h-10 md:h-20 lg:h-[80px] w-auto max-w-[90%]"
            />
          </div>
        </section>
      <section className="flex gap-4 md:pt-2 lg:pt-4">
        <AnggotaSearchBar onSearch={handleSearch} />
      </section>
      <section className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 lg:gap-4 pb-8 md:pb-16 lg:pb-24 md:pt-4 lg:pt-6 justify-items-center">
        {loading
          ? Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
              <ProfileCardSkeleton key={idx} />
            ))
          : members.map((member) => (
              <ProfileCard
                key={member.id}
                name={member.namaAnggota}
                department={member.programStudi}
                imageUrl={member.photoURL || ""}
                logoUrl={
                  member.universitas
                    ? `/logoKampus/${member.universitas}.svg`
                    : "/Andreas.jpg"
                }
              />
            ))}
      </section>
    </div>
  );
};

export default AnggotaPage;
