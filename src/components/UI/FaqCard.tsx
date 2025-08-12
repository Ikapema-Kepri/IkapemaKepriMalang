'use client';

import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface FaqCardProps {
  question: string;
  answer: React.ReactNode;
}

const FaqCard: React.FC<FaqCardProps> = ({ question, answer }) => {
  const [active, setActive] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`
        w-full
        max-w-[1062px]
        bg-[#FFFFFF]
        rounded-[20px]
        transition-all duration-500
        shadow
        relative
        overflow-hidden
        border-l-[8px] md:border-l-[16px] lg:border-l-[20px] border-[#007A99]
        my-2
      `}
      style={{
        boxShadow: active
          ? "0 8px 32px 0 rgba(0,122,255,0.10)"
          : "0 2px 8px 0 rgba(0,0,0,0.04)",
      }}
    >
      {/* Pertanyaan & Arrow dalam satu baris */}
      <div className="flex flex-row items-center px-4 py-4 md:px-8 md:py-6 relative z-10 bg-white">
        <span
          className={`flex-1 text-base md:text-lg font-semibold transition-colors duration-300 ${
            active ? "text-[#007A99]" : "text-gray-800"
          }`}
        >
          {question}
        </span>
        <button
          className="p-3 md:p-4 focus:outline-none flex items-center relative z-20 group"
          onClick={() => setActive((prev) => !prev)}
          aria-label={active ? "Tutup jawaban" : "Buka jawaban"}
          tabIndex={0}
          type="button"
        >
          {active ? (
            <ChevronDown
              className="w-6 h-6 md:w-7 md:h-7 transition-transform duration-300 rotate-180 text-blue-600"
            />
          ) : (
            <ChevronDown
              className="w-6 h-6 md:w-7 md:h-7 transition-transform duration-300 text-gray-500 group-hover:text-blue-600"
            />
          )}
        </button>
      </div>
      {/* Jawaban */}
      <div
        ref={contentRef}
        className={`${active ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{
          maxHeight: active
            ? contentRef.current
              ? `${contentRef.current.scrollHeight + 32}px`
              : "500px"
            : "0px",
          opacity: active ? 1 : 0,
          paddingBottom: active ? 16 : 0,
          transition:
            "max-height 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.4s, padding-bottom 0.4s",
          overflow: "hidden",
        }}
      >
        <div className="text-gray-700 text-sm md:text-base px-4 md:px-8 pt-0 pb-4">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default FaqCard;