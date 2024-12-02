import React from 'react';

interface SkeletonProps {
  type: 'title' | 'text' | 'image' | 'avatar';
  count?: number;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ type, count = 1, className = '' }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'title':
        return <div className={`h-6 bg-gray-200 rounded w-3/4 ${className}`} />;
      case 'text':
        return <div className={`h-4 bg-gray-200 rounded ${className}`} />;
      case 'image':
        return <div className={`bg-gray-200 rounded ${className}`} />;
      case 'avatar':
        return <div className={`w-12 h-12 bg-gray-200 rounded-full ${className}`} />;
      default:
        return null;
    }
  };

  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="animate-pulse mb-2">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default Skeleton;