import React, { memo, useMemo } from "react";
import Image from "next/image";

interface EmagzHeaderProps {
  headerRef: React.Ref<HTMLDivElement>;
  isInView: boolean;
}

const EmagzHeader: React.FC<EmagzHeaderProps> = ({ headerRef, isInView }) => {
  const headerClasses = useMemo(
    () =>
      `flex items-center justify-center gap-4 mb-6 md:mb-8 transition-all duration-1000 ease-out ${
        isInView
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95"
      }`,
    [isInView]
  );

  return (
    <div className="text-center mb-4 md:mb-8 lg:mb-12">
      <div ref={headerRef} className={headerClasses}>
        <Image
          src="/heading/HeadingEmagz.svg"
          alt="Heading Emagz"
          width={454}
          height={100}
          className="h-13 md:h-22 lg:h-[18.356vh] w-auto max-w-[90%]"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default memo(EmagzHeader);