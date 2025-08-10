"use client";

import { useState, useEffect, useRef } from "react";
import { X, MapPin, Hotel, Calendar, Users, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const packages = [
  {
    id: "secret-shores",
    title: "Secret Shores of Sri Lanka",
    subtitle: "Hidden Paradise Awaits",
    description: "Discover the untouched beaches and hidden coves of Sri Lanka's stunning coastline. Perfect for travelers seeking tranquility away from the crowds.",
    longDescription: "Embark on a journey to Sri Lanka's most secluded and breathtaking coastal destinations. This exclusive package takes you beyond the typical tourist trails to discover pristine beaches, crystal-clear lagoons, and untouched natural beauty. Experience the authentic charm of coastal Sri Lanka while enjoying luxury accommodations and personalized service.",
    images: [
      "https://lp-cms-production.imgix.net/2019-06/f0275838e5f1a765d23f3d1835d4c541-arugam-bay-beach.jpg?w=1920&h=640&fit=crop",
      "https://cdn.getyourguide.com/image/format=auto,fit=contain,gravity=auto,quality=60,width=1440,height=650,dpr=1/tour_img/61d0a114e3cfa.jpeg",
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrzisCbR7f05vQygno2-D2X5pEa9mDCZHp0uRJvwSXedoHmMHA6Z_wOJNiVViaaDP56VieoZQdk8wiETepfVrhWyU1l5yyE1ApyzGuyRJD_YSChnAnzF1i5XpZb9jergqI2G-We=w675-h390-n-k-no",
    ],
    places: ["Nilaveli Beach", "Kalpitiya", "Hiriketiya"],
    nightStops: ["Nilaveli Resort", "Kalpitiya Lagoon Villa"],
    duration: "5 Days / 4 Nights",
    groupSize: "2-8 People",
    rating: 4.9,
    price: "LKR 45,000",
    gradient: "from-blue-500 via-cyan-500 to-teal-500"
  },
  {
    id: "yala-wildlife-safari",
    title: "Wildlife Safari at Yala",
    subtitle: "Where Wild Meets Wonder",
    description: "Embark on an unforgettable wildlife safari at Yala National Park. Spot leopards, elephants, and exotic birds in their natural habitat.",
    longDescription: "Experience the thrill of encountering Sri Lanka's magnificent wildlife in their natural habitat. Yala National Park, famous for having the highest density of leopards in the world, offers unparalleled safari experiences. Our expert guides will take you deep into the wilderness where every moment brings new discoveries.",
    images: [
      "https://lk.lakpura.com/cdn/shop/files/LK50C01000-02-E-1280-720_89288ce2-b128-4667-a572-ba5c0c55052a.jpg?v=1705488904&width=1445",
      "https://lp-cms-production.imgix.net/2019-06/f0275838e5f1a765d23f3d1835d4c541-arugam-bay-beach.jpg?w=1920&h=640&fit=crop",
      "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQD2UJTpFwFB836aF79g2ig-xZXP31cXH0rFmpzang1uLBiZw1YKzrEL7-v0eBS2fUoOWA8azIaCb_psoiQD_fDtbeWZ4ahZ3n-hcbMtQ",
    ],
    places: ["Yala National Park", "Kataragama", "Bundala National Park"],
    nightStops: ["Yala Safari Camp", "Luxury Tented Village"],
    duration: "4 Days / 3 Nights",
    groupSize: "2-12 People",
    rating: 4.8,
    price: "LKR 38,000",
    gradient: "from-orange-500 via-amber-500 to-yellow-500"
  },
  {
    id: "cultural-heritage",
    title: "Ancient Kingdoms Heritage",
    subtitle: "Journey Through Time",
    description: "Explore the magnificent ancient kingdoms and UNESCO World Heritage sites that tell the story of Sri Lanka's rich cultural heritage.",
    longDescription: "Step back in time and discover the glorious past of Sri Lankan civilization. Visit ancient capitals, marvel at architectural masterpieces, and uncover the secrets of bygone eras. This comprehensive cultural tour combines history, spirituality, and artistic heritage in one unforgettable journey.",
    images: [
      "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQD2UJTpFwFB836aF79g2ig-xZXP31cXH0rFmpzang1uLBiZw1YKzrEL7-v0eBS2fUoOWA8azIaCb_psoiQD_fDtbeWZ4ahZ3n-hcbMtQ",
      "https://cdn.getyourguide.com/image/format=auto,fit=contain,gravity=auto,quality=60,width=1440,height=650,dpr=1/tour_img/61d0a114e3cfa.jpeg",
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrzisCbR7f05vQygno2-D2X5pEa9mDCZHp0uRJvwSXedoHmMHA6Z_wOJNiVViaaDP56VieoZQdk8wiETepfVrhWyU1l5yyE1ApyzGuyRJD_YSChnAnzF1i5XpZb9jergqI2G-We=w675-h390-n-k-no",
    ],
    places: ["Sigiriya Rock Fortress", "Dambulla Cave Temple", "Anuradhapura", "Polonnaruwa"],
    nightStops: ["Sigiriya Boutique Hotel", "Dambulla Heritage Resort"],
    duration: "6 Days / 5 Nights",
    groupSize: "2-10 People",
    rating: 4.7,
    price: "LKR 52,000",
    gradient: "from-purple-500 via-pink-500 to-rose-500"
  }
];

export default function AdvancedSpecialPackages() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  const modalRef = useRef(null);

  // Handle image navigation
  const nextImage = () => {
    if (selectedPackage) {
      setImageLoading(true);
      setCurrentImageIndex((prev) => 
        prev === selectedPackage.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedPackage) {
      setImageLoading(true);
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedPackage.images.length - 1 : prev - 1
      );
    }
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedPackage(null);
      }
    };
    
    if (selectedPackage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedPackage]);

  const openPackageModal = (pkg) => {
    setSelectedPackage(pkg);
    setCurrentImageIndex(0);
    setImageLoading(true);
  };

  const closeModal = () => {
    setSelectedPackage(null);
    setCurrentImageIndex(0);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
            Special Packages
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Curated experiences that go beyond ordinary travel. Discover Sri Lanka's hidden gems with our exclusive, handcrafted adventures.
          </p>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className="group cursor-pointer transform transition-all duration-700 hover:scale-105"
              onClick={() => openPackageModal(pkg)}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-700 hover:border-gray-500 transition-all duration-500">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={pkg.images[0]}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${pkg.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`}></div>
                  
                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      ⭐ {pkg.rating}
                    </span>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <ArrowRight className="text-white w-12 h-12" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                      {pkg.title}
                    </h3>
                    <p className="text-gray-400 font-medium">{pkg.subtitle}</p>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3">
                    {pkg.description}
                  </p>
                  
                  {/* Package details */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{pkg.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{pkg.places.length} Places</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Hotel className="w-4 h-4" />
                      <span>{pkg.nightStops.length} Hotels</span>
                    </div>
                  </div>
                  
                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-white">From {pkg.price}</span>
                      <span className="text-gray-400 text-sm block">per person</span>
                    </div>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Modal */}
      {selectedPackage && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div 
            ref={modalRef}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-700 animate-scaleIn"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">{selectedPackage.title}</h1>
                <p className="text-gray-400">{selectedPackage.subtitle}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-800 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto max-h-[calc(90vh-100px)] custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                {/* Main Image Section */}
                <div className="lg:col-span-2">
                  <div className="relative rounded-xl overflow-hidden mb-6 group">
                    {imageLoading && (
                      <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center z-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                      </div>
                    )}
                    
                    <img
                      src={selectedPackage.images[currentImageIndex]}
                      alt={`${selectedPackage.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                      onLoad={() => setImageLoading(false)}
                    />
                    
                    {/* Image navigation */}
                    {selectedPackage.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    
                    {/* Image indicators */}
                    {selectedPackage.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedPackage.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setImageLoading(true);
                              setCurrentImageIndex(index);
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                              index === currentImageIndex 
                                ? 'bg-white' 
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Gallery */}
                  {selectedPackage.images.length > 1 && (
                    <div className="grid grid-cols-3 gap-3">
                      {selectedPackage.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setImageLoading(true);
                            setCurrentImageIndex(index);
                          }}
                          className={`relative h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'ring-2 ring-blue-500 scale-105' 
                              : 'hover:scale-105 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                  {/* Package Info */}
                  <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                        <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                        <div className="text-white font-semibold">{selectedPackage.duration}</div>
                        <div className="text-gray-400 text-sm">Duration</div>
                      </div>
                      <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                        <Users className="w-6 h-6 text-green-400 mx-auto mb-2" />
                        <div className="text-white font-semibold">{selectedPackage.groupSize}</div>
                        <div className="text-gray-400 text-sm">Group Size</div>
                      </div>
                    </div>
                    
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-white mb-1">From {selectedPackage.price}</div>
                      <div className="text-gray-400">per person</div>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-white font-semibold">{selectedPackage.rating}</span>
                        <span className="text-gray-400">/5</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                        Book This Package
                      </button>
                      <button className="w-full border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 py-3 rounded-lg font-semibold transition-all duration-300">
                        Request Custom Quote
                      </button>
                    </div>
                  </div>

                  {/* Places to Visit */}
                  <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      Places to Visit
                    </h3>
                    <div className="space-y-2">
                      {selectedPackage.places.map((place, index) => (
                        <div key={index} className="flex items-center gap-3 text-gray-300 p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>{place}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Accommodations */}
                  <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Hotel className="w-5 h-5 text-green-400" />
                      Accommodations
                    </h3>
                    <div className="space-y-2">
                      {selectedPackage.nightStops.map((stop, index) => (
                        <div key={index} className="flex items-center gap-3 text-gray-300 p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>{stop}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="px-6 pb-6">
                <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-white mb-4">About This Experience</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {selectedPackage.longDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #4B5563 #1F2937;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1F2937;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4B5563;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.95);
          }
          to { 
            opacity: 1; 
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}