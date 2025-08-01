"use client";

import React from "react";
import QuoteIcon from "../../QuotesIcon/QuotesIcon";
import Image from "next/image";
import BlurText from "../../UI/BlurText";


const SambutanSection: React.FC = () => {
  return (
    <section id="sambutan" className="py-10 md:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        {/* Judul Section */}
        <div className="relative flex flex-col items-center justify-center text-center mb-8 md:mb-14 lg:mb-20">
          <Image
            src="/heading/HeadingSambutan.svg"
            alt="Heading Sambutan"
            width={454}
            height={100}
            className="h-10 md:h-20 lg:h-[100px] w-auto max-w-[90%]"
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
          <div className="w-full md:w-1/2 lg:w-3/5">
            <QuoteIcon />
            <BlurText 
            text="Selamat datang kami ucapkan untuk seluruh keluarga besar IKAPEMA KEPRI MALANG. Dengan bangga kami persembahkan situs resmi website IKAPEMA kepada seluruh masyarakat khususnya keluarga besar IKAPEMA. Sebagai pengurus kami berkomitmen untuk senantiasa menjaga organisasi daerah ini untuk memperkuat silaturahmi, memfasilitasi pengembangan potensi anggota dan meningkatkan kesadaran sosial. Dalam website ini akan ditemukan informasi terkait program, kegiatan dan perkembangan dari IKAPEMA KEPRI MALANG. Kami juga membuka peluang untuk berbagai ide, pengalaman dan kreativitas. Terimakasih atas kunjungan anda. Menjalin Visi Membangun Negeri, Satu Untuk Semua, Semua Untuk Satu."
            delay={50}
            animateBy="words"
            direction="top"
            className="w-100% max-w-none md:max-w-xl lg:max-w-3xl my-4 text-gray-600 leading-relaxed text-justify text-lg sm:text-xl md:text-2xl">
      
            </BlurText>
            <div className="flex justify-end">
              <QuoteIcon className="transform -scale-x-100 -scale-y-100" />
            </div>
          </div>

          {/* Kolom Kanan: Gambar */}
          <div className="w-full md:w-1/2 lg:w-2/5 flex justify-center mb-8 md:mb-0">
            <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
              {/* Frame belah ketupat */}
              <div className="absolute inset-0 border-2 border-black rounded-3xl transform rotate-45"></div>
              {/* Gambar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="https://placehold.co/400x400/EFEFEF/333333?text=Foto&font=sans"
                  alt="Foto Sambutan"
                  className="w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SambutanSection;
