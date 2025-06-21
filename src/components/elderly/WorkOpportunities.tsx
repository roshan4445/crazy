import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChefHat, 
  Scissors, 
  Palette, 
  BookOpen, 
  Flower, 
  Stethoscope, 
  Music, 
  MessageCircle,
  MapPin,
  Clock,
  IndianRupee,
  Users,
  CheckCircle,
  Star,
  Calendar
} from 'lucide-react';

interface WorkOpportunity {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  duration: string;
  payment: string;
  requirements: string[];
  timeSlots: string[];
  clientInfo: {
    name: string;
    rating: number;
    reviews: number;
  };
  urgency: 'low' | 'medium' | 'high';
  slotsAvailable: number;
  totalSlots: number;
  postedDate: string;
  icon: any;
}

const workOpportunities: WorkOpportunity[] = [
  {
    id: '1',
    title: 'Traditional South Indian Cooking Classes',
    category: 'Cooking & Recipes',
    description: 'Teach authentic South Indian recipes including dosa, sambar, and traditional sweets to a family of 4.',
    location: 'Bangalore, Karnataka',
    duration: '2 weeks (1 hour daily)',
    payment: '₹1,200 per session',
    requirements: ['Expert in South Indian cuisine', '5+ years cooking experience', 'Patient teaching style'],
    timeSlots: ['Morning (9-10 AM)', 'Evening (6-7 PM)'],
    clientInfo: {
      name: 'Priya Sharma Family',
      rating: 4.8,
      reviews: 23
    },
    urgency: 'high',
    slotsAvailable: 1,
    totalSlots: 1,
    postedDate: '2 days ago',
    icon: ChefHat
  },
  {
    id: '2',
    title: 'Embroidery and Stitching Workshop',
    category: 'Stitching & Tailoring',
    description: 'Conduct weekend embroidery workshops for young women interested in learning traditional needlework.',
    location: 'Delhi NCR',
    duration: '4 weekends (3 hours each)',
    payment: '₹800 per session',
    requirements: ['Advanced embroidery skills', 'Teaching experience preferred', 'Own tools and materials'],
    timeSlots: ['Saturday (2-5 PM)', 'Sunday (10 AM-1 PM)'],
    clientInfo: {
      name: 'Women\'s Skill Center',
      rating: 4.9,
      reviews: 45
    },
    urgency: 'medium',
    slotsAvailable: 2,
    totalSlots: 3,
    postedDate: '1 day ago',
    icon: Scissors
  },
  {
    id: '3',
    title: 'Mathematics Tutoring for Class 10',
    category: 'Tutoring & Teaching',
    description: 'Help a bright student prepare for Class 10 board exams with focus on algebra and geometry.',
    location: 'Mumbai, Maharashtra',
    duration: '3 months (1 hour daily)',
    payment: '₹1,500 per session',
    requirements: ['Mathematics background', 'Teaching experience', 'Patience with teenagers'],
    timeSlots: ['After school (4-5 PM)', 'Evening (7-8 PM)'],
    clientInfo: {
      name: 'Rajesh Kumar',
      rating: 4.7,
      reviews: 12
    },
    urgency: 'high',
    slotsAvailable: 1,
    totalSlots: 1,
    postedDate: '3 hours ago',
    icon: BookOpen
  },
  {
    id: '4',
    title: 'Traditional Painting Classes',
    category: 'Handicrafts & Art',
    description: 'Teach traditional Indian painting techniques including Madhubani and Warli art forms.',
    location: 'Pune, Maharashtra',
    duration: '6 weeks (2 hours weekly)',
    payment: '₹900 per session',
    requirements: ['Traditional art expertise', 'Art supplies knowledge', 'Creative teaching methods'],
    timeSlots: ['Weekend mornings', 'Weekday evenings'],
    clientInfo: {
      name: 'Art Enthusiasts Group',
      rating: 4.6,
      reviews: 18
    },
    urgency: 'low',
    slotsAvailable: 3,
    totalSlots: 5,
    postedDate: '1 week ago',
    icon: Palette
  },
  {
    id: '5',
    title: 'Organic Gardening Consultation',
    category: 'Gardening',
    description: 'Guide apartment residents in setting up terrace gardens and organic vegetable cultivation.',
    location: 'Chennai, Tamil Nadu',
    duration: '1 month (2 visits per week)',
    payment: '₹600 per visit',
    requirements: ['Organic farming knowledge', 'Plant care expertise', 'Problem-solving skills'],
    timeSlots: ['Morning (8-10 AM)', 'Late afternoon (4-6 PM)'],
    clientInfo: {
      name: 'Green Living Society',
      rating: 4.5,
      reviews: 31
    },
    urgency: 'medium',
    slotsAvailable: 2,
    totalSlots: 4,
    postedDate: '4 days ago',
    icon: Flower
  },
  {
    id: '6',
    title: 'Classical Music Lessons',
    category: 'Music & Instruments',
    description: 'Teach Hindustani classical music and harmonium to beginners and intermediate students.',
    location: 'Kolkata, West Bengal',
    duration: '2 months (45 minutes per session)',
    payment: '₹1,000 per session',
    requirements: ['Classical music training', 'Instrument proficiency', 'Teaching methodology'],
    timeSlots: ['Morning (10-11 AM)', 'Evening (6-7 PM)'],
    clientInfo: {
      name: 'Music Academy',
      rating: 4.8,
      reviews: 27
    },
    urgency: 'medium',
    slotsAvailable: 1,
    totalSlots: 2,
    postedDate: '5 days ago',
    icon: Music
  }
];

