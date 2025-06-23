import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center font-medium rounded-2xl 
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed
    transform active:scale-95 hover:shadow-lg
    select-none relative overflow-hidden
    gap-2
  `;
  
  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 to-blue-700 
      hover:from-blue-700 hover:to-blue-800 
      text-white focus:ring-blue-500
      shadow-md hover:shadow-xl
      before:absolute before:inset-0 before:bg-white before:opacity-0 
      hover:before:opacity-10 before:transition-opacity before:duration-200
    `,
    secondary: `
      bg-gradient-to-r from-gray-600 to-gray-700 
      hover:from-gray-700 hover:to-gray-800 
      text-white focus:ring-gray-500
      shadow-md hover:shadow-xl
    `,
    outline: `
      border-2 border-gray-300 hover:border-blue-500 
      bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-700 
      focus:ring-blue-500 focus:border-blue-500
      shadow-sm hover:shadow-md
    `,
    ghost: `
      hover:bg-gray-100 text-gray-700 focus:ring-gray-500
      hover:shadow-sm
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-red-700 
      hover:from-red-700 hover:to-red-800 
      text-white focus:ring-red-500
      shadow-md hover:shadow-xl
    `,
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm min-h-[32px]',
    md: 'px-4 py-2 text-sm min-h-[40px]',
    lg: 'px-6 py-3 text-base min-h-[48px]',
  };
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
};