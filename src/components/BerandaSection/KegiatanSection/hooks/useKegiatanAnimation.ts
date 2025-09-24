import { useInView, UseInViewOptions } from "framer-motion";
import { useMemo, useRef } from "react";

export const useKegiatanAnimation = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const useInViewOptions: UseInViewOptions = {
    once: false, // Animasi akan berulang
    margin: "0px 0px -100px 0px",
  };

  const isHeaderInView = useInView(headerRef, { ...useInViewOptions, amount: 0.3 });
  const isSliderInView = useInView(sliderRef, { ...useInViewOptions, amount: 0.2 });

  // Memoized classes untuk slider container
  const sliderContainerClasses = useMemo(
    () =>
      `transition-all duration-1200 ease-out ${
        isSliderInView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12"
      }`,
    [isSliderInView]
  );

  return {
    refs: { headerRef, sliderRef },
    animation: { isHeaderInView, sliderContainerClasses },
  };
};