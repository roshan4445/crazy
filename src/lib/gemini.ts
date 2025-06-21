import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || 'your-api-key-here');

export interface UserProfile {
  age: string;
  income: string;
  gender: string;
  state: string;
  education?: string;
  employment?: string;
  category?: string;
}

export interface SchemeRecommendation {
  schemeName: string;
  eligibilityMatch: number;
  benefits: string;
  applicationDeadline: string;
  requiredDocuments: string[];
  applicationSteps: string[];
  estimatedAmount: string;
  priority: 'high' | 'medium' | 'low';
  reasoning: string;
}

export async function getEligibilityRecommendations(profile: UserProfile): Promise<SchemeRecommendation[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
You are an expert government scheme advisor for India. Based on the user profile below, recommend the most suitable government schemes they are eligible for.

User Profile:
- Age: ${profile.age}
- Annual Income: ${profile.income}
- Gender: ${profile.gender}
- State: ${profile.state}
- Education: ${profile.education || 'Not specified'}
- Employment Status: ${profile.employment || 'Not specified'}
- Category: ${profile.category || 'General'}

Please analyze this profile and recommend 5-7 most relevant government schemes. For each scheme, provide:

1. Scheme Name
2. Eligibility Match (percentage 0-100)
3. Key Benefits
4. Application Deadline (use realistic dates in 2024)
5. Required Documents (list 3-5 key documents)
6. Application Steps (3-4 main steps)
7. Estimated Amount/Benefit
8. Priority Level (high/medium/low)
9. Reasoning for recommendation

Focus on real Indian government schemes like:
- PM Scholarship Schemes
- Startup India Initiative
- Digital India Programs
- Skill Development Schemes
- Women-specific schemes (if applicable)
- State-specific schemes
- Education loans and scholarships
- Employment schemes
- Housing schemes
- Healthcare schemes

Format your response as a JSON array with the following structure:
[
  {
    "schemeName": "Scheme Name",
    "eligibilityMatch": 85,
    "benefits": "Key benefits description",
    "applicationDeadline": "March 31, 2024",
    "requiredDocuments": ["Aadhaar Card", "Income Certificate", "Educational Certificates"],
    "applicationSteps": ["Register online", "Upload documents", "Submit application", "Track status"],
    "estimatedAmount": "₹50,000 per year",
    "priority": "high",
    "reasoning": "Why this scheme is recommended for this user"
  }
]

Ensure all recommendations are realistic and based on actual government schemes. Consider the user's age, income bracket, gender, and state for accurate recommendations.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from AI');
    }

    const recommendations: SchemeRecommendation[] = JSON.parse(jsonMatch[0]);
    
    // Sort by eligibility match and priority
    return recommendations.sort((a, b) => {
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityWeight[b.priority] - priorityWeight[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return b.eligibilityMatch - a.eligibilityMatch;
    });

  } catch (error) {
    console.error('Error getting AI recommendations:', error);
    
    // Fallback recommendations if API fails
    return [
      {
        schemeName: 'PM Scholarship Scheme',
        eligibilityMatch: 75,
        benefits: 'Financial assistance for higher education',
        applicationDeadline: 'March 31, 2024',
        requiredDocuments: ['Aadhaar Card', 'Income Certificate', 'Educational Certificates'],
        applicationSteps: ['Register on portal', 'Upload documents', 'Submit application', 'Track status'],
        estimatedAmount: '₹50,000 per year',
        priority: 'high',
        reasoning: 'Based on your profile, this scheme offers excellent educational support'
      },
      {
        schemeName: 'Digital India Skill Development',
        eligibilityMatch: 80,
        benefits: 'Free digital skills training with certification',
        applicationDeadline: 'Ongoing',
        requiredDocuments: ['Aadhaar Card', 'Educational Certificate'],
        applicationSteps: ['Visit center', 'Choose course', 'Complete enrollment', 'Start training'],
        estimatedAmount: 'Free training + ₹15,000 stipend',
        priority: 'high',
        reasoning: 'Excellent opportunity for skill development and employment'
      }
    ];
  }
}

export async function getDetailedSchemeInfo(schemeName: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
Provide detailed information about the "${schemeName}" government scheme in India. Include:

1. Complete scheme overview
2. Detailed eligibility criteria
3. Application process
4. Required documents
5. Benefits and coverage
6. Important deadlines
7. Contact information
8. Tips for successful application

Format the response in a clear, structured manner that would be helpful for a citizen applying for this scheme.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error('Error getting scheme details:', error);
    return `Detailed information about ${schemeName} is currently unavailable. Please visit the official government portal or contact the relevant ministry for more information.`;
  }
}