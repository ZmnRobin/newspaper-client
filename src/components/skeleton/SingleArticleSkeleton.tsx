import React from 'react';

const SingleArticleSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-5 py-8 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column - Author info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white shadow p-4">
            <div className="h-6 bg-gray-300 w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 w-1/2 mb-1"></div>
            <div className="h-4 bg-gray-300 w-3/4"></div>
          </div>
          <div className="bg-white shadow p-4">
            <div className="h-6 bg-gray-300 w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 w-1/2 mb-1"></div>
            <div className="h-4 bg-gray-300 w-3/4"></div>
          </div>
        </div>

        {/* Middle column - Article content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="h-10 bg-gray-300 w-3/4"></div>
          <div className="h-64 md:h-96 bg-gray-300"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-4 bg-gray-300 w-full"></div>
            ))}
          </div>

          <div className="h-8 bg-gray-300 w-1/4 mt-8"></div>
          <div className="h-32 bg-gray-300 w-full"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-24 bg-gray-300 w-full"></div>
            ))}
          </div>
        </div>

        {/* Right column - Related articles */}
        <div className="lg:col-span-3 space-y-4">
          <div className="h-8 bg-gray-300 w-1/2"></div>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white shadow p-4">
              <div className="h-32 bg-gray-300 mb-2"></div>
              <div className="h-6 bg-gray-300 w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleArticleSkeleton;