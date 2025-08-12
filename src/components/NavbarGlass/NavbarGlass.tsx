'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

interface NavLink {
  label: string;
  href?: string;
  isComingSoon?: boolean;
  dropdown?: { label: string; href: string }[];
}

const navLinks: NavLink[] = [
  { label: 'Beranda', href: '/beranda' },
  { label: 'Tentang', href: '/tentang' },
  { label: 'Program', isComingSoon: true },
  {
    label: 'Struktur',
    dropdown: [
      { label: 'Pengurus', href: '/struktur/pengurus' },
      { label: 'Anggota', href: '/struktur/anggota' },
    ],
  },
  { label: 'Kontak', isComingSoon: true },
];

const NavbarGlass: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const handleDropdownClick = (label: string) => {
    if (navLinks.find((link) => link.label === label)?.dropdown) {
      setDropdownOpen(dropdownOpen === label ? null : label);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 md:px-8 lg:px-24 py-1 bg-transparent">
      <nav className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#beranda" aria-label="Logo IKAPEMA KEPRI—MALANG">
          <img
            src="/LogoIkapema.svg"
            alt="Logo IKAPEMA"
            className="h-10 w-10 sm:h-14 sm:w-14 md:h-[50px] md:w-[50px] lg:h-[65px] lg:w-[65px]"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex bg-white/20 backdrop-blur-md shadow-lg rounded-full relative">
          <ul className="flex items-center">
            {navLinks.map((link) => (
              <li
                key={link.label}
                className="relative dropdown-container"
              >
                {link.href ? (
                  // Regular link
                  <Link
                    href={link.href}
                    className="text-white font-medium text-sm sm:text-base md:text-xl px-4 sm:px-6 md:px-8 py-2 md:py-4 rounded-full transition-colors duration-300 hover:bg-white/20"
                  >
                    {link.label}
                  </Link>
                ) : link.isComingSoon ? (
                  // Coming Soon link
                  <div className="relative group">
                    <span className="text-white font-medium text-sm sm:text-base md:text-xl px-4 sm:px-6 md:px-8 py-2 md:py-4 rounded-full transition-colors duration-300 hover:bg-white/20 cursor-not-allowed opacity-70">
                      {link.label}
                    </span>
                    {/* Coming Soon Tooltip */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-yellow-400 text-gray-800 text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      Coming Soon
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rotate-45"></div>
                    </div>
                  </div>
                ) : link.dropdown ? (
                  // Dropdown link
                  <div className="relative">
                    <button
                      onClick={() => handleDropdownClick(link.label)}
                      className="text-white font-medium text-sm sm:text-base md:text-xl px-4 sm:px-6 md:px-8 py-2 md:py-4 rounded-full transition-colors duration-300 hover:bg-white/20 cursor-pointer flex items-center focus:outline-none"
                    >
                      {link.label}
                      <svg
                        className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                          dropdownOpen === link.label ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen === link.label && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white/20 backdrop-blur-md shadow-lg rounded-xl overflow-hidden z-50">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setDropdownOpen(null)}
                            className="block px-4 py-3 text-white font-medium hover:bg-white/20 transition-colors duration-300 first:rounded-t-xl last:rounded-b-xl"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        {/* Hamburger Button for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white rounded-md transition-colors duration-300 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Buka menu utama</span>
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`
          lg:hidden transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
        <div className="mt-3 mx-2 p-3 bg-white/20 backdrop-blur-md shadow-lg rounded-xl">
          <ul className="flex flex-col items-center space-y-2">
            {navLinks.map((link) => (
              <li key={link.label} className="w-full">
                {link.href ? (
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center text-white font-medium text-base sm:text-lg hover:bg-white/20 px-4 py-2 rounded-full transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ) : link.isComingSoon ? (
                  <div className="block w-full text-center text-white/70 font-medium text-base sm:text-lg px-4 py-2 rounded-full cursor-not-allowed">
                    {link.label}
                    <span className="block text-xs text-yellow-300 mt-1">
                      Coming Soon
                    </span>
                  </div>
                ) : link.dropdown ? (
                  // Render dropdown items as separate menu items for mobile
                  <div className="w-full space-y-1">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full text-center text-white font-medium text-base sm:text-lg hover:bg-white/20 px-4 py-2 rounded-full transition-colors duration-300"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default NavbarGlass;