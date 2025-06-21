import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

const successStories = [
  {
    name: 'Kamala Devi',
    age: 68,
    skill: 'Traditional Cooking',
    location: 'Delhi',
    earnings: '₹15,000/month',
    story: 'I never thought my cooking skills could earn me money at this age. Now I teach traditional recipes to young families and earn enough to support myself.',
    rating: 4.9,
    students: 45,
    avatar: 'KD',
  },
  {
    name: 'Raman Singh',
    age: 72,
    skill: 'Mathematics Tutoring',
    location: 'Mumbai',
    earnings: '₹22,000/month',
    story: 'After retirement, I felt useless. This program gave me purpose again. I help students with math and feel valued in the community.',
    rating: 5.0,
    students: 32,
    avatar: 'RS',
  },
  {
    name: 'Lakshmi Amma',
    age: 65,
    skill: 'Handicrafts',
    location: 'Bangalore',
    earnings: '₹12,000/month',
    story: 'My embroidery and craft skills are now helping me earn and connect with young women who want to learn traditional arts.',
    rating: 4.8,
    students: 28,
    avatar: 'LA',
  },
];

export function SuccessStories() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Quote className="w-5 h-5" />
            Success Stories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-lg"
              >
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold">
                      {story.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{story.name}, {story.age}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {story.skill} • {story.location}
                        </p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                        {story.earnings}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 italic">
                      "{story.story}"
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{story.rating}</span>
                      </div>
                      <span className="text-gray-500">
                        {story.students} students taught
                      </span>
                    </div>
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