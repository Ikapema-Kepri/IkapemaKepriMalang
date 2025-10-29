import React, { memo, useMemo, useEffect, useState } from "react";
import Image from "next/image";

interface KegiatanHeaderProps {
  headerRef: React.Ref<HTMLDivElement>;
  isInView: boolean;
}

const KegiatanHeader: React.FC<KegiatanHeaderProps> = ({ headerRef, isInView }) => {
  const headerClasses = useMemo(
    () =>
      `flex items-center justify-center gap-4 mb-0 md:mb-6 lg:mb-8 transition-all duration-1000 ease-out ${
        isInView
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95"
      }`,
    [isInView]
  );

  const [isIOS, setIsIOS] = useState(false);
  
    useEffect(() => {
      const detectIOS = () => {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      };
      
      setIsIOS(detectIOS());
    }, []);
  
    const headingImageSrc = isIOS 
      ? "/heading/HeadingKegiatan.webp" 
      : "/heading/HeadingKegiatan.svg";

  return (
    <div className="text-center gap-4 md:gap-6 lg:gap-[5.272vh]">
      <div ref={headerRef} className={headerClasses}>
        <Image
          src={headingImageSrc}
          alt="Heading Kegiatan"
          width={454}
          height={100}
          className="h-13 md:h-22 lg:h-[18.356vh] w-auto max-w-[90%]"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default memo(KegiatanHeader);