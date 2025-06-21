// Gemini API configuration
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyArEUNEuoe_eGJ2WqW_No-UJB2VJN7oIO4";

export interface UserProfile {
  age: string;
  income: string;
  gender: string;
  state: string;
  education?: string;
  employment?: string;
  category?: string;
  language?: string;
}

export interface Scheme {
  id: string;
  title: string;
  description: string;
  amount: string;
  deadline: string;
  category: string;
  eligibility: string[];
  benefits: string[];
  applicationSteps: string[];
  isNew: boolean;
  isUrgent: boolean;
  applied: number;
  slots: number;
  ministry: string;
}

// Complete list of government schemes
const ALL_SCHEMES: Scheme[] = [
  {
    id: '1',
    title: 'PM Scholarship for Higher Education',
    description: 'Financial assistance for meritorious students pursuing higher education in recognized institutions.',
    amount: '₹50,000 per year',
    deadline: 'March 31, 2024',
    category: 'Education',
    eligibility: ['Age 18-25', 'Minimum 60% marks', 'Family income < ₹8 lakh'],
    benefits: ['Annual scholarship', 'Book allowance', 'Laptop provided'],
    applicationSteps: [
      'Register on National Scholarship Portal',
      'Upload required documents',
      'Fill application form',
      'Submit for verification'
    ],
    isNew: false,
    isUrgent: true,
    applied: 12450,
    slots: 15000,
    ministry: 'Ministry of Education',
  },
  {
    id: '2',
    title: 'Startup India Seed Fund Scheme',
    description: 'Funding support for innovative startups to validate proof of concept and prototype development.',
    amount: 'Up to ₹20 lakh',
    deadline: 'April 15, 2024',
    category: 'Business',
    eligibility: ['Registered startup', 'Age < 2 years', 'Innovative idea'],
    benefits: ['Seed funding', 'Mentorship', 'Network access'],
    applicationSteps: [
      'Register on Startup India portal',
      'Submit business plan',
      'Pitch to selection committee',
      'Sign funding agreement'
    ],
    isNew: true,
    isUrgent: true,
    applied: 8900,
    slots: 2000,
    ministry: 'Ministry of Commerce & Industry',
  },
  {
    id: '3',
    title: 'Digital India Skill Development Program',
    description: 'Free training in digital skills to make citizens job-ready in the digital economy.',
    amount: 'Free + ₹15,000 stipend',
    deadline: 'Ongoing',
    category: 'Digital India',
    eligibility: ['Age 18-35', 'Basic education', 'Unemployment status'],
    benefits: ['Free training', 'Certification', 'Job placement'],
    applicationSteps: [
      'Visit nearest digital center',
      'Choose training module',
      'Complete enrollment',
      'Start training program'
    ],
    isNew: true,
    isUrgent: false,
    applied: 45600,
    slots: 100000,
    ministry: 'Ministry of Skill Development',
  },
  {
    id: '4',
    title: 'Women Entrepreneur Support Scheme',
    description: 'Financial and technical support for women-led startups and businesses.',
    amount: 'Up to ₹5 lakh',
    deadline: 'May 30, 2024',
    category: 'Women & Child',
    eligibility: ['Women entrepreneur', 'Age 21-45', 'Business plan ready'],
    benefits: ['Funding support', 'Mentorship', 'Market linkage'],
    applicationSteps: [
      'Submit online application',
      'Upload business plan',
      'Attend interview',
      'Get approval and funding'
    ],
    isNew: false,
    isUrgent: false,
    applied: 3200,
    slots: 5000,
    ministry: 'Ministry of Women & Child Development',
  },
  {
    id: '5',
    title: 'PM Kisan Samman Nidhi',
    description: 'Income support to farmer families owning cultivable land.',
    amount: '₹6,000 per year',
    deadline: 'Ongoing',
    category: 'Agriculture',
    eligibility: ['Farmer families', 'Cultivable land ownership', 'Valid land records'],
    benefits: ['Direct cash transfer', 'Three installments', 'No processing fee'],
    applicationSteps: [
      'Visit PM Kisan portal',
      'Fill registration form',
      'Upload land documents',
      'Submit for verification'
    ],
    isNew: false,
    isUrgent: false,
    applied: 110000000,
    slots: 120000000,
    ministry: 'Ministry of Agriculture',
  },
  {
    id: '6',
    title: 'Ayushman Bharat Health Insurance',
    description: 'Health insurance coverage for economically vulnerable families.',
    amount: '₹5 lakh per family per year',
    deadline: 'Ongoing',
    category: 'Healthcare',
    eligibility: ['BPL families', 'SECC database inclusion', 'Valid Aadhaar'],
    benefits: ['Cashless treatment', 'Secondary care', 'Tertiary care'],
    applicationSteps: [
      'Check eligibility online',
      'Visit nearest center',
      'Get Ayushman card',
      'Use at empaneled hospitals'
    ],
    isNew: false,
    isUrgent: false,
    applied: 50000000,
    slots: 100000000,
    ministry: 'Ministry of Health',
  },
  {
    id: '7',
    title: 'Pradhan Mantri Awas Yojana',
    description: 'Affordable housing scheme for economically weaker sections.',
    amount: 'Up to ₹2.5 lakh subsidy',
    deadline: 'March 2024',
    category: 'Housing',
    eligibility: ['First-time home buyer', 'Income < ₹18 lakh', 'No pucca house'],
    benefits: ['Interest subsidy', 'Loan assistance', 'Construction support'],
    applicationSteps: [
      'Apply through bank',
      'Submit income proof',
      'Property verification',
      'Loan approval'
    ],
    isNew: false,
    isUrgent: true,
    applied: 9000000,
    slots: 12000000,
    ministry: 'Ministry of Housing',
  },
  {
    id: '8',
    title: 'Stand Up India Scheme',
    description: 'Bank loans for SC/ST and women entrepreneurs.',
    amount: '₹10 lakh to ₹1 crore',
    deadline: 'Ongoing',
    category: 'Business',
    eligibility: ['SC/ST/Women', 'Age 18+', 'First-time entrepreneur'],
    benefits: ['Bank loan', 'Handholding support', 'Credit guarantee'],
    applicationSteps: [
      'Prepare business plan',
      'Apply through bank',
      'Document verification',
      'Loan sanction'
    ],
    isNew: false,
    isUrgent: false,
    applied: 125000,
    slots: 250000,
    ministry: 'Ministry of Finance',
  },
  {
    id: '9',
    title: 'Mudra Loan Scheme',
    description: 'Micro-finance loans for small businesses and entrepreneurs.',
    amount: 'Up to ₹10 lakh',
    deadline: 'Ongoing',
    category: 'Business',
    eligibility: ['Small business owner', 'Non-corporate entity', 'Valid business plan'],
    benefits: ['Collateral-free loan', 'Low interest rates', 'Easy processing'],
    applicationSteps: [
      'Visit bank or NBFC',
      'Submit application',
      'Business verification',
      'Loan disbursement'
    ],
    isNew: false,
    isUrgent: false,
    applied: 28000000,
    slots: 35000000,
    ministry: 'Ministry of Finance',
  },
  {
    id: '10',
    title: 'Beti Bachao Beti Padhao',
    description: 'Scheme to improve child sex ratio and promote girl child education.',
    amount: 'Various benefits',
    deadline: 'Ongoing',
    category: 'Women & Child',
    eligibility: ['Girl child', 'Parents of girl child', 'Educational institutions'],
    benefits: ['Educational support', 'Awareness programs', 'Financial incentives'],
    applicationSteps: [
      'Contact local authorities',
      'Submit required documents',
      'Enroll in program',
      'Receive benefits'
    ],
    isNew: false,
    isUrgent: false,
    applied: 5000000,
    slots: 10000000,
    ministry: 'Ministry of Women & Child Development',
  }
];

