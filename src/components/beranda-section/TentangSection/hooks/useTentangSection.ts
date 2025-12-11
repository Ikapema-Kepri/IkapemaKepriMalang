import { useInView, UseInViewOptions  } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState, useCallback, useMemo } from "react";

export const useTentangSection = () => {
  // Refs untuk setiap elemen yang dianimasikan
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  const router = useRouter();

  // State untuk media query
  const [isWideAspectRatio, setIsWideAspectRatio] = useState(false);

  // --- Logika Animasi ---
  const useInViewOptions: UseInViewOptions = {
    once: false, // Animasi akan berulang
    margin: "0px 0px -100px 0px",
    amount: 0.3,
  };

  const isLogoInView = useInView(logoRef, useInViewOptions);
  const isContentInView = useInView(contentRef, useInViewOptions);
  const isHeaderInView = useInView(headerRef, useInViewOptions);

  // --- Logika Media Query ---
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(min-aspect-ratio: 1.6) and (max-aspect-ratio: 1.8)');
    
    const handleChange = (e: MediaQueryListEvent) => setIsWideAspectRatio(e.matches);
    
    setIsWideAspectRatio(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // --- Event Handler ---
  const handleSelengkapnyaClick = useCallback(() => {
    router.push("/tentang");
  }, [router]);

  // --- Memoized Classes ---
  const headerClasses = useMemo(() => `text-center mb-4 md:mb-8 lg:mb-[7.908vh] transition-all duration-1000 ease-out ${
    isHeaderInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`, [isHeaderInView]);

  return {
    refs: { sectionRef, logoRef, contentRef, headerRef },
    animation: { isLogoInView, isContentInView, isHeaderInView, headerClasses },
    styles: { isWideAspectRatio },
    handlers: { handleSelengkapnyaClick },
  };
};