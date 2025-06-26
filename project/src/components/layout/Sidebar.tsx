import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Upload, 
  Settings, 
  Users, 
  CreditCard,
  LogOut,
  Plus,
  FolderOpen,
  Brain,
  Zap,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Upload', href: '/upload', icon: Upload },
  { name: 'My Dashboards', href: '/dashboards', icon: FolderOpen },
  { name: 'AI Analytics', href: '/ai-analytics', icon: Brain, badge: 'NEW' },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 
        bg-white dark:bg-[#0A0A23]/80 dark:backdrop-blur-xl text-gray-800 dark:text-white shadow-2xl
        dark:border-r dark:border-indigo-500/20
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col h-full
      `}>
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-indigo-500/10">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Logo */}
        <div className="flex items-center px-6 py-5 border-b border-gray-200 dark:border-indigo-500/20 flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold ml-3 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-indigo-300 bg-clip-text text-transparent">
            Analytics Pro
          </h1>
        </div>

        {/* User Info */}
        <div className="px-6 py-5 border-b border-gray-200 dark:border-indigo-500/20 flex-shrink-0">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-blue-400/20">
              <span className="text-lg font-semibold text-white">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800 dark:text-white">{user?.name}</p>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 capitalize font-medium">
                {user?.plan} Plan
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-indigo-500/50 scrollbar-track-gray-100 dark:scrollbar-track-navy-900">
          <nav className="px-4 py-6 space-y-2">
            <Button
              variant="primary"
              className="w-full justify-start mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg dark:shadow-indigo-500/25"
              size="md"
              onClick={onClose}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Dashboard
            </Button>

            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg 
                    transition-all duration-200 ease-in-out group relative
                    ${isActive 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300 hover:transform hover:scale-105'
                    }
                  `}
                >
                  <item.icon className={`h-5 w-5 mr-3 transition-transform duration-200 ${
                    isActive ? 'text-white' : 'text-gray-400 dark:text-indigo-400 group-hover:text-white dark:group-hover:text-indigo-300'
                  }`} />
                  {item.name}
                  {item.badge && (
                    <span className="ml-auto px-2 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* AI Feature Highlight */}
          <div className="px-4 py-4">
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-600/20 dark:to-blue-600/20 rounded-lg p-4 border border-purple-200 dark:border-purple-500/30">
              <div className="flex items-center mb-2">
                <Zap className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mr-2" />
                <span className="text-sm font-semibold text-gray-800 dark:text-white">AI Powered</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                Get instant insights and predictions from your data
              </p>
              <Link
                to="/ai-analytics"
                onClick={onClose}
                className="block w-full text-center py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-medium rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
              >
                Try AI Analytics
              </Link>
            </div>
          </div>
        </div>

        {/* Fixed Logout Section */}
        <div className="px-4 py-4 border-t border-gray-200 dark:border-indigo-500/20 flex-shrink-0">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-600/20 hover:text-red-600 dark:hover:text-red-300 transition-all duration-200 group"
          >
            <LogOut className="h-5 w-5 mr-3 group-hover:transform group-hover:scale-110 transition-transform duration-200" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};