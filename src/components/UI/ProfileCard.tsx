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
        w-[170px] h-[270px] 
        bg-white 
        rounded-2xl 
        shadow-lg 
        overflow-hidden
        relative
        ${className}
      `}
    >
      {/* Profile Image Container - Fixed Height */}
      <div className="h-[140px] flex items-center justify-center px-4 pt-8 pb-2">
        <div className="relative w-full max-w-[130px] aspect-square flex items-center justify-center">
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
                className="w-10 h-12 text-gray-300"
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
      <div className="px-4 pb-12 pt-4">
        <div className="text-start">
          {/* Name */}
          <h2 className="text-sm font-bold text-gray-900 leading-tight mb-1 line-clamp-2 min-h-[2.5rem]">
            {name}
          </h2>

          {/* Department */}
          <p className="text-xs font-semibold text-gray-700 leading-tight line-clamp-2 min-h-[2rem]">
            {department}
          </p>
        </div>
      </div>

      {/* Logo - Fixed Position at Bottom Right */}
      <div className="absolute bottom-3 right-3">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt="Logo"
            width={35}
            height={35}
            className="object-contain"
          />
        ) : (
          <div className="w-[30px] h-[30px] bg-blue-600 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;