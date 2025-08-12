"use client";

import FilosofiLogoCard from "@/components/UI/FilosofiLogoCard";
import Image from "next/image";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const PengurusPage: React.FC = () => {
  // Refs untuk setiap section
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const filosofiHeaderRef = useRef<HTMLDivElement>(null);
  const filosofiCardRef = useRef<HTMLDivElement>(null);

  // State untuk mengontrol animasi FilosofiCard
  const [isFilosofiCardAnimated, setIsFilosofiCardAnimated] = useState(false);

  // useInView hooks untuk setiap section
  const isHeroInView = useInView(heroRef, {
    once: false,
    margin: "-100px 0px -100px 0px",
    amount: 0.3,
  });

  // const isAboutInView = useInView(aboutRef, {
  //   once: false,
  //   margin: "-100px 0px -100px 0px",
  //   amount: 0.2,
  // });

  const isLogoInView = useInView(logoRef, {
    once: false,
    margin: "-100px 0px -100px 0px",
    amount: 0.3,
  });

  const isTextInView = useInView(textRef, {
    once: false,
    margin: "-100px 0px -100px 0px",
    amount: 0.3,
  });

  // Pisahkan trigger untuk header dan card filosofi
  const isFilosofiHeaderInView = useInView(filosofiHeaderRef, {
    once: false,
    margin: "-10px 0px -100px 0px",
    amount: 0.3,
  });

  // Filosofi Card - trigger untuk deteksi visibility
  const isFilosofiCardInViewport = useInView(filosofiCardRef, {
    once: false, // Selalu monitor
    margin: "-50px 0px -50px 0px",
    amount: 0.1,
  });

  // Effect untuk mengontrol animasi FilosofiCard
  useEffect(() => {
    if (isFilosofiCardInViewport) {
      // Reset animasi dan trigger fade in
      setIsFilosofiCardAnimated(false);
      
      // Trigger animasi setelah delay kecil
      const timer = setTimeout(() => {
        setIsFilosofiCardAnimated(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isFilosofiCardInViewport]);

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative w-full py-16 sm:py-20 md:py-32 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#E5FAFF]"
        style={{
          backgroundImage: "url('/bg/BgTentang.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          ref={heroRef}
          className={`text-center mb-8 md:mb-12 transition-all duration-1200 ease-out ${
            isHeroInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          {/* Heading Image */}
          <div
            className={`flex items-center justify-center gap-4 mb-6 sm:mb-8 transition-all duration-800 delay-200 ${
              isHeroInView
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <Image
              src="/heading/HeadingTentang2.svg"
              alt="Heading Tentang"
              width={454}
              height={100}
              className="h-8 sm:h-12 md:h-16 lg:h-20 xl:h-[75px] w-auto max-w-[90%]"
            />
          </div>

          {/* Title Text */}
          <h1
            className={`text-xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-7xl font-extrabold text-[#00A3CC] mb-4 sm:mb-6 leading-tight transition-all duration-800 delay-400 ${
              isHeroInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            IKAPEMA <br />KEPRI—MALANG
          </h1>

          {/* Subtitle Text */}
          <p
            className={`text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-[#007A99] leading-relaxed px-2 sm:px-4 transition-all duration-800 delay-600 ${
              isHeroInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Menjalin Visi Membangun Negeri,<br />
            Satu Untuk Semua, Semua Untuk Satu.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        className="w-full py-12 sm:py-16 md:py-24 lg:py-28 xl:py-32 px-12 sm:px-14 md:px-16 lg:px-16 xl:px-32 bg-[#E5FAFF]"
      >
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Logo Container */}
          <div className="w-full lg:w-2/5 flex justify-center items-center">
            <div
              ref={logoRef}
              className={`relative flex justify-center items-center transition-all duration-1200 ease-out ${
                isLogoInView
                  ? "opacity-100 -translate-x-0 scale-100"
                  : "opacity-0 -translate-x-16 scale-95"
              }`}
            >
              <Image
                src="/LogoIKAPEMA.svg"
                alt="IKAPEMA KEPRI MALANG Logo"
                width={500}
                height={500}
                className={`object-contain w-30 h-30 sm:w-48 sm:h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px] transition-transform duration-700 ease-out ${
                  isLogoInView ? "hover:scale-105" : ""
                }`}
              />
            </div>
          </div>

          {/* Description Text */}
          <div
            ref={textRef}
            className={`w-full lg:w-3/5 transition-all duration-1200 ease-out ${
              isTextInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-16"
            }`}
          >
            <p className="text-[#007A99] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-justify">
              Ikatan Pelajar Mahasiswa Kepulauan Riau-Malang (IKAPEMA Kepri-Malang)
              adalah organisasi pelajar dan mahasiswa daerah Provinsi Kepulauan Riau
              yang ada di Kota Malang. Organisasi ini berlandaskan Pancasila dan UUD
              RI 1945 dan berasaskan kekeluargaan serta bersifat kerukunan,
              kependidikan, dan kemasyarakatan. Tujuan dibentuknya organisasi ini
              adalah untuk menumbuhkan kesadaran, kecakapan, kecerdasan dan
              persaudaraan, serta tanggung jawab anggota sebagai bentuk pengabdian
              kepada daerah, bangsa dan negara. Anggota IKAPEMA Kepri-Malang
              terdiri atas anggota biasa, luar biasa dan kehormatan.
            </p>
          </div>
        </div>
      </section>

      {/* Filosofi Logo Section */}
      <section className="relative w-full py-16 sm:py-24 md:py-32 lg:py-36 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-32 bg-[#E7FAFF]">
        {/* Header Filosofi - Trigger terpisah */}
        <div
          ref={filosofiHeaderRef}
          className={`text-center mb-12 sm:mb-16 md:mb-24 lg:mb-32 xl:mb-36 transition-all duration-1000 ease-out ${
            isFilosofiHeaderInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className={`flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-8 transition-all duration-800 delay-300 ${
              isFilosofiHeaderInView
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-6 scale-95"
            }`}
          >
            <Image
              src="/heading/HeadingFilosofiLogo.svg"
              alt="Heading Filosofi Logo"
              width={454}
              height={100}
              className="h-8 sm:h-12 md:h-16 lg:h-20 xl:h-[75px] w-auto max-w-[90%]"
            />
          </div>
        </div>

        {/* Filosofi Card - Custom fade in logic tanpa fade out */}
        <div
          ref={filosofiCardRef}
          className={`transition-all duration-1200 ease-out ${
            isFilosofiCardInViewport && isFilosofiCardAnimated
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          <FilosofiLogoCard />
        </div>
      </section>
    </>
  );
};

export default PengurusPage;
