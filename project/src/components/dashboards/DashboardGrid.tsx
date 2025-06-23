import React from 'react';
import { Plus, Settings, Share2, Download, Copy, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useDataStore } from '../../stores/dataStore';
import { Dashboard } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

interface DashboardGridProps {
  onCreateNew: () => void;
  onEdit: (dashboard: Dashboard) => void;
  onShare: (dashboard: Dashboard) => void;
  onExport: (dashboard: Dashboard) => void;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({
  onCreateNew,
  onEdit,
  onShare,
  onExport,
}) => {
  const { dashboards, removeDashboard, duplicateDashboard } = useDataStore();

  const handleDelete = (dashboard: Dashboard) => {
    if (window.confirm(`Are you sure you want to delete "${dashboard.name}"?`)) {
      removeDashboard(dashboard.id);
      toast.success('Dashboard deleted successfully');
    }
  };

  const handleDuplicate = (dashboard: Dashboard) => {
    duplicateDashboard(dashboard.id);
    toast.success('Dashboard duplicated successfully');
  };

  if (dashboards.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Plus className="h-10 w-10 text-blue-600" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">
          Create Your First Dashboard
        </h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Build beautiful, interactive dashboards to visualize your business data and track key metrics
        </p>
        <Button size="lg" onClick={onCreateNew} className="shadow-lg">
          <Plus className="h-5 w-5 mr-2" />
          Create Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Create New Dashboard Card */}
      <Card 
        hover 
        className="border-2 border-dashed border-gray-300 hover:border-blue-400 cursor-pointer group"
        onClick={onCreateNew}
      >
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
            <Plus className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">New Dashboard</h3>
          <p className="text-gray-600 text-sm">Create a new analytics dashboard</p>
        </div>
      </Card>

      {/* Existing Dashboards */}
      {dashboards.map((dashboard) => (
        <Card key={dashboard.id} hover className="group">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                {dashboard.name}
              </h3>
              {dashboard.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {dashboard.description}
                </p>
              )}
              
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <span>{dashboard.charts.length} charts</span>
                <span>{dashboard.kpis.length} KPIs</span>
                <span>{format(new Date(dashboard.updatedAt), 'MMM d')}</span>
              </div>
            </div>
            
            {dashboard.isShared && (
              <div className="flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                <Share2 className="h-3 w-3 mr-1" />
                Shared
              </div>
            )}
          </div>

          {/* Preview thumbnails */}
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-md flex items-center justify-center"
                >
                  <div className="w-8 h-2 bg-blue-300 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(dashboard)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onShare(dashboard)}
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onExport(dashboard)}
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDuplicate(dashboard)}
                className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(dashboard)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};