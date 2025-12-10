"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const img1 = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop";
const img2 = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop";
const img3 = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleOurRef = useRef<HTMLDivElement>(null);
  const titleServicesRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const pathname = usePathname(); // Track route changes

  const services = [
    { title: "Smart Product Development", description: "We're not just software consultants – we're your Trusted Tech Innovation Partner and efficiency architects.", image: img1 },
    { title: "Strategic Technology Consulting", description: "We're not just software consultants – we're your Trusted Tech Innovation Partner and efficiency architects.", image: img2 },
    { title: "Strategic AI Consulting", description: "We empower you with intelligent solutions, leveraging AI tools to solve specific business problems and achieve strategic goals.", image: img3 },
  ];

  function splitText(element: HTMLElement | null) {
    if (!element) return [];
    const text = element.innerText;
    element.innerHTML = text
      .split("")
      .map((l) => `<span class='letter inline-block'>${l}</span>`)
      .join("");
    return element.querySelectorAll(".letter");
  }

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Kill ALL existing ScrollTriggers for this section first (critical for remounting)
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars?.trigger === section || trigger.trigger === section) {
        trigger.kill();
      }
    });

    // Reset all GSAP properties to initial state (critical for remounting)
    const allElements = [
      ...cardsRef.current.filter(Boolean),
      titleOurRef.current,
      titleServicesRef.current,
      subtitleRef.current,
    ];
    gsap.set(allElements, { clearProps: "all" });

    // Store cleanup variables outside context
    let cleanupResize: (() => void) | null = null;
    let cleanupLoad: (() => void) | null = null;
    let cleanupInitTimeout: NodeJS.Timeout | null = null;

    // Use gsap.context for automatic cleanup
    const ctx = gsap.context(() => {

      // Wait for next frame to ensure all refs are populated
      requestAnimationFrame(() => {
        // Force a reflow to ensure layout is calculated
        void section.offsetHeight;

        const ourH2 = titleOurRef.current?.querySelector("h2") as HTMLElement;
        const servicesH2 = titleServicesRef.current?.querySelector("h2") as HTMLElement;
        const subtitle = subtitleRef.current;
        const cards = cardsRef.current.filter(Boolean);

        if (!ourH2 || !servicesH2 || !subtitle || cards.length < 3) return;

      const ourLetters = splitText(ourH2);
      const servicesLetters = splitText(servicesH2);

      // Initial states - use transforms and opacity only
      gsap.set([...ourLetters, ...servicesLetters], { 
        y: 80, 
        opacity: 0,
        force3D: true
      });
      gsap.set(subtitle, { 
        opacity: 0,
        force3D: true
      });
      gsap.set(cards[0], { 
        y: "-50%", 
        scale: 1, 
        opacity: 1,
        force3D: true
      });
      gsap.set(cards.slice(1), { 
        y: "20vh", 
        scale: 0.9, 
        opacity: 0,
        force3D: true
      });

      // Preload titles + subtitle + first card (before pinning)
      const preloadTl = gsap.timeline({
        scrollTrigger: { 
          trigger: section, 
          start: "top bottom-=500", 
          end: "top bottom", 
          scrub: false, 
          once: true,
          invalidateOnRefresh: true,
        },
      });

      preloadTl.to(ourLetters, { 
        y: 0, 
        opacity: 1, 
        stagger: 0.05, 
        duration: 1.2, 
        ease: "power3.out",
        force3D: true
      }, 0);
      preloadTl.to(servicesLetters, { 
        y: 0, 
        opacity: 1, 
        stagger: 0.05, 
        duration: 1.2, 
        ease: "power3.out",
        force3D: true
      }, 0.2);
      preloadTl.to(subtitle, { 
        opacity: 1, 
        duration: 0.8, 
        ease: "power2.out",
        force3D: true
      }, 0.8);

      // Pinned Section: scroll-controlled cards 2 & 3
      // Calculate exact scroll distance: 2 transitions, each taking ~1 viewport height
      const numTransitions = cards.length - 1; // 2 transitions: card 2 and card 3
      const scrollDistance = window.innerHeight * numTransitions; // Exact: 2x viewport height

      const pinnedTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}`,
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: -1, // Lower priority to avoid conflicts
          markers: false, // Set to true for debugging
        },
      });

      // Card 2 enters front (0-50% of scroll)
      pinnedTl.to(cards[0], { 
        scale: 0.85, 
        duration: 0.5, 
        ease: "power2.inOut",
        force3D: true
      }, 0);
      pinnedTl.to(cards[1], { 
        y: "-50%", 
        scale: 1, 
        opacity: 1, 
        duration: 0.5, 
        ease: "power2.out",
        force3D: true
      }, 0);

      // Card 3 enters front (50-100% of scroll)
      pinnedTl.to(cards[1], { 
        scale: 0.85, 
        duration: 0.5, 
        ease: "power2.inOut",
        force3D: true
      }, 0.5);
      pinnedTl.to(cards[2], { 
        y: "-50%", 
        scale: 1, 
        opacity: 1, 
        duration: 0.5, 
        ease: "power2.out",
        force3D: true
      }, 0.5);

      // Handle resize with debounce
      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 250);
      };

      // Handle images loading
      const handleImageLoad = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("load", handleImageLoad);
      
      // Refresh after a short delay to ensure all content is loaded
      const initTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
        // CRITICAL: Force refresh again after navigation to ensure proper calculation
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 300);
      }, 100);

      // Store cleanup functions
      cleanupResize = handleResize;
      cleanupLoad = handleImageLoad;
      cleanupInitTimeout = initTimeout;
      });
    }, section); // Scope to section element

    // CRITICAL: Refresh ScrollTrigger when on homepage (after navigation)
    let pathnameRefreshTimeout: NodeJS.Timeout;
    if (pathname === "/") {
      // Small delay to ensure DOM is ready after navigation
      pathnameRefreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
        // Force a second refresh to ensure calculations are correct
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }, 200);
    }

    // Cleanup function
    return () => {
      // Clear pathname refresh timeout
      if (pathnameRefreshTimeout) {
        clearTimeout(pathnameRefreshTimeout);
      }
      // Remove event listeners
      if (cleanupResize) {
        window.removeEventListener("resize", cleanupResize);
      }
      if (cleanupLoad) {
        window.removeEventListener("load", cleanupLoad);
      }
      if (cleanupInitTimeout) {
        clearTimeout(cleanupInitTimeout);
      }
      // Kill all ScrollTriggers for this section
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars?.trigger === section || trigger.trigger === section) {
          trigger.kill();
        }
      });
      ctx.revert(); // This automatically kills all ScrollTriggers and timelines
    };
  }, [pathname]); // Include pathname to re-run on navigation

  return (
    <section ref={sectionRef} id="services" className="bg-black relative h-screen overflow-hidden">
      {/* Titles */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-40 pointer-events-none pl-20 space-y-1">
        <div ref={titleOurRef} className="overflow-hidden">
          <h2 
            className="text-[82px] text-white font-medium leading-[90px] tracking-[-1.2px] inline-block"
            style={{ willChange: 'transform, opacity' }}
          >
            our
          </h2>
        </div>
        <div ref={titleServicesRef} className="overflow-hidden">
          <h2 
            className="text-[82px] text-white font-medium leading-[90px] tracking-[-1.2px] inline-block"
            style={{ willChange: 'transform, opacity' }}
          >
            services
          </h2>
        </div>
        <p 
          ref={subtitleRef} 
          className="text-[21px] text-neutral-500 leading-[30px] tracking-[0.325px] w-[272px] mt-3"
          style={{ willChange: 'opacity' }}
        >
          Explore the range of services offered by our tech and consulting company.
        </p>
      </div>

      {/* Cards */}
      <div className="absolute left-[60%] top-1/2 -translate-x-1/2 w-[1100px] h-[700px]">
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="absolute left-1/2 -translate-x-1/2 w-full h-full rounded-3xl overflow-hidden shadow-2xl"
            style={{ 
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", 
              zIndex: 30 + index,
              willChange: 'transform, opacity'
            }}
          >
            <div className="absolute inset-0">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            </div>
            <div className="relative h-full flex flex-col justify-end p-12">
              <h3 className="text-4xl text-white font-semibold mb-6 leading-tight">{service.title}</h3>
              <p className="text-xl text-neutral-300 leading-relaxed max-w-[600px]">{service.description}</p>
            </div>
            <div className="absolute top-10 right-10 text-8xl font-bold text-white/10">{String(index + 1).padStart(2, "0")}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
