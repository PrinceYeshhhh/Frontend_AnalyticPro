import { Dataset, SmartAlert } from '../types';
import { BusinessIntelligenceService } from './businessIntelligence';
import { DatabaseService } from './database';

// Real-time analytics and monitoring service
export class RealTimeAnalyticsService {
  private static instance: RealTimeAnalyticsService;
  private bi: BusinessIntelligenceService;
  private db: DatabaseService;
  private monitoringIntervals: Map<string, NodeJS.Timeout> = new Map();
  private alertThresholds: Map<string, any> = new Map();
  private subscribers: Map<string, Function[]> = new Map();

  private constructor() {
    this.bi = BusinessIntelligenceService.getInstance();
    this.db = DatabaseService.getInstance();
  }

  static getInstance(): RealTimeAnalyticsService {
    if (!RealTimeAnalyticsService.instance) {
      RealTimeAnalyticsService.instance = new RealTimeAnalyticsService();
    }
    return RealTimeAnalyticsService.instance;
  }

  /**
   * Start real-time monitoring for a dataset
   */
  startMonitoring(datasetId: string, interval: number = 300000): void { // 5 minutes default
    if (this.monitoringIntervals.has(datasetId)) {
      this.stopMonitoring(datasetId);
    }

    const intervalId = setInterval(async () => {
      await this.performRealTimeCheck(datasetId);
    }, interval);

    this.monitoringIntervals.set(datasetId, intervalId);
  }

  /**
   * Stop monitoring for a dataset
   */
  stopMonitoring(datasetId: string): void {
    const intervalId = this.monitoringIntervals.get(datasetId);
    if (intervalId) {
      clearInterval(intervalId);
      this.monitoringIntervals.delete(datasetId);
    }
  }

  /**
   * Set alert thresholds for specific metrics
   */
  setAlertThresholds(datasetId: string, thresholds: any): void {
    this.alertThresholds.set(datasetId, {
      ...this.getDefaultThresholds(),
      ...thresholds,
      updatedAt: new Date().toISOString()
    });
  }

