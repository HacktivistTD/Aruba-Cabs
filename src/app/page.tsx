'use client';

import { motion, easeInOut } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: easeInOut },
    },
  };

  return (
    <div className=" min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative overflow-hidden pt-20 pb-32 px-6 text-center"
      >
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrMkWxtcdtIp3DAFtfr6OrgmmnKrDHEUcV6Pp_uIJNwaaI2-AbW3SVnOLoYxB495wGO2uskRhcS2w7A_diCr5IwujhjR8-seGS0lXE0tv_YbEejGnAMBugUxBlICo1Zltwj9WIfOA=w675-h390-n-k-no')",
            }}
          ></motion.div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-md"
          >
            Explore Sri Lanka
            <span className="text-yellow-400 block">with Aruba Cab Services</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl text-gray-50 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Discover the beauty of Sri Lanka with reliable, comfortable, and personalized cab services. 
            From ancient temples to tropical beaches, we&apos;ll take you there in style.
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <a href="/book">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0px 10px 30px rgba(59, 130, 246, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-500 text-black text-lg px-10 py-4 rounded-full shadow-xl hover:bg-yellow-600 transition-all duration-300 font-medium"
              >
                🚗 Book Your Ride Now
              </motion.button>
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-20 px-6 "
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          Why Choose Aruba Cab Services?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: '24/7 Availability',
              desc: 'We&apos;re always ready to pick you up, anytime, anywhere in Sri Lanka.',
              icon: '⏱️',
            },
            {
              title: 'Luxury & Comfort',
              desc: 'Modern, air-conditioned vehicles with experienced, friendly drivers.',
              icon: '🚗',
            },
            {
              title: 'Custom Tours',
              desc: 'Tailor your itinerary — beaches, hills, culture, or wildlife.',
              icon: '🗺️',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-yellow-500 p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Popular Destinations */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-20 px-6 "
      >
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-12 text-center">
          Popular Destinations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: 'Sigiriya Rock', 
              img: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrMkWxtcdtIp3DAFtfr6OrgmmnKrDHEUcV6Pp_uIJNwaaI2-AbW3SVnOLoYxB495wGO2uskRhcS2w7A_diCr5IwujhjR8-seGS0lXE0tv_YbEejGnAMBugUxBlICo1Zltwj9WIfOA=w675-h390-n-k-no' },
            { name: 'Ella Gap',
               img: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQq5pbN7Zxv77kLzdbKiFqDZjHcLQV3_XkL3HFVHLuMC2mmuqzBWp72JW-48k_MFE6niadf4l_mwmUu7ow2H-CSabFZ0qKHODVJre_AbA' },
            { name: 'Galle Fort', 
              img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRta1MxIz0aq_fkiLmx7hzuFNkCkgdLA9Dx1676zKtrsR1jAzIDD3vRmd0&s' },
            { name: 'Yala National Park', 
              img: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqG2Ozb6CoWolgYMOW4wCzldt4Izk1CH-ZOEhtd2QLpFPZ7vIBE1uebcKLnzwDPVkmr74Le3FmaEQjPaBsR-uh-2WMIgTJjtfznxN6c5lSjOYxoFS1X4jOPnbwyJBbfty6YTPM-=w270-h312-n-k-no' },
            { name: 'Nuwara Eliya', 
              img: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSuERwH5XEDER_zrb6eJ8ZUk1bOBA-2qZc_RCVMqQb4RSjKKi_Je2Hw7uv2tl0YTtXfGJX6nnS32HdnSAh2KGho3Xa77KdLjiKsRANN7iU' },
            { name: 'Mirissa Beach', 
              img: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqPIcUBsGG4-bK8Lxm8y2-mZPyimlAUIeDZT4mw1QLKeFzVGCSQDkexvA9HqOeygX-jTY1UEk-i7IOM8acDKAPLVjx2Vndx4-t_VkBCnlB8oo3p2GNJJzlAHYWSBxSndTPuoMhH=w675-h390-n-k-no' },
          ].map((dest, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.03 }}
              className="rounded-xl overflow-hidden shadow-lg group cursor-pointer"
            >
              <>
                <div className="relative w-full h-64">
                  <Image
                    src={dest.img}
                    alt={dest.name}
                    fill
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-xl font-semibold">{dest.name}</span>
                  </div>
                </div>
                <div className="p-5 bg-white">
                  <h3 className="text-xl font-semibold text-gray-800">{dest.name}</h3>
                  <p className="text-gray-600 mt-2">A must-visit gem of Sri Lanka&apos;s natural beauty.</p>
                </div>
              </>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 px-6  text-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What Our Travelers Say</h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: 'Sarah Johnson',
              country: 'UK',
              text: 'Aruba Cab made our Sri Lanka trip seamless. Our driver was punctual, kind, and knew all the best spots!',
            },
            {
              name: 'Raj Mehta',
              country: 'India',
              text: 'Luxurious ride, fair pricing, and 24/7 support. Highly recommend for family tours!',
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
              className="bg-gray-700 p-6 rounded-xl shadow-lg"
            >
              <p className="italic text-gray-200 mb-4">&quot;{testimonial.text}&quot;</p>
              <div className="font-semibold">{testimonial.name}</div>
              <div className="text-sm text-gray-400">{testimonial.country}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20 px-6 text-center text-white"
      >
        <h2 className=" text-yellow-400 text-3xl md:text-5xl font-bold mb-6">Ready to Explore Sri Lanka?</h2>
        <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Book your cab today and let us handle the journey — so you can enjoy every moment.
        </p>
        <motion.a
          href="/book"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-yellow-500 text-black font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          📞 Call or Book Online Now
        </motion.a>
      </motion.section>


    </div>
  );
}