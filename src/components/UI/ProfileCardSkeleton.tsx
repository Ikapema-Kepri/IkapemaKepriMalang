const ProfileCardSkeleton: React.FC = () => (
  <div className="w-[90px] h-[160px] sm:w-[165px] sm:h-[250px] lg:w-[160px] lg:h-[255px] xl:w-[170px] xl:h-[270px] bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden relative animate-pulse">
    {/* Profile Image Container - Responsive Height */}
    <div className="h-[75px] sm:h-[125px] lg:h-[130px] xl:h-[140px] flex items-center justify-center px-3 sm:px-4 pt-6 sm:pt-7 md:pt-8 pb-2 mb-4">
      <div className="relative w-full max-w-[70px] sm:max-w-[115px] lg:max-w-[120px] xl:max-w-[130px] md:max-w-[130px] aspect-square flex items-center justify-center">
        <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
          <svg
            className="w-8 h-9 sm:w-9 sm:h-10 md:w-10 md:h-12 text-gray-300"
            fill="none"
            viewBox="0 0 64 64"
          >
            <rect width="64" height="64" rx="10" fill="#e5e7eb" />
            <path
              d="M32 34c5.523 0 10-4.477 10-10S37.523 14 32 14s-10 4.477-10 10 4.477 10 10 10zm0 4c-6.627 0-20 3.314-20 10v4h40v-4c0-6.686-13.373-10-20-10z"
              fill="#cbd5e1"
            />
          </svg>
        </div>
      </div>
    </div>

    {/* Content Section - Text Only */}
    <div className="px-3 sm:px-4 pb-8 sm:pb-10 md:pb-12 pt-3 sm:pt-3.5 md:pt-4">
      <div className="text-start">
        {/* Name Skeleton */}
        <div className="min-h-[1.5rem] sm:min-h-[2.25rem] md:min-h-[2.5rem] mb-0 lg:mb-1">
          <div className="h-3 sm:h-3.5 md:h-4 bg-gray-200 rounded w-3/4 mb-1" />
          <div className="h-3 sm:h-3.5 md:h-4 bg-gray-200 rounded w-1/2" />
        </div>

        {/* Department Skeleton */}
        <div className="min-h-[1.5rem] sm:min-h-[1.75rem] md:min-h-[2rem]">
          <div className="h-2.5 sm:h-3 md:h-3 bg-gray-200 rounded w-2/3 mb-1" />
          <div className="h-2.5 sm:h-3 md:h-3 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    </div>

    {/* Logo Skeleton - Fixed Position at Bottom Right */}
    <div className="absolute bottom-2 sm:bottom-2.5 md:bottom-3 right-2 sm:right-2.5 md:right-3">
      <div className="w-[25px] h-[25px] sm:w-[28px] sm:h-[28px] md:w-[35px] md:h-[35px] bg-gray-200 rounded-full" />
    </div>
  </div>
);

export default ProfileCardSkeleton;
