import React from 'react';
import { cn } from '../../utils/cn';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content, className }) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <div
        role="tooltip"
        className={cn(
          `absolute bottom-full mb-2 w-max max-w-xs p-2 text-sm text-white bg-gray-800 rounded-md shadow-lg 
           opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 pointer-events-none`,
          className
        )}
      >
        {content}
      </div>
    </div>
  );
}; 