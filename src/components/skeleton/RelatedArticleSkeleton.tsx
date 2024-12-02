import React from "react";

const RelatedArticleSkeleton: React.FC = () => {
  return (
    <div className="lg:col-span-3 space-y-4">
      <div className="h-8 bg-gray-300 w-1/2"></div>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="bg-white shadow p-4">
          <div className="h-32 bg-gray-300 mb-2"></div>
          <div className="h-6 bg-gray-300 w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

export default RelatedArticleSkeleton;
