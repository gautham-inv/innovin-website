/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' to enable ISR and SSR
  // Static pages (home, about, why-us) use SSG by default
  // CMS pages (careers) use ISR with revalidate
  // SSR is used for Sanity live preview
  images: {
    // Images are optimized by default when not using static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

module.exports = nextConfig

