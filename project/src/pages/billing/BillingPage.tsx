import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { BillingManagement } from '../../components/billing/BillingManagement';

export const BillingPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <BillingManagement />
      </div>
    </DashboardLayout>
  );
};