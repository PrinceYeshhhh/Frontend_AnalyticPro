import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  label?: string;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ label = 'Back', className }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-[#1E2533]/60 hover:bg-gray-200 dark:hover:bg-indigo-500/10 text-gray-700 dark:text-gray-200 shadow transition-all ${className || ''}`}
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      {label}
    </button>
  );
}; 