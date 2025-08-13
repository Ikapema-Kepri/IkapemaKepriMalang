import React from 'react';
import Image from 'next/image';

interface ProfileCardProps {
  name: string;
  department: string;
  imageUrl: string;
  logoUrl?: string;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  department,
  imageUrl,
  logoUrl,
  className = '',
}) => {
  return (
    <div 
      className={`
        w-[90px] h-[160px] 
        sm:w-[165px] sm:h-[255px]
        lg:w-[155px] lg:h-[255px]
        xl:w-[170px] xl:h-[270px]
        bg-white 
        rounded-xl sm:rounded-2xl
        shadow-lg 
        overflow-hidden
        relative
        mb-1 lg:mb-0 xl:mb-2

        ${className}
      `}
    >
      {/* Profile Image Container - Responsive Height */}
      <div className="h-[75px] sm:h-[130px] lg:h-[130px] xl:h-[140px] flex items-center justify-center px-3 sm:px-4 pt-6 sm:pt-7 md:pt-8 pb-2">
        <div className="relative w-full max-w-[70px] sm:max-w-[120px] lg:max-w-[120px] xl:max-w-[130px] aspect-square flex items-center justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${name} profile picture`}
              fill
              className="object-cover rounded-lg"
              priority
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-lg">
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
          )}
        </div>
      </div>

      {/* Content Section - Text Only */}
      <div className="px-3 sm:px-4 pb-8 sm:pb-10 md:pb-12 pt-3 sm:pt-3.5 md:pt-4">
        <div className="text-start">
          {/* Name */}
          <h2 className="text-[9px] sm:text-sm font-bold text-gray-900 leading-none lg:leading-tight mb-0 lg:mb-1 line-clamp-2 min-h-[1.5rem] sm:min-h-[2rem] md:min-h-[2rem] lg:min-h-[2.5rem]">
            {name}
          </h2>

          {/* Department */}
          <p className="text-[7px] sm:text-xs font-semibold text-gray-700 leading-none lg:leading-tight line-clamp-2 min-h-[1.5rem] sm:min-h-[1.75rem] md:min-h-[2rem]">
            {department}
          </p>
        </div>
      </div>

      {/* Logo - Fixed Position at Bottom Right */}
      <div className="absolute bottom-2 sm:bottom-2.5 md:bottom-3 right-2 sm:right-2.5 md:right-3">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt="Logo"
            width={25}
            height={25}
            className="object-contain sm:w-[30px] sm:h-[30px] md:w-[32px] md:h-[32px] xl:w-[35px] xl:h-[35px]"
          />
        ) : (
          <div className="w-[25px] h-[25px] sm:w-[28px] sm:h-[28px] md:w-[30px] md:h-[30px] bg-blue-600 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 bg-yellow-400 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;