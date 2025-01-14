import React, { useState } from 'react';
import { Store, Loader2 } from 'lucide-react';
import { generateVendorRecommendations } from '../lib/gemini';
import toast from 'react-hot-toast';

export default function VendorRecommendations() {
  const [eventType, setEventType] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const result = await generateVendorRecommendations(
        eventType,
        location,
        Number(budget),
        currency
      );
      setRecommendations(result);
    } catch (error) {
      toast.error('Failed to generate recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Store className="w-6 h-6 text-orange-400" />
        <h2 className="text-xl font-semibold">Vendor Recommendations</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Event Type"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        />
        
        <input
          type="text"
          placeholder="Location"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <select
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
          <option value="JPY">JPY (¥)</option>
          <option value="INR">INR (₹)</option>
        </select>
        
        <input
          type="number"
          placeholder="Budget"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading || !eventType || !location || !budget}
        className="flex items-center justify-center w-full p-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-medium disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Finding Vendors...
          </>
        ) : (
          'Get Recommendations'
        )}
      </button>

      {recommendations && (
        <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
          <pre className="whitespace-pre-wrap text-white">{recommendations}</pre>
        </div>
      )}
    </div>
  );
}