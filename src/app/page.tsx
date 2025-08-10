'use client';

import { motion, easeInOut } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import SpecialPackages from '@/components/SpecialPackages';

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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: easeInOut },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: easeInOut },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative overflow-hidden min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        {/* Background with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 2 }}
            className="w-full h-full bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: "url('https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrMkWxtcdtIp3DAFtfr6OrgmmnKrDHEUcV6Pp_uIJNwaaI2-AbW3SVnOLoYxB495wGO2uskRhcS2w7A_diCr5IwujhjR8-seGS0lXE0tv_YbEejGnAMBugUxBlICo1Zltwj9WIfOA=w675-h390-n-k-no')",
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mb-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
              Explore{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Sri Lanka
              </span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-blue-100">
                with Aruba Cab Services
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed px-4"
          >
            Discover the pearl of the Indian Ocean with reliable, comfortable, and personalized cab services. 
            From ancient temples to pristine beaches, we'll take you there in style and comfort.
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          >
            <a href="/book" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0px 15px 40px rgba(251, 191, 36, 0.5)',
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-base sm:text-lg font-bold px-8 sm:px-12 py-4 sm:py-5 rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 border-2 border-yellow-400/20"
              >
                🚗 Book Your Adventure
              </motion.button>
            </a>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-transparent border-2 border-white/30 backdrop-blur-sm text-white font-semibold px-8 sm:px-12 py-4 sm:py-5 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              💬 Get Free Quote
            </motion.button>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto px-4"
          >
            {[
              { number: '500+', label: 'Happy Customers' },
              { number: '24/7', label: 'Service Available' },
              { number: '50+', label: 'Destinations Covered' },
              { number: '5★', label: 'Average Rating' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20"
              >
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">{stat.number}</div>
                <div className="text-xs sm:text-sm text-gray-300 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Aruba Cab Services?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the difference with our premium transportation services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {[
              {
                title: '24/7 Availability',
                desc: 'Round-the-clock service with instant booking confirmation. We\'re always ready to pick you up, anytime, anywhere in Sri Lanka.',
                icon: '⏱️',
                gradient: 'from-blue-500 to-purple-600',
              },
              {
                title: 'Luxury & Comfort',
                desc: 'Premium air-conditioned vehicles with professional, English-speaking drivers who know Sri Lanka like the back of their hand.',
                icon: '🚗',
                gradient: 'from-green-500 to-teal-600',
              },
              {
                title: 'Custom Tours',
                desc: 'Personalized itineraries crafted for you — pristine beaches, misty mountains, rich culture, or thrilling wildlife safaris.',
                icon: '🗺️',
                gradient: 'from-orange-500 to-red-600',
              },
              {
                title: 'Safe & Reliable',
                desc: 'GPS-tracked vehicles, verified drivers, and comprehensive insurance for your peace of mind throughout your journey.',
                icon: '🛡️',
                gradient: 'from-purple-500 to-pink-600',
              },
              {
                title: 'Local Expertise',
                desc: 'Our drivers are local experts who share hidden gems, cultural insights, and the best local experiences.',
                icon: '🌟',
                gradient: 'from-yellow-500 to-orange-600',
              },
              {
                title: 'Fair Pricing',
                desc: 'Transparent, competitive rates with no hidden fees. Get the best value for premium transportation services.',
                icon: '💰',
                gradient: 'from-teal-500 to-blue-600',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">{feature.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-yellow-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base group-hover:text-gray-200 transition-colors">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Popular Destinations */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Popular{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Destinations
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Discover Sri Lanka's most breathtaking locations with our expert guides
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { 
                name: 'Sigiriya Rock', 
                description: 'Ancient fortress & UNESCO World Heritage site',
                img: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrMkWxtcdtIp3DAFtfr6OrgmmnKrDHEUcV6Pp_uIJNwaaI2-AbW3SVnOLoYxB495wGO2uskRhcS2w7A_diCr5IwujhjR8-seGS0lXE0tv_YbEejGnAMBugUxBlICo1Zltwj9WIfOA=w675-h390-n-k-no',
                badge: 'Historic'
              },
              { 
                name: 'Ella Gap',
                description: 'Breathtaking mountain views & Nine Arch Bridge',
                img: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQq5pbN7Zxv77kLzdbKiFqDZjHcLQV3_XkL3HFVHLuMC2mmuqzBWp72JW-48k_MFE6niadf4l_mwmUu7ow2H-CSabFZ0qKHODVJre_AbA',
                badge: 'Adventure'
              },
              { 
                name: 'Galle Fort', 
                description: 'Dutch colonial architecture by the ocean',
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRta1MxIz0aq_fkiLmx7hzuFNkCkgdLA9Dx1676zKtrsR1jAzIDD3vRmd0&s',
                badge: 'Cultural'
              },
              { 
                name: 'Yala National Park', 
                description: 'Wildlife safari & leopard spotting',
                img: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqG2Ozb6CoWolgYMOW4wCzldt4Izk1CH-ZOEhtd2QLpFPZ7vIBE1uebcKLnzwDPVkmr74Le3FmaEQjPaBsR-uh-2WMIgTJjtfznxN6c5lSjOYxoFS1X4jOPnbwyJBbfty6YTPM-=w270-h312-n-k-no',
                badge: 'Wildlife'
              },
              { 
                name: 'Nuwara Eliya', 
                description: 'Cool climate & tea plantations',
                img: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSuERwH5XEDER_zrb6eJ8ZUk1bOBA-2qZc_RCVMqQb4RSjKKi_Je2Hw7uv2tl0YTtXfGJX6nnS32HdnSAh2KGho3Xa77KdLjiKsRANN7iU',
                badge: 'Nature'
              },
              { 
                name: 'Mirissa Beach', 
                description: 'Whale watching & golden sunsets',
                img: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqPIcUBsGG4-bK8Lxm8y2-mZPyimlAUIeDZT4mw1QLKeFzVGCSQDkexvA9HqOeygX-jTY1UEk-i7IOM8acDKAPLVjx2Vndx4-t_VkBCnlB8oo3p2GNJJzlAHYWSBxSndTPuoMhH=w675-h390-n-k-no',
                badge: 'Beach'
              },
            ].map((dest, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -12, 
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
                className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden">
                  <Image
                    src={dest.img}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 3}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                      {dest.badge}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      className="text-center"
                    >
                      <div className="bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold text-sm sm:text-base">
                        Explore Now →
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed group-hover:text-gray-200 transition-colors">
                    {dest.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-black"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              What Our{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Travelers Say
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300">
              Real experiences from our valued customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: 'Sarah Johnson',
                country: 'United Kingdom',
                text: 'Aruba Cab made our Sri Lanka trip absolutely seamless. Our driver was punctual, incredibly kind, and knew all the best hidden spots. The vehicle was spotless and comfortable for our family of four.',
                rating: 5,
                avatar: '👩🏼‍💼'
              },
              {
                name: 'Raj Mehta',
                country: 'India',
                text: 'Luxurious ride quality, transparent pricing, and exceptional 24/7 customer support. The custom tour they arranged exceeded our expectations. Highly recommend for family tours!',
                rating: 5,
                avatar: '👨🏽‍💼'
              },
              {
                name: 'Emma Rodriguez',
                country: 'Spain',
                text: 'Professional service from start to finish. The driver was not just a chauffeur but a knowledgeable guide who enriched our Sri Lankan adventure with local stories and recommendations.',
                rating: 5,
                avatar: '👩🏻‍🦱'
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>

                <p className="italic text-gray-200 mb-6 text-sm sm:text-base leading-relaxed group-hover:text-white transition-colors">
                  &quot;{testimonial.text}&quot;
                </p>

                <div className="flex items-center">
                  <div className="text-3xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold text-white text-base sm:text-lg group-hover:text-yellow-400 transition-colors">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      {testimonial.country}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call-to-Action Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)'
          }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 sm:mb-8"
          >
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Ready to Explore
            </span>
            <br />
            <span className="text-white">Sri Lanka?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Book your premium cab experience today and let us handle the journey — so you can focus on creating unforgettable memories in paradise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          >
            <motion.a
              href="/book"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0px 20px 50px rgba(251, 191, 36, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 rounded-full shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300"
            >
              📞 Book Online Now
            </motion.a>

            <motion.a
              href="tel:+94771234567"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-block bg-transparent border-2 border-yellow-400/50 backdrop-blur-sm text-white font-semibold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 rounded-full hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-300"
            >
              📱 Call Directly
            </motion.a>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-gray-300"
          >
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">📧</span>
              <span className="text-sm sm:text-base">info@arubacab.lk</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">📱</span>
              <span className="text-sm sm:text-base">+94 77 123 4567</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⏰</span>
              <span className="text-sm sm:text-base">Available 24/7</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Special Packages Component */}
      <SpecialPackages />
    </div>
  );
}