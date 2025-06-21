import { motion } from 'framer-motion';
import { ComplaintForm } from '@/components/complaints/ComplaintForm';
import { VoiceComplaintForm } from '@/components/complaints/VoiceComplaintForm';
import { ComplaintStats } from '@/components/complaints/ComplaintStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Mic } from 'lucide-react';

export function ComplaintPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          File a Complaint
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Submit your concerns and track their resolution. We're here to address your issues promptly and efficiently.
        </p>
      </div>

      <ComplaintStats />

      {/* Main Form Section */}
      <Tabs defaultValue="manual" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Manual Form
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center gap-2">
            <Mic className="w-4 h-4" />
            Voice Assistant
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="manual" className="mt-8">
          <ComplaintForm />
        </TabsContent>
        
        <TabsContent value="voice" className="mt-8">
          <VoiceComplaintForm />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}