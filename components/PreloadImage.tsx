"use client";

import { useEffect } from "react";

/**
 * Injects a preload link for the given image URL so the browser starts
 * fetching it as soon as the component mounts. Use for the LCP/hero image
 * so it loads with the page instead of 1–2s later.
 *
 * Best practice: do NOT block page paint until all images load. That would
 * increase blank-screen time and hurt LCP. Instead: paint immediately,
 * preload the critical image, and use fetchPriority="high" + loading="eager"
 * on above-the-fold images so they load in parallel with the rest of the page.
 */
export function PreloadImage({ href }: { href: string }) {
  useEffect(() => {
    if (!href) return;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = href;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [href]);
  return null;
}
