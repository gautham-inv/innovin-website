"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export default function SessionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Check if this is a return visit
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (lastVisit) {
      const timeSinceLastVisit = now - parseInt(lastVisit);
      if (timeSinceLastVisit > oneDay) {
        // Return visit (more than 24 hours since last visit)
        trackEvent("return_visit", "retention", "24h+");
      }
    } else {
      // First visit
      trackEvent("session_start", "retention", "first_visit");
    }

    // Track page view
    trackEvent("page_view", "navigation", pathname);

    // Update last visit timestamp
    localStorage.setItem("lastVisit", now.toString());
  }, [pathname]);

  return null;
}



