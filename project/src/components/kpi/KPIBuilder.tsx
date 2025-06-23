import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { KPIWidget, Dataset } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface KPIBuilderProps {
  onBack: () => void;
  onSave: (kpi: KPIWidget) => void;
  datasets: Dataset[];
}

export const KPIBuilder: React.FC<KPIBuilderProps> = ({
  onBack,
  onSave,
  datasets,
}) => {
  const [kpi, setKpi] = useState<Partial<KPIWidget>>({
    title: '',
    datasetId: '',
    metric: '',
    comparison: 'previous_period',
    format: 'number',
    trend: 'neutral',
    change: 0,
    period: 'vs last month',
  });

  const selectedDataset = datasets.find(d => d.id === kpi.datasetId);
  const numericColumns = selectedDataset?.columns.filter(c => c.type === 'number') || [];

  const handleSave = () => {
    if (!kpi.title || !kpi.datasetId || !kpi.metric) {
      return;
    }

    const newKPI: KPIWidget = {
      id: Date.now().toString(),
      title: kpi.title,
      value: 0, // Will be calculated dynamically
      change: kpi.change || 0,
      trend: kpi.trend || 'neutral',
      period: kpi.period || 'vs last month',
      datasetId: kpi.datasetId,
      metric: kpi.metric,
      comparison: kpi.comparison || 'previous_period',
      format: kpi.format || 'number',
    };

    onSave(newKPI);
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
            <h1 className="text-xl font-semibold text-gray-900">Create KPI Widget</h1>
          </div>
          <Button 
            onClick={handleSave}
            disabled={!kpi.title || !kpi.datasetId || !kpi.metric}
          >
            <Save className="h-4 w-4 mr-2" />
            Save KPI
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">KPI Configuration</h3>
            <div className="space-y-4">
              <Input
                label="KPI Title"
                value={kpi.title || ''}
                onChange={(e) => setKpi({ ...kpi, title: e.target.value })}
                placeholder="e.g., Total Revenue, Active Users"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Source
                </label>
                <select
                  value={kpi.datasetId || ''}
                  onChange={(e) => setKpi({ ...kpi, datasetId: e.target.value, metric: '' })}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Metric Column
                  </label>
                  <select
                    value={kpi.metric || ''}
                    onChange={(e) => setKpi({ ...kpi, metric: e.target.value })}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select metric column</option>
                    {numericColumns.map((column) => (
                      <option key={column.name} value={column.name}>
                        {column.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <select
                  value={kpi.format || 'number'}
                  onChange={(e) => setKpi({ ...kpi, format: e.target.value as KPIWidget['format'] })}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="number">Number</option>
                  <option value="currency">Currency</option>
                  <option value="percentage">Percentage</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comparison Period
                </label>
                <select
                  value={kpi.comparison || 'previous_period'}
                  onChange={(e) => setKpi({ ...kpi, comparison: e.target.value as KPIWidget['comparison'] })}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="previous_period">Previous Period</option>
                  <option value="previous_year">Previous Year</option>
                  <option value="target">Target</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trend
                  </label>
                  <select
                    value={kpi.trend || 'neutral'}
                    onChange={(e) => setKpi({ ...kpi, trend: e.target.value as KPIWidget['trend'] })}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="up">Up</option>
                    <option value="down">Down</option>
                    <option value="neutral">Neutral</option>
                  </select>
                </div>

                <Input
                  label="Change (%)"
                  type="number"
                  value={kpi.change || 0}
                  onChange={(e) => setKpi({ ...kpi, change: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>

              <Input
                label="Period Description"
                value={kpi.period || ''}
                onChange={(e) => setKpi({ ...kpi, period: e.target.value })}
                placeholder="e.g., vs last month, vs last year"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};