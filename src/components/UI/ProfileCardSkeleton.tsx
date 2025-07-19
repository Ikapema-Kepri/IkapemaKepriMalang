const ProfileCardSkeleton: React.FC = () => (
  <div className="w-[220px] h-[350px] bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col animate-pulse">
    <div className="flex-1 flex items-center justify-center px-4 pt-0 pb-0">
      <div className="relative w-full max-w-[180px] aspect-square flex items-center justify-center">
        <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
          <svg className="w-20 h-20 text-gray-300" fill="none" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="20" fill="#e5e7eb" />
            <path d="M32 34c5.523 0 10-4.477 10-10S37.523 14 32 14s-10 4.477-10 10 4.477 10 10 10zm0 4c-6.627 0-20 3.314-20 10v4h40v-4c0-6.686-13.373-10-20-10z" fill="#cbd5e1" />
          </svg>
        </div>
      </div>
    </div>
    <div className="bg-white px-4 pb-4 flex flex-col space-y-2">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="mt-0 flex items-end justify-end">
        <div className="w-[50px] h-[50px] bg-gray-200 rounded-full" />
      </div>
    </div>
  </div>
);

export default ProfileCardSkeleton;