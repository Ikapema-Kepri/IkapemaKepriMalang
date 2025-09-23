"use client";

import { motion, easeOut } from "framer-motion";
import {
  Instagram,
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  User,
  Clock,
} from "lucide-react";
import React from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
              src="/heading/HeadingKontak.svg"
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
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg"
                >
                  @ikapemakeprimalang
                </motion.div>
              </motion.div>
            </Card>
          </motion.div>

          {/* WhatsApp - Wide Card (Modified to match Email) */}
          <motion.div variants={cardVariants} className="md:col-span-4">
            <Card className="h-full glass-strong rounded-3xl border-0 shadow-2xl transition-all duration-500 group cursor-pointer hover:border-2 hover:border-green-400 hover:shadow-[0_0_25px_rgba(34,197,94,0.3)]">
              <motion.div
                whileHover={{
                  y: -6,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.98 }}
                className="h-full p-8 flex items-center justify-between relative"
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
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-green-600 font-medium text-lg"
                    >
                      +62 898-8821-793
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  whileHover={{
                    x: 10,
                    scale: 1.3,
                    rotate: 15,
                    transition: { duration: 0.3 },
                  }}
                  className="text-green-600/50"
                >
                  <MessageCircle className="w-8 h-8" />
                </motion.div>
              </motion.div>
            </Card>
          </motion.div>

          {/* Email - Wide Card */}
          <motion.div variants={cardVariants} className="md:col-span-4">
            <Card className="h-full glass-strong rounded-3xl border-0 shadow-2xl transition-all duration-500 group cursor-pointer hover:border-2 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(147,51,234,0.3)]">
              <motion.div
                whileHover={{
                  y: -6,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.98 }}
                className="h-full p-8 flex items-center justify-between relative"
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
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-purple-600 font-medium text-lg"
                    >
                      info@organisasi.com
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  whileHover={{
                    x: 10,
                    scale: 1.3,
                    rotate: 15,
                    transition: { duration: 0.3 },
                  }}
                  className="text-purple-600/50"
                >
                  <Mail className="w-8 h-8" />
                </motion.div>
              </motion.div>
            </Card>
          </motion.div>

          {/* Office Address - Large Card */}
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
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                      transition: { duration: 0.2 },
                    }}
                    className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg"
                  >
                    <div className="text-lg font-semibold mb-2">
                      Kantor Pusat
                    </div>
                    <div className="text-foreground/80 leading-relaxed">
                      Perumahan Permata Kencana Blok C no 22,
                      <br />
                      Jl. Saxophone, Tunggulwulung, Kec. Lowokwaru, Kota Malang,<br />
                      65143
                      <br />
                       Jawa Timur, Indonesia
                    </div>
                  </motion.div>

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
                    <span>Senin - Jumat: 08:00 - 17:00 WIB</span>
                  </motion.div>
                </div>
              </motion.div>
            </Card>
          </motion.div>

          {/* Phone - Small Card */}
          <motion.div variants={cardVariants} className="md:col-span-2">
            <Card className="h-full glass rounded-3xl border-0 shadow-xl transition-all duration-500 group cursor-pointer hover:border-2 hover:border-orange-400 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]">
              <motion.div
                whileHover={{
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.95 }}
                className="h-full p-6 flex items-center space-x-4 relative"
              >
                <motion.div
                  whileHover={{
                    rotate: 20,
                    scale: 1.3,
                    transition: { duration: 0.3 },
                  }}
                  className="flex-shrink-0"
                >
                  <Phone className="w-10 h-10 text-orange-500 drop-shadow-md" />
                </motion.div>
                <div>
                  <motion.h3
                    whileHover={{ x: 3 }}
                    className="text-lg font-bold mb-1"
                  >
                    Telepon
                  </motion.h3>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-orange-600 font-medium"
                  >
                    (021) 1234-5678
                  </motion.div>
                </div>
              </motion.div>
            </Card>
          </motion.div>

          {/* Contact Person - Small Card */}
          <motion.div variants={cardVariants} className="md:col-span-2">
            <Card className="h-full glass rounded-3xl border-0 shadow-xl transition-all duration-500 group cursor-pointer hover:border-2 hover:border-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <motion.div
                whileHover={{
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.95 }}
                className="h-full p-6 flex items-center space-x-4 relative"
              >
                <motion.div
                  whileHover={{
                    scale: 1.2,
                    rotate: 10,
                    transition: { duration: 0.3 },
                  }}
                  className="flex-shrink-0"
                >
                  <User className="w-10 h-10 text-indigo-600 drop-shadow-md" />
                </motion.div>
                <div>
                  <motion.h3
                    whileHover={{ x: 3 }}
                    className="text-lg font-bold mb-1"
                  >
                    Contact Person
                  </motion.h3>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-indigo-600 font-medium"
                  >
                    Nova Syahfitri
                  </motion.div>
                  <div className="text-sm text-muted-foreground">
                    Humas
                  </div>
                </div>
              </motion.div>
            </Card>
          </motion.div>
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
