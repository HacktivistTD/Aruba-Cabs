"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";
import Image from "next/image";
import activities from "@/data/activities";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function ActivitiesPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredActivities =
    activeCategory === "All"
      ? activities
      : activities.filter((a) => a.category === activeCategory);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth =
      scrollRef.current.children[0].clientWidth + 16; // card width + gap
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });

    if (direction === "right" && currentIndex < filteredActivities.length - 3) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === "left" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const categories = [
    "All",
    "Cultural Heritage",
    "Wildlife",
    "Beaches",
    "Trekking",
    "Religious Sites",
  ];

  return (
    <div className="relative max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 min-h-screen">
      {/* Header Section */}
      <div
        className={`text-center mb-8 sm:mb-10 lg:mb-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent mb-3 sm:mb-4 px-4">
          Discover Sri Lanka
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
          Experience the pearl of the Indian Ocean through unforgettable
          adventures
        </p>
        <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mt-3 sm:mt-4 rounded-full"></div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex justify-center mb-6 sm:mb-8 px-2">
        <div className="flex space-x-1 sm:space-x-2 bg-white/80 backdrop-blur-sm rounded-full p-1 sm:p-2 shadow-lg overflow-x-auto max-w-full">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0
                ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "bg-white/80 text-gray-700 shadow-md hover:shadow-lg"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll Buttons - Hidden on mobile */}
      <button
        onClick={() => scroll("left")}
        className="hidden sm:block absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl rounded-full p-2 lg:p-3 z-20 transition-all duration-300 hover:scale-110 group"
      >
        <ChevronLeft
          size={20}
          className="lg:w-6 lg:h-6 text-gray-700 group-hover:text-blue-600 transition-colors"
        />
      </button>
      <button
        onClick={() => scroll("right")}
        className="hidden sm:block absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl rounded-full p-2 lg:p-3 z-20 transition-all duration-300 hover:scale-110 group"
      >
        <ChevronRight
          size={20}
          className="lg:w-6 lg:h-6 text-gray-700 group-hover:text-blue-600 transition-colors"
        />
      </button>

      {/* Activities Grid */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-3 sm:gap-4 lg:gap-6 scroll-smooth no-scrollbar pb-4 sm:pb-6 px-2 sm:px-0"
      >
        {filteredActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="min-w-[280px] sm:min-w-[300px] md:min-w-[calc(50%-0.5rem)] lg:min-w-[calc(33.333%-1rem)] xl:min-w-[calc(25%-1.125rem)] flex-shrink-0 group cursor-pointer transition-all duration-700"
          >
            <div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 sm:hover:-translate-y-2">
              {/* Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={activity.image.replace(/\\/g, "/")}
                  alt={activity.alt}
                  width={500}
                  height={250}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay - Hidden on mobile for better touch interaction */}
                <div className="hidden sm:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center text-white text-center p-4">
                  <p className="text-sm">{activity.description}</p>
                </div>

              
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2 sm:gap-0">
                  <h3 className="text-lg sm:text-xl font-bold text-black group-hover:text-blue-600 transition-colors duration-300 flex-1">
                    {activity.title}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium self-start sm:ml-2 whitespace-nowrap">
                    {activity.category}
                  </span>
                </div>

                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin size={14} className="mr-1 text-blue-500 flex-shrink-0" />
                  <span className="text-sm">{activity.location}</span>
                </div>

                <div className="flex items-center mb-4">
                  <svg
                    className="w-4 h-4 mr-1 text-orange-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">{activity.duration}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-semibold text-gray-700">
                      {activity.rating}
                    </span>
                  </div>

                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
                    Book Now
                  </button>
                </div>
              </div>

              <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent group-hover:border-blue-300 transition-all duration-500"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
        {Array.from({ length: Math.max(0, filteredActivities.length - 2) }).map(
          (_, index) => (
            <div
              key={index}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "w-6 sm:w-8 bg-gradient-to-r from-blue-500 to-purple-600"
                  : "w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          )
        )}
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/94777656999"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <button className="fixed bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 bg-green-400 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-30 animate-pulse hover:animate-none">
          <FaWhatsapp size={20} className="sm:w-6 sm:h-6" />
        </button>
      </a>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}