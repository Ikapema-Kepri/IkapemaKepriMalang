import React, { Suspense as ReactSuspense, ReactNode } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface SuspenseWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({ 
  children, 
  fallback,
  className = '' 
}) => {
  const defaultFallback = (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <LoadingSpinner />
    </div>
  );

  return (
    <ReactSuspense fallback={fallback || defaultFallback}>
      {children}
    </ReactSuspense>
  );
};

export default SuspenseWrapper;