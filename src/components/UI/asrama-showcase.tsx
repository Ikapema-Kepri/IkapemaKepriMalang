"use client";
import React from "react";
import Image from "next/image";
import { MapPin, Eye, Heart } from "lucide-react";
// import { Button } from "./button";

const AsramaShowcase = () => {
  const properties = [
    {
      id: 1,
      title: "Villa Modern Minimalis",
      location: "Jakarta Selatan, Indonesia",
      price: "Rp 4.5 Miliar",
      description: "Villa mewah dengan desain modern minimalis, dilengkapi dengan kolam renang infinity dan taman yang indah. Cocok untuk keluarga yang menginginkan kehidupan yang tenang namun tetap di tengah kota.",
      image: "/public/bg/AsramaPutra.svg",
      features: ["4 Kamar Tidur", "3 Kamar Mandi", "Kolam Renang", "Garasi 2 Mobil"]
    },
    {
      id: 2,
      title: "Rumah Kontemporer Eksklusif",
      location: "Bandung, Indonesia",
      price: "Rp 3.2 Miliar",
      description: "Hunian eksklusif dengan arsitektur kontemporer yang memadukan unsur alam. Dikelilingi pemandangan gunung yang menakjubkan dan udara yang sejuk.",
      image: "/public/bg/AsramaPutra.svg",
      features: ["3 Kamar Tidur", "2 Kamar Mandi", "Taman Pribadi", "View Gunung"]
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 float-animation">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Properti Premium Pilihan
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Temukan hunian impian Anda dengan koleksi properti eksklusif yang telah dipilih secara khusus untuk Anda
          </p>
        </div>

        {/* Property Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {properties.map((property, index) => (
            <div 
              key={property.id} 
              className="property-card shine-effect group"
              style={{ 
                animationDelay: `${index * 0.2}s`,
                animation: `float 6s ease-in-out infinite ${index * 0.2}s` 
              }}
            >
              {/* Image Container */}
              <div className="property-card-image">
                <Image
                  src={property.image}
                  alt={property.title}
                  width={500}
                  height={256}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Floating Icons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                    <Heart className="w-4 h-4 text-white" />
                  </button>
                  <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                    <Eye className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  {property.price}
                </div>
              </div>

              {/* Content */}
              <div className="property-card-content">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="property-title text-2xl font-bold">{property.title}</h3>
                </div>

                <div className="property-location mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>

                <p className="property-description mb-6 text-sm">
                  {property.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex justify-between text-sm text-slate-400 pt-4 border-t border-slate-700/50">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>2.1k views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>89 likes</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          {/* <Button className="btn-luxury text-lg px-12 py-6 rounded-2xl">
            Lihat Semua Properti
            <div className="ml-2 transform group-hover:translate-x-1 transition-transform">
              →
            </div>
          </Button> */}
          
          {/* Additional Info */}
          <p className="text-slate-400 mt-6 text-sm">
            Lebih dari <span className="text-emerald-400 font-semibold">500+</span> properti premium tersedia
          </p>
        </div>
      </div>
    </section>
  );
};

export default AsramaShowcase;