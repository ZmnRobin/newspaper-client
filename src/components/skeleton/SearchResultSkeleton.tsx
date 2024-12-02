import React from 'react';

const SearchResultSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-300 w-3/4 mb-4"></div>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-start shadow-md p-4 mt-3">
          <div className="w-1/4">
            <div className="bg-gray-300 w-full h-40"></div>
          </div>
          <div className="w-3/4 pl-4">
            <div className="h-6 bg-gray-300 w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 w-full mb-1"></div>
            <div className="h-4 bg-gray-300 w-full mb-1"></div>
            <div className="h-4 bg-gray-300 w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResultSkeleton;