import React, { useState } from 'react';
import { UtensilsCrossed, Loader2 } from 'lucide-react';
import { generateMenuSuggestions } from '../lib/gemini';
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

export default function MenuPlanner() {
  const [eventType, setEventType] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [mealType, setMealType] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [menu, setMenu] = useState('');
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
      const result = await generateMenuSuggestions(
        eventType,
        Number(guestCount),
        selectedDietary,
        mealType,
        cuisine
      );
      setMenu(result);
    } catch (error) {
      toast.error('Failed to generate menu. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <UtensilsCrossed className="w-6 h-6 text-pink-400" />
        <h2 className="text-xl font-semibold">Menu Planner</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Event Type"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        />
        
        <input
          type="number"
          placeholder="Number of Guests"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
        />

        <select
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
        >
          <option value="">Select Meal Type</option>
          {mealTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        >
          <option value="">Select Cuisine Type</option>
          {cuisineTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
        <h3 className="text-sm font-medium mb-3">Dietary Restrictions</h3>
        <div className="flex flex-wrap gap-2">
          {dietaryRestrictions.map(restriction => (
            <button
              key={restriction}
              onClick={() => handleDietaryChange(restriction)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${selectedDietary.includes(restriction)
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
            >
              {restriction}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading || !eventType || !guestCount || !mealType || !cuisine}
        className="flex items-center justify-center w-full p-3 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-medium disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generating Menu...
          </>
        ) : (
          'Generate Menu'
        )}
      </button>

      {menu && (
        <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
          <pre className="whitespace-pre-wrap text-white">{menu}</pre>
        </div>
      )}
    </div>
  );
}