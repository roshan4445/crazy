import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgramBenefits } from '@/components/elderly/ProgramBenefits';
import { SkillCategories } from '@/components/elderly/SkillCategories';
import { SuccessStories } from '@/components/elderly/SuccessStories';
import { WorkOpportunities } from '@/components/elderly/WorkOpportunities';
import { WorkApplicationForm } from '@/components/elderly/WorkApplicationForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Heart, Users, TrendingUp } from 'lucide-react';

// Mock work details for the application form
const workDetails = {
  '1': {
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
    }
  },
  '2': {
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
    }
  },
  '3': {
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
    }
  },
  '4': {
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
    }
  },
  '5': {
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
    }
  },
  '6': {
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
    }
  }
};

export function ElderlyProgramPage() {
  const [selectedWorkId, setSelectedWorkId] = useState<string | null>(null);
  const [appliedWorks, setAppliedWorks] = useState<string[]>([]);

  const handleApplyForWork = (workId: string) => {
    setSelectedWorkId(workId);
  };

  const handleApplicationSubmit = (applicationData: any) => {
    if (selectedWorkId) {
      setAppliedWorks(prev => [...prev, selectedWorkId]);
    }
    setSelectedWorkId(null);
  };

  const handleApplicationCancel = () => {
    setSelectedWorkId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Elderly Skills-from-Home Program
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Share your valuable skills and earn from home. Connect with people who need your expertise while staying comfortable in your own space.
        </p>
        
        {/* Quick Stats */}
        <div className="flex justify-center gap-6 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">2,500+</div>
            <div className="text-sm text-gray-600">Active Seniors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">₹15,000</div>
            <div className="text-sm text-gray-600">Avg Monthly Earning</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">95%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="opportunities" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="opportunities" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Work Opportunities
            {appliedWorks.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {appliedWorks.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="benefits" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Benefits
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Skill Categories
          </TabsTrigger>
          <TabsTrigger value="stories" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Success Stories
          </TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-6">
          <WorkOpportunities 
            onApply={handleApplyForWork}
            appliedWorks={appliedWorks}
          />
        </TabsContent>

        <TabsContent value="benefits" className="space-y-6">
          <ProgramBenefits />
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <SkillCategories />
        </TabsContent>

        <TabsContent value="stories" className="space-y-6">
          <SuccessStories />
        </TabsContent>
      </Tabs>

      {/* Application Form Modal */}
      <AnimatePresence>
        {selectedWorkId && workDetails[selectedWorkId as keyof typeof workDetails] && (
          <WorkApplicationForm
            workDetails={workDetails[selectedWorkId as keyof typeof workDetails]}
            onSubmit={handleApplicationSubmit}
            onCancel={handleApplicationCancel}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}