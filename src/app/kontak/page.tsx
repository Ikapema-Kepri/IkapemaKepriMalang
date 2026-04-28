"use client";

import { motion } from "framer-motion";
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
import KontakCard from "@/components/UI/kontak-card";

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

         <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">  
          <KontakCard
            icon={Instagram}
            label="Instagram"
            value= {kontakInstagram?.username || "@ikapemakeprimalang"}
            href= {kontakInstagram?.url || "https://www.instagram.com/ikapemakeprimalang/"}
            cta="Follow us"
            accent="#E6007E"
          />
          <KontakCard
            icon={MessageCircle}
            label="WhatsApp"
            value={`${kontakWhatsapp?.namaKontak || "Nova Syahfitri"} - ${kontakWhatsapp?.departemen || "Humas"}`}
            href={kontakWhatsapp?.nomorApi ? `https://wa.me/${kontakWhatsapp.nomorApi}?text=${encodeURIComponent(kontakWhatsapp.pesanDefault || '')}` : "https://wa.link/1yq1z6"}
            cta="Chat us"
            accent="#25D366"
          />
          <KontakCard
            icon={Mail}
            label="Email"
            value= {kontakEmail?.alamatEmail || "ikapemakepri.malang@gmail.com"}
            href= {`mailto:${kontakEmail?.alamatEmail || "ikapemakepri.malang@gmail.com"}`}
            cta="Email us"
            accent= "#0077ffff"
          />
          <KontakCard
            icon={MapPin}
            label="Sekretariat"
            value= {kontakSekretariat?.namaLokasi || "Asrama Putra Ikapema"}
            href= {kontakSekretariat?.mapsUrl || "https://maps.app.goo.gl/1yq1z6"}
            cta="View on map"
            accent= "#ff9900ff"
          />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="overflow-hidden rounded-2xl border border-border/60 shadow-[var(--shadow-soft)] lg:col-span-2">
            <iframe
              title="Lokasi Kesekretariatan"
              src={kontakSekretariat?.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

           <aside className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-7 shadow-[var(--shadow-soft)]">
            <h2 className="text-xl font-bold text-foreground">Kunjungi Kesekretariatan</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Kami menerima kunjungan langsung sesuai jam operasional di bawah ini.
            </p>

            <div className="mt-6 space-y-5">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-blue-300/20 text-brand">
                  <MapPin className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Alamat</p>
                  <p className="text-sm text-muted-foreground">
                    {kontakSekretariat?.alamat}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-blue-300/20 text-brand">
                  <Clock className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Jam Operasional</p>
                  <p className="text-sm text-muted-foreground">
                    {kontakSekretariat?.jamOperasional}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-blue-300/20 text-brand">
                  <User className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Contact Person</p>
                  <p className="text-sm text-muted-foreground">
                    {kontakWhatsapp?.nomorKontak}
                  </p>
                </div>
              </div>
            </div>

            <a
              href={kontakSekretariat?.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex w-full items-center justify-center rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground shadow-[var(--shadow-soft)] transition-[var(--transition-smooth)] hover:bg-brand-glow"
            >
              Buka di Google Maps
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}