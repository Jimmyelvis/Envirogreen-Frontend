/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'images.pexels.com', 'mlmontheweb.com', process.env.NEXT_PUBLIC_HOSTNAME],
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
