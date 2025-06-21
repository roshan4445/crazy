import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { FileCheck, Clock, Users, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: FileCheck,
    label: 'Total Complaints',
    value: '1,24,567',
    change: '+12%',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/10',
  },
  {
    icon: Clock,
    label: 'Avg Resolution Time',
    value: '3.2 days',
    change: '-18%',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/10',
  },
  {
    icon: Users,
    label: 'Resolved Today',
    value: '1,847',
    change: '+5%',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/10',
  },
  {
    icon: TrendingUp,
    label: 'Success Rate',
    value: '94.8%',
    change: '+2%',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/10',
  },
];

export function ComplaintStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Card className={`${stat.bgColor} border-0`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-xs ${stat.color}`}>{stat.change} this month</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}