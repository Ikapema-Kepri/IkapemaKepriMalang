"use client";

export default function BackButton() {
  return (
    <button 
      onClick={() => window.history.back()}
      className="group px-8 py-4 bg-white border-2 border-[#00A3CC] text-[#00A3CC] font-semibold rounded-xl hover:bg-[#00A3CC] hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
    >
      <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
      </svg>
      Halaman Sebelumnya
    </button>
  );
}