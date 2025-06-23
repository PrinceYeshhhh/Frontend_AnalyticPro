import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, RefreshCw, Zap } from 'lucide-react';
import { useDataStore } from '../../stores/dataStore';
import { AIAnalyticsService } from '../../services/aiAnalytics';
import { AIAnalysisResult, SmartRecommendation } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

export const AIInsightsPanel: React.FC = () => {
  const { datasets } = useDataStore();
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<string>('');

  useEffect(() => {
    if (datasets.length > 0 && !selectedDataset) {
      setSelectedDataset(datasets[0].id);
    }
  }, [datasets, selectedDataset]);

  const runAnalysis = async () => {
    if (!selectedDataset) {
      toast.error('Please select a dataset to analyze');
      return;
    }

    const dataset = datasets.find(d => d.id === selectedDataset);
    if (!dataset) return;

    setLoading(true);
    try {
      const [analysisResult, recommendationsResult] = await Promise.all([
        AIAnalyticsService.analyzeSalesData(dataset),
        AIAnalyticsService.generateRecommendations(dataset)
      ]);

      setAnalysis(analysisResult);
      setRecommendations(recommendationsResult);
      toast.success('AI analysis completed successfully!');
    } catch (error) {
      toast.error('Failed to analyze data');
      console.error('AI Analysis error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'optimization': return TrendingUp;
      case 'alert': return AlertTriangle;
      case 'opportunity': return Lightbulb;
      default: return Brain;
    }
  };

  if (datasets.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
          <p className="text-gray-600">Upload a dataset to start AI-powered analysis</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">AI Analytics</h2>
            <p className="text-gray-600">Powered by advanced data science</p>
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
          
          <Button onClick={runAnalysis} loading={loading} className="shadow-lg">
            <RefreshCw className="h-4 w-4 mr-2" />
            Analyze Data
          </Button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <>
          {/* KPIs Overview */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-blue-600" />
              Key Performance Indicators
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  ${analysis.kpis.total_sales.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Total Sales</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {analysis.kpis.total_orders.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">
                  {analysis.kpis.unique_customers.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Unique Customers</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">
                  ${analysis.kpis.average_order_value.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">Avg Order Value</p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-lg font-semibold text-gray-900">
                  {analysis.kpis.repeat_customer_rate_pct.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600">Repeat Customer Rate</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className={`text-lg font-semibold ${
                  analysis.kpis.sales_growth_pct >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {analysis.kpis.sales_growth_pct >= 0 ? '+' : ''}{analysis.kpis.sales_growth_pct.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600">Sales Growth</p>
              </div>
            </div>
          </Card>

          {/* Top Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products by Sales</h3>
              <div className="space-y-3">
                {analysis.kpis.top_products_by_sales.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{product.product}</span>
                    <span className="text-green-600 font-semibold">${product.sales.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products by Quantity</h3>
              <div className="space-y-3">
                {analysis.kpis.top_products_by_qty.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{product.product}</span>
                    <span className="text-blue-600 font-semibold">{product.qty.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Anomalies */}
          {analysis.anomalies.length > 0 && (
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                Detected Anomalies
              </h3>
              <div className="space-y-3">
                {analysis.anomalies.map((anomaly, index) => (
                  <div key={index} className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-orange-900">{anomaly.context}</p>
                        <p className="text-sm text-orange-700 mt-1">{anomaly.why}</p>
                      </div>
                      <span className="text-lg font-bold text-orange-600">
                        ${anomaly.value.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Insights */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
              AI-Generated Insights
            </h3>
            <div className="space-y-2">
              {analysis.insights.map((insight, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {insight}
                </p>
              ))}
            </div>
          </Card>

          {/* Suggestions */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Actionable Suggestions
            </h3>
            <div className="space-y-2">
              {analysis.suggestions.map((suggestion, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {suggestion}
                </p>
              ))}
            </div>
          </Card>
        </>
      )}

      {/* Smart Recommendations */}
      {recommendations.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Brain className="h-5 w-5 mr-2 text-purple-600" />
            Smart Recommendations
          </h3>
          <div className="space-y-4">
            {recommendations.map((rec) => {
              const Icon = getRecommendationIcon(rec.type);
              return (
                <div key={rec.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Icon className="h-5 w-5 mt-1 text-gray-600" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                        <p className="text-gray-600 mt-1">{rec.description}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(rec.impact)}`}>
                      {rec.impact} impact
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Empty State */}
      {!analysis && !loading && (
        <Card>
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Ready for AI Analysis
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Click "Analyze Data" to get AI-powered insights, anomaly detection, and smart recommendations for your business
            </p>
            <Button onClick={runAnalysis} size="lg" className="shadow-lg">
              <Brain className="h-5 w-5 mr-2" />
              Start AI Analysis
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};