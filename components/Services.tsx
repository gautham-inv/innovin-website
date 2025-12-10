"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

// Animated Button Component
interface AnimatedButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

function AnimatedButton({ href, onClick, children, className = "" }: AnimatedButtonProps) {
  const buttonContent = (
    <span className="relative inline-flex items-center justify-center gap-2 overflow-hidden">
      <ArrowUpRight 
        className="absolute left-0 w-4 h-4 opacity-0 -translate-x-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" 
      />
      <span className="transition-all duration-300 group-hover:translate-x-5">
        {children}
      </span>
      <ArrowUpRight 
        className="w-4 h-4 opacity-100 translate-x-0 transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-full" 
      />
    </span>
  );

  const buttonClasses = `
    group relative
    px-6 py-2.5
    rounded-full
    border border-[#005C89]/50
    bg-gradient-to-l from-[#005C89] to-[#0088CC]
    text-white text-sm font-semibold
    overflow-hidden
    transition-all duration-300
    hover:bg-none hover:bg-white hover:text-[#005C89]
    hover:shadow-lg
    focus:outline-none focus:ring-2 focus:ring-[#005C89]/40
    ${className}
  `;

  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-full" 
          style={{ background: 'linear-gradient(135deg, rgba(0,92,137,0.5), rgba(0,92,137,0.8))' }}
        />
        <span className="relative z-10">
          {buttonContent}
        </span>
      </a>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-full" 
        style={{ background: 'linear-gradient(135deg, rgba(0,92,137,0.5), rgba(0,92,137,0.8))' }}
      />
      <span className="relative z-10">
        {buttonContent}
      </span>
    </button>
  );
}

