"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const imgLogoDark = "/images/logo.png";

export default function Navigation() {
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="py-4">
      <div className="max-w-[1681px] mx-auto px-1 flex items-center justify-between h-[85px]">

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

          <a 
            href="#blog" 
            className={linkClasses("#blog", false, false, pathname === "/" && activeHash === "#blog")}
          >
            Knowledge hub
          </a>

          <Link 
            href="/careers" 
            className={linkClasses("", false, true, pathname === "/careers")}
          >
            Career
          </Link>

        </div>

        {/* CTA Button */}
        <a 
          href="#contact"
          className="
            btn-grad
            bg-gradient-to-l from-primary to-secondary 
            border-[0.585px] border-[rgba(0,92,137,0.5)] border-solid 
            rounded-[40px] px-[35.112px] py-[9.363px] 
            text-white text-[16.39px] font-semibold 
            leading-[23.408px] tracking-[0.0069px]
          "
        >
          Get in touch
        </a>

      </div>
      </div>
    </nav>
  );
}
