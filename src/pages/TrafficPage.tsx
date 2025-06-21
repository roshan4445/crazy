import { motion } from 'framer-motion';
import { TrafficUpdates } from '@/components/traffic/TrafficUpdates';
import { ReportIssue } from '@/components/traffic/ReportIssue';
import { CityStats } from '@/components/traffic/CityStats';

export function TrafficPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Traffic & City Updates
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Stay informed about traffic conditions, road work, and city infrastructure. Report issues to help improve our city.
        </p>
      </div>

      <CityStats />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TrafficUpdates />
        </div>
        <div className="lg:col-span-1">
          <ReportIssue />
        </div>
      </div>
    </motion.div>
  );
}