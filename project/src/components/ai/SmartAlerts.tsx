import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingDown, TrendingUp, Bell, X, CheckCircle, Clock } from 'lucide-react';
import { useDataStore } from '../../stores/dataStore';
import { AIAnalyticsService } from '../../services/aiAnalytics';
import { SmartAlert } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

export const SmartAlerts: React.FC = () => {
  const { datasets, alerts, addAlert, markAlertAsRead, dismissAlert } = useDataStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateAlerts();
  }, [datasets]);

  const generateAlerts = async () => {
    if (datasets.length === 0) return;
    
    setLoading(true);
    try {
      for (const dataset of datasets) {
        const analysis = await AIAnalyticsService.analyzeSalesData(dataset);
        
        // Generate alerts based on analysis
        const newAlerts: SmartAlert[] = [];
        
        // Sales growth alerts
        if (analysis.kpis.sales_growth_pct < -10) {
          newAlerts.push({
            id: `sales-decline-${Date.now()}`,
            type: 'critical',
            title: 'Sales Decline Alert',
            message: `Sales have dropped by ${Math.abs(analysis.kpis.sales_growth_pct).toFixed(1)}% - immediate action required`,
            datasetId: dataset.id,
            isRead: false,
            createdAt: new Date().toISOString(),
            actionRequired: true,
            metric: 'sales_growth',
            threshold: -10,
            currentValue: analysis.kpis.sales_growth_pct
          });
        }
        
        // Low repeat customer rate
        if (analysis.kpis.repeat_customer_rate_pct < 15) {
          newAlerts.push({
            id: `retention-${Date.now()}`,
            type: 'warning',
            title: 'Low Customer Retention',
            message: `Only ${analysis.kpis.repeat_customer_rate_pct.toFixed(1)}% of customers are returning - consider loyalty programs`,
            datasetId: dataset.id,
            isRead: false,
            createdAt: new Date().toISOString(),
            actionRequired: true,
            metric: 'repeat_customer_rate',
            threshold: 15,
            currentValue: analysis.kpis.repeat_customer_rate_pct
          });
        }
        
        // Anomaly alerts
        analysis.anomalies.forEach((anomaly, index) => {
          newAlerts.push({
            id: `anomaly-${Date.now()}-${index}`,
            type: 'info',
            title: 'Data Anomaly Detected',
            message: `${anomaly.context}: ${anomaly.why}`,
            datasetId: dataset.id,
            isRead: false,
            createdAt: new Date().toISOString(),
            actionRequired: false,
            metric: anomaly.metric,
            currentValue: anomaly.value
          });
        });
        
        // Add alerts to store
        newAlerts.forEach(alert => addAlert(alert));
      }
    } catch (error) {
      console.error('Error generating alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAlertIcon = (type: SmartAlert['type']) => {
    switch (type) {
      case 'critical': return AlertTriangle;
      case 'warning': return TrendingDown;
      case 'info': return Bell;
      case 'success': return TrendingUp;
      default: return Bell;
    }
  };

  const getAlertColor = (type: SmartAlert['type']) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const unreadAlerts = alerts.filter(alert => !alert.isRead);
  const readAlerts = alerts.filter(alert => alert.isRead);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Bell className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Smart Alerts</h2>
            <p className="text-gray-600">AI-powered business alerts and notifications</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {unreadAlerts.length > 0 && (
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
              {unreadAlerts.length} unread
            </span>
          )}
          <Button onClick={generateAlerts} loading={loading}>
            <Bell className="h-4 w-4 mr-2" />
            Refresh Alerts
          </Button>
        </div>
      </div>

      {/* Unread Alerts */}
      {unreadAlerts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">New Alerts</h3>
          <div className="space-y-3">
            {unreadAlerts.map((alert) => {
              const Icon = getAlertIcon(alert.type);
              return (
                <Card key={alert.id} className={`border-l-4 ${getAlertColor(alert.type)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Icon className="h-5 w-5 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{alert.title}</h4>
                        <p className="text-sm mt-1">{alert.message}</p>
                        <div className="flex items-center mt-2 text-xs space-x-4">
                          <span>{new Date(alert.createdAt).toLocaleString()}</span>
                          {alert.actionRequired && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                              Action Required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAlertAsRead(alert.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dismissAlert(alert.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Read Alerts */}
      {readAlerts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous Alerts</h3>
          <div className="space-y-3">
            {readAlerts.slice(0, 10).map((alert) => {
              const Icon = getAlertIcon(alert.type);
              return (
                <Card key={alert.id} className="opacity-60 hover:opacity-80 transition-opacity">
                  <div className="flex items-start space-x-3">
                    <Icon className="h-5 w-5 mt-1 text-gray-400" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-700">{alert.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                      <span className="text-xs text-gray-400">
                        {new Date(alert.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissAlert(alert.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {alerts.length === 0 && !loading && (
        <Card>
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              All Clear!
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              No alerts at the moment. Our AI is monitoring your data and will notify you of any important changes.
            </p>
            <Button onClick={generateAlerts} loading={loading}>
              <Bell className="h-4 w-4 mr-2" />
              Check for Alerts
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};