'use client';

import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

// Enhanced AI-like destination data with more details
const suggestionsData: Record<string, Array<{name: string, type: string, description: string}>> = {
  beach: [
    { name: 'Unawatuna Beach', type: 'Beach', description: 'Golden sandy beach perfect for swimming' },
    { name: 'Mirissa Beach', type: 'Beach', description: 'Whale watching and stunning sunsets' },
    { name: 'Arugam Bay', type: 'Beach', description: 'World-class surfing destination' },
    { name: 'Bentota Beach', type: 'Beach', description: 'Water sports and luxury resorts' },
    { name: 'Hikkaduwa Beach', type: 'Beach', description: 'Coral reefs and vibrant nightlife' },
  ],
  wildlife: [
    { name: 'Yala National Park', type: 'Wildlife', description: 'Famous for leopard sightings' },
    { name: 'Wilpattu National Park', type: 'Wildlife', description: 'Largest national park with diverse wildlife' },
    { name: 'Udawalawe National Park', type: 'Wildlife', description: 'Best place to see wild elephants' },
    { name: 'Sinharaja Forest Reserve', type: 'Wildlife', description: 'UNESCO World Heritage rainforest' },
  ],
  mountain: [
    { name: 'Ella Rock', type: 'Mountain', description: 'Spectacular hiking with panoramic views' },
    { name: 'Nuwara Eliya', type: 'Mountain', description: 'Cool climate and tea plantations' },
    { name: 'Haputale', type: 'Mountain', description: 'Breathtaking mountain vistas' },
    { name: 'Adams Peak', type: 'Mountain', description: 'Sacred pilgrimage site with sunrise views' },
  ],
  tea: [
    { name: 'Nuwara Eliya Tea Estates', type: 'Tea', description: 'Historic tea plantations and factories' },
    { name: 'Pedro Tea Estate', type: 'Tea', description: 'High-altitude premium tea experience' },
    { name: 'Dambatenne Tea Factory', type: 'Tea', description: 'Founded by Sir Thomas Lipton' },
  ],
  cultural: [
    { name: 'Sigiriya Rock Fortress', type: 'Cultural', description: 'Ancient rock fortress and frescoes' },
    { name: 'Temple of the Tooth', type: 'Cultural', description: 'Sacred Buddhist temple in Kandy' },
    { name: 'Dambulla Cave Temple', type: 'Cultural', description: 'Ancient cave paintings and statues' },
    { name: 'Galle Dutch Fort', type: 'Cultural', description: 'Colonial architecture by the sea' },
  ],
  adventure: [
    { name: 'Kitulgala White Water Rafting', type: 'Adventure', description: 'Thrilling river rafting experience' },
    { name: 'Zip-lining in Ella', type: 'Adventure', description: 'Soar through tea plantations' },
    { name: 'Hot Air Ballooning', type: 'Adventure', description: 'Aerial views of Sri Lankan landscape' },
  ]
};

const vehicleOptions = [
  { value: 'car', label: 'Car (1-4 passengers)', icon: '🚗', price: 'From $50/day' },
  { value: 'van', label: 'Van (5-8 passengers)', icon: '🚐', price: 'From $80/day' },
  { value: 'bus', label: 'Bus (9+ passengers)', icon: '🚌', price: 'From $120/day' },
  { value: 'luxury', label: 'Luxury Car', icon: '🏎️', price: 'From $150/day' },
];

