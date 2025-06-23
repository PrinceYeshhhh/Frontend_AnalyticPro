import React, { useEffect } from 'react';
import { Zap, TrendingUp, DollarSign, Users, ShoppingCart, ArrowUpRight, ArrowDownRight, Brain, FileText } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ChartRenderer } from '../../components/charts/ChartRenderer';
import { useDataStore } from '../../stores/dataStore';
import { generateMockData } from '../../utils/dataParser';
import { Chart, KPIWidget } from '../../types';

export const SoloDashboard: React.FC = () => {
  const { datasets, addDataset } = useDataStore();

  useEffect(() => {
    // Add sample data if no datasets exist
    if (datasets.length === 0) {
      const mockDataset = generateMockData();
      addDataset(mockDataset);
    }
  }, [datasets, addDataset]);

  const kpis: KPIWidget[] = [
    {
      id: '1',
      title: 'Total Revenue',
      value: '$45,230',
      change: 8.2,
      trend: 'up',
      period: 'vs last month',
    },
    {
      id: '2',
      title: 'Orders',
      value: '342',
      change: 12.5,
      trend: 'up',
      period: 'vs last month',
    },
    {
      id: '3',
      title: 'Customers',
      value: '156',
      change: 5.4,
      trend: 'up',
      period: 'vs last month',
    },
    {
      id: '4',
      title: 'Avg Order Value',
      value: '$132.25',
      change: -2.1,
      trend: 'down',
      period: 'vs last month',
    },
  ];

  const sampleCharts: Chart[] = [
    {
      id: '1',
      type: 'line',
      title: 'Revenue Trend',
      datasetId: 'mock-sales-data',
      xAxis: 'date',
      yAxis: 'sales',
      config: {
        colors: ['#3B82F6'],
        showGrid: true,
        showLegend: false,
        animate: true,
      },
    },
    {
      id: '2',
      type: 'bar',
      title: 'Monthly Orders',
      datasetId: 'mock-sales-data',
      xAxis: 'date',
      yAxis: 'orders',
      config: {
        colors: ['#10B981'],
        showGrid: true,
        showLegend: false,
        animate: true,
      },
    },
  ];

  const getKPIIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'total revenue':
        return DollarSign;
      case 'orders':
        return ShoppingCart;
      case 'customers':
        return Users;
      default:
        return TrendingUp;
    }
  };

  const currentDataset = datasets.find(d => d.id === 'mock-sales-data');

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 bg-gray-50 min-h-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 space-y-4 sm:space-y-0 px-4 md:px-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-extrabold text-gray-900">Solo AI Analyst Dashboard</h1>
                <p className="text-base text-gray-400 mb-6">Your personal senior business analyst at work</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="shadow-lg">
              <FileText className="h-5 w-5" />
              Weekly Report
            </Button>
            <Button className="shadow-lg">
              <Brain className="h-5 w-5" />
              Ask AI Analyst
            </Button>
          </div>
        </div>

        {/* AI Analyst Introduction */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Meet Your AI Senior Analyst</h3>
              <p className="text-blue-800 mb-4">
                I'm analyzing your business data 24/7 to provide insights that would typically require a $8,000/month senior analyst. 
                Here's what I've discovered about your business performance:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <p className="text-sm font-medium text-blue-900">📈 Key Insight</p>
                  <p className="text-sm text-blue-700 mt-1">Revenue growth is accelerating - up 8.2% this month</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <p className="text-sm font-medium text-blue-900">🎯 Recommendation</p>
                  <p className="text-sm text-blue-700 mt-1">Focus on customer retention to boost AOV</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {kpis.map((kpi) => {
            const Icon = getKPIIcon(kpi.title);
            const TrendIcon = kpi.trend === 'up' ? ArrowUpRight : ArrowDownRight;
            return (
              <Card key={kpi.id} hover className="group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {kpi.value}
                    </p>
                  </div>
                  <div className={`
                    w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110
                    ${kpi.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}
                  `}>
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className={`
                    flex items-center px-2 py-1 rounded-full text-xs font-semibold
                    ${kpi.trend === 'up' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                    }
                  `}>
                    <TrendIcon className="h-3 w-3 mr-1" />
                    {Math.abs(kpi.change)}%
                  </div>
                  <span className="text-sm text-gray-600 ml-2">{kpi.period}</span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        {currentDataset && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {sampleCharts.map((chart) => (
              <div key={chart.id} className="animate-fade-in">
                <ChartRenderer
                  chart={chart}
                  data={currentDataset.data}
                />
              </div>
            ))}
          </div>
        )}

        {/* AI Insights */}
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Analyst Insights</h3>
                <p className="text-gray-600 text-sm">Latest analysis from your AI analyst</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-blue-900">Revenue Growth Analysis</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    📈 Your revenue growth of 8.2% is above industry average. The growth is primarily driven by increased order frequency rather than new customer acquisition.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-yellow-600 mt-1" />
                <div>
                  <h4 className="font-medium text-yellow-900">Customer Retention Opportunity</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    🎯 Average order value decreased by 2.1%. Consider implementing upselling strategies or product bundles to increase transaction value.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Next Steps</h3>
              <p className="text-gray-600">Recommended actions from your AI analyst</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Trends
              </Button>
              <Button size="sm">
                <Brain className="h-4 w-4 mr-2" />
                Ask AI Question
              </Button>
            </div>
          </div>
        </Card>

        {/* Floating Help/AI Assistant Icon */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button variant="primary" size="lg" className="rounded-full shadow-xl p-4">
            <Brain className="h-7 w-7" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};