import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, X, BarChart2 } from 'lucide-react';
import { KPIWidget, Dataset } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { InsightModal } from '../ui/InsightModal';

interface KPICardProps {
  kpi: KPIWidget;
  datasets: Dataset[];
  onRemove?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({ kpi, datasets, onRemove }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dataset = datasets.find(d => d.id === kpi.datasetId);
  
  // Calculate actual value from dataset
  const calculateValue = () => {
    const metric = kpi.metric;
    if (!dataset || !metric) return kpi.value;
    
    const values = dataset.data.map(row => Number(row[metric])).filter(v => !isNaN(v));
    if (values.length === 0) return 0;
    
    switch (metric) {
      case 'sum':
        return values.reduce((a, b) => a + b, 0);
      case 'avg':
        return values.reduce((a, b) => a + b, 0) / values.length;
      case 'count':
        return values.length;
      case 'max':
        return Math.max(...values);
      case 'min':
        return Math.min(...values);
      default:
        return values.reduce((a, b) => a + b, 0);
    }
  };

  const formatValue = (value: number | string) => {
    if (typeof value === 'string') return value;
    
    switch (kpi.format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value);
      case 'percentage':
        return `${value.toFixed(1)}%`;
      default:
        return new Intl.NumberFormat('en-US').format(value);
    }
  };

  const getTrendIcon = () => {
    switch (kpi.trend) {
      case 'up':
        return TrendingUp;
      case 'down':
        return TrendingDown;
      default:
        return Minus;
    }
  };

  const getTrendColor = () => {
    switch (kpi.trend) {
      case 'up':
        return 'text-green-600 bg-green-100';
      case 'down':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const TrendIcon = getTrendIcon();
  const actualValue = calculateValue();

  // Mini chart for modal (dummy data)
  const miniChart = (
    <div className="w-full flex flex-col items-center">
      <svg width="120" height="40" aria-label="Mini bar chart" className="mb-2">
        <rect x="10" y="20" width="12" height="18" fill="#6366f1" rx="2" />
        <rect x="30" y="10" width="12" height="28" fill="#8b5cf6" rx="2" />
        <rect x="50" y="5" width="12" height="33" fill="#2563eb" rx="2" />
        <rect x="70" y="15" width="12" height="23" fill="#818cf8" rx="2" />
        <rect x="90" y="25" width="12" height="13" fill="#60a5fa" rx="2" />
      </svg>
      <span className="text-xs text-gray-500 dark:text-gray-400">Sample breakdown</span>
    </div>
  );
  const description = `This represents ${kpi.title.toLowerCase()} breakdown by channel.`;

  return (
    <>
      <Card hover className="group relative cursor-pointer bg-card-light dark:bg-card-dark shadow-md p-6 rounded-2xl gap-6" onClick={() => setModalOpen(true)}>
        {onRemove && (
          <Button
            variant="ghost"
            size="sm"
            aria-label="Remove KPI"
            onClick={e => { e.stopPropagation(); onRemove && onRemove(); }}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <div className="flex items-center justify-between mb-4 gap-6">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1" title={kpi.title === 'Conversion Rate' ? 'Conversion Rate – Percentage of users who completed the goal' : undefined}>{kpi.title}</p>
            <p className="text-3xl font-extrabold mb-1 flex items-center gap-2 text-gray-900 dark:text-gray-100" aria-label={`KPI value: ${formatValue(actualValue)}`}>
              {formatValue(actualValue)}
              <span className={`ml-1 ${kpi.trend === 'up' ? 'text-green-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-gray-400'}`} aria-label={kpi.trend === 'up' ? 'Upward trend' : kpi.trend === 'down' ? 'Downward trend' : 'No trend'}>
                {kpi.trend === 'up' ? '📈' : kpi.trend === 'down' ? '📉' : ''}
              </span>
            </p>
          </div>
          <div className={
            `w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110
            ${getTrendColor()}`
          } aria-label={kpi.trend === 'up' ? 'Positive trend' : kpi.trend === 'down' ? 'Negative trend' : 'Neutral trend'}>
            <TrendIcon className="h-6 w-6" />
          </div>
        </div>
        <div className="flex items-center mt-2">
          <div className={`flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getTrendColor()}`}
            aria-label={`Change: ${Math.abs(kpi.change)}%`}>
            <TrendIcon className="h-3 w-3 mr-1" />
            {Math.abs(kpi.change)}%
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300 ml-2">{kpi.period}</span>
        </div>
      </Card>
      <InsightModal open={modalOpen} onClose={() => setModalOpen(false)} title={kpi.title + ' Details'} miniChart={miniChart} description={description}>
        <div className="text-gray-700 dark:text-gray-200">
          <p className="mb-2 font-semibold">Deeper insights coming soon!</p>
          <p>Placeholder for detailed KPI breakdown, trends, and charts.</p>
        </div>
      </InsightModal>
    </>
  );
};