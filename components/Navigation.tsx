"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatedButton } from "./AnimatedButton";
import { useContactModal } from "./ContactModal";
import { Menu, X } from "lucide-react";

const imgLogoDark = "/images/logo.png";

export default function Navigation() {
  const [activeHash, setActiveHash] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const scrollThreshold = 5; // Minimum scroll amount to trigger hide/show
  const { openModal } = useContactModal();

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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const linkClasses = (hash: string, isFirst = false, isLast = false, isPageActive = false) => {
    // Check if hash-based link is active (on home page with matching hash)
    const isHashActive = hash && pathname === "/" && activeHash === hash;
    // Check if page-based link is active
    const isActive = isPageActive || isHashActive;

    return `
      flex items-center justify-center px-4 py-2
      text-[16px] font-sans leading-normal
      transition whitespace-pre
      ${isActive ? "nav-active" : "text-black"}
      hover:font-semibold focus:outline-none focus:font-semibold
    `;
  };

  const mobileLinkClasses = (isPageActive = false) => {
    return `
      w-full px-6 py-4 text-left
      text-[18px] font-sans leading-[27.964px]
      transition-colors
      ${isPageActive ? "bg-[#66C2E2] text-white" : "text-black hover:bg-white/50"}
      hover:font-semibold focus:outline-none focus:font-semibold
    `;
  };

  return (
    <>

      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-[50px] bg-white/75 border-b border-white/20 transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="py-1">
          <div className="relative max-w-[1681px] mx-auto px-4 sm:px-6 lg:px-6 xl:px-[70px] flex items-center justify-between h-[60px] md:h-[68px]">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 gap-2" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="h-[40px] md:h-[46px] relative">
                <img
                  src={imgLogoDark}
                  alt="Innovin Labs Logo"
                  className="h-full object-contain"
                />
              </div>
            </Link>

            {/* Desktop Nav links */}
            <div className="hidden xl:flex xl:items-center gap-x-10 absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
              <Link
                href="/services"
                className={linkClasses("", true, false, pathname === "/services")}
              >
                <span className="nav-link-text" data-text="Services">Services</span>
              </Link>

              <Link
                href="/why-us"
                className={linkClasses("", false, false, pathname === "/why-us")}
              >
                <span className="nav-link-text" data-text="Why us">Why us</span>
              </Link>

              <Link
                href="/about"
                className={linkClasses("", false, false, pathname === "/about")}
              >
                <span className="nav-link-text" data-text="About us">About us</span>
              </Link>

              <Link
                href="/blog"
                className={linkClasses("", false, false, pathname === "/blog")}
              >
                <span className="nav-link-text" data-text="Knowledge hub">Knowledge hub</span>
              </Link>

              <Link
                href="/careers"
                className={linkClasses("", false, true, pathname === "/careers")}
              >
                <span className="nav-link-text" data-text="Careers">Careers</span>
              </Link>
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden xl:flex xl:items-center shrink-0">
              <AnimatedButton onClick={openModal} className="scale-110">
                Get in touch
              </AnimatedButton>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden flex items-center justify-center w-10 h-10 text-black focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-lg transition-transform"
              aria-label="Toggle menu"
            >
              <Menu className={`w-6 h-6 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0 absolute" : "opacity-100"}`} />
              <X className={`w-6 h-6 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 absolute"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-lg transition-opacity duration-300 xl:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className="h-full w-full flex flex-col pt-24 pb-8 overflow-y-auto overscroll-none"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => {
            // Prevent body scroll when touching menu
            e.stopPropagation();
          }}
          onTouchMove={(e) => {
            // Allow scrolling within menu, but prevent body scroll
            e.stopPropagation();
          }}
        >
          <div className="flex flex-col items-stretch w-full px-4 sm:px-6 md:px-10 space-y-2">
            <Link
              href="/services"
              className={mobileLinkClasses(pathname === "/services")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-link-text" data-text="Services">Services</span>
            </Link>

            <Link
              href="/why-us"
              className={mobileLinkClasses(pathname === "/why-us")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-link-text" data-text="Why us">Why us</span>
            </Link>

            <Link
              href="/about"
              className={mobileLinkClasses(pathname === "/about")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-link-text" data-text="About us">About us</span>
            </Link>

            <Link
              href="/blog"
              className={mobileLinkClasses(pathname === "/blog")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-link-text" data-text="Knowledge hub">Knowledge hub</span>
            </Link>

            <Link
              href="/careers"
              className={mobileLinkClasses(pathname === "/careers")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-link-text" data-text="Careers">Careers</span>
            </Link>

            <div className="pt-4 px-6">
              <AnimatedButton onClick={() => { openModal(); setIsMobileMenuOpen(false); }} className="w-full">
                Get in touch
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}