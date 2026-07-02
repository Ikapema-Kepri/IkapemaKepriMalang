'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function UnauthorizedPage() {
  const router = useRouter();
  const { role } = useAuth();

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">Akses Ditolak</h1>
          <p className="text-gray-600 mb-2">
            Halaman ini hanya dapat diakses oleh <strong>Super Admin</strong>.
          </p>
          {role && (
            <p className="text-sm text-gray-400 mb-6">
              Role Anda saat ini: <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{role}</span>
            </p>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push('/adminaccess/dashboard')}
              className="w-full bg-gradient-to-r from-[#005266] to-[#00A3CC] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
