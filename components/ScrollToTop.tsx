"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollToTop component ensures that when navigating between routes,
 * the viewport always starts at the top of the page.
 * This works for all devices and all pages automatically.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    // Prevent browsers from restoring scroll position on reload/back-forward cache.
    // This is especially important for marketing sites where users expect each route to start at the top.
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // If a hash is present, let the browser handle scrolling to the anchor.
    if (window.location.hash) return;

    // Scroll to top whenever the route changes (and on initial mount, because pathname is set).
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null; // This component doesn't render anything
}


