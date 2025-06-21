import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  User, 
  Sparkles, 
  Brain, 
  FileText, 
  Calendar,
  IndianRupee,
  AlertCircle,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { getEligibilityRecommendations, getDetailedSchemeInfo, type UserProfile, type SchemeRecommendation } from '@/lib/gemini';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
  'Dadra and Nagar Haveli', 'Daman and Diu', 'Lakshadweep', 'Andaman and Nicobar Islands'
];

const educationLevels = [
  'Below 10th', '10th Pass', '12th Pass', 'Graduate', 'Post Graduate', 'Professional Degree', 'PhD'
];

const employmentStatus = [
  'Student', 'Unemployed', 'Self Employed', 'Private Job', 'Government Job', 'Retired', 'Homemaker'
];

const categories = [
  'General', 'OBC', 'SC', 'ST', 'EWS'
];

export function EligibilityChecker() {
  const [profile, setProfile] = useState<UserProfile>({
    age: '',
    income: '',
    gender: '',
    state: '',
    education: '',
    employment: '',
    category: '',
  });
  
  const [recommendations, setRecommendations] = useState<SchemeRecommendation[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<SchemeRecommendation | null>(null);
  const [schemeDetails, setSchemeDetails] = useState<string>('');
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const checkEligibility = async () => {
    if (!isFormComplete()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsChecking(true);
    try {
      const results = await getEligibilityRecommendations(profile);
      setRecommendations(results);
      toast.success(`Found ${results.length} scheme recommendations for you!`);
    } catch (error) {
      console.error('Error checking eligibility:', error);
      toast.error('Failed to get recommendations. Please try again.');
    } finally {
      setIsChecking(false);
    }
  };

  const loadSchemeDetails = async (scheme: SchemeRecommendation) => {
    setSelectedScheme(scheme);
    setIsLoadingDetails(true);
    try {
      const details = await getDetailedSchemeInfo(scheme.schemeName);
      setSchemeDetails(details);
    } catch (error) {
      console.error('Error loading scheme details:', error);
      setSchemeDetails('Failed to load detailed information. Please try again.');
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const isFormComplete = () => {
    return profile.age && profile.income && profile.gender && profile.state;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/10 dark:to-green-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            AI-Powered Eligibility Checker
            <Badge variant="secondary" className="ml-auto">
              <Sparkles className="w-3 h-3 mr-1" />
              Gemini AI
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Your Profile</TabsTrigger>
              <TabsTrigger value="results" disabled={recommendations.length === 0}>
                AI Recommendations ({recommendations.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {/* Basic Information */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300">Basic Information</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="age" className="text-xs">Age *</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Enter age"
                        value={profile.age}
                        onChange={(e) => setProfile(prev => ({ ...prev, age: e.target.value }))}
                        className="h-8"
                      />
                    </div>

                    <div>
                      <Label htmlFor="gender" className="text-xs">Gender *</Label>
                      <Select onValueChange={(value) => setProfile(prev => ({ ...prev, gender: value }))}>
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="income" className="text-xs">Annual Income *</Label>
                    <Select onValueChange={(value) => setProfile(prev => ({ ...prev, income: value }))}>
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select income range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below-1">Below ₹1 Lakh</SelectItem>
                        <SelectItem value="1-2">₹1-2 Lakh</SelectItem>
                        <SelectItem value="2-5">₹2-5 Lakh</SelectItem>
                        <SelectItem value="5-8">₹5-8 Lakh</SelectItem>
                        <SelectItem value="8-10">₹8-10 Lakh</SelectItem>
                        <SelectItem value="above-10">Above ₹10 Lakh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="state" className="text-xs">State *</Label>
                    <Select onValueChange={(value) => setProfile(prev => ({ ...prev, state: value }))}>
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent className="max-h-48">
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, '-')}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300">Additional Information (Optional)</h4>
                  
                  <div>
                    <Label htmlFor="education" className="text-xs">Education Level</Label>
                    <Select onValueChange={(value) => setProfile(prev => ({ ...prev, education: value }))}>
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select education" />
                      </SelectTrigger>
                      <SelectContent>
                        {educationLevels.map((level) => (
                          <SelectItem key={level} value={level.toLowerCase().replace(/\s+/g, '-')}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="employment" className="text-xs">Employment Status</Label>
                    <Select onValueChange={(value) => setProfile(prev => ({ ...prev, employment: value }))}>
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {employmentStatus.map((status) => (
                          <SelectItem key={status} value={status.toLowerCase().replace(/\s+/g, '-')}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-xs">Category</Label>
                    <Select onValueChange={(value) => setProfile(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category.toLowerCase()}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  onClick={checkEligibility}
                  disabled={!isFormComplete() || isChecking}
                >
                  {isChecking ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      AI is analyzing your profile...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      Get AI Recommendations
                    </div>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              {recommendations.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">AI found {recommendations.length} schemes for you!</span>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {recommendations.map((scheme, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border rounded-lg p-4 space-y-3 bg-white dark:bg-gray-800/50"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{scheme.schemeName}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              {scheme.benefits}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <Badge className={getPriorityColor(scheme.priority)}>
                              {scheme.priority.toUpperCase()}
                            </Badge>
                            <span className="text-xs font-medium text-green-600">
                              {scheme.eligibilityMatch}% match
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Eligibility Match</span>
                            <span>{scheme.eligibilityMatch}%</span>
                          </div>
                          <Progress value={scheme.eligibilityMatch} className="h-1" />
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-1">
                            <IndianRupee className="w-3 h-3 text-green-600" />
                            <span>{scheme.estimatedAmount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-blue-600" />
                            <span>{scheme.applicationDeadline}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            <strong>Why recommended:</strong> {scheme.reasoning}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 h-7 text-xs"
                            onClick={() => loadSchemeDetails(scheme)}
                          >
                            <FileText className="w-3 h-3 mr-1" />
                            View Details
                          </Button>
                          <Button size="sm" className="flex-1 h-7 text-xs">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Apply Now
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Scheme Details Modal */}
          <AnimatePresence>
            {selectedScheme && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                onClick={() => setSelectedScheme(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{selectedScheme.schemeName}</h3>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedScheme(null)}>
                      ×
                    </Button>
                  </div>

                  {isLoadingDetails ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span className="ml-2">Loading detailed information...</span>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="whitespace-pre-wrap text-sm">
                        {schemeDetails}
                      </div>
                      <div className="flex gap-2 pt-4 border-t">
                        <Button className="flex-1">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Apply for this Scheme
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* API Key Warning */}
          {!import.meta.env.VITE_GEMINI_API_KEY && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div className="text-xs">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">
                    Gemini API Key Required
                  </p>
                  <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                    Add your Gemini API key to environment variables as VITE_GEMINI_API_KEY for AI-powered recommendations.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}