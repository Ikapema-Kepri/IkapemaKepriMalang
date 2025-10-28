import React, { memo } from "react";
import Image from "next/image";

const DecorativeDots = memo(() => (
  <>
    <div className="absolute top-1/4 left-4 sm:left-6 md:left-8 w-2 h-2 sm:w-3 sm:h-3 md:w-[1.432vh] md:h-[1.432vh] bg-white rounded-full opacity-60 animate-pulse hidden sm:block" />
    <div className="absolute top-1/3 right-6 sm:right-10 md:right-12 w-3 h-3 sm:w-4 sm:h-4 md:w-[2.148vh] md:h-[2.148vh] bg-white rounded-full opacity-40 animate-pulse hidden sm:block" />
    <div className="absolute bottom-1/4 left-8 sm:left-12 md:left-16 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-[0.716vh] md:h-[0.716vh] bg-white rounded-full opacity-80 animate-pulse hidden sm:block" />
    <div className="absolute bottom-1/3 right-4 sm:right-6 md:right-8 w-2 h-2 sm:w-3 sm:h-3 md:w-[1.432vh] md:h-[1.432vh] bg-white rounded-full opacity-50 animate-pulse hidden sm:block" />
  </>
));
DecorativeDots.displayName = "DecorativeDots";

interface HeroBackgroundProps {
  imageClasses: string;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ imageClasses }) => {
  return (
    <>
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/Hero.webp"
          alt="IKAPEMA KEPRI-MALANG Background"
          fill
          sizes="100vw"
          priority // Penting untuk LCP (Largest Contentful Paint)
          quality={80}
          className={imageClasses}
        />
      </div>
      <DecorativeDots />
    </>
  );
};

export default memo(HeroBackground);