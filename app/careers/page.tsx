import CareersPage from "@/components/CareersPage";

/**
 * Careers listing page - pre-rendered as static HTML at build time.
 * Updates are triggered via webhook when jobs are updated in Sanity.
 * See /api/revalidate for webhook handler.
 */
export default function Careers() {
  return <CareersPage />;
}

