import React, { memo, useMemo, useEffect, useState } from "react";
import Image from "next/image";

interface FaqHeaderProps {
  headerRef: React.Ref<HTMLDivElement>;
  isInView: boolean;
}

const FaqHeader: React.FC<FaqHeaderProps> = ({ headerRef, isInView }) => {
  const headerClasses = useMemo(
    () =>
      `flex items-center justify-center gap-4 mb-4 md:mb-6 lg:mb-[5.272vh] transition-all duration-1000 ease-out ${
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
      ? "/heading/HeadingFAQ.webp" 
      : "/heading/HeadingFAQ.svg";

  return (
    <div className="text-center">
      <div ref={headerRef} className={headerClasses}>
        <Image
          src={headingImageSrc}
          alt="Heading FAQ"
          width={454}
          height={100}
          className="h-13 md:h-22 lg:h-[18.356vh] w-auto max-w-[90%]"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default memo(FaqHeader);