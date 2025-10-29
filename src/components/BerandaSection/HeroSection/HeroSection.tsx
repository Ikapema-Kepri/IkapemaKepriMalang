"use client";

import React, { memo } from "react";
import { useHeroAnimation } from "./hooks/useHeroAnimation";
import HeroBackground from "./components/HeroBackground";
import HeroContent from "./components/HeroContent";
import ScrollIndicator from "./components/ScrollIndicator";

interface HeroSectionPagesProps {
  title?: string;
  subtitle?: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  onScrollClick?: () => void;
}

const HeroSectionPages: React.FC<HeroSectionPagesProps> = ({
  title = "IKAPEMA KEPRI—MALANG",
  subtitle = (
    <blockquote>
      Satu Untuk Semua, Semua Untuk Satu, Menjalin Visi, Membangun Negeri.
    </blockquote>
  ),
  buttonText = "Selengkapnya",
  onButtonClick,
  onScrollClick,
}) => {
  const { backgroundRef, imageClasses } = useHeroAnimation();

  return (
    <section
      ref={backgroundRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#E5FAFF] text-white overflow-hidden"
    >
      <HeroBackground imageClasses={imageClasses} />
      <HeroContent
        title={title}
        subtitle={subtitle}
        buttonText={buttonText}
        onButtonClick={onButtonClick}
      />
      <ScrollIndicator onScrollClick={onScrollClick} />
    </section>
  );
};

export default memo(HeroSectionPages);