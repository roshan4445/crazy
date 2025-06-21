import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, TrendingUp, Users, Calendar } from 'lucide-react';

const schemeCategories = [
  { name: 'Education', count: 45, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' },
  { name: 'Healthcare', count: 32, color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' },
  { name: 'Agriculture', count: 28, color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' },
  { name: 'Employment', count: 24, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300' },
  { name: 'Housing', count: 18, color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300' },
  { name: 'Women & Child', count: 22, color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300' },
  { name: 'Senior Citizen', count: 15, color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300' },
  { name: 'Startup', count: 12, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' },
  { name: 'Digital India', count: 20, color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-300' },
];

const quickStats = [
  {
    icon: TrendingUp,
    label: 'Active Schemes',
    value: '450+',
    description: 'Currently available',
    color: 'text-blue-600',
  },
  {
    icon: Users,
    label: 'Beneficiaries',
    value: '2.5M+',
    description: 'Citizens helped',
    color: 'text-green-600',
  },
  {
    icon: Calendar,
    label: 'New This Month',
    value: '12',
    description: 'Recently launched',
    color: 'text-purple-600',
  },
];

export function SchemeFilters() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Quick Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {quickStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-lg">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Scheme Categories Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            Scheme Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Browse schemes by category to find what's relevant to you.
          </p>
          
          <div className="space-y-2">
            {schemeCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
              >
                <span className="text-sm font-medium">{category.name}</span>
                <Badge className={category.color}>
                  {category.count}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Need Help?</h4>
              <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <p>• Use the AI Eligibility Checker to find schemes for you</p>
                <p>• Check application deadlines regularly</p>
                <p>• Keep your documents ready before applying</p>
                <p>• Contact scheme helplines for assistance</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}