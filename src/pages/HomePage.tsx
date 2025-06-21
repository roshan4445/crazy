import { motion } from 'framer-motion';
import { HeroSection } from '@/components/home/HeroSection';
import { ServiceCards } from '@/components/home/ServiceCards';
import { NewSchemes } from '@/components/home/NewSchemes';
import { UrgentSchemes } from '@/components/home/UrgentSchemes';
import { ScamAlerts } from '@/components/home/ScamAlerts';
import { LatestAnnouncements } from '@/components/home/LatestAnnouncements';
import { StatsSection } from '@/components/home/StatsSection';

export function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-16 pb-16"
    >
      <HeroSection />
      <ServiceCards />
      <ScamAlerts />
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          <NewSchemes />
          <UrgentSchemes />
        </div>
      </div>
      <LatestAnnouncements />
      <StatsSection />
    </motion.div>
  );
}