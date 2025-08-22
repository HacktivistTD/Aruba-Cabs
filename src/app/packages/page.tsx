'use client';

import { motion, useAnimation, useInView, easeInOut } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Clock, MapPin, Star, Camera, Compass, Mountain, Waves, TreePine, Users, Calendar, X, MessageSquare, User, Mail, Phone, Globe, Send, CheckCircle, AlertTriangle } from 'lucide-react';

// ✅ 1. Import Firebase SDK functions, including getApps and getApp
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

// ✅ 2. Initialize Firebase safely to prevent "duplicate-app" error
// IMPORTANT: Replace the placeholder values below with your actual Firebase config.
// You can find this in your Firebase project settings.
// For security, it's best to use environment variables to store this information.
let db;
try {
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  // Check if Firebase has already been initialized before creating a new app
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);

} catch (error) {
    console.error("Firebase initialization failed:", error);
    // If initialization fails, create a mock 'db' object to prevent the app from crashing.
    // This mock will cause submissions to fail gracefully.
    db = {
        collection: () => ({
            addDoc: () => Promise.reject(new Error("Firebase is not initialized. Please check your configuration."))
        })
    };
}


// --- (No changes to useScrollReveal hook) ---
const useScrollReveal = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return { ref, controls };
};

type Package = {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  color: string;
  delay: number;
  icon: React.ComponentType<{ className?: string }>;
  highlights: string[];
  rating: number;
  isPopular?: boolean;
};

