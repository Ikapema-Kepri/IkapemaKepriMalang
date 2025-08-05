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
    description: "Kemakmuran dan kesejahteraan rakyat Provinsi Kepulauan Riau",
  },
  {
    title: "Buku",
    logoUrl: "filosofiLogo/Buku.svg",
    description:
      "Semangat belajar anggota Ikatan Pelajar Mahasiswa Kepulauan Riau-Malang (IKAPEMA Kepri-Malang)",
  },
];

const FilosofiLogoCard: React.FC<FilosofiLogoCardProps> = ({
  
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-32">
      {FilosofiData.map((item, index) => (
        <div key={index} className="flex flex-col items-center justify-center gap-12">
          <div className="w-[560px] h-[100px] bg-[#007A99] flex justify-center items-center text-center rounded-xl shadow-[2px_4px_8px_2px_rgba(0,0,0,0.25)]">
            <h1 className="text-white text-3xl font-semibold p-4">
              {item.title}
            </h1>
          </div>
          <div className="flex flex-col">
            <Image
              src={item.logoUrl}
              alt={item.title}
              width={350}
              height={350}
              className="relative w-[350px] h-[350px]"
            />
          </div>
          <div className="w-[560px] h-[200px] bg-[#FFFFFF] flex justify-center items-center text-center rounded-xl shadow-[2px_4px_8px_2px_rgba(0,0,0,0.25)] mt-4">
            <h2 className="text-[#005266] text-2xl font-semibold">
              {item.description}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilosofiLogoCard;
