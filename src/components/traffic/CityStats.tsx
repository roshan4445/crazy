import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const stats = [
  {
    icon: MapPin,
    label: 'Active Issues',
    value: '23',
    change: '-12%',
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/10',
  },
  {
    icon: AlertTriangle,
    label: 'High Priority',
    value: '5',
    change: '-20%',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/10',
  },
  {
    icon: CheckCircle,
    label: 'Resolved Today',
    value: '18',
    change: '+15%',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/10',
  },
  {
    icon: Clock,
    label: 'Avg Response Time',
    value: '4.2h',
    change: '-8%',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/10',
  },
];

export function CityStats() {
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
                  <p className={`text-xs ${stat.color}`}>{stat.change} today</p>
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