// Language configurations
export const SUPPORTED_LANGUAGES = {
  'english': { name: 'English', code: 'en' },
  'hindi': { name: 'हिंदी', code: 'hi' },
  'bengali': { name: 'বাংলা', code: 'bn' },
  'tamil': { name: 'தமிழ்', code: 'ta' },
  'telugu': { name: 'తెలుగు', code: 'te' },
  'marathi': { name: 'मराठी', code: 'mr' },
  'gujarati': { name: 'ગુજરાતી', code: 'gu' },
  'kannada': { name: 'ಕನ್ನಡ', code: 'kn' },
  'malayalam': { name: 'മലയാളം', code: 'ml' },
  'punjabi': { name: 'ਪੰਜਾਬੀ', code: 'pa' },
  'urdu': { name: 'اردو', code: 'ur' },
  'odia': { name: 'ଓଡ଼ିଆ', code: 'or' }
};

// Convert user profile to income number for comparison
function getIncomeValue(incomeRange: string): number {
  switch (incomeRange) {
    case 'below-1': return 75000;
    case '1-2': return 150000;
    case '2-5': return 350000;
    case '5-8': return 650000;
    case '8-10': return 900000;
    case 'above-10': return 1200000;
    default: return 500000;
  }
}

export async function getEligibilityRecommendations(profile: UserProfile): Promise<Scheme[]> {
  try {
    // Convert profile to format expected by AI
    const user = {
      age: parseInt(profile.age),
      gender: profile.gender,
      income: getIncomeValue(profile.income),
      state: profile.state,
      education: profile.education,
      employment: profile.employment,
      category: profile.category
    };

    const selectedLanguage = profile.language || 'english';
    const languageInstruction = selectedLanguage === 'english' 
      ? 'Respond in English only.' 
      : `Respond in ${SUPPORTED_LANGUAGES[selectedLanguage as keyof typeof SUPPORTED_LANGUAGES]?.name || 'English'} language. Translate all scheme information, eligibility criteria, and descriptions to this language.`;

    // Create the prompt for AI filtering
    const prompt = `
You are a smart assistant for filtering government schemes in India. ${languageInstruction}

Given the following user details:
- Age: ${user.age} years
- Gender: ${user.gender}
- Annual Family Income: ₹${user.income.toLocaleString()}
- State: ${user.state}
- Education: ${user.education || 'Not specified'}
- Employment: ${user.employment || 'Not specified'}
- Category: ${user.category || 'General'}

TASK: Filter the following JSON list of schemes and return ONLY the ones the user is DEFINITELY eligible for based on the eligibility criteria.

IMPORTANT INSTRUCTIONS:
1. Be VERY STRICT with eligibility matching
2. Check age ranges carefully (e.g., "Age 18-25" means user must be between 18 and 25)
3. Check income limits precisely (e.g., "Family income < ₹8 lakh" means income must be less than 800,000)
4. Consider gender-specific schemes (e.g., women-only schemes)
5. Consider category-specific schemes (SC/ST/OBC requirements)
6. If user doesn't meet ANY criteria of a scheme, exclude it completely
7. Return schemes in order of relevance (most relevant first)
8. ${languageInstruction}

Return ONLY the valid filtered JSON array without any extra text, explanations, or markdown formatting.

### Scheme List:
${JSON.stringify(ALL_SCHEMES, null, 2)}

### Expected Output Format:
[
  {
    "id": "...",
    "title": "...",
    "description": "...",
    "amount": "...",
    "deadline": "...",
    "category": "...",
    "eligibility": [...],
    "benefits": [...],
    "applicationSteps": [...],
    "isNew": boolean,
    "isUrgent": boolean,
    "applied": number,
    "slots": number,
    "ministry": "..."
  }
]
`;

    const options = {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        "contents": [{
          "parts": [{
            "text": prompt
          }]
        }]
      })
    };

    const response = await fetch(GEMINI_API_URL, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates.length > 0) {
      let jsonString = data.candidates[0].content.parts[0].text;
      
      // Clean the response to extract only the JSON array
      jsonString = jsonString.replace(/```json\n?|\n?```/g, '').trim();
      
      // Remove any text before the first [ and after the last ]
      const startIndex = jsonString.indexOf('[');
      const endIndex = jsonString.lastIndexOf(']');
      
      if (startIndex !== -1 && endIndex !== -1) {
        jsonString = jsonString.substring(startIndex, endIndex + 1);
      }
      
      const filteredSchemes: Scheme[] = JSON.parse(jsonString);
      
      console.log("AI Filtered Eligible Schemes:", filteredSchemes);
      return filteredSchemes;
    } else {
      console.log("No response received from AI.");
      throw new Error("No response from AI");
    }

  } catch (error) {
    console.error("Error getting AI recommendations:", error);
    
    // Enhanced fallback logic
    return getLocalFallbackSchemes(profile);
  }
}

