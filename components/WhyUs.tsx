"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ServiceCard from "./ServiceCard";

gsap.registerPlugin(ScrollTrigger);

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const text = "why us";
  const letters = text.split("");

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const content = contentRef.current;

    if (!section || !title || !content) return;

    // Ensure ScrollTrigger is ready
    ScrollTrigger.refresh();

    // Set initial states
    gsap.set(title, { 
      clearProps: "all"
    });
    
    gsap.set(content, { 
      opacity: 0, 
      y: 50 
    });
    
    // Set all letters to gray initially
    letterRefs.current.forEach((letterEl) => {
      if (letterEl) {
        gsap.set(letterEl, { color: "#c8c8c8" });
      }
    });

    // Wait for next frame to ensure layout is stable
    requestAnimationFrame(() => {
      const measureContent = () => {
        const vh = window.innerHeight;
        return Math.max(1500, vh * 2);
      };

      const scrollDistance = measureContent();

      // Create main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Phase 1: Letter color fade (0-25%)
      letterRefs.current.forEach((letterEl, index) => {
        if (!letterEl) return;
        
        tl.to(letterEl, {
          color: "#232323",
          duration: 0.25 / letters.length,
          ease: "none"
        }, index * (0.25 / letters.length));
      });

      // Phase 2: Scale and position title (25%-50%)
      tl.to(title, {
        scale: 0.23,
        y: () => {
          const vh = window.innerHeight;
          return -vh * 0.35;
        },
        duration: 0.25,
        ease: "power2.inOut"
      }, 0.25);

      // Phase 3: Fade in content (40%-70%)
      tl.to(content, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      }, 0.4);

      // Handle resize
      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 200);
      };

      window.addEventListener("resize", handleResize);

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(resizeTimeout);
        tl.kill();
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    });

    return () => {};
  }, [letters.length]);

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
            className="text-[120px] md:text-[180px] lg:text-[279.273px] leading-[1.25] text-center font-['Manrope',sans-serif] will-change-transform"
          >
            {letters.map((letter, i) => (
              <span
                key={i}
                ref={(el) => {
                  letterRefs.current[i] = el;
                }}
                className={`inline-block ${i <= 2 ? "font-normal" : "font-semibold"}`}
                style={{ color: "#c8c8c8" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h2>
        </div>

        {/* Content - appears after title scales */}
        <div
          ref={contentRef}
          className="absolute inset-0 flex flex-col items-center pt-[180px] px-8 z-10 overflow-y-auto"
        >
          {/* Description */}
          <div className="mb-16 max-w-[837px] text-center">
            <p className="text-[18px] md:text-[20px] text-[#232323] leading-[30px]">
              You're building something that matters and you need a tech team
              that gets it. We work with startups and small businesses to turn
              raw ideas into powerful digital products. From branding to
              backends, we've got you covered.
            </p>
          </div>

          {/* Service Cards */}
          <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
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