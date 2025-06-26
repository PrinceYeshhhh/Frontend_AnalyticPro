import React, { useState } from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Chart } from '../../types';
import { InsightModal } from '../ui/InsightModal';

interface BarChartProps {
  chart: Chart;
  data: any[];
}

export const BarChart: React.FC<BarChartProps> = ({ chart, data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const chartId = React.useId();
  const descriptionId = `${chartId}-description`;

  const summary = `This bar chart shows ${chart.title}. The x-axis represents ${chart.xAxis}, and the y-axis represents ${chart.yAxis}.`;

  return (
    <>
      <div 
        role="figure" 
        aria-label={chart.title || 'Bar chart'}
        aria-describedby={descriptionId}
        className="h-80 cursor-pointer group" 
        onClick={() => setModalOpen(true)}
      >
        <div className="sr-only" id={descriptionId}>
          <p>{summary}</p>
          <ul>
            {data.map((item, index) => (
              <li key={item.name}>{`${item.name}: ${item.value}`}</li>
            ))}
          </ul>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey={chart.xAxis} 
              stroke="#666"
              fontSize={12}
            />
            <YAxis 
              stroke="#666"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            {chart.config.showLegend && <Legend />}
            <Bar
              dataKey={chart.yAxis}
              fill={chart.config.colors[0] || '#3B82F6'}
              radius={[4, 4, 0, 0]}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-blue-500 transition-opacity pointer-events-none rounded-xl" />
      </div>
      <InsightModal open={modalOpen} onClose={() => setModalOpen(false)} title={chart.title + ' Details'}>
        <div className="text-gray-700 dark:text-gray-200">
          <p className="mb-2 font-semibold">Deeper chart insights coming soon!</p>
          <p>Placeholder for detailed chart breakdown, trends, and analytics.</p>
        </div>
      </InsightModal>
    </>
  );
};