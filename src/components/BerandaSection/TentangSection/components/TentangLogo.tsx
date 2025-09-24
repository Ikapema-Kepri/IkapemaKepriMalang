import React, { memo, useMemo } from "react";
import Image from "next/image";

interface TentangLogoProps {
  // PERBAIKAN: Mengubah tipe dari RefObject<HTMLDivElement> menjadi Ref<HTMLDivElement>
  // Tipe Ref<T> lebih fleksibel dan dapat menerima RefObject yang bisa null.
  logoRef: React.Ref<HTMLDivElement>;
  isInView: boolean;
}

const TentangLogo: React.FC<TentangLogoProps> = ({ logoRef, isInView }) => {
  const containerClasses = useMemo(() => 
    `w-50 h-50 md:w-[288px] md:h-[288px] lg:w-[65.898vh] lg:h-[65.898vh] relative flex justify-center items-center transition-all duration-1200 ease-out ${
      isInView ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-16 scale-95"
    }`, 
    [isInView]
  );

  return (
    <div className="w-full lg:w-2/5 flex justify-center lg:justify-start">
      <div ref={logoRef} className={containerClasses}>
        <Image
          src="/LogoIkapema.webp"
          alt="IKAPEMA KEPRI MALANG Logo"
          width={450}
          height={450}
          className="object-contain h-full w-full"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default memo(TentangLogo);