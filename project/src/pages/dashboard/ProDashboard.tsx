import React, { useEffect } from 'react';
import { Brain, TrendingUp, DollarSign, Users, ShoppingCart, ArrowUpRight, ArrowDownRight, Zap, Target, BarChart3 } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ChartRenderer } from '../../components/charts/ChartRenderer';
import { useDataStore } from '../../stores/dataStore';
import { generateMockData } from '../../utils/dataParser';
import { Chart, KPIWidget } from '../../types';

export const ProDashboard: React.FC = () => {
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
      change: 15.3,
      trend: 'up',
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
    {
      id: '5',
      title: 'Customer LTV',
      value: '$324.50',
      change: 18.7,
      trend: 'up',
      period: 'vs last month',
    },
    {
      id: '6',
      title: 'Conversion Rate',
      value: '3.8%',
      change: 7.2,
      trend: 'up',
      period: 'vs last month',
    },
  ];

  const sampleCharts: Chart[] = [
    {
      id: '1',
      type: 'line',
      title: 'Revenue Forecast (Next 30 Days)',
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
      title: 'Customer Acquisition Trends',
      datasetId: 'mock-sales-data',
      xAxis: 'date',
      yAxis: 'customers',
      config: {
        colors: ['#10B981'],
        showGrid: true,
        showLegend: false,
        animate: true,
      },
    },
    {
      id: '3',
      type: 'line',
      title: 'Multi-Metric Performance',
      datasetId: 'mock-sales-data',
      xAxis: 'date',
      yAxis: 'orders',
      config: {
        colors: ['#8B5CF6'],
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
      case 'customer ltv':
        return Target;
      case 'conversion rate':
        return TrendingUp;
      default:
        return BarChart3;
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
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-extrabold text-gray-900">Pro AI Analyst Dashboard</h1>
                <p className="text-base text-gray-400 mb-6">Your team of 3 AI analysts working together</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="shadow-lg">
              <Target className="h-5 w-5" />
              Forecasting
            </Button>
            <Button className="shadow-lg">
              <Brain className="h-5 w-5" />
              AI Insights
            </Button>
          </div>
        </div>

        {/* AI Team Introduction */}
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Your AI Analytics Team is Active</h3>
              <p className="text-purple-800 mb-4">
                Three specialized AI analysts are continuously monitoring your business: a Senior Business Analyst, 
                Data Scientist, and Market Researcher. Together, they provide insights worth $15,000/month for just $70.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <p className="text-sm font-medium text-purple-900">📊 Business Analyst</p>
                  <p className="text-sm text-purple-700 mt-1">Revenue up 12.5% - growth accelerating</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <p className="text-sm font-medium text-purple-900">🔬 Data Scientist</p>
                  <p className="text-sm text-purple-700 mt-1">Predicting 18% growth next month</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <p className="text-sm font-medium text-purple-900">📈 Market Researcher</p>
                  <p className="text-sm text-purple-700 mt-1">Customer LTV trending upward</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Enhanced KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {kpis.map((kpi) => {
            const Icon = getKPIIcon(kpi.title);
            const TrendIcon = kpi.trend === 'up' ? ArrowUpRight : ArrowDownRight;
            return (
              <Card key={kpi.id} hover className="group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-200">
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

        {/* Advanced Charts */}
        {currentDataset && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-8">
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

        {/* AI Team Insights */}
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Team Insights & Forecasts</h3>
                <p className="text-gray-600 text-sm">Advanced analysis from your 3-person AI team</p>
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
                  <h4 className="font-medium text-blue-900">Revenue Forecast (Data Scientist)</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    📈 Predictive models show 18% revenue growth next month. Current trajectory suggests $145K revenue target is achievable.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-medium text-green-900">Customer Behavior (Market Researcher)</h4>
                  <p className="text-sm text-green-700 mt-1">
                    🎯 Customer LTV increased 18.7%. Repeat purchase rate is 34% above industry average. Focus on retention strategies.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Target className="h-5 w-5 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-medium text-purple-900">Optimization Opportunity (Business Analyst)</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    💡 Conversion rate at 3.8% can be improved. A/B testing on checkout flow could increase conversions by 15-25%.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <BarChart3 className="h-5 w-5 text-orange-600 mt-1" />
                <div>
                  <h4 className="font-medium text-orange-900">Anomaly Detection</h4>
                  <p className="text-sm text-orange-700 mt-1">
                    🔍 Unusual spike in weekend sales detected. Consider expanding weekend marketing campaigns for 20% boost.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Advanced Actions */}
        <Card>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Advanced Analytics</h3>
              <p className="text-gray-600">Pro-level insights and forecasting tools</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <Button variant="outline" size="sm">
                <Target className="h-4 w-4 mr-2" />
                Forecasting
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Multi-Metric Analysis
              </Button>
              <Button size="sm">
                <Brain className="h-4 w-4 mr-2" />
                Ask AI Team
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