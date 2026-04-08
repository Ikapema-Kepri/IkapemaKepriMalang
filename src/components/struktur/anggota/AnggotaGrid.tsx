import React from "react";
import ProfileCard from "@/components/UI/profile-card";
import ProfileCardSkeleton from "@/components/UI/profile-card-skeleton";
import { Anggota } from "@/types";

interface AnggotaGridProps {
  members: Anggota[];
  loading: boolean;
  error: string | null;
  skeletonCount?: number;
}

const AnggotaGrid: React.FC<AnggotaGridProps> = ({
  members,
  loading,
  error,
  skeletonCount = 24,
}) => {
  return (
    <section className="grid grid-cols-4 xs:grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-x-[2.636vh] gap-y-[3.954vh] pt-[1.318vh] md:pt-4 lg:pt-[3.954vh] justify-items-center mb-[5.272vh]">
      {loading && !error ? (
        Array.from({ length: skeletonCount }).map((_, idx) => (
          <ProfileCardSkeleton key={idx} />
        ))
      ) : (
        !error &&
        members.length > 0 &&
        members.map((member) => (
          <ProfileCard
            key={member.id}
            name={member.namaAnggota}
            department={member.programStudi}
            angkatan={member.angkatan}
            imageUrl={member.photoURL || ""}
            logoUrl={
              member.universitas ? `/logoKampus/${member.universitas}.svg` : "/Andreas.jpg"
            }
          />
        ))
      )}
    </section>
  );
};

export default AnggotaGrid;
