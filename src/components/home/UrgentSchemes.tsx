import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, AlertTriangle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const urgentSchemes = [
  {
    title: "PM Scholarship for Higher Education",
    deadline: "March 31, 2024",
    daysLeft: 15,
    progress: 85,
    amount: "₹50,000 per year",
    applied: "12,450",
    slots: "15,000",
  },
  {
    title: "Startup India Seed Fund Scheme",
    deadline: "April 15, 2024",
    daysLeft: 30,
    progress: 60,
    amount: "Up to ₹20 lakh",
    applied: "8,900",
    slots: "2,000",
  },
  {
    title: "Rural Housing Assistance",
    deadline: "May 1, 2024",
    daysLeft: 45,
    progress: 40,
    amount: "₹2.5 lakh subsidy",
    applied: "45,600",
    slots: "1,00,000",
  },
];

export function UrgentSchemes() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" />
            Near-Deadline Schemes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {urgentSchemes.map((scheme, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="space-y-3 p-3 border rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold">{scheme.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{scheme.amount}</p>
                </div>
                <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium">{scheme.daysLeft} days left</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Applications: {scheme.applied}/{scheme.slots}</span>
                  <span>{scheme.progress}% filled</span>
                </div>
                <Progress value={scheme.progress} className="h-2" />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Deadline: {scheme.deadline}</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          <Link to="/schemes">
            <Button variant="outline" className="w-full">
              View All Urgent Schemes
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}