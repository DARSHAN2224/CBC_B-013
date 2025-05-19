import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-t-green-400 border-green-200 rounded-full animate-spin shadow-lg"></div>

        {/* Loading Text */}
        <p className="text-lg font-semibold text-green-200 animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
