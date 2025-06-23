import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle, CheckCircle, Eye, Brain, Sparkles } from 'lucide-react';
import { parseCSV, parseExcel } from '../../utils/dataParser';
import { useDataStore } from '../../stores/dataStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

export const FileUpload: React.FC = () => {
  const { addDataset } = useDataStore();
  const [uploadedData, setUploadedData] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [processing, setProcessing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setProcessing(true);
    const loadingToast = toast.loading(
      <div className="flex items-center">
        <Brain className="h-5 w-5 mr-2 animate-pulse" />
        AI is processing your file...
      </div>,
      {
        style: {
          background: '#3B82F6',
          color: 'white',
        },
      }
    );

    try {
      let dataset;
      
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        dataset = await parseCSV(file);
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        dataset = await parseExcel(file);
      } else {
        throw new Error('Unsupported file type');
      }

      setUploadedData(dataset);
      setShowPreview(true);
      
      toast.success(
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          File processed successfully! Preview ready.
        </div>,
        { id: loadingToast }
      );
    } catch (error) {
      toast.error('Failed to process file', { id: loadingToast });
      console.error('File upload error:', error);
    } finally {
      setProcessing(false);
    }
  }, []);

  const handleConfirmUpload = () => {
    if (uploadedData) {
      addDataset(uploadedData);
      toast.success(
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 mr-2" />
          Dataset added! AI insights are being generated...
        </div>
      );
      setUploadedData(null);
      setShowPreview(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: processing,
  });

  return (
    <div className="space-y-6">
      <Card hover className={processing ? 'opacity-50 pointer-events-none' : ''}>
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer 
            transition-all duration-300 ease-in-out transform
            ${isDragActive 
              ? 'border-blue-400 bg-blue-50 scale-105 shadow-lg' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50 hover:scale-102'
            }
            ${processing ? 'animate-pulse' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center">
            <div className={`
              w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300
              ${isDragActive 
                ? 'bg-blue-100 text-blue-600 scale-110' 
                : 'bg-gray-100 text-gray-400 hover:bg-blue-100 hover:text-blue-600'
              }
              ${processing ? 'animate-spin' : ''}
            `}>
              {processing ? (
                <Brain className="h-8 w-8" />
              ) : (
                <Upload className="h-8 w-8" />
              )}
            </div>
            
            {processing ? (
              <div className="animate-fade-in">
                <p className="text-blue-600 font-semibold text-lg mb-2">AI Processing Your Data...</p>
                <p className="text-blue-500 text-sm">Analyzing structure and generating insights</p>
              </div>
            ) : isDragActive ? (
              <div className="animate-fade-in">
                <p className="text-blue-600 font-semibold text-lg mb-2">Drop your file here!</p>
                <p className="text-blue-500 text-sm">AI will process it instantly</p>
              </div>
            ) : (
              <div>
                <p className="text-gray-700 font-semibold text-lg mb-2">
                  Drag & drop your data file here
                </p>
                <p className="text-gray-500 mb-4">
                  or <span className="text-blue-600 font-medium">click to browse</span>
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 mb-4">
                  <Brain className="h-4 w-4" />
                  <span>AI will process your file and generate insights</span>
                </div>
                <p className="text-sm text-gray-400">
                  Supports CSV, Excel (.xlsx, .xls) files up to 10MB
                </p>
              </div>
            )}
          </div>

          {fileRejections.length > 0 && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-sm text-red-700 font-medium">
                  {fileRejections[0].errors[0].message}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-purple-600" />
            What happens after upload:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center p-2 bg-white rounded-md shadow-sm">
              <Brain className="h-4 w-4 mr-2 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">AI analyzes your data</span>
            </div>
            <div className="flex items-center p-2 bg-white rounded-md shadow-sm">
              <Sparkles className="h-4 w-4 mr-2 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Generates insights</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Data Preview */}
      {showPreview && uploadedData && (
        <Card className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Eye className="h-5 w-5 mr-2 text-blue-600" />
              Data Preview - {uploadedData.name}
            </h3>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmUpload}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirm Upload
              </Button>
            </div>
          </div>

          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center text-blue-800">
              <Brain className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">
                Found {uploadedData.data.length} rows and {uploadedData.columns.length} columns
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {uploadedData.columns.slice(0, 6).map((column: any) => (
                    <th
                      key={column.name}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column.name}
                      <span className={`ml-1 px-1 py-0.5 rounded text-xs ${
                        column.type === 'number' ? 'bg-blue-100 text-blue-700' :
                        column.type === 'date' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {column.type}
                      </span>
                    </th>
                  ))}
                  {uploadedData.columns.length > 6 && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                      +{uploadedData.columns.length - 6} more
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {uploadedData.data.slice(0, 5).map((row: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {uploadedData.columns.slice(0, 6).map((column: any) => (
                      <td key={column.name} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row[column.name]?.toString() || '-'}
                      </td>
                    ))}
                    {uploadedData.columns.length > 6 && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        ...
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {uploadedData.data.length > 5 && (
            <div className="mt-3 text-center text-sm text-gray-500">
              Showing first 5 rows of {uploadedData.data.length} total rows
            </div>
          )}
        </Card>
      )}
    </div>
  );
};