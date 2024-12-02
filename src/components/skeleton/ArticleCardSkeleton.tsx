import React from 'react';

const ArticleCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white border p-4 animate-pulse">
      <div className="relative w-full h-60 bg-gray-300 mb-4"></div>
      <div className="h-6 bg-gray-300 w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 w-full mb-2"></div>
      <div className="h-4 bg-gray-300 w-full mb-2"></div>
      <div className="h-4 bg-gray-300 w-3/4 mb-4"></div>
      <div className="h-3 bg-gray-300 w-1/2 mb-4"></div>
      <div className="flex justify-end space-x-2">
        <div className="h-8 w-8 bg-gray-300 rounded"></div>
        <div className="h-8 w-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;