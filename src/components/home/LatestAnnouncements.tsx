import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Bell, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const announcements = [
  {
    title: "New Digital India Initiative Launched",
    date: "March 15, 2024",
    category: "Digital Services",
    excerpt: "Government launches comprehensive digital literacy program for rural areas...",
    isNew: true,
  },
  {
    title: "Ayushman Bharat Scheme Extended",
    date: "March 12, 2024",
    category: "Healthcare",
    excerpt: "Health coverage extended to additional 10 million families across India...",
    isNew: true,
  },
  {
    title: "Electric Vehicle Subsidy Update",
    date: "March 10, 2024",
    category: "Environment",
    excerpt: "Enhanced subsidies announced for electric vehicle purchases in tier-2 cities...",
    isNew: false,
  },
  {
    title: "Startup India Fund Allocation",
    date: "March 8, 2024",
    category: "Business",
    excerpt: "₹1000 crore additional fund allocated for startup ecosystem development...",
    isNew: false,
  },
];

export function LatestAnnouncements() {
  return (
    <section className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Bell className="w-6 h-6 text-blue-600" />
          <h2 className="text-3xl font-bold">Latest Announcements</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Stay updated with the latest government initiatives, policy changes, and public announcements.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {announcements.map((announcement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group cursor-pointer"
          >
            <Card className="h-full transition-all duration-300 group-hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Badge 
                    variant={announcement.isNew ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {announcement.category}
                  </Badge>
                  {announcement.isNew && (
                    <Badge variant="destructive" className="text-xs animate-pulse">
                      NEW
                    </Badge>
                  )}
                </div>
                
                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {announcement.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {announcement.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{announcement.date}</span>
                  </div>
                  
                  <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          View All Announcements
        </Button>
      </div>
    </section>
  );
}