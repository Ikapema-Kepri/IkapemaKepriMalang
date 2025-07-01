'use client';

import Link from 'next/link';
import React from 'react';
import { useState } from 'react';

// Definisikan tipe untuk setiap item navigasi
interface NavLink {
  label: string;
  href: string;
}

// Array untuk menyimpan data link navigasi
const navLinks: NavLink[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang', href: '/tentang' },
  { label: 'Program', href: '/program' },
  { label: 'Struktur', href: '/struktur' },
  { label: 'Kontak', href: '/kontak' },
];

const NavbarGlass: React.FC = () => {
  // State untuk mengontrol visibilitas menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-8 md:px-24 py-4">
      <nav className="container mx-auto flex items-center justify-between">
        {/* Bagian Logo */}
        <a href="#beranda" aria-label="Logo IKAPEMA KEPRI—MALANG">
          <img 
            src="/LogoIkapema.svg"
            alt="Logo IKAPEMA" 
            className="h-[70px] w-[70px] md:h-[90px] md:w-[90px]"
          />
        </a>

        {/* Bagian Link Navigasi - Tampilan Desktop */}
        <div className="hidden md:flex bg-white/20 backdrop-blur-md shadow-lg rounded-full">
          <ul className="flex items-center space-x-2 px-0 py-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-white font-medium text-base px-8 py-4 rounded-full transition-colors duration-300 hover:bg-white/20"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Tombol Hamburger - Tampilan Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            /* PERUBAHAN DI SINI: Menambahkan efek transisi dan hover */
            className="p-2 text-white rounded-md transition-colors duration-300 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Buka menu utama</span>
            {isMenuOpen ? (
              // Ikon 'X' (Tutup)
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Ikon Hamburger
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Menu Mobile yang Muncul/Hilang */}
      <div 
        id="mobile-menu"
        className={`
          md:hidden transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
        <div className="mt-4 mx-4 p-4 bg-white/20 backdrop-blur-md shadow-lg rounded-xl">
          <ul className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)} // Tutup menu saat link diklik
                  className="text-white font-medium text-lg hover:bg-white/20 px-4 py-2 rounded-full transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default NavbarGlass;