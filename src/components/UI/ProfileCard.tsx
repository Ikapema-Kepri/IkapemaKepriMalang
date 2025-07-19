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
        w-[220px] h-[350px] 
        bg-white 
        rounded-2xl 
        shadow-lg 
        overflow-hidden
        flex flex-col
        ${className}
      `}
    >
      {/* Profile Image Container */}
      <div className="flex-1 flex items-center justify-center px-4 pt-0 pb-0">
        <div className="relative w-full max-w-[200px] aspect-square flex items-center justify-center">
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
                className="w-35 h-35 text-gray-300"
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

      {/* Content Section */}
      <div className="bg-white px-4 pb-4 flex flex-col space-y-2">
        {/* Name */}
        <h2 className="text-lg font-bold text-gray-900 leading-none">
          {name}
        </h2>

        {/* Department */}
        <p className="text-base font-semibold text-gray-700">
          {department}
        </p>

        {/* Logo Placeholder */}
        <div className="mt-0 flex items-end justify-end">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt="Organization logo"
              width={50}
              height={50}
              className="object-contain"
            />
          ) : (
            <div className="w-[50px] h-[50px] bg-blue-600 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;