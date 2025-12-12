"use client";

import { useRef, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ServiceCard component
function ServiceCard({ 
  title, 
  subtitle, 
  description, 
  className = "" 
}: { 
  title: string; 
  subtitle: string; 
  description: string; 
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow ${className}`}>
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

  const text = "why us";
  const letters = text.split("");

  useLayoutEffect(() => {
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

    // Reset all GSAP properties to initial state
    gsap.set([title, content, ...letterRefs.current.filter(Boolean)], { 
      clearProps: "all" 
    });

    let rafId: number;
    let resizeTimeout: NodeJS.Timeout;
    let initTimeout: NodeJS.Timeout;
    let handleResize: (() => void) | null = null;
    let handleImageLoad: (() => void) | null = null;
    
    const ctx = gsap.context(() => {
      rafId = requestAnimationFrame(() => {
        void section.offsetHeight;
      
        // Detect if mobile/tablet
        const isMobile = window.innerWidth < 1024;
        
        // Set initial states
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

        // Calculate scroll distance
        const vh = window.innerHeight;
        const scrollDistance = isMobile ? vh * 1.2 : vh * 1.5;

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
            onEnter: () => {
              gsap.set([title, content, ...letterRefs.current.filter(Boolean)], {
                clearProps: "all"
              });
              gsap.set(content, { opacity: 0, y: 50, force3D: true });
              gsap.set(title, { scale: 1, y: 0, force3D: true });
              letterRefs.current.forEach((el) => {
                if (el) gsap.set(el, { color: "#c8c8c8", force3D: true });
              });
            },
          }
        });

        // Phase 1: Letter color fade (0-25% of timeline)
        letterRefs.current.forEach((letterEl, index) => {
          if (!letterEl) return;
          
          tl.to(letterEl, {
            color: "#232323",
            duration: 0.25 / letters.length,
            ease: "none",
            force3D: true
          }, index * (0.25 / letters.length));
        });

        // Phase 2: Scale and position title (25%-50% of timeline)
        tl.to(title, {
          scale: isMobile ? 0.28 : 0.23,
          y: () => {
            const vh = window.innerHeight;
            // Mobile: Move title to top with navbar clearance (around 100-120px from top)
            // Desktop: Keep original behavior
            return isMobile ? -vh * 0.38 : -vh * 0.25;
          },
          duration: 0.25,
          ease: "power2.inOut",
          force3D: true,
          transformOrigin: "center center"
        }, 0.25);

        // Phase 3: Fade in content (40%-70% of timeline)
        tl.to(content, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          force3D: true
        }, 0.4);

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
        
        initTimeout = setTimeout(() => {
          ScrollTrigger.refresh();
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 300);
        }, 100);
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

    // Cleanup
    return () => {
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
    };
  }, [pathname]);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative bg-white overflow-hidden min-h-screen"
    >
      <div className="h-screen w-full relative">
        {/* Title - starts centered, scales down and moves up */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <h2 
            ref={titleRef}
            className="text-[80px] sm:text-[120px] md:text-[180px] lg:text-[279.273px] leading-[1.25] text-center font-['Manrope',sans-serif] px-4"
            style={{ willChange: 'transform' }}
          >
            {letters.map((letter, i) => (
              <span
                key={i}
                ref={(el) => {
                  letterRefs.current[i] = el;
                }}
                className={`inline-block ${i <= 2 ? "font-normal" : "font-semibold"}`}
                style={{ color: "#c8c8c8", willChange: 'color, transform' }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h2>
        </div>

        {/* Content - appears after title scales */}
        <div
          ref={contentRef}
          className="absolute inset-0 flex flex-col justify-start lg:justify-center items-center pt-[160px] sm:pt-[180px] lg:pt-[180px] px-4 sm:px-6 lg:px-8 z-10 overflow-y-auto"
          style={{ willChange: 'transform, opacity' }}
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
          <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pb-8 sm:pb-12 lg:pb-20">
            <ServiceCard
              title="Product Strategy"
              subtitle="Craft clarity before code."
              description="We help you map the journey from understanding your users to defining features that matter. Strategy isn't a phase; it's the foundation."
              className="relative md:rotate-[-5deg]"
            />
            <ServiceCard
              title="Design & Experience"
              subtitle="Interfaces that feel as good as they look."
              description="We blend form and function to design experiences that are intuitive, beautiful, and built for engagement."
              className="relative"
            />
            <ServiceCard
              title="Engineering"
              subtitle="Fast. Scalable. Bulletproof."
              description="Our dev team builds clean, maintainable code that scales with you whether you're launching an MVP or iterating at speed."
              className="relative md:rotate-[5deg]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}