import axios from 'axios';
import { Dataset, Dashboard, User, AIAnalysisResult, PredictiveModel, SmartRecommendation } from '../types';

// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.analyticspro.com' 
  : 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  signup: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
  },

  logout: async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token: string, password: string) => {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  },
};

// User API
export const userAPI = {
  getProfile: async (): Promise<User> => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<User>) => {
    const response = await api.put('/user/profile', data);
    return response.data;
  },

  updateSettings: async (settings: any) => {
    const response = await api.put('/user/settings', settings);
    return response.data;
  },

  deleteAccount: async () => {
    const response = await api.delete('/user/account');
    return response.data;
  },
};

// Dataset API
export const datasetAPI = {
  getAll: async (): Promise<Dataset[]> => {
    const response = await api.get('/datasets');
    return response.data;
  },

  getById: async (id: string): Promise<Dataset> => {
    const response = await api.get(`/datasets/${id}`);
    return response.data;
  },

  create: async (dataset: Omit<Dataset, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post('/datasets', dataset);
    return response.data;
  },

  update: async (id: string, dataset: Partial<Dataset>) => {
    const response = await api.put(`/datasets/${id}`, dataset);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/datasets/${id}`);
  },

  uploadFile: async (file: File, onProgress?: (progress: number) => void) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/datasets/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });

    return response.data;
  },

  preview: async (id: string, limit: number = 100) => {
    const response = await api.get(`/datasets/${id}/preview?limit=${limit}`);
    return response.data;
  },

  export: async (id: string, format: 'csv' | 'excel' | 'json') => {
    const response = await api.get(`/datasets/${id}/export?format=${format}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

// Dashboard API
export const dashboardAPI = {
  getAll: async (): Promise<Dashboard[]> => {
    const response = await api.get('/dashboards');
    return response.data;
  },

  getById: async (id: string): Promise<Dashboard> => {
    const response = await api.get(`/dashboards/${id}`);
    return response.data;
  },

  create: async (dashboard: Omit<Dashboard, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post('/dashboards', dashboard);
    return response.data;
  },

  update: async (id: string, dashboard: Partial<Dashboard>) => {
    const response = await api.put(`/dashboards/${id}`, dashboard);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/dashboards/${id}`);
  },

  duplicate: async (id: string) => {
    const response = await api.post(`/dashboards/${id}/duplicate`);
    return response.data;
  },

  share: async (id: string, settings: any) => {
    const response = await api.post(`/dashboards/${id}/share`, settings);
    return response.data;
  },

  export: async (id: string, format: 'pdf' | 'png' | 'excel') => {
    const response = await api.get(`/dashboards/${id}/export?format=${format}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

// AI Analytics API
export const aiAPI = {
  analyzeDataset: async (datasetId: string): Promise<AIAnalysisResult> => {
    const response = await api.post('/ai/analyze', { datasetId });
    return response.data;
  },

  generateForecast: async (datasetId: string, days: number = 7): Promise<PredictiveModel> => {
    const response = await api.post('/ai/forecast', { datasetId, days });
    return response.data;
  },

  getRecommendations: async (datasetId: string): Promise<SmartRecommendation[]> => {
    const response = await api.get(`/ai/recommendations/${datasetId}`);
    return response.data;
  },

  detectAnomalies: async (datasetId: string) => {
    const response = await api.post('/ai/anomalies', { datasetId });
    return response.data;
  },

  generateInsights: async (datasetId: string) => {
    const response = await api.post('/ai/insights', { datasetId });
    return response.data;
  },

  trainModel: async (datasetId: string, modelType: string) => {
    const response = await api.post('/ai/train', { datasetId, modelType });
    return response.data;
  },

  getModelStatus: async (modelId: string) => {
    const response = await api.get(`/ai/models/${modelId}/status`);
    return response.data;
  },
};

// Team API
export const teamAPI = {
  getMembers: async () => {
    const response = await api.get('/team/members');
    return response.data;
  },

  inviteMember: async (email: string, role: string) => {
    const response = await api.post('/team/invite', { email, role });
    return response.data;
  },

  updateMemberRole: async (memberId: string, role: string) => {
    const response = await api.put(`/team/members/${memberId}`, { role });
    return response.data;
  },

  removeMember: async (memberId: string) => {
    await api.delete(`/team/members/${memberId}`);
  },

  getInvites: async () => {
    const response = await api.get('/team/invites');
    return response.data;
  },

  cancelInvite: async (inviteId: string) => {
    await api.delete(`/team/invites/${inviteId}`);
  },
};

// Billing API
export const billingAPI = {
  getSubscription: async () => {
    const response = await api.get('/billing/subscription');
    return response.data;
  },

  updateSubscription: async (planId: string) => {
    const response = await api.post('/billing/subscription', { planId });
    return response.data;
  },

  getInvoices: async () => {
    const response = await api.get('/billing/invoices');
    return response.data;
  },

  downloadInvoice: async (invoiceId: string) => {
    const response = await api.get(`/billing/invoices/${invoiceId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },

  updatePaymentMethod: async (paymentMethodId: string) => {
    const response = await api.post('/billing/payment-method', { paymentMethodId });
    return response.data;
  },

  getUsage: async () => {
    const response = await api.get('/billing/usage');
    return response.data;
  },
};

// Integration API
export const integrationAPI = {
  connectGoogleSheets: async (credentials: any) => {
    const response = await api.post('/integrations/google-sheets/connect', credentials);
    return response.data;
  },

  syncGoogleSheets: async (connectionId: string) => {
    const response = await api.post(`/integrations/google-sheets/${connectionId}/sync`);
    return response.data;
  },

  disconnectGoogleSheets: async (connectionId: string) => {
    await api.delete(`/integrations/google-sheets/${connectionId}`);
  },

  getConnections: async () => {
    const response = await api.get('/integrations/connections');
    return response.data;
  },

  testConnection: async (connectionId: string) => {
    const response = await api.post(`/integrations/${connectionId}/test`);
    return response.data;
  },
};

// Alerts API
export const alertsAPI = {
  getAll: async () => {
    const response = await api.get('/alerts');
    return response.data;
  },

  create: async (alert: any) => {
    const response = await api.post('/alerts', alert);
    return response.data;
  },

  markAsRead: async (alertId: string) => {
    await api.put(`/alerts/${alertId}/read`);
  },

  dismiss: async (alertId: string) => {
    await api.delete(`/alerts/${alertId}`);
  },

  updateSettings: async (settings: any) => {
    const response = await api.put('/alerts/settings', settings);
    return response.data;
  },
};

// Analytics API
export const analyticsAPI = {
  getUsageStats: async () => {
    const response = await api.get('/analytics/usage');
    return response.data;
  },

  getPerformanceMetrics: async () => {
    const response = await api.get('/analytics/performance');
    return response.data;
  },

  trackEvent: async (event: string, properties: any) => {
    await api.post('/analytics/events', { event, properties });
  },
};

export default api;