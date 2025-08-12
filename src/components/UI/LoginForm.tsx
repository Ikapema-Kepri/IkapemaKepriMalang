"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password, rememberMe);
      router.push('/admin');
    } catch (error: unknown) {
      console.error('Login error:', error);
      
      if (error instanceof Error) {
        // Handle specific Firebase auth errors
        if (error.message.includes('api-key-not-valid')) {
          setError('Konfigurasi Firebase tidak valid. Silakan hubungi administrator.');
        } else if (error.message.includes('user-not-found')) {
          setError('Email tidak terdaftar.');
        } else if (error.message.includes('wrong-password')) {
          setError('Password salah.');
        } else if (error.message.includes('invalid-email')) {
          setError('Format email tidak valid.');
        } else if (error.message.includes('too-many-requests')) {
          setError('Terlalu banyak percobaan login. Coba lagi nanti.');
        } else {
          setError(error.message);
        }
      } else {
        setError('Terjadi kesalahan. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center py-24 justify-center bg-gradient-to-br from-[#E5FAFF] to-[#B8E6FF]">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#005266] mb-2">Admin Login</h1>
            <p className="text-gray-600">Masuk ke panel admin IKAPEMA</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3CC] focus:border-transparent transition"
                placeholder="admin@ikapema.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3CC] focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-[#00A3CC] focus:ring-[#00A3CC] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Ingat saya
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#005266] to-[#00A3CC] text-white font-semibold py-3 rounded-lg shadow-lg hover:from-[#00394d] hover:to-[#008fb3] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Memuat...
                </div>
              ) : (
                'Masuk'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Hanya admin yang dapat mengakses halaman ini
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;