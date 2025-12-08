import Link from 'next/link'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {type PortableTextBlock} from 'next-sanity'
import {sanityFetch} from '@/lib/sanity/lib/live'
import {jobSlugs, jobQuery} from '@/lib/sanity/lib/queries'
import PortableText from '@/components/PortableText'

type Props = {
  params: Promise<{slug: string}>
}

/**
 * Generate static params for all job slugs at build time.
 * Pages are pre-rendered as static HTML and served via CDN.
 * Updates are triggered via webhook (see /api/revalidate)
 */
export async function generateStaticParams() {
  try {
    const {data} = await sanityFetch({
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
    const {data: job} = await sanityFetch({
      query: jobQuery,
      params,
      stega: false,
    })

    if (!job) {
      return {
        title: 'Job Not Found',
      }
    }

    return {
      title: job.title,
      description: job.heading,
    }
  } catch (error) {
    return {
      title: 'Job Not Found',
    }
  }
}

export default async function JobDetailPage(props: Props) {
  const params = await props.params
  const {data: job} = await sanityFetch({
    query: jobQuery,
    params,
  })

  if (!job?._id) {
    return notFound()
  }

  const applyUrl = `/careers/apply?jobId=${job._id}&title=${encodeURIComponent(job.title)}`

  return (
    <div className="bg-white min-h-screen pt-24 pb-16 font-['Inter',sans-serif]">
      <div className="max-w-[1542px] mx-auto px-5">
        {/* Job Title and Apply Button Section */}
        <div className="flex flex-col gap-[50px] items-start px-5 py-[60px]">
          <div className="flex flex-col gap-[50px] items-start w-full">
            <div className="flex flex-col items-start justify-center">
              <h1 className="font-medium leading-[60px] text-[48px] text-black w-full" style={{fontFamily: 'Inter, sans-serif'}}>
                {job.title}
              </h1>
            </div>
            <Link
              href={applyUrl}
              className="bg-gradient-to-r from-[#66c2e2] to-[#005c89] border-[0.585px] border-[rgba(0,92,137,0.5)] rounded-[40px] px-[35px] py-[9px] h-[56px] flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <span className="font-bold leading-[23px] text-[16px] text-white tracking-[0.0069px] whitespace-nowrap" style={{fontFamily: 'Satoshi, sans-serif'}}>
                Apply Now
              </span>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="bg-[#9e9e9e] h-px w-full mb-0" />

        {/* Job Description Section */}
        <div className="flex flex-col items-start justify-center p-5 w-full">
          <div className="flex flex-col gap-[30px] items-start w-full">
            <div className="flex flex-col items-start px-5 w-full">
              <div className="flex flex-col items-start w-full">
                <h2 className="font-semibold leading-[60px] text-[40px] text-black w-full" style={{fontFamily: 'Inter, sans-serif'}}>
                  Job Description
                </h2>
              </div>
            </div>
            <div className="flex flex-col items-start px-5 w-full">
              {job.jobDescription && job.jobDescription.length > 0 && (
                <div className="font-medium leading-[60px] text-[24px] text-black w-full" style={{fontFamily: 'Inter, sans-serif'}}>
                  <PortableText className="job-description" value={job.jobDescription as PortableTextBlock[]} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Roles and Responsibilities Section */}
        <div className="flex flex-col items-start justify-center p-5 w-full">
          <div className="flex flex-col gap-[30px] items-start w-full">
            <div className="flex flex-col items-start px-5 w-full">
              <div className="flex flex-col items-start w-full">
                <h2 className="font-semibold leading-[60px] text-[40px] text-black w-full mb-0" style={{fontFamily: 'Inter, sans-serif'}}>
                  Roles and Responsibilities:
                </h2>
                {job.rolesAndResponsibilities && job.rolesAndResponsibilities.length > 0 && (
                  <div className="mt-0 w-full job-content">
                    <PortableText className="job-content" value={job.rolesAndResponsibilities as PortableTextBlock[]} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Qualifications Section */}
        <div className="flex flex-col items-start justify-center p-5 w-full">
          <div className="flex flex-col items-start w-full">
            <div className="flex flex-col items-start px-5 w-full">
              <div className="flex flex-col items-start w-full">
                <h2 className="font-semibold leading-[60px] text-[40px] text-black w-full mb-0" style={{fontFamily: 'Inter, sans-serif'}}>
                  Qualifications:
                </h2>
                {job.qualifications && job.qualifications.length > 0 && (
                  <div className="mt-0 w-full job-content">
                    <PortableText className="job-content" value={job.qualifications as PortableTextBlock[]} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="flex flex-col gap-[50px] items-start justify-center p-5 w-full">
          <div className="flex flex-col items-start w-full">
            <div className="flex flex-col items-start px-5 w-full">
              <div className="flex flex-col items-start w-full">
                <h2 className="font-semibold leading-[60px] text-[40px] text-black w-full mb-0" style={{fontFamily: 'Inter, sans-serif'}}>
                  Benefits:
                </h2>
                {job.benefits && job.benefits.length > 0 && (
                  <div className="mt-0 w-full job-content">
                    <PortableText className="job-content" value={job.benefits as PortableTextBlock[]} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="bg-[#9e9e9e] h-px w-full" />

          {/* Bottom Apply Button */}
          <Link
            href={applyUrl}
            className="bg-gradient-to-r from-[#66c2e2] to-[#005c89] border-[0.585px] border-[rgba(0,92,137,0.5)] rounded-[40px] px-[35px] py-[9px] h-[56px] flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <span className="font-bold leading-[23px] text-[16px] text-white tracking-[0.0069px] whitespace-nowrap" style={{fontFamily: 'Satoshi, sans-serif'}}>
              Apply Now
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

