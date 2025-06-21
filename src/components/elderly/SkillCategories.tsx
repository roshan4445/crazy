import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Scissors, Palette, BookOpen, Flower, Stethoscope, Music, MessageCircle } from 'lucide-react';

const skillCategories = [
  {
    icon: ChefHat,
    title: 'Cooking & Recipes',
    description: 'Traditional recipes, cooking techniques, regional cuisines',
    demand: 'High',
    earnings: '₹800-1500/session',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/10',
  },
  {
    icon: Scissors,
    title: 'Stitching & Tailoring',
    description: 'Sewing, embroidery, pattern making, alterations',
    demand: 'High',
    earnings: '₹600-1200/session',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50 dark:bg-pink-900/10',
  },
  {
    icon: Palette,
    title: 'Handicrafts & Art',
    description: 'Painting, pottery, knitting, traditional crafts',
    demand: 'Medium',
    earnings: '₹500-1000/session',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/10',
  },
  {
    icon: BookOpen,
    title: 'Tutoring & Teaching',
    description: 'Academic subjects, language teaching, skill training',
    demand: 'Very High',
    earnings: '₹1000-2000/session',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/10',
  },
  {
    icon: Flower,
    title: 'Gardening',
    description: 'Plant care, organic farming, landscaping tips',
    demand: 'Medium',
    earnings: '₹400-800/session',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/10',
  },
  {
    icon: Stethoscope,
    title: 'Traditional Medicine',
    description: 'Home remedies, herbal medicine, wellness tips',
    demand: 'High',
    earnings: '₹700-1300/session',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50 dark:bg-teal-900/10',
  },
  {
    icon: Music,
    title: 'Music & Instruments',
    description: 'Classical music, folk songs, instrument teaching',
    demand: 'Medium',
    earnings: '₹600-1100/session',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/10',
  },
  {
    icon: MessageCircle,
    title: 'Storytelling',
    description: 'Folk tales, moral stories, cultural narratives',
    demand: 'Medium',
    earnings: '₹400-700/session',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/10',
  },
];

const getDemandColor = (demand: string) => {
  switch (demand) {
    case 'Very High':
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
    case 'High':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
    case 'Medium':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
  }
};

export function SkillCategories() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Popular Skill Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-4 rounded-lg ${category.bgColor} transition-all duration-300 hover:shadow-md cursor-pointer`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 ${category.color}`}>
                    <category.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{category.title}</h3>
                      <Badge className={getDemandColor(category.demand)}>
                        {category.demand}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {category.description}
                    </p>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                      {category.earnings}
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