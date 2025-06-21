import { motion } from 'framer-motion';
import { AlertTriangle, Shield, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const scamAlerts = [
  {
    title: "Fake PM Kisan Website Alert",
    description: "Beware of fake websites asking for bank details. Official website: pmkisan.gov.in",
    type: "critical",
  },
  {
    title: "Fraudulent Scheme Calls",
    description: "Government officials never ask for money over phone. Report suspicious calls to 1930.",
    type: "warning",
  },
];

export function ScamAlerts() {
  return (
    <section className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-2xl p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full">
            <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-red-800 dark:text-red-200">Scam Alerts</h2>
            <p className="text-red-600 dark:text-red-400">Stay vigilant against fraudulent activities</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scamAlerts.map((alert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Alert className={`border-2 ${
                alert.type === 'critical' 
                  ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20' 
                  : 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20'
              }`}>
                <AlertTriangle className={`h-4 w-4 ${
                  alert.type === 'critical' ? 'text-red-600' : 'text-orange-600'
                }`} />
                <AlertDescription>
                  <div className="space-y-2">
                    <h3 className={`font-semibold ${
                      alert.type === 'critical' ? 'text-red-800 dark:text-red-200' : 'text-orange-800 dark:text-orange-200'
                    }`}>
                      {alert.title}
                    </h3>
                    <p className={`text-sm ${
                      alert.type === 'critical' ? 'text-red-700 dark:text-red-300' : 'text-orange-700 dark:text-orange-300'
                    }`}>
                      {alert.description}
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-900/20">
            Report Suspicious Activity
          </Button>
        </div>
      </motion.div>
    </section>
  );
}