import React, { memo } from "react";

interface AsramaCTAProps {
  ctaRef: React.Ref<HTMLDivElement>;
  ctaContainerClasses: string;
}

const AsramaCTA: React.FC<AsramaCTAProps> = ({ ctaRef, ctaContainerClasses }) => {
  return (
    <div ref={ctaRef} className={`text-center ${ctaContainerClasses}`}>
      <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-[#33D6FF] to-[#00A3CC] hover:from-[#007A99] hover:to-[#005266] rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
        <span className="relative z-10 flex items-center space-x-2">
          <span>Lihat Detail Asrama</span>
          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#007A99] to-[#005266] blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
      </button>
    </div>
  );
};

export default memo(AsramaCTA);