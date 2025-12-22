import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { Toaster } from "sonner";

import { SanityLive } from "@/lib/sanity/lib/live";
import { handleError } from "./client-utils";

/**
 * Preview-only tooling.
 *
 * NOTE: This component intentionally calls `draftMode()`.
 * Do NOT import and render it unconditionally in the root layout in production,
 * as that will force the whole app to be dynamic and can slow down the site.
 */
export default async function SanityPreviewTools() {
  const { isEnabled } = await draftMode();

  if (!isEnabled) return null;

  return (
    <>
      <Toaster />
      <SanityLive onError={handleError} />
      <VisualEditing />
    </>
  );
}



