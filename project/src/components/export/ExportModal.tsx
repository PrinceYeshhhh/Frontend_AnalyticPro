import React, { useState } from 'react';
import { X, Download, FileText, Image, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

interface ExportModalProps {
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ onClose }) => {
  const [exportFormat, setExportFormat] = useState<'pdf' | 'png' | 'csv'>('pdf');
  const [includeData, setIncludeData] = useState(true);
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      switch (exportFormat) {
        case 'pdf':
          toast.success('PDF exported successfully!');
          break;
        case 'png':
          toast.success('Image exported successfully!');
          break;
        case 'csv':
          toast.success('Data exported to CSV!');
          break;
      }
      
      onClose();
    } catch (error) {
      toast.error('Export failed. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const exportOptions = [
    {
      format: 'pdf' as const,
      icon: FileText,
      title: 'PDF Report',
      description: 'Complete dashboard with charts and data',
    },
    {
      format: 'png' as const,
      icon: Image,
      title: 'PNG Image',
      description: 'High-resolution dashboard screenshot',
    },
    {
      format: 'csv' as const,
      icon: Download,
      title: 'CSV Data',
      description: 'Raw data from all charts',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Export Dashboard</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Export Format</h3>
            <div className="space-y-2">
              {exportOptions.map(({ format, icon: Icon, title, description }) => (
                <button
                  key={format}
                  onClick={() => setExportFormat(format)}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                    exportFormat === format
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon className={`h-5 w-5 mr-3 ${
                      exportFormat === format ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <div>
                      <p className={`font-medium ${
                        exportFormat === format ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {title}
                      </p>
                      <p className="text-sm text-gray-600">{description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-900">Options</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Include Raw Data</p>
                <p className="text-xs text-gray-500">Attach data tables to export</p>
              </div>
              <input
                type="checkbox"
                checked={includeData}
                onChange={(e) => setIncludeData(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={exporting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              className="flex-1"
              loading={exporting}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};