import React, { lazy, Suspense } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorBoundary from '../UI/ErrorBoundary';

const HeroSection = lazy(() => import('../BerandaSection/HeroSection/HeroSection'));

const LazyHeroSection: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense 
        fallback={
          <div className="flex items-center justify-center h-[60vh] bg-gradient-to-br from-[#E5FAFF] to-[#CCF5FF]">
            <LoadingSpinner size="large" />
          </div>
        }
      >
        <HeroSection />
      </Suspense>
    </ErrorBoundary>
  );
};

export default LazyHeroSection;