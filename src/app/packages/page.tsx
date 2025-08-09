'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

// Custom hook for scroll-triggered animations
const useScrollReveal = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return { ref, controls };
};

export default function PackagesPage() {
  const packages = [
    {
      title: 'South Coast Adventure',
      subtitle: 'Beaches, culture & heritage',
      description:
        'Explore stunning beaches, historical sites, and vibrant culture on Sri Lanka’s south coast. Visit Galle Fort, Mirissa, and Tangalle.',
      price: 'LKR 15,000',
      duration: '3 Days / 2 Nights',
      image:
        'https://images.unsplash.com/photo-1582386066324-c8a93132633f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-blue-500 to-teal-400',
      delay: 0.2,
    },
    {
      title: 'Cultural Triangle Tour',
      subtitle: 'Ancient cities & UNESCO wonders',
      description:
        'Visit UNESCO World Heritage sites like Sigiriya, Dambulla, and Anuradhapura — where history and spirituality meet.',
      price: 'LKR 20,000',
      duration: '4 Days / 3 Nights',
      image:
        'https://images.unsplash.com/photo-1598884145537-a1833a0679e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-orange-500 to-red-500',
      delay: 0.4,
    },
    {
      title: 'Hill Country Escape',
      subtitle: 'Tea, mist & mountain views',
      description:
        'Enjoy scenic tea plantations, waterfalls, and cool mountain air in Sri Lanka’s hill country. Ella, Nuwara Eliya, and Bandarawela await.',
      price: 'LKR 18,000',
      duration: '3 Days / 2 Nights',
      image:
        'https://images.unsplash.com/photo-1605651887865-6450374695c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-green-500 to-emerald-500',
      delay: 0.6,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-teal-50">
      {/* Hero Section */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-teal-500 to-green-600 mb-6"
          >
            Our Tour Packages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto"
          >
            Choose from our handcrafted tour packages designed to showcase the best of Sri Lanka — culture, nature, adventure, and comfort.
          </motion.p>
        </motion.div>

        {/* Abstract Background Shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-32 right-10 w-32 h-32 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-32 h-32 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1500"></div>
      </section>

      {/* Packages Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {packages.map((pkg, index) => {
            const reveal = useScrollReveal();

            return (
              <motion.div
                key={index}
                ref={reveal.ref}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={reveal.controls}
                transition={{ delay: pkg.delay, duration: 0.7 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${pkg.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                  ></div>
                </div>

                {/* Content */}
                <div className="p-7 flex-1 flex flex-col">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">{pkg.title}</h2>
                    <p className="text-teal-600 font-medium text-sm mb-3">{pkg.subtitle}</p>
                    <p className="text-gray-600 leading-relaxed text-sm mb-6 flex-1">{pkg.description}</p>
                  </div>

                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-gray-800">From {pkg.price}</span>
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {pkg.duration}
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${pkg.color} shadow-md hover:shadow-lg transition-all`}
                    >
                      📅 Book This Package
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-gray-800 to-teal-900 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Can't Find the Perfect Package?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg max-w-xl mx-auto opacity-90 mb-8"
        >
          We offer fully customizable tours! Tell us your dream itinerary, and we’ll make it happen.
        </motion.p>
        <motion.a
          href="/custom"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-white text-gray-800 font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          ✨ Build Your Own Tour
        </motion.a>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-gray-500 bg-gray-100">
        <p>© 2025 Aruba Cab Services. Designed for unforgettable journeys across Sri Lanka.</p>
      </footer>
    </main>
  );
}