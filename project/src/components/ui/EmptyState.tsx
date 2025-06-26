import React from 'react';
import { Inbox } from 'lucide-react';

export const EmptyState: React.FC<{ message?: string }> = ({ message = 'No data available. Try changing filters.' }) => (
  <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
    <Inbox className="w-12 h-12 text-indigo-400 mb-4 animate-bounce-subtle" />
    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">{message}</p>
    <p className="text-gray-400 dark:text-gray-400">You can upload new data or adjust your filters to see results.</p>
  </div>
); 