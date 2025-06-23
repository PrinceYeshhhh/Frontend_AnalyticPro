import { useState, useEffect, useCallback } from 'react';
import { realTimeAnalytics } from '../services/realTimeAnalytics';
import { SmartAlert, SmartRecommendation } from '../types';

interface RealTimeData {
  analysis: SmartRecommendation[];
  alerts: SmartAlert[];
  metrics: any;
  lastUpdated: string;
  isConnected: boolean;
  error?: string;
}

export const useRealTimeAnalytics = (datasetId: string, enabled: boolean = true) => {
  const [data, setData] = useState<RealTimeData>({
    analysis: [],
    alerts: [],
    metrics: {},
    lastUpdated: '',
    isConnected: false
  });

  const [thresholds, setThresholds] = useState<any>({});

  // Update alert thresholds
  const updateThresholds = useCallback((newThresholds: any) => {
    realTimeAnalytics.setAlertThresholds(datasetId, newThresholds);
    setThresholds(newThresholds);
  }, [datasetId]);

  // Start/stop monitoring
  const toggleMonitoring = useCallback((enable: boolean) => {
    if (enable) {
      realTimeAnalytics.startMonitoring(datasetId);
    } else {
      realTimeAnalytics.stopMonitoring(datasetId);
    }
  }, [datasetId]);

  useEffect(() => {
    if (!enabled || !datasetId) return;

    // Subscribe to real-time updates
    const unsubscribe = realTimeAnalytics.subscribe(datasetId, (update: any) => {
      setData(prevData => ({
        ...prevData,
        ...update,
        lastUpdated: update.timestamp,
        isConnected: true,
        error: update.error
      }));
    });

    // Start monitoring
    realTimeAnalytics.startMonitoring(datasetId);

    return () => {
      unsubscribe();
      realTimeAnalytics.stopMonitoring(datasetId);
    };
  }, [datasetId, enabled]);

  return {
    data,
    thresholds,
    updateThresholds,
    toggleMonitoring,
    isMonitoring: enabled
  };
};