import React from 'react';
import { FileUpload } from '../../components/data/FileUpload';
import { Card } from '../../components/ui/Card';
import { BackButton } from '../../components/ui/BackButton';

const UploadPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <BackButton className="mb-6" />
      <Card className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Upload Data</h1>
        <p className="text-gray-500 dark:text-gray-300 mb-4">Upload your CSV or Excel files to generate AI-powered insights.</p>
      </Card>
      <FileUpload />
    </div>
  );
};

export default UploadPage; 