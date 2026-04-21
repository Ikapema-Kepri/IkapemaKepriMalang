"use client";

import { motion, easeOut } from "framer-motion";
import {
  Instagram,
  MessageCircle,
  Mail,
  MapPin,
  User,
  Clock,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useKontak } from "@/hooks/userKontak";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  />
));
Card.displayName = "Card";

export default function ContactPage() {
  const {
    kontakInstagram,
    kontakWhatsapp,
    kontakEmail,
    kontakSekretariat,
  } = useKontak();

  // State untuk mendeteksi iOS
  const [isIOS, setIsIOS] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
  };

  const headerRef = useRef<HTMLDivElement>(null);
  //   const contentRef = useRef<HTMLDivElement>(null);
  
  const isHeaderInView = useInView(headerRef, {
    once: false,
    margin: "0px 0px -100px 0px",
    amount: 0.3,
  });

  // Deteksi iOS device
  useEffect(() => {
    const detectIOS = () => {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
             (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    };
    
    setIsIOS(detectIOS());
  }, []);

  // Tentukan path gambar berdasarkan device
  const headingKontakSrc = isIOS 
    ? "/heading/HeadingKontak.webp" 
    : "/heading/HeadingKontak.svg";

  return (
    <div className="min-h-screen px-4 py-8 md:px-24 md:py-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="text-center mb-4 md:mb-6 lg:mb-8">
          <div
            ref={headerRef}
            className={`flex items-center justify-center gap-4 transition-all duration-1000 ease-out ${
              isHeaderInView
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <Image
              src={headingKontakSrc}
              alt="Heading Kontak"
              width={454}
              height={100}
              className="h-13 md:h-22 lg:h-[18.356vh] w-auto max-w-[90%]"
            />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          {/* <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
            Hubungi Kami
          </h1> */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Terhubung dengan kami melalui berbagai platform dan temukan
            informasi kontak lengkap organisasi
          </p>
        </motion.div>

        {/* Contact Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-fr"
        >
          {/* Instagram - Tall Card */}
          {(!kontakInstagram || kontakInstagram.isActive !== false) && (
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 md:row-span-2"
          >
            <Card className="h-full glass-strong rounded-3xl border-0 shadow-2xl transition-all duration-500 group cursor-pointer overflow-hidden hover:border-2 hover:border-pink-400 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]">
              <motion.div
                whileHover={{
                  y: -8,
                  rotateY: 5,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.95 }}
                className="h-full p-8 flex flex-col justify-center items-center text-center relative"
              >
                <motion.div
                  whileHover={{
                    rotate: 360,
                    scale: 1.2,
                    transition: { duration: 0.6, ease: "easeInOut" },
                  }}
                  className="mb-6"
                >
                  <Instagram className="w-16 h-16 text-pink-500 drop-shadow-lg" />
                </motion.div>
                <motion.h3
                  whileHover={{ scale: 1.05 }}
                  className="text-2xl font-bold mb-3"
                >
                  Instagram
                </motion.h3>
                <p className="text-muted-foreground mb-4">
                  Ikuti update terbaru kami
                </p>
                <motion.a
                  href={kontakInstagram?.url || "https://www.instagram.com/ikapemakeprimalang/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.1,
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {kontakInstagram?.username || "@ikapemakeprimalang"}
                </motion.a>
              </motion.div>
            </Card>
          </motion.div>
          )}

          {/* WhatsApp - Wide Card (Modified to match Email) */}
          {(!kontakWhatsapp || kontakWhatsapp.isActive !== false) && (
          <motion.div variants={cardVariants} className="md:col-span-4">
            <Card className="h-full glass-strong rounded-3xl border-0 shadow-2xl transition-all duration-500 group cursor-pointer hover:border-2 hover:border-green-400 hover:shadow-[0_0_25px_rgba(34,197,94,0.3)]">
              <motion.div
                whileHover={{
                  y: -6,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.98 }}
                className="h-full p-8 flex items-center relative"
              >
                <div className="flex items-center space-x-6">
                  <motion.div
                    whileHover={{
                      rotate: 20,
                      scale: 1.2,
                      y: -3,
                      transition: { duration: 0.4 },
                    }}
                    className="flex-shrink-0"
                  >
                    <MessageCircle className="w-14 h-14 text-green-500 drop-shadow-lg" />
                  </motion.div>
                  <div>
                    <motion.h3
                      whileHover={{ x: 8 }}
                      className="text-2xl font-bold mb-2"
                    >
                      WhatsApp
                    </motion.h3>
                    <p className="text-muted-foreground mb-3">
                      Terhubung langsung dengan kami
                    </p>
                    <motion.a
                      href={kontakWhatsapp?.nomorApi ? `https://wa.me/${kontakWhatsapp.nomorApi}?text=${encodeURIComponent(kontakWhatsapp.pesanDefault || '')}` : "https://wa.link/1yq1z6"}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="text-green-600 font-medium text-lg hover:text-green-500 transition-colors duration-300 inline-block"
                    >
                      {kontakWhatsapp?.nomorKontak || "+62 898-8821-793"}
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </Card>
          </motion.div>
          )}

          {/* Email - Wide Card */}
          {(!kontakEmail || kontakEmail.isActive !== false) && (
          <motion.div variants={cardVariants} className="md:col-span-4">
            <Card className="h-full glass-strong rounded-3xl border-0 shadow-2xl transition-all duration-500 group cursor-pointer hover:border-2 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(147,51,234,0.3)]">
              <motion.div
                whileHover={{
                  y: -6,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.98 }}
                className="h-full p-8 flex items-center relative"
              >
                <div className="flex items-center space-x-6">
                  <motion.div
                    whileHover={{
                      rotate: 20,
                      scale: 1.2,
                      y: -3,
                      transition: { duration: 0.4 },
                    }}
                    className="flex-shrink-0"
                  >
                    <Mail className="w-14 h-14 text-purple-600 drop-shadow-lg" />
                  </motion.div>
                  <div>
                    <motion.h3
                      whileHover={{ x: 8 }}
                      className="text-2xl font-bold mb-2"
                    >
                      Email Resmi
                    </motion.h3>
                    <p className="text-muted-foreground mb-3">
                      Untuk komunikasi formal dan kerjasama
                    </p>
                    <motion.a
                      href={`mailto:${kontakEmail?.alamatEmail || "ikapemakepri.malang@gmail.com"}`}
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="text-purple-600 font-medium text-lg hover:text-purple-500 transition-colors duration-300 inline-block"
                    >
                      {kontakEmail?.alamatEmail || "ikapemakepri.malang@gmail.com"}
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </Card>
          </motion.div>
          )}

          {/* Office Address - Large Card */}
          {(!kontakSekretariat || kontakSekretariat.isActive !== false) && (
          <motion.div
            variants={cardVariants}
            className="md:col-span-4 md:row-span-2"
          >
            <Card className="h-full glass-strong rounded-3xl border-0 shadow-2xl transition-all duration-500 group cursor-pointer hover:border-2 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <motion.div
                whileHover={{
                  y: -8,
                  transition: { duration: 0.4, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.98 }}
                className="h-full p-8 relative"
              >
                <div className="flex items-start space-x-6 mb-6">
                  <motion.div
                    whileHover={{
                      scale: 1.2,
                      rotate: 15,
                      y: -3,
                      transition: { duration: 0.3 },
                    }}
                    className="flex-shrink-0"
                  >
                    <MapPin className="w-12 h-12 text-emerald-600 drop-shadow-md" />
                  </motion.div>
                  <div>
                    <motion.h3
                      whileHover={{ x: 5 }}
                      className="text-2xl font-bold mb-2"
                    >
                      Alamat Kesekretariatan
                    </motion.h3>
                    <p className="text-muted-foreground">
                      Kunjungi untuk bertemu langsung
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {kontakSekretariat?.gmapsUrl ? (
                    <a href={kontakSekretariat.gmapsUrl} target="_blank" rel="noopener noreferrer">
                      <motion.div
                        whileHover={{
                          scale: 1.02,
                          y: -2,
                          transition: { duration: 0.2 },
                        }}
                        className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg cursor-pointer hover:bg-white/30 transition-colors"
                      >
                        <div className="text-lg font-semibold mb-2 text-[#00A3CC]">
                          {kontakSekretariat?.namaLokasi || "Asrama Putra Ikapema"}
                        </div>
                        <div className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                          {kontakSekretariat?.alamat || "Perumahan Permata Kencana Blok C no 22,\nJl. Saxophone, Tunggulwulung, Kec. Lowokwaru, Kota Malang,\n65143\nJawa Timur, Indonesia"}
                        </div>
                      </motion.div>
                    </a>
                  ) : (
                    <motion.div
                      whileHover={{
                        scale: 1.02,
                        y: -2,
                        transition: { duration: 0.2 },
                      }}
                      className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg"
                    >
                      <div className="text-lg font-semibold mb-2">
                        {kontakSekretariat?.namaLokasi || "Kantor Pusat"}
                      </div>
                      <div className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                        {kontakSekretariat?.alamat || "Perumahan Permata Kencana Blok C no 22,\nJl. Saxophone, Tunggulwulung, Kec. Lowokwaru, Kota Malang,\n65143\nJawa Timur, Indonesia"}
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 text-sm text-muted-foreground"
                  >
                    <motion.div
                      whileHover={{
                        rotate: 360,
                        transition: { duration: 0.5 },
                      }}
                    >
                      <Clock className="w-4 h-4" />
                    </motion.div>
                    <span>{kontakSekretariat?.jamOperasional || "Senin - Jumat: 08:00 - 17:00 WIB"}</span>
                  </motion.div>
                </div>
              </motion.div>
            </Card>
          </motion.div>
          )}

          {/* Contact Person - Modified to match Office Address height */}
          {(!kontakWhatsapp || kontakWhatsapp.isActive !== false) && (
          <motion.div variants={cardVariants} className="md:col-span-2 md:row-span-2">
            <Card className="h-full glass-strong rounded-3xl border-0 shadow-2xl transition-all duration-500 group cursor-pointer hover:border-2 hover:border-indigo-400 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]">
              <motion.div
                whileHover={{
                  y: -8,
                  transition: { duration: 0.4, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.98 }}
                className="h-full p-8 flex flex-col justify-center items-center text-center relative"
              >
                <motion.div
                  whileHover={{
                    scale: 1.3,
                    rotate: 15,
                    y: -3,
                    transition: { duration: 0.3 },
                  }}
                  className="mb-6"
                >
                  <User className="w-16 h-16 text-indigo-600 drop-shadow-lg" />
                </motion.div>
                <motion.h3
                  whileHover={{ scale: 1.05 }}
                  className="text-2xl font-bold mb-3"
                >
                  Contact Person
                </motion.h3>
                <p className="text-muted-foreground mb-4">
                  Hubungi langsung untuk informasi lebih lanjut
                </p>
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full text-lg font-medium shadow-lg mb-2"
                >
                  {kontakWhatsapp?.namaKontak || "Nova Syahfitri"}
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-indigo-600 font-medium text-lg"
                >
                  {kontakWhatsapp?.departemen || "Humas"}
                </motion.div>
              </motion.div>
            </Card>
          </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground">
            Kami siap membantu dan menjalin kerjasama yang baik dengan Anda
          </p>
        </motion.div>
      </div>
    </div>
  );
}