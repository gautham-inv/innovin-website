"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CarouselCard {
  title: string;
  description: string;
  image?: string;
  icon?: string;
}

interface HorizontalScrollCarouselProps {
  cards: CarouselCard[];
  cardWidth?: number;
  gap?: number;
  backgroundColor?: string;
  pinWrapperId: string;
}

export default function HorizontalScrollCarousel({
  cards,
  cardWidth = 1086,
  gap = 84,
  backgroundColor = "bg-black",
  pinWrapperId,
}: HorizontalScrollCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const wrapper = document.getElementById(pinWrapperId);
  
    if (!container || !track || !wrapper) return;
  
    // Add extra spacing at the end (400px buffer)
    const totalWidth = track.scrollWidth;
    const viewportWidth = container.offsetWidth;
    const scrollDistance = totalWidth - viewportWidth + 400; // Extra 400px spacing
  
    if (scrollDistance > 0) {
      const anim = gsap.to(track, {
        x: -scrollDistance,
        ease: "none", // Linear for smooth consistent scroll
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: `+=${scrollDistance * 1.5}`, // Extend scroll distance for smoother feel
          scrub: 1, // Add slight smoothing (1 = 1 second lag for smoothness)
          pin: wrapper,
          anticipatePin: 1, // Helps prevent jumpiness
        },
      });
  
      return () => {
        anim.kill();
        ScrollTrigger.getAll().forEach((t) => {
          if (t.vars.trigger === wrapper) t.kill();
        });
      };
    }
  
    return undefined;
  }, [cards, cardWidth, gap, pinWrapperId]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-screen ${backgroundColor} overflow-hidden flex items-center`}
    >
      {/* Left fade edge */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-[450px] z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 200px, rgba(0,0,0,0.8) 300px, rgba(0,0,0,0.4) 400px, transparent 450px)'
        }}
      />
      
      <div
        ref={trackRef}
        className="flex items-center relative z-0"
        style={{
          gap: `${gap}px`,
          paddingLeft: `393px`, // Start position from Figma (left: 393px)
          paddingRight: `${gap}px`,
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="shrink-0"
            style={{ width: `${cardWidth}px`, minWidth: `${cardWidth}px` }}
          >
            {/* Card - matching Figma design */}
            <div className="bg-gradient-to-b from-transparent from-[58.773%] to-[#999] 
                h-[758px] rounded-[40px] overflow-hidden relative">

              <img
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover"
                src={card.image}
              />

              {/* Bottom overlay with backdrop blur */}
              <div className="absolute bottom-0 left-0 right-0 h-[318px]
                    bg-gradient-to-r from-transparent to-black
                    backdrop-blur-[37.5px] p-[88px_0_0_88px]">

                <div className="flex flex-col gap-[43px] max-w-[851px]">
                  <h3 className="text-[48px] text-white leading-[30px] tracking-[0.744px] font-['Helvetica_Neue',sans-serif]">
                    {card.title}
                  </h3>

                  <p className="text-[18px] text-white leading-[30px] font-['Helvetica_Neue',sans-serif]">
                    {card.description}
                  </p>

                  <div className="flex items-center gap-[9px] cursor-pointer group">
                    <p className="text-[16px] text-white font-medium group-hover:underline font-['Helvetica_Neue',sans-serif]">
                      Learn more
                    </p>
                    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.5303 6.53033C23.8232 6.23744 23.8232 5.76256 23.5303 5.46967L18.7574 0.696699C18.4645 0.403806 17.9896 0.403806 17.6967 0.696699C17.4038 0.989593 17.4038 1.46447 17.6967 1.75736L21.9393 6L17.6967 10.2426C17.4038 10.5355 17.4038 11.0104 17.6967 11.3033C17.9896 11.5962 18.4645 11.5962 18.7574 11.3033L23.5303 6.53033ZM0 6.75H23V5.25H0V6.75Z" fill="white"/>
                    </svg>
                  </div>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
