import React from 'react';
import { TrendingUp, TrendingDown, Minus, X } from 'lucide-react';
import { KPIWidget, Dataset } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface KPICardProps {
  kpi: KPIWidget;
  datasets: Dataset[];
  onRemove?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({ kpi, datasets, onRemove }) => {
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

  return (
    <Card hover className="group relative">
      {onRemove && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-600"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
          <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {formatValue(actualValue)}
          </p>
        </div>
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110
          ${getTrendColor()}
        `}>
          <TrendIcon className="h-6 w-6" />
        </div>
      </div>
      
      <div className="flex items-center">
        <div className={`
          flex items-center px-2 py-1 rounded-full text-xs font-semibold
          ${getTrendColor()}
        `}>
          <TrendIcon className="h-3 w-3 mr-1" />
          {Math.abs(kpi.change)}%
        </div>
        <span className="text-sm text-gray-600 ml-2">{kpi.period}</span>
      </div>
    </Card>
  );
};