"use client";

import React, { memo } from "react";
import AsramaCard from "../../UI/AsramaCard";
import { useAsramaAnimation } from "./hooks/useAsramaAnimation";
import { asramaData } from "./data/asrama";
import AsramaHeader from "./components/AsramaHeader";
import AsramaCTA from "./components/AsramaCTA";

const AsramaSection: React.FC = () => {
  const { refs, animation } = useAsramaAnimation();

  return (
    <section className="bg-[#E5FAFF] py-16 px-4 sm:px-8 md:px-16">
      <div className="container mx-auto">
        <AsramaHeader
          headerRef={refs.headerRef}
          headerClasses={animation.headerClasses}
        />

        <div
          ref={refs.cardsRef}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12 ${animation.cardsContainerClasses}`}
        >
          {asramaData.map((asrama) => (
            <AsramaCard
              key={asrama.id}
              image={asrama.image}
              title={asrama.title}
              address={asrama.address}
              badgeText={asrama.badgeText}
              badgeColor={asrama.badgeColor}
              hoverColor={asrama.hoverColor}
              iconColor={asrama.iconColor}
              decorativeGradient={asrama.decorativeGradient}
            />
          ))}
        </div>

        <AsramaCTA
          ctaRef={refs.ctaRef}
          ctaContainerClasses={animation.ctaContainerClasses}
        />
      </div>
    </section>
  );
};

export default memo(AsramaSection);