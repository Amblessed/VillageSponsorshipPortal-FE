import React from 'react';

const PupilSkeleton = () => (
  <div className="w-80 bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-300" />
    <div className="p-4 space-y-2">
      <div className="h-6 bg-gray-300 rounded w-3/4" />
      <div className="h-4 bg-gray-300 rounded w-1/2" />
      <div className="h-4 bg-gray-300 rounded w-1/3" />
      <div className="h-10 bg-gray-300 rounded w-full mt-4" />
    </div>
  </div>
);

export default PupilSkeleton;
