"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import { useLazyLoad } from "../../../hooks/useLazyLoad";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import ErrorBoundary from "../../../components/UI/ErrorBoundary";

const PengurusPage: React.FC = () => {
  const { isVisible, elementRef } = useLazyLoad({ threshold: 0.1 });

  return (
    <ErrorBoundary>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#E5FAFF] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-8 md:py-16 lg:py-24 xl:py-32">
        <section className="w-full max-w-6xl flex flex-col gap-2 sm:gap-3 md:gap-4">
          <div className="w-full text-center flex items-center justify-center py-3 sm:py-4 md:py-6 bg-gradient-to-l from-[#00A3CC] to-[#005266] rounded-t-xl sm:rounded-t-2xl">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#E5FAFF] px-2">
              Struktur Organisasi
            </h1>
          </div>
          <div className="w-full text-center flex items-center justify-center py-3 sm:py-4 md:py-6 bg-[#CCF5FF] rounded-b-xl sm:rounded-b-2xl">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#005266] px-2">
              Periode 2024/2025
            </h2>
          </div>
        </section>
        
        {/* Lazy loaded image section */}
        <section className="w-full max-w-6xl mt-6 sm:mt-8 md:mt-10" ref={elementRef}>
          <div className="w-full flex justify-center items-center">
            <div className="relative w-full max-w-6xl">
              {isVisible ? (
                <Suspense fallback={<LoadingSpinner size="large" />}>
                  <Image
                    src="/bg/StrukturOrganisasi.svg"
                    alt="Struktur Organisasi IKAPEMA KEPRI 2024/2025"
                    width={1300}
                    height={800}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </Suspense>
              ) : (
                <div className="w-full h-[500px] animate-pulse rounded-lg flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
};

export default PengurusPage;