import { useInView, UseInViewOptions } from "framer-motion";
import { useRef } from "react";

export const useFaqAnimation = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);

  const useInViewOptions: UseInViewOptions = {
    once: false, // Animasi akan berulang
    margin: "0px 0px -100px 0px",
  };

  const isHeaderInView = useInView(headerRef, { ...useInViewOptions, amount: 0.3 });
  const isFaqListInView = useInView(faqListRef, { ...useInViewOptions, amount: 0.2 });

  return {
    refs: { headerRef, faqListRef },
    animation: { isHeaderInView, isFaqListInView },
  };
};