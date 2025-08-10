// src/components/Footer.tsx
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok, FaYoutube, FaPinterest } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61578136073686', icon: FaFacebookF, color: 'hover:text-blue-500' },
    { name: 'Instagram', href: 'https://instagram.com/arubacabs', icon: FaInstagram, color: 'hover:text-pink-500' },
    { name: 'WhatsApp', href: 'https://wa.me/94777656999', icon: FaWhatsapp, color: 'hover:text-green-500' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@aruba_cabs', icon: FaTiktok, color: 'hover:text-white' },
    { name: 'YouTube', href: 'https://www.youtube.com/@aruba_cabs', icon: FaYoutube, color: 'hover:text-red-600' },
    { name: 'Pinterest', href: 'https://www.pinterest.com/aruba_cabs/', icon: FaPinterest, color: 'hover:text-red-700' },
  ];

  return (
    <footer className=" text-white pt-12 pb-8 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold  text-yellow-500">
            Aruba Cab Services
          </h3>
          <p className="text-gray-400 mt-2">Your Journey, Our Priority</p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className={`text-gray-300 ${social.color} transition-all duration-300 transform hover:scale-125`}
            >
              <social.icon size={22} />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white">
            {/* Copyright */}
            <p>&copy; {currentYear} Aruba Cab Services. All rights reserved.</p>

            {/* Designer Credit */}
            <p className="flex items-center gap-1">
              Designed By <span className="text-amber-300 font-semibold">Nova Lab.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
