import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, AlertTriangle, Construction, Calendar } from 'lucide-react';

const trafficUpdates = [
  {
    id: '1',
    type: 'traffic_jam',
    title: 'Heavy Traffic on Ring Road',
    location: 'Ring Road - Sector 15 to Sector 22',
    severity: 'high',
    description: 'Expect 45-60 minutes delay due to ongoing construction work.',
    timestamp: '15 minutes ago',
    estimatedClearance: '2 hours',
  },
  {
    id: '2',
    type: 'road_work',
    title: 'Road Maintenance Work',
    location: 'MG Road - Near City Center',
    severity: 'medium',
    description: 'Single lane closure for road resurfacing. Alternative routes available.',
    timestamp: '1 hour ago',
    estimatedClearance: '3 days',
  },
  {
    id: '3',
    type: 'event',
    title: 'Public Event - Marathon',
    location: 'Central Park to Stadium Road',
    severity: 'high',
    description: 'Road closure for city marathon. Multiple diversions in place.',
    timestamp: '2 hours ago',
    estimatedClearance: '6 hours',
  },
  {
    id: '4',
    type: 'accident',
    title: 'Minor Accident Cleared',
    location: 'Highway Junction - Exit 12',
    severity: 'low',
    description: 'Traffic moving normally after minor fender bender was cleared.',
    timestamp: '3 hours ago',
    estimatedClearance: 'Cleared',
  },
  {
    id: '5',
    type: 'signal_issue',
    title: 'Traffic Signal Malfunction',
    location: 'Main Street & 5th Avenue',
    severity: 'medium',
    description: 'Traffic police deployed. Repair work in progress.',
    timestamp: '4 hours ago',
    estimatedClearance: '1 hour',
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'traffic_jam':
      return <AlertTriangle className="w-4 h-4" />;
    case 'road_work':
      return <Construction className="w-4 h-4" />;
    case 'event':
      return <Calendar className="w-4 h-4" />;
    default:
      return <MapPin className="w-4 h-4" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'destructive';
    case 'medium':
      return 'default';
    case 'low':
      return 'secondary';
    default:
      return 'outline';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'traffic_jam':
      return 'text-red-600 bg-red-50 dark:bg-red-900/10';
    case 'road_work':
      return 'text-orange-600 bg-orange-50 dark:bg-orange-900/10';
    case 'event':
      return 'text-blue-600 bg-blue-50 dark:bg-blue-900/10';
    case 'signal_issue':
      return 'text-purple-600 bg-purple-50 dark:bg-purple-900/10';
    default:
      return 'text-gray-600 bg-gray-50 dark:bg-gray-900/10';
  }
};

export function TrafficUpdates() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Live Traffic Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trafficUpdates.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${getTypeColor(update.type)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getTypeIcon(update.type)}
                  <h3 className="font-semibold">{update.title}</h3>
                </div>
                <Badge variant={getSeverityColor(update.severity) as any}>
                  {update.severity.toUpperCase()}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{update.location}</span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {update.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{update.timestamp}</span>
                  </div>
                  <span>
                    {update.estimatedClearance === 'Cleared' ? (
                      <Badge variant="secondary" className="text-xs">
                        ✓ Cleared
                      </Badge>
                    ) : (
                      `Est. clearance: ${update.estimatedClearance}`
                    )}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="text-center pt-4">
            <p className="text-sm text-gray-500">
              Updates refresh every 5 minutes • Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}