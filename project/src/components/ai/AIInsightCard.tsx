import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Brain, RefreshCw } from 'lucide-react';

const insights = [
  "Revenue increased by 18% in April, primarily driven by a surge in repeat customer orders and a successful marketing campaign.",
  "Your top-performing product this month is the 'Quantum Widget', accounting for 35% of total sales.",
  "We've detected an anomaly: sales from the West region are down 12% compared to the previous period. You might want to investigate.",
  "Predictive analysis suggests a 10% growth in user sign-ups next month if current trends continue.",
  "Customer churn rate has decreased by 5% this quarter. Keep up the great work on engagement!"
];

const getRandomInsight = () => insights[Math.floor(Math.random() * insights.length)];

export const AIInsightCard = () => {
  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Insights</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Generated from your latest data</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Regenerate
        </Button>
      </div>
      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <p className="text-gray-800 dark:text-gray-200">
          {getRandomInsight()}
        </p>
      </div>
    </Card>
  );
}; 