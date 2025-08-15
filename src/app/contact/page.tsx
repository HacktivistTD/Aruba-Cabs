'use client';




import { useState, useRef } from 'react';
import { motion, useAnimate, useInView } from 'framer-motion';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef(null);
  const infoRef = useRef(null);
  const isInView = useInView(infoRef, { once: true, margin: '-100px' });
  const [scope, animate] = useAnimate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    const target = scope.current;
    if (target) {
      animate(target, { y: -10, opacity: 1 }, { duration: 0.4 });
      animate(target, { y: 0, opacity: 1 }, { duration: 0.3 });
    }

    setName('');
    setEmail('');
    setContactNumber('');
    setMessage('');

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen py-12 px-6 bg-white">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600">
            We&apos;d love to hear from you! Send us a message and we&apos;ll respond shortly.
          </p>
        </motion.div>

        {/* Form */}
        <div ref={formRef}>
          {!submitted ? (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl shadow-xl border border-gray-100"
            >
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
                <input
                  type="tel"
                  required
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="0761656983"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your trip or inquiry..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                📨 Send Message
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              ref={scope}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-green-700 mb-3">Message Sent!</h2>
              <p className="text-green-600 leading-relaxed">
                Thank you, <span className="font-semibold">{name}</span>! We&apos;ve received your message and will get back to you within 24 hours.
              </p>
            </motion.div>
          )}
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          ref={infoRef}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm"
        >
          {[
            { title: '📞 Phone', detail: '+94 77 123 4567', color: 'blue' },
            { title: '✉️ Email', detail: 'info@arubacab.lk', color: 'teal' },
            { title: '📍 Location', detail: 'Colombo, Sri Lanka', color: 'green' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + idx * 0.2 }}
              className={`p-4 rounded-xl bg-${item.color}-50 border border-${item.color}-100 text-${item.color}-700 shadow-sm hover:shadow transition-shadow`}
            >
              <div className="font-semibold">{item.title}</div>
              <div className="text-gray-600 mt-1">{item.detail}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Circles */}
      <div className="fixed -top-20 -right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="fixed -bottom-20 -left-20 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
    </main>
  );
}
