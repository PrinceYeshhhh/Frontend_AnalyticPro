import React, { useEffect } from 'react';
import { Plus, TrendingUp, DollarSign, Users, ShoppingCart, ArrowUpRight, ArrowDownRight, Brain, Zap } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ChartRenderer } from '../../components/charts/ChartRenderer';
import { useDataStore } from '../../stores/dataStore';
import { generateMockData } from '../../utils/dataParser';
import { Chart, KPIWidget } from '../../types';

export const Dashboard: React.FC = () => {
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
      value: '$124,532',
      change: 12.5,
      trend: 'up',
      period: 'vs last month',
    },
    {
      id: '2',
      title: 'Orders',
      value: '1,429',
      change: 8.2,
      trend: 'up',
      period: 'vs last month',
    },
    {
      id: '3',
      title: 'Customers',
      value: '892',
      change: -2.1,
      trend: 'down',
      period: 'vs last month',
    },
    {
      id: '4',
      title: 'Avg Order Value',
      value: '$87.12',
      change: 5.4,
      trend: 'up',
      period: 'vs last month',
    },
  ];

  const sampleCharts: Chart[] = [
    {
      id: '1',
      type: 'line',
      title: 'Sales Over Time',
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
      title: 'Orders by Month',
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
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Dashboard Overview</h1>
            <p className="text-base text-gray-400 mb-6">Monitor your key business metrics and performance</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="shadow-lg">
              <Brain className="h-5 w-5" />
              AI Insights
            </Button>
            <Button className="shadow-lg">
              <Plus className="h-5 w-5" />
              New Chart
            </Button>
          </div>
        </div>

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
                    ${kpi.trend === 'up' ? 'bg-green-100' : 'bg-blue-100'}
                  `}>
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${kpi.trend === 'up' ? 'text-green-600' : 'text-blue-600'}`} />
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

        {/* AI Insights Preview */}
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
                <p className="text-gray-600 text-sm">Latest insights from your data</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Zap className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-blue-900">Revenue Growth</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    📈 Revenue increased 12.5% this month, driven by higher customer retention
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-medium text-green-900">Customer Behavior</h4>
                  <p className="text-sm text-green-700 mt-1">
                    🎯 Weekend sales are 40% higher - optimize weekend campaigns
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
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Quick Actions</h3>
              <p className="text-gray-600">Common tasks to manage your analytics</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <Button variant="outline" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Reports
              </Button>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Invite Team
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Widget
              </Button>
            </div>
          </div>
        </Card>

        {/* Empty State */}
        {datasets.length === 0 && (
          <Card>
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-3">
                No data yet. Upload a file to get started!
              </h3>
              <p className="text-base text-gray-400 mb-8 max-w-md mx-auto">
                Upload your first dataset to start creating powerful dashboards and gain insights from your data
              </p>
              <Button size="lg" className="shadow-lg">
                <Plus className="h-5 w-5" />
                Upload Your First Dataset
              </Button>
            </div>
          </Card>
        )}

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