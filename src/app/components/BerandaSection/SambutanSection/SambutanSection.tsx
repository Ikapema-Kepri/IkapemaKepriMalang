'use client';

import React from 'react';
import QuoteIcon from '../../QuotesIcon/QuotesIcon'; // Pastikan path ini sesuai dengan struktur folder Anda
import Image from 'next/image';

const SambutanSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      {/* Container utama dengan padding responsif */}
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        {/* Judul Section */}
        <div className="relative flex flex-col items-center justify-center text-center mb-12 md:mb-20">
          <Image src="/heading/HeadingSambutan.svg" alt="Heading Sambutan" width={454} height={100} className="h-[80px] w-auto max-w-[90%]" />
          <div className="absolute top-1/2 left-0 w-full h-px -z-10">
            <div className="flex justify-between items-center w-full max-w-lg mx-auto">
              <span className="w-1/3 h-px bg-gray-300"></span>
              <span className="w-1/3 h-px bg-gray-300"></span>
            </div>
          </div>
        </div>

        {/* Konten Utama (Teks dan Gambar) */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-8">
          
          {/* Kolom Kanan: Gambar (muncul pertama di mobile) */}
          <div className="w-full md:w-1/2 lg:w-2/5 flex justify-center order-1 md:order-2">
            {/* MODIFIKASI 1: Ukuran kontainer frame dibuat responsif.
              - Mobile (default): w-64 h-64 (256px)
              - Tablet (md): w-80 h-80 (320px)
              - Desktop (lg): w-96 h-96 (384px)
            */}
            <div className="relative w-56 h-56 md:w-74 md:h-74 lg:w-96 lg:h-96">
              {/* Frame belah ketupat di belakang */}
              <div className="absolute inset-0 border-2 border-black rounded-3xl transform rotate-45"></div>

              {/* Gambar di dalam frame */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* MODIFIKASI 2: Ukuran gambar disesuaikan dengan ukuran frame responsif.
                  - Mobile: w-56 h-56 (224px)
                  - Tablet (md): w-72 h-72 (288px)
                  - Desktop (lg): w-[336px] h-[336px] (custom value agar proporsional)
                */}
                <img
                  // Ganti dengan URL gambar Anda nanti
                  src="https://placehold.co/400x400/EFEFEF/333333?text=Foto&font=sans"
                  alt="Foto Sambutan"
                  className="w-50 h-50 md:w-72 md:h-72 lg:w-[336px] lg:h-[336px] rounded-full object-cover shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Kolom Kiri: Teks (muncul kedua di mobile) */}
          <div className="w-full md:w-1/2 lg:w-3/5 order-2 md:order-1">
            <QuoteIcon />
            <p className="my-4 text-gray-600 leading-relaxed text-justify text-lg md:text-xl">
              Lorem ipsum dolor sit amet consectetur. Dolor vitae turpis tempus velit.
              Aliquet vitae sit nulla non sollicitudin vitae est morbi. Tincidunt
              venenatis nec tempus vivamus libero sit risus imperdiet tortor. Ac
              iaculis adipiscing ac non curabitur amet tellus vitae iaculis. Lacinia
              eu a tristique convallis. Nunc nunc pretium a tortor dolor cras. Arcu
              turpis urna ut eu. Viverra vestibulum id risus donec.
            </p>
            <div className="flex justify-end">
              {/* Ikon kutip penutup, diputar 180 derajat */}
              <QuoteIcon className="transform -scale-x-100 -scale-y-100" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SambutanSection;