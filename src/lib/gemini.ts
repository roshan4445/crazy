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
  }
];

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

    // Create the prompt for AI filtering
    const prompt = `
You are a smart assistant for filtering government schemes. 
Given the following user details:
- Age: ${user.age}
- Gender: ${user.gender}
- Annual Family Income: ₹${user.income}
- State: ${user.state}
- Education: ${user.education || 'Not specified'}
- Employment: ${user.employment || 'Not specified'}
- Category: ${user.category || 'General'}

Filter the following JSON list of schemes and return ONLY the ones the user is eligible for. Use ONLY the eligibility criteria present in each scheme to match.

Return only the valid **filtered JSON array** without extra text or comments. No explanation needed.

### Scheme List:
${JSON.stringify(ALL_SCHEMES, null, 2)}

### Output Format:
[
  {
    "id": "...",
    "title": "...",
    "description": "...",
    ...
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
      const jsonString = data.candidates[0].content.parts[0].text;
      
      // Clean the response to extract only the JSON array
      const cleanedJson = jsonString.replace(/```json\n?|\n?```/g, '').trim();
      const filteredSchemes: Scheme[] = JSON.parse(cleanedJson);
      
      console.log("Filtered Eligible Schemes:", filteredSchemes);
      return filteredSchemes;
    } else {
      console.log("No response received from AI.");
      throw new Error("No response from AI");
    }

  } catch (error) {
    console.error("Error getting AI recommendations:", error);
    
    // Fallback: return some default schemes based on basic criteria
    return ALL_SCHEMES.filter(scheme => {
      const userAge = parseInt(profile.age);
      const userIncome = getIncomeValue(profile.income);
      
      // Basic filtering logic as fallback
      if (scheme.category === 'Education' && userAge >= 18 && userAge <= 25 && userIncome < 800000) {
        return true;
      }
      if (scheme.category === 'Digital India' && userAge >= 18 && userAge <= 35) {
        return true;
      }
      if (scheme.category === 'Women & Child' && profile.gender === 'female') {
        return true;
      }
      if (scheme.category === 'Healthcare' && userIncome < 1000000) {
        return true;
      }
      
      return false;
    }).slice(0, 5); // Return max 5 schemes as fallback
  }
}

export async function getDetailedSchemeInfo(schemeTitle: string): Promise<string> {
  try {
    const prompt = `
Provide detailed information about the "${schemeTitle}" government scheme in India. Include:

1. Complete scheme overview
2. Detailed eligibility criteria
3. Application process step by step
4. Required documents list
5. Benefits and coverage details
6. Important deadlines and timelines
7. Contact information and helpline
8. Tips for successful application
9. Common mistakes to avoid

Format the response in a clear, structured manner that would be helpful for a citizen applying for this scheme.
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
    return `Detailed information about ${schemeTitle} is currently unavailable. Please visit the official government portal or contact the relevant ministry for more information.

For general assistance:
- Visit: india.gov.in
- Call: 1800-11-1111 (Citizen Helpline)
- Email: support@gov.in

Please ensure you have all required documents and meet the eligibility criteria before applying.`;
  }
}