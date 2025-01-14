import React, { useState } from 'react';
import { Calculator, Loader2 } from 'lucide-react';
import { generateBudget } from '../lib/gemini';
import toast from 'react-hot-toast';

const currencies = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' },
  { code: 'INR', symbol: '₹' },
];

export default function BudgetPlanner() {
  const [eventType, setEventType] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [breakdown, setBreakdown] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const result = await generateBudget(
        eventType,
        Number(guestCount),
        Number(budget),
        currency
      );
      setBreakdown(result);
    } catch (error) {
      toast.error('Failed to generate budget. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Calculator className="w-6 h-6 text-green-400" />
        <h2 className="text-xl font-semibold">Budget Planner</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Event Type"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        />
        
        <input
          type="number"
          placeholder="Number of Guests"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
        />

        <div className="flex gap-2">
          <select
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
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
            placeholder="Total Budget"
            className="flex-1 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading || !eventType || !guestCount || !budget}
        className="flex items-center justify-center w-full p-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Calculating...
          </>
        ) : (
          'Generate Budget'
        )}
      </button>

      {breakdown && (
        <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
          <pre className="whitespace-pre-wrap text-white">{breakdown}</pre>
        </div>
      )}
    </div>
  );
}