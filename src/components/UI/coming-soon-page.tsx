"use client";

import React from "react";

const ComingSoonPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E5FAFF] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
      <section className="w-full max-w-3xl flex flex-col gap-2 sm:gap-3 md:gap-4">
        <div className="w-full text-center flex items-center justify-center py-3 sm:py-4 md:py-6 bg-gradient-to-l from-[#00A3CC] to-[#005266] rounded-t-xl sm:rounded-t-2xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#E5FAFF] px-2">
            Coming Soon
          </h1>
        </div>
        <div className="w-full text-center flex items-center justify-center py-3 sm:py-4 md:py-6 bg-[#CCF5FF] rounded-b-xl sm:rounded-b-2xl">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#005266] px-2">
            Halaman ini sedang dalam pengembangan
          </h2>
        </div>
      </section>
      <section className="w-full max-w-3xl mt-8 flex flex-col items-center">
        <p className="text-[#005266] text-base sm:text-lg md:text-xl font-semibold mt-4 text-center">
          Nantikan update terbaru dari kami!
        </p>
      </section>
    </div>
  );
};

export default ComingSoonPage;