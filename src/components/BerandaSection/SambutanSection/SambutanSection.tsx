"use client";

import React from "react";
import QuoteIcon from "../../QuotesIcon/QuotesIcon";
import Image from "next/image";
import BlurText from "../../UI/BlurText";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SambutanSection: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const isHeaderInView = useInView(headerRef, {
    once: false, // Animasi terjadi setiap kali
    margin: "0px 0px -100px 0px",
    amount: 1, // 30% element harus terlihat untuk trigger
  });

  const isTextInView = useInView(textRef, {
    once: false, // Animasi terjadi setiap kali
    margin: "0px 0px -100px 0px",
    amount: 0.3, // 30% element harus terlihat untuk trigger
  });

  const isImageInView = useInView(imageRef, {
    once: false, // Animasi terjadi setiap kali
    margin: "0px 0px -100px 0px",
    amount: 0.3, // 30% element harus terlihat untuk trigger
  });

  return (
    <section id="sambutan" className="py-10 md:py-16 lg:py-24">
      <div className="container mx-auto px-12 sm:px-12 md:px-14 lg:px-16 xl:px-32">
        {/* Judul Section */}
        <div
          ref={headerRef}
          className={`relative flex flex-col items-center justify-center text-center mb-8 md:mb-14 lg:mb-20 transition-all duration-1000 ease-out ${
            isHeaderInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <Image
            src="/heading/HeadingSambutan.svg"
            alt="Heading Sambutan"
            width={454}
            height={100}
            className="h-10 md:h-20 lg:h-[75px] w-auto max-w-[90%]"
            priority
          />
          <div className="absolute top-1/2 left-0 w-full h-px -z-10">
            <div className="flex justify-between items-center w-full max-w-lg mx-auto">
              <span className="w-1/3 h-px bg-gray-300"></span>
              <span className="w-1/3 h-px bg-gray-300"></span>
            </div>
          </div>
        </div>

        {/* Konten Utama */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          {/* Kolom Kiri: Teks */}
          <div
            ref={textRef}
            className={`w-full md:w-1/2 lg:w-3/5 transition-all duration-1200 ease-out ${
              isTextInView
                ? "opacity-100 -translate-x-0"
                : "opacity-0 -translate-x-16"
            }`}
          >
            <div
              className={`transition-all duration-800 delay-200 ${
                isTextInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <QuoteIcon />
            </div>

            <div
              className={`transition-all duration-800 delay-400 ${
                isTextInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <BlurText
                text="Selamat datang kami ucapkan untuk seluruh keluarga besar IKAPEMA KEPRI MALANG. Dengan bangga kami persembahkan situs resmi website IKAPEMA kepada seluruh masyarakat khususnya keluarga besar IKAPEMA. Sebagai pengurus kami berkomitmen untuk senantiasa menjaga organisasi daerah ini untuk memperkuat silaturahmi, memfasilitasi pengembangan potensi anggota dan meningkatkan kesadaran sosial. Dalam website ini akan ditemukan informasi terkait program, kegiatan dan perkembangan dari IKAPEMA KEPRI MALANG. Kami juga membuka peluang untuk berbagai ide, pengalaman dan kreativitas. Terimakasih atas kunjungan anda. Menjalin Visi Membangun Negeri, Satu Untuk Semua, Semua Untuk Satu."
                delay={50}
                animateBy="words"
                direction="top"
                className="w-full max-w-none md:max-w-xl lg:max-w-3xl my-4 text-gray-600 leading-relaxed text-center text-base sm:text-lg md:text-xl"
              />
            </div>

            <div
              className={`flex justify-end transition-all duration-800 delay-600 ${
                isTextInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <QuoteIcon className="transform -scale-x-100 -scale-y-100" />
            </div>
          </div>

          {/* Kolom Kanan: Gambar */}
          <div className="w-full md:w-1/2 lg:w-2/5 flex justify-center">
            <div
              ref={imageRef}
              className={`relative flex flex-col items-center transition-all duration-1200 ease-out ${
                isImageInView
                  ? "opacity-100 translate-x-0 scale-100"
                  : "opacity-0 translate-x-16 scale-95"
              }`}
            >
              {/* Gambar Ketum */}
              <div className="relative mb-4 sm:mb-6 md:mb-8 lg:mb-6">
                <Image
                  src="/bg/FotoKetum.svg"
                  alt="Foto Sambutan"
                  width={400}
                  height={400}
                  className={`w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 transition-all duration-700 ease-out ${
                    isImageInView ? "hover:scale-105" : ""
                  }`}
                />
              </div>

              {/* Nama dan Jabatan */}
              <div
                className={`text-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-2 transition-all duration-800 delay-700 ${
                  isImageInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                {/* Nama */}
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-[#005266] mb-2 sm:mb-2 md:mb-3 lg:mb-2 leading-tight break-words">
                  Mgs Achmad Dachlan R
                </h3>

                {/* Jabatan */}
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-600 leading-tight break-words">
                  Ketua Umum IKAPEMA KEPRI 2024/2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SambutanSection;
