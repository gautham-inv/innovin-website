/**
 * Returns the correct Sanity fetch options.
 *
 * Static export mode: always fetch published content, never stega.
 * Draft mode / visual editing is incompatible with static export and is disabled.
 */
export async function getSanityFetchConfig(): Promise<{
  perspective: "published" | "drafts";
  stega: boolean;
}> {
  // Static export: always use published content, never stega encoding.
  // Draft mode / visual editing requires a running server (not available in static export).
  return { perspective: "published", stega: false };
}
