import React, { useEffect } from 'react';
import { Crown, TrendingUp, DollarSign, Users, ShoppingCart, ArrowUpRight, ArrowDownRight, Brain, Zap, Target, BarChart3, AlertTriangle, Lightbulb } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ChartRenderer } from '../../components/charts/ChartRenderer';
import { useDataStore } from '../../stores/dataStore';
import { generateMockData } from '../../utils/dataParser';
import { Chart, KPIWidget } from '../../types';

export const EliteDashboard: React.FC = () => {
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
      value: '$2.4M',
      change: 24.8,
      trend: 'up',
      period: 'vs last month',
    },
    {
      id: '2',
      title: 'Orders',
      value: '12,429',
      change: 18.2,
      trend: 'up',
      period: 'vs last month',
    },
    {
      id: '3',
      title: 'Customers',
      value: '8,924',
      change: 22.3,
      trend: 'up',
      period: 'vs last month',
    },
    {
      id: '4',
      title: 'Avg Order Value',
      value: '$193.45',
      change: 12.4,
      trend: 'up',
      period: 'vs last month',
    },
    {
      id: '5',
      title: 'Customer LTV',
      value: '$1,247.50',
      change: 28.7,
      trend: 'up',
      period: 'vs last month',
    },
    {
      id: '6',
      title: 'Market Share',
      value: '12.8%',
      change: 15.2,
      trend: 'up',
      period: 'vs last quarter',
    },
    {
      id: '7',
      title: 'Profit Margin',
      value: '34.2%',
      change: 8.1,
      trend: 'up',
      period: 'vs last month',
    },
    {
      id: '8',
      title: 'Churn Rate',
      value: '2.1%',
      change: -18.5,
      trend: 'up',
      period: 'vs last month',
    },
  ];

  const sampleCharts: Chart[] = [
    {
      id: '1',
      type: 'line',
      title: 'Advanced Revenue Forecasting',
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
      title: 'Customer Segmentation Analysis',
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
      title: 'Market Trend Analysis',
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
    {
      id: '4',
      type: 'bar',
      title: 'Competitive Intelligence',
      datasetId: 'mock-sales-data',
      xAxis: 'category',
      yAxis: 'profit',
      config: {
        colors: ['#F59E0B'],
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
      case 'market share':
        return TrendingUp;
      case 'profit margin':
        return BarChart3;
      case 'churn rate':
        return AlertTriangle;
      default:
        return Crown;
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
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-extrabold text-gray-900">Elite AI Team Dashboard</h1>
                <p className="text-base text-gray-400 mb-6">Full AI analytics team with enterprise capabilities</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="shadow-lg">
              <AlertTriangle className="h-5 w-5" />
              Real-time Alerts
            </Button>
            <Button variant="outline" className="shadow-lg">
              <Target className="h-5 w-5" />
              Advanced Analytics
            </Button>
            <Button className="shadow-lg">
              <Brain className="h-5 w-5" />
              AI Recommendations
            </Button>
          </div>
        </div>

        {/* Elite AI Team Introduction */}
        <Card className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Elite AI Analytics Team Active</h3>
              <p className="text-yellow-800 mb-4">
                Your full AI analytics team is monitoring your enterprise: Senior Business Analyst, Data Scientist, 
                Market Researcher, Risk Analyst, and Strategy Consultant. Combined value: $50,000/month for just $250.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-3 border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-900">📊 Business Analyst</p>
                  <p className="text-sm text-yellow-700 mt-1">Revenue up 24.8% - exceptional growth</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-900">🔬 Data Scientist</p>
                  <p className="text-sm text-yellow-700 mt-1">Predicting 32% growth next quarter</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-900">📈 Market Researcher</p>
                  <p className="text-sm text-yellow-700 mt-1">Market share increased to 12.8%</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-900">⚠️ Risk Analyst</p>
                  <p className="text-sm text-yellow-700 mt-1">Low risk profile - all metrics healthy</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Enterprise KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {kpis.map((kpi) => {
            const Icon = getKPIIcon(kpi.title);
            const TrendIcon = kpi.trend === 'up' ? ArrowUpRight : ArrowDownRight;
            const isPositive = kpi.title.toLowerCase().includes('churn') ? kpi.trend === 'down' : kpi.trend === 'up';
            
            return (
              <Card key={kpi.id} hover className="group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-200">
                      {kpi.value}
                    </p>
                  </div>
                  <div className={`
                    w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110
                    ${isPositive ? 'bg-green-100' : 'bg-red-100'}
                  `}>
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className={`
                    flex items-center px-2 py-1 rounded-full text-xs font-semibold
                    ${isPositive 
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

        {/* Enterprise Charts Grid */}
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

        {/* Elite AI Insights */}
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Elite AI Team Insights</h3>
                <p className="text-gray-600 text-sm">Enterprise-level analysis and strategic recommendations</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Zap className="h-4 w-4 mr-2" />
              Real-time Updates
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-blue-900">Strategic Growth (Strategy Consultant)</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    📈 24.8% revenue growth positions you in top 5% of industry. Recommend expanding to 3 new markets for 40% additional growth.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Target className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-medium text-green-900">Market Dominance (Market Researcher)</h4>
                  <p className="text-sm text-green-700 mt-1">
                    🎯 12.8% market share with 15.2% growth. Competitive analysis shows opportunity to reach 18% share within 6 months.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Brain className="h-5 w-5 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-medium text-purple-900">AI Optimization (Data Scientist)</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    🤖 Customer LTV optimization model suggests 45% improvement possible through personalized pricing strategies.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-1" />
                <div>
                  <h4 className="font-medium text-orange-900">Risk Assessment (Risk Analyst)</h4>
                  <p className="text-sm text-orange-700 mt-1">
                    ⚠️ Low risk profile detected. 2.1% churn rate is excellent. Monitor for seasonal variations in Q4.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 text-yellow-600 mt-1" />
                <div>
                  <h4 className="font-medium text-yellow-900">Innovation Opportunity</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    💡 Customer behavior patterns suggest demand for premium tier. Launch could generate additional $500K monthly.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Crown className="h-5 w-5 text-indigo-600 mt-1" />
                <div>
                  <h4 className="font-medium text-indigo-900">Executive Summary</h4>
                  <p className="text-sm text-indigo-700 mt-1">
                    👑 All metrics exceed industry benchmarks. Business is positioned for aggressive expansion and market leadership.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Enterprise Actions */}
        <Card>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Enterprise Analytics Suite</h3>
              <p className="text-gray-600">Advanced tools for enterprise-level decision making</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <Button variant="outline" size="sm">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Risk Analysis
              </Button>
              <Button variant="outline" size="sm">
                <Target className="h-4 w-4 mr-2" />
                Strategic Planning
              </Button>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Team Collaboration
              </Button>
              <Button size="sm">
                <Crown className="h-4 w-4 mr-2" />
                Executive Report
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