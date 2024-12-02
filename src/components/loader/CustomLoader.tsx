import React from "react";

const CustomLoader = () => {
  return (
    <div className="flex justify-center items-center my-4">
      <div className="loader w-10 h-10 border-4 border-gray-300 border-t-4 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default CustomLoader;
