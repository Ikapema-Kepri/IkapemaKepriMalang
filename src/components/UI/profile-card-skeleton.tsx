const ProfileCardSkeleton: React.FC = () => (
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

    <div className="profile-card-16-10 w-[87px] h-[160px] sm:w-[165px] sm:h-[255px] lg:w-[155px] lg:h-[255px] xl:w-[28.007vh] xl:h-[44.481vh] bg-white rounded-sm sm:rounded-2xl shadow-lg relative mb-1 lg:mb-0 xl:mb-2 transition-transform duration-200 ease-in-out animate-pulse">
      {/* Profile Image Container - Responsive Height */}
      <div className="h-[75px] sm:h-[130px] lg:h-[130px] xl:h-[23.064vh] flex items-center justify-center px-2 sm:px-[2.636vh] pt-5 sm:pt-7 md:pt-[5.272vh] pb-[1.318vh] overflow-hidden">
        <div className="relative w-full max-w-[70px] sm:max-w-[120px] lg:max-w-[120px] xl:max-w-[21.417vh] aspect-square flex items-center justify-center">
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
      <div className="px-3 sm:px-[2.636vh] pb-8 sm:pb-10 md:pb-[7.908vh] pt-1.5 sm:pt-3.5 md:pt-[2.636vh] overflow-hidden">
        <div className="text-start flex flex-col">
          {/* Name Skeleton */}
          <div className="mb-1 sm:mb-[0.988vh]">
            <div className="h-[9px] sm:h-[2.306vh] bg-gray-200 rounded w-3/4 mb-1" />
            <div className="h-[9px] sm:h-[2.306vh] bg-gray-200 rounded w-1/2" />
          </div>

          {/* Department Skeleton */}
          <div>
            <div className="h-[7px] sm:h-[1.977vh] bg-gray-200 rounded w-2/3 mb-1" />
            <div className="h-[7px] sm:h-[1.977vh] bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      </div>

      {/* Logo Skeleton - Fixed Position at Bottom Right */}
      <div className="absolute bottom-2 sm:bottom-2.5 md:bottom-3 right-2 sm:right-2.5 md:right-3">
        <div className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] md:w-[32px] md:h-[32px] xl:w-[5.766vh] xl:h-[5.766vh] bg-gray-200 rounded-full" />
      </div>
    </div>
  </>
);

export default ProfileCardSkeleton;
