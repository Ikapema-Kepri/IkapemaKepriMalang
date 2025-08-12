const ProfileCardSkeleton: React.FC = () => (
  <div className="w-[170px] h-[270px] bg-white rounded-2xl shadow-lg overflow-hidden relative animate-pulse">
    {/* Profile Image Container - Fixed Height */}
    <div className="h-[140px] flex items-center justify-center px-4 pt-8 pb-2">
      <div className="relative w-full max-w-[130px] aspect-square flex items-center justify-center">
        <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
          <svg className="w-10 h-12 text-gray-300" fill="none" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="10" fill="#e5e7eb" />
            <path d="M32 34c5.523 0 10-4.477 10-10S37.523 14 32 14s-10 4.477-10 10 4.477 10 10 10zm0 4c-6.627 0-20 3.314-20 10v4h40v-4c0-6.686-13.373-10-20-10z" fill="#cbd5e1" />
          </svg>
        </div>
      </div>
    </div>

    {/* Content Section - Text Only */}
    <div className="px-4 pb-12 pt-4">
      <div className="text-start">
        {/* Name Skeleton */}
        <div className="min-h-[2.5rem] mb-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-1" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>

        {/* Department Skeleton */}
        <div className="min-h-[2rem]">
          <div className="h-3 bg-gray-200 rounded w-2/3 mb-1" />
          <div className="h-3 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    </div>

    {/* Logo Skeleton - Fixed Position at Bottom Right */}
    <div className="absolute bottom-3 right-3">
      <div className="w-[35px] h-[35px] bg-gray-200 rounded-full" />
    </div>
  </div>
);

export default ProfileCardSkeleton;