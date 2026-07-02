"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  setPersistence,
  browserLocalPersistence,
  getIdTokenResult,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

// ── Tipe Role ──────────────────────────────────────────────────────────
export type UserRole = 'admin' | 'superAdmin' | null;

// ── Session Duration ───────────────────────────────────────────────────
const SESSION_DURATION_REMEMBER = 7 * 24 * 60 * 60 * 1000; // 7 hari
const SESSION_DURATION_DEFAULT  = 4 * 60 * 60 * 1000;       // 4 jam
const SESSION_CHECK_INTERVAL    = 60 * 1000;                 // cek setiap 60 detik

interface SessionData {
  uid: string;
  email: string | null;
  loginAt: string;
  expiresAt: string;
  rememberMe: boolean;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  role: UserRole;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  sessionExpiresAt: Date | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// ── Cookie Helpers ────────────────────────────────────────────────────
// Cookie menyimpan role string (admin/superAdmin) bukan hanya '1'
// Middleware membaca ini untuk routing decisions (UX only)
function setAuthCookie(role: string, maxAgeSeconds: number) {
  document.cookie = `admin_auth=${role}; path=/; SameSite=Lax; Max-Age=${maxAgeSeconds}`;
}

function clearAuthCookie() {
  document.cookie = 'admin_auth=; path=/; Max-Age=0; SameSite=Lax';
}

// ── Session Storage Helpers ───────────────────────────────────────────
function getStoredSession(): SessionData | null {
  try {
    const raw = localStorage.getItem('auth_session');
    if (!raw) return null;
    return JSON.parse(raw) as SessionData;
  } catch {
    return null;
  }
}

function isSessionExpired(session: SessionData | null): boolean {
  if (!session?.expiresAt) return true;
  return new Date() >= new Date(session.expiresAt);
}

function clearSessionStorage() {
  localStorage.removeItem('auth_session');
  localStorage.removeItem('auth_remember_me');
}

// ── Helper: Baca role dari custom claims ──────────────────────────────
async function getRoleFromToken(user: User, forceRefresh = false): Promise<UserRole> {
  try {
    const tokenResult = await getIdTokenResult(user, forceRefresh);
    return (tokenResult.claims.role as UserRole) ?? null;
  } catch {
    return null;
  }
}

// ── Provider ──────────────────────────────────────────────────────────
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser]                       = useState<User | null>(null);
  const [loading, setLoading]                 = useState(true);
  const [role, setRole]                       = useState<UserRole>(null);
  const [sessionExpiresAt, setSessionExpiresAt] = useState<Date | null>(null);
  const isLoggingInRef                        = useRef(false);

  // ── Force Logout ───────────────────────────────────────────────────
  const forceLogout = useCallback(async () => {
    try { await signOut(auth); } catch { /* ignore */ }
    clearSessionStorage();
    clearAuthCookie();
    setUser(null);
    setRole(null);
    setSessionExpiresAt(null);
    if (
      window.location.pathname.startsWith('/adminaccess') &&
      window.location.pathname !== '/adminaccess/login'
    ) {
      window.location.href = '/adminaccess/login';
    }
  }, []);

  // ── Auth State Listener ────────────────────────────────────────────
  useEffect(() => {
    const initializePersistence = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (error) {
        console.error('Error setting persistence:', error);
      }
    };
    initializePersistence();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Skip validasi saat proses login sedang berlangsung
        if (isLoggingInRef.current) {
          setUser(firebaseUser);
          setLoading(false);
          return;
        }

        const session = getStoredSession();
        if (isSessionExpired(session)) {
          forceLogout();
          setLoading(false);
          return;
        }

        // Baca role dari custom claims (pakai cache dari session jika ada)
        const cachedRole = session?.role ?? null;
        setUser(firebaseUser);
        setRole(cachedRole);
        setSessionExpiresAt(session ? new Date(session.expiresAt) : null);

        // Refresh cookie Max-Age sesuai sisa waktu session
        if (session) {
          const remainingMs  = new Date(session.expiresAt).getTime() - Date.now();
          const remainingSec = Math.max(0, Math.floor(remainingMs / 1000));
          if (remainingSec > 0 && cachedRole) {
            setAuthCookie(cachedRole, remainingSec);
          }
        }
      } else {
        setUser(null);
        setRole(null);
        setSessionExpiresAt(null);
        clearSessionStorage();
        clearAuthCookie();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [forceLogout]);

  // ── Periodic Session Expiry Check ─────────────────────────────────
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      if (isSessionExpired(getStoredSession())) forceLogout();
    }, SESSION_CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, [user, forceLogout]);

  // ── Login ─────────────────────────────────────────────────────────
  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      localStorage.setItem('auth_remember_me', rememberMe.toString());

      // Flag SEBELUM signIn agar onAuthStateChanged tidak force-logout
      isLoggingInRef.current = true;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Baca role dari custom claims (forceRefresh agar dapat claim terbaru)
      const userRole = await getRoleFromToken(userCredential.user, true);

      // Hitung expiry
      const now        = new Date();
      const durationMs = rememberMe ? SESSION_DURATION_REMEMBER : SESSION_DURATION_DEFAULT;
      const expiresAt  = new Date(now.getTime() + durationMs);

      // Simpan session
      const sessionData: SessionData = {
        uid:       userCredential.user.uid,
        email:     userCredential.user.email,
        loginAt:   now.toISOString(),
        expiresAt: expiresAt.toISOString(),
        rememberMe,
        role:      userRole,
      };
      localStorage.setItem('auth_session', JSON.stringify(sessionData));
      setRole(userRole);
      setSessionExpiresAt(expiresAt);

      // Set cookie dengan role sebagai nilai
      const maxAgeSeconds = Math.floor(durationMs / 1000);
      // Jika user belum punya role claim, set 'admin' sebagai default
      setAuthCookie(userRole ?? 'admin', maxAgeSeconds);

      isLoggingInRef.current = false;
    } catch (error) {
      isLoggingInRef.current = false;
      clearSessionStorage();
      throw error;
    }
  };

  // ── Logout ────────────────────────────────────────────────────────
  const logout = async () => {
    try {
      await signOut(auth);
      clearSessionStorage();
      clearAuthCookie();
      setRole(null);
      setSessionExpiresAt(null);
      window.location.href = '/adminaccess/login';
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    role,
    isAdmin:         role === 'admin' || role === 'superAdmin',
    isSuperAdmin:    role === 'superAdmin',
    login,
    logout,
    isAuthenticated: !!user,
    sessionExpiresAt,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};