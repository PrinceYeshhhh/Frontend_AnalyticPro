import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Target, Zap, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useDataStore } from '../../stores/dataStore';
import { AIAnalyticsService } from '../../services/aiAnalytics';
import { PredictiveModel } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

export const PredictiveAnalytics: React.FC = () => {
  const { datasets } = useDataStore();
  const [forecast, setForecast] = useState<PredictiveModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<string>('');

  useEffect(() => {
    if (datasets.length > 0 && !selectedDataset) {
      setSelectedDataset(datasets[0].id);
    }
  }, [datasets, selectedDataset]);

  const generateForecast = async () => {
    if (!selectedDataset) {
      toast.error('Please select a dataset');
      return;
    }

    const dataset = datasets.find(d => d.id === selectedDataset);
    if (!dataset) return;

    setLoading(true);
    try {
      const forecastResult = await AIAnalyticsService.generateForecast(dataset);
      setForecast(forecastResult);
      toast.success('Forecast generated successfully!');
    } catch (error) {
      toast.error('Failed to generate forecast');
      console.error('Forecast error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getHistoricalData = () => {
    if (!selectedDataset) return [];
    
    const dataset = datasets.find(d => d.id === selectedDataset);
    if (!dataset) return [];

    const timeseries = AIAnalyticsService['generateTimeSeries'](dataset.data);
    return timeseries.daily_sales.slice(-14).map((d: any) => ({
      ...d,
      type: 'historical',
      confidence: 1
    }));
  };

  const getCombinedData = () => {
    const historical = getHistoricalData();
    const predicted = forecast?.predictions.map(p => ({
      date: p.date,
      sales: p.value,
      type: 'forecast',
      confidence: p.confidence
    })) || [];

    return [...historical, ...predicted];
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (datasets.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
          <p className="text-gray-600">Upload a dataset to start predictive analytics</p>
        </div>
      </Card>
    );
  }

  const combinedData = getCombinedData();
  const totalForecastValue = forecast?.predictions?.reduce((sum, p) => sum + p.value, 0) || 0;
  const avgConfidence = (forecast?.predictions?.reduce((sum, p) => sum + p.confidence, 0) || 0) / (forecast?.predictions?.length || 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Predictive Analytics</h2>
            <p className="text-gray-600">AI-powered sales forecasting</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
            className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {datasets.map((dataset) => (
              <option key={dataset.id} value={dataset.id}>
                {dataset.name}
              </option>
            ))}
          </select>
          
          <Button onClick={generateForecast} loading={loading} className="shadow-lg">
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate Forecast
          </Button>
        </div>
      </div>

      {/* Forecast Metrics */}
      {forecast && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">7-Day Forecast</p>
                <p className="text-2xl font-bold text-green-600">
                  ${totalForecastValue.toLocaleString()}
                </p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Model Accuracy</p>
                <p className="text-2xl font-bold text-blue-600">
                  {(forecast.accuracy * 100).toFixed(1)}%
                </p>
              </div>
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
                <p className="text-2xl font-bold text-purple-600">
                  {(avgConfidence * 100).toFixed(1)}%
                </p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </Card>
        </div>
      )}

      {/* Forecast Chart */}
      {forecast && combinedData.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Forecast</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  stroke="#666"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#666"
                  fontSize={12}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip 
                  labelFormatter={(label) => formatDate(label)}
                  formatter={(value: any, name: string) => [
                    `$${value.toLocaleString()}`,
                    name === 'sales' ? 'Sales' : 'Forecast'
                  ]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                
                {/* Historical data */}
                <Line
                  dataKey="sales"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  connectNulls={false}
                />
                
                {/* Forecast line */}
                <Line
                  dataKey={(entry: any) => entry.type === 'forecast' ? entry.sales : null}
                  stroke="#10B981"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  connectNulls={false}
                />
                
                {/* Divider line between historical and forecast */}
                <ReferenceLine 
                  x={getHistoricalData()[getHistoricalData().length - 1]?.date} 
                  stroke="#6B7280" 
                  strokeDasharray="2 2"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-0.5 bg-blue-500 mr-2"></div>
              <span className="text-gray-600">Historical Data</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-0.5 bg-green-500 border-dashed mr-2" style={{ borderTop: '2px dashed #10B981', background: 'none' }}></div>
              <span className="text-gray-600">Forecast</span>
            </div>
          </div>
        </Card>
      )}

      {/* Forecast Details */}
      {forecast && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Forecast Details</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Predicted Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confidence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Range
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {forecast.predictions.map((prediction, index) => {
                  const margin = prediction.value * (1 - prediction.confidence);
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatDate(prediction.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${prediction.value.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${prediction.confidence * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {(prediction.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${(prediction.value - margin).toLocaleString()} - ${(prediction.value + margin).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {!forecast && !loading && (
        <Card>
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Ready for Forecasting
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Generate AI-powered sales forecasts to predict future performance and plan your business strategy
            </p>
            <Button onClick={generateForecast} size="lg" className="shadow-lg">
              <TrendingUp className="h-5 w-5 mr-2" />
              Generate Forecast
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};