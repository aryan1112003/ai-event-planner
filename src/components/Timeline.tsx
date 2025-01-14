import React, { useState } from 'react';
import { Calendar, Loader2 } from 'lucide-react';
import { generateTimeline } from '../lib/gemini';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function Timeline() {
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [timeline, setTimeline] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const formattedDate = format(new Date(eventDate), 'MMMM do, yyyy');
      const result = await generateTimeline(eventType, formattedDate);
      setTimeline(result);
    } catch (error) {
      toast.error('Failed to generate timeline. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Calendar className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-semibold">Timeline Generator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Event Type"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        />
        
        <input
          type="date"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading || !eventType || !eventDate}
        className="flex items-center justify-center w-full p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Timeline'
        )}
      </button>

      {timeline && (
        <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
          <pre className="whitespace-pre-wrap text-white">{timeline}</pre>
        </div>
      )}
    </div>
  );
}