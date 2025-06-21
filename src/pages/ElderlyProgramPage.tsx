import { motion } from 'framer-motion';
import { ElderlyRegistration } from '@/components/elderly/ElderlyRegistration';
import { ProgramBenefits } from '@/components/elderly/ProgramBenefits';
import { SkillCategories } from '@/components/elderly/SkillCategories';
import { SuccessStories } from '@/components/elderly/SuccessStories';

export function ElderlyProgramPage() {
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
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProgramBenefits />
          <SkillCategories />
          <SuccessStories />
        </div>
        <div className="lg:col-span-1">
          <ElderlyRegistration />
        </div>
      </div>
    </motion.div>
  );
}