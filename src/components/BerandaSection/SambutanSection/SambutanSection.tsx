"use client";

import React, { memo } from "react";
import Image from "next/image";
import { useSambutanAnimation } from "./hooks/useSambutanAnimation";
import KetumProfile from "./components/KetumProfile";
import SambutanText from "./components/SambutanText";

const SambutanSection: React.FC = () => {
  // Memanggil custom hook untuk mendapatkan semua state dan logika animasi
  const { sectionRef, isSectionInView, headerClasses } = useSambutanAnimation();

  return (
    <section ref={sectionRef} id="sambutan" className="py-10 md:py-16 lg:py-[15.815vh]">
      <div className="flex flex-col items-center px-12 sm:px-12 md:px-12 lg:px-[10.544vh] xl:px-[21.087vh]">
        <div className={headerClasses}>
          <Image
            src="/heading/HeadingSambutan.svg"
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
