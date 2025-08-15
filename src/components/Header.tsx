// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items with SEO-friendly descriptions
  const navigationItems = [
    {
      name: 'Tour Packages',
      href: '/packages',
      description: 'Explore our Sri Lanka tour packages and cab services'
    },
   
    {
      name: 'About Us',
      href: '/about',
      description: 'Learn about Aruba Cab Services - Sri Lanka\'s trusted transport partner'
    },
    {
      name: 'Contact',
      href: '/contact',
      description: 'Contact Aruba Cab Services for bookings and inquiries'
    }
  ];

  const contactInfo = {
    phone: '+94 77 765 6999',
    location: 'Colombo, Sri Lanka',
    hours: '24/7 Service'
  };

  return (
    <>
      {/* Top Contact Bar - SEO Rich Information */}
      <div className="bg-gradient-to-r from-green-400 to-green-400 text-gray-900 py-2 px-4 text-sm hidden lg:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone size={14} />
              <a 
                href={`tel:${contactInfo.phone}`}
                className="hover:underline font-medium"
                aria-label="Call Aruba Cab Services for immediate booking"
              >
                {contactInfo.phone}
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={14} />
              <span className="font-medium">{contactInfo.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={14} />
              <span className="font-medium">{contactInfo.hours}</span>
            </div>
          </div>
          <div className="text-sm font-semibold">
            🚗 Sri Lanka&apos;s Premier Cab & Tour Service Since 2015
          </div>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 60 }}
        className={`fixed top-0 lg:top-10 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-gray-900/95 backdrop-blur-md shadow-2xl' 
            : 'bg-gradient-to-r from-gray-900/80 to-blue-900/80 backdrop-blur-sm shadow-lg'
        }`}
        style={{ 
          clipPath: isScrolled ? 'none' : 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)',
          borderRadius: isScrolled ? '0' : '0 0 20px 20px'
        }}
        role="banner"
      >
        <nav 
          className="container mx-auto px-4 py-4 flex items-center justify-between"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Enhanced Logo with Schema Markup */}
          <Link
            href="/"
            className="flex items-center space-x-3 group"
            aria-label="Aruba Cab Services - Home"
            itemScope
            itemType="https://schema.org/Organization"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="bg-gradient-to-r from-green-400 to-green-600 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
              >
                <span className="text-gray-900 font-black text-xl">🚗</span>
              </motion.div>
            </div>
            <div className="flex flex-col">
              <span 
                className="text-white font-extrabold text-2xl tracking-tight group-hover:text-green-300 transition-colors"
                itemProp="name"
              >
                Aruba Cabs
              </span>
              <span className="text-green-300 text-xs font-medium hidden sm:block">
                Sri Lanka Tours & Transport
              </span>
            </div>
            <meta itemProp="url" content="https://arubacabs.lk" />
            <meta itemProp="foundingDate" content="2015" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6 text-white font-medium" role="menubar">
              {navigationItems.map((item, index) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ y: -2 }}
                  role="none"
                >
                  <Link 
                    href={item.href} 
                    className="hover:text-green-300 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/10 relative group"
                    title={item.description}
                    role="menuitem"
                  >
                    {item.name}
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"
                      whileHover={{ width: '100%' }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/custom-trip"
                className="bg-gradient-to-r from-green-400 to-green-400 text-gray-900 font-bold px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                aria-label="Book your Sri Lanka cab service now"
              >
                <span>Book Now</span>
                <Phone size={16} />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden bg-white/10 backdrop-blur-sm text-white p-3 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="fixed top-20 left-4 right-4 bg-white shadow-2xl rounded-2xl overflow-hidden z-50 md:hidden border border-gray-200"
            >
              {/* Mobile Header */}
              <div className="bg-gradient-to-r from-green-400 to-green-500 p-4 text-center">
                <h3 className="text-gray-900 font-bold text-lg">Aruba Cab Services</h3>
                <p className="text-gray-800 text-sm">Sri Lanka&apos;s Trusted Transport Partner</p>
              </div>

              {/* Mobile Navigation */}
              <nav className="p-2" role="navigation" aria-label="Mobile navigation">
                <ul role="menu" className="space-y-1">
                  {navigationItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      role="none"
                    >
                      <Link
                        href={item.href}
                        className="flex items-center px-4 py-3 text-gray-800 font-semibold text-lg hover:bg-green-50 hover:text-green-600 transition-all duration-300 rounded-xl group"
                        onClick={() => setMenuOpen(false)}
                        title={item.description}
                        role="menuitem"
                      >
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Mobile Contact Info */}
                <div className="border-t border-gray-200 mt-4 pt-4 px-4 pb-4">
                  <h4 className="text-gray-800 font-semibold mb-3 text-sm">Contact Us</h4>
                  <div className="space-y-3">
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="flex items-center space-x-3 text-gray-600 hover:text-green-600 transition-colors"
                      aria-label="Call us for immediate booking"
                    >
                      <Phone size={16} />
                      <span className="text-sm">{contactInfo.phone}</span>
                    </a>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Clock size={16} />
                      <span className="text-sm">{contactInfo.hours}</span>
                    </div>
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}