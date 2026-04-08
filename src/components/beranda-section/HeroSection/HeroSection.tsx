"use client";

import React, { memo, useMemo } from "react";
import { useHeroAnimation } from "./hooks/useHeroAnimation";
import HeroBackground from "./components/HeroBackground";
import HeroContent from "./components/HeroContent";
import ScrollIndicator from "./components/ScrollIndicator";
import { useBanner } from "@/hooks/useBanner";

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
  const { banner } = useBanner();

  const bannerUrl = useMemo(
    () => banner?.bannerUrl ?? "/Hero.webp",
    [banner?.bannerUrl]
  );

  const displayTitle = useMemo(
    () => banner?.title ?? title,
    [banner?.title, title]
  );

  const displaySubtitle = useMemo(
    () => banner?.subtitle ? <blockquote>{banner.subtitle}</blockquote> : subtitle,
    [banner?.subtitle, subtitle]
  );

  return (
    <section
      ref={backgroundRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#E5FAFF] text-white overflow-hidden"
    >
      <HeroBackground imageClasses={imageClasses} bannerUrl={bannerUrl} />
      <HeroContent
        title={displayTitle}
        subtitle={displaySubtitle}
        buttonText={buttonText}
        onButtonClick={onButtonClick}
      />
      <ScrollIndicator onScrollClick={onScrollClick} />
    </section>
  );
};

export default memo(HeroSectionPages);