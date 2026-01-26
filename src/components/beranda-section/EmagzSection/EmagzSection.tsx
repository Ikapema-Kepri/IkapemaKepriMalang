"use client";

import React, { memo } from "react";
import { useEmagzAnimation } from "./hooks/useEmagzAnimation";
import EmagzHeader from "./components/EmagzHeader";
import EmagzCard from "./components/EmagzCard";

const EmagzSection: React.FC = () => {
  // Memanggil custom hook untuk mendapatkan semua state, refs, dan logika
  const { refs, animation } = useEmagzAnimation();

  return (
    <section className="flex px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 flex-col items-center py-16 bg-[#E5FAFF]">
      <EmagzHeader
        headerRef={refs.headerRef}
        isInView={animation.isHeaderInView}
      />
      <EmagzCard
        contentRef={refs.contentRef}
        isInView={animation.isContentInView} title={""} pdfUrl={"https://drive.google.com/file/d/117k6UVGb6oWNpuDcnKXbNXuU0B4Cv7sI/view?usp=sharing"} coverImage={"/bg/CoverEmagz.png"}      />
    </section>
  );
};

export default memo(EmagzSection);
