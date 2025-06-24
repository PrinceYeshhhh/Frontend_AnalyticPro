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
  { name: 'Data Sources', href: '/data', icon: Upload },
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
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-navy-900 to-navy-800 text-white shadow-2xl
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col h-full
      `}>
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-navy-700">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Logo */}
        <div className="flex items-center px-6 py-5 border-b border-navy-700 flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold ml-3 bg-gradient-to-r from-white to-navy-200 bg-clip-text text-transparent">
            Analytics Pro
          </h1>
        </div>

        {/* User Info */}
        <div className="px-6 py-5 border-b border-navy-700 flex-shrink-0">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-blue-400/20">
              <span className="text-lg font-semibold text-white">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-blue-300 capitalize font-medium">
                {user?.plan} Plan
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-navy-600 scrollbar-track-navy-800">
          <nav className="px-4 py-6 space-y-2">
            <Button
              variant="primary"
              className="w-full justify-start mb-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105' 
                      : 'text-navy-300 hover:bg-navy-700/50 hover:text-white hover:transform hover:scale-105'
                    }
                  `}
                >
                  <item.icon className={`h-5 w-5 mr-3 transition-transform duration-200 ${
                    isActive ? 'text-white' : 'text-navy-400 group-hover:text-white'
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
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-4 border border-purple-500/30">
              <div className="flex items-center mb-2">
                <Zap className="h-5 w-5 text-yellow-400 mr-2" />
                <span className="text-sm font-semibold text-white">AI Powered</span>
              </div>
              <p className="text-xs text-navy-300 mb-3">
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
        <div className="px-4 py-4 border-t border-navy-700 flex-shrink-0">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-navy-300 rounded-lg hover:bg-red-600/20 hover:text-red-300 transition-all duration-200 group"
          >
            <LogOut className="h-5 w-5 mr-3 group-hover:transform group-hover:scale-110 transition-transform duration-200" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};