"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ServiceCard from "./ServiceCard";

gsap.registerPlugin(ScrollTrigger);

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const text = "why us";
  const letters = text.split("");

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const content = contentRef.current;

    if (!section || !title || !content) return;

    // Set initial states - ensure title is centered
    gsap.set(title, { 
      scale: 1, 
      y: 0, 
      x: 0,
      left: "50%",
      marginLeft: 0,
      transformOrigin: "center center",
    });
    // Apply translateX(-50%) via CSS to center it initially
    title.style.left = "50%";
    title.style.transform = "translateX(-50%)";
    gsap.set(content, { opacity: 0, y: 30 });
    
    // Set all letters to gray initially
    letterRefs.current.forEach((letterEl) => {
      if (letterEl) {
        gsap.set(letterEl, { color: "#c8c8c8" });
      }
    });

    // Calculate scroll distance - enough for smooth animations
    // Measure content to ensure cards are fully visible before unpin
    const measureContent = () => {
      const contentRect = content.getBoundingClientRect();
      const vh = window.innerHeight;
      // Need enough scroll to show content fully + buffer
      return Math.max(1000, contentRect.height - vh + 300);
    };

    const scrollDistance = measureContent();

    // Create ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${scrollDistance}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Phase 1: Typing animation (0-25% of scroll)
        // Letters turn from gray to black one by one when title reaches center
        if (progress <= 0.25) {
          const typingProgress = progress / 0.25; // 0 to 1
          
          letters.forEach((_, index) => {
            const letterEl = letterRefs.current[index];
            if (!letterEl) return;

            const letterThreshold = (index + 1) / letters.length;
            const isRevealed = typingProgress >= letterThreshold;
            letterEl.style.color = isRevealed ? "#232323" : "#c8c8c8";
          });
        } else {
          // Ensure all letters are black after typing
          letterRefs.current.forEach((letterEl) => {
            if (letterEl) letterEl.style.color = "#232323";
          });
        }

        // Phase 2: BEFORE → AFTER transition (25%-95% of scroll)
        if (progress >= 0.25) {
          const transitionProgress = Math.min(1, (progress - 0.25) / 0.7);

          const capped = Math.min(transitionProgress, 0.85);

          const scale = 1 - capped * 0.77;
          
          // Calculate final title height when scaled
          const finalTitleHeight = 64; // Approximate scaled height in pixels
          const targetTopPosition = 60; // Fixed top position for title in final state
          
          // Move title from center to top
          const startY = 0; // Center of screen
          const endY = -window.innerHeight / 2 + targetTopPosition + finalTitleHeight / 2;
          const titleY = startY + (endY - startY) * capped;

          
          // Keep centered: left: 50% + translateX(-50%) + scale + translateY
          // GSAP will combine transforms properly
          gsap.set(title, {
            scale,
            y: titleY,
            x: "-50%", // TranslateX(-50%) to keep centered
            transformOrigin: "center center",
            left: "50%",
          });

          // Content: Fade in and slide up
          // Start fading at 35% of transition, fully visible by 70%
          if (transitionProgress >= 0.35) {
            const contentProgress = (transitionProgress - 0.35) / 0.35; // 0 to 1
            const opacity = Math.min(1, contentProgress);
            const contentY = 30 - 30 * contentProgress;
            
            gsap.set(content, {
              opacity,
              y: contentY,
            });
          } else {
            gsap.set(content, { opacity: 0, y: 30 });
          }
        } else {
          // Before transition - reset to BEFORE state
          gsap.set(title, { 
            scale: 1, 
            y: 0, 
            x: "-50%", // Keep centered
            left: "50%",
            transformOrigin: "center center",
          });
          gsap.set(content, { opacity: 0, y: 30 });
        }
      },
    });

    // Handle resize
    const handleResize = () => {
      const newScrollDistance = measureContent();
      scrollTrigger.vars.end = `+=${newScrollDistance}`;
      scrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      scrollTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative bg-white overflow-hidden"
    >
      {/* Pinned container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden pt-[100px]">
        <div className="max-w-[1568px] mx-auto px-8 w-full relative h-full">
          
          {/* BEFORE State: Large centered title */}
          <div 
            ref={titleRef} 
            className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20"
            style={{ width: "100%" }}
          >
            <h2 className="text-[120px] md:text-[180px] lg:text-[279.273px] leading-[1.25] text-center font-['Manrope',sans-serif] mx-auto">
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

          {/* AFTER State: Description + Cards */}
          <div
            ref={contentRef}
            className="absolute inset-0 flex flex-col items-center justify-start px-8 z-10 mt-[120px]"
            style={{ opacity: 0, y: 30, paddingTop: '160px' }}
          >
            {/* Description - centered, positioned right below where title will be */}
            <div className="mb-16 max-w-[837px] text-center">
              <p className="text-[18px] md:text-[20px] text-[#232323] leading-[30px]">
                You're building something that matters and you need a tech team
                that gets it. We work with startups and small businesses to turn
                raw ideas into powerful digital products. From branding to
                backends, we've got you covered.
              </p>
            </div>

            {/* Service Cards - centered, symmetrical rotations */}
            <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left card - anticlockwise rotation */}
              <ServiceCard
                title="Product Strategy"
                subtitle="Craft clarity before code."
                description="We help you map the journey from understanding your users to defining features that matter. Strategy isn't a phase; it's the foundation."
                className="relative md:rotate-[-5deg]"
              />
              {/* Center card - straight, no rotation */}
              <ServiceCard
                title="Design & Experience"
                subtitle="Interfaces that feel as good as they look."
                description="We blend form and function to design experiences that are intuitive, beautiful, and built for engagement."
                className="relative"
              />
              {/* Right card - clockwise rotation (symmetrical to left) */}
              <ServiceCard
                title="Engineering"
                subtitle="Fast. Scalable. Bulletproof."
                description="Our dev team builds clean, maintainable code that scales with you whether you're launching an MVP or iterating at speed."
                className="relative md:rotate-[5deg]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}