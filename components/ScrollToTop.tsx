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
    // Scroll to top whenever the route changes
    // Using useLayoutEffect to prevent visible scroll jump
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use "instant" for immediate scroll, or "smooth" for animated scroll
    });
  }, [pathname]);

  // Also handle page refresh/reload
  useLayoutEffect(() => {
    // Ensure we're at the top on initial load
    // Using useLayoutEffect to prevent visible scroll jump
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  return null; // This component doesn't render anything
}


