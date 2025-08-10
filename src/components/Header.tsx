// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 60 }}
      className="fixed top-0 left-0 w-full z-50  shadow-lg"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)' }}
    >
      <nav className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-white font-extrabold text-2xl tracking-tight hover:text-yellow-300 transition-colors"
        >
          Aruba
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-white font-medium">
          <Link href="/packages" className="hover:text-yellow-300 transition-colors">
            Packages
          </Link>
          <Link href="/custom-trip" className="hover:text-yellow-300 transition-colors">
            Custom Trip
          </Link>
          <Link href="/about" className="hover:text-yellow-300 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-yellow-300 transition-colors">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg rounded-b-xl overflow-hidden"
        >
          <div className="flex flex-col text-gray-800 font-semibold text-lg">
            <Link
              href="/packages"
              className="px-6 py-3 hover:text-yellow-500 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Packages
            </Link>
            <Link
              href="/custom-trip"
              className="px-6 py-3 hover:text-yellow-500 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Custom Trip
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 hover:text-yellow-500 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 hover:text-yellow-500 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
