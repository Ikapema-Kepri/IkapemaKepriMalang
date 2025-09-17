import React, { useState } from 'react';
import Image from 'next/image';

interface ProfileCardProps {
  name: string;
  department: string;
  imageUrl: string;
  logoUrl?: string;
  className?: string;
  angkatan?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  department,
  imageUrl,
  logoUrl,
  className = '',
  angkatan,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Function untuk format department dengan angkatan
  const formatDepartmentWithAngkatan = (dept: string, angkatan?: string) => {
    if (!angkatan) return dept;
    
    // Ambil 2 digit terakhir dari angkatan
    const lastTwoDigits = angkatan.slice(-2);
    return `${dept} ${lastTwoDigits}'`;
  };

  // Function untuk mendapatkan nama universitas berdasarkan logoUrl
  const getUniversityName = (logoUrl?: string) => {
    if (!logoUrl) return '';
    
    const logoMapping: { [key: string]: string } = {
      'UMM': 'Universitas Muhammadiyah Malang',
      'UB': 'Universitas Brawijaya',
      'UM': 'Universitas Negeri Malang',
      'Polinema': 'Politeknik Negeri Malang',
      'UIN': 'Universitas Islam Negeri Maulana Malik Ibrahim Malang',
      'Binus': 'Binus University',
      'UNISMA': 'Universitas Islam Malang',
      'UNMER': 'Universitas Merdeka Malang'
    };

    const sortedKeys = Object.keys(logoMapping).sort((a, b) => b.length - a.length);
    
    for (const key of sortedKeys) {
      if (logoUrl.toLowerCase().includes(key.toLowerCase())) {
        return logoMapping[key];
      }
    }
    
    return '';
  };

  const universityName = getUniversityName(logoUrl);

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
  };

  // Placeholder component
  const ImagePlaceholder = () => (
    <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
      <svg
        className="w-8 h-9 sm:w-9 sm:h-10 md:w-10 md:h-12 text-gray-300"
        fill="none"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="64" height="64" rx="10" fill="#e5e7eb" />
        <path
          d="M32 34c5.523 0 10-4.477 10-10S37.523 14 32 14s-10 4.477-10 10 4.477 10 10 10zm0 4c-6.627 0-20 3.314-20 10v4h40v-4c0-6.686-13.373-10-20-10z"
          fill="#cbd5e1"
        />
      </svg>
    </div>
  );

  return (
    <>
      {/* CSS untuk handling aspect ratio 16:10 */}
      <style jsx>{`
        @media screen and (min-aspect-ratio: 1.6) and (max-aspect-ratio: 1.8) {
          .profile-card-16-10 {
            --scale-factor: 0.85;
            transform: scale(var(--scale-factor));
            margin: calc(var(--scale-factor) * -0.04 * 100%) calc(var(--scale-factor) * -0.04 * 100%);
          }
        }
      `}</style>

      <div 
        className={`
          profile-card-16-10
          w-[87px] h-[160px] 
          sm:w-[165px] sm:h-[255px]
          lg:w-[155px] lg:h-[255px]
          xl:w-[28.007vh] xl:h-[44.481vh]
          bg-white 
          rounded-xl sm:rounded-2xl
          shadow-lg 
          relative
          mb-1 lg:mb-0 xl:mb-2
          transition-transform duration-200 ease-in-out

          ${className}
        `}
      >
        {/* Profile Image Container - Responsive Height */}
        <div className="h-[75px] sm:h-[130px] lg:h-[130px] xl:h-[23.064vh] flex items-center justify-center px-2 sm:px-[2.636vh] pt-5 sm:pt-7 md:pt-[5.272vh] pb-[1.318vh] overflow-hidden">
          <div className="relative w-full max-w-[70px] sm:max-w-[120px] lg:max-w-[120px] xl:max-w-[21.417vh] aspect-square flex items-center justify-center">
            {imageUrl && !imageError ? (
              <Image
                src={imageUrl}
                alt={`${name} profile picture`}
                fill
                className="object-cover rounded-lg"
                priority
                onError={handleImageError}
              />
            ) : (
              <ImagePlaceholder />
            )}
          </div>
        </div>

        {/* Content Section - Text Only */}
        <div className="px-3 sm:px-[2.636vh] pb-8 sm:pb-10 md:pb-[7.908vh] pt-1.5 sm:pt-3.5 md:pt-[2.636vh] overflow-hidden">
          <div className="text-start flex flex-col">
            {/* Name */}
            <h2 className="text-[9px] sm:text-[2.306vh] font-bold text-gray-900 leading-none lg:leading-tight line-clamp-2">
              {name}
            </h2>

            {/* Department with Angkatan - positioned relative to name */}
            <p className="text-[7px] sm:text-[1.977vh] font-semibold text-gray-700 leading-none lg:leading-tight line-clamp-3 mt-1 sm:mt-[0.988vh]">
              {formatDepartmentWithAngkatan(department, angkatan)}
            </p>
          </div>
        </div>

        {/* Logo - Fixed Position at Bottom Right */}
        <div className="absolute bottom-2 sm:bottom-2.5 md:bottom-3 right-2 sm:right-2.5 md:right-3">
          <div 
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt="Logo"
                width={25}
                height={25}
                className="object-contain sm:w-[30px] sm:h-[30px] md:w-[32px] md:h-[32px] xl:w-[5.766vh] xl:h-[5.766vh] cursor-pointer"
              />
            ) : (
              <div className="w-[25px] h-[25px] sm:w-[28px] sm:h-[28px] md:w-[4.942vh] md:h-[4.942vh] bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 bg-yellow-400 rounded-full"></div>
              </div>
            )}
            
            {/* Tooltip - Positioned below logo and centered */}
            {showTooltip && universityName && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-[#CCF5FF] text-[#005266] text-[8px] sm:text-[10px] rounded whitespace-nowrap z-50 shadow-lg border border-[#005266]/20">
                {universityName}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-[#CCF5FF]"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;