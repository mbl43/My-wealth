import React from "react";

const Loader = () => {
  return (
    <div className="flex-col gap-4 w-full flex items-center justify-center">
      <div className="w-20 h-20 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full"></div>
      <span className="text-xl">Fetching Your Data. Please Wait!</span>
    </div>
  );
};

export default Loader;
