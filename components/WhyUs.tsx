"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// ServiceCard component
function ServiceCard({
  title,
  subtitle,
  description,
  className = "",
  isMobile = false,
  isVisible = false,
  delay = 0
}: {
  title: string;
  subtitle: string;
  description: string;
  className?: string;
  isMobile?: boolean;
  isVisible?: boolean;
  delay?: number;
}) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow ${className}`}
      style={isMobile ? {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        transitionDelay: `${delay}ms`
      } : {}}
    >
      <h3 className="text-xl sm:text-2xl font-bold text-[#232323] mb-2">{title}</h3>
      <p className="text-base sm:text-lg font-semibold text-blue-600 mb-3 sm:mb-4">{subtitle}</p>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [gsapReady, setGsapReady] = useState(false);

  const text = "why us";
  const letters = text.split("");

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if desktop on mount and window resize
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Intersection Observer for mobile fade-in
  useEffect(() => {
    if (isDesktop || !isMounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isDesktop, isMounted, isVisible]);

  // GSAP animations only for desktop
  useLayoutEffect(() => {
    if (!isDesktop || typeof window === 'undefined') return;

    // Store cleanup function so we can call it on unmount
    let cleanupFn: (() => void) | null = null;
    let isComponentMounted = true;

    const loadGSAP = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      // Check if component is still mounted after async imports
      if (!isComponentMounted) return;

      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const title = titleRef.current;
      const content = contentRef.current;

      if (!section || !title || !content) return;

      // Kill ALL existing ScrollTriggers for this section first
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars?.trigger === section || trigger.trigger === section) {
          trigger.kill();
        }
      });

      // Clear any stale GSAP inline styles from previous navigation
      gsap.set([title, content], { clearProps: "all" });
      letterRefs.current.forEach((el) => {
        if (el) gsap.set(el, { clearProps: "all" });
      });

      let rafId: number;
      let resizeTimeout: NodeJS.Timeout;
      let initTimeout: NodeJS.Timeout;
      let handleResize: (() => void) | null = null;
      let handleImageLoad: (() => void) | null = null;

      // Set initial states IMMEDIATELY (before RAF) to prevent flash
      gsap.set(content, {
        opacity: 0,
        y: 50,
        force3D: true
      });

      gsap.set(title, {
        scale: 1,
        y: 0,
        force3D: true,
        transformOrigin: "center center"
      });

      letterRefs.current.forEach((letterEl) => {
        if (letterEl) {
          gsap.set(letterEl, {
            color: "#c8c8c8",
            force3D: true
          });
        }
      });

      const ctx = gsap.context(() => {
        rafId = requestAnimationFrame(() => {
          // Force a reflow to ensure measurements are accurate
          void section.offsetHeight;

          const vh = window.innerHeight;
          const scrollDistance = vh * 1.8;
          const titleScale = 0.23;
          const titleYPosition = -vh * 0.25;

          // Create main timeline
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: `+=${scrollDistance}`,
              scrub: 1,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              refreshPriority: -1,
              markers: false,
              onRefresh: (self: { update: () => void }) => {
                // When ScrollTrigger refreshes, update to correct position
                // This prevents blank screen if user scrolled before GSAP initialized
                self.update();
              }
            } as any
          });

          // Phase 1: Letter color fade
          letterRefs.current.forEach((letterEl, index) => {
            if (!letterEl) return;

            tl.to(letterEl, {
              color: "#232323",
              duration: 0.15 / letters.length,
              ease: "none",
              force3D: true
            }, index * (0.15 / letters.length));
          });

          // Phase 2: Scale and position title
          tl.to(title, {
            scale: titleScale,
            y: titleYPosition,
            duration: 0.25,
            ease: "power2.inOut",
            force3D: true,
            transformOrigin: "center center"
          }, 0.15);

          // Phase 3: Fade in content
          tl.to(content, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            force3D: true
          }, 0.3);

          // Force immediate update to reflect current scroll position
          // This is critical to prevent blank screen when user has already scrolled
          ScrollTrigger.refresh();

          // Mark GSAP as ready - content visibility is now controlled by GSAP
          setGsapReady(true);

          // Handle resize with debounce
          handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
              ScrollTrigger.refresh();
            }, 250);
          };

          handleImageLoad = () => {
            ScrollTrigger.refresh();
          };

          window.addEventListener("resize", handleResize);
          window.addEventListener("load", handleImageLoad);

          // Additional refresh after a short delay for layout stability
          initTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
          }, 150);
        });
      }, section);

      let pathnameRefreshTimeout: NodeJS.Timeout;
      if (pathname === "/") {
        pathnameRefreshTimeout = setTimeout(() => {
          ScrollTrigger.refresh();
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        }, 200);
      }

      // Store the cleanup function
      cleanupFn = () => {
        if (rafId) cancelAnimationFrame(rafId);
        if (resizeTimeout) clearTimeout(resizeTimeout);
        if (initTimeout) clearTimeout(initTimeout);
        if (handleResize) window.removeEventListener("resize", handleResize);
        if (handleImageLoad) window.removeEventListener("load", handleImageLoad);
        if (pathnameRefreshTimeout) clearTimeout(pathnameRefreshTimeout);

        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars?.trigger === section || trigger.trigger === section) {
            trigger.kill();
          }
        });
        ctx.revert();
        setGsapReady(false);
      };
    };

    loadGSAP();

    // Return cleanup function that will be called on unmount/dependency change
    return () => {
      isComponentMounted = false;
      if (cleanupFn) {
        cleanupFn();
      }
    };
  }, [pathname, isDesktop]);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className={`relative bg-white overflow-hidden ${isDesktop ? 'min-h-screen' : 'py-12 sm:py-16'}`}
    >
      <div className={isDesktop ? "h-screen w-full relative" : "w-full relative"}>
        {/* Animated Background Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] max-w-[1200px] pointer-events-none -z-0">
          <div className="absolute inset-0 bg-[#66c2e2]/10 blur-[120px] rounded-full animate-pulse-slow" />
        </div>
        {/* Title */}
        <div className={`${isDesktop
          ? 'absolute inset-0 flex items-center justify-center pointer-events-none z-30'
          : 'flex items-center justify-center mb-8 sm:mb-12'
          }`}>
          <h2
            ref={titleRef}
            className={`text-[60px] sm:text-[80px] md:text-[120px] lg:text-[279.273px] leading-[1.25] text-center font-['Manrope',sans-serif] px-4`}
            style={!isDesktop ? {
              color: '#232323',
              opacity: isMounted && isVisible ? 1 : 0,
              transition: 'opacity 0.8s ease-out 0.1s'
            } : { willChange: 'transform' }}
          >
            {letters.map((letter, i) => (
              <span
                key={i}
                ref={(el) => {
                  letterRefs.current[i] = el;
                }}
                className={`inline-block ${i <= 2 ? "font-normal" : "font-semibold"}`}
                style={isDesktop ? { color: "#c8c8c8", willChange: 'color, transform' } : {}}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h2>
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className={`${isDesktop
            ? 'absolute inset-0 flex flex-col justify-start lg:justify-center items-center pt-[160px] sm:pt-[180px] lg:pt-[180px] px-4 sm:px-6 md:px-8 xl:px-[70px] z-10 overflow-y-auto'
            : 'flex flex-col items-center px-4 sm:px-6'
            }`}
          style={!isDesktop ? {
            opacity: isMounted && isVisible ? 1 : 0,
            transform: isMounted && isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s'
          } : {
            // Only hide content once GSAP is ready to control it
            // Before GSAP loads, content stays visible to prevent blank screen
            willChange: 'transform, opacity'
          }}
        >
          {/* Description */}
          <div className="mb-6 sm:mb-8 lg:mb-16 max-w-[95%] sm:max-w-[600px] lg:max-w-[837px] text-center">
            <p className="text-[13px] sm:text-[15px] md:text-[17px] lg:text-[20px] text-[#232323] leading-[1.5] sm:leading-[1.6] lg:leading-[30px]">
              You're building something that matters and you need a tech team
              that gets it. We work with startups and small businesses to turn
              raw ideas into powerful digital products. From branding to
              backends, we've got you covered.
            </p>
          </div>

          {/* Service Cards */}
          <div className="max-w-[1681px] w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pb-8 sm:pb-12 lg:pb-20">
            <ServiceCard
              title="Product Strategy"
              subtitle="Craft clarity before code."
              description="We help you map the journey from understanding your users to defining features that matter. Strategy isn't a phase; it's the foundation."
              className={isDesktop ? "relative md:rotate-[-5deg]" : "relative"}
              isMobile={!isDesktop}
              isVisible={isVisible && isMounted}
              delay={500}
            />
            <ServiceCard
              title="Design & Experience"
              subtitle="Interfaces that feel as good as they look."
              description="We blend form and function to design experiences that are intuitive, beautiful, and built for engagement."
              className="relative"
              isMobile={!isDesktop}
              isVisible={isVisible && isMounted}
              delay={650}
            />
            <ServiceCard
              title="Engineering"
              subtitle="Fast. Scalable. Bulletproof."
              description="Our dev team builds clean, maintainable code that scales with you whether you're launching an MVP or iterating at speed."
              className={isDesktop ? "relative md:rotate-[5deg]" : "relative"}
              isMobile={!isDesktop}
              isVisible={isVisible && isMounted}
              delay={800}
            />
          </div>
        </div>
      </div>
    </section >
  );
}