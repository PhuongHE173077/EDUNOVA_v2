import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'img-c.udemycdn.com',
      'img-a.udemycdn.com',
      'img-b.udemycdn.com',
    ],
  },
  reactStrictMode: false,

  eslint: {
    ignoreDuringBuilds: true, // ✅ Tắt ESLint khi build
  },
};

export default nextConfig;
