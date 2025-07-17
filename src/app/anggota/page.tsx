"use client";

import ProfileCard from "@/components/UI/ProfileCard";
import React, { useEffect, useState } from "react";
import { Anggota, ApiResponse } from "../../types";

const AnggotaPage: React.FC = () => {
  const [members, setMembers] = useState<Anggota[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchMembers() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/anggota");
      const data: ApiResponse<Anggota[]> = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      if (data.data) {
        setMembers(data.data);
      } else {
        setMembers([]);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Gagal memuat anggota.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Memuat anggota...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (members.length === 0) return <p>Belum ada anggota.</p>;

  return (
    <div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:py-16 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-24">
        {members.map((member) => (
          <ProfileCard
            key={member.id}
            name={member.namaAnggota}
            department={member.programStudi}
            imageUrl={member.photoURL ? member.photoURL : "/Andreas.jpg"}
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
