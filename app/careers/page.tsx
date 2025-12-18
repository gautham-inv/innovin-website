import CareersPage from "@/components/CareersPage";
import { sanityFetch } from "@/lib/sanity/lib/live";
import { getSanityFetchConfig } from "@/lib/sanity/lib/preview";
import { allJobsQuery } from "@/lib/sanity/lib/queries";
import Footer from "@/components/Footer";


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

