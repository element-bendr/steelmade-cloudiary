import React from 'react';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-red-700 rounded-full animate-spin mb-6"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300 animate-pulse">
          Loading BigBoss Gold Director Chair...
        </p>
      </div>
    </div>
  );
}