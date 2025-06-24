import { useState } from 'react';
import { Button } from '../ui/Button';
import { ChevronDown, LayoutGrid, Plus } from 'lucide-react';

const dashboards = [
  { id: 1, name: 'Marketing KPIs' },
  { id: 2, name: 'Sales Report' },
  { id: 3, name: 'Product Analytics' },
];

interface DashboardSwitcherProps {
  onOpenCreateModal: () => void;
}

export const DashboardSwitcher = ({ onOpenCreateModal }: DashboardSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState(dashboards[0]);

  return (
    <div className="relative">
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="w-64 justify-between">
        <div className="flex items-center">
          <LayoutGrid className="h-4 w-4 mr-2" />
          <span>{selectedDashboard.name}</span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
          <ul className="py-2">
            {dashboards.map((dashboard) => (
              <li key={dashboard.id}>
                <button
                  onClick={() => {
                    setSelectedDashboard(dashboard);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {dashboard.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 dark:border-gray-700 p-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setIsOpen(false);
                onOpenCreateModal();
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Dashboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}; 