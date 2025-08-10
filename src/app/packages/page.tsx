'use client';




import { motion, useAnimation, useInView, easeInOut } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Scroll-triggered animation hook
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
};

function PackageCard({ pkg }: { pkg: Package }) {
  const { ref, controls } = useScrollReveal();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 60, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      initial="hidden"
      animate={hasMounted ? controls : 'hidden'}
      transition={{ delay: pkg.delay, duration: 0.7, ease: 'easeOut' }}
      whileHover={{ y: -14, scale: 1.03, rotateY: 2 }}
      className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-3xl transition-all duration-700 flex flex-col relative will-change-transform"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${pkg.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
        />
        {/* Floating badge corner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="absolute top-4 left-4 bg-white bg-opacity-90 text-gray-800 text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm"
        >
          🌟 Popular
        </motion.div>
      </div>

      <div className="p-7 flex-1 flex flex-col">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-teal-700 transition-colors">
            {pkg.title}
          </h2>
          <p className="text-teal-600 font-medium text-sm mb-3">{pkg.subtitle}</p>
          <p className="text-gray-600 leading-relaxed text-sm mb-6 flex-1">{pkg.description}</p>
        </div>
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold text-gray-800">{pkg.price}</span>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {pkg.duration}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0px 8px 20px rgba(0,0,0,0.2)' }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${pkg.color} shadow-md hover:shadow-xl transition-all duration-300`}
          >
            📅 Book This Package
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function PackagesPage() {
  const packages: Package[] = [
    {
      title: 'South Coast Adventure',
      subtitle: 'Beaches, culture & heritage',
      description:
        'Explore stunning beaches, historical sites, and vibrant culture on Sri Lanka’s south coast. Visit Galle Fort, Mirissa, and Tangalle.',
      price: 'LKR 15,000',
      duration: '3 Days / 2 Nights',
      image:
        'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrzisCbR7f05vQygno2-D2X5pEa9mDCZHp0uRJvwSXedoHmMHA6Z_wOJNiVViaaDP56VieoZQdk8wiETepfVrhWyU1l5yyE1ApyzGuyRJD_YSChnAnzF1i5XpZb9jergqI2G-We=w675-h390-n-k-no',
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
        'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQD2UJTpFwFB836aF79g2ig-xZXP31cXH0rFmpzang1uLBiZw1YKzrEL7-v0eBS2fUoOWA8azIaCb_psoiQD_fDtbeWZ4ahZ3n-hcbMtQ',
      color: 'from-orange-500 to-red-500',
      delay: 0.4,
    },
    {
      title: 'Hill Country Escape',
      subtitle: 'Tea, mist & mountain views',
      description:
        'Enjoy scenic tea plantations, waterfalls, and cool mountain air in Sri Lanka\'s hill country. Ella, Nuwara Eliya, and Bandarawela await.',
      price: 'LKR 18,000',
      duration: '3 Days / 2 Nights',
      image:
        'https://cdn.getyourguide.com/image/format=auto,fit=contain,gravity=auto,quality=60,width=1440,height=650,dpr=1/tour_img/61d0a114e3cfa.jpeg',
      color: 'from-green-500 to-emerald-500',
      delay: 0.4,
    },
    {
      title: 'Wildlife Safari at Yala',
      subtitle: 'Experience the wild side of Sri Lanka',
      description:
        'Embark on an unforgettable wildlife safari at Yala National Park. Spot leopards, elephants, and a variety of bird species in their natural habitat.',
      price: 'LKR 22,000',
      duration: '3 Days / 2 Nights',
      image:
        'https://lk.lakpura.com/cdn/shop/files/LK50C01000-02-E-1280-720_89288ce2-b128-4667-a572-ba5c0c55052a.jpg?v=1705488904&width=1445',
      color: 'from-emerald-500 to-teal-600',
      delay: 0.4,
    },
    {
      title: 'Udawalawe Elephant Safari',
      subtitle: 'Experience the gentle giants of Sri Lanka',
      description:
        'Get up close with herds of wild elephants in their natural habitat. Udawalawe offers breathtaking scenery, abundant wildlife, and unforgettable safari adventures.',
      price: 'LKR 18,000',
      duration: '3 Days / 2 Nights',
      image:
        'https://lk.lakpura.com/cdn/shop/files/74.jpg?v=1653300776&width=3840',
      color: 'from-teal-500 to-cyan-500',
      delay: 0.4,
    },
    {
      title: 'Arugam Bay Surf Escape',
      subtitle: 'Surf, sun & sand',
      description:
        'Catch the perfect wave at Arugam Bay, one of the top surf destinations in the world. Enjoy sun-soaked days and vibrant nightlife.',
      price: 'LKR 18,000',
      duration: '3 Days / 2 Nights',
      image:
        'https://lp-cms-production.imgix.net/2019-06/f0275838e5f1a765d23f3d1835d4c541-arugam-bay-beach.jpg?w=1920&h=640&fit=crop&crop=faces%2Cedges&auto=format&q=75',
      color: 'from-blue-400 to-teal-500',
      delay: 0.4,
    },
  ];

  // Floating orbs animation
  const floatingVariants = {
    float: {
      y: [0, -20, 0],
      x: [0, 15, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  };

  return (
    <main className="min-h-screen relative">
      {/* Floating Background Orbs (Decorative only, no color change to bg) */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 z-0"
        variants={floatingVariants}
        animate="float"
      />
      <motion.div
        className="absolute top-40 right-10 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 z-0"
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 2 }}
      />
      <motion.div
        className="absolute bottom-32 left-1/4 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 z-0"
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 4 }}
      />

      <section className="py-24 px-6 text-center relative z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-teal-500 to-green-600 mb-6"
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

        {/* Special Package Button with Pulse */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10"
        >
          <motion.a
            href="/custom"
            whileHover={{ scale: 1.08, boxShadow: '0px 10px 25px rgba(234, 179, 8, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="inline-block bg-yellow-500 text-gray-800 font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            🌟 Our Special Packages
          </motion.a>
        </motion.div>
      </section>

      <section className="px-6 pb-24 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {packages.map((pkg) => (
            <PackageCard key={pkg.title} pkg={pkg} />
          ))}
        </motion.div>
      </section>

      <section className="py-20 px-6 text-center bg-gradient-to-r from-gray-800 to-teal-900 text-white relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Can’t Find the Perfect Package?
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
          whileHover={{ scale: 1.08, boxShadow: '0px 10px 30px rgba(255,255,255,0.3)' }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-white text-gray-800 font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          🛠️ Build Your Own Tour
        </motion.a>
      </section>
    </main>
  );
}