// Enhanced local fallback with better logic
function getLocalFallbackSchemes(profile: UserProfile): Scheme[] {
  const userAge = parseInt(profile.age);
  const userIncome = getIncomeValue(profile.income);
  const eligibleSchemes: Scheme[] = [];

  ALL_SCHEMES.forEach(scheme => {
    let isEligible = false;

    // Education schemes
    if (scheme.category === 'Education') {
      if (userAge >= 18 && userAge <= 25 && userIncome < 800000) {
        isEligible = true;
      }
    }
    
    // Digital India schemes
    else if (scheme.category === 'Digital India') {
      if (userAge >= 18 && userAge <= 35) {
        isEligible = true;
      }
    }
    
    // Women & Child schemes
    else if (scheme.category === 'Women & Child') {
      if (profile.gender === 'female') {
        isEligible = true;
      }
    }
    
    // Healthcare schemes
    else if (scheme.category === 'Healthcare') {
      if (userIncome < 1000000) {
        isEligible = true;
      }
    }
    
    // Business schemes
    else if (scheme.category === 'Business') {
      if (userAge >= 18 && (profile.employment === 'self-employed' || profile.employment === 'unemployed')) {
        isEligible = true;
      }
    }
    
    // Agriculture schemes
    else if (scheme.category === 'Agriculture') {
      if (profile.employment === 'self-employed' || profile.state?.includes('rural')) {
        isEligible = true;
      }
    }
    
    // Housing schemes
    else if (scheme.category === 'Housing') {
      if (userIncome < 1800000) {
        isEligible = true;
      }
    }

    if (isEligible) {
      eligibleSchemes.push(scheme);
    }
  });

  return eligibleSchemes.slice(0, 6); // Return max 6 schemes
}

