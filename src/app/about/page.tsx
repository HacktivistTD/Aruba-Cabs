'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

// Custom hook for scroll animation
const useScrollAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return { ref, controls };
};

export default function AboutPage() {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  const fadeInUp = useScrollAnimation();
  const slideInLeft = useScrollAnimation();
  const slideInRight = useScrollAnimation();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-400 mb-6">
            About <span className="text-yellow-400">Aruba Cab Services</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg text-white leading-relaxed max-w-2xl mx-auto"
          >
            Your trusted partner for exploring the beauty and culture of Sri Lanka — one smooth ride at a time.
          </motion.p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section
        ref={fadeInUp.ref}
        className="py-16 px-6"
      >
        <motion.div
          variants={variants}
          initial="hidden"
          animate={fadeInUp.controls}
          className="max-w-3xl mx-auto bg-yellow-100 p-10 rounded-2xl shadow-lg"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Founded in 2015, <strong>Aruba Cab Services</strong> began with a simple vision: to provide reliable, comfortable, and personalized cab services for tourists exploring Sri Lanka.
          </p>
          <p className="text-gray-700 leading-relaxed">
            What started as a small family-run operation has grown into one of the most trusted names in Sri Lankan tourism. Today, we serve thousands of travelers every year with a fleet of modern, well-maintained vehicles and a passionate team of professional drivers.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 ">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Mission */}
          <motion.div
            ref={slideInLeft.ref}
            variants={variants}
            initial="hidden"
            animate={slideInLeft.controls}
            className="bg-yellow-50 p-8 rounded-xl shadow-md"
          >
            <h3 className="text-2xl font-bold text-blue-700 mb-4 text-center">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To deliver seamless, safe, and memorable travel experiences by combining comfort, professionalism, and local expertise — ensuring every journey feels like home.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            ref={slideInRight.ref}
            variants={variants}
            initial="hidden"
            animate={slideInRight.controls}
            className="bg-yellow-50 p-8 rounded-xl shadow-md"
          >
            <h3 className="text-2xl font-bold text-teal-700 mb-4 text-center">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To be the most trusted and preferred cab service across Sri Lanka, recognized for excellence in customer service, sustainability, and cultural connection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 ">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-center text-yellow-400 mb-12"
        >
          Our Core Values
        </motion.h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Trust', desc: 'We build lasting relationships through honesty and reliability.', icon: '🔐' },
            { title: 'Comfort', desc: 'Modern, clean, and air-conditioned vehicles for a relaxing ride.', icon: '🚗' },
            { title: 'Service', desc: '24/7 support and drivers trained in hospitality and safety.', icon: '🤝' },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="text-5xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Teaser */}
      <section className="py-16 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-yellow-400 text-black p-10 rounded-2xl shadow-xl text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg opacity-95 mb-6">
            Our drivers aren&apos;t just professionals — they&apos;re storytellers, guides, and ambassadors of Sri Lankan culture.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Learn More About Our Drivers
          </motion.button>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 text-center text-white">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Ready to Explore with Us?
        </motion.h2>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg max-w-xl mx-auto opacity-90 mb-8"
        >
          Whether it’s a city tour or a cross-country adventure, we’re here to make your journey unforgettable.
        </motion.p>
        <motion.a
          href="/book"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-yellow-500 hover:bg-blue-400 text-black font-bold px-10 py-4 rounded-full shadow-lg transition-all"
        >
          🚖 Book Your Ride Today
        </motion.a>
      </section>

     
    </main>
  );
}