import React from 'react';
import { LineChart } from './LineChart';
import { BarChart } from './BarChart';
import { Chart } from '../../types';
import { Card } from '../ui/Card';

interface ChartRendererProps {
  chart: Chart;
  data: any[];
}

export const ChartRenderer: React.FC<ChartRendererProps> = ({ chart, data }) => {
  const renderChart = () => {
    switch (chart.type) {
      case 'line':
        return <LineChart chart={chart} data={data} />;
      case 'bar':
        return <BarChart chart={chart} data={data} />;
      default:
        return <div className="h-80 flex items-center justify-center text-gray-500">Chart type not supported yet</div>;
    }
  };

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{chart.title}</h3>
      </div>
      {renderChart()}
    </Card>
  );
};