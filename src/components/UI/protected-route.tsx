"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import LoginForm from './login-form';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  // Selama Firebase auth masih memverifikasi status login,
  // jangan render apapun (null) agar konten admin tidak sempat terlihat (blink).
  // Middleware sudah menangani redirect server-side, ini sebagai guard client-side.
  if (loading) {
    return null;
  }

  if (!user) {
    return <LoginForm />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;