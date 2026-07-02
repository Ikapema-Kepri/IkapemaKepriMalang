'use client';

import { useState, useEffect } from 'react';
import { getIdTokenResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export type UserRole = 'admin' | 'superAdmin' | null;

interface UseUserRoleReturn {
  role: UserRole;
  loading: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  /** Paksa refresh token dari Firebase (pakai setelah role di-assign) */
  refreshRole: () => Promise<void>;
}

/**
 * Hook untuk membaca role user dari Firebase custom claims.
 *
 * @example
 * const { role, isAdmin, isSuperAdmin, loading } = useUserRole();
 *
 * if (loading) return <Spinner />;
 * if (!isSuperAdmin) return <p>Akses ditolak</p>;
 */
export function useUserRole(): UseUserRoleReturn {
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  const fetchRole = async (forceRefresh = false) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setRole(null);
        setLoading(false);
        return;
      }

      const tokenResult = await getIdTokenResult(currentUser, forceRefresh);
      const claimedRole = tokenResult.claims.role as UserRole ?? null;
      setRole(claimedRole);
    } catch (error) {
      console.error('[useUserRole] Gagal membaca role:', error);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchRole();
      } else {
        setRole(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const refreshRole = async () => {
    setLoading(true);
    await fetchRole(true);
  };

  return {
    role,
    loading,
    isAdmin: role === 'admin' || role === 'superAdmin',
    isSuperAdmin: role === 'superAdmin',
    refreshRole,
  };
}
