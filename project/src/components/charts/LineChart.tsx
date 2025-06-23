import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Chart } from '../../types';

interface LineChartProps {
  chart: Chart;
  data: any[];
}

export const LineChart: React.FC<LineChartProps> = ({ chart, data }) => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data}>
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
          <Line
            type="monotone"
            dataKey={chart.yAxis}
            stroke={chart.config.colors[0] || '#3B82F6'}
            strokeWidth={2}
            dot={{ fill: chart.config.colors[0] || '#3B82F6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={chart.config.animate ? 1000 : 0}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};