import React, { memo, useMemo } from "react";
import Image from "next/image";

interface EmagzCardProps {
  contentRef: React.Ref<HTMLDivElement>;
  isInView: boolean;
  title: string;
  coverImage?: string;
  pdfUrl: string;
  description?: string;
  publishDate?: string;
}

const EmagzCard: React.FC<EmagzCardProps> = ({ 
  contentRef, 
  isInView, 
  title,
  coverImage,
  pdfUrl,
  description,
  publishDate
}) => {
  const containerClasses = useMemo(
    () =>
      `transition-all duration-1200 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`,
    [isInView]
  );

  const handleOpenPDF = () => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div ref={contentRef} className={containerClasses}>
      <div
        className="relative w-[600px] h-[420px] bg-gradient-to-br from-[#33D6FF] to-[#1BB5E0] rounded-[10px] flex flex-col items-center justify-center text-center p-8 max-w-[90vw] max-h-[80vh] overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 group"
        style={{
          boxShadow: `
            0 10px 30px rgba(51, 214, 255, 0.3),
            inset 0 0 20px rgba(255, 255, 255, 0.1)
          `,
        }}
        onClick={handleOpenPDF}
      >
        {/* Magazine Cover or Default Background */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
          {coverImage ? (
            <div className="w-full h-full relative">
              <Image
                src={coverImage}
                alt={`${title} Cover`}
                fill
                className="object-cover object-top rounded-[10px]"
                loading="lazy"
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/20 rounded-[10px]" />
            </div>
          ) : (
            <div className="w-full h-full relative flex items-center justify-center">
              <svg 
                className="w-32 h-32 text-white/30" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
            </div>
          )}
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-between h-full py-6">
          {/* Header Section */}
          <div className="flex flex-col items-center">
            {publishDate && (
              <span className="text-sm text-white/80 mb-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                {publishDate}
              </span>
            )}
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
              {title}
            </h2>
            {description && (
              <p className="text-sm md:text-base text-white/90 mb-4 max-w-md leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Action Button */}
          <button
            className="px-8 py-3 bg-white text-[#33D6FF] font-semibold rounded-full hover:bg-white/90 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg group-hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenPDF();
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Baca E-Magazine</span>
          </button>

          {/* Star Decoration Indicator */}
          <div className="absolute top-4 right-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2L15.09,8.26L22,9.27L17,14.14L18.18,21.02L12,17.77L5.82,21.02L7,14.14L2,9.27L8.91,8.26L12,2Z" />
              </svg>
            </div>
          </div>

          {/* Additional Decorative Elements */}
          <div className="absolute top-4 left-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-2">
              <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H5C3.89,1 3,1.89 3,3V7H9V9H3V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V9M19,19H5V7H7V9H9V7H13V9H19V19Z" />
              </svg>
            </div>
          </div>

          {/* Bottom Decorative Sparkles */}
          <div className="absolute bottom-4 left-6">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse" />
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse delay-100" />
              <div className="w-1 h-1 bg-white/50 rounded-full animate-pulse delay-200" />
            </div>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 rounded-[10px]" />
      </div>
    </div>
  );
};

export default memo(EmagzCard);