const img1 = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop";
const img2 = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop";
const img3 = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const cardOverlaysRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleOurRef = useRef<HTMLDivElement>(null);
  const titleServicesRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const services = [
    { title: "Smart Product Development", description: "We're not just software consultants – we're your Trusted Tech Innovation Partner and efficiency architects.", image: img1 },
    { title: "Strategic Technology Consulting", description: "We're not just software consultants – we're your Trusted Tech Innovation Partner and efficiency architects.", image: img2 },
    { title: "Strategic AI Consulting", description: "We empower you with intelligent solutions, leveraging AI tools to solve specific business problems and achieve strategic goals.", image: img3 },
  ];

  function splitText(element: HTMLElement | null): NodeListOf<HTMLElement> | [] {
    if (!element) return [] as unknown as NodeListOf<HTMLElement>;
    const text = element.innerText;
    element.innerHTML = text
      .split("")
      .map((l: string) => `<span class='letter inline-block'>${l}</span>`)
      .join("");
    return element.querySelectorAll(".letter");
  }

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === 'undefined') return;

    // Dynamically import GSAP to avoid SSR issues
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Kill existing ScrollTriggers
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars?.trigger === section || trigger.trigger === section) {
            trigger.kill();
          }
        });

        // Reset properties
        const allElements = [
          ...cardsRef.current.filter(Boolean),
          ...cardImagesRef.current.filter(Boolean),
          ...cardOverlaysRef.current.filter(Boolean),
          titleOurRef.current,
          titleServicesRef.current,
          subtitleRef.current,
          buttonRef.current,
        ];
        gsap.set(allElements, { clearProps: "all" });

        const ctx = gsap.context(() => {
          requestAnimationFrame(() => {
            if (section) {
              void section.offsetHeight;
            }

            const ourH2 = titleOurRef.current?.querySelector("h2");
            const servicesH2 = titleServicesRef.current?.querySelector("h2");
            const subtitle = subtitleRef.current;
            const button = buttonRef.current;
            const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
            const cardImages = cardImagesRef.current.filter(Boolean) as HTMLImageElement[];
            const cardOverlays = cardOverlaysRef.current.filter(Boolean) as HTMLDivElement[];

            if (!ourH2 || !servicesH2 || !subtitle || cards.length < 3) return;

            const ourLetters = splitText(ourH2);
            const servicesLetters = splitText(servicesH2);

            // Initial states
            gsap.set([...ourLetters, ...servicesLetters], { 
              y: 80, 
              opacity: 0,
              force3D: true
            });
            gsap.set([subtitle, button], { 
              opacity: 0,
              force3D: true
            });
            
            // Card 1: Visible and centered from the start - FULL BRIGHTNESS
            gsap.set(cards[0], { 
              y: "-50%", 
              scale: 1, 
              opacity: 1,
              force3D: true
            });
            gsap.set(cardImages[0], {
              opacity: 0.65,  // Brighter image for front card
              force3D: true
            });
            gsap.set(cardOverlays[0], {
              opacity: 0.7,  // Lighter overlay for front card
              force3D: true
            });
            
            // Cards 2 and 3: Hidden initially with darker images
            gsap.set(cards.slice(1), { 
              y: "20vh", 
              scale: 0.9, 
              opacity: 0,
              force3D: true
            });
            gsap.set(cardImages.slice(1), {
              opacity: 0.4,  // Darker for background cards
              force3D: true
            });
            gsap.set(cardOverlays.slice(1), {
              opacity: 1,  // Darker overlay for background cards
              force3D: true
            });

            // Preload animations
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
            preloadTl.to(button, { 
              opacity: 1, 
              duration: 0.8, 
              ease: "power2.out",
              force3D: true
            }, 1.0);

            // Pinned scroll animations
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
                invalidateOnRefresh: true,
                refreshPriority: -1,
              },
            });

            // Transition 1: Card 2 comes to front
            // Card 1 scales down and dims
            pinnedTl.to(cards[0], { 
              scale: 0.85, 
              duration: 0.5, 
              ease: "power2.inOut",
              force3D: true
            }, 0);
            pinnedTl.to(cardImages[0], {
              opacity: 0.4,  // Dim the image
              duration: 0.5,
              ease: "power2.inOut",
              force3D: true
            }, 0);
            pinnedTl.to(cardOverlays[0], {
              opacity: 1,  // Darken overlay
              duration: 0.5,
              ease: "power2.inOut",
              force3D: true
            }, 0);
            
            // Card 2 comes to front and brightens
            pinnedTl.to(cards[1], { 
              y: "-50%", 
              scale: 1, 
              opacity: 1,
              duration: 0.5, 
              ease: "power2.out",
              force3D: true
            }, 0);
            pinnedTl.to(cardImages[1], {
              opacity: 0.65,  // Brighten the image
              duration: 0.5,
              ease: "power2.out",
              force3D: true
            }, 0);
            pinnedTl.to(cardOverlays[1], {
              opacity: 0.7,  // Lighten overlay
              duration: 0.5,
              ease: "power2.out",
              force3D: true
            }, 0);

            // Transition 2: Card 3 comes to front
            // Card 2 scales down and dims
            pinnedTl.to(cards[1], { 
              scale: 0.85, 
              duration: 0.5, 
              ease: "power2.inOut",
              force3D: true
            }, 0.5);
            pinnedTl.to(cardImages[1], {
              opacity: 0.4,  // Dim the image
              duration: 0.5,
              ease: "power2.inOut",
              force3D: true
            }, 0.5);
            pinnedTl.to(cardOverlays[1], {
              opacity: 1,  // Darken overlay
              duration: 0.5,
              ease: "power2.inOut",
              force3D: true
            }, 0.5);
            
            // Card 3 comes to front and brightens
            pinnedTl.to(cards[2], { 
              y: "-50%", 
              scale: 1, 
              opacity: 1,
              duration: 0.5, 
              ease: "power2.out",
              force3D: true
            }, 0.5);
            pinnedTl.to(cardImages[2], {
              opacity: 0.65,  // Brighten the image
              duration: 0.5,
              ease: "power2.out",
              force3D: true
            }, 0.5);
            pinnedTl.to(cardOverlays[2], {
              opacity: 0.7,  // Lighten overlay
              duration: 0.5,
              ease: "power2.out",
              force3D: true
            }, 0.5);

            let resizeTimeout: NodeJS.Timeout | undefined;
            const handleResize = () => {
              if (resizeTimeout) {
                clearTimeout(resizeTimeout);
              }
              resizeTimeout = setTimeout(() => {
                ScrollTrigger.refresh();
              }, 250);
            };

            window.addEventListener("resize", handleResize);

            const initTimeout = setTimeout(() => {
              ScrollTrigger.refresh();
              setTimeout(() => {
                ScrollTrigger.refresh();
              }, 300);
            }, 100);

            return () => {
              window.removeEventListener("resize", handleResize);
              clearTimeout(initTimeout);
            };
          });
        }, section);

        return () => {
          ScrollTrigger.getAll().forEach((trigger) => {
            if (trigger.vars?.trigger === section || trigger.trigger === section) {
              trigger.kill();
            }
          });
          ctx.revert();
        };
      });
    });
  }, []);

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
        
        {/* Animated Button */}
        <div 
          ref={buttonRef}
          className="pointer-events-auto mt-6"
          style={{ willChange: 'opacity' }}
        >
          <AnimatedButton href="#contact">
            Learn More
          </AnimatedButton>
        </div>
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
              <img 
                ref={(el) => { cardImagesRef.current[index] = el; }}
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover" 
                style={{ willChange: 'opacity' }}
              />
              <div 
                ref={(el) => { cardOverlaysRef.current[index] = el; }}
                className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"
                style={{ willChange: 'opacity' }}
              />
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