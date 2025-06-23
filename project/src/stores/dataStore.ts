import { create } from 'zustand';
import { Dataset, Dashboard, Chart, KPIWidget, GoogleSheetsConnection, SmartAlert, TeamMember, TeamInvite, APIConnection } from '../types';

interface DataState {
  datasets: Dataset[];
  dashboards: Dashboard[];
  currentDashboard: Dashboard | null;
  googleSheetsConnections: GoogleSheetsConnection[];
  alerts: SmartAlert[];
  teamMembers: TeamMember[];
  teamInvites: TeamInvite[];
  apiConnections: APIConnection[];
  
  // Dataset actions
  addDataset: (dataset: Dataset) => void;
  removeDataset: (id: string) => void;
  updateDataset: (dataset: Dataset) => void;
  
  // Dashboard actions
  addDashboard: (dashboard: Dashboard) => void;
  updateDashboard: (dashboard: Dashboard) => void;
  removeDashboard: (id: string) => void;
  setCurrentDashboard: (dashboard: Dashboard | null) => void;
  duplicateDashboard: (id: string) => void;
  
  // Chart actions
  addChart: (dashboardId: string, chart: Chart) => void;
  removeChart: (dashboardId: string, chartId: string) => void;
  updateChart: (dashboardId: string, chart: Chart) => void;
  
  // KPI actions
  addKPI: (dashboardId: string, kpi: KPIWidget) => void;
  removeKPI: (dashboardId: string, kpiId: string) => void;
  updateKPI: (dashboardId: string, kpi: KPIWidget) => void;
  
  // Google Sheets actions
  addGoogleSheetsConnection: (connection: GoogleSheetsConnection) => void;
  removeGoogleSheetsConnection: (id: string) => void;
  
  // Alert actions
  addAlert: (alert: SmartAlert) => void;
  markAlertAsRead: (id: string) => void;
  dismissAlert: (id: string) => void;
  
  // Team actions
  addTeamMember: (member: TeamMember) => void;
  removeTeamMember: (id: string) => void;
  updateMemberRole: (id: string, role: TeamMember['role']) => void;
  addTeamInvite: (invite: TeamInvite) => void;
  removeTeamInvite: (id: string) => void;
  
  // API Connection actions
  addAPIConnection: (connection: APIConnection) => void;
  removeAPIConnection: (id: string) => void;
  updateAPIConnection: (connection: APIConnection) => void;
  
  // Sharing actions
  generateShareToken: (dashboardId: string) => string;
  updateShareSettings: (dashboardId: string, settings: any) => void;
}

