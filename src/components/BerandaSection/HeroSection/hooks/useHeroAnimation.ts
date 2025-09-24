import { useInView } from "framer-motion";
import { useMemo, useRef } from "react";

export const useHeroAnimation = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Logika deteksi viewport
  const isBackgroundInView = useInView(backgroundRef, {
    once: false, // DIUBAH: Animasi akan berulang setiap kali masuk ke pandangan
    margin: "0px 0px -50px 0px",
    amount: 0.1,
  });

  // Memoized class untuk background image
  const imageClasses = useMemo(
    () =>
      `pointer-events-none select-none transition-opacity duration-2000 ease-out object-cover object-bottom ${
        isBackgroundInView ? "opacity-100" : "opacity-0"
      }`,
    [isBackgroundInView]
  );

  return {
    backgroundRef,
    imageClasses,
  };
};