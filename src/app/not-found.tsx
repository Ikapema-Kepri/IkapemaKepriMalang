"use client";

import Link from 'next/link';
import Image from 'next/image';
import BackButton from './components/BackButton';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E5FAFF] via-[#F0FDFF] to-[#E5FAFF] flex items-center justify-center px-4 pt-18 pb-16">
      <div className="max-w-2xl w-full text-center">
        {/* Logo Ikapema */}
        <div className="mb-2 flex justify-center">
          <div className="relative">
            <Image
              src="/LogoIkapema.svg"
              alt="Logo Ikapema"
              width={120}
              height={120}
              className="opacity-80"
              priority
            />
            <div className="absolute -inset-2 bg-white/20 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* 404 Text dengan Animasi */}
        <div className="relative mb-6">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#005266] via-[#007A99] to-[#00A3CC] animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-[#005266]/10 transform translate-x-2 translate-y-2 -z-10">
            404
          </div>
        </div>

        {/* Pesan Error */}
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#005266] mb-3">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-lg text-[#007A99] mb-2">
            Maaf, halaman yang Anda cari tidak dapat ditemukan.
          </p>
          <p className="text-base text-gray-600">
            Mungkin halaman telah dipindahkan atau URL yang dimasukkan salah.
          </p>
        </div>

        {/* Ilustrasi Dekoratif */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-[#00A3CC]/20 to-[#005266]/20 rounded-full flex items-center justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00A3CC]/30 to-[#005266]/30 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-[#007A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#00A3CC] rounded-full animate-bounce"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#007A99] rounded-full animate-bounce delay-300"></div>
            <div className="absolute top-4 -left-4 w-2 h-2 bg-[#005266] rounded-full animate-bounce delay-700"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/beranda" 
            className="group px-8 py-4 bg-gradient-to-r from-[#00A3CC] to-[#007A99] text-white font-semibold rounded-xl hover:from-[#007A99] hover:to-[#005266] transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Kembali ke Beranda
          </Link>
          
          <BackButton />
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#00A3CC]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-60 right-20 w-40 h-40 bg-[#007A99]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-1/4 w-28 h-28 bg-[#005266]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-[#00A3CC]/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}