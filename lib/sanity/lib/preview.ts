import { draftMode } from "next/headers";

/**
 * Returns the correct Sanity fetch options for the current environment/session.
 *
 * Goals:
 * - Render FAST in production (Render): do not touch `draftMode()` / cookies, always fetch published, no stega.
 * - Allow true draft preview + Visual Editing in the Preview deployment (Vercel) ONLY when Draft Mode is enabled:
 *   fetch drafts + stega.
 */
export async function getSanityFetchConfig(): Promise<{
  perspective: "published" | "drafts";
  stega: boolean;
}> {
  const previewEnvEnabled = process.env.NEXT_PUBLIC_ENABLE_SANITY_PREVIEW === "true";

  // Production/default: always published, never stega (keeps pages statically optimizable)
  if (!previewEnvEnabled) {
    return { perspective: "published", stega: false };
  }

  // Preview env: only show drafts/stega when Draft Mode cookie is enabled (Sanity Presentation sets this)
  const { isEnabled } = await draftMode();
  return isEnabled ? { perspective: "drafts", stega: true } : { perspective: "published", stega: false };
}


