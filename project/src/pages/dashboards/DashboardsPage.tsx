import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { DashboardGrid } from '../../components/dashboards/DashboardGrid';
import { DashboardBuilder } from '../../components/dashboards/DashboardBuilder';
import { ShareModal } from '../../components/sharing/ShareModal';
import { ExportModal } from '../../components/export/ExportModal';
import { useDataStore } from '../../stores/dataStore';
import { Dashboard } from '../../types';
import { Button } from '../../components/ui/Button';
import { Brain } from 'lucide-react';

export const DashboardsPage: React.FC = () => {
  const { addDashboard, updateDashboard } = useDataStore();
  const [currentView, setCurrentView] = useState<'grid' | 'builder'>('grid');
  const [editingDashboard, setEditingDashboard] = useState<Dashboard | null>(null);
  const [sharingDashboard, setSharingDashboard] = useState<Dashboard | null>(null);
  const [exportingDashboard, setExportingDashboard] = useState<Dashboard | null>(null);

  const handleCreateNew = () => {
    setEditingDashboard(null);
    setCurrentView('builder');
  };

  const handleEdit = (dashboard: Dashboard) => {
    setEditingDashboard(dashboard);
    setCurrentView('builder');
  };

  const handleSave = (dashboard: Dashboard) => {
    if (editingDashboard) {
      updateDashboard(dashboard);
    } else {
      addDashboard(dashboard);
    }
    setCurrentView('grid');
    setEditingDashboard(null);
  };

  const handleBack = () => {
    setCurrentView('grid');
    setEditingDashboard(null);
  };

  if (currentView === 'builder') {
    return (
      <DashboardLayout>
        <DashboardBuilder
          dashboard={editingDashboard}
          onBack={handleBack}
          onSave={handleSave}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 px-4 md:px-8">
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">My Dashboards</h1>
          <p className="text-base text-gray-400 mb-6">Create and manage your analytics dashboards</p>
        </div>

        <DashboardGrid
          onCreateNew={handleCreateNew}
          onEdit={handleEdit}
          onShare={setSharingDashboard}
          onExport={setExportingDashboard}
        />

        {/* Modals */}
        {sharingDashboard && (
          <ShareModal
            dashboard={sharingDashboard}
            onClose={() => setSharingDashboard(null)}
          />
        )}

        {exportingDashboard && (
          <ExportModal
            onClose={() => setExportingDashboard(null)}
          />
        )}
      </div>

      {/* Floating Help/AI Assistant Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button variant="primary" size="lg" className="rounded-full shadow-xl p-4">
          <Brain className="h-7 w-7" />
        </Button>
      </div>
    </DashboardLayout>
  );
};