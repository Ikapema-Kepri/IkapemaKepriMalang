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

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+62 898-8821-793",
  },
  {
    icon: Mail,
    label: "Email",
    value: "@ikapemakeprimalang",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Perumahan Permata Kencana Blok C no 22, Jl. Saxophone, Tunggulwulung, Kec. Lowokwaru, Kota Malang, Jawa Timur 65143",
  },
];

const socialMediaLinks = [
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/ikapemakeprimalang/",
    label: "Instagram",
    username: "@ikapemakeprimalang",
  },
  {
    icon: FaYoutube,
    href: "https://www.youtube.com/@ikapemakeprimalang7099",
    label: "Youtube",
    username: "ikapemakeprimalang",
  },
  {
    icon: FaTiktok,
    href: "https://www.tiktok.com/@ikapemakeprimalang",
    label: "TikTok",
    username: "@ikapemakeprimalang",
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-[#005266] text-white" style={{ minHeight: 400 }}>
      <div className="max-w-[1440px] mx-auto h-full flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row h-full items-start justify-between gap-6 px-4 sm:px-6 md:px-12 lg:px-12 py-8 md:py-12">
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
            <span className="text-sm sm:text-base font-semibold mt-2 text-center">
              IKATAN PELAJAR & MAHASISWA <br />KEPRI-MALANG
            </span>
          </div>

          {/* Kontak */}
          <div className="w-full lg:w-auto border-l-0 lg:border-l-4 border-white pl-0 lg:pl-4 flex flex-col gap-2 mb-8 lg:mb-0 text-center lg:text-left">
            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-4 mt-[-30px] sm:mt-2 text-center lg:text-left">Informasi Kontak</h3>
            <div className="flex flex-col text-base sm:text-lg md:text-xl gap-2 sm:gap-4 items-center lg:items-start">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <div key={index} className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                    {/* Label dengan Icon */}
                    <div className="flex gap-2 font-semibold items-center justify-center lg:justify-start mb-1">
                      <IconComponent className="w-5 h-5" />
                      <p className="text-base sm:text-base md:text-lg">{contact.label}</p>
                    </div>
                    {/* Value */}
                    <div className={`text-white/80 text-xs sm:text-sm ${
                      contact.label === 'Address' 
                        ? 'w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-[350px] sm:text-base lg:text-lg text-center lg:text-left' 
                        : 'text-center lg:text-left'
                    }`}>
                      {contact.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Media Sosial */}
          <div className="w-full lg:w-auto border-l-0 lg:border-l-4 border-white pl-0 lg:pl-4 flex flex-col gap-2 mb-0 sm:mb-8 lg:mb-0 text-center lg:text-left">
            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-0 sm:mb-2 mt-[-50px] sm:mt-2">Media Sosial</h3>
            <div className="flex flex-col text-sm sm:text-base gap-2 sm:gap-4 mt-2 items-center lg:items-start">
              {socialMediaLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <Link 
                    key={index}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={social.label} 
                    className="flex flex-row items-center gap-2 hover:text-[#00CCFF] transition-colors"
                  >
                    <IconComponent className="w-6 h-6" />
                    <span>{social.username}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Link */}
          <div className="w-full lg:w-auto pl-0 lg:pl-4 flex flex-col gap-2 text-center lg:text-left">
            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 mt-2">Quick Link</h3>
            <ul className="flex flex-col gap-0 sm:gap-2 items-center lg:items-end">
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
        <div className="text-center text-white/70 text-xs sm:text-sm mt-0 mb-4 px-2">
          Copyright© Eksternal IKAPEMA KEPRI—MALANG 2025, All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;