import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  'Education',
  'Healthcare',
  'Agriculture',
  'Employment',
  'Housing',
  'Women & Child',
  'Senior Citizen',
  'Startup',
  'Digital India',
];

const incomeRanges = [
  'Below ₹2 Lakh',
  '₹2-5 Lakh',
  '₹5-10 Lakh',
  'Above ₹10 Lakh',
];

export function SchemeFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIncome, setSelectedIncome] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState([18, 65]);
  const [activeFilters, setActiveFilters] = useState(0);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    }
  };

  const handleIncomeChange = (income: string, checked: boolean) => {
    if (checked) {
      setSelectedIncome(prev => [...prev, income]);
    } else {
      setSelectedIncome(prev => prev.filter(i => i !== income));
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedIncome([]);
    setAgeRange([18, 65]);
    setActiveFilters(0);
  };

  const totalFilters = selectedCategories.length + selectedIncome.length + (ageRange[0] !== 18 || ageRange[1] !== 65 ? 1 : 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </div>
            {totalFilters > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{totalFilters}</Badge>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Categories */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Categories</Label>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category, checked as boolean)
                    }
                  />
                  <Label htmlFor={category} className="text-sm">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Age Range */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">
              Age Range: {ageRange[0]} - {ageRange[1]} years
            </Label>
            <Slider
              value={ageRange}
              onValueChange={setAgeRange}
              max={80}
              min={18}
              step={1}
              className="w-full"
            />
          </div>

          {/* Income Range */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Annual Income</Label>
            <div className="space-y-2">
              {incomeRanges.map((income) => (
                <div key={income} className="flex items-center space-x-2">
                  <Checkbox
                    id={income}
                    checked={selectedIncome.includes(income)}
                    onCheckedChange={(checked) => 
                      handleIncomeChange(income, checked as boolean)
                    }
                  />
                  <Label htmlFor={income} className="text-sm">
                    {income}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Apply Filters Button */}
          <Button className="w-full" disabled={totalFilters === 0}>
            Apply Filters {totalFilters > 0 && `(${totalFilters})`}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}