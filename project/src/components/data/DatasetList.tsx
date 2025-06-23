import React from 'react';
import { format } from 'date-fns';
import { Database, Calendar, Trash2, Eye, Download } from 'lucide-react';
import { useDataStore } from '../../stores/dataStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

export const DatasetList: React.FC = () => {
  const { datasets, removeDataset } = useDataStore();

  const handleDelete = (id: string, name: string) => {
    removeDataset(id);
    toast.success(`"${name}" deleted successfully`);
  };

  const handlePreview = (name: string) => {
    toast.success(`Opening preview for "${name}"`);
  };

  const handleExport = (name: string) => {
    toast.success(`Exporting "${name}"`);
  };

  if (datasets.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Database className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No datasets yet</h3>
          <p className="text-gray-600 mb-6">Upload your first dataset to get started with analytics</p>
          <Button variant="primary">
            <Database className="h-4 w-4 mr-2" />
            Upload Dataset
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {datasets.map((dataset) => (
        <Card key={dataset.id} hover className="group">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                {dataset.name}
              </h3>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Database className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="font-medium">{dataset.data.length}</span> rows, 
                  <span className="font-medium ml-1">{dataset.columns.length}</span> columns
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-green-500" />
                  {format(new Date(dataset.createdAt), 'MMM d, yyyy')}
                </div>
              </div>

              <div className="mt-4">
                <span className={`
                  inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                  ${dataset.source === 'upload' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                  }
                `}>
                  {dataset.source === 'upload' ? 'File Upload' : 'Connected'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePreview(dataset.name)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleExport(dataset.name)}
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(dataset.id, dataset.name)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};