interface WorkOpportunitiesProps {
  onApply: (workId: string) => void;
  appliedWorks: string[];
}

export function WorkOpportunities({ onApply, appliedWorks }: WorkOpportunitiesProps) {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'medium': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Cooking & Recipes': 'text-orange-600 bg-orange-50 dark:bg-orange-900/10',
      'Stitching & Tailoring': 'text-pink-600 bg-pink-50 dark:bg-pink-900/10',
      'Tutoring & Teaching': 'text-blue-600 bg-blue-50 dark:bg-blue-900/10',
      'Handicrafts & Art': 'text-purple-600 bg-purple-50 dark:bg-purple-900/10',
      'Gardening': 'text-green-600 bg-green-50 dark:bg-green-900/10',
      'Music & Instruments': 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/10',
    };
    return colors[category] || 'text-gray-600 bg-gray-50 dark:bg-gray-900/10';
  };

  const getAvailabilityPercentage = (work: WorkOpportunity) => {
    return ((work.totalSlots - work.slotsAvailable) / work.totalSlots) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Available Work Opportunities
            <Badge variant="secondary">{workOpportunities.length} opportunities</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {workOpportunities.map((work, index) => {
              const isApplied = appliedWorks.includes(work.id);
              const availabilityPercentage = getAvailabilityPercentage(work);
              
              return (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`border rounded-lg p-4 space-y-4 transition-all duration-300 hover:shadow-md ${
                    isApplied 
                      ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10' 
                      : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/50'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(work.category)}`}>
                        <work.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg leading-tight">{work.title}</h3>
                        <Badge variant="outline" className="mt-1">
                          {work.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge className={getUrgencyColor(work.urgency)}>
                        {work.urgency.toUpperCase()}
                      </Badge>
                      {isApplied && (
                        <Badge variant="default" className="bg-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Applied
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {work.description}
                  </p>

                  {/* Key Details */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>{work.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span>{work.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-purple-600" />
                      <span className="font-medium">{work.payment}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <span>{work.postedDate}</span>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{work.clientInfo.name}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs">{work.clientInfo.rating} ({work.clientInfo.reviews} reviews)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Slots Available</p>
                      <p className="font-medium text-sm">{work.slotsAvailable}/{work.totalSlots}</p>
                    </div>
                  </div>

                  {/* Availability Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Availability</span>
                      <span className={availabilityPercentage > 80 ? 'text-red-600 font-medium' : ''}>
                        {work.slotsAvailable} slots left
                      </span>
                    </div>
                    <Progress value={availabilityPercentage} className="h-2" />
                    {availabilityPercentage > 80 && (
                      <p className="text-xs text-red-600 font-medium">⚠️ Limited availability!</p>
                    )}
                  </div>

                  {/* Requirements Preview */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500">Key Requirements:</p>
                    <div className="flex flex-wrap gap-1">
                      {work.requirements.slice(0, 2).map((req, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                      {work.requirements.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{work.requirements.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full"
                    onClick={() => onApply(work.id)}
                    disabled={isApplied || work.slotsAvailable === 0}
                    variant={isApplied ? "secondary" : "default"}
                  >
                    {isApplied ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Application Submitted
                      </div>
                    ) : work.slotsAvailable === 0 ? (
                      'No Slots Available'
                    ) : (
                      'Apply for this Work'
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}