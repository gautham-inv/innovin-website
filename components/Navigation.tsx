"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatedButton } from "./AnimatedButton";

const imgLogoDark = "/images/logo.png";

export default function Navigation() {
  const [activeHash, setActiveHash] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const scrollThreshold = 5; // Minimum scroll amount to trigger hide/show

  useEffect(() => {
    const updateActive = () => {
      setActiveHash(window.location.hash);
    };

    updateActive();
    window.addEventListener("hashchange", updateActive);
    // Also check hash on pathname change (for programmatic navigation)
    updateActive();
    
    return () => window.removeEventListener("hashchange", updateActive);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);

      // Only trigger if scroll difference is at least the threshold
      if (scrollDifference >= scrollThreshold) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          // Scrolling down - hide navbar
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          // Scrolling up - show navbar
          setIsVisible(true);
        }
        lastScrollY.current = currentScrollY;
      }

      // Always show navbar at the top of the page
      if (currentScrollY < 50) {
        setIsVisible(true);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  const linkClasses = (hash: string, isFirst = false, isLast = false, isPageActive = false) => {
    // Check if hash-based link is active (on home page with matching hash)
    const isHashActive = hash && pathname === "/" && activeHash === hash;
    // Check if page-based link is active
    const isActive = isPageActive || isHashActive;
    
    return `
      border-[1.195px] border-solid border-white 
      flex items-center justify-center px-[16.95px] py-[12.95px] 
      text-[16px] font-['Manrope',sans-serif] leading-[27.964px]
      hover:bg-white/50 transition whitespace-pre
      ${isFirst ? "rounded-l-[23.893px]" : ""}
      ${isLast ? "rounded-r-[23.893px]" : ""}
      ${isActive ? "nav-active" : "text-black"}
      focus:outline-none focus:ring-2 focus:ring-primary/40
    `;
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-[100px] bg-white/80 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="py-4">
      <div className="max-w-[1681px] mx-auto px-1 flex items-center justify-between h-[70px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-[40px] relative">
            <img 
              src={imgLogoDark}
              alt="Innovin Labs Logo"
              className="h-full object-contain"
            />
          </div>
        </Link>

        {/* Nav links */}
        <div className="hidden lg:flex bg-[rgba(215,237,248,0.8)] rounded-[26.282px] items-center absolute left-1/2 -translate-x-1/2">

          <Link 
            href="/" 
            className={linkClasses("", true, false, pathname === "/")}
          >
            Services
          </Link>

          <Link 
            href="/why-us" 
            className={linkClasses("", false, false, pathname === "/why-us")}
          >
            Why us
          </Link>

          <Link 
            href="/about" 
            className={linkClasses("", false, false, pathname === "/about")}
          >
            About us
          </Link>

          <Link 
            href="/blog" 
            className={linkClasses("", false, false, pathname === "/blog")}
          >
            Knowledge Hub
          </Link>

          <Link 
            href="/careers" 
            className={linkClasses("", false, true, pathname === "/careers")}
          >
            Career
          </Link>

        </div>

        {/* CTA Button */}
        <AnimatedButton href="#contact">
          Get in touch
        </AnimatedButton>

      </div>
      </div>
    </nav>
  );
}