export async function getDetailedSchemeInfo(schemeTitle: string, language: string = 'english'): Promise<string> {
  try {
    const languageInstruction = language === 'english' 
      ? 'Provide the response in clear, simple English.' 
      : `Provide the complete response in ${SUPPORTED_LANGUAGES[language as keyof typeof SUPPORTED_LANGUAGES]?.name || 'English'} language. Translate all information including technical terms, procedures, and requirements.`;

    const prompt = `
${languageInstruction}

Provide comprehensive and VERY CLEAR information about the "${schemeTitle}" government scheme in India. Structure your response as follows:

## 📋 SCHEME OVERVIEW
- What is this scheme about?
- Who launched it and when?
- Main objectives

## ✅ DETAILED ELIGIBILITY CRITERIA
- Age requirements (if any)
- Income limits (specify exact amounts)
- Educational qualifications needed
- Gender/category requirements
- State/region specific criteria
- Any other specific conditions

## 💰 FINANCIAL BENEFITS
- Exact amount of money/benefits
- How the money is disbursed
- Payment schedule/frequency
- Any additional benefits

## 📝 STEP-BY-STEP APPLICATION PROCESS
1. First step (be very specific)
2. Second step (include where to go/what website)
3. Third step (mention documents needed)
4. Continue with all steps...
5. Final step (what happens after approval)

## 📄 REQUIRED DOCUMENTS CHECKLIST
- Document 1 (explain why needed)
- Document 2 (explain why needed)
- Continue for all documents...

## ⏰ IMPORTANT DEADLINES & TIMELINES
- Application deadline (if any)
- Processing time
- When benefits start
- Renewal requirements

## 📞 CONTACT INFORMATION & HELP
- Official website URL
- Helpline numbers
- Email addresses
- Local office contacts

## 💡 SUCCESS TIPS
- Best practices for application
- Common mistakes to avoid
- How to track application status

## ⚠️ IMPORTANT WARNINGS
- Fraud prevention tips
- What to watch out for
- Official vs fake websites

Make the language simple and easy to understand for common citizens. Use bullet points and clear formatting.
`;

    const options = {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        "contents": [{
          "parts": [{
            "text": prompt
          }]
        }]
      })
    };

    const response = await fetch(GEMINI_API_URL, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("No response from AI");
    }

  } catch (error) {
    console.error('Error getting scheme details:', error);
    
    const fallbackLanguage = language === 'english' ? 'English' : SUPPORTED_LANGUAGES[language as keyof typeof SUPPORTED_LANGUAGES]?.name || 'English';
    
    return `## ⚠️ Information Currently Unavailable

Detailed information about **${schemeTitle}** is temporarily unavailable in ${fallbackLanguage}.

### 🔗 Alternative Resources:
- **Official Portal**: india.gov.in
- **Citizen Helpline**: 1800-11-1111
- **Email Support**: support@gov.in

### 📋 General Application Tips:
1. **Verify Eligibility**: Check all criteria carefully
2. **Prepare Documents**: Keep all required papers ready
3. **Official Channels**: Apply only through government websites
4. **Avoid Fraud**: Never pay money for government scheme applications
5. **Track Status**: Save your application reference number

### 🏛️ Visit Local Offices:
- District Collector Office
- Block Development Office
- Common Service Centers (CSC)

Please contact the relevant ministry or visit official government portals for accurate and up-to-date information about this scheme.`;
  }
}

export async function getMultilingualExplanation(text: string, targetLanguage: string): Promise<string> {
  if (targetLanguage === 'english') return text;

  try {
    const languageName = SUPPORTED_LANGUAGES[targetLanguage as keyof typeof SUPPORTED_LANGUAGES]?.name || 'English';
    
    const prompt = `
Translate the following government scheme information to ${languageName} language. 
Maintain the same structure and formatting. 
Make sure technical terms are properly translated but keep official scheme names in English with local translation in brackets.

Original text:
${text}

Provide the complete translation in ${languageName}:
`;

    const options = {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        "contents": [{
          "parts": [{
            "text": prompt
          }]
        }]
      })
    };

    const response = await fetch(GEMINI_API_URL, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      return text; // Return original if translation fails
    }

  } catch (error) {
    console.error('Error translating text:', error);
    return text; // Return original text if translation fails
  }
}