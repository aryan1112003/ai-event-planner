import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('Api here');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export const generateComprehensiveEventPlan = async (
  eventType: string,
  preferences: string,
  guestCount: number,
  budget: number,
  currency: string,
  location: string,
  eventDate: string,
  dietaryRestrictions: string[],
  mealType: string,
  cuisine: string,
  guestDemographics: string,
  duration: number,
  isIndoor: boolean,
  seatingConsiderations: string
) => {
  const prompt = `Create a comprehensive event plan for a ${eventType} with the following details. Do not use asterisks or any special formatting characters in the response.

Event Basics:
- Guest Count: ${guestCount}
- Budget: ${budget} ${currency}
- Location: ${location}
- Date: ${eventDate}
- Duration: ${duration} hours
- Setting: ${isIndoor ? 'Indoor' : 'Outdoor'}
- Demographics: ${guestDemographics}

Preferences & Requirements:
- Style Preferences: ${preferences}
- Meal Type: ${mealType}
- Cuisine: ${cuisine}
- Dietary Restrictions: ${dietaryRestrictions.join(', ')}
- Seating Considerations: ${seatingConsiderations}

Provide a complete event plan with the following sections. Use clear headings and plain text without any special formatting:

1. THEME & DESIGN
   Theme concept
   Color scheme
   Decoration ideas
   Dress code

2. BUDGET BREAKDOWN
   Category-wise allocation
   Cost-saving tips
   Vendor budget limits

3. TIMELINE
   Pre-event checklist
   Day-of schedule
   Setup and teardown plan

4. VENDOR RECOMMENDATIONS
   Required vendor types
   Selection criteria
   Estimated costs

5. MENU PLAN
   Full menu selection
   Dietary accommodations
   Service style details

6. SEATING & LAYOUT
   Table arrangement
   Guest grouping strategy
   Flow optimization

7. ENTERTAINMENT
   Main activities
   Timeline integration
   Equipment needs

Format the response in clear sections using numbers and plain text only. Do not use any special characters for emphasis.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};