export const useDataStore = create<DataState>((set, get) => ({
  datasets: [],
  dashboards: [],
  currentDashboard: null,
  googleSheetsConnections: [],
  alerts: [],
  teamMembers: [],
  teamInvites: [],
  apiConnections: [],
  
  addDataset: (dataset) =>
    set((state) => ({ datasets: [...state.datasets, dataset] })),
  
  removeDataset: (id) =>
    set((state) => ({
      datasets: state.datasets.filter((d) => d.id !== id),
    })),
  
  updateDataset: (dataset) =>
    set((state) => ({
      datasets: state.datasets.map((d) => d.id === dataset.id ? dataset : d),
    })),
  
  addDashboard: (dashboard) =>
    set((state) => ({ dashboards: [...state.dashboards, dashboard] })),
  
  updateDashboard: (dashboard) =>
    set((state) => ({
      dashboards: state.dashboards.map((d) =>
        d.id === dashboard.id ? dashboard : d
      ),
      currentDashboard:
        state.currentDashboard?.id === dashboard.id ? dashboard : state.currentDashboard,
    })),
  
  removeDashboard: (id) =>
    set((state) => ({
      dashboards: state.dashboards.filter((d) => d.id !== id),
      currentDashboard: state.currentDashboard?.id === id ? null : state.currentDashboard,
    })),
  
  setCurrentDashboard: (dashboard) =>
    set({ currentDashboard: dashboard }),
  
  duplicateDashboard: (id) =>
    set((state) => {
      const original = state.dashboards.find((d) => d.id === id);
      if (!original) return state;
      
      const duplicate = {
        ...original,
        id: Date.now().toString(),
        name: `${original.name} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isShared: false,
        shareToken: undefined,
      };
      
      return { dashboards: [...state.dashboards, duplicate] };
    }),
  
  addChart: (dashboardId, chart) =>
    set((state) => {
      const updatedDashboards = state.dashboards.map((d) =>
        d.id === dashboardId
          ? { ...d, charts: [...d.charts, chart], updatedAt: new Date().toISOString() }
          : d
      );
      return {
        dashboards: updatedDashboards,
        currentDashboard:
          state.currentDashboard?.id === dashboardId
            ? { ...state.currentDashboard, charts: [...state.currentDashboard.charts, chart] }
            : state.currentDashboard,
      };
    }),
  
  removeChart: (dashboardId, chartId) =>
    set((state) => {
      const updatedDashboards = state.dashboards.map((d) =>
        d.id === dashboardId
          ? { 
              ...d, 
              charts: d.charts.filter((c) => c.id !== chartId),
              updatedAt: new Date().toISOString()
            }
          : d
      );
      return {
        dashboards: updatedDashboards,
        currentDashboard:
          state.currentDashboard?.id === dashboardId
            ? { 
                ...state.currentDashboard, 
                charts: state.currentDashboard.charts.filter((c) => c.id !== chartId) 
              }
            : state.currentDashboard,
      };
    }),
  
  updateChart: (dashboardId, chart) =>
    set((state) => {
      const updatedDashboards = state.dashboards.map((d) =>
        d.id === dashboardId
          ? { 
              ...d, 
              charts: d.charts.map((c) => c.id === chart.id ? chart : c),
              updatedAt: new Date().toISOString()
            }
          : d
      );
      return {
        dashboards: updatedDashboards,
        currentDashboard:
          state.currentDashboard?.id === dashboardId
            ? { 
                ...state.currentDashboard, 
                charts: state.currentDashboard.charts.map((c) => c.id === chart.id ? chart : c)
              }
            : state.currentDashboard,
      };
    }),
  
  addKPI: (dashboardId, kpi) =>
    set((state) => {
      const updatedDashboards = state.dashboards.map((d) =>
        d.id === dashboardId
          ? { ...d, kpis: [...d.kpis, kpi], updatedAt: new Date().toISOString() }
          : d
      );
      return {
        dashboards: updatedDashboards,
        currentDashboard:
          state.currentDashboard?.id === dashboardId
            ? { ...state.currentDashboard, kpis: [...state.currentDashboard.kpis, kpi] }
            : state.currentDashboard,
      };
    }),
  
  removeKPI: (dashboardId, kpiId) =>
    set((state) => {
      const updatedDashboards = state.dashboards.map((d) =>
        d.id === dashboardId
          ? { 
              ...d, 
              kpis: d.kpis.filter((k) => k.id !== kpiId),
              updatedAt: new Date().toISOString()
            }
          : d
      );
      return {
        dashboards: updatedDashboards,
        currentDashboard:
          state.currentDashboard?.id === dashboardId
            ? { 
                ...state.currentDashboard, 
                kpis: state.currentDashboard.kpis.filter((k) => k.id !== kpiId) 
              }
            : state.currentDashboard,
      };
    }),
  
  updateKPI: (dashboardId, kpi) =>
    set((state) => {
      const updatedDashboards = state.dashboards.map((d) =>
        d.id === dashboardId
          ? { 
              ...d, 
              kpis: d.kpis.map((k) => k.id === kpi.id ? kpi : k),
              updatedAt: new Date().toISOString()
            }
          : d
      );
      return {
        dashboards: updatedDashboards,
        currentDashboard:
          state.currentDashboard?.id === dashboardId
            ? { 
                ...state.currentDashboard, 
                kpis: state.currentDashboard.kpis.map((k) => k.id === kpi.id ? kpi : k)
              }
            : state.currentDashboard,
      };
    }),
  
  addGoogleSheetsConnection: (connection) =>
    set((state) => ({
      googleSheetsConnections: [...state.googleSheetsConnections, connection],
    })),
  
  removeGoogleSheetsConnection: (id) =>
    set((state) => ({
      googleSheetsConnections: state.googleSheetsConnections.filter((c) => c.id !== id),
    })),
  
  addAlert: (alert) =>
    set((state) => ({ alerts: [alert, ...state.alerts] })),
  
  markAlertAsRead: (id) =>
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === id ? { ...alert, isRead: true } : alert
      ),
    })),
  
  dismissAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    })),
  
  addTeamMember: (member) =>
    set((state) => ({ teamMembers: [...state.teamMembers, member] })),
  
  removeTeamMember: (id) =>
    set((state) => ({
      teamMembers: state.teamMembers.filter((m) => m.id !== id),
    })),
  
  updateMemberRole: (id, role) =>
    set((state) => ({
      teamMembers: state.teamMembers.map((m) =>
        m.id === id ? { ...m, role } : m
      ),
    })),
  
  addTeamInvite: (invite) =>
    set((state) => ({ teamInvites: [...state.teamInvites, invite] })),
  
  removeTeamInvite: (id) =>
    set((state) => ({
      teamInvites: state.teamInvites.filter((i) => i.id !== id),
    })),
  
  addAPIConnection: (connection) =>
    set((state) => ({ apiConnections: [...state.apiConnections, connection] })),
  
  removeAPIConnection: (id) =>
    set((state) => ({
      apiConnections: state.apiConnections.filter((c) => c.id !== id),
    })),
  
  updateAPIConnection: (connection) =>
    set((state) => ({
      apiConnections: state.apiConnections.map((c) =>
        c.id === connection.id ? connection : c
      ),
    })),
  
  generateShareToken: (dashboardId) => {
    const token = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);
    
    set((state) => ({
      dashboards: state.dashboards.map((d) =>
        d.id === dashboardId
          ? { ...d, shareToken: token, isShared: true, updatedAt: new Date().toISOString() }
          : d
      ),
    }));
    
    return token;
  },
  
  updateShareSettings: (dashboardId, settings) =>
    set((state) => ({
      dashboards: state.dashboards.map((d) =>
        d.id === dashboardId
          ? { ...d, shareSettings: { ...d.shareSettings, ...settings }, updatedAt: new Date().toISOString() }
          : d
      ),
    })),
}));