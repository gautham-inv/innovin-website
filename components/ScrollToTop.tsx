"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();
  const isPopNavigation = useRef(false);
  const scrollPositions = useRef<Record<string, number>>({});
  const prevPathname = useRef("");

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const onPopState = () => {
      isPopNavigation.current = true;
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    if (prevPathname.current) {
      scrollPositions.current[prevPathname.current] = window.scrollY;
    }
    prevPathname.current = pathname;

    if (window.location.hash) return;

    if (isPopNavigation.current) {
      isPopNavigation.current = false;
      const saved = scrollPositions.current[pathname];
      if (saved !== undefined) {
        // Instant restore — bypass CSS scroll-behavior: smooth, no visible jump
        window.scrollTo({ top: saved, behavior: "instant" });
      }
      return;
    }

    // Push navigation — go to top instantly
    window.scrollTo({ top: 0, behavior: "instant" });

    // Fallback for async content that may shift the page after hydration
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
      });
    });
  }, [pathname]);

  return null;
}
