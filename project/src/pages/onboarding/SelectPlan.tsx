import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Crown, Zap, Users, BarChart3, ArrowRight, Sparkles, Brain, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { PlanFeatures } from '../../types';
import toast from 'react-hot-toast';

const plans: PlanFeatures[] = [
  {
    id: 'solo',
    name: 'Solo AI Analyst',
    description: 'Your personal senior business analyst',
    price: 20,
    idealFor: ['Solo Traders', 'Freelancers', 'Small Shops'],
    features: [
      'KPI dashboards & insights',
      'Weekly business reports',
      'File upload & analysis',
      'Basic trend detection',
      'Email support',
      '1GB data storage'
    ],
    analystEquivalent: 'Acts like 1 Senior Analyst',
    costComparison: 'Hiring this would cost $8,000/month'
  },
  {
    id: 'pro',
    name: 'Pro AI Analyst',
    description: 'A team of 3 AI analysts working for you',
    price: 70,
    idealFor: ['Startups', 'Growing Businesses', 'Agencies'],
    features: [
      'Everything in Solo +',
      'Multi-metric insights',
      'Trend forecasting & predictions',
      'Google Sheets integration',
      'Anomaly detection',
      'Priority support',
      '10GB data storage',
      'Custom reports'
    ],
    analystEquivalent: 'Acts like 3 Analysts',
    costComparison: 'Hiring this would cost $15,000/month',
    recommended: true
  },
  {
    id: 'elite',
    name: 'Elite AI Team',
    description: 'Full AI analytics team at your service',
    price: 250,
    idealFor: ['Large Startups', 'Agencies', 'MNCs'],
    features: [
      'Everything in Pro +',
      'Advanced AI recommendations',
      'Real-time monitoring',
      'Team collaboration tools',
      'White-label reports',
      'API access',
      'Dedicated support',
      '100GB data storage',
      'Custom integrations'
    ],
    analystEquivalent: 'Acts like a full analytics team',
    costComparison: 'Hiring this would cost $50,000/month'
  }
];

export const SelectPlan: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUserPlan } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const getRecommendedPlan = () => {
    if (!user?.businessType) return 'pro';
    
    switch (user.businessType) {
      case 'solo-trader':
        return 'solo';
      case 'small-business':
        return 'solo';
      case 'startup':
        return 'pro';
      case 'agency':
        return 'pro';
      case 'financial-firm':
        return 'elite';
      case 'big-company':
        return 'elite';
      default:
        return 'pro';
    }
  };

  const recommendedPlan = getRecommendedPlan();

  const handleSelectPlan = async (planId: 'solo' | 'pro' | 'elite') => {
    setLoading(true);
    setSelectedPlan(planId);

    try {
      // Update user plan
      updateUserPlan(planId);
      
      // Store in localStorage for routing
      localStorage.setItem('selectedPlan', planId);
      
      // Show success message
      const plan = plans.find(p => p.id === planId);
      toast.success(`Welcome to ${plan?.name}! 🎉`);
      
      // Navigate to appropriate dashboard
      setTimeout(() => {
        navigate(`/dashboard/${planId}`);
      }, 1000);
      
    } catch (error) {
      toast.error('Failed to select plan. Please try again.');
      setLoading(false);
      setSelectedPlan('');
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'solo': return Zap;
      case 'pro': return Brain;
      case 'elite': return Crown;
      default: return BarChart3;
    }
  };

  const getPlanGradient = (planId: string) => {
    switch (planId) {
      case 'solo': return 'from-blue-500 to-cyan-500';
      case 'pro': return 'from-purple-500 to-pink-500';
      case 'elite': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Choose Your AI Analytics Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the perfect AI team size for your business. Each plan includes world-class AI analysts 
            that would cost thousands to hire individually.
          </p>
          {user?.businessType && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2" />
              Recommended for {user.businessType.replace('-', ' ')}: {plans.find(p => p.id === recommendedPlan)?.name}
            </div>
          )}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const Icon = getPlanIcon(plan.id);
            const isRecommended = plan.id === recommendedPlan;
            const isSelected = selectedPlan === plan.id;
            
            return (
              <Card
                key={plan.id}
                className={`relative overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                  isRecommended ? 'ring-2 ring-purple-500 shadow-2xl' : 'hover:shadow-xl'
                } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
              >
                {isRecommended && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 text-sm font-semibold">
                    ⭐ Recommended for You
                  </div>
                )}
                
                <div className={`p-8 ${isRecommended ? 'pt-12' : ''}`}>
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${getPlanGradient(plan.id)} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    
                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-600">/month</span>
                    </div>
                    
                    {/* Analyst Equivalent */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <p className="text-sm font-semibold text-gray-900">{plan.analystEquivalent}</p>
                      <p className="text-xs text-gray-600 mt-1">{plan.costComparison}</p>
                    </div>
                  </div>

                  {/* Ideal For */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Ideal for:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {plan.idealFor.map((type, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      What's included:
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={loading}
                    loading={isSelected && loading}
                    className={`w-full shadow-lg ${
                      isRecommended 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                        : ''
                    }`}
                    size="lg"
                  >
                    {isSelected && loading ? (
                      'Setting up your AI team...'
                    ) : (
                      <>
                        Choose {plan.name}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              🚀 Start Your AI Analytics Journey Today
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of businesses that have replaced expensive analyst teams with AI. 
              Get insights that would take human analysts weeks to generate, delivered in minutes.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>24/7 AI support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};