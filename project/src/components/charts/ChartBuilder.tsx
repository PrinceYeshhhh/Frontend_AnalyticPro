import React, { useState } from 'react';
import { ArrowLeft, Save, BarChart3, LineChart, PieChart, AreaChart } from 'lucide-react';
import { Chart, Dataset } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface ChartBuilderProps {
  onBack: () => void;
  onSave: (chart: Chart) => void;
  datasets: Dataset[];
}

export const ChartBuilder: React.FC<ChartBuilderProps> = ({
  onBack,
  onSave,
  datasets,
}) => {
  const [chart, setChart] = useState<Partial<Chart>>({
    type: 'line',
    title: '',
    datasetId: '',
    xAxis: '',
    yAxis: '',
    config: {
      colors: ['#3B82F6'],
      showGrid: true,
      showLegend: false,
      animate: true,
    },
  });

  const chartTypes = [
    { type: 'line', icon: LineChart, label: 'Line Chart' },
    { type: 'bar', icon: BarChart3, label: 'Bar Chart' },
    { type: 'area', icon: AreaChart, label: 'Area Chart' },
    { type: 'pie', icon: PieChart, label: 'Pie Chart' },
  ];

  const selectedDataset = datasets.find(d => d.id === chart.datasetId);
  const numericColumns = selectedDataset?.columns.filter(c => c.type === 'number') || [];
  const allColumns = selectedDataset?.columns || [];

  const handleSave = () => {
    if (!chart.title || !chart.datasetId || !chart.xAxis || !chart.yAxis) {
      return;
    }

    const newChart: Chart = {
      id: Date.now().toString(),
      type: chart.type as Chart['type'],
      title: chart.title,
      datasetId: chart.datasetId,
      xAxis: chart.xAxis,
      yAxis: chart.yAxis,
      config: chart.config!,
    };

    onSave(newChart);
  };

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
            <h1 className="text-xl font-semibold text-gray-900">Create Chart</h1>
          </div>
          <Button 
            onClick={handleSave}
            disabled={!chart.title || !chart.datasetId || !chart.xAxis || !chart.yAxis}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Chart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Chart Type Selection */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Chart Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {chartTypes.map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  onClick={() => setChart({ ...chart, type: type as Chart['type'] })}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    chart.type === type
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <Icon className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">{label}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Chart Configuration */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration</h3>
            <div className="space-y-4">
              <Input
                label="Chart Title"
                value={chart.title || ''}
                onChange={(e) => setChart({ ...chart, title: e.target.value })}
                placeholder="Enter chart title"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Source
                </label>
                <select
                  value={chart.datasetId || ''}
                  onChange={(e) => setChart({ ...chart, datasetId: e.target.value, xAxis: '', yAxis: '' })}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select a dataset</option>
                  {datasets.map((dataset) => (
                    <option key={dataset.id} value={dataset.id}>
                      {dataset.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedDataset && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      X-Axis (Categories)
                    </label>
                    <select
                      value={chart.xAxis || ''}
                      onChange={(e) => setChart({ ...chart, xAxis: e.target.value })}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select X-axis column</option>
                      {allColumns.map((column) => (
                        <option key={column.name} value={column.name}>
                          {column.name} ({column.type})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Y-Axis (Values)
                    </label>
                    <select
                      value={chart.yAxis || ''}
                      onChange={(e) => setChart({ ...chart, yAxis: e.target.value })}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Y-axis column</option>
                      {numericColumns.map((column) => (
                        <option key={column.name} value={column.name}>
                          {column.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Chart Options */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Display Options</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showGrid"
                  checked={chart.config?.showGrid || false}
                  onChange={(e) => setChart({
                    ...chart,
                    config: { ...chart.config!, showGrid: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="showGrid" className="ml-2 text-sm text-gray-700">
                  Show grid lines
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showLegend"
                  checked={chart.config?.showLegend || false}
                  onChange={(e) => setChart({
                    ...chart,
                    config: { ...chart.config!, showLegend: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="showLegend" className="ml-2 text-sm text-gray-700">
                  Show legend
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="animate"
                  checked={chart.config?.animate || false}
                  onChange={(e) => setChart({
                    ...chart,
                    config: { ...chart.config!, animate: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="animate" className="ml-2 text-sm text-gray-700">
                  Enable animations
                </label>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};