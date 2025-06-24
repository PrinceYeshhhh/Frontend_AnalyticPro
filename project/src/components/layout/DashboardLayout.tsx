import React, { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { initializeDatabase } from '../../services/database';
import { realTimeAnalytics } from '../../services/realTimeAnalytics';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Initialize backend services
    const initializeServices = async () => {
      try {
        // Initialize database
        await initializeDatabase();
        
        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
          await Notification.requestPermission();
        }
        
        console.log('Backend services initialized successfully');
      } catch (error) {
        console.error('Failed to initialize backend services:', error);
      }
    };

    initializeServices();

    // Cleanup on unmount
    return () => {
      realTimeAnalytics.cleanup();
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-navy-900 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isSidebarOpen={sidebarOpen}
        />
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-navy-900 text-gray-900 dark:text-navy-100">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};