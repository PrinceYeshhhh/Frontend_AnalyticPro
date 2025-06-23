import React, { useState } from 'react';
import { Brain, TrendingUp, TrendingDown, Lightbulb, Zap, Bell, AlertTriangle, Target, DollarSign, Users, ShoppingCart } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { AIInsightsPanel } from '../../components/ai/AIInsightsPanel';
import { PredictiveAnalytics } from '../../components/ai/PredictiveAnalytics';
import { SmartAlerts } from '../../components/ai/SmartAlerts';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const AIAnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'insights' | 'predictions' | 'alerts'>('insights');

  const tabs = [
    { 
      id: 'insights', 
      label: 'AI Insights', 
      icon: Brain,
      description: 'Automated data analysis and KPIs' 
    },
    { 
      id: 'predictions', 
      label: 'Forecasting', 
      icon: TrendingUp,
      description: 'Predictive analytics and trends' 
    },
    { 
      id: 'alerts', 
      label: 'Smart Alerts', 
      icon: Bell,
      description: 'AI-powered business alerts' 
    },
  ];

  // Sample AI insights for demonstration
  const sampleInsights = [
    {
      id: '1',
      type: 'alert',
      icon: TrendingDown,
      title: 'Sales Decline Alert',
      description: '📉 Sales dropped 12% last week, mainly due to Product C performance decline',
      impact: 'high',
      color: 'red'
    },
    {
      id: '2',
      type: 'opportunity',
      icon: TrendingUp,
      title: 'Growth Opportunity',
      description: '📈 Customer retention improved 25% - consider expanding loyalty program',
      impact: 'high',
      color: 'green'
    },
    {
      id: '3',
      type: 'insight',
      icon: Target,
      title: 'Seasonal Pattern Detected',
      description: '🎯 Weekend sales are 40% higher - optimize weekend marketing campaigns',
      impact: 'medium',
      color: 'blue'
    },
    {
      id: '4',
      type: 'recommendation',
      icon: Lightbulb,
      title: 'Pricing Optimization',
      description: '💡 Products in $50-75 range show highest conversion rates',
      impact: 'medium',
      color: 'purple'
    }
  ];

  const sampleKPIs = [
    {
      title: 'Revenue Growth',
      value: '+18.5%',
      change: 18.5,
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Customer Acquisition',
      value: '1,247',
      change: 12.3,
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Conversion Rate',
      value: '3.8%',
      change: -2.1,
      trend: 'down',
      icon: Target,
      color: 'red'
    },
    {
      title: 'Avg Order Value',
      value: '$127',
      change: 8.7,
      trend: 'up',
      icon: ShoppingCart,
      color: 'purple'
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="mb-8 px-4 md:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-extrabold text-gray-900">AI Analytics</h1>
              <p className="text-base text-gray-400 mb-6">Advanced insights powered by artificial intelligence</p>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card padding="sm" className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center space-x-3">
                <Zap className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900">Instant Analysis</h3>
                  <p className="text-sm text-blue-700">Get insights in seconds</p>
                </div>
              </div>
            </Card>
            
            <Card padding="sm" className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-900">Smart Forecasting</h3>
                  <p className="text-sm text-green-700">Predict future trends</p>
                </div>
              </div>
            </Card>
            
            <Card padding="sm" className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="flex items-center space-x-3">
                <Bell className="h-8 w-8 text-purple-600" />
                <div>
                  <h3 className="font-semibold text-purple-900">Smart Alerts</h3>
                  <p className="text-sm text-purple-700">Proactive notifications</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Sample KPIs */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Generated KPIs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sampleKPIs.map((kpi, index) => {
              const Icon = kpi.icon;
              return (
                <Card key={index} hover className="group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                      <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {kpi.value}
                      </p>
                    </div>
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110
                      ${kpi.color === 'green' ? 'bg-green-100' : 
                        kpi.color === 'blue' ? 'bg-blue-100' :
                        kpi.color === 'red' ? 'bg-red-100' : 'bg-purple-100'}
                    `}>
                      <Icon className={`h-6 w-6 ${
                        kpi.color === 'green' ? 'text-green-600' : 
                        kpi.color === 'blue' ? 'text-blue-600' :
                        kpi.color === 'red' ? 'text-red-600' : 'text-purple-600'
                      }`} />
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
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(kpi.change)}%
                    </div>
                    <span className="text-sm text-gray-600 ml-2">vs last month</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Sample AI Insights */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest AI Insights</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {sampleInsights.map((insight) => {
              const Icon = insight.icon;
              return (
                <Card key={insight.id} hover className="group">
                  <div className="flex items-start space-x-4">
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                      ${insight.color === 'red' ? 'bg-red-100' :
                        insight.color === 'green' ? 'bg-green-100' :
                        insight.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'}
                    `}>
                      <Icon className={`h-6 w-6 ${
                        insight.color === 'red' ? 'text-red-600' :
                        insight.color === 'green' ? 'text-green-600' :
                        insight.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {insight.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {insight.description}
                      </p>
                      <div className="mt-3">
                        <span className={`
                          px-2 py-1 rounded-full text-xs font-medium
                          ${insight.impact === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}
                        `}>
                          {insight.impact} impact
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <div className="text-left">
                      <div>{tab.label}</div>
                      <div className="text-xs text-gray-400 mt-1 hidden sm:block">{tab.description}</div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'insights' && <AIInsightsPanel />}
          {activeTab === 'predictions' && <PredictiveAnalytics />}
          {activeTab === 'alerts' && <SmartAlerts />}
        </div>
      </div>

      {/* Floating Help/AI Assistant Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button variant="primary" size="lg" className="rounded-full shadow-xl p-4">
          <Brain className="h-7 w-7" />
        </Button>
      </div>
    </DashboardLayout>
  );
};