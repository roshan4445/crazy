import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, User, Sparkles } from 'lucide-react';

interface UserProfile {
  age: string;
  income: string;
  gender: string;
  state: string;
}

const mockEligibleSchemes = [
  'PM Scholarship Scheme',
  'Startup India Initiative',
  'Digital India Program',
  'Skill Development Scheme',
];

export function EligibilityChecker() {
  const [profile, setProfile] = useState<UserProfile>({
    age: '',
    income: '',
    gender: '',
    state: '',
  });
  const [eligibleSchemes, setEligibleSchemes] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const checkEligibility = async () => {
    setIsChecking(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setEligibleSchemes(mockEligibleSchemes);
    setIsChecking(false);
  };

  const isFormComplete = Object.values(profile).every(value => value !== '');

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/10 dark:to-green-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Eligibility Checker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={profile.age}
                onChange={(e) => setProfile(prev => ({ ...prev, age: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="income">Annual Income</Label>
              <Select onValueChange={(value) => setProfile(prev => ({ ...prev, income: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select income range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="below-2">Below ₹2 Lakh</SelectItem>
                  <SelectItem value="2-5">₹2-5 Lakh</SelectItem>
                  <SelectItem value="5-10">₹5-10 Lakh</SelectItem>
                  <SelectItem value="above-10">Above ₹10 Lakh</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={(value) => setProfile(prev => ({ ...prev, gender: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="state">State</Label>
              <Select onValueChange={(value) => setProfile(prev => ({ ...prev, state: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="chennai">Chennai</SelectItem>
                  <SelectItem value="kolkata">Kolkata</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={checkEligibility}
            disabled={!isFormComplete || isChecking}
          >
            {isChecking ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Checking...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Check Eligibility
              </div>
            )}
          </Button>

          {eligibleSchemes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">You're eligible for:</span>
              </div>
              <div className="space-y-2">
                {eligibleSchemes.map((scheme, index) => (
                  <motion.div
                    key={scheme}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Badge variant="secondary" className="w-full justify-start p-2">
                      {scheme}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}