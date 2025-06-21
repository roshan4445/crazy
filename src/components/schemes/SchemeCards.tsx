import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  IndianRupee, 
  Users, 
  ExternalLink, 
  Clock,
  CheckCircle,
  AlertTriangle 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Scheme {
  id: string;
  title: string;
  description: string;
  amount: string;
  deadline: string;
  category: string;
  eligibility: string[];
  benefits: string[];
  applicationSteps: string[];
  isNew: boolean;
  isUrgent: boolean;
  applied: number;
  slots: number;
  ministry: string;
}

const schemes: Scheme[] = [
  {
    id: '1',
    title: 'PM Scholarship for Higher Education',
    description: 'Financial assistance for meritorious students pursuing higher education in recognized institutions.',
    amount: '₹50,000 per year',
    deadline: 'March 31, 2024',
    category: 'Education',
    eligibility: ['Age 18-25', 'Minimum 60% marks', 'Family income < ₹8 lakh'],
    benefits: ['Annual scholarship', 'Book allowance', 'Laptop provided'],
    applicationSteps: [
      'Register on National Scholarship Portal',
      'Upload required documents',
      'Fill application form',
      'Submit for verification'
    ],
    isNew: false,
    isUrgent: true,
    applied: 12450,
    slots: 15000,
    ministry: 'Ministry of Education',
  },
  {
    id: '2',
    title: 'Startup India Seed Fund Scheme',
    description: 'Funding support for innovative startups to validate proof of concept and prototype development.',
    amount: 'Up to ₹20 lakh',
    deadline: 'April 15, 2024',
    category: 'Business',
    eligibility: ['Registered startup', 'Age < 2 years', 'Innovative idea'],
    benefits: ['Seed funding', 'Mentorship', 'Network access'],
    applicationSteps: [
      'Register on Startup India portal',
      'Submit business plan',
      'Pitch to selection committee',
      'Sign funding agreement'
    ],
    isNew: true,
    isUrgent: true,
    applied: 8900,
    slots: 2000,
    ministry: 'Ministry of Commerce & Industry',
  },
  {
    id: '3',
    title: 'Digital India Skill Development Program',
    description: 'Free training in digital skills to make citizens job-ready in the digital economy.',
    amount: 'Free + ₹15,000 stipend',
    deadline: 'Ongoing',
    category: 'Digital India',
    eligibility: ['Age 18-35', 'Basic education', 'Unemployment status'],
    benefits: ['Free training', 'Certification', 'Job placement'],
    applicationSteps: [
      'Visit nearest digital center',
      'Choose training module',
      'Complete enrollment',
      'Start training program'
    ],
    isNew: true,
    isUrgent: false,
    applied: 45600,
    slots: 100000,
    ministry: 'Ministry of Skill Development',
  },
  {
    id: '4',
    title: 'Women Entrepreneur Support Scheme',
    description: 'Financial and technical support for women-led startups and businesses.',
    amount: 'Up to ₹5 lakh',
    deadline: 'May 30, 2024',
    category: 'Women & Child',
    eligibility: ['Women entrepreneur', 'Age 21-45', 'Business plan ready'],
    benefits: ['Funding support', 'Mentorship', 'Market linkage'],
    applicationSteps: [
      'Submit online application',
      'Upload business plan',
      'Attend interview',
      'Get approval and funding'
    ],
    isNew: false,
    isUrgent: false,
    applied: 3200,
    slots: 5000,
    ministry: 'Ministry of Women & Child Development',
  },
];

export function SchemeCards() {
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Available Schemes</h2>
        <Badge variant="outline">
          {schemes.length} schemes found
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {schemes.map((scheme, index) => {
          const progress = (scheme.applied / scheme.slots) * 100;
          
          return (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{scheme.category}</Badge>
                        {scheme.isNew && (
                          <Badge variant="default" className="animate-pulse">
                            NEW
                          </Badge>
                        )}
                        {scheme.isUrgent && (
                          <Badge variant="destructive">
                            <Clock className="w-3 h-3 mr-1" />
                            URGENT
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {scheme.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {scheme.description}
                  </p>

                  {/* Key Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-green-600" />
                      <span className="font-medium">{scheme.amount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>{scheme.deadline}</span>
                    </div>
                  </div>

                  {/* Application Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Applications: {scheme.applied.toLocaleString()}/{scheme.slots.toLocaleString()}</span>
                      <span>{progress.toFixed(1)}% filled</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {/* Eligibility Preview */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500">Quick Eligibility:</p>
                    <div className="flex flex-wrap gap-1">
                      {scheme.eligibility.slice(0, 2).map((criteria, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {criteria}
                        </Badge>
                      ))}
                      {scheme.eligibility.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{scheme.eligibility.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            {scheme.title}
                            {scheme.isNew && <Badge variant="default">NEW</Badge>}
                          </DialogTitle>
                          <DialogDescription>{scheme.ministry}</DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold mb-2">Description</h4>
                            <p className="text-gray-600 dark:text-gray-400">{scheme.description}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Amount</h4>
                              <p className="text-green-600 font-medium">{scheme.amount}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Deadline</h4>
                              <p className="text-red-600 font-medium">{scheme.deadline}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Eligibility Criteria</h4>
                            <ul className="space-y-1">
                              {scheme.eligibility.map((criteria, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  {criteria}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Benefits</h4>
                            <ul className="space-y-1">
                              {scheme.benefits.map((benefit, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm">
                                  <CheckCircle className="w-4 h-4 text-blue-600" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Application Steps</h4>
                            <ol className="space-y-2">
                              {scheme.applicationSteps.map((step, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm">
                                  <span className="flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900/20 text-blue-600 text-xs font-bold rounded-full">
                                    {i + 1}
                                  </span>
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button size="sm" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}