"use client";

import type React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "@/app/components/UI/button";

const TentangSection: React.FC = () => {
  const handleSelengkapnyaClick = () => {
    console.log("Selengkapnya button clicked");
    // Add your navigation logic here
  };

  return (
    <section className="w-full py-16 px-6 md:px-16 lg:px-24">
      <div className="mx-auto bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-500 rounded-3xl py-16 px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header with decorative title */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Image
                src="/heading/HeadingTentang.svg"
                alt="Heading Sambutan"
                width={454}
                height={100}
                className="h-10 md:h-20 lg:h-[80px] w-auto max-w-[90%]"
              />
            </div>
          </div>

          {/* Main content */}
          <div className="grid lg:grid-cols-2 gap-1 lg:gap-12 items-center">
            {/* Logo/Image section */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-50 h-50 md:w-72 md:h-72 lg:w-100 lg:h-100 relative flex justify-center items-center">
                <Image
                  src="/LogoIKAPEMA.svg" // Replace with your logo path
                  alt="IKAPEMA KEPRI MALANG Logo"
                  width={500}
                  height={500}
                  className="object-contain h-50 w-50 md:h-72 md:w-72 lg:h-[500px] lg:w-[500px]"
                />
              </div>
            </div>

            {/* Content section */}
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black leading-tight text-center lg:text-left">
                Apa itu IKAPEMA KEPRI—MALANG?
              </h3>

              <p className="text-black/80 text-base md:text-lg leading-relaxed text-justify">
                Lorem ipsum dolor sit amet consectetur. Dolor vitae turpis
                tempus velit elit. Aliquet vitae sit nulla non sollicitudin
                vitae est morbi. Tincidunt venenatis nec tempus vivamus libero
                sit risus imperdiet tortor. Ac iaculis adipiscing ac non
                curabitur amet tellus vitae iaculis. Lacinia eu a tristique
                convallis. Nunc nunc pretium a tortor dolor cras. Arcu turpis
                urna ut eu. Viverra vestibulum id risus donec.
              </p>

              <div className="pt-4">
                <Button
                  onClick={handleSelengkapnyaClick}
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Selengkapnya
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TentangSection;
