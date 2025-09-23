"use client";

import type React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "@/components/UI/button";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const TentangSection: React.FC = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // State untuk menyimpan hasil media query
  const [isWideAspectRatio, setIsWideAspectRatio] = useState(false);

  const isLogoInView = useInView(logoRef, {
    once: false,
    margin: "0px 0px -100px 0px",
    amount: 0.3,
  });

  const isContentInView = useInView(contentRef, {
    once: false,
    margin: "0px 0px -100px 0px",
    amount: 0.3,
  });

  const isHeaderInView = useInView(headerRef, {
    once: false,
    margin: "0px 0px -100px 0px",
    amount: 0.3,
  });

  // useEffect untuk handle media query di client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(min-aspect-ratio: 1.6) and (max-aspect-ratio: 1.8)');
      
      // Set initial value
      setIsWideAspectRatio(mediaQuery.matches);
      
      // Listen for changes
      const handleChange = (e: MediaQueryListEvent) => {
        setIsWideAspectRatio(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      
      // Cleanup
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, []);

  const handleSelengkapnyaClick = () => {
    router.push("/tentang");
  };

  return (
    <section className="w-full py-16 px-6 md:px-16 lg:px-[15.815vh]">
      <div className="mx-auto bg-gradient-to-b from-[#00A3CC] to-[#005266] rounded-3xl py-16 px-8 md:px-[7.908vh] lg:px-[10.544vh]">
        <div className="max-w-[168.699vh] mx-auto">
          {/* Header with decorative title */}
          <div
            ref={headerRef}
            className={`text-center mb-4 md:mb-8 lg:mb-[7.908vh] transition-all duration-1000 ease-out ${
              isHeaderInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center justify-center gap-[2.636vh] mb-4 md:mb-6 lg:mb-[5.272vh]">
              <Image
                src="/heading/HeadingTentang.svg"
                alt="Heading Tentang"
                width={454}
                height={100}
                className="h-13 md:h-22 lg:h-[18.356vh] w-auto max-w-[90%]"
              />
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-[7.908vh] items-center">
            {/* Logo/Image section - 2/5 width */}
            <div className="w-full lg:w-2/5 flex justify-center lg:justify-start">
              <div
                ref={logoRef}
                className={`w-50 h-50 md:w-[288px] md:h-[288px] lg:w-[65.898vh] lg:h-[65.898vh] relative flex justify-center items-center transition-all duration-1200 ease-out ${
                  isLogoInView
                    ? "opacity-100 translate-x-0 scale-100"
                    : "opacity-0 -translate-x-16 scale-95"
                }`}
              >
                <Image
                  src="/LogoIkapema.svg"
                  alt="IKAPEMA KEPRI MALANG Logo"
                  width={450}
                  height={450}
                  className={`object-contain h-50 w-50 md:h-[288px] md:w-[288px] lg:h-[65.898vh] lg:w-[65.898vh] transition-all duration-700 ease-out ${
                    isLogoInView ? "" : ""
                  }`}
                />
              </div>
            </div>

            {/* Content section - 3/5 width */}
            <div
              ref={contentRef}
              className={`w-full lg:w-3/5 space-y-6 transition-all duration-1200 ease-out ${
                isContentInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-16"
              }`}
            >
              <h3 
                className={`text-xl md:text-2xl lg:text-[4.942vh] font-bold text-[#E5FAFF] leading-tight text-center lg:text-left transition-all duration-800 delay-200 ${
                  isContentInView 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  fontSize: isWideAspectRatio 
                    ? 'calc(1.7 * 1em)' 
                    : undefined
                }}
              >
                Apa itu IKAPEMA KEPRI—MALANG?
              </h3>

              <p 
                className={`text-[#E5FAFF] text-lg md:text-[3.295vh] leading-relaxed text-justify transition-all duration-800 delay-400 ${
                  isContentInView 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  fontSize: isWideAspectRatio 
                    ? 'calc(1.3 * 1em)' 
                    : undefined,
                  lineHeight: isWideAspectRatio 
                    ? 'calc(0.9 * 1.6)' 
                    : undefined
                }}
              >
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

              <div className={`pt-[2.636vh] transition-all duration-800 delay-600 ${
                isContentInView 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-4"
              }`}>
                <Button
                  onClick={handleSelengkapnyaClick}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default TentangSection;
