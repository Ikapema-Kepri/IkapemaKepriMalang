"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

const SESSION_DURATION_REMEMBER = 7 * 24 * 60 * 60 * 1000; 
const SESSION_DURATION_DEFAULT  = 4 * 60 * 60 * 1000;       
const SESSION_CHECK_INTERVAL    = 60 * 1000;                  

interface SessionData {
  uid: string;
  email: string | null;
  loginAt: string;       
  expiresAt: string;    
  rememberMe: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
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

function setAuthCookie(maxAgeSeconds: number) {
  document.cookie = `admin_auth=1; path=/; SameSite=Lax; Max-Age=${maxAgeSeconds}`;
}

function clearAuthCookie() {
  document.cookie = 'admin_auth=; path=/; Max-Age=0; SameSite=Lax';
}

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpiresAt, setSessionExpiresAt] = useState<Date | null>(null);
  const isLoggingInRef = useRef(false);

  const forceLogout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch {
     
    }
    clearSessionStorage();
    clearAuthCookie();
    setUser(null);
    setSessionExpiresAt(null);
    
    if (window.location.pathname.startsWith('/adminaccess') && 
        window.location.pathname !== '/adminaccess/login') {
      window.location.href = '/adminaccess/login';
    }
  }, []);

  useEffect(() => {
    
    const initializePersistence = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (error) {
        console.error('Error setting persistence:', error);
      }
    };

    initializePersistence();

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Skip session validation saat login sedang berlangsung —
        // session data belum ditulis ke localStorage pada saat ini
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

        setUser(firebaseUser);
        setSessionExpiresAt(session ? new Date(session.expiresAt) : null);

        // Refresh cookie Max-Age agar tetap sinkron dengan sisa waktu session
        if (session) {
          const remainingMs = new Date(session.expiresAt).getTime() - Date.now();
          const remainingSec = Math.max(0, Math.floor(remainingMs / 1000));
          if (remainingSec > 0) {
            setAuthCookie(remainingSec);
          }
        }
      } else {
        setUser(null);
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
      const session = getStoredSession();
      if (isSessionExpired(session)) {
        forceLogout();
      }
    }, SESSION_CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, [user, forceLogout]);

  // ── Login ─────────────────────────────────────────────────────────
  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      
      localStorage.setItem('auth_remember_me', rememberMe.toString());
      
      // Set flag SEBELUM signIn agar onAuthStateChanged tidak force-logout
      isLoggingInRef.current = true;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Hitung waktu expiry
      const now = new Date();
      const durationMs = rememberMe ? SESSION_DURATION_REMEMBER : SESSION_DURATION_DEFAULT;
      const expiresAt = new Date(now.getTime() + durationMs);
      
      // Simpan session data dengan expiry
      const sessionData: SessionData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        loginAt: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
        rememberMe,
      };
      localStorage.setItem('auth_session', JSON.stringify(sessionData));
      setSessionExpiresAt(expiresAt);

      // Set cookie dengan Max-Age yang sama
      const maxAgeSeconds = Math.floor(durationMs / 1000);
      setAuthCookie(maxAgeSeconds);
      
      // Clear flag setelah semua session data tersimpan
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
      setSessionExpiresAt(null);
      window.location.href = '/adminaccess/login';
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    sessionExpiresAt,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};