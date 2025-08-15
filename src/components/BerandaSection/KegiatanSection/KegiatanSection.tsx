"use client";

import Slider from "../../UI/Slider";
import Image from "next/image";
import { useInView } from "framer-motion";
import { useRef } from "react";

const KegiatanSection: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const isHeaderInView = useInView(headerRef, {
    once: false, // Animasi terjadi setiap kali
    margin: "0px 0px -100px 0px",
    amount: 0.3, // 30% element harus terlihat untuk trigger
  });

  const isSliderInView = useInView(sliderRef, {
    once: false, // Animasi terjadi setiap kali
    margin: "0px 0px -100px 0px",
    amount: 0.2, // 20% element harus terlihat untuk trigger
  });

  return (
    <section className="w-full py-16 px-6 md:px-16 lg:px-16 bg-[#E5FAFF]">
      {/* Header Section */}
      <div className="text-center mb-6 md:mb-8 lg:mb-12">
        <div
          ref={headerRef}
          className={`flex items-center justify-center gap-4 mb-0 md:mb-6 lg:mb-8 transition-all duration-1000 ease-out ${
            isHeaderInView
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <Image
            src="/heading/HeadingKegiatan.svg"
            alt="Heading Kegiatan"
            width={454}
            height={100}
            className="h-13 md:h-22 lg:h-[75px] w-auto max-w-[90%]"
          />
        </div>
      </div>

      {/* Slider Section */}
      <div
        ref={sliderRef}
        className={`transition-all duration-1200 ease-out ${
          isSliderInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12"
        }`}
      >
        <Slider />
      </div>
    </section>
  );
};

export default KegiatanSection;
