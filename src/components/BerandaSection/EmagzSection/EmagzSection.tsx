"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";

const EmagzSection: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isHeaderInView = useInView(headerRef, {
    once: false,
    margin: "0px 0px -100px 0px",
    amount: 0.3,
  });

  const isContentInView = useInView(contentRef, {
    once: false,
    margin: "-100px 0px -100px 0px",
    amount: 0.2,
  });

  return (
    <section className="flex px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 flex-col items-center gap-4 md:gap-6 py-16 bg-[#E5FAFF]">
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-12">
        <div
          ref={headerRef}
          className={`flex items-center justify-center gap-4 mb-6 md:mb-8 transition-all duration-1000 ease-out ${
            isHeaderInView
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <Image
            src="/heading/HeadingEmagz.svg"
            alt="Heading Emagz"
            width={454}
            height={100}
            className="h-10 md:h-20 lg:h-[75px] w-auto max-w-[90%]"
          />
        </div>
      </div>

      {/* E-Magazine Content Section */}
      <div
        ref={contentRef}
        className={`transition-all duration-1200 ease-out ${
          isContentInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12"
        }`}
      >
        {/* E-Magazine Card - Fixed Size */}
        <div
          className="relative w-[600px] h-[420px] bg-[#33D6FF] rounded-[10px] flex flex-col items-center justify-center text-center p-8 max-w-[90vw] max-h-[80vh] overflow-hidden"
          style={{
            boxShadow: `
              inset 0 0 20px rgba(0, 0, 0, 0.15),
              inset 0 0 10px rgba(0, 0, 0, 0.1)
            `,
          }}
        >
          {/* Background Rantai Image - Smaller Size */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
            <div className="w-[600px] h-[420px] relative">
              <Image
                src="/bg/Rantai.svg"
                alt="Rantai Background"
                fill
                className="object-contain opacity-100"
                priority={false}
              />
            </div>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-56">
            {/* Coming Soon Text */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Tuned
            </h2>

            {/* Status Button */}
            <button
              disabled
              className="px-6 py-3 bg-white/30 text-white font-semibold rounded-full cursor-not-allowed flex items-center justify-center space-x-2 backdrop-blur-sm border border-white/20"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Coming Soon</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmagzSection;
