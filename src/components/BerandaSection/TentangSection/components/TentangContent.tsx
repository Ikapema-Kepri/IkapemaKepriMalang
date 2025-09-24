import React, { memo, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import Button from "@/components/UI/button";

interface TentangContentProps {
  contentRef: React.Ref<HTMLDivElement>;
  isInView: boolean;
  onSelengkapnyaClick: () => void;
}

const TentangContent: React.FC<TentangContentProps> = ({ contentRef, isInView, onSelengkapnyaClick }) => {
  const containerClasses = useMemo(() => 
    `w-full lg:w-3/5 space-y-6 transition-all duration-1200 ease-out ${
      isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
    }`,
    [isInView]
  );

  return (
    <div ref={contentRef} className={containerClasses}>
      <h3
        className={`text-xl md:text-2xl lg:text-[4.942vh] font-bold text-[#E5FAFF] leading-tight text-center lg:text-left transition-all duration-800 delay-200 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        Apa itu IKAPEMA KEPRI—MALANG?
      </h3>
      <p
        className={`text-[#E5FAFF] text-lg md:text-[3.295vh] leading-relaxed text-justify transition-all duration-800 delay-400 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        Ikatan Pelajar Mahasiswa Kepulauan Riau-Malang (IKAPEMA Kepri-Malang) adalah organisasi pelajar dan mahasiswa daerah Provinsi Kepulauan Riau yang ada di Kota Malang. Organisasi ini berlandaskan Pancasila dan UUD RI 1945 dan berasaskan kekeluargaan serta bersifat kerukunan, kependidikan, dan kemasyarakatan. Tujuan dibentuknya organisasi ini adalah untuk menumbuhkan kesadaran, kecakapan, kecerdasan dan persaudaraan, serta tanggung jawab anggota sebagai bentuk pengabdian kepada daerah, bangsa dan negara. Anggota IKAPEMA Kepri-Malang terdiri atas anggota biasa, luar biasa dan kehormatan.
      </p>
      <div className={`pt-[2.636vh] transition-all duration-800 delay-600 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}>
        <Button
          onClick={onSelengkapnyaClick}
          variant="primary"
          size="md"
          icon={ArrowRight}
          iconPosition="right"
          className="transition-transform text-[#005266] duration-300 hover:scale-105 cursor-pointer"
        >
          Selengkapnya
        </Button>
      </div>
    </div>
  );
};

export default memo(TentangContent);