"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Icon assets
const iconNetwork = "/images/4076a00dcf114223bee46321b8b5539570416f58.svg";
const iconTalents = "/images/30e10ea8e914fc7e3b7c930fb0ab9e24eedb665b.svg";

export default function WhyUsPage() {
  const engagementSectionRef = useRef<HTMLDivElement>(null);
  const diagramContainerRef = useRef<HTMLDivElement>(null);
  const arrowTopLeftRef = useRef<SVGPathElement>(null);
  const arrowTopRightRef = useRef<SVGPathElement>(null);
  const arrowBottomLeftRef = useRef<SVGPathElement>(null);
  const arrowBottomRightRef = useRef<SVGPathElement>(null);
  const cardTopLeftRef = useRef<HTMLDivElement>(null);
  const cardTopRightRef = useRef<HTMLDivElement>(null);
  const cardBottomLeftRef = useRef<HTMLDivElement>(null);
  const cardBottomRightRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false); // Track if animation has played

  useEffect(() => {
    if (!engagementSectionRef.current || !diagramContainerRef.current) return;

    const updateArrowPaths = () => {
      const container = diagramContainerRef.current;
      if (!container) return;

      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const centerX = containerWidth / 2;
      const centerY = containerHeight / 2;
      const r=40;
      // Calculate card positions (approximate based on layout)
      const cardWidth = Math.min(463, containerWidth * 0.3);
      const cardHeight = 200;
      const topCardY = 0;
      const bottomCardY = containerHeight - 100 - cardHeight;
      const leftCardX = 0;
      const rightCardX = containerWidth - cardWidth;

      // Center box dimensions (approximate)
      const centerBoxWidth = 400;
      const centerBoxHeight = 100;
      const startOffsetX = 20;
      const startOffsetY = 10;
      const turnOffsetY = 70; // how far arrow travels before turning
      const turnOffsetX = 60; // how far sideways before straight run

      if (arrowTopLeftRef.current) {
        const startX = centerX - centerBoxWidth / 2;
        const startY = centerY - centerBoxHeight / 2;
      
        const verticalEndY = startY - r;     // stop early before corner
        const horizontalStartY = verticalEndY;
        const horizontalEndX = leftCardX + cardWidth;
        const endX = horizontalEndX;
        const endY = topCardY + cardHeight / 2;
      
        // control point for curve
        const cx = startX - r;  // left direction
        const cy = startY - r;  // upward direction
      
        arrowTopLeftRef.current.setAttribute(
          "d",
          `
            M ${startX} ${startY}
            L ${startX} ${verticalEndY}
            Q ${cx} ${cy} ${cx + r} ${horizontalStartY}
            L ${horizontalEndX} ${horizontalStartY}
            L ${endX} ${endY}
          `
        );
      }
      
      //
      // TOP RIGHT ARROW
      //
      if (arrowTopRightRef.current) {
        const startX = centerX + centerBoxWidth / 2;
        const startY = centerY - centerBoxHeight / 2;
      
        const verticalEndY = startY - r;
        const horizontalStartY = verticalEndY;
        const horizontalEndX = rightCardX;
        const endX = rightCardX;
        const endY = topCardY + cardHeight / 2;
      
        const cx = startX + r; // curve bends right
        const cy = startY - r; // upwards
      
        arrowTopRightRef.current.setAttribute(
          "d",
          `
            M ${startX} ${startY}
            L ${startX} ${verticalEndY}
            Q ${cx} ${cy} ${startX + r} ${horizontalStartY}
            L ${horizontalEndX} ${horizontalStartY}
            L ${endX} ${endY}
          `
        );
      }
      
      //
      // BOTTOM LEFT ARROW
      //
      if (arrowBottomLeftRef.current) {
        const startX = centerX - centerBoxWidth / 2;
        const startY = centerY + centerBoxHeight / 2;
      
        const verticalEndY = startY + r;
        const horizontalStartY = verticalEndY;
        const horizontalEndX = leftCardX + cardWidth;
        const endX = horizontalEndX;
        const endY = bottomCardY + cardHeight / 2;
      
        const cx = startX - r; // curve to the left
        const cy = startY + r; // downward
      
        arrowBottomLeftRef.current.setAttribute(
          "d",
          `
            M ${startX} ${startY}
            L ${startX} ${verticalEndY}
            Q ${cx} ${cy} ${cx + r} ${horizontalStartY}
            L ${horizontalEndX} ${horizontalStartY}
            L ${endX} ${endY}
          `
        );
      }
      
      //
      // BOTTOM RIGHT ARROW
      //
      if (arrowBottomRightRef.current) {
        const startX = centerX + centerBoxWidth / 2;
        const startY = centerY + centerBoxHeight / 2;
      
        const verticalEndY = startY + r;
        const horizontalStartY = verticalEndY;
        const horizontalEndX = rightCardX;
        const endX = rightCardX;
        const endY = bottomCardY + cardHeight / 2;
      
        const cx = startX + r; // curve to the right
        const cy = startY + r; // downward
      
        arrowBottomRightRef.current.setAttribute(
          "d",
          `
            M ${startX} ${startY}
            L ${startX} ${verticalEndY}
            Q ${cx} ${cy} ${startX + r} ${horizontalStartY}
            L ${horizontalEndX} ${horizontalStartY}
            L ${endX} ${endY}
          `
        );
      }
    };

    let resizeHandler: (() => void) | null = null;

    const ctx = gsap.context(() => {
      // Set initial state - arrows hidden with stroke-dasharray for animation
      const arrows = [arrowTopLeftRef.current, arrowTopRightRef.current, arrowBottomLeftRef.current, arrowBottomRightRef.current];
      const cards = [cardTopLeftRef.current, cardTopRightRef.current, cardBottomLeftRef.current, cardBottomRightRef.current];
      
      // Set initial state for cards - hidden
      cards.forEach(card => {
        if (card) {
          gsap.set(card, { opacity: 0 });
        }
      });
      
      // Update paths initially
      updateArrowPaths();
      
      // Set up resize handler
      resizeHandler = () => {
        updateArrowPaths();
      };
      window.addEventListener('resize', resizeHandler);
      
      // Wait for paths to be calculated before setting up animation
      setTimeout(() => {
        arrows.forEach(arrow => {
          if (arrow) {
            const length = arrow.getTotalLength();
            if (length > 0) {
              arrow.style.strokeDasharray = `${length}`;
              arrow.style.strokeDashoffset = `${length}`;
              arrow.style.opacity = '0';
            }
          }
        });

        // Create ScrollTrigger for engagement models section
        ScrollTrigger.create({
          trigger: engagementSectionRef.current,
          start: "top 80%",
          once: true, // Only trigger once
          onEnter: () => {
            if (hasAnimatedRef.current) return; // Prevent multiple triggers
            hasAnimatedRef.current = true;

            // Animate arrows appearing with a "slither" effect (drawing the path)
            const arrowDuration = 3;
            const tl = gsap.timeline();
            
            arrows.forEach((arrow, index) => {
              if (arrow) {
                const length = arrow.getTotalLength();
                if (length > 0) {
                  // Animate arrow
                  tl.to(arrow, {
                    strokeDashoffset: 0,
                    opacity: 1,
                    duration: arrowDuration,
                    ease: "power2.out",
                  }, index * 0.15);
                  
                  // Fade in corresponding card when arrow completes
                  const card = cards[index];
                  if (card) {
                    tl.to(card, {
                      opacity: 1,
                      duration: 0.5,
                      ease: "power2.out",
                    }, index * 0.15 + arrowDuration); // Start fade when arrow completes
                  }
                }
              }
            });
          },
        });
      }, 100);
    }, engagementSectionRef);

    return () => {
      ctx.revert();
      if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
      }
    };
  }, []);

  return (
    <div className="bg-white w-full pt-[146px] pb-[40px] overflow-hidden relative">
    {/* Background decorative elements */}
    <div className="absolute left-[1780px] top-[2238px] w-[3888px] h-[2104px] pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-blue-200 via-blue-100 to-transparent blur-3xl" />
    </div>
    <div className="absolute left-[-4020px] top-[2238px] w-[3888px] h-[2104px] pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-blue-200 via-blue-100 to-transparent blur-3xl" />
    </div>

      <div className="max-w-[1593px] mx-auto px-5">
        {/* Header Section */}
        <div className="text-center mb-[50px]">
          <h1 className="text-[56px] text-[#232323] font-semibold leading-[62.1px] mb-[20px]">
            Why us
          </h1>
          <p className="text-[31px] text-[#005c89] leading-[62.1px]">
            Discover the values, expertise, and commitment that set us apart and make us the ideal partner for your journey.
          </p>
        </div>

        {/* Unique Value Proposition */}
        <div className="flex gap-[118px] items-center mb-[50px]">
          <div className="flex-1">
            <h2 className="text-[40px] text-black font-semibold leading-[60px] mb-[20px]">
              Unique Value Proposition
            </h2>
            <p className="text-[24px] text-black leading-[60px]">
              Fueling Startups and emerging/growing businesses success – we leverage AI tools and open source programs to deliver faster, cost-effective solutions that unlock their growth potential.
            </p>
          </div>
          <div className="bg-[#959595] w-[745px] h-[320px] rounded-[8px] flex items-center justify-center shrink-0">
            <p className="text-[31px] text-black text-center">
              Placeholder
            </p>
          </div>
        </div>

        {/* Our Expertise */}
        <div className="mb-[30px]">
          <h2 className="text-[40px] text-black font-semibold leading-[60px] mb-[20px]">
            Our Expertise
          </h2>
          <p className="text-[24px] text-black leading-[60px] mb-[30px]">
            We believe in nurturing diverse talent, fostering creativity, and empowering individuals to reach their full potential.
          </p>

          {/* Expertise Cards */}
          <div className="grid grid-cols-2 gap-[20px]">
            <div className="bg-white border border-[#66c2e2] rounded-[16px] p-[24px] shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)] h-[448px]">
              <div className="w-[94px] h-[94px] mb-[13px] overflow-hidden">
                <img src={iconNetwork} alt="Network icon" className="w-full h-full" />
              </div>
              <h3 className="text-[31px] text-black font-medium leading-[60px] mb-[13px]">
                Network of Tech SMES
              </h3>
              <p className="text-[20px] text-black leading-[44px]">
                Our expert network comprises accomplished industry leaders from around the globe, bringing together a wealth of diverse insights and unparalleled expertise to foster collaboration, drive innovation, and offer strategic guidance across various sectors.
              </p>
            </div>

            <div className="bg-white border border-[#66c2e2] rounded-[16px] p-[24px] shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)] h-[448px]">
              <div className="w-[94px] h-[94px] mb-[13px] overflow-hidden">
                <img src={iconTalents} alt="Talents icon" className="w-full h-full" />
              </div>
              <h3 className="text-[31px] text-black font-medium leading-[60px] mb-[13px]">
                Top tech talents
              </h3>
              <p className="text-[20px] text-black leading-[44px]">
                At the core of our top tech talents lies an unwavering commitment to excellence, cultivated through meticulous hiring practices, hands-on training, and mentorship-led assimilation, ensuring a dynamic and proficient team ready to tackle the most complex technological challenges.
              </p>
            </div>
          </div>
        </div>

        {/* Our Engagement Models */}
        <div ref={engagementSectionRef} className="mb-[30px]">
          <h2 className="text-[40px] text-black font-semibold leading-[60px] mb-[20px]">
            Our Engagement Models
          </h2>
          <p className="text-[24px] text-black leading-[60px] mb-[50px]">
            We offer flexible engagement models as per the client requirements.
          </p>

          {/* Engagement Models Diagram */}
          <div ref={diagramContainerRef} className="relative h-[1033px] w-full">
            {/* Center Box */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-black rounded-[20px] p-[20px] z-10">
              <p className="text-[40px] text-[#005c89] font-semibold leading-[60px] whitespace-nowrap">
                Our Engagement Models
              </p>
            </div>
            {/* Top Left Card - Tap India's Tech Talent Pool */}
            <div ref={cardTopLeftRef} className="absolute left-[100px] -top-[30px] w-[400px] h-auto bg-white border border-[#66c2e2] rounded-[16px] p-[24px] shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)] z-20">
              <div className="w-[94px] h-[94px] mb-[13px] overflow-hidden">
                <img src={iconNetwork} alt="Icon" className="w-full h-full" />
              </div>
              <h3 className="text-[31px] text-black font-medium leading-[60px] mb-[13px]">
                Tap India's Tech Talent Pool
              </h3>
              <p className="text-[16px] text-black leading-[44px]">
                Enabling access to India's exceptional talent by tapping into a diverse pool of skilled professionals to drive project success.
              </p>
            </div>

            {/* Top Right Card - Project-Based Execution */}
            <div ref={cardTopRightRef} className="absolute right-0 top-0 w-[400px] bg-white border border-[#66c2e2] rounded-[16px] p-[24px] shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)] z-20">
              <div className="w-[94px] h-[94px] mb-[13px] overflow-hidden">
                <img src={iconNetwork} alt="Icon" className="w-full h-full" />
              </div>
              <h3 className="text-[31px] text-black font-medium leading-[60px] mb-[13px]">
                Project-Based Execution
              </h3>
              <p className="text-[16px] text-black leading-[44px]">
                From defining tasks and timelines to building and delivering the final product, we ensure smooth execution and set the stage for ongoing improvement.
              </p>
            </div>

            {/* Bottom Left Card - Remote CTO & Technology Team */}
            <div ref={cardBottomLeftRef} className="absolute left-0 bottom-[100px] w-[500px] bg-white border border-[#66c2e2] rounded-[16px] p-[24px] shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)] z-20">
              <div className="w-[94px] h-[94px] mb-[13px] overflow-hidden">
                <img src={iconNetwork} alt="Icon" className="w-full h-full" />
              </div>
              <h3 className="text-[31px] text-black font-medium leading-[60px] mb-[13px]">
                Remote CTO & Technology Team
              </h3>
              <p className="text-[16px] text-black leading-[44px]">
                Enhance your business with our CTO and expert tech team, seamlessly filling skill gaps and offering flexible, scalable, and cost-effective solutions without the overhead of in-house hiring.
              </p>
            </div>

            {/* Bottom Right Card - Build, Operate, Transfer */}
            <div ref={cardBottomRightRef} className="absolute right-0 bottom-[100px] w-[400px] bg-white border border-[#66c2e2] rounded-[16px] p-[24px] shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)] z-20">
              <div className="w-[94px] h-[94px] mb-[13px] overflow-hidden">
                <img src={iconNetwork} alt="Icon" className="w-full h-full" />
              </div>
              <h3 className="text-[31px] text-black font-medium leading-[60px] mb-[13px]">
                Build, Operate, Transfer
              </h3>
              <p className="text-[16px] text-black leading-[44px]">
                We build the team, operate it for a set period, and then transfer full ownership to the client, ensuring a smooth transition.
              </p>
            </div>

            {/* Curved Arrow SVG Paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5]" style={{ overflow: 'visible' }}>
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#66c2e2" />
                </marker>
              </defs>
              
              {/* Top Left Arrow - Curves left and up from center to top-left card */}
              <path
                ref={arrowTopLeftRef}
                stroke="#66c2e2"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />

              {/* Top Right Arrow - Curves right and up from center to top-right card */}
              <path
                ref={arrowTopRightRef}
                stroke="#66c2e2"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />

              {/* Bottom Left Arrow - Curves left and down from center to bottom-left card */}
              <path
                ref={arrowBottomLeftRef}
                stroke="#66c2e2"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />

              {/* Bottom Right Arrow - Curves right and down from center to bottom-right card */}
              <path
                ref={arrowBottomRightRef}
                stroke="#66c2e2"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
