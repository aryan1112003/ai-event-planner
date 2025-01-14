import React, { useState } from 'react';
import { Users, Loader2 } from 'lucide-react';
import { generateSeatingPlan } from '../lib/gemini';
import toast from 'react-hot-toast';

export default function SeatingPlanner() {
  const [eventType, setEventType] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [considerations, setConsiderations] = useState('');
  const [seatingPlan, setSeatingPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const result = await generateSeatingPlan(
        eventType,
        Number(guestCount),
        considerations
      );
      setSeatingPlan(result);
    } catch (error) {
      toast.error('Failed to generate seating plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Users className="w-6 h-6 text-indigo-400" />
        <h2 className="text-xl font-semibold">Seating Planner</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Event Type"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        />
        
        <input
          type="number"
          placeholder="Number of Guests"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
        />
      </div>

      <textarea
        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        rows={4}
        placeholder="Special considerations (e.g., family groups, accessibility needs, VIP guests...)"
        value={considerations}
        onChange={(e) => setConsiderations(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        disabled={loading || !eventType || !guestCount || !considerations}
        className="flex items-center justify-center w-full p-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generating Plan...
          </>
        ) : (
          'Generate Seating Plan'
        )}
      </button>

      {seatingPlan && (
        <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
          <pre className="whitespace-pre-wrap text-white">{seatingPlan}</pre>
        </div>
      )}
    </div>
  );
}