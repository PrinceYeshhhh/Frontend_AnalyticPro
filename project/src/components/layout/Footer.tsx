import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 px-6 mt-8 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="container mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Analytics Pro. All Rights Reserved.</p>
        <p className="mt-1">
          Crafted with ❤️ by the Analytics Pro Team
        </p>
      </div>
    </footer>
  );
};

export default Footer; 