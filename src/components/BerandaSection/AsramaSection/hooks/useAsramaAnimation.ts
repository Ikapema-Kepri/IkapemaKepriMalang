import { useInView, UseInViewOptions } from "framer-motion";
import { useMemo, useRef } from "react";

export const useAsramaAnimation = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const useInViewOptions: UseInViewOptions = {
    once: false, // Animasi akan berulang
    margin: "0px 0px -100px 0px",
  };

  const isHeaderInView = useInView(headerRef, { ...useInViewOptions, amount: 0.3 });
  const isCardsInView = useInView(cardsRef, { ...useInViewOptions, amount: 0.1 });
  const isCtaInView = useInView(ctaRef, { ...useInViewOptions, amount: 0.5 });

  const headerClasses = useMemo(() => `transition-all duration-1000 ease-out ${
    isHeaderInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`, [isHeaderInView]);

  const cardsContainerClasses = useMemo(() => `transition-all duration-1000 ease-out delay-200 ${
    isCardsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
  }`, [isCardsInView]);

  const ctaContainerClasses = useMemo(() => `transition-all duration-1000 ease-out ${
    isCtaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
  }`, [isCtaInView]);

  return {
    refs: { headerRef, cardsRef, ctaRef },
    animation: { headerClasses, cardsContainerClasses, ctaContainerClasses },
  };
};