import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { type PortableTextBlock } from 'next-sanity'
import { sanityFetch } from '@/lib/sanity/lib/live'
import { getSanityFetchConfig } from '@/lib/sanity/lib/preview'
import { jobSlugs, jobQuery } from '@/lib/sanity/lib/queries'
import PortableText from '@/components/PortableText'
import Footer from '@/components/Footer'
import Schema from '@/components/Schema'

type Props = {
  params: Promise<{ slug: string }>
}

/**
 * Generate static params for all job slugs at build time.
 * Pages are pre-rendered as static HTML and served via CDN.
 * Updates are triggered via webhook (see /api/revalidate)
 */
export async function generateStaticParams() {
  try {
    const { data } = await sanityFetch({
      query: jobSlugs,
      perspective: 'published',
      stega: false,
    })
    return data || []
  } catch (error) {
    // If Sanity is not configured, return empty array
    console.warn('Sanity not configured, returning empty job slugs:', error)
    return []
  }
}

/**
 * Generate metadata for the page.
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  try {
    const { perspective, stega } = await getSanityFetchConfig()
    const { data: job } = await sanityFetch({
      query: jobQuery,
      params,
      perspective,
      stega,
    })

    if (!job) {
      return {
        title: 'Job Not Found | Innovin Labs',
      }
    }

    return {
      title: `${job.title} | Careers | Innovin Labs`,
      description: job.heading || `Apply for the ${job.title} position at Innovin Labs. Join our team of product champions.`,
    }
  } catch (error) {
    return {
      title: 'Job Not Found | Innovin Labs',
    }
  }
}

export default async function JobDetailPage(props: Props) {
  const params = await props.params
  const { perspective, stega } = await getSanityFetchConfig()
  const { data: job } = await sanityFetch({
    query: jobQuery,
    params,
    perspective,
    stega,
  })

  if (!job?._id) {
    return notFound()
  }

  const applyUrl = `/careers/apply?jobId=${job._id}&title=${encodeURIComponent(job.title)}`

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: job.title,
      description: job.heading || job.title,
      identifier: {
        "@type": "PropertyValue",
        name: "Innovin Labs",
        value: job._id
      },
      datePosted: job.datePosted,
      validThrough: job.dateExpires,
      employmentType: job.employmentType || "FULL_TIME",
      hiringOrganization: {
        "@type": "Organization",
        name: "Innovin Labs",
        sameAs: "https://innovinlabs.com",
        logo: "https://innovinlabs.com/images/logo.png"
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: job.location || "Trivandrum",
          addressCountry: "IN"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://innovinlabs.com"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Careers",
          item: "https://innovinlabs.com/careers"
        },
        {
          "@type": "ListItem",
          position: 3,
          name: job.title,
          item: `https://innovinlabs.com/careers/${params.slug}`
        }
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16 font-sans">
      <Schema data={jsonLd} />
      <div className="w-full px-4 sm:px-6 md:px-8 xl:px-[70px]">
        <div className="max-w-[1681px] mx-auto">
          {/* Job Title and Apply Button Section */}
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-[50px] items-start px-3 sm:px-4 md:px-5 py-8 sm:py-10 md:py-[60px]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 w-full">
              <div className="flex flex-col items-start justify-center w-full sm:flex-1 sm:pr-6">
                <h1 className="font-semibold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-black w-full leading-tight tracking-tight">
                  {job.title}
                </h1>
              </div>
              <Link
                href={applyUrl}
                className="group relative p-[4px] rounded-[40px] transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#66c2e2] to-[#005c89] rounded-[40px]" />
                <div className="relative bg-white rounded-[36px] px-6 sm:px-8 md:px-[35px] h-12 sm:h-14 md:h-[56px] flex items-center justify-center transition-colors group-hover:bg-transparent">
                  <span className="font-bold text-base sm:text-[18px] bg-gradient-to-r from-[#66c2e2] to-[#005c89] bg-clip-text text-transparent whitespace-nowrap font-sans group-hover:text-white">
                    Apply now
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="bg-[#9e9e9e] h-px w-full mb-0" />

          <div className="flex flex-col items-start justify-center p-3 sm:p-4 md:p-5 w-full">
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 items-start px-3 sm:px-4 md:px-5 w-full">
              <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl text-black w-full font-sans leading-tight">
                Job Description
              </h2>
              {job.jobDescription && job.jobDescription.length > 0 && (
                <div className="font-normal text-black w-full">
                  <PortableText className="job-description" value={job.jobDescription as PortableTextBlock[]} />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-start justify-center p-3 sm:p-4 md:p-5 w-full">
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 items-start px-3 sm:px-4 md:px-5 w-full">
              <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl text-black w-full font-sans leading-tight">
                Roles and Responsibilities
              </h2>
              {job.rolesAndResponsibilities && job.rolesAndResponsibilities.length > 0 && (
                <div className="w-full job-content">
                  <PortableText className="job-content" value={job.rolesAndResponsibilities as PortableTextBlock[]} />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-start justify-center p-3 sm:p-4 md:p-5 w-full">
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 items-start px-3 sm:px-4 md:px-5 w-full">
              <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl text-black w-full font-sans leading-tight">
                Qualifications
              </h2>
              {job.qualifications && job.qualifications.length > 0 && (
                <div className="w-full job-content">
                  <PortableText className="job-content" value={job.qualifications as PortableTextBlock[]} />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-start justify-center p-3 sm:p-4 md:p-5 w-full">
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 items-start px-3 sm:px-4 md:px-5 w-full">
              <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl text-black w-full font-sans leading-tight">
                Benefits
              </h2>
              {job.benefits && job.benefits.length > 0 && (
                <div className="w-full job-content">
                  <PortableText className="job-content" value={job.benefits as PortableTextBlock[]} />
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="bg-[#9e9e9e] h-px w-full mt-10 sm:mt-12 md:mt-16 mb-8 sm:mb-10 md:mb-12" />

            {/* Bottom Apply Button */}
            <div className="flex justify-center w-full">
              <Link
                href={applyUrl}
                className="group relative p-[4px] rounded-[40px] transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#66c2e2] to-[#005c89] rounded-[40px]" />
                <div className="relative bg-white rounded-[36px] px-8 sm:px-10 md:px-[45px] h-12 sm:h-14 md:h-[56px] flex items-center justify-center transition-colors group-hover:bg-transparent">
                  <span className="font-bold text-base sm:text-[18px] bg-gradient-to-r from-[#66c2e2] to-[#005c89] bg-clip-text text-transparent whitespace-nowrap font-sans group-hover:text-white">
                    Apply now
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}