// --- Improved PackageCard Component ---
function PackageCard({ pkg, onBookClick }: { pkg: Package; onBookClick: () => void; }) {
  const { ref, controls } = useScrollReveal();
  const [hasMounted, setHasMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 80, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      initial="hidden"
      animate={hasMounted ? controls : 'hidden'}
      transition={{ delay: pkg.delay, duration: 0.8, ease: 'easeOut' }}
      whileHover={{ y: -16, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group rounded-3xl shadow-2xl overflow-hidden bg-white hover:shadow-3xl transition-all duration-700 flex flex-col relative will-change-transform border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url(${pkg.image})`,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
        
        {/* Floating badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: pkg.delay + 0.3, type: 'spring' }}
            className="bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-2 rounded-full flex items-center gap-1 shadow-lg"
          >
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            {pkg.rating}
          </motion.div>
          {pkg.isPopular && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: pkg.delay + 0.5, type: 'spring' }}
              className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-2 rounded-full shadow-lg animate-pulse"
            >
              🌟 Popular
            </motion.div>
          )}
        </div>

        {/* Price badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: pkg.delay + 0.4, type: 'spring' }}
          className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm text-white font-bold px-4 py-2 rounded-full shadow-lg"
        >
          {pkg.price}
        </motion.div>

        {/* Icon overlay */}
        <div className="absolute bottom-4 left-4">
          <div className={`w-12 h-12 bg-gradient-to-r ${pkg.color} rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm`}>
            <pkg.icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-teal-600 transition-all duration-300">
              {pkg.title}
            </h2>
            <p className="text-teal-600 font-semibold text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {pkg.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">{pkg.description}</p>

          {/* Highlights */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-500" />
              Trip Highlights
            </h4>
            <div className="flex flex-wrap gap-2">
              {pkg.highlights.map((highlight, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: pkg.delay + 0.6 + index * 0.1 }}
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full border"
                >
                  {highlight}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{pkg.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm">2-8 People</span>
            </div>
          </div>

          <motion.button
            onClick={onBookClick}
            whileHover={{ 
              scale: 1.02, 
              boxShadow: '0px 12px 30px rgba(0,0,0,0.15)',
            }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r ${pkg.color} shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-lg`}
          >
            <Calendar className="w-5 h-5" />
            Book This Adventure
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// --- Main Page Component ---
export default function App() {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const initialFormData = {
    name: '',
    email: '',
    whatsapp: '',
    country: 'United States',
    startDate: '',
    endDate: '',
    notes: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});

  const packages: Package[] = [
    {
      title: 'South Coast Adventure',
      subtitle: 'Beaches, culture & heritage',
      description: 'Explore stunning beaches, historical sites, and vibrant culture on Sri Lanka\'s south coast. Visit Galle Fort, Mirissa, and Tangalle for an unforgettable coastal experience.',
      price: 'LKR 15,000',
      duration: '3 Days / 2 Nights',
      image: 'https://images.unsplash.com/photo-1596924033326-1fb625f16e13?q=80&w=2070&auto=format&fit=crop',
      color: 'from-blue-500 to-teal-500',
      delay: 0.2,
      icon: Waves,
      highlights: ['Galle Fort', 'Whale Watching', 'Beach Relaxation', 'Local Cuisine'],
      rating: 4.8,
    },
    {
      title: 'Cultural Triangle Tour',
      subtitle: 'Ancient cities & UNESCO wonders',
      description: 'Visit UNESCO World Heritage sites like Sigiriya, Dambulla, and Anuradhapura — where ancient history and spirituality come alive in magnificent temples and ruins.',
      price: 'LKR 20,000',
      duration: '4 Days / 3 Nights',
      image: 'https://images.unsplash.com/photo-1591462338327-012b1bdd5a13?q=80&w=2070&auto=format&fit=crop',
      color: 'from-orange-500 to-red-500',
      delay: 0.3,
      icon: Compass,
      highlights: ['Sigiriya Rock', 'Dambulla Caves', 'Ancient Ruins', 'Temple Tours'],
      rating: 4.9,
      isPopular: true,
    },
    {
      title: 'Hill Country Escape',
      subtitle: 'Tea, mist & mountain views',
      description: 'Journey through scenic tea plantations, cascading waterfalls, and cool mountain air in Sri Lanka\'s breathtaking hill country. Ella, Nuwara Eliya, and Bandarawela await your discovery.',
      price: 'LKR 18,000',
      duration: '3 Days / 2 Nights',
      image: 'https://images.unsplash.com/photo-1552678542-655e903e0a3f?q=80&w=1974&auto=format&fit=crop',
      color: 'from-green-500 to-emerald-500',
      delay: 0.4,
      icon: Mountain,
      highlights: ['Tea Plantations', 'Nine Arch Bridge', 'Little Adam\'s Peak', 'Train Rides'],
      rating: 4.7,
    },
    {
      title: 'Wildlife Safari at Yala',
      subtitle: 'Experience the wild side of Sri Lanka',
      description: 'Embark on an unforgettable wildlife safari at Yala National Park. Spot magnificent leopards, gentle elephants, and diverse bird species in their pristine natural habitat.',
      price: 'LKR 22,000',
      duration: '3 Days / 2 Nights',
      image: 'https://images.unsplash.com/photo-1558760421-3a2b74a354b3?q=80&w=2070&auto=format&fit=crop',
      color: 'from-emerald-600 to-teal-700',
      delay: 0.5,
      icon: TreePine,
      highlights: ['Leopard Spotting', 'Elephant Herds', 'Bird Watching', 'Safari Adventures'],
      rating: 4.6,
    },
    {
      title: 'Udawalawe Elephant Safari',
      subtitle: 'Experience the gentle giants of Sri Lanka',
      description: 'Get up close with magnificent herds of wild elephants in their natural habitat. Udawalawe offers breathtaking scenery, abundant wildlife, and unforgettable safari adventures.',
      price: 'LKR 18,000',
      duration: '3 Days / 2 Nights',
      image: 'https://images.unsplash.com/photo-1621568330432-2922e2341a37?q=80&w=2070&auto=format&fit=crop',
      color: 'from-teal-500 to-cyan-600',
      delay: 0.6,
      icon: Users,
      highlights: ['Elephant Herds', 'Safari Drives', 'Wildlife Photography', 'Nature Walks'],
      rating: 4.5,
    },
    {
      title: 'Arugam Bay Surf Escape',
      subtitle: 'Surf, sun & sand',
      description: 'Catch the perfect wave at Arugam Bay, one of the world\'s premier surf destinations. Enjoy sun-soaked days, perfect breaks, and vibrant beachside nightlife.',
      price: 'LKR 18,000',
      duration: '3 Days / 2 Nights',
      image: 'https://images.unsplash.com/photo-1610415383390-c15d3b6a378a?q=80&w=1932&auto=format&fit=crop',
      color: 'from-blue-400 to-teal-500',
      delay: 0.7,
      icon: Waves,
      highlights: ['World-class Surfing', 'Beach Vibes', 'Sunset Views', 'Local Culture'],
      rating: 4.4,
    },
  ];

  const resetForm = () => {
    setFormData(initialFormData);
    setFormErrors({});
    setSubmissionStatus('idle');
  }

  const handleBookClick = (pkg: Package) => {
    setSelectedPackage(pkg);
    setShowBookingForm(true);
    // Reset form state when a new package is selected
    resetForm();
  };

  const handleCloseModal = () => {
    setShowBookingForm(false);
    // Add a small delay to allow for exit animation before resetting state
    setTimeout(() => {
        setSelectedPackage(null);
        resetForm();
    }, 300);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if(formErrors[name]) {
        setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
      const errors = {};
      if (!formData.name.trim()) errors.name = "Full name is required.";
      if (!formData.email.trim()) errors.email = "Email is required.";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid.";
      if (!formData.whatsapp.trim()) errors.whatsapp = "WhatsApp number is required.";
      if (!formData.startDate) errors.startDate = "Start date is required.";
      if (!formData.endDate) errors.endDate = "End date is required.";
      else if (formData.startDate && formData.endDate < formData.startDate) {
          errors.endDate = "End date cannot be before the start date.";
      }
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage || submissionStatus === 'submitting' || !validateForm()) return;

    setSubmissionStatus('submitting');
    try {
      // Use the collection and addDoc functions from the initialized 'db' instance
      const docRef = await addDoc(collection(db, "package-bookings"), {
        packageName: selectedPackage.title,
        price: selectedPackage.price,
        duration: selectedPackage.duration,
        ...formData,
        status: 'pending',
        createdAt: Timestamp.now(),
      });
      console.log("Document written with ID: ", docRef.id);
      setSubmissionStatus('success');
    } catch (error) {
      console.error("Error adding document: ", error);
      setSubmissionStatus('error');
    }
  };

  const floatingVariants = {
    float: (delay = 0) => ({
      y: [0, -20, 0, 10, 0],
      x: [0, 15, 0, -15, 0],
      scale: [1, 1.05, 1, 0.95, 1],
      transition: {
        delay,
        duration: 15 + delay * 5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    }),
  };
  
  // A list of countries for the dropdown
  const countries = ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "India", "China", "Other"];


  return (
    <>
    <style>{`
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    `}</style>
    <main className="min-h-screen relative bg-gray-50/50">
      {/* Enhanced Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-200 to-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0"
        variants={floatingVariants}
        custom={0}
        animate="float"
      />
      <motion.div
        className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0"
        variants={floatingVariants}
        custom={1}
        animate="float"
      />
      <motion.div
        className="absolute bottom-32 left-1/4 w-72 h-72 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0"
        variants={floatingVariants}
        custom={2}
        animate="float"
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 z-0"
        variants={floatingVariants}
        custom={3}
        animate="float"
      />

      {/* Hero Section */}
      <section className="py-32 px-6 text-center relative z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-block px-6 py-3 bg-white/80 backdrop-blur-sm text-blue-700 rounded-full text-sm font-semibold shadow-lg border border-blue-200/50">
              ✨ Handcrafted Experiences Since 2015
            </span>
          </motion.div>

          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.3 }}
            className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-teal-500 to-green-600">
              Epic Sri Lankan
            </span>
            <br />
            <span className="text-gray-800">Adventures</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12"
          >
            Choose from our carefully curated tour packages designed to showcase the very best of Sri Lanka — where ancient culture meets pristine nature, and every journey becomes a treasured memory.
          </motion.p>
        </motion.div>
      </section>

      {/* Packages Grid */}
      <section id="packages" className="px-6 pb-32 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-7xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Adventure</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each package is thoughtfully designed to give you the perfect blend of adventure, culture, and relaxation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PackageCard 
                key={pkg.title} 
                pkg={pkg} 
                onBookClick={() => handleBookClick(pkg)}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Booking Form Modal */}
      {showBookingForm && selectedPackage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Form Header */}
            <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Book Your Adventure</h2>
                <p className="text-gray-600">{selectedPackage.title}</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form Content */}
            <div className="overflow-y-auto p-6 flex-grow">
              {submissionStatus === 'idle' && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Form fields... */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label="Full Name *" name="name" value={formData.name} onChange={handleInputChange} error={formErrors.name} placeholder="John Doe" icon={User} />
                      <InputField label="Email Address *" name="email" type="email" value={formData.email} onChange={handleInputChange} error={formErrors.email} placeholder="you@example.com" icon={Mail} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label="WhatsApp Number *" name="whatsapp" type="tel" value={formData.whatsapp} onChange={handleInputChange} error={formErrors.whatsapp} placeholder="+1 234 567 800" icon={Phone} />
                      <SelectField label="Country *" name="country" value={formData.country} onChange={handleInputChange} error={formErrors.country} options={countries} icon={Globe} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label="Start Date *" name="startDate" type="date" value={formData.startDate} onChange={handleInputChange} error={formErrors.startDate} icon={Calendar} />
                      <InputField label="End Date *" name="endDate" type="date" value={formData.endDate} onChange={handleInputChange} error={formErrors.endDate} icon={Calendar} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Special Notes</label>
                    <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Any special requirements or questions..." />
                  </div>
                  <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={handleCloseModal} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2"><Send className="w-4 h-4" />Send Booking Request</button>
                  </div>
                </form>
              )}
              {submissionStatus === 'submitting' && <StatusView icon={motion.div} iconClassName="animate-spin" text="Submitting your request..." />}
              {submissionStatus === 'success' && <StatusView icon={CheckCircle} iconClassName="text-green-500" text="Request Sent Successfully!" message="We've received your booking request and will get back to you via email or WhatsApp shortly. Thank you!" buttonText="Done" onButtonClick={handleCloseModal} />}
              {submissionStatus === 'error' && <StatusView icon={AlertTriangle} iconClassName="text-red-500" text="Submission Failed" message="Something went wrong. Please check your connection and try again." buttonText="Try Again" onButtonClick={() => setSubmissionStatus('idle')} />}
            </div>
          </motion.div>
        </div>
      )}
    </main>
    </>
  );
}

// --- Helper Components for the Form ---
const InputField = ({ label, name, type = "text", value, onChange, error, placeholder, icon: Icon }) => (
    <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">{label}</label>
        <div className="relative">
            {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full py-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 ${Icon ? 'pl-10 pr-4' : 'px-4'} ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                placeholder={placeholder}
            />
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const SelectField = ({ label, name, value, onChange, error, options, icon: Icon }) => (
    <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">{label}</label>
        <div className="relative">
            {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />}
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full py-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 appearance-none ${Icon ? 'pl-10 pr-4' : 'px-4'} ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            >
                {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const StatusView = ({ icon: Icon, iconClassName, text, message, buttonText, onButtonClick }) => (
    <div className="text-center flex flex-col items-center justify-center h-full p-8">
        {Icon === motion.div ? 
            <motion.div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-6" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
            : <Icon className={`w-16 h-16 mb-6 ${iconClassName}`} />
        }
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{text}</h3>
        {message && <p className="text-gray-600 mb-8">{message}</p>}
        {buttonText && <button onClick={onButtonClick} className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">{buttonText}</button>}
    </div>
);
