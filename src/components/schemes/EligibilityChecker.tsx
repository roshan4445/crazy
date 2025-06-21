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
  Loader2,
  Users,
  Clock,
  Languages,
  Globe,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  getEligibilityRecommendations, 
  getDetailedSchemeInfo, 
  getMultilingualExplanation,
  SUPPORTED_LANGUAGES,
  type UserProfile, 
  type Scheme 
} from '@/lib/gemini';

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
    language: 'english',
  });
  
  const [eligibleSchemes, setEligibleSchemes] = useState<Scheme[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [schemeDetails, setSchemeDetails] = useState<string>('');
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('english');

  const checkEligibility = async () => {
    if (!isFormComplete()) {
      toast.error('Please fill in all required fields (Age, Income, Gender, State)');
      return;
    }

    setIsChecking(true);
    try {
      const profileWithLanguage = { ...profile, language: currentLanguage };
      const results = await getEligibilityRecommendations(profileWithLanguage);
      setEligibleSchemes(results);
      
      if (results.length > 0) {
        toast.success(`🎉 Found ${results.length} eligible schemes for you!`, {
          description: 'AI has analyzed your profile and found matching government schemes.',
        });
      } else {
        toast.info('No schemes found matching your current profile.', {
          description: 'Try updating your information or check back later for new schemes.',
        });
      }
    } catch (error) {
      console.error('Error checking eligibility:', error);
      toast.error('Failed to get recommendations. Please try again.');
    } finally {
      setIsChecking(false);
    }
  };

  const loadSchemeDetails = async (scheme: Scheme) => {
    setSelectedScheme(scheme);
    setIsLoadingDetails(true);
    try {
      const details = await getDetailedSchemeInfo(scheme.title, currentLanguage);
      setSchemeDetails(details);
    } catch (error) {
      console.error('Error loading scheme details:', error);
      setSchemeDetails('Failed to load detailed information. Please try again or visit the official government portal.');
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    setProfile(prev => ({ ...prev, language }));
    
    // Show language change confirmation
    const languageName = SUPPORTED_LANGUAGES[language as keyof typeof SUPPORTED_LANGUAGES]?.name || 'English';
    toast.success(`Language changed to ${languageName}`, {
      description: 'AI responses will now be in your selected language.',
    });
  };

  const isFormComplete = () => {
    return profile.age && profile.income && profile.gender && profile.state;
  };

  const getProgressValue = (scheme: Scheme) => {
    return Math.round((scheme.applied / scheme.slots) * 100);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Education': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      'Business': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      'Digital India': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
      'Women & Child': 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300',
      'Agriculture': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
      'Healthcare': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
      'Housing': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
  };

  const getUrgencyColor = (scheme: Scheme) => {
    const progress = getProgressValue(scheme);
    if (scheme.isUrgent || progress > 90) return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/10';
    if (progress > 70) return 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/10';
    return 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/50';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/10 dark:to-green-900/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-600" />
              AI-Powered Eligibility Checker
              <Badge variant="secondary" className="ml-2">
                <Sparkles className="w-3 h-3 mr-1" />
                Gemini AI
              </Badge>
            </CardTitle>
            
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-gray-600" />
              <Select value={currentLanguage} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-32 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SUPPORTED_LANGUAGES).map(([key, lang]) => (
                    <SelectItem key={key} value={key}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Your Profile</TabsTrigger>
              <TabsTrigger value="results" disabled={eligibleSchemes.length === 0}>
                Eligible Schemes ({eligibleSchemes.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {/* Language Notice */}
                {currentLanguage !== 'english' && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Globe className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div className="text-xs">
                        <p className="font-medium text-blue-800 dark:text-blue-200">
                          Multilingual AI Support Active
                        </p>
                        <p className="text-blue-700 dark:text-blue-300 mt-1">
                          AI responses will be provided in {SUPPORTED_LANGUAGES[currentLanguage as keyof typeof SUPPORTED_LANGUAGES]?.name}. 
                          All scheme information will be translated for better understanding.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Basic Information */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Basic Information *
                  </h4>
                  
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
                    <Label htmlFor="income" className="text-xs">Annual Family Income *</Label>
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
                    <Label htmlFor="state" className="text-xs">State/UT *</Label>
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
                      Check Eligibility with AI
                    </div>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              {eligibleSchemes.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">You are eligible for {eligibleSchemes.length} schemes!</span>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {eligibleSchemes.map((scheme, index) => (
                      <motion.div
                        key={scheme.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`border rounded-lg p-4 space-y-3 hover:shadow-md transition-all ${getUrgencyColor(scheme)}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-sm">{scheme.title}</h4>
                              {scheme.isNew && (
                                <Badge variant="default" className="text-xs animate-pulse">
                                  NEW
                                </Badge>
                              )}
                              {scheme.isUrgent && (
                                <Badge variant="destructive" className="text-xs">
                                  <Clock className="w-3 h-3 mr-1" />
                                  URGENT
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                              {scheme.description}
                            </p>
                            <Badge className={getCategoryColor(scheme.category)}>
                              {scheme.category}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div className="flex items-center gap-1">
                            <IndianRupee className="w-3 h-3 text-green-600" />
                            <span className="font-medium">{scheme.amount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-blue-600" />
                            <span>{scheme.deadline}</span>
                          </div>
                        </div>

                        {/* Application Progress */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Applications: {scheme.applied.toLocaleString()}/{scheme.slots.toLocaleString()}</span>
                            <span className={getProgressValue(scheme) > 90 ? 'text-red-600 font-medium' : ''}>
                              {getProgressValue(scheme)}% filled
                            </span>
                          </div>
                          <Progress value={getProgressValue(scheme)} className="h-1" />
                          {getProgressValue(scheme) > 90 && (
                            <p className="text-xs text-red-600 font-medium">⚠️ Limited slots remaining!</p>
                          )}
                        </div>

                        {/* Eligibility Preview */}
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-gray-500">Why you're eligible:</p>
                          <div className="flex flex-wrap gap-1">
                            {scheme.eligibility.slice(0, 3).map((criteria, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                ✓ {criteria}
                              </Badge>
                            ))}
                            {scheme.eligibility.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{scheme.eligibility.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 h-7 text-xs"
                            onClick={() => loadSchemeDetails(scheme)}
                          >
                            <FileText className="w-3 h-3 mr-1" />
                            Detailed Info
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
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedScheme.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{selectedScheme.ministry}</p>
                      {currentLanguage !== 'english' && (
                        <Badge variant="outline" className="mt-1">
                          <Languages className="w-3 h-3 mr-1" />
                          {SUPPORTED_LANGUAGES[currentLanguage as keyof typeof SUPPORTED_LANGUAGES]?.name}
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedScheme(null)}>
                      ×
                    </Button>
                  </div>

                  {isLoadingDetails ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span className="ml-2">
                        {currentLanguage === 'english' 
                          ? 'Loading detailed information...' 
                          : 'Loading information in your language...'}
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {schemeDetails}
                      </div>
                      <div className="flex gap-2 pt-4 border-t">
                        <Button className="flex-1">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Apply for this Scheme
                        </Button>
                        <Button variant="outline" onClick={() => setSelectedScheme(null)}>
                          Close
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Info Section */}
          <div className="mt-4 space-y-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-xs">
                  <p className="font-medium text-blue-800 dark:text-blue-200">
                    AI-Powered Smart Matching
                  </p>
                  <p className="text-blue-700 dark:text-blue-300 mt-1">
                    Our advanced AI analyzes your complete profile against all government schemes to find perfect matches. 
                    Results are personalized and updated in real-time.
                  </p>
                </div>
              </div>
            </div>

            {currentLanguage !== 'english' && (
              <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-start gap-2">
                  <Globe className="w-4 h-4 text-green-600 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-medium text-green-800 dark:text-green-200">
                      Multilingual Support
                    </p>
                    <p className="text-green-700 dark:text-green-300 mt-1">
                      All scheme information, eligibility criteria, and application steps are translated to your language 
                      for better understanding and accessibility.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 mt-0.5" />
                <div className="text-xs">
                  <p className="font-medium text-amber-800 dark:text-amber-200">
                    Important Reminder
                  </p>
                  <p className="text-amber-700 dark:text-amber-300 mt-1">
                    Always verify information on official government websites before applying. 
                    Never pay money for government scheme applications - they are free!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}