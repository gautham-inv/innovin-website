import type { Metadata } from "next";
import CareersPage from "@/components/CareersPage";
import { sanityFetch } from "@/lib/sanity/lib/live";
import { getSanityFetchConfig } from "@/lib/sanity/lib/preview";
import { allJobsQuery } from "@/lib/sanity/lib/queries";
import Footer from "@/components/Footer";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title: "Careers | Innovin Labs - Join Our Team of Product Champions",
  description: "Ignite your career at Innovin Labs. Join a team of product champions powering innovation at global scale. Explore our job openings and company culture.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers | Innovin Labs - Join Our Team of Product Champions",
    description: "Ignite your career at Innovin Labs. Explore our job openings and company culture.",
    url: "https://innovinlabs.com/careers",
  },
};

/**
 * Careers listing page - pre-rendered as static HTML at build time.
 * Updates are triggered via webhook when jobs are updated in Sanity.
 * See /api/revalidate for webhook handler.
 */
export default async function Careers() {
  const jsonLd = {
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
      }
    ]
  };

  let jobs: any[] = [];

  try {
    const { perspective, stega } = await getSanityFetchConfig();
    const result = await sanityFetch({
      query: allJobsQuery,
      perspective,
      stega,
    });
    jobs = result.data || [];
    console.log(`✅ Fetched ${jobs.length} active jobs from Sanity`);
  } catch (error) {
    console.warn('❌ Failed to fetch jobs from Sanity:', error);
  }

  return (
    <>
      <CareersPage jobs={jobs} />
      <Footer />
    </>
  );
}

