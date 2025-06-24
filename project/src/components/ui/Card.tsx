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
      `bg-white dark:bg-navy-800 rounded-2xl shadow-sm border border-gray-200 dark:border-navy-700 
       transition-all duration-200 ease-in-out`,
      hover && 'hover:shadow-lg hover:border-gray-300 dark:hover:border-navy-600 dark:hover:bg-navy-700 hover:-translate-y-1',
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  );
};