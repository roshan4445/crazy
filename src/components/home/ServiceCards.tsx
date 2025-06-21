import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Gift, MapPin, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    title: "File Complaints",
    description: "Report issues and track their resolution with our smart complaint system",
    icon: FileText,
    href: "/complaints",
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-50 dark:bg-red-900/10",
  },
  {
    title: "Government Schemes",
    description: "Discover schemes you're eligible for with AI-powered recommendations",
    icon: Gift,
    href: "/schemes",
    color: "from-blue-500 to-purple-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/10",
  },
  {
    title: "Traffic & City Updates",
    description: "Stay informed about traffic conditions and city infrastructure",
    icon: MapPin,
    href: "/traffic",
    color: "from-green-500 to-teal-500",
    bgColor: "bg-green-50 dark:bg-green-900/10",
  },
  {
    title: "Elderly Skills Program",
    description: "Connect skilled elderly citizens with work-from-home opportunities",
    icon: Users,
    href: "/elderly-program",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/10",
  },
];

export function ServiceCards() {
  return (
    <section className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">Our Services</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Comprehensive digital solutions to make government services accessible, efficient, and user-friendly for every citizen.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Link to={service.href}>
              <Card className={`h-full transition-all duration-300 group-hover:shadow-lg border-0 ${service.bgColor}`}>
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}