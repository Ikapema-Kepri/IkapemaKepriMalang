'use client';

import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import NavbarGlass from "../NavbarGlass/NavbarGlass";

const NavbarSwitcher: React.FC = () => {
  const [showGlass, setShowGlass] = useState(true);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShowGlass = window.scrollY < 600;
      if (shouldShowGlass !== showGlass) {
        setAnimating(true);
        setTimeout(() => {
          setShowGlass(shouldShowGlass);
          setAnimating(false);
        }, 250); // durasi animasi (ms)
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, [showGlass]);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div
        className={`
          transition-all duration-300
          ${showGlass && !animating ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6 pointer-events-none"}
          absolute w-full
        `}
        style={{ willChange: "opacity, transform" }}
      >
        <NavbarGlass />
      </div>
      <div
        className={`
          transition-all duration-300
          ${!showGlass && !animating ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6 pointer-events-none"}
          absolute w-full
        `}
        style={{ willChange: "opacity, transform" }}
      >
        <Navbar />
      </div>
    </div>
  );
};

export default NavbarSwitcher;