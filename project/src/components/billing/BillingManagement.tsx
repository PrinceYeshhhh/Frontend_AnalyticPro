import React from 'react';
import { CreditCard, Crown, Zap, Check, X, Calendar, Download } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

export const BillingManagement: React.FC = () => {
  const { user, updateUserPlan } = useAuth();

  const plans = [
    {
      id: 'solo',
      name: 'Solo',
      price: 0,
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Up to 3 dashboards',
        'Basic charts and KPIs',
        'CSV/Excel upload',
        'Email support',
        '1GB storage'
      ],
      limitations: [
        'No AI analytics',
        'No team collaboration',
        'Limited data sources'
      ],
      color: 'gray',
      icon: Zap
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      period: 'month',
      description: 'For growing businesses',
      features: [
        'Unlimited dashboards',
        'Advanced AI analytics',
        'Predictive forecasting',
        'Google Sheets integration',
        'Priority support',
        '10GB storage',
        'Custom branding',
        'Export to PDF/PNG'
      ],
      limitations: [
        'Up to 5 team members'
      ],
      color: 'blue',
      icon: Crown,
      popular: true
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 99,
      period: 'month',
      description: 'For teams and agencies',
      features: [
        'Everything in Pro',
        'Unlimited team members',
        'White-label solution',
        'API access',
        'Advanced permissions',
        'Dedicated support',
        '100GB storage',
        'Custom integrations',
        'SLA guarantee'
      ],
      limitations: [],
      color: 'purple',
      icon: Crown
    }
  ];

  const invoices = [
    {
      id: 'inv-001',
      date: '2024-01-01',
      amount: 29,
      status: 'paid',
      plan: 'Pro Plan'
    },
    {
      id: 'inv-002',
      date: '2023-12-01',
      amount: 29,
      status: 'paid',
      plan: 'Pro Plan'
    },
    {
      id: 'inv-003',
      date: '2023-11-01',
      amount: 29,
      status: 'paid',
      plan: 'Pro Plan'
    }
  ];

  const handleUpgrade = (planId: 'solo' | 'pro' | 'elite') => {
    updateUserPlan(planId);
    toast.success(`Plan updated to ${plans.find(p => p.id === planId)?.name}!`);
  };

  const getPlanColor = (color: string) => {
    switch (color) {
      case 'blue': return 'border-blue-500 bg-blue-50';
      case 'purple': return 'border-purple-500 bg-purple-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getButtonColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-600 hover:bg-blue-700';
      case 'purple': return 'bg-purple-600 hover:bg-purple-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
            <CreditCard className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Billing & Plans</h2>
            <p className="text-gray-600">Manage your subscription and billing</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {user?.plan && <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            user.plan === 'solo' ? 'bg-gray-100 text-gray-700' :
            user.plan === 'pro' ? 'bg-blue-100 text-blue-700' :
            'bg-purple-100 text-purple-700'
          }`}>
            Current: {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan
          </span>}
        </div>
      </div>

      {/* Current Usage */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">3</p>
            <p className="text-sm text-gray-600">Dashboards</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">1.2GB</p>
            <p className="text-sm text-gray-600">Storage Used</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '12%' }}></div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">1</p>
            <p className="text-sm text-gray-600">Team Members</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">5</p>
            <p className="text-sm text-gray-600">Data Sources</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-orange-600 h-2 rounded-full" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>
      </Card>

      {/* Plans */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Choose Your Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrentPlan = user?.plan === plan.id;
            return (
              <Card
                key={plan.id}
                className={`relative ${plan.popular ? getPlanColor(plan.color) : ''} ${
                  isCurrentPlan ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <Icon className={`h-12 w-12 mx-auto mb-4 ${
                    plan.color === 'blue' ? 'text-blue-600' :
                    plan.color === 'purple' ? 'text-purple-600' :
                    'text-gray-600'
                  }`} />
                  <h4 className="text-xl font-bold text-gray-900">{plan.name}</h4>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-center">
                      <X className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleUpgrade(plan.id as 'solo' | 'pro' | 'elite')}
                  disabled={isCurrentPlan}
                  className={`w-full ${
                    isCurrentPlan ? 'bg-gray-400' : getButtonColor(plan.color)
                  }`}
                >
                  {isCurrentPlan ? 'Current Plan' : 
                   plan.id === 'solo' ? 'Downgrade' : 'Upgrade'}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Payment Method */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-8 w-8 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-600">Expires 12/25</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Update
          </Button>
        </div>
      </Card>

      {/* Billing History */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${invoice.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};