export default function AIBasedTripPlanner() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{name: string, type: string, description: string}>>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<Array<{name: string, type: string, description: string}>>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [vehicle, setVehicle] = useState('car');
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    // Simulate AI processing delay
    setIsLoading(true);
    const timer = setTimeout(() => {
      const matches: Array<{name: string, type: string, description: string}> = [];
      Object.entries(suggestionsData).forEach(([keyword, places]) => {
        if (input.toLowerCase().includes(keyword)) {
          matches.push(...places);
        }
      });

      // Also search by partial name matching
      Object.values(suggestionsData).flat().forEach(place => {
        if (place.name.toLowerCase().includes(input.toLowerCase()) && 
            !matches.some(m => m.name === place.name)) {
          matches.push(place);
        }
      });

      setSuggestions(matches.slice(0, 6)); // Limit to 6 suggestions
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  const handleAddPlace = (place: {name: string, type: string, description: string}) => {
    if (!selectedPlaces.some(p => p.name === place.name)) {
      setSelectedPlaces([...selectedPlaces, place]);
      setInput(''); // Clear input after selection
      setSuggestions([]);
    }
  };

  const handleRemovePlace = (placeName: string) => {
    setSelectedPlaces(selectedPlaces.filter((p) => p.name !== placeName));
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

    // Simulate booking process
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(
        `🎉 Trip Successfully Planned!\n\n` +
        `📅 Date: ${selectedDate.toDateString()}\n` +
        `📍 Destinations: ${selectedPlaces.map(p => p.name).join(', ')}\n` +
        `🚗 Vehicle: ${vehicleOptions.find(v => v.value === vehicle)?.label}\n\n` +
        `Our team will contact you within 24 hours with detailed itinerary and pricing!`
      );
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep === 1 && selectedPlaces.length === 0) {
      alert('Please select at least one destination before proceeding.');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)'
        }} />
      </div>

      <main className="relative z-10 min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">
            Plan Your{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Perfect Trip
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 mb-4">
            ✨ AI-powered travel suggestions tailored just for you
          </p>
          
          {/* Progress Steps */}
          <div className="flex justify-center items-center space-x-2 sm:space-x-4 mt-6 sm:mt-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-bold transition-all duration-300 ${
                  currentStep >= step 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black' 
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-8 sm:w-16 h-1 mx-2 transition-all duration-300 ${
                    currentStep > step ? 'bg-yellow-400' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-4 sm:space-x-12 mt-2 text-xs sm:text-sm text-gray-400">
            <span className={currentStep >= 1 ? 'text-yellow-400' : ''}>Destinations</span>
            <span className={currentStep >= 2 ? 'text-yellow-400' : ''}>Date & Vehicle</span>
            <span className={currentStep >= 3 ? 'text-yellow-400' : ''}>Confirm</span>
          </div>
        </motion.div>

        {/* Main Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full max-w-4xl bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Destinations */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="destinations" className="block text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                      🎯 What interests you most?
                    </label>
                    <p className="text-gray-300 text-sm sm:text-base mb-4">
                      Try: "beach and wildlife", "mountains and tea", "cultural sites", "adventure activities"
                    </p>
                    
                    <div className="relative">
                      <input
                        id="destinations"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Describe your ideal Sri Lankan adventure..."
                        className="w-full rounded-xl border-2 border-gray-600 bg-gray-800/50 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 text-base sm:text-lg"
                      />
                      {isLoading && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-400"></div>
                        </div>
                      )}
                    </div>

                    {/* Quick Suggestion Pills */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {['beach paradise', 'wildlife safari', 'mountain adventure', 'cultural heritage', 'tea plantation tour'].map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => setInput(suggestion)}
                          className="bg-gray-700/50 hover:bg-yellow-400/20 text-gray-300 hover:text-yellow-400 px-3 py-1 rounded-full text-xs sm:text-sm transition-all duration-300 border border-gray-600 hover:border-yellow-400"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>

                    {/* AI Suggestions */}
                    <AnimatePresence>
                      {suggestions.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                        >
                          {suggestions.map((place, index) => (
                            <motion.button
                              key={place.name}
                              type="button"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              onClick={() => handleAddPlace(place)}
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/30 hover:border-yellow-400 rounded-xl p-3 sm:p-4 text-left transition-all duration-300 group"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="text-white font-semibold text-sm sm:text-base mb-1 group-hover:text-yellow-400 transition-colors">
                                    {place.name}
                                  </h3>
                                  <p className="text-gray-400 text-xs sm:text-sm mb-2 leading-relaxed">
                                    {place.description}
                                  </p>
                                  <span className="inline-block bg-yellow-400/20 text-yellow-400 text-xs px-2 py-1 rounded-full">
                                    {place.type}
                                  </span>
                                </div>
                                <div className="ml-2 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                  +
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Selected Places */}
                  <AnimatePresence>
                    {selectedPlaces.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
                          🎯 Your Selected Destinations ({selectedPlaces.length})
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          {selectedPlaces.map((place, index) => (
                            <motion.div
                              key={place.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/50 rounded-xl p-3 sm:p-4 flex items-center justify-between group"
                            >
                              <div className="flex-1">
                                <h3 className="text-white font-semibold text-sm sm:text-base mb-1">
                                  {place.name}
                                </h3>
                                <p className="text-gray-300 text-xs sm:text-sm">
                                  {place.description}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemovePlace(place.name)}
                                className="ml-3 text-gray-400 hover:text-red-400 transition-colors p-1"
                                aria-label={`Remove ${place.name}`}
                              >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Step 2: Date & Vehicle */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6 sm:space-y-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {/* Calendar Section */}
                    <div>
                      <label className="block text-lg sm:text-xl font-bold text-white mb-4">
                        📅 Select Your Trip Date
                      </label>
                      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-600">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          className="rounded-lg"
                          classNames={{
                            months: "text-white",
                            month: "text-white",
                            caption: "text-white",
                            caption_label: "text-white font-medium",
                            nav_button: "text-white hover:bg-yellow-400/20",
                            nav_button_previous: "text-white hover:bg-yellow-400/20",
                            nav_button_next: "text-white hover:bg-yellow-400/20",
                            table: "text-white",
                            head_row: "text-gray-300",
                            head_cell: "text-gray-300 font-medium",
                            row: "text-white",
                            cell: "text-white",
                            day: "text-white hover:bg-yellow-400/20 rounded-lg",
                            day_selected: "bg-yellow-400 text-black font-bold",
                            day_today: "bg-blue-600/30 text-white",
                            day_outside: "text-gray-500",
                            day_disabled: "text-gray-500",
                            day_hidden: "invisible",
                          }}
                        />
                        {!selectedDate && (
                          <p className="mt-2 text-sm text-yellow-400">
                            Please select your preferred travel date
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Vehicle Selection */}
                    <div>
                      <label className="block text-lg sm:text-xl font-bold text-white mb-4">
                        🚗 Choose Your Vehicle
                      </label>
                      <div className="space-y-3 sm:space-y-4">
                        {vehicleOptions.map((option) => (
                          <motion.label
                            key={option.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative flex items-center p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                              vehicle === option.value
                                ? 'border-yellow-400 bg-yellow-400/10'
                                : 'border-gray-600 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="vehicle"
                              value={option.value}
                              checked={vehicle === option.value}
                              onChange={(e) => setVehicle(e.target.value)}
                              className="sr-only"
                            />
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center">
                                <span className="text-2xl sm:text-3xl mr-3 sm:mr-4">{option.icon}</span>
                                <div>
                                  <h3 className="text-white font-semibold text-sm sm:text-base">
                                    {option.label}
                                  </h3>
                                  <p className="text-gray-400 text-xs sm:text-sm">
                                    {option.price}
                                  </p>
                                </div>
                              </div>
                              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all ${
                                vehicle === option.value
                                  ? 'border-yellow-400 bg-yellow-400'
                                  : 'border-gray-400'
                              }`}>
                                {vehicle === option.value && (
                                  <div className="w-full h-full rounded-full bg-yellow-400 transform scale-50"></div>
                                )}
                              </div>
                            </div>
                          </motion.label>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6 sm:space-y-8"
                >
                  <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                      🎉 Trip Summary
                    </h2>
                    
                    <div className="space-y-4 sm:space-y-6">
                      {/* Date */}
                      <div className="flex items-center justify-between py-3 border-b border-gray-600">
                        <span className="text-gray-300 font-medium">📅 Travel Date:</span>
                        <span className="text-white font-semibold">
                          {selectedDate?.toDateString() || 'Not selected'}
                        </span>
                      </div>

                      {/* Vehicle */}
                      <div className="flex items-center justify-between py-3 border-b border-gray-600">
                        <span className="text-gray-300 font-medium">🚗 Vehicle:</span>
                        <span className="text-white font-semibold">
                          {vehicleOptions.find(v => v.value === vehicle)?.label}
                        </span>
                      </div>

                      {/* Destinations */}
                      <div className="py-3">
                        <span className="text-gray-300 font-medium mb-3 block">📍 Destinations ({selectedPlaces.length}):</span>
                        <div className="grid grid-cols-1 gap-2">
                          {selectedPlaces.map((place, index) => (
                            <div key={place.name} className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
                              <div>
                                <span className="text-white font-medium text-sm sm:text-base">{place.name}</span>
                                <span className="text-gray-400 text-xs sm:text-sm ml-2">({place.type})</span>
                              </div>
                              <span className="text-yellow-400 text-sm">#{index + 1}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information Note */}
                  <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4 sm:p-6 text-center">
                    <p className="text-yellow-400 font-medium mb-2">
                      📞 Next Steps
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      After confirming your trip, our travel experts will contact you within 24 hours with a detailed itinerary, 
                      exact pricing, and booking confirmation. You can make changes until 48 hours before your trip.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 sm:pt-8 border-t border-gray-600">
              <div className="flex-1">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    onClick={prevStep}
                    className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base transition-all duration-300"
                  >
                    ← Previous
                  </Button>
                )}
              </div>

              <div className="flex-1 flex justify-end">
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base transition-all duration-300 shadow-lg hover:shadow-yellow-500/25"
                  >
                    Continue →
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Planning Your Trip...
                      </div>
                    ) : (
                      '🎯 Confirm Trip Plan'
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 max-w-4xl"
        >
          {[
            { icon: '🛡️', title: 'Secure Booking', desc: 'SSL encrypted' },
            { icon: '⭐', title: '500+ Reviews', desc: '4.9/5 rating' },
            { icon: '🎯', title: 'Custom Tours', desc: 'Tailored for you' },
            { icon: '💬', title: '24/7 Support', desc: 'Always available' },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 text-center group hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl mb-2">{item.icon}</div>
              <h3 className="text-white font-semibold text-sm sm:text-base mb-1 group-hover:text-yellow-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <p className="text-gray-400 text-sm sm:text-base mb-4">
            Need help planning your trip? Our experts are here to assist!
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
            <a href="tel:+94771234567" className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-2">
              📞 +94 77 123 4567
            </a>
            <a href="mailto:info@arubacab.lk" className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-2">
              📧 info@arubacab.lk
            </a>
            <a href="https://wa.me/94771234567" className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-2">
              💬 WhatsApp Chat
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}