import React, { useState } from 'react';
import { Bell, Search, HelpCircle, User, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useDataStore } from '../../stores/dataStore';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { format } from 'date-fns';
import { ThemeSwitcher } from '../ui/ThemeSwitcher';

interface HeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const { user } = useAuth();
  const { alerts, datasets } = useDataStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const unreadAlerts = alerts.filter(alert => !alert.isRead);
  const lastDatasetUpdate = datasets.length > 0 
    ? Math.max(...datasets.map(d => new Date(d.updatedAt).getTime()))
    : null;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="bg-white dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700 px-4 sm:px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left Section - Mobile Menu + Welcome */}
        <div className="flex items-center space-x-4 flex-1">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Welcome Message */}
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-navy-100">
              {getGreeting()}, {user?.name}! 👋
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-navy-300">
              <span>Welcome to your analytics dashboard</span>
              {lastDatasetUpdate && (
                <>
                  <span>•</span>
                  <span>Last updated {format(new Date(lastDatasetUpdate), 'MMM d, h:mm a')}</span>
                </>
              )}
            </div>
          </div>

          {/* Mobile Welcome (Simplified) */}
          <div className="sm:hidden">
            <h1 className="text-base font-semibold text-gray-900 dark:text-navy-100">
              {getGreeting()}!
            </h1>
          </div>
        </div>

        {/* Center Section - Search (Hidden on mobile) */}
        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <Input
            placeholder="Search dashboards, data, insights..."
            icon={<Search className="h-5 w-5 text-gray-400 dark:text-navy-400" />}
            className="bg-gray-50 dark:bg-navy-700 border-gray-200 dark:border-navy-600 focus:bg-white dark:focus:bg-navy-600"
          />
        </div>

        {/* Right Section - Actions & User */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <ThemeSwitcher />
          {/* Search Button (Mobile) */}
          <Button variant="ghost" size="sm" className="md:hidden hover:bg-gray-100 dark:hover:bg-navy-700">
            <Search className="h-5 w-5 text-gray-600 dark:text-navy-200" />
          </Button>

          {/* Help Button */}
          <Button variant="ghost" size="sm" className="hidden sm:flex hover:bg-gray-100 dark:hover:bg-navy-700">
            <HelpCircle className="h-5 w-5 text-gray-600 dark:text-navy-200" />
          </Button>
          
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative hover:bg-gray-100 dark:hover:bg-navy-700">
            <Bell className="h-5 w-5 text-gray-600 dark:text-navy-200" />
            {unreadAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-medium animate-pulse">
                {unreadAlerts.length > 9 ? '9+' : unreadAlerts.length}
              </span>
            )}
          </Button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md ring-2 ring-blue-100">
                <span className="text-sm font-semibold text-white">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-navy-100">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-navy-300 capitalize">{user?.plan} Plan</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400 dark:text-navy-400 hidden sm:block" />
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-navy-800 rounded-lg shadow-lg border border-gray-200 dark:border-navy-700 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-navy-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-navy-100">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-navy-300">{user?.email}</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-navy-200 hover:bg-gray-100 dark:hover:bg-navy-700">
                  Profile Settings
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-navy-200 hover:bg-gray-100 dark:hover:bg-navy-700">
                  Billing
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden mt-4">
        <Input
          placeholder="Search..."
          icon={<Search className="h-5 w-5 text-gray-400" />}
          className="bg-gray-50 dark:bg-navy-700 border-gray-200 dark:border-navy-600 focus:bg-white dark:focus:bg-navy-600"
        />
      </div>
    </header>
  );
};