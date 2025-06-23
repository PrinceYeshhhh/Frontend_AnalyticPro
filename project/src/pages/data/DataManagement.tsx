import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { FileUpload } from '../../components/data/FileUpload';
import { DatasetList } from '../../components/data/DatasetList';
import { GoogleSheetsConnect } from '../../components/integrations/GoogleSheetsConnect';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CreditCard, ShoppingBag, Database, Zap, Plus } from 'lucide-react';

export const DataManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'sheets' | 'stripe' | 'shopify'>('upload');

  const tabs = [
    { id: 'upload', label: 'File Upload', description: 'Upload CSV and Excel files' },
    { id: 'sheets', label: 'Google Sheets', description: 'Connect to Google Sheets' },
    { id: 'stripe', label: 'Stripe', description: 'Connect payment data' },
    { id: 'shopify', label: 'Shopify', description: 'E-commerce analytics' },
  ];

  const EmptyIntegrationState = ({ 
    icon: Icon, 
    title, 
    description, 
    buttonText 
  }: { 
    icon: any, 
    title: string, 
    description: string, 
    buttonText: string 
  }) => (
    <Card>
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">{description}</p>
        <div className="space-y-4">
          <Button disabled className="opacity-50 cursor-not-allowed">
            <Plus className="h-4 w-4 mr-2" />
            {buttonText}
          </Button>
          <p className="text-sm text-blue-600 font-medium">Coming Soon!</p>
        </div>
        
        {/* Feature Preview */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg max-w-md mx-auto">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">What you'll get:</h4>
          <div className="space-y-2 text-sm text-gray-600">
            {title.includes('Stripe') && (
              <>
                <div className="flex items-center">
                  <Zap className="h-3 w-3 mr-2 text-blue-500" />
                  <span>Real-time payment analytics</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-3 w-3 mr-2 text-green-500" />
                  <span>Revenue tracking & forecasting</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-3 w-3 mr-2 text-purple-500" />
                  <span>Customer lifetime value analysis</span>
                </div>
              </>
            )}
            {title.includes('Shopify') && (
              <>
                <div className="flex items-center">
                  <Zap className="h-3 w-3 mr-2 text-blue-500" />
                  <span>Product performance insights</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-3 w-3 mr-2 text-green-500" />
                  <span>Inventory optimization</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-3 w-3 mr-2 text-purple-500" />
                  <span>Customer behavior analysis</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Data Sources</h1>
          <p className="text-gray-600 mt-1">Upload and manage your data sources</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div>{tab.label}</div>
                    <div className="text-xs text-gray-400 mt-1 hidden sm:block">{tab.description}</div>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'upload' && (
            <>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload New Dataset</h2>
                <FileUpload />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Datasets</h2>
                <DatasetList />
              </div>
            </>
          )}

          {activeTab === 'sheets' && <GoogleSheetsConnect />}

          {activeTab === 'stripe' && (
            <EmptyIntegrationState
              icon={CreditCard}
              title="Connect Your Stripe Account"
              description="Connect your Stripe account to view sales KPIs, revenue analytics, and customer insights here."
              buttonText="Connect Stripe"
            />
          )}

          {activeTab === 'shopify' && (
            <EmptyIntegrationState
              icon={ShoppingBag}
              title="Connect Your Shopify Store"
              description="Connect your Shopify store to analyze product performance, inventory, and customer behavior."
              buttonText="Connect Shopify"
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};