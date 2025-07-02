'use client';

import Link from 'next/link';
import React, { useState } from 'react';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang', href: '/tentang' },
  { label: 'Program', href: '/program' },
  { label: 'Struktur', href: '/struktur' },
  { label: 'Kontak', href: '/kontak' },
];

const NavbarGlass: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-2 sm:px-4 md:px-8 lg:px-24 py-2 sm:py-3 md:py-4 bg-transparent">
      <nav className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#beranda" aria-label="Logo IKAPEMA KEPRI—MALANG">
          <img
            src="/LogoIkapema.svg"
            alt="Logo IKAPEMA"
            className="h-10 w-10 sm:h-14 sm:w-14 md:h-[70px] md:w-[70px] lg:h-[90px] lg:w-[90px]"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex bg-white/20 backdrop-blur-md shadow-lg rounded-full">
          <ul className="flex items-center space-x-1 sm:space-x-2 md:space-x-4 px-2 sm:px-4 md:px-0 py-2 md:py-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-white font-medium text-sm sm:text-base px-4 sm:px-6 md:px-8 py-2 md:py-4 rounded-full transition-colors duration-300 hover:bg-white/20"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hamburger Button for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white rounded-md transition-colors duration-300 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Buka menu utama</span>
            {isMenuOpen ? (
              // Close Icon
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`
          md:hidden transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
        <div className="mt-3 mx-2 p-3 bg-white/20 backdrop-blur-md shadow-lg rounded-xl">
          <ul className="flex flex-col items-center space-y-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white font-medium text-base sm:text-lg hover:bg-white/20 px-4 py-2 rounded-full transition-colors duration-300"
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