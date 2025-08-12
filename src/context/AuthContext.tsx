"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set initial persistence based on stored preference
    const initializePersistence = async () => {
      const rememberMe = localStorage.getItem('auth_remember_me') === 'true';
      try {
        await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      } catch (error) {
        console.error('Error setting persistence:', error);
      }
    };

    initializePersistence();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      // Update session info in localStorage
      if (user) {
        const sessionData = {
          uid: user.uid,
          email: user.email,
          lastLogin: new Date().toISOString(),
        };
        localStorage.setItem('auth_session', JSON.stringify(sessionData));
      } else {
        localStorage.removeItem('auth_session');
        localStorage.removeItem('auth_remember_me');
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      // Set persistence before login
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      
      // Store remember me preference
      localStorage.setItem('auth_remember_me', rememberMe.toString());
      
      // Sign in user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Store additional session data
      const sessionData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        lastLogin: new Date().toISOString(),
        rememberMe,
      };
      localStorage.setItem('auth_session', JSON.stringify(sessionData));
      
    } catch (error) {
      // Clean up on error
      localStorage.removeItem('auth_session');
      localStorage.removeItem('auth_remember_me');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // Clear all session data
      localStorage.removeItem('auth_session');
      localStorage.removeItem('auth_remember_me');
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};