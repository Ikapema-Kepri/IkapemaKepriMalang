'use client';

import React from 'react';

interface QuoteIconProps {
  className?: string;
}

const QuoteIcon: React.FC<QuoteIconProps> = ({ className }) => (
  <svg
    className={`w-16 h-16 md:w-24 md:h-24 text-[#00A3CC] ${className}`}
    fill="currentColor"
    viewBox="0 0 448 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M448 296c0 66.3-53.7 120-120 120h-8c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H320c-35.3 0-64-28.7-64-64V128c0-35.3 28.7-64 64-64h96c35.3 0 64 28.7 64 64v168zm-256 0c0 66.3-53.7 120-120 120H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H64c-35.3 0-64-28.7-64-64V128c0-35.3 28.7-64 64-64h96c35.3 0 64 28.7 64 64v168z" />
  </svg>
);

export default QuoteIcon;