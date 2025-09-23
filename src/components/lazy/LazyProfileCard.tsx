import React, { lazy, Suspense } from 'react';
import ProfileCardSkeleton from '../UI/ProfileCardSkeleton';
import ErrorBoundary from '../UI/ErrorBoundary';

const ProfileCard = lazy(() => import('../UI/ProfileCard'));

interface LazyProfileCardProps {
  [key: string]: unknown;
}

const LazyProfileCard: React.FC<LazyProfileCardProps> = (props) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<ProfileCardSkeleton />}>
        <ProfileCard name={''} department={''} imageUrl={''} {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default LazyProfileCard;