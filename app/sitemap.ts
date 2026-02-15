import { MetadataRoute } from 'next'
import { sanityFetch } from '@/lib/sanity/lib/live'
import { jobSlugs, postSlugs } from '@/lib/sanity/lib/queries'

/**
 * Dynamic sitemap generation for SEO.
 * Includes all static pages and dynamic routes from Sanity (blog posts, careers).
 * 
 * Base URL can be configured via NEXT_PUBLIC_SITE_URL environment variable.
 * Defaults to https://innovinlabs.com for production.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innovinlabs.com'

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/why-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/tech-stack`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Fetch dynamic routes from Sanity
  let blogPosts: MetadataRoute.Sitemap = []
  let careers: MetadataRoute.Sitemap = []

  try {
    // Fetch blog post slugs
    const postsResult = await sanityFetch({
      query: postSlugs,
      perspective: 'published',
      stega: false,
    })

    if (postsResult.data && Array.isArray(postsResult.data)) {
      blogPosts = postsResult.data.map((post: { slug: string }) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
    }

    // Fetch job slugs
    const jobsResult = await sanityFetch({
      query: jobSlugs,
      perspective: 'published',
      stega: false,
    })

    if (jobsResult.data && Array.isArray(jobsResult.data)) {
      careers = jobsResult.data.map((job: { slug: string }) => ({
        url: `${baseUrl}/careers/${job.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))
    }
  } catch (error) {
    console.warn('Failed to fetch dynamic routes for sitemap:', error)
    // Continue with static routes only if Sanity fetch fails
  }

  return [...staticRoutes, ...blogPosts, ...careers]
}

