import React, { lazy, Suspense } from 'react';
import ErrorBoundary from '../UI/ErrorBoundary';

const Footer = lazy(() => import('../Footer/Footer'));

const LazyFooter: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense 
        fallback={
          <div className="bg-[#005266] text-white p-8 animate-pulse">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="w-32 h-6 bg-gray-400 rounded"></div>
                  <div className="w-48 h-4 bg-gray-400 rounded"></div>
                  <div className="w-40 h-4 bg-gray-400 rounded"></div>
                </div>
                <div className="space-y-4">
                  <div className="w-24 h-6 bg-gray-400 rounded"></div>
                  <div className="w-32 h-4 bg-gray-400 rounded"></div>
                  <div className="w-36 h-4 bg-gray-400 rounded"></div>
                </div>
                <div className="space-y-4">
                  <div className="w-28 h-6 bg-gray-400 rounded"></div>
                  <div className="w-44 h-4 bg-gray-400 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <Footer />
      </Suspense>
    </ErrorBoundary>
  );
};

export default LazyFooter;