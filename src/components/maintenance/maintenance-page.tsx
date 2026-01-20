"use client";

import React, { Suspense, lazy } from "react";
import Image from "next/image";
import { Badge } from "@/components/UI/badge";
import { FaWrench } from "react-icons/fa";
import Squares from "@/components/Squares";
import { motion, type Variants } from "framer-motion";

// Lazy load komponen gambar
const LazyMaintenanceImage = lazy(() => Promise.resolve({
  default: () => (
    <div>
      <Image
        src="/ui/maintenance-asset.png"
        alt="Maintenance Illustration"
        fill
        className="object-contain"
        fetchPriority="high"
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 30vw"
      />
    </div>
  )
}));

const MaintenancePage: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const slideInRight: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#00A3CC] py-16 md:py-24 lg:py-32 px-8 sm:px-12 md:px-16 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Squares direction="diagonal" speed={0.5} borderColor="#007A99" hoverFillColor="#005266" squareSize={50} />
      </div>
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center relative z-10">
        <motion.div 
          className="flex flex-col justify-center items-center md:items-start space-y-4 lg:space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="flex flex-col items-center md:items-start space-y-3" variants={slideInLeft}>
            <Badge variant="default" className="w-fit text-[#E5FAFF]">
              <FaWrench className="mr-1" />
              Perbaikan
            </Badge>
          </motion.div>

          <motion.div className="flex flex-col items-center md:items-start space-y-3" variants={slideInLeft}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#E5FAFF] leading-tight">
              Maintenance
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-[#E5FAFF] to-[#E5FAFF] rounded-full"></div>
          </motion.div>
          
          <motion.div className="flex flex-col items-center md:items-start space-y-3" variants={slideInLeft}>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#E5FAFF]">
              Situs sedang dalam pemeliharaan
            </h2>
          </motion.div>

          <motion.div className="flex flex-col items-center md:items-start space-y-3" variants={slideInLeft}>
            <p className="text-[#E5FAFF] text-base sm:text-lg md:text-xl leading-relaxed text-center md:text-left">
              Situs kami sedang dalam perbaikan untuk memberikan pengalaman yang lebih baik. Kami akan segera kembali!
            </p>
            <p className="text-[#E5FAFF] text-sm sm:text-base md:text-lg leading-relaxed ">
              Terima kasih atas kesabaran Anda.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex items-center justify-center"
          initial="hidden"
          animate="visible"
          variants={slideInRight}
        >
          <div className="relative w-full max-w-3xl aspect-square">
            <div className="absolute inset-0  opacity-50 rounded-full"></div>
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white">Loading...</div>}>
              <LazyMaintenanceImage />
            </Suspense>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MaintenancePage;
