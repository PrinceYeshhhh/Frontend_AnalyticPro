import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface CreateDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateDashboardModal = ({ isOpen, onClose }: CreateDashboardModalProps) => {
  const [dashboardName, setDashboardName] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Create New Dashboard
        </h2>
        <Input
          placeholder="Enter dashboard name..."
          value={dashboardName}
          onChange={(e) => setDashboardName(e.target.value)}
          className="mb-4"
        />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button>
            Create
          </Button>
        </div>
      </Card>
    </div>
  );
}; 