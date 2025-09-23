import React from 'react';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E5FAFF]">
      <LoadingSpinner />
    </div>
  );
};

export default Loading;