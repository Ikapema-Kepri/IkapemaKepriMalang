"use client";

import type React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "@/components/UI/button";

const TentangSection: React.FC = () => {
  const handleSelengkapnyaClick = () => {
    console.log("Selengkapnya button clicked");
    // Add your navigation logic here
  };

  return (
    <section className="w-full py-16 px-6 md:px-16 lg:px-24">
      <div className="mx-auto bg-gradient-to-b from-[#33D6FF] to-[#00A3CC] rounded-3xl py-16 px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header with decorative title */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Image
                src="/heading/HeadingTentang.svg"
                alt="Heading Sambutan"
                width={454}
                height={100}
                className="h-10 md:h-20 lg:h-[80px] w-auto max-w-[90%]"
              />
            </div>
          </div>

          {/* Main content */}
          <div className="grid lg:grid-cols-2 gap-1 lg:gap-12 items-center">
            {/* Logo/Image section */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-50 h-50 md:w-72 md:h-72 lg:w-100 lg:h-100 relative flex justify-center items-center">
                <Image
                  src="/LogoIKAPEMA.svg" // Replace with your logo path
                  alt="IKAPEMA KEPRI MALANG Logo"
                  width={500}
                  height={500}
                  className="object-contain h-50 w-50 md:h-72 md:w-72 lg:h-[500px] lg:w-[500px]"
                />
              </div>
            </div>

            {/* Content section */}
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black leading-tight text-center lg:text-left">
                Apa itu IKAPEMA KEPRI—MALANG?
              </h3>

              <p className="text-black/80 text-base md:text-lg leading-relaxed text-justify">
                Ikatan Pelajar Mahasiswa Kepulauan Riau-Malang (IKAPEMA
                Kepri-Malang) adalah organisasi pelajar dan mahasiswa daerah
                Provinsi Kepulauan Riau yang ada di Kota Malang. Organisasi ini
                berlandaskan Pancasila dan UUD RI 1945 dan berasaskan
                kekeluargaan serta bersifat kerukunan, kependidikan, dan
                kemasyarakatan. Tujuan dibentuknya organisasi ini adalah untuk
                menumbuhkan kesadaran, kecakapan, kecerdasan dan persaudaraan,
                serta tanggung jawab anggota sebagai bentuk pengabdian kepada
                daerah, bangsa dan negara. Anggota IKAPEMA Kepri-Malang terdiri
                atas anggota biasa, luar biasa dan kehormatan.
              </p>

              <div className="pt-4">
                <Button
                  onClick={handleSelengkapnyaClick}
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Selengkapnya
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TentangSection;
