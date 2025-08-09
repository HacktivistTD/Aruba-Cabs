'use client';

import React, { useState, useEffect } from 'react';
import { type DateRange } from 'react-day-picker';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

// Sample AI-like destination keywords and places
const suggestionsData: Record<string, string[]> = {
  beach: ['Unawatuna', 'Mirissa', 'Arugam Bay', 'Bentota'],
  wildlife: ['Yala National Park', 'Wilpattu National Park', 'Udawalawe National Park'],
  mountain: ['Ella', 'Nuwara Eliya', 'Haputale', 'Knuckles Range'],
  tea: ['Nuwara Eliya Tea Estates', 'Hatton', 'Pedro Tea Factory'],
};

export default function AIBasedTripPlanner() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [vehicle, setVehicle] = useState('Car');

  useEffect(() => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    // Simple keyword matching for demo AI effect
    const matches: string[] = [];
    Object.entries(suggestionsData).forEach(([keyword, places]) => {
      if (input.toLowerCase().includes(keyword)) {
        matches.push(...places);
      }
    });

    setSuggestions(matches);
  }, [input]);

  const handleAddPlace = (place: string) => {
    if (!selectedPlaces.includes(place)) {
      setSelectedPlaces([...selectedPlaces, place]);
    }
  };

  const handleRemovePlace = (place: string) => {
    setSelectedPlaces(selectedPlaces.filter((p) => p !== place));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate) {
      alert('Please select your trip date.');
      return;
    }
    if (selectedPlaces.length === 0) {
      alert('Please select at least one destination.');
      return;
    }

    alert(
      `Trip planned on ${selectedDate.toDateString()}.\n` +
      `Destinations: ${selectedPlaces.join(', ')}.\n` +
      `Vehicle: ${vehicle}. We will contact you soon!`
    );
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-1">Customize Your Trip</h1>
      <p className="text-yellow-400 font-semibold mb-8">✨ AI-powered travel suggestions</p>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-xl w-full">
        {/* AI Destinations Input */}
        <div>
          <label htmlFor="destinations" className="block font-semibold mb-2">
            What do you want to see? (beach, wildlife, tea, mountains...)
          </label>
          <input
            id="destinations"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your interests..."
            className="w-full rounded border border-gray-700 bg-gray-900 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 flex flex-wrap gap-2"
              >
                {suggestions.map((place) => (
                  <button
                    key={place}
                    type="button"
                    onClick={() => handleAddPlace(place)}
                    className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold hover:bg-yellow-500 transition"
                  >
                    {place}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Selected Places with remove option */}
        {selectedPlaces.length > 0 && (
          <div>
            <h2 className="font-semibold mb-2">Your Selected Destinations:</h2>
            <div className="flex flex-wrap gap-2">
              {selectedPlaces.map((place) => (
                <div
                  key={place}
                  className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2"
                >
                  {place}
                  <button
                    type="button"
                    onClick={() => handleRemovePlace(place)}
                    aria-label={`Remove ${place}`}
                    className="text-black font-bold hover:text-red-600 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Single Day Calendar */}
        <div>
          <label className="block font-semibold mb-2">Select Trip Date</label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-lg border border-yellow-400 shadow-sm"
          />
          {!selectedDate && (
            <p className="mt-1 text-sm text-yellow-400">Please select a trip date.</p>
          )}
        </div>

        {/* Vehicle Type */}
        <div>
          <label htmlFor="vehicle" className="block font-semibold mb-2">
            Vehicle Type
          </label>
          <select
            id="vehicle"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="w-full rounded border border-gray-700 bg-gray-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option>Car</option>
            <option>Van</option>
            <option>Bus</option>
          </select>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="bg-yellow-400 text-black hover:bg-yellow-500 w-full py-3 font-bold text-lg"
        >
          Plan My Trip
        </Button>
      </form>
    </main>
  );
}
