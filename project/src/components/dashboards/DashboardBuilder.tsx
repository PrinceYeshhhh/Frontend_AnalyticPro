import React, { useState } from 'react';
import { ArrowLeft, Plus, Save, Eye, Share2, Download, Settings } from 'lucide-react';
import { Dashboard, Chart, KPIWidget } from '../../types';
import { useDataStore } from '../../stores/dataStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { ChartRenderer } from '../charts/ChartRenderer';
import { KPICard } from '../kpi/KPICard';
import { ChartBuilder } from '../charts/ChartBuilder';
import { KPIBuilder } from '../kpi/KPIBuilder';
import toast from 'react-hot-toast';

interface DashboardBuilderProps {
  dashboard: Dashboard | null;
  onBack: () => void;
  onSave: (dashboard: Dashboard) => void;
}

export const DashboardBuilder: React.FC<DashboardBuilderProps> = ({
  dashboard,
  onBack,
  onSave,
}) => {
  const { datasets, addChart, addKPI, removeChart, removeKPI } = useDataStore();
  const [editingDashboard, setEditingDashboard] = useState<Dashboard>(
    dashboard || {
      id: Date.now().toString(),
      userId: '1',
      name: 'New Dashboard',
      description: '',
      charts: [],
      kpis: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isShared: false,
      shareSettings: {
        isPublic: false,
        allowEdit: false,
      },
      layout: {
        grid: [],
        columns: 12,
      },
    }
  );
  const [showChartBuilder, setShowChartBuilder] = useState(false);
  const [showKPIBuilder, setShowKPIBuilder] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const handleSave = () => {
    if (!editingDashboard.name.trim()) {
      toast.error('Please enter a dashboard name');
      return;
    }
    
    onSave(editingDashboard);
    toast.success('Dashboard saved successfully');
  };

  const handleAddChart = (chart: Chart) => {
    const updatedDashboard = {
      ...editingDashboard,
      charts: [...editingDashboard.charts, chart],
      updatedAt: new Date().toISOString(),
    };
    setEditingDashboard(updatedDashboard);
    setShowChartBuilder(false);
  };

  const handleAddKPI = (kpi: KPIWidget) => {
    const updatedDashboard = {
      ...editingDashboard,
      kpis: [...editingDashboard.kpis, kpi],
      updatedAt: new Date().toISOString(),
    };
    setEditingDashboard(updatedDashboard);
    setShowKPIBuilder(false);
  };

  const handleRemoveChart = (chartId: string) => {
    const updatedDashboard = {
      ...editingDashboard,
      charts: editingDashboard.charts.filter(c => c.id !== chartId),
      updatedAt: new Date().toISOString(),
    };
    setEditingDashboard(updatedDashboard);
  };

  const handleRemoveKPI = (kpiId: string) => {
    const updatedDashboard = {
      ...editingDashboard,
      kpis: editingDashboard.kpis.filter(k => k.id !== kpiId),
      updatedAt: new Date().toISOString(),
    };
    setEditingDashboard(updatedDashboard);
  };

  if (showChartBuilder) {
    return (
      <ChartBuilder
        onBack={() => setShowChartBuilder(false)}
        onSave={handleAddChart}
        datasets={datasets}
      />
    );
  }

  if (showKPIBuilder) {
    return (
      <KPIBuilder
        onBack={() => setShowKPIBuilder(false)}
        onSave={handleAddKPI}
        datasets={datasets}
      />
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex-1">
              <Input
                value={editingDashboard.name}
                onChange={(e) => setEditingDashboard({
                  ...editingDashboard,
                  name: e.target.value
                })}
                className="text-xl font-semibold border-none bg-transparent p-0 focus:ring-0"
                placeholder="Dashboard Name"
              />
              <Input
                value={editingDashboard.description || ''}
                onChange={(e) => setEditingDashboard({
                  ...editingDashboard,
                  description: e.target.value
                })}
                className="text-sm text-gray-600 border-none bg-transparent p-0 focus:ring-0 mt-1"
                placeholder="Add description..."
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={() => setPreviewMode(!previewMode)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {previewMode ? 'Edit' : 'Preview'}
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        {!previewMode && (
          <div className="mb-6 flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowChartBuilder(true)}
              className="border-dashed"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Chart
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowKPIBuilder(true)}
              className="border-dashed"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add KPI
            </Button>
          </div>
        )}

        {/* KPI Section */}
        {editingDashboard.kpis.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {editingDashboard.kpis.map((kpi) => (
                <KPICard
                  key={kpi.id}
                  kpi={kpi}
                  datasets={datasets}
                  onRemove={!previewMode ? () => handleRemoveKPI(kpi.id) : undefined}
                />
              ))}
            </div>
          </div>
        )}

        {/* Charts Section */}
        {editingDashboard.charts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Charts</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {editingDashboard.charts.map((chart) => {
                const dataset = datasets.find(d => d.id === chart.datasetId);
                return (
                  <div key={chart.id} className="relative group">
                    {dataset && (
                      <ChartRenderer chart={chart} data={dataset.data} />
                    )}
                    {!previewMode && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveChart(chart.id)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-md text-red-600 hover:text-red-700"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {editingDashboard.charts.length === 0 && editingDashboard.kpis.length === 0 && (
          <Card>
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Start Building Your Dashboard
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Add charts and KPI widgets to visualize your data and track important metrics
              </p>
              <div className="flex justify-center space-x-4">
                <Button onClick={() => setShowChartBuilder(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Chart
                </Button>
                <Button variant="outline" onClick={() => setShowKPIBuilder(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add KPI
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};