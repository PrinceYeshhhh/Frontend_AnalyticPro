import React from 'react';
import { X } from 'lucide-react';

interface FilterChipProps {
  label: string;
  onRemove?: () => void;
  className?: string;
}

export const FilterChip: React.FC<FilterChipProps> = ({ label, onRemove, className }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-700/30 text-indigo-700 dark:text-indigo-200 text-sm font-medium mr-2 mb-2 shadow-sm ${className || ''}`}
    aria-label={`Filter: ${label}`}
  >
    {label}
    {onRemove && (
      <button
        onClick={onRemove}
        className="ml-2 p-1 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        aria-label={`Remove filter: ${label}`}
      >
        <X className="h-4 w-4" />
      </button>
    )}
  </span>
); 