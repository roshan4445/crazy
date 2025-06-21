import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Calendar, Users, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

const newSchemes = [
  {
    title: "Digital Skill Development Program",
    inauguratedBy: "Ministry of Skill Development",
    launchDate: "January 2024",
    eligibility: ["Age 18-35", "Basic education", "Unemployment status"],
    benefits: "₹15,000 monthly stipend during training",
    description: "Learn digital skills and get job placement assistance",
  },
  {
    title: "Women Entrepreneur Support Scheme",
    inauguratedBy: "Ministry of Women & Child Development",
    launchDate: "February 2024",
    eligibility: ["Women entrepreneurs", "Business idea ready", "Age 21-45"],
    benefits: "Up to ₹5 lakh funding + mentorship",
    description: "Financial support and guidance for women-led startups",
  },
];

export function NewSchemes() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            New Scheme Highlights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {newSchemes.map((scheme, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border-l-4 border-green-500 pl-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{scheme.title}</h3>
                  <Badge variant="secondary" className="mt-1">
                    NEW
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {scheme.description}
              </p>
              
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>Launched: {scheme.launchDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-green-500" />
                  <span>{scheme.benefits}</span>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 mb-2">Eligibility:</p>
                <div className="flex flex-wrap gap-1">
                  {scheme.eligibility.map((criteria, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {criteria}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          
          <Link to="/schemes">
            <Button className="w-full">View All Schemes</Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}