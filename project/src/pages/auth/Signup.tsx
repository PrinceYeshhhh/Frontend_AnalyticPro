import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Mail, Lock, User, BarChart3, Eye, EyeOff, Building2, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import toast from 'react-hot-toast';

const businessTypes = [
  { value: 'solo-trader', label: 'Solo Trader' },
  { value: 'small-business', label: 'Small Business (e.g. Restaurant, Shop)' },
  { value: 'startup', label: 'Startup' },
  { value: 'agency', label: 'Agency' },
  { value: 'financial-firm', label: 'Financial Firm / Analyst' },
  { value: 'big-company', label: 'Big Company / MNC' },
  { value: 'others', label: 'Others' },
];

export const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    businessType: '',
    customBusinessType: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, signup } = useAuth();

  if (user) {
    return <Navigate to="/select-plan" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.username || !formData.email || !formData.password || !formData.businessType) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.businessType === 'others' && !formData.customBusinessType) {
      toast.error('Please specify your business type');
      return;
    }

    setLoading(true);

    try {
      await signup(formData);
      toast.success('Account created successfully! 🎉');
    } catch (error) {
      toast.error('Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Clear custom business type if not "others"
      ...(field === 'businessType' && value !== 'others' ? { customBusinessType: '' } : {})
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            AI Analytics Pro
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Build your AI analytics team</p>
        </div>

        <Card className="shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                label="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="John Doe"
                icon={<User className="h-5 w-5 text-gray-400" />}
                required
              />

              <Input
                type="text"
                label="Username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="johndoe"
                icon={<Users className="h-5 w-5 text-gray-400" />}
                required
              />
            </div>

            <Input
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="john@company.com"
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type *
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  value={formData.businessType}
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  required
                >
                  <option value="">Select your business type</option>
                  {businessTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {formData.businessType === 'others' && (
              <Input
                type="text"
                label="Specify Business Type"
                value={formData.customBusinessType}
                onChange={(e) => handleInputChange('customBusinessType', e.target.value)}
                placeholder="e.g., Non-profit, Healthcare, Education"
                icon={<Building2 className="h-5 w-5 text-gray-400" />}
                required
              />
            )}

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                label="Password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Create a strong password"
                icon={<Lock className="h-5 w-5 text-gray-400" />}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full shadow-lg"
              size="lg"
            >
              Create Your AI Team
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">
                Sign in
              </Link>
            </p>
          </div>

          {/* Features highlight */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <p className="text-sm font-semibold text-green-900 mb-2">🚀 What you'll get:</p>
            <ul className="text-xs text-green-800 space-y-1">
              <li>• AI Senior Business Analyst (worth $8,000/month)</li>
              <li>• AI Data Scientist (worth $12,000/month)</li>
              <li>• AI Market Researcher (worth $6,000/month)</li>
              <li>• All for just $20-250/month!</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};