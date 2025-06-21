import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Send, 
  Clock, 
  Star, 
  MapPin, 
  IndianRupee,
  User,
  Phone,
  Mail,
  Calendar,
  Award,
  X
} from 'lucide-react';

const applicationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  age: z.string().min(1, 'Please provide your age'),
  phone: z.string().min(10, 'Please provide a valid phone number'),
  email: z.string().email('Please provide a valid email address'),
  address: z.string().min(10, 'Please provide your complete address'),
  experience: z.string().min(1, 'Please describe your experience'),
  availability: z.array(z.string()).min(1, 'Please select at least one time slot'),
  whyInterested: z.string().min(20, 'Please explain why you are interested (minimum 20 characters)'),
  additionalSkills: z.string().optional(),
  references: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface WorkDetails {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  duration: string;
  payment: string;
  requirements: string[];
  timeSlots: string[];
  clientInfo: {
    name: string;
    rating: number;
    reviews: number;
  };
}

interface WorkApplicationFormProps {
  workDetails: WorkDetails;
  onSubmit: (applicationData: ApplicationFormData) => void;
  onCancel: () => void;
}

export function WorkApplicationForm({ workDetails, onSubmit, onCancel }: WorkApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: '',
      age: '',
      phone: '',
      email: '',
      address: '',
      experience: '',
      availability: [],
      whyInterested: '',
      additionalSkills: '',
      references: '',
    },
  });

  const handleSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const applicationId = `APP${Date.now().toString().slice(-6)}`;
    
    toast.success(`Application submitted successfully! Reference ID: ${applicationId}`, {
      description: 'The client will review your application and contact you within 24-48 hours.',
    });
    
    onSubmit(data);
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Apply for Work Opportunity</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Fill out this form to apply for the selected work opportunity
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Work Details Summary */}
          <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{workDetails.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>{workDetails.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span>{workDetails.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-purple-600" />
                  <span className="font-medium">{workDetails.payment}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-orange-600" />
                  <span>{workDetails.clientInfo.name}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs">{workDetails.clientInfo.rating}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Requirements:</p>
                <div className="flex flex-wrap gap-1">
                  {workDetails.requirements.map((req, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter your age" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter your complete address"
                          rows={3}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Experience & Skills */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Experience & Skills
                </h3>
                
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relevant Experience *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your experience related to this work opportunity"
                          rows={4}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalSkills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Skills (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any additional skills that might be relevant"
                          rows={3}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Availability */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Availability
                </h3>
                
                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available Time Slots *</FormLabel>
                      <div className="space-y-2">
                        {workDetails.timeSlots.map((slot) => (
                          <div key={slot} className="flex items-center space-x-2">
                            <Checkbox
                              id={slot}
                              checked={field.value?.includes(slot)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, slot]);
                                } else {
                                  field.onChange(field.value?.filter((value) => value !== slot));
                                }
                              }}
                            />
                            <Label htmlFor={slot} className="text-sm">
                              {slot}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Motivation */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Why are you interested?</h3>
                
                <FormField
                  control={form.control}
                  name="whyInterested"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tell us why you're interested in this opportunity *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Explain your motivation and what you hope to achieve"
                          rows={4}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="references"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>References (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide contact details of people who can vouch for your skills"
                          rows={3}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-6 border-t">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting Application...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Submit Application
                      </div>
                    )}
                  </Button>
                </motion.div>
              </div>
            </form>
          </Form>
        </div>
      </motion.div>
    </motion.div>
  );
}