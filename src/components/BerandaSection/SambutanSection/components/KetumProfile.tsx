import React, { memo, useMemo } from "react";
import Image from "next/image";


const KetumProfile = memo(({ isVisible }: { isVisible: boolean }) => {
  const imageContainerClasses = useMemo(
    () =>
      `relative flex flex-col items-center transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-12 scale-95"
      }`,
    [isVisible]
  );

  const imageClasses = useMemo(
    () =>
      `w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-[63.262vh] xl:h-[63.262vh] transition-all duration-700 ease-out ${
        isVisible ? "hover:scale-105" : ""
      }`,
    [isVisible]
  );

  const textContainerClasses = useMemo(
    () =>
      `text-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-2 transition-all duration-800 delay-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`,
    [isVisible]
  );

  return (
    <div className="w-full md:w-1/2 lg:w-2/5 flex justify-center">
      <div className={imageContainerClasses}>
        <div className="relative mb-4 sm:mb-6 md:mb-8 lg:mb-[3.954vh]">
          <Image
            src="/bg/FotoKetum.svg"
            alt="Foto Ketua Umum IKAPEMA KEPRI"
            width={400}
            height={400}
            className={imageClasses}
            loading="lazy"
          />
        </div>
        <div className={textContainerClasses}>
          <h3 className="text-sm sm:text-base md:text-lg lg:text-[3.295vh] xl:text-[3.954vh] 2xl:text-[4.942vh] font-bold text-[#005266] mb-2 sm:mb-2 md:mb-3 lg:mb-2 leading-tight break-words">
            Mgs Achmad Dachlan R
          </h3>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-600 leading-tight break-words">
            Ketua Umum IKAPEMA KEPRI—MALANG 2024/2025
          </p>
        </div>
      </div>
    </div>
  );
});

KetumProfile.displayName = "KetumProfile";
export default KetumProfile;