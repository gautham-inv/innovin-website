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

    // Immediate scroll for fastest response
    window.scrollTo(0, 0);

    // Double RAF to ensure scroll happens after Next.js page transition is complete
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    });

    // Fallback with a small delay for edge cases where content loads asynchronously
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null; // This component doesn't render anything
}


