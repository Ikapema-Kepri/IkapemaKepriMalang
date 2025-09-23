import React from 'react';
import AsramaCard from '../../UI/AsramaCard';
import Image from 'next/image';
import { useRef } from "react";
import { useInView } from "framer-motion";


const AsramaSection: React.FC = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    //   const contentRef = useRef<HTMLDivElement>(null);
    
      const isHeaderInView = useInView(headerRef, {
        once: false,
        margin: "0px 0px -100px 0px",
        amount: 0.3,
      });
    
    //   const isContentInView = useInView(contentRef, {
    //     once: false,
    //     margin: "0px 0px -100px 0px",
    //     amount: 0.2,
    //   });

    const asramaData = [
        {
            id: 1,
            image: "/bg/AsramaPutra.svg",
            title: "Asrama Mahasiswa Putra",
            address: "Jl. Saxophone Permata Kencana Blok C no 22, Tunggulwulung, Kec. Lowokwaru, Kota Malang, Jawa Timur 65143",
            badgeText: "Putra",
            badgeColor: "bg-blue-600",
            hoverColor: "group-hover:text-blue-600",
            iconColor: "text-blue-500",
            decorativeGradient: "bg-gradient-to-br from-blue-400 to-blue-600"
        },
        {
            id: 2,
            image: "/bg/AsramaPutri.svg",
            title: "Asrama Mahasiswa Putri",
            address: "Jl. Bukit Hijau Blok E. No 82, Tlogomas, Kec. Lowokwaru, Kota Malang, Jawa Timur 65144",
            badgeText: "Putri",
            badgeColor: "bg-pink-600",
            hoverColor: "group-hover:text-pink-600",
            iconColor: "text-pink-500",
            decorativeGradient: "bg-gradient-to-br from-pink-400 to-pink-600"
        }
    ];

    return(
        <section className="bg-[#E5FAFF] py-16 px-16 ">
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="text-center mb-4 md:mb-8 lg:mb-12">
                        <div
                          ref={headerRef}
                          className={`flex items-center justify-center gap-4 mb-6 md:mb-8 transition-all duration-1000 ease-out ${
                            isHeaderInView
                              ? "opacity-100 translate-y-0 scale-100"
                              : "opacity-0 translate-y-8 scale-95"
                          }`}
                        >
                          <Image
                            src="/heading/HeadingAsrama.svg"
                            alt="Heading Asrama"
                            width={454}
                            height={100}
                            className="h-13 md:h-22 lg:h-[18.356vh] w-auto max-w-[90%]"
                          />
                        </div>
                      </div>

                <div className="text-center mb-12">
                    {/* <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Asrama Mahasiswa
                    </h2> */}
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Fasilitas hunian yang disediakan oleh Pemerintah Provinsi Kepulauan Riau untuk mendukung kehidupan akademis mahasiswa
                    </p>
                </div>

                {/* Cards Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
                    {asramaData.map((asrama) => (
                        <AsramaCard
                            key={asrama.id}
                            image={asrama.image}
                            title={asrama.title}
                            address={asrama.address}
                            badgeText={asrama.badgeText}
                            badgeColor={asrama.badgeColor}
                            hoverColor={asrama.hoverColor}
                            iconColor={asrama.iconColor}
                            decorativeGradient={asrama.decorativeGradient}
                        />
                    ))}
                </div>

                {/* CTA Button */}
                <div className="text-center">
                    <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-[#33D6FF] to-[#00A3CC] hover:from-[#007A99] hover:to-[#005266] rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                        {/* Button Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
                        
                        <span className="relative z-10 flex items-center space-x-2">
                            <span>Lihat Detail Asrama</span>
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                        
                        {/* Button Glow Effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#007A99] to-[#005266] blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default AsramaSection;