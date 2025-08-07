"use client";

import React from "react";
import { MoveDown } from "lucide-react";
import Image from "next/image";
import ShinyText from "@/components/UI/ShinyText";
import FadeContent from "@/components/UI/FadeContent";

interface HeroSectionPagesProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  onScrollClick?: () => void;
  backgroundImage?: string;
}

const HeroSectionPages: React.FC<HeroSectionPagesProps> = ({
  title = "IKAPEMA KEPRI—MALANG",
  subtitle = (
    <>
      Sebuah wadah berlandaskan kekeluargaan bagi mahasiswa
      <br />
      Kepulauan Riau di Kota Malang
    </>
  ),
  // description = "Kepulauan Riau di Kota Malang",
  buttonText = "Selengkapnya",
  onButtonClick,
  onScrollClick,
  backgroundImage,
}) => {
  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#E5FAFF] text-white overflow-hidden"
      style={{
        backgroundImage: "/Hero.svg",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-transparent bg-opacity-40 z-10"></div>

      {/* Placeholder Background Pattern */}
      {!backgroundImage && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/Hero.svg"
            alt="Background Pattern"
            layout="fill"
            objectFit="cover" // Lebar menyesuaikan, tinggi cover, tidak kepotong bawah
            objectPosition="bottom" // Fokus bagian bawah agar tidak kepotong
            priority
            className="pointer-events-none select-none"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full max-w-[1440px]">
        {/* Main Title */}
        <FadeContent
          blur={false}
          duration={2500}
          easing="ease-out"
          initialOpacity={0}
          delay={200}
          repeatAnimation={true} // Enable repeat animation
        >
          <ShinyText
            text={title}
            disabled={false}
            speed={3}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 tracking-wide"
          />
        </FadeContent>

        <FadeContent
          blur={false}
          duration={1500}
          easing="ease-out"
          initialOpacity={0}
          delay={500}
          repeatAnimation={true} // Enable repeat animation
        >
          {/* Subtitle */}
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-3 sm:mb-4 font-light opacity-90">
            {subtitle}
          </p>

          {/* Description */}
          {/* <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 font-light opacity-80">
          {description}
        </p> */}

          {/* CTA Button */}
          <button
            onClick={onButtonClick}
            className="inline-flex items-center gap-3 bg-white text-[#007A99] not-only:px-8 py-2 mt-8 rounded-full text-lg font-medium hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {buttonText}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </FadeContent>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <FadeContent
          blur={false}
          duration={1500}
          easing="ease-out"
          initialOpacity={0}
          delay={1000}
          repeatAnimation={true} // Enable repeat animation
        >
        <button
          onClick={onScrollClick}
          className="flex flex-col items-center text-white opacity-70 hover:opacity-100 transition-opacity duration-300 group"
        >
          <span className="text-base mb-2 font-light">Our Information</span>
          <div className="w-8 h-8 border-2 border-white rounded-[10px] rotate-45 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <MoveDown size={16} className="animate-bounce rotate-[-45deg]" />
          </div>
        </button>
        </FadeContent>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-8 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse hidden lg:block"></div>
      <div className="absolute top-1/3 right-12 w-3 h-3 bg-white rounded-full opacity-40 animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-1/4 left-16 w-1 h-1 bg-white rounded-full opacity-80 animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-1/3 right-8 w-2 h-2 bg-white rounded-full opacity-50 animate-pulse hidden lg:block"></div>
    </section>
  );
};

export default HeroSectionPages;
