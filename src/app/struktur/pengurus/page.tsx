"use client";

import React from "react";
import Image from "next/image";

const PengurusPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E5FAFF] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
      <section className="w-full max-w-6xl flex flex-col gap-2 sm:gap-3 md:gap-4">
        <div className="w-full text-center flex items-center justify-center py-3 sm:py-4 md:py-6 bg-gradient-to-l from-[#00A3CC] to-[#005266] rounded-t-xl sm:rounded-t-2xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#E5FAFF] px-2">
            Struktur Organisasi
          </h1>
        </div>
        <div className="w-full text-center flex items-center justify-center py-3 sm:py-4 md:py-6 bg-[#CCF5FF] rounded-b-xl sm:rounded-b-2xl">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#005266] px-2">
            Periode 2024/2025
          </h2>
        </div>
      </section>
      
      {/* Section untuk gambar struktur organisasi */}
      <section className="w-full max-w-6xl mt-6 sm:mt-8 md:mt-10">
        <div className="w-full flex justify-center items-center">
          <div className="relative w-full max-w-6xl">
            <Image
              src="/bg/StrukturOrganisasi.svg"
              alt="Struktur Organisasi IKAPEMA KEPRI 2024/2025"
              width={1300}
              height={800}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </section>
      
      {/* Section untuk konten tambahan jika diperlukan */}
      <section className="w-full max-w-6xl mt-6 sm:mt-8 md:mt-10">
        {/* Konten tambahan akan ditambahkan di sini */}
      </section>
    </div>
  );
};

export default PengurusPage;