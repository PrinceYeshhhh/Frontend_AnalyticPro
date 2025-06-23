import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { SelectPlan } from './pages/onboarding/SelectPlan';
import { Dashboard } from './pages/dashboard/Dashboard';
import { SoloDashboard } from './pages/dashboard/SoloDashboard';
import { ProDashboard } from './pages/dashboard/ProDashboard';
import { EliteDashboard } from './pages/dashboard/EliteDashboard';
import { DataManagement } from './pages/data/DataManagement';
import { DashboardsPage } from './pages/dashboards/DashboardsPage';
import { AIAnalyticsPage } from './pages/ai/AIAnalyticsPage';
import { TeamPage } from './pages/team/TeamPage';
import { BillingPage } from './pages/billing/BillingPage';
import { SettingsPage } from './pages/settings/SettingsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Onboarding route */}
            <Route
              path="/select-plan"
              element={
                <ProtectedRoute>
                  <SelectPlan />
                </ProtectedRoute>
              }
            />
            
            {/* Plan-specific dashboard routes */}
            <Route
              path="/dashboard/solo"
              element={
                <ProtectedRoute>
                  <SoloDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/pro"
              element={
                <ProtectedRoute>
                  <ProDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/elite"
              element={
                <ProtectedRoute>
                  <EliteDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Legacy dashboard route - redirects based on user plan */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Other protected routes */}
            <Route
              path="/data"
              element={
                <ProtectedRoute>
                  <DataManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboards"
              element={
                <ProtectedRoute>
                  <DashboardsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ai-analytics"
              element={
                <ProtectedRoute>
                  <AIAnalyticsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/team"
              element={
                <ProtectedRoute>
                  <TeamPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/billing"
              element={
                <ProtectedRoute>
                  <BillingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            
            {/* Redirect root to select-plan for new users, or dashboard for existing */}
            <Route path="/" element={<Navigate to="/select-plan" replace />} />
            
            {/* Catch all - redirect to select-plan */}
            <Route path="*" element={<Navigate to="/select-plan" replace />} />
          </Routes>
          
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#333',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;