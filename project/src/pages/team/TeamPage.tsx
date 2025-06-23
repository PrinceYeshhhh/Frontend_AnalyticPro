import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { TeamManagement } from '../../components/collaboration/TeamManagement';

export const TeamPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <TeamManagement />
      </div>
    </DashboardLayout>
  );
};