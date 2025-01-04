/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['127.0.0.1','res.cloudinary.com', 'images.pexels.com'],
    // Optionally, you might specify other configurations such as device sizes or image sizes here
  },
  typescript: {
    ignoreDevErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
