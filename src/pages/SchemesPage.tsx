import { motion } from 'framer-motion';
import { SchemeFilters } from '@/components/schemes/SchemeFilters';
import { SchemeCards } from '@/components/schemes/SchemeCards';
import { AIAssistant } from '@/components/schemes/AIAssistant';
import { EligibilityChecker } from '@/components/schemes/EligibilityChecker';

export function SchemesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Government Schemes
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover government schemes tailored for you. Get AI-powered recommendations based on your profile and eligibility criteria.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <SchemeFilters />
          <EligibilityChecker />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <AIAssistant />
          <SchemeCards />
        </div>
      </div>
    </motion.div>
  );
}