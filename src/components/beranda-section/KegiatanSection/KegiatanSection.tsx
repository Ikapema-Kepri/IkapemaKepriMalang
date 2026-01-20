"use client";

import React, { memo } from "react";
import Slider from "../../UI/slider";
import { useKegiatanAnimation } from "./hooks/useKegiatanAnimation";
import KegiatanHeader from "./components/KegiatanHeader";

const KegiatanSection: React.FC = () => {
  // Memanggil custom hook untuk mendapatkan semua state, refs, dan logika
  const { refs, animation } = useKegiatanAnimation();

  return (
    <section className="w-full py-16 px-6 md:px-16 lg:px-[10.544vh] bg-[#E5FAFF]">
      {/* Header Section */}
      <KegiatanHeader
        headerRef={refs.headerRef}
        isInView={animation.isHeaderInView}
      />

      {/* Slider Section */}
      <div ref={refs.sliderRef} className={animation.sliderContainerClasses}>
        <Slider />
      </div>
    </section>
  );
};

export default memo(KegiatanSection);
