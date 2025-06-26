import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  padding = 'md',
  hover = false,
  onClick
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
      `bg-white dark:bg-[#1E2533]/50 dark:backdrop-blur-sm rounded-xl shadow-lg 
       border border-gray-200 dark:border-indigo-500/10 
       transition-all duration-300 ease-in-out`,
      hover && 'hover:shadow-xl hover:border-gray-300 dark:hover:border-indigo-500/30 dark:hover:bg-[#1E2533]/80 hover:-translate-y-1',
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  );
};