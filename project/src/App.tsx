import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { SelectPlan } from './pages/onboarding/SelectPlan';
import AnalyticsProDashboard from './pages/dashboard/AnalyticsProDashboard';
import { SoloDashboard } from './pages/dashboard/SoloDashboard';
import { ProDashboard } from './pages/dashboard/ProDashboard';
import { EliteDashboard } from './pages/dashboard/EliteDashboard';
import { DataManagement } from './pages/data/DataManagement';
import { DashboardsPage } from './pages/dashboards/DashboardsPage';
import { AIAnalyticsPage } from './pages/ai/AIAnalyticsPage';
import { TeamPage } from './pages/team/TeamPage';
import { BillingPage } from './pages/billing/BillingPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import UploadPage from './pages/data/UploadPage';

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
            
            {/* Main dashboard route */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AnalyticsProDashboard />
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
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <UploadPage />
                </ProtectedRoute>
              }
            />
            
            {/* Redirect root to select-plan for new users, or dashboard for existing */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Catch all - redirect to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#333',
                color: '#fff',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              },
              success: {
                style: {
                  background: '#10B981',
                },
              },
              error: {
                style: {
                  background: '#EF4444',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;