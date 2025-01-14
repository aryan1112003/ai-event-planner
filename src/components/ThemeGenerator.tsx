import React, { useState } from 'react';
import { Palette, Loader2 } from 'lucide-react';
import { generateEventTheme } from '../lib/gemini';
import toast from 'react-hot-toast';

export default function ThemeGenerator() {
  const [preferences, setPreferences] = useState('');
  const [theme, setTheme] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const result = await generateEventTheme(preferences);
      setTheme(result);
    } catch (error) {
      toast.error('Failed to generate theme. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Palette className="w-6 h-6 text-purple-400" />
        <h2 className="text-xl font-semibold">Theme Generator</h2>
      </div>
      
      <textarea
        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        rows={4}
        placeholder="Describe your preferences (e.g., colors, style, mood, season...)"
        value={preferences}
        onChange={(e) => setPreferences(e.target.value)}
      />
      
      <button
        onClick={handleGenerate}
        disabled={loading || !preferences}
        className="flex items-center justify-center w-full p-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Theme'
        )}
      </button>

      {theme && (
        <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
          <pre className="whitespace-pre-wrap text-white">{theme}</pre>
        </div>
      )}
    </div>
  );
}