// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // South Coast Adventure
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn1.gstatic.com', // Cultural Triangle Tour
      },
      {
        protocol: 'https',
        hostname: 'cdn.getyourguide.com', // Hill Country Escape
      },
      {
        protocol: 'https',
        hostname: 'lk.lakpura.com', // Yala & Udawalawe Safaris
      },
      {
        protocol: 'https',
        hostname: 'lp-cms-production.imgix.net', // Arugam Bay Surf Escape
      },
    ],
  },
};

export default nextConfig;
