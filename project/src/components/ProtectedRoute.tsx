import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your AI team...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is on a plan-specific dashboard route, check if they have access
  if (location.pathname.startsWith('/dashboard/')) {
    const planFromUrl = location.pathname.split('/')[2];
    if (planFromUrl && planFromUrl !== user.plan) {
      // Redirect to their actual plan dashboard
      return <Navigate to={`/dashboard/${user.plan}`} replace />;
    }
  }

  // If user is on the generic dashboard route, redirect to their plan-specific dashboard
  if (location.pathname === '/dashboard') {
    return <Navigate to={`/dashboard/${user.plan}`} replace />;
  }

  return <>{children}</>;
};