import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, Home, Users, Heart, Clock, Award } from 'lucide-react';

const benefits = [
  {
    icon: IndianRupee,
    title: 'Earn Money',
    description: 'Get paid ₹500-2000 per session based on your skills and demand',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/10',
  },
  {
    icon: Home,
    title: 'Work from Home',
    description: 'Teach and share your skills from the comfort of your home',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/10',
  },
  {
    icon: Users,
    title: 'Connect with People',
    description: 'Meet new people and build meaningful relationships',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/10',
  },
  {
    icon: Heart,
    title: 'Share Your Wisdom',
    description: 'Pass on your valuable knowledge and experience to others',
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/10',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Choose your own working hours that suit your lifestyle',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/10',
  },
  {
    icon: Award,
    title: 'Recognition',
    description: 'Get recognized for your contributions to the community',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/10',
  },
];

export function ProgramBenefits() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Program Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-4 rounded-lg ${benefit.bgColor} transition-all duration-300 hover:shadow-md`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 ${benefit.color}`}>
                    <benefit.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}