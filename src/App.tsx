import React, { useState } from 'react';
import { PartyPopper, Sparkles, Loader2, Github, Linkedin } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { generateComprehensiveEventPlan } from './lib/gemini';
import toast from 'react-hot-toast';

const cuisineTypes = [
  'International',
  'Italian',
  'Asian',
  'Mediterranean',
  'American',
  'Mexican',
  'Indian',
  'French',
];

const mealTypes = [
  'Buffet',
  'Plated Dinner',
  'Cocktail Reception',
  'Brunch',
  'Food Stations',
];

const dietaryRestrictions = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Nut-Free',
  'Halal',
  'Kosher',
];

const demographics = [
  'Mixed Ages',
  'Adults Only',
  'Family Friendly',
  'Teenagers',
  'Corporate',
  'Seniors',
];

const currencies = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' },
  { code: 'INR', symbol: '₹' },
];

function App() {
  const [eventType, setEventType] = useState('');
  const [preferences, setPreferences] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [location, setLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [mealType, setMealType] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [demographic, setDemographic] = useState('');
  const [duration, setDuration] = useState('');
  const [isIndoor, setIsIndoor] = useState<boolean>(true);
  const [seatingConsiderations, setSeatingConsiderations] = useState('');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDietaryChange = (restriction: string) => {
    setSelectedDietary(prev =>
      prev.includes(restriction)
        ? prev.filter(r => r !== restriction)
        : [...prev, restriction]
    );
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const result = await generateComprehensiveEventPlan(
        eventType,
        preferences,
        Number(guestCount),
        Number(budget),
        currency,
        location,
        eventDate,
        selectedDietary,
        mealType,
        cuisine,
        demographic,
        Number(duration),
        isIndoor,
        seatingConsiderations
      );
      setPlan(result);
    } catch (error) {
      toast.error('Failed to generate event plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      eventType &&
      preferences &&
      guestCount &&
      budget &&
      location &&
      eventDate &&
      mealType &&
      cuisine &&
      demographic &&
      duration &&
      seatingConsiderations
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Toaster position="top-center" />
      
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <PartyPopper className="w-8 h-8 text-purple-400" />
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                AI Event Planner
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </h1>
              <p className="text-gray-400">Your comprehensive event planning assistant</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Event Type"
              className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            />
            
            <input
              type="number"
              placeholder="Number of Guests"
              className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
            />

            <div className="flex gap-2">
              <select
                className="w-1/3 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                {currencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code} ({curr.symbol})
                  </option>
                ))}
              </select>
              
              <input
                type="number"
                placeholder="Budget"
                className="flex-1 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            <input
              type="text"
              placeholder="Location"
              className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            
            <input
              type="date"
              className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />

            <input
              type="number"
              placeholder="Duration (hours)"
              className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />

            <select
              className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="">Select Meal Type</option>
              {mealTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            >
              <option value="">Select Cuisine Type</option>
              {cuisineTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              value={demographic}
              onChange={(e) => setDemographic(e.target.value)}
            >
              <option value="">Select Guest Demographics</option>
              {demographics.map(demo => (
                <option key={demo} value={demo}>{demo}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              rows={4}
              placeholder="Style preferences (e.g., colors, mood, special themes...)"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
            />

            <textarea
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              rows={4}
              placeholder="Seating considerations (e.g., family groups, accessibility needs, VIP guests...)"
              value={seatingConsiderations}
              onChange={(e) => setSeatingConsiderations(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
              <h3 className="text-sm font-medium mb-3">Dietary Restrictions</h3>
              <div className="flex flex-wrap gap-2">
                {dietaryRestrictions.map(restriction => (
                  <button
                    key={restriction}
                    onClick={() => handleDietaryChange(restriction)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                      ${selectedDietary.includes(restriction)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                  >
                    {restriction}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
              <h3 className="text-sm font-medium mb-3">Location Type</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsIndoor(true)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isIndoor
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                  Indoor
                </button>
                <button
                  onClick={() => setIsIndoor(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${!isIndoor
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                  Outdoor
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !isFormValid()}
            className="w-full p-4 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin inline-block" />
                Generating Comprehensive Plan...
              </>
            ) : (
              'Generate Event Plan'
            )}
          </button>

          {plan && (
            <div className="p-6 rounded-xl bg-gray-800 border border-gray-700 shadow-xl">
              <pre className="whitespace-pre-wrap text-white font-sans">{plan}</pre>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} AI Event Planner. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/aryan1112003"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/aryan-acharya-9b939b316/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <span className="text-gray-400 text-sm">
                Created by Aryan Acharya
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;