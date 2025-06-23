import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { UserSettings } from '../../components/settings/UserSettings';

export const SettingsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <UserSettings />
      </div>
    </DashboardLayout>
  );
};