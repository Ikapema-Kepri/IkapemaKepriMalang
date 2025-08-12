import Image from "next/image";
import React from "react";

interface FilosofiLogoCardProps {
  title: string;
  logoUrl: string;
  description: string;
}

const FilosofiData: FilosofiLogoCardProps[] = [
  {
    title: "5 Kelopak Bunga Warna Merah",
    logoUrl: "filosofiLogo/KelopakMerah.svg",
    description: "Pancasila sebagai dasar negara",
  },
  {
    title: "Kapal Perahu",
    logoUrl: "filosofiLogo/KapalKuning.svg",
    description:
      "Semangat rakyat Provinsi Kepulauan Riau dengan hasil laut yang melimpah",
  },
  {
    title: "Padi & Kapas",
    logoUrl: "filosofiLogo/PadiKapas.svg",
    description: "Kemakmuran dan kesejahteraan rakyat Provinsi Kepulauan Riau",
  },
  {
    title: "Buku",
    logoUrl: "filosofiLogo/Buku.svg",
    description:
      "Semangat belajar anggota Ikatan Pelajar Mahasiswa Kepulauan Riau-Malang (IKAPEMA Kepri-Malang)",
  },
];

const FilosofiLogoCard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-32 px-4">
      {FilosofiData.map((item, index) => (
        <div key={index} className="flex flex-col items-center justify-center gap-6 md:gap-8 lg:gap-12">
          {/* Title Card */}
          <div className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[560px] h-[80px] sm:h-[90px] md:h-[95px] lg:h-[100px] bg-[#007A99] flex justify-center items-center text-center rounded-xl shadow-[2px_4px_8px_2px_rgba(0,0,0,0.25)]">
            <h1 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold p-2 md:p-4 leading-tight">
              {item.title}
            </h1>
          </div>
          
          {/* Logo Image */}
          <div className="flex flex-col items-center">
            <Image
              src={item.logoUrl}
              alt={item.title}
              width={350}
              height={350}
              className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] object-contain"
            />
          </div>
          
          {/* Description Card */}
          <div className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[560px] min-h-[120px] sm:min-h-[140px] md:min-h-[160px] lg:min-h-[200px] bg-[#FFFFFF] flex justify-center items-center text-center rounded-xl shadow-[2px_4px_8px_2px_rgba(0,0,0,0.25)] p-4">
            <h2 className="text-[#005266] text-xs sm:text-sm md:text-base lg:text-xl font-semibold leading-relaxed max-w-[90%]">
              {item.description}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilosofiLogoCard;
