import React, { useState } from 'react';
import { FileSpreadsheet, Plus, Trash2, RefreshCw, CheckCircle } from 'lucide-react';
import { useDataStore } from '../../stores/dataStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import toast from 'react-hot-toast';

export const GoogleSheetsConnect: React.FC = () => {
  const { googleSheetsConnections, addGoogleSheetsConnection, removeGoogleSheetsConnection } = useDataStore();
  const [showConnectForm, setShowConnectForm] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [formData, setFormData] = useState({
    spreadsheetId: '',
    sheetName: '',
    range: 'A1:Z1000',
  });

  const handleConnect = async () => {
    if (!formData.spreadsheetId || !formData.sheetName) {
      toast.error('Please fill in all required fields');
      return;
    }

    setConnecting(true);
    
    try {
      // Simulate Google Sheets OAuth and connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const connection = {
        id: Date.now().toString(),
        userId: '1',
        spreadsheetId: formData.spreadsheetId,
        spreadsheetName: `Sheet: ${formData.sheetName}`,
        sheetName: formData.sheetName,
        range: formData.range,
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        createdAt: new Date().toISOString(),
      };

      addGoogleSheetsConnection(connection);
      toast.success('Google Sheets connected successfully!');
      setShowConnectForm(false);
      setFormData({ spreadsheetId: '', sheetName: '', range: 'A1:Z1000' });
    } catch (error) {
      toast.error('Failed to connect to Google Sheets');
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = (id: string, name: string) => {
    if (window.confirm(`Disconnect from "${name}"?`)) {
      removeGoogleSheetsConnection(id);
      toast.success('Google Sheets disconnected');
    }
  };

  const handleSync = (name: string) => {
    toast.success(`Syncing data from "${name}"`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Google Sheets</h3>
          <p className="text-gray-600">Connect your Google Sheets for real-time data sync</p>
        </div>
        <Button onClick={() => setShowConnectForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Connect Sheet
        </Button>
      </div>

      {/* Connection Form */}
      {showConnectForm && (
        <Card>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Connect Google Sheets</h4>
          <div className="space-y-4">
            <Input
              label="Spreadsheet ID"
              value={formData.spreadsheetId}
              onChange={(e) => setFormData({ ...formData, spreadsheetId: e.target.value })}
              placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
              required
            />
            <Input
              label="Sheet Name"
              value={formData.sheetName}
              onChange={(e) => setFormData({ ...formData, sheetName: e.target.value })}
              placeholder="Sheet1"
              required
            />
            <Input
              label="Data Range"
              value={formData.range}
              onChange={(e) => setFormData({ ...formData, range: e.target.value })}
              placeholder="A1:Z1000"
            />
            <div className="flex space-x-3">
              <Button
                onClick={handleConnect}
                loading={connecting}
                className="flex-1"
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Connect
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowConnectForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Connected Sheets */}
      {googleSheetsConnections.length > 0 ? (
        <div className="grid gap-4">
          {googleSheetsConnections.map((connection) => (
            <Card key={connection.id} hover>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <FileSpreadsheet className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{connection.spreadsheetName}</h4>
                    <p className="text-sm text-gray-600">
                      {connection.sheetName} • {connection.range}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Connected
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSync(connection.spreadsheetName)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDisconnect(connection.id, connection.spreadsheetName)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        !showConnectForm && (
          <Card>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileSpreadsheet className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Google Sheets Connected</h3>
              <p className="text-gray-600 mb-6">Connect your Google Sheets to automatically sync data</p>
              <Button onClick={() => setShowConnectForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Connect Your First Sheet
              </Button>
            </div>
          </Card>
        )
      )}
    </div>
  );
};