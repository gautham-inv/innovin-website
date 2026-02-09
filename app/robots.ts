import { MetadataRoute } from 'next'

/**
 * Robots.txt configuration for search engine crawlers.
 * 
 * Base URL can be configured via NEXT_PUBLIC_SITE_URL environment variable.
 * Defaults to https://innovinlabs.com for production.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innovinlabs.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/_next/static/',  // Allow static assets (CSS, JS, images)
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/draft-mode/',
          '/_next/data/',  // Block Next.js data fetching routes
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

