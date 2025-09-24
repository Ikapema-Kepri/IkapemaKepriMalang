import React, { memo } from "react";
import Image from "next/image";

interface AsramaHeaderProps {
  headerRef: React.Ref<HTMLDivElement>;
  headerClasses: string;
}

const AsramaHeader: React.FC<AsramaHeaderProps> = ({ headerRef, headerClasses }) => {
  return (
    <div ref={headerRef} className={`text-center mb-12 ${headerClasses}`}>
      <div className="flex items-center justify-center gap-4 mb-6 md:mb-8">
        <Image
          src="/heading/HeadingAsrama.svg"
          alt="Heading Asrama"
          width={454}
          height={100}
          className="h-13 md:h-22 lg:h-[18.356vh] w-auto max-w-[90%]"
          loading="lazy"
        />
      </div>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Fasilitas hunian yang disediakan oleh Pemerintah Provinsi Kepulauan Riau untuk mendukung kehidupan akademis mahasiswa
      </p>
    </div>
  );
};

export default memo(AsramaHeader);