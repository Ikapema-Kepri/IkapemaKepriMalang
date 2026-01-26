"use client";

import React, { memo, useState, useEffect } from "react";
import Image from "next/image";
import { useTentangSection } from "./hooks/useTentangSection";
import TentangLogo from "./components/TentangLogo";
import TentangContent from "./components/TentangContent";

const TentangSection: React.FC = () => {
  // Memanggil custom hook untuk mendapatkan semua state, refs, dan logika
  const { refs, animation, handlers } = useTentangSection();

  const [isIOS, setIsIOS] = useState(false);
  
    useEffect(() => {
      const detectIOS = () => {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      };
      
      setIsIOS(detectIOS());
    }, []);
  
    const headingImageSrc = isIOS 
      ? "/heading/HeadingTentang.webp" 
      : "/heading/HeadingTentang.svg";
  return (
    <section className="w-full py-16 px-6 md:px-16 lg:px-[15.815vh]">
      <div className="mx-auto bg-gradient-to-b from-[#00A3CC] to-[#005266] rounded-3xl py-16 px-8 md:px-[7.908vh] lg:px-[10.544vh]">
        <div className="max-w-[168.699vh] mx-auto">
          {/* Header */}
          <div ref={refs.headerRef} className={animation.headerClasses}>
            <div className="flex items-center justify-center gap-[2.636vh] mb-4 md:mb-6 lg:mb-[5.272vh]">
              <Image
                src={headingImageSrc}
                alt="Heading Tentang"
                width={454}
                height={100}
                className="h-13 md:h-22 lg:h-[18.356vh] w-auto max-w-[90%]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Konten Utama */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-[7.908vh] items-center">
            <TentangLogo logoRef={refs.logoRef} isInView={animation.isLogoInView} />
            <TentangContent
              contentRef={refs.contentRef}
              isInView={animation.isContentInView}
              onSelengkapnyaClick={handlers.handleSelengkapnyaClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(TentangSection);
