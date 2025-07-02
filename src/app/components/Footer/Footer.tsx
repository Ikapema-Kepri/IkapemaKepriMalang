'use client';

import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "Program", href: "/program" },
  { label: "Struktur", href: "/struktur" },
  { label: "Kontak", href: "/kontak" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-[#005266] text-white" style={{ minHeight: 400 }}>
      <div className="max-w-[1440px] mx-auto h-full flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row h-full items-start justify-between gap-10 px-4 sm:px-6 md:px-12 lg:px-16 py-8 md:py-12">
          {/* Logo */}
          <div className="flex flex-col items-center lg:items-center w-full lg:w-auto mb-8 lg:mb-0">
            <Image
              src="/LogoIkapema.svg"
              alt="Logo IKAPEMA"
              width={180}
              height={180}
              className="mb-4 w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px] lg:w-[314px] lg:h-[314px]"
              priority
            />
            <span className="text-base sm:text-lg font-semibold mt-2 text-center">
              IKATAN PELAJAR & MAHASISWA <br />KEPRI-MALANG
            </span>
          </div>

          {/* Kontak */}
          <div className="w-full lg:w-auto border-l-0 lg:border-l-4 border-white pl-0 lg:pl-4 flex flex-col gap-2 mb-8 lg:mb-0">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 mt-2">Informasi Kontak</h3>
            <div className="flex flex-col text-base sm:text-lg md:text-xl gap-4">
              <div>
                <div className="flex items-center gap-2 font-semibold">
                  <Phone className="w-5 h-5" />
                  Phone
                </div>
                <div className="ml-7 text-white/80 text-sm sm:text-base">+62 898-8821-793</div>
              </div>
              <div>
                <div className="flex items-center gap-2 font-semibold">
                  <Mail className="w-5 h-5" />
                  Email
                </div>
                <div className="ml-7 text-white/80 text-sm sm:text-base">@ikapemakeprimalang</div>
              </div>
              <div>
                <div className="flex items-center gap-2 font-semibold">
                  <MapPin className="w-5 h-5" />
                  Address
                </div>
                <div className="ml-7 w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-[350px] text-white/80 text-sm sm:text-base">
                  Perumahan Permata Kencana Blok C no 22, Jl. Saxophone, Tunggulwulung, Kec. Lowokwaru, Kota Malang, Jawa Timur 65143
                </div>
              </div>
            </div>
          </div>

          {/* Media Sosial */}
          <div className="w-full lg:w-auto border-l-0 lg:border-l-4 border-white pl-0 lg:pl-4 flex flex-col gap-2 mb-8 lg:mb-0">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 mt-2">Media Sosial</h3>
            <div className="flex flex-col text-base sm:text-lg gap-4 mt-2">
              <Link href="https://www.instagram.com/ikapemakeprimalang/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex flex-row items-center gap-2">
                <FaInstagram className="w-6 h-6 hover:text-[#00CCFF] transition-colors" />
                <span>@ikapemakeprimalang</span>
              </Link>
              <Link href="https://www.youtube.com/@ikapemakeprimalang7099" target="_blank" rel="noopener noreferrer" aria-label="Youtube" className="flex flex-row items-center gap-2">
                <FaYoutube className="w-6 h-6 hover:text-[#00CCFF] transition-colors" />
                <span>ikapemakeprimalang</span>
              </Link>
              <Link href="https://www.tiktok.com/@ikapemakeprimalang" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="flex flex-row items-center gap-2">
                <FaTiktok className="w-6 h-6 hover:text-[#00CCFF] transition-colors" />
                <span>@ikapemakeprimalang</span>
              </Link>
            </div>
          </div>

          {/* Quick Link */}
          <div className="w-full lg:w-auto pl-0 lg:pl-4 flex flex-col gap-2 mt-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 mt-2">Quick Link</h3>
            <ul className="flex flex-col gap-2 items-start lg:items-end">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline hover:text-[#00CCFF] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center text-white/70 text-xs sm:text-sm mt-8 mb-6 px-2">
          Copyright© Eksternal IKAPEMA KEPRI—MALANG 2025, All Right Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;