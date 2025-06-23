import React, { useState } from 'react';
import { X, Copy, Link, Mail, Download, Settings } from 'lucide-react';
import { Dashboard } from '../../types';
import { useDataStore } from '../../stores/dataStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import toast from 'react-hot-toast';

interface ShareModalProps {
  dashboard: Dashboard;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ dashboard, onClose }) => {
  const { generateShareToken, updateShareSettings } = useDataStore();
  const [shareSettings, setShareSettings] = useState(dashboard.shareSettings);
  const [shareUrl, setShareUrl] = useState('');

  const handleGenerateLink = () => {
    const token = generateShareToken(dashboard.id);
    const url = `${window.location.origin}/shared/${token}`;
    setShareUrl(url);
    toast.success('Share link generated!');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard!');
  };

  const handleUpdateSettings = () => {
    updateShareSettings(dashboard.id, shareSettings);
    toast.success('Share settings updated!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Share Dashboard</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Share Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share Link
            </label>
            {shareUrl ? (
              <div className="flex space-x-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="flex-1"
                />
                <Button variant="outline" onClick={handleCopyLink}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button onClick={handleGenerateLink} className="w-full">
                <Link className="h-4 w-4 mr-2" />
                Generate Share Link
              </Button>
            )}
          </div>

          {/* Share Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Share Settings</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Public Access</p>
                <p className="text-xs text-gray-500">Anyone with the link can view</p>
              </div>
              <input
                type="checkbox"
                checked={shareSettings.isPublic}
                onChange={(e) => setShareSettings({
                  ...shareSettings,
                  isPublic: e.target.checked
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Allow Editing</p>
                <p className="text-xs text-gray-500">Viewers can modify the dashboard</p>
              </div>
              <input
                type="checkbox"
                checked={shareSettings.allowEdit}
                onChange={(e) => setShareSettings({
                  ...shareSettings,
                  allowEdit: e.target.checked
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>

            <Input
              label="Password Protection (Optional)"
              type="password"
              value={shareSettings.password || ''}
              onChange={(e) => setShareSettings({
                ...shareSettings,
                password: e.target.value
              })}
              placeholder="Enter password"
            />

            <Input
              label="Expiration Date (Optional)"
              type="datetime-local"
              value={shareSettings.expiresAt || ''}
              onChange={(e) => setShareSettings({
                ...shareSettings,
                expiresAt: e.target.value
              })}
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleUpdateSettings}
              className="flex-1"
            >
              <Settings className="h-4 w-4 mr-2" />
              Update Settings
            </Button>
            <Button variant="outline" className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Email Link
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};