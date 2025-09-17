"use client";

import React from "react";
import { MoveDown } from "lucide-react";
import Image from "next/image";
import ShinyText from "@/components/UI/ShinyText";
import FadeContent from "@/components/UI/FadeContent";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
    <blockquote>

      Menjalin Visi Membangun Negeri, Satu Untuk Semua, Semua Untuk Satu.
    </blockquote>
    </>
  ),
  // description = "Kepulauan Riau di Kota Malang",
  buttonText = "Selengkapnya",
  onButtonClick,
  onScrollClick,
  backgroundImage,
}) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  const isBackgroundInView = useInView(backgroundRef, {
    once: false,
    margin: "0px 0px 0px 0px",
    amount: 0.1,
  });

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#E5FAFF] text-white overflow-hidden"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-transparent bg-opacity-40 z-10"></div>

      {/* Placeholder Background Pattern */}
      {!backgroundImage && (
        <div 
          ref={backgroundRef}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/Hero.svg"
            alt="Background Pattern"
            fill
            sizes="100vw"
            priority
            className={`pointer-events-none select-none transition-all duration-3000 ease-out object-cover object-center sm:object-center md:object-center lg:object-bottom xl:object-bottom ${
              isBackgroundInView
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
            style={{
              objectPosition: 'center bottom',
            }}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-[5.728vh] max-w-4xl mx-auto w-full max-w-[257.755vh]">
        {/* Main Title */}
        <FadeContent
          blur={false}
          duration={2500}
          easing="ease-out"
          initialOpacity={0}
          delay={200}
          repeatAnimation={true}
        >
          <ShinyText
            text={title}
            disabled={false}
            speed={3}
            className="font-londona text-2xl sm:text-4xl md:text-5xl lg:text-[10.74vh] font-semibold mb-6 sm:mb-[5.728vh] tracking-wide"
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
          <div className="text-sm sm:text-lg md:text-xl lg:text-[4.296vh] mb-3 sm:mb-[2.864vh] font-light opacity-90">
            <i>{subtitle}</i>
          </div>

          {/* Description */}
          {/* <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 font-light opacity-80">
          {description}
        </p> */}

          {/* CTA Button */}
          <button
            onClick={onButtonClick}
            className="inline-flex items-center gap-[2.148vh] bg-white text-[#007A99] not-only:px-[5.728vh] py-[1.432vh] mt-[5.728vh] rounded-full text-[3.222vh] font-medium hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
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
      <div className="absolute bottom-[5.728vh] left-1/2 transform -translate-x-1/2 z-20">
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
          <span className="text-[2.864vh] mb-[1.432vh] font-light">Our Information</span>
          <div className="w-[5.728vh] h-[5.728vh] border-2 border-white rounded-[10px] rotate-45 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <MoveDown size={16} className="animate-bounce rotate-[-45deg]" />
          </div>
        </button>
        </FadeContent>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-8 w-[1.432vh] h-[1.432vh] bg-white rounded-full opacity-60 animate-pulse hidden lg:block"></div>
      <div className="absolute top-1/3 right-12 w-[2.148vh] h-[2.148vh] bg-white rounded-full opacity-40 animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-1/4 left-16 w-[0.716vh] h-[0.716vh] bg-white rounded-full opacity-80 animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-1/3 right-8 w-[1.432vh] h-[1.432vh] bg-white rounded-full opacity-50 animate-pulse hidden lg:block"></div>
    </section>
  );
};

export default HeroSectionPages;
