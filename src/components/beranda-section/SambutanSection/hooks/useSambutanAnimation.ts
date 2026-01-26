import { useInView } from "framer-motion";
import { useMemo, useRef } from "react";

export const useSambutanAnimation = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Logika deteksi viewport
  const isSectionInView = useInView(sectionRef, {
    once: false, // Animasi akan berulang
    margin: "0px 0px -150px 0px",
    amount: 0.2,
  });

  // Memoized class untuk header
  const headerClasses = useMemo(
    () =>
      `relative flex flex-col items-center justify-center text-center mb-6 md:mb-8 lg:mb-[6.59vh] transition-all duration-1000 ease-out ${
        isSectionInView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`,
    [isSectionInView]
  );

  return {
    sectionRef,
    isSectionInView,
    headerClasses,
  };
};