  /**
   * Subscribe to real-time updates
   */
  subscribe(datasetId: string, callback: Function): () => void {
    if (!this.subscribers.has(datasetId)) {
      this.subscribers.set(datasetId, []);
    }
    
    this.subscribers.get(datasetId)!.push(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.subscribers.get(datasetId);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }

  /**
   * Perform real-time analysis check
   */
  private async performRealTimeCheck(datasetId: string): Promise<void> {
    try {
      const dataset = await this.db.read<Dataset>('datasets', datasetId);
      if (!dataset) return;

      // Generate current analysis
      const currentAnalysis = await this.bi.generateBusinessRecommendations(dataset);
      const alerts = await this.bi.generateSmartAlerts(dataset);

      // Check for threshold violations
      const thresholdAlerts = this.checkThresholds(datasetId, dataset);
      
      // Combine all alerts
      const allAlerts = [...alerts, ...thresholdAlerts];

      // Store alerts in database
      for (const alert of allAlerts) {
        await this.db.create('alerts', alert);
      }

      // Notify subscribers
      this.notifySubscribers(datasetId, {
        type: 'update',
        timestamp: new Date().toISOString(),
        analysis: currentAnalysis,
        alerts: allAlerts,
        dataset: dataset
      });

      // Check for critical alerts
      const criticalAlerts = allAlerts.filter(alert => alert.type === 'critical');
      if (criticalAlerts.length > 0) {
        this.handleCriticalAlerts(datasetId, criticalAlerts);
      }

    } catch (error) {
      console.error(`Real-time check failed for dataset ${datasetId}:`, error);
      
      this.notifySubscribers(datasetId, {
        type: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    }
  }

  /**
   * Check custom thresholds
   */
  private checkThresholds(datasetId: string, dataset: Dataset): SmartAlert[] {
    const thresholds = this.alertThresholds.get(datasetId) || this.getDefaultThresholds();
    const alerts: SmartAlert[] = [];

    // Calculate current metrics
    const data = dataset.data;
    if (!data || data.length === 0) return alerts;

    const recentData = data.slice(-24); // Last 24 records
    const currentMetrics = this.calculateCurrentMetrics(recentData);

    // Check each threshold
    Object.entries(thresholds).forEach(([metric, threshold]) => {
      if (metric === 'updatedAt') return;

      const currentValue = currentMetrics[metric];
      if (currentValue !== undefined) {
        const alert = this.evaluateThreshold(metric, currentValue, threshold, datasetId);
        if (alert) alerts.push(alert);
      }
    });

    return alerts;
  }

  /**
   * Calculate current metrics from recent data
   */
  private calculateCurrentMetrics(data: any[]): any {
    if (data.length === 0) return {};

    const columns = this.detectColumns(data[0]);
    
    const totalSales = data.reduce((sum, row) => 
      sum + (Number(row[columns.revenue]) || 0), 0
    );
    
    const avgOrderValue = data.length > 0 ? totalSales / data.length : 0;
    
    const uniqueCustomers = new Set(
      data.map(row => row[columns.customer]).filter(Boolean)
    ).size;

    // Calculate growth rate (comparing first half vs second half)
    const midPoint = Math.floor(data.length / 2);
    const firstHalf = data.slice(0, midPoint);
    const secondHalf = data.slice(midPoint);
    
    const firstHalfSales = firstHalf.reduce((sum, row) => 
      sum + (Number(row[columns.revenue]) || 0), 0
    );
    const secondHalfSales = secondHalf.reduce((sum, row) => 
      sum + (Number(row[columns.revenue]) || 0), 0
    );
    
    const growthRate = firstHalfSales > 0 ? 
      ((secondHalfSales - firstHalfSales) / firstHalfSales) * 100 : 0;

    return {
      totalSales,
      avgOrderValue,
      uniqueCustomers,
      growthRate,
      orderCount: data.length,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Evaluate threshold and create alert if violated
   */
  private evaluateThreshold(
    metric: string, 
    currentValue: number, 
    threshold: any, 
    datasetId: string
  ): SmartAlert | null {
    const { min, max, type = 'warning' } = threshold;
    
    let violated = false;
    let message = '';

    if (min !== undefined && currentValue < min) {
      violated = true;
      message = `${metric} (${currentValue.toFixed(2)}) is below minimum threshold (${min})`;
    } else if (max !== undefined && currentValue > max) {
      violated = true;
      message = `${metric} (${currentValue.toFixed(2)}) exceeds maximum threshold (${max})`;
    }

    if (!violated) return null;

    return {
      id: `threshold-${metric}-${Date.now()}`,
      type: type as any,
      title: `Threshold Alert: ${metric}`,
      message,
      datasetId,
      isRead: false,
      createdAt: new Date().toISOString(),
      actionRequired: type === 'critical',
      metric,
      threshold: min || max,
      currentValue,
      category: 'threshold'
    };
  }

  /**
   * Handle critical alerts
   */
  private handleCriticalAlerts(datasetId: string, alerts: SmartAlert[]): void {
    // Send immediate notifications
    alerts.forEach(alert => {
      this.sendCriticalNotification(alert);
    });

    // Log critical events
    console.warn(`CRITICAL ALERTS for dataset ${datasetId}:`, alerts);

    // Notify all subscribers of critical situation
    this.notifySubscribers(datasetId, {
      type: 'critical',
      timestamp: new Date().toISOString(),
      alerts
    });
  }

  /**
   * Send critical notification
   */
  private sendCriticalNotification(alert: SmartAlert): void {
    // In a real implementation, this would send emails, SMS, Slack messages, etc.
    console.error(`CRITICAL ALERT: ${alert.title} - ${alert.message}`);
    
    // Browser notification if supported
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`Critical Alert: ${alert.title}`, {
        body: alert.message,
        icon: '/favicon.ico',
        tag: alert.id
      });
    }
  }

  /**
   * Notify subscribers
   */
  private notifySubscribers(datasetId: string, data: any): void {
    const callbacks = this.subscribers.get(datasetId);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Subscriber callback error:', error);
        }
      });
    }
  }

  /**
   * Get default alert thresholds
   */
  private getDefaultThresholds(): any {
    return {
      totalSales: { min: 1000 },
      avgOrderValue: { min: 25, max: 1000 },
      growthRate: { min: -20, max: 500 },
      orderCount: { min: 5 },
      uniqueCustomers: { min: 1 }
    };
  }

  /**
   * Detect column names in data
   */
  private detectColumns(sampleRow: any) {
    const keys = Object.keys(sampleRow || {});
    
    return {
      revenue: this.findColumn(keys, ['order_amount', 'sales', 'revenue', 'amount', 'total']),
      customer: this.findColumn(keys, ['customer_id', 'user_id', 'customer']),
      product: this.findColumn(keys, ['product_name', 'product', 'item']),
      date: this.findColumn(keys, ['date', 'order_date', 'created_at', 'timestamp'])
    };
  }

  private findColumn(keys: string[], possibleNames: string[]): string {
    for (const name of possibleNames) {
      const found = keys.find(key => key.toLowerCase().includes(name.toLowerCase()));
      if (found) return found;
    }
    return keys[0] || 'unknown';
  }

  /**
   * Get monitoring status
   */
  getMonitoringStatus(): any {
    return {
      activeMonitors: Array.from(this.monitoringIntervals.keys()),
      subscriberCounts: Object.fromEntries(
        Array.from(this.subscribers.entries()).map(([key, callbacks]) => [key, callbacks.length])
      ),
      thresholdConfigs: Object.fromEntries(this.alertThresholds.entries())
    };
  }

  /**
   * Cleanup resources
   */
  cleanup(): void {
    // Stop all monitoring
    this.monitoringIntervals.forEach((intervalId, datasetId) => {
      clearInterval(intervalId);
    });
    
    this.monitoringIntervals.clear();
    this.subscribers.clear();
    this.alertThresholds.clear();
  }
}

export const realTimeAnalytics = RealTimeAnalyticsService.getInstance();