"use client";

import React, { memo, useRef, useCallback, useMemo } from "react";
import { MoveDown } from "lucide-react";
import Image from "next/image";
import ShinyText from "@/components/UI/ShinyText";
import FadeContent from "@/components/UI/FadeContent";
import { useInView } from "framer-motion";

interface HeroSectionPagesProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  onScrollClick?: () => void;
  backgroundImage?: string;
}

// Memoized subtitle component to prevent re-renders
const MemoizedSubtitle = memo(({ subtitle }: { subtitle: React.ReactNode }) => (
  <div className="max-w-[80%] mx-auto text-sm sm:text-lg md:text-xl lg:text-[4.296vh] mb-3 sm:mb-[2.864vh] font-light opacity-90">
    <i>{subtitle}</i>
  </div>
));
MemoizedSubtitle.displayName = 'MemoizedSubtitle';

// Memoized decorative dots to prevent re-renders
const DecorativeDots = memo(() => (
  <>
    <div className="absolute top-1/4 left-4 sm:left-6 md:left-8 w-2 h-2 sm:w-3 sm:h-3 md:w-[1.432vh] md:h-[1.432vh] bg-white rounded-full opacity-60 animate-pulse hidden sm:block" />
    <div className="absolute top-1/3 right-6 sm:right-10 md:right-12 w-3 h-3 sm:w-4 sm:h-4 md:w-[2.148vh] md:h-[2.148vh] bg-white rounded-full opacity-40 animate-pulse hidden sm:block" />
    <div className="absolute bottom-1/4 left-8 sm:left-12 md:left-16 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-[0.716vh] md:h-[0.716vh] bg-white rounded-full opacity-80 animate-pulse hidden sm:block" />
    <div className="absolute bottom-1/3 right-4 sm:right-6 md:right-8 w-2 h-2 sm:w-3 sm:h-3 md:w-[1.432vh] md:h-[1.432vh] bg-white rounded-full opacity-50 animate-pulse hidden sm:block" />
  </>
));
DecorativeDots.displayName = 'DecorativeDots';

const HeroSectionPages: React.FC<HeroSectionPagesProps> = ({
  title = "IKAPEMA KEPRI—MALANG",
  subtitle = (
    <blockquote>
      Menjalin Visi Membangun Negeri, Satu Untuk Semua, Semua Untuk Satu.
    </blockquote>
  ),
  buttonText = "Selengkapnya",
  onButtonClick,
  onScrollClick,
  backgroundImage,
}) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Optimized useInView configuration
  const isBackgroundInView = useInView(backgroundRef, {
    once: true, // Changed to true untuk mencegah re-trigger yang tidak perlu
    margin: "0px",
    amount: 0.1,
  });

  // Memoized event handlers untuk mencegah re-creation pada setiap render
  const handleButtonClick = useCallback(() => {
    onButtonClick?.();
  }, [onButtonClick]);

  const handleScrollClick = useCallback(() => {
    onScrollClick?.();
  }, [onScrollClick]);

  // Memoized class names untuk mencegah string concatenation berulang
  const imageClasses = useMemo(() => 
    `pointer-events-none select-none transition-all duration-3000 ease-out object-cover object-center sm:object-center md:object-center lg:object-bottom xl:object-bottom ${
      isBackgroundInView
        ? "opacity-100 scale-100"
        : "opacity-0 scale-105"
    }`,
    [isBackgroundInView]
  );

  // Memoized styles object
  const imageStyle = useMemo(() => ({
    objectPosition: 'center bottom',
  }), []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#E5FAFF] text-white overflow-hidden">
      {/* Background Overlay - Simplified */}
      <div className="absolute inset-0 bg-transparent z-10" />

      {/* Background Image */}
      {!backgroundImage && (
        <div ref={backgroundRef} className="absolute inset-0 w-full h-full">
          <Image
            src="/Hero.webp"
            alt="Background Pattern"
            fill
            sizes="100vw"
            priority
            quality={85} // Reduced quality untuk performa lebih baik
            className={imageClasses}
            style={imageStyle}
            loading="eager" // Explicit loading untuk hero image
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
          repeatAnimation={true} // Disabled untuk performa
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
          repeatAnimation={true} // Disabled untuk performa
        >
          {/* Subtitle */}
          <MemoizedSubtitle subtitle={subtitle} />

          {/* CTA Button */}
          <button
            onClick={handleButtonClick}
            type="button" // Explicit type
            className="inline-flex items-center gap-2 sm:gap-3 md:gap-[2.148vh] bg-white text-[#007A99] px-6 sm:px-8 md:px-[5.728vh] py-2 sm:py-3 md:py-[1.432vh] mt-6 sm:mt-8 md:mt-[5.728vh] rounded-full text-sm sm:text-base md:text-lg lg:text-[3.222vh] font-medium hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl will-change-transform"
          >
            {buttonText}
            {/* Inline SVG diganti dengan komponen yang lebih ringan */}
            <MoveDown size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 rotate-[-90deg]" />
          </button>
        </FadeContent>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 sm:bottom-12 md:bottom-[5.728vh] left-1/2 transform -translate-x-1/2 z-20">
        <FadeContent
          blur={false}
          duration={1500}
          easing="ease-out"
          initialOpacity={0}
          delay={1000}
          repeatAnimation={true} // Disabled untuk performa
        >
          <button
            onClick={handleScrollClick}
            type="button" // Explicit type
            className="flex flex-col items-center text-white opacity-70 hover:opacity-100 transition-opacity duration-300 group will-change-transform"
            aria-label="Scroll to content" // Accessibility improvement
          >
            <span className="text-xs sm:text-sm md:text-base lg:text-[2.864vh] mb-2 sm:mb-3 md:mb-[1.432vh] font-light">
              Our Information
            </span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-[5.728vh] lg:h-[5.728vh] border-2 border-white rounded-lg sm:rounded-[8px] md:rounded-[10px] rotate-45 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <MoveDown size={12} className="sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-4 lg:h-4 animate-bounce rotate-[-45deg]" />
            </div>
          </button>
        </FadeContent>
      </div>

      {/* Decorative Elements */}
      <DecorativeDots />
    </section>
  );
};

// Export dengan memo untuk mencegah re-render yang tidak perlu
export default memo(HeroSectionPages);