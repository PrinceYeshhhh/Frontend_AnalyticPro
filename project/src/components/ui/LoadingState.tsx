import React from 'react';

export const LoadingState: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
    <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mb-4"></div>
    <div className="w-48 h-4 bg-gray-200 dark:bg-[#1E2533]/60 rounded mb-2 animate-pulse" />
    <div className="w-32 h-4 bg-gray-200 dark:bg-[#1E2533]/60 rounded mb-2 animate-pulse" />
    <p className="text-gray-500 dark:text-gray-300 mt-2">{message}</p>
  </div>
); 