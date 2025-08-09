import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'encrypted-tbn0.gstatic.com',
      'encrypted-tbn1.gstatic.com',
       "lh3.googleusercontent.com", // South Coast Adventure
      "encrypted-tbn1.gstatic.com", // Cultural Triangle Tour
      "cdn.getyourguide.com"        // Hill Country Escape
    ],
  },
};

export default nextConfig;
