"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const img1 =
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop";
const img2 =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop";
const img3 =
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleOurRef = useRef<HTMLDivElement>(null);
  const titleServicesRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const services = [
    {
      title: "Smart Product Development",
      description:
        "We're not just software consultants – we're your Trusted Tech Innovation Partner and efficiency architects.",
      image: img1,
    },
    {
      title: "Strategic Technology Consulting",
      description:
        "We're not just software consultants – we're your Trusted Tech Innovation Partner and efficiency architects.",
      image: img2,
    },
    {
      title: "Strategic AI Consulting",
      description:
        "We empower you with intelligent solutions, leveraging AI tools to solve specific business problems and achieve strategic goals.",
      image: img3,
    },
  ];

  // Helper to split text into spans for staggered animation
  function splitText(element: HTMLElement | null) {
    if (!element) return [];
    const text = element.innerText;
    element.innerHTML = text
      .split("")
      .map((l) => `<span class='letter inline-block'>${l}</span>`)
      .join("");
    return element.querySelectorAll(".letter");
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Kill existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars?.trigger === section || trigger.trigger === section) {
        trigger.kill();
      }
    });

    const ctx = gsap.context(() => {
      const ourH2 = titleOurRef.current?.querySelector("h2") as HTMLElement;
      const servicesH2 = titleServicesRef.current?.querySelector("h2") as HTMLElement;
      const subtitle = subtitleRef.current;
      const cards = cardsRef.current.filter(Boolean);

      if (!ourH2 || !servicesH2 || !subtitle || cards.length < 3) return;

      const ourLetters = splitText(ourH2);
      const servicesLetters = splitText(servicesH2);

      // Initial states
      gsap.set([...ourLetters, ...servicesLetters], { y: 80, opacity: 0 });
      gsap.set(subtitle, { opacity: 0 });
      gsap.set(cards.slice(1), { y: "20vh", opacity: 0, scale: 0.9 });
      gsap.set(cards[0], { y: "-50%", opacity: 1, scale: 1 });

      // Preload timeline
      const preloadTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom-=500",
          end: "top bottom",
          scrub: false,
          once: true,
        },
      });

      preloadTl.to(ourLetters, { y: 0, opacity: 1, stagger: 0.05, duration: 1.2, ease: "power3.out" }, 0);
      preloadTl.to(servicesLetters, { y: 0, opacity: 1, stagger: 0.05, duration: 1.2, ease: "power3.out" }, 0.2);
      preloadTl.to(subtitle, { opacity: 1, duration: 0.8, ease: "power2.out" }, 0.8);

      // Pinned timeline
      const numTransitions = cards.length - 1;
      const scrollDistance = window.innerHeight * numTransitions;

      const pinnedTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}`,
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // Card 2 enters
      pinnedTl.to(cards[0], { scale: 0.9, duration: 0.5, ease: "power2.inOut" }, 0);
      pinnedTl.to(cards[1], { y: "-50%", scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }, 0);

      // Card 3 enters
      pinnedTl.to(cards[1], { scale: 0.9, duration: 0.5, ease: "power2.inOut" }, 0.5);
      pinnedTl.to(cards[2], { y: "-50%", scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }, 0.5);
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-black relative h-screen overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute left-[-400px] top-[100px] w-[800px] h-[400px] opacity-40 mix-blend-screen pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/30 via-blue-400/20 to-transparent blur-3xl" />
      </div>
      <div className="absolute left-[-400px] top-[100px] w-[800px] h-[400px] opacity-30 mix-blend-screen pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-cyan-400/10 to-transparent blur-3xl" />
      </div>
      {/* Titles and Button */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-40 pl-20 space-y-1">
        <div ref={titleOurRef} className="overflow-hidden">
          <h2 className="text-[82px] text-white font-medium leading-[90px] tracking-[-1.2px] inline-block">
            our
          </h2>
        </div>

        <div ref={titleServicesRef} className="overflow-hidden">
          <h2 className="text-[82px] text-white font-medium leading-[90px] tracking-[-1.2px] inline-block">
            services
          </h2>
        </div>

        <p
          ref={subtitleRef}
          className="text-[21px] text-neutral-500 leading-[30px] tracking-[0.325px] w-[272px] mt-3 mb-6"
        >
          Explore the range of services offered by our tech and consulting company.
        </p>
        
        {/* Animated Button */}
        <div className="mt-4">
          <a 
            href="/services"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden px-6 py-2.5 rounded-full border border-white/50 bg-gradient-to-l from-blue-600 to-cyan-500 text-white text-sm font-semibold transition-all duration-300 hover:bg-white hover:text-[#005C89] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            {/* Gradient overlay on hover */}
            <span 
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-full" 
              style={{ background: 'linear-gradient(135deg, rgba(0,92,137,0.5), rgba(0,92,137,0.8))' }}
            />
            
            {/* Button content */}
            <span className="relative z-10 inline-flex items-center justify-center gap-2 overflow-hidden">
              {/* Left arrow - initially hidden */}
              <svg 
                className="absolute left-0 w-4 h-4 opacity-0 -translate-x-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10M7 7l10 10"/>
              </svg>
              
              {/* Text - shifts right on hover */}
              <span className="transition-all duration-300 group-hover:translate-x-2">
                Learn More
              </span>
              
              {/* Right arrow - visible initially, slides out on hover */}
              <svg 
                className="w-4 h-4 opacity-100 translate-x-0 transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-full" 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10M7 7l10 10"/>
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* Cards */}
      <div className="absolute left-[60%] top-1/2 -translate-x-1/2 w-[1100px] h-[700px]">
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="absolute left-1/2 -translate-x-1/2 w-full h-full rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
              zIndex: 30 + index,
            }}
          >
            {/* Card image */}
            <div className="absolute inset-0">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            </div>

            {/* Card content */}
            <div className="relative h-full flex flex-col justify-end p-12">
              <h3 className="text-4xl text-white font-semibold mb-6 leading-tight">
                {service.title}
              </h3>
              <p className="text-xl text-neutral-300 leading-relaxed max-w-[600px]">
                {service.description}
              </p>
            </div>

            {/* Card number */}
            <div className="absolute top-10 right-10 text-8xl font-bold text-white/10">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}