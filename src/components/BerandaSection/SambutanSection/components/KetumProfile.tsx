import React, { memo, useMemo } from "react";
import Image from "next/image";
import FadeContent from "../../../UI/FadeContent"; // Asumsi FadeContent ada di folder UI


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
      `w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-[63.262vh] xl:h-[63.262vh] transition-transform duration-700 ease-out will-change-transform ${
        isVisible ? "hover:scale-105" : ""
      }`,
    [isVisible]
  );

  return (
    <div className="w-full md:w-1/2 lg:w-2/5 flex justify-center">
      <div className={imageContainerClasses}>
        <div className="relative mb-4 sm:mb-6 md:mb-8 lg:mb-[3.954vh]">
          <Image
            src="/bg/FotoKetum.webp"
            alt="Foto Ketua Umum IKAPEMA KEPRI"
            width={400}
            height={400}
            className={imageClasses}
            loading="lazy"
          />
        </div>
        <FadeContent delay={300} isVisible={isVisible}>
          <div className="text-center w-full max-w-xs sm:max-w-sm">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-[3.295vh] font-bold text-[#005266] mb-2 leading-tight">
              Mgs Achmad Dachlan R
            </h3>
            <p className="text-xs sm:text-sm md:text-base font-medium text-gray-600 leading-tight">
              Ketua Umum IKAPEMA KEPRI 2024/2025
            </p>
          </div>
        </FadeContent>
      </div>
    </div>
  );
});

KetumProfile.displayName = "KetumProfile";
export default KetumProfile;