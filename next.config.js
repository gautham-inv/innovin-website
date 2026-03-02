/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    // next/image optimization requires a server. Since we're using static export,
    // we disable it here. Cloudinary handles all image optimization via f_auto,q_auto.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
