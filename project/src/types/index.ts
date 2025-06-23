export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  businessType: string;
  customBusinessType?: string;
  plan: 'solo' | 'pro' | 'elite';
  createdAt: string;
}

export interface Dashboard {
  id: string;
  userId: string;
  name: string;
  description?: string;
  charts: Chart[];
  kpis: KPIWidget[];
  createdAt: string;
  updatedAt: string;
  isShared: boolean;
  shareToken?: string;
  shareSettings: ShareSettings;
  layout: DashboardLayout;
}

export interface ShareSettings {
  isPublic: boolean;
  allowEdit: boolean;
  expiresAt?: string;
  password?: string;
}

export interface DashboardLayout {
  grid: GridItem[];
  columns: number;
}

export interface GridItem {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  type: 'chart' | 'kpi';
}

export interface Chart {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter';
  title: string;
  datasetId: string;
  xAxis: string;
  yAxis: string;
  config: ChartConfig;
  filters?: ChartFilter[];
}

export interface ChartFilter {
  column: string;
  operator: 'equals' | 'contains' | 'greater' | 'less';
  value: string | number;
}

export interface ChartConfig {
  colors: string[];
  showGrid: boolean;
  showLegend: boolean;
  animate: boolean;
  aggregation?: 'sum' | 'avg' | 'count' | 'max' | 'min';
}

export interface Dataset {
  id: string;
  userId: string;
  name: string;
  source: 'upload' | 'google_sheets' | 'api';
  columns: DataColumn[];
  data: Record<string, any>[];
  createdAt: string;
  updatedAt: string;
  syncSettings?: SyncSettings;
}

export interface SyncSettings {
  autoSync: boolean;
  syncInterval: number; // minutes
  lastSync?: string;
  googleSheetsId?: string;
  apiEndpoint?: string;
}

export interface DataColumn {
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  nullable: boolean;
}

export interface KPIWidget {
  id: string;
  title: string;
  value: number | string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  period: string;
  datasetId?: string;
  metric?: string;
  comparison?: 'previous_period' | 'previous_year' | 'target';
  format?: 'number' | 'currency' | 'percentage';
}

export interface AIInsight {
  id: string;
  type: 'trend' | 'anomaly' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  dataPoints: string[];
  createdAt: string;
}

export interface GoogleSheetsConnection {
  id: string;
  userId: string;
  spreadsheetId: string;
  spreadsheetName: string;
  sheetName: string;
  range: string;
  accessToken: string;
  refreshToken: string;
  createdAt: string;
}

// Phase 3 - AI Analytics Types
export interface AIAnalysisResult {
  kpis: {
    total_sales: number;
    total_orders: number;
    unique_customers: number;
    average_order_value: number;
    repeat_customer_rate_pct: number;
    sales_growth_pct: number;
    top_products_by_sales: Array<{ product: string; sales: number }>;
    top_products_by_qty: Array<{ product: string; qty: number }>;
  };
  timeseries: {
    daily_sales: Array<{ date: string; sales: number }>;
    monthly_sales: Array<{ month: string; sales: number }>;
  };
  anomalies: Array<{
    context: string;
    metric: string;
    value: number;
    why: string;
  }>;
  insights: string[];
  suggestions: string[];
}

export interface SmartRecommendation {
  id: string;
  type: 'optimization' | 'alert' | 'opportunity';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  createdAt: string;
}

export interface PredictiveModel {
  id: string;
  name: string;
  type: 'sales_forecast' | 'customer_churn' | 'inventory_demand';
  accuracy: number;
  predictions: Array<{
    date: string;
    value: number;
    confidence: number;
  }>;
  lastTrained: string;
}

// Phase 4 - Advanced Features Types
export interface SmartAlert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  datasetId: string;
  isRead: boolean;
  createdAt: string;
  actionRequired: boolean;
  metric?: string;
  threshold?: number;
  currentValue?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar: string;
  joinedAt: string;
  lastActive: string;
  status: 'active' | 'inactive';
}

export interface TeamInvite {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  invitedBy: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface APIConnection {
  id: string;
  name: string;
  type: 'stripe' | 'shopify' | 'salesforce' | 'hubspot' | 'custom';
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  config: Record<string, any>;
  createdAt: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: {
    type: 'threshold' | 'anomaly' | 'schedule';
    condition: string;
    value?: number;
  };
  action: {
    type: 'email' | 'slack' | 'webhook';
    config: Record<string, any>;
  };
  isActive: boolean;
  createdAt: string;
  lastTriggered?: string;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  dashboardIds: string[];
  schedule: {
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string;
    recipients: string[];
  };
  format: 'pdf' | 'excel' | 'email';
  isActive: boolean;
  createdAt: string;
  lastSent?: string;
}

export interface PlanFeatures {
  id: 'solo' | 'pro' | 'elite';
  name: string;
  description: string;
  price: number;
  idealFor: string[];
  features: string[];
  analystEquivalent: string;
  costComparison: string;
  recommended?: boolean;
}