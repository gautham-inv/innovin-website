import type { Metadata } from "next";
import CareersPage from "@/components/CareersPage";
import { sanityFetch } from "@/lib/sanity/lib/live";
import { getSanityFetchConfig } from "@/lib/sanity/lib/preview";
import { allJobsQuery } from "@/lib/sanity/lib/queries";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Careers | Innovin Labs - Join Our Team of Product Champions",
  description: "Ignite your career at Innovin Labs. Join a team of product champions powering innovation at global scale. Explore our job openings and company culture.",
};

/**
 * Careers listing page - pre-rendered as static HTML at build time.
 * Updates are triggered via webhook when jobs are updated in Sanity.
 * See /api/revalidate for webhook handler.
 */
export default async function Careers() {
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

