"use client";

import React, { memo, useState, useEffect } from "react";
import Image from "next/image";
import { useSambutanAnimation } from "./hooks/useSambutanAnimation";
import KetumProfile from "./components/KetumProfile";
import SambutanText from "./components/SambutanText";

const SambutanSection: React.FC = () => {
  // Memanggil custom hook untuk mendapatkan semua state dan logika animasi
  const { sectionRef, isSectionInView, headerClasses } = useSambutanAnimation();
  
  // State untuk mendeteksi iOS
  const [isIOS, setIsIOS] = useState(false);

  // Deteksi iOS device
  useEffect(() => {
    const detectIOS = () => {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
             (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    };
    
    setIsIOS(detectIOS());
  }, []);

  // Tentukan path gambar berdasarkan device
  const headingImageSrc = isIOS 
    ? "/heading/HeadingSambutan.webp" 
    : "/heading/HeadingSambutan.svg";

  return (
    <section ref={sectionRef} id="sambutan" className="py-10 md:py-16 lg:py-[15.815vh]">
      <div className="flex flex-col items-center px-12 sm:px-12 md:px-12 lg:px-[10.544vh] xl:px-[21.087vh]">
        <div className={headerClasses}>
          <Image
            src={headingImageSrc}
            alt="Heading Sambutan"
            width={454}
            height={100}
            className="h-13 md:h-22 lg:h-[18.356vh] w-auto max-w-[90%]"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 lg:gap-[10.55vh]">
          <SambutanText isVisible={isSectionInView} />
          <KetumProfile isVisible={isSectionInView} />
        </div>
      </div>
    </section>
  );
};

export default memo(SambutanSection);
