"use client";

import React, { memo } from "react";
import AsramaCard from "../../UI/asrama-card";
import { useAsramaAnimation } from "./hooks/useAsramaAnimation";
import { useAsrama } from "@/hooks/useAsrama";
import AsramaHeader from "./components/AsramaHeader";
import AsramaCTA from "./components/AsramaCTA";

const AsramaSection: React.FC = () => {
  const { refs, animation } = useAsramaAnimation();
  const { asramaPutra, asramaPutri, loading } = useAsrama();

  // Data styling untuk asrama
  const asramaStyling = {
    putra: {
      id: 1,
      badgeText: "Putra",
      badgeColor: "bg-blue-600",
      hoverColor: "group-hover:text-blue-600",
      iconColor: "text-blue-500",
      decorativeGradient: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    putri: {
      id: 2,
      badgeText: "Putri",
      badgeColor: "bg-pink-600",
      hoverColor: "group-hover:text-pink-600",
      iconColor: "text-pink-500",
      decorativeGradient: "bg-gradient-to-br from-pink-400 to-pink-600"
    }
  };

  // Gabungkan data dari Firebase dengan styling
  const asramaData = [];

  if (asramaPutra) {
    asramaData.push({
      id: asramaStyling.putra.id,
      image: asramaPutra.photoUrl || "/bg/AsramaPutra.webp",
      title: asramaPutra.name || "Asrama Mahasiswa Putra",
      address: asramaPutra.address || "Alamat belum tersedia",
      ...asramaStyling.putra
    });
  }

  if (asramaPutri) {
    asramaData.push({
      id: asramaStyling.putri.id,
      image: asramaPutri.photoUrl || "/bg/AsramaPutri.webp",
      title: asramaPutri.name || "Asrama Mahasiswa Putri",
      address: asramaPutri.address || "Alamat belum tersedia",
      ...asramaStyling.putri
    });
  }

  // Fallback ke data default jika belum ada data dari Firebase
  if (asramaData.length === 0 && !loading) {
    asramaData.push(
      {
        id: 1,
        image: "/bg/AsramaPutra.webp",
        title: "Asrama Mahasiswa Putra",
        address: "Jl. Saxophone Permata Kencana Blok C no 22, Tunggulwulung, Kec. Lowokwaru, Kota Malang, Jawa Timur 65143",
        ...asramaStyling.putra
      },
      {
        id: 2,
        image: "/bg/AsramaPutri.webp",
        title: "Asrama Mahasiswa Putri",
        address: "Jl. Bukit Hijau Blok E. No 82, Tlogomas, Kec. Lowokwaru, Kota Malang, Jawa Timur 65144",
        ...asramaStyling.putri
      }
    );
  }

  return (
    <section className="bg-[#E5FAFF] py-16 px-4 sm:px-8 md:px-16">
      <div className="container mx-auto">
        <AsramaHeader
          headerRef={refs.headerRef}
          headerClasses={animation.headerClasses}
        />

        <div
          ref={refs.cardsRef}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12 ${animation.cardsContainerClasses}`}
        >
          {asramaData.map((asrama) => (
            <AsramaCard
              key={asrama.id}
              image={asrama.image}
              title={asrama.title}
              address={asrama.address}
              badgeText={asrama.badgeText}
              badgeColor={asrama.badgeColor}
              hoverColor={asrama.hoverColor}
              iconColor={asrama.iconColor}
              decorativeGradient={asrama.decorativeGradient}
            />
          ))}
        </div>

        <AsramaCTA
          ctaRef={refs.ctaRef}
          ctaContainerClasses={animation.ctaContainerClasses}
        />
      </div>
    </section>
  );
};

export default memo(AsramaSection);