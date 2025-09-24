import React, { memo, useMemo } from "react";
import Image from "next/image";

interface EmagzCardProps {
  contentRef: React.Ref<HTMLDivElement>;
  isInView: boolean;
}

const EmagzCard: React.FC<EmagzCardProps> = ({ contentRef, isInView }) => {
  const containerClasses = useMemo(
    () =>
      `transition-all duration-1200 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`,
    [isInView]
  );

  return (
    <div ref={contentRef} className={containerClasses}>
      <div
        className="relative w-[600px] h-[420px] bg-[#33D6FF] rounded-[10px] flex flex-col items-center justify-center text-center p-8 max-w-[90vw] max-h-[80vh] overflow-hidden"
        style={{
          boxShadow: `
            inset 0 0 20px rgba(0, 0, 0, 0.15),
            inset 0 0 10px rgba(0, 0, 0, 0.1)
          `,
        }}
      >
        {/* Background Rantai Image */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
          <div className="w-[600px] h-[420px] relative">
            <Image
              src="/bg/Rantai.webp"
              alt="Rantai Background"
              fill
              className="object-contain opacity-100"
              loading="lazy"
            />
          </div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-56">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Tuned
          </h2>
          <button
            disabled
            className="px-6 py-3 bg-white/30 text-white font-semibold rounded-full cursor-not-allowed flex items-center justify-center space-x-2 backdrop-blur-sm border border-white/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Coming Soon</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(EmagzCard);