import React, { lazy, Suspense } from 'react';
import ErrorBoundary from '../UI/ErrorBoundary';

const Navbar = lazy(() => import('../Navbar/Navbar'));

const LazyNavbar: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense 
        fallback={
          <div className="h-16 bg-white shadow-md animate-pulse">
            <div className="flex items-center justify-between h-full px-4 max-w-6xl mx-auto">
              <div className="w-32 h-8 bg-gray-300 rounded"></div>
              <div className="flex space-x-4">
                <div className="w-20 h-8 bg-gray-300 rounded"></div>
                <div className="w-20 h-8 bg-gray-300 rounded"></div>
                <div className="w-20 h-8 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        }
      >
        <Navbar />
      </Suspense>
    </ErrorBoundary>
  );
};

export default LazyNavbar;