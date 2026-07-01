import React, { memo, useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";


const FALLBACK_IMAGE = "/Hero.webp";

const CLIP_PATH_ID = "hero-shape-clip";
const SCALE_X = 1 / 1920;
const SCALE_Y = 1 / 968;

const HeroClipDefs = memo(() => (
  <svg
    aria-hidden="true"
    focusable="false"
    style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
  >
    <defs>
      <clipPath id={CLIP_PATH_ID} clipPathUnits="objectBoundingBox">
        <path
          transform={`scale(${SCALE_X} ${SCALE_Y})`}
          d="M1920 0H-5.72205e-05V605.343L225.015 713.692C242.619 722.168 257.354 735.616 267.4 752.373L367.542 919.418C385.61 949.556 418.171 968 453.31 968H1470.12C1505.21 968 1537.73 949.61 1555.81 919.541L1654.67 755.181C1664.25 739.242 1678.1 726.293 1694.64 717.789L1920 601.915V0Z"
        />
      </clipPath>
    </defs>
  </svg>
));
HeroClipDefs.displayName = "HeroClipDefs";

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
  bannerUrl: string;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ imageClasses, bannerUrl }) => {
  const [imgSrc, setImgSrc] = useState(bannerUrl || FALLBACK_IMAGE);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (bannerUrl && bannerUrl !== imgSrc) {
      setImgSrc(bannerUrl);
    }
  }, [bannerUrl, imgSrc]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <>
      <HeroClipDefs />

      <div
        className="absolute inset-0 w-full h-full"
        style={isDesktop ? { clipPath: `url(#${CLIP_PATH_ID})` } : undefined}
      >
        <LazyLoadImage
          src={imgSrc}
          alt="IKAPEMA KEPRI-MALANG Background"
          effect="opacity"
          className={`absolute inset-0 w-full h-full object-cover ${imageClasses}`}
          wrapperClassName="absolute inset-0 w-full h-full block"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00A3CC]/50 to-[#002933]/90 pointer-events-none" />
      </div>
      <DecorativeDots />
    </>
  );
};

export default memo(HeroBackground);