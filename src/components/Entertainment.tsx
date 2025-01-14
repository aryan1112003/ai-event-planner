import React, { useState } from 'react';
import { Music, Loader2 } from 'lucide-react';
import { generateEntertainmentIdeas } from '../lib/gemini';
import toast from 'react-hot-toast';

const demographics = [
  'Mixed Ages',
  'Adults Only',
  'Family Friendly',
  'Teenagers',
  'Corporate',
  'Seniors',
];

export default function Entertainment() {
  const [eventType, setEventType] = useState('');
  const [demographic, setDemographic] = useState('');
  const [duration, setDuration] = useState('');
  const [isIndoor, setIsIndoor] = useState<boolean>(true);
  const [ideas, setIdeas] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const result = await generateEntertainmentIdeas(
        eventType,
        demographic,
        Number(duration),
        isIndoor
      );
      setIdeas(result);
    } catch (error) {
      toast.error('Failed to generate entertainment ideas. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Music className="w-6 h-6 text-rose-400" />
        <h2 className="text-xl font-semibold">Entertainment Planner</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Event Type"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        />
        
        <select
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
          value={demographic}
          onChange={(e) => setDemographic(e.target.value)}
        >
          <option value="">Select Guest Demographics</option>
          {demographics.map(demo => (
            <option key={demo} value={demo}>{demo}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Duration (hours)"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <div className="flex gap-4 items-center p-3 rounded-lg bg-gray-800 border border-gray-700">
          <span className="text-gray-300">Location:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setIsIndoor(true)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${isIndoor
                  ? 'bg-rose-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
            >
              Indoor
            </button>
            <button
              onClick={() => setIsIndoor(false)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${!isIndoor
                  ? 'bg-rose-600 text-white'
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
        disabled={loading || !eventType || !demographic || !duration}
        className="flex items-center justify-center w-full p-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generating Ideas...
          </>
        ) : (
          'Generate Entertainment Ideas'
        )}
      </button>

      {ideas && (
        <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
          <pre className="whitespace-pre-wrap text-white">{ideas}</pre>
        </div>
      )}
    </div>
  );
}