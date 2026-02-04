"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import HoverCard from "./HoverCard";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Image assets
const iconCheck = "/images/21d929d3882a56f4a14a488dee787d233888e288.svg";
const life = "/images/compressed_2a10271a41c28441412779781963630458378940.webp";

const img1 = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&h=800&fit=crop";
const img2 = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop";
const img3 = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=800&fit=crop";

const careers1 = "/images/careers1.webp"
const careers2 = "/images/careers2.webp"
const careers3 = "/images/careers3.webp"


interface Job {
  _id: string;
  title: string;
  heading?: string;
  slug: string;
  location?: string;
  employmentType?: string;
}

interface CareersPageProps {
  jobs: Job[];
}

export default function CareersPage({ jobs }: CareersPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentReasonIndex, setCurrentReasonIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false); // NEW: Transition lock
  const reasonToChooseRef = useRef<HTMLDivElement>(null);
  const frontCardRef = useRef<HTMLDivElement>(null);
  const starLeftRef = useRef<HTMLDivElement>(null);
  const starRightRef = useRef<HTMLDivElement>(null);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null); // NEW: Track active timeline
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null); // NEW: Track autoplay timer
  const backCardRef = useRef<HTMLDivElement>(null);

  const images = [careers1, careers2, careers3];
  const reasonsToChoose = [
    {
      title: "Education",
      description: "We offer you the opportunity to elevate your expertise and stay ahead in the tech-driven landscape.",
      image: img1,
    },
    {
      title: "Experience",
      description: "Embark on a transformative journey with us, gaining valuable experience in diverse areas for personal and professional growth.",
      image: img2,
    },
    {
      title: "Exposure",
      description: "Gain unparalleled exposure to diverse fields and cutting-edge technologies as you collaborate with us.",
      image: img3,
    },
  ];

  // FIXED: Update Reasons to Choose Us with proper animation management
  useEffect(() => {
    const container = reasonToChooseRef.current;
    if (!container || isTransitioning) return;

    const items = Array.from(container.querySelectorAll<HTMLElement>(".reason-item"));
    if (!items.length) return;

    // Kill any existing timeline
    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
      activeTimelineRef.current = null;
    }

    // Set transition lock
    setIsTransitioning(true);

    // Create a fresh timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
        activeTimelineRef.current = null;
      }
    });

    activeTimelineRef.current = tl;

    // Find outgoing items (all except current)
    const outgoingItems = items.filter((_, index) => index !== currentReasonIndex);
    const incomingItem = items[currentReasonIndex];

    // First: fade out and slide out all outgoing items
    if (outgoingItems.length > 0) {
      tl.to(outgoingItems, {
        opacity: 0,
        x: -100,
        duration: 0.5,
        ease: "power2.in",
      });
    }

    // Then: fade in and slide in the new item
    if (incomingItem) {
      // Set initial state for incoming item
      gsap.set(incomingItem, { opacity: 0, x: 100 });

      // Add to timeline - starts after previous animation ends
      tl.to(incomingItem, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [currentReasonIndex]);

  // FIXED: Auto-rotate with proper cleanup and reset
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Only auto-rotate on desktop (xl breakpoint and above)
    const isDesktop = window.innerWidth >= 1280;
    if (!isDesktop) return;

    // Clear any existing timer
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }

    // Set new timer
    autoplayTimerRef.current = setInterval(() => {
      // Only advance if not currently transitioning
      if (!isTransitioning) {
        setCurrentReasonIndex((prev) => (prev + 1) % reasonsToChoose.length);
      }
    }, 5000);

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
  }, [reasonsToChoose.length, isTransitioning]);

  // Scroll animation for front card items - responsive
  useLayoutEffect(() => {
    const frontCard = frontCardRef.current;
    const backCard = backCardRef.current;
    if (!frontCard || typeof window === 'undefined') return;

    const items = Array.from(frontCard.querySelectorAll<HTMLElement>(".talent-item"));
    if (!items.length) return;

    // Set initial states
    gsap.set(items, { opacity: 0, x: -60 });
    gsap.set([frontCard, backCard], { opacity: 0, y: 40 });

    const leftStar = starLeftRef.current;
    const rightStar = starRightRef.current;
    if (leftStar && rightStar) {
      gsap.set([leftStar, rightStar], { scale: 0, opacity: 0 });
    }

    // Create scroll trigger animation - earlier start position
    const isMobile = window.innerWidth < 768;
    const startPosition = isMobile ? "top 95%" : "top 90%";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: frontCard,
        start: startPosition,
        toggleActions: "play none none none",
        once: true,
        invalidateOnRefresh: true,
      },
    });

    // 1. Stars and Cards (Stacks) zoom/fade in
    if (leftStar && rightStar) {
      tl.to([leftStar, rightStar], {
        scale: 1,
        opacity: 0.3,
        duration: 1.2,
        ease: "elastic.out(1, 0.6)", // Bounce effect
        stagger: 0.2
      }, 0);
    }

    tl.to([frontCard, backCard], {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    }, 0.2);

    // 2. Stagger in the talent items simultaneously with card fade-in
    tl.to(items, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15,
    }, 0.2);

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      try {
        tl.scrollTrigger && tl.scrollTrigger.kill();
        tl.kill();
      } catch (e) {
        // ignore
      }
    };
  }, []);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // FIXED: Handle reason click with transition lock and timer reset
  const handleReasonClick = (index: number) => {
    if (isTransitioning || index === currentReasonIndex) return;

    // Clear and restart autoplay timer
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }

    setCurrentReasonIndex(index);

    // Restart autoplay after manual selection
    if (typeof window !== 'undefined' && window.innerWidth >= 1280) {
      autoplayTimerRef.current = setInterval(() => {
        if (!isTransitioning) {
          setCurrentReasonIndex((prev) => (prev + 1) % reasonsToChoose.length);
        }
      }, 5000);
    }
  };

  const handleNextReason = () => {
    if (isTransitioning) return;

    // Clear and restart timer
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);

    setCurrentReasonIndex((prev) => (prev + 1) % reasonsToChoose.length);

    // Restart timer
    if (typeof window !== 'undefined' && window.innerWidth >= 1280) {
      autoplayTimerRef.current = setInterval(() => {
        if (!isTransitioning) {
          setCurrentReasonIndex((prev) => (prev + 1) % reasonsToChoose.length);
        }
      }, 5000);
    }
  };

  const handlePrevReason = () => {
    if (isTransitioning) return;

    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);

    setCurrentReasonIndex((prev) => (prev - 1 + reasonsToChoose.length) % reasonsToChoose.length);

    if (typeof window !== 'undefined' && window.innerWidth >= 1280) {
      autoplayTimerRef.current = setInterval(() => {
        if (!isTransitioning) {
          setCurrentReasonIndex((prev) => (prev + 1) % reasonsToChoose.length);
        }
      }, 5000);
    }
  };

  const jobOpenings = jobs.map((job) => ({
    id: job._id,
    title: job.title,
    slug: job.slug,
    description: job.heading || `Join us as a ${job.title}. We're looking for talented individuals to join our team.`,
    location: job.location,
    employmentType: job.employmentType,
  }));

  const talentApproach = [
    {
      title: "Small Teams, Big Impact",
      description: "Work in tight-knit pods where your contributions genuinely move the product forward.",
    },
    {
      title: "Honest, Continuous Feedback",
      description: "Grow faster through transparent conversations and clear, constructive guidance.",
    },
    {
      title: "Mindful Workload Culture",
      description: "Stay productive without burnout through balanced, thoughtful planning.",
    },
    {
      title: "Celebrate Every Milestone",
      description: "Ring achievements, track wins, and celebrate progress together—big or small.",
    },
    {
      title: "A Community That Cares",
      description: "Join a supportive team that values people as much as the products they build.",
    },
  ];

  // Team member polaroid images
  const teamPhotos = [
    // Left side
    { name: "Akshay", img: "/team/akshay.png", style: { top: "5%", left: "3%" }, rotate: "-8deg" },
    { name: "Ashwanth", img: "/team/ashwanth.png", style: { top: "15%", left: "14%" }, rotate: "10deg" },
    { name: "Ananth", img: "/team/ananth.png", style: { top: "32%", left: "4%" }, rotate: "-5deg" },
    { name: "Rajath", img: "/team/rajath.png", style: { top: "52%", left: "2%" }, rotate: "-10deg" },
    // Bottom left
    { name: "Alias", img: "/team/alias.png", style: { bottom: "8%", left: "10%" }, rotate: "6deg" },
    { name: "Amit", img: "/team/amit.png", style: { bottom: "5%", left: "22%" }, rotate: "-4deg" },
    // Bottom center
    { name: "Rishikesh", img: "/team/rishikesh.png", style: { bottom: "12%", left: "35%" }, rotate: "3deg" },
    { name: "Sayooj", img: "/team/sayooj.png", style: { bottom: "5%", left: "47%" }, rotate: "-5deg" },
    { name: "Dias", img: "/team/dias.png", style: { bottom: "8%", right: "35%" }, rotate: "7deg" },
    // Bottom right
    { name: "Hinan", img: "/team/hinan.png", style: { bottom: "5%", right: "22%" }, rotate: "-2deg" },
    { name: "Niranjan", img: "/team/niranjan.png", style: { bottom: "10%", right: "8%" }, rotate: "5deg" },
    // Right side
    { name: "Arjun", img: "/team/arjun.png", style: { top: "5%", right: "14%" }, rotate: "-6deg" },
    { name: "Gautham", img: "/team/gautham.png", style: { top: "8%", right: "2%" }, rotate: "8deg" },
    { name: "Niranjana", img: "/team/niranjana.png", style: { top: "28%", right: "10%" }, rotate: "5deg" },
    { name: "Vishnu", img: "/team/vishnu.png", style: { top: "32%", right: "0%" }, rotate: "10deg" },
    { name: "Aswin", img: "/team/aswin.png", style: { top: "52%", right: "3%" }, rotate: "6deg" },
  ];

  return (
    <div className="bg-white w-full pt-[100px] sm:pt-[120px] lg:pt-[146px] pb-[50px] sm:pb-[70px] lg:pb-[90px]">
      <div className="max-w-[1681px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[70px]">
        {/* Hero Section with CSS Dotted Background */}
        <div className="relative min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[550px] xl:min-h-[600px] mb-[40px] sm:mb-[60px] xl:mb-[80px] hero-dotted-bg">

          {/* Polaroid Team Photos - Desktop Only */}
          <div className="hidden lg:block">
            {teamPhotos.map((member, idx) => (
              <div
                key={idx}
                className="absolute z-10"
                style={{
                  ...member.style,
                  transform: `rotate(${member.rotate})`,
                }}
              >
                <div className="bg-white p-2 pb-6 rounded-md shadow-lg" style={{ width: '100px' }}>
                  <div className="w-full aspect-square overflow-hidden rounded-sm bg-gray-200">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to placeholder
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${member.name}&size=200&background=f3f4f6&color=374151`;
                      }}
                    />
                  </div>
                  <p className="text-center mt-2 text-gray-700 text-sm" style={{ fontFamily: "'Caveat', cursive" }}>
                    {member.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Centered Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 sm:px-12 md:px-20 lg:px-32 z-20">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl text-[#232323] font-semibold leading-tight mb-6">
              Ignite your <span className="text-[#005c89]">Career with Us</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#7c7c7c] leading-relaxed max-w-[700px]">
              Join a team of product champions powering innovation at global scale.
            </p>
          </div>
        </div>



        {/* Reason to Choose Us */}
        <div className="mb-[40px] sm:mb-[60px] lg:mb-[80px]">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#232323] font-semibold leading-tight mb-8 lg:mb-[30px]">
            Reason to Choose Us
          </h2>

          {/* Desktop: Horizontal carousel with dot indicators */}
          <div className="hidden xl:block">
            <div ref={reasonToChooseRef} className="relative h-[347px] overflow-hidden">
              {reasonsToChoose.map((reason, index) => (
                <div
                  key={index}
                  className="reason-item absolute inset-0 flex gap-[74px] items-center"
                  style={{ opacity: 0 }}
                >
                  <div className="w-[450px] h-[347px] rounded-lg overflow-hidden shrink-0">
                    <img src={reason.image} alt="Team collaboration" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[40px] text-black font-semibold leading-[60px] mb-[10px]">
                      {reason.title}
                    </h3>
                    <p className="text-[20px] text-black leading-[44px]">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation and Indicators */}
            <div className="flex items-center justify-center gap-8 mt-6">
              {/* Prev Button */}
              <button
                onClick={handlePrevReason}
                disabled={isTransitioning}
                className="p-2 rounded-full hover:bg-gray-100 transition disabled:opacity-50"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Dot indicators */}
              <div className="flex justify-center gap-3">
                {reasonsToChoose.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleReasonClick(index)}
                    disabled={isTransitioning}
                    className={`h-2 rounded-full transition-all ${index === currentReasonIndex ? 'bg-black w-10' : 'bg-neutral-300 w-2'
                      } ${isTransitioning ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-neutral-400'}`}
                    aria-label={`Go to ${reasonsToChoose[index].title}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextReason}
                disabled={isTransitioning}
                className="p-2 rounded-full hover:bg-gray-100 transition disabled:opacity-50"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile/Tablet: Vertical stacked cards */}
          <div className="xl:hidden flex flex-col gap-6 sm:gap-8">
            {reasonsToChoose.map((reason, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm"
              >
                <div className="w-full sm:w-[200px] md:w-[300px] h-[200px] sm:h-[250px] md:h-[300px] rounded-lg overflow-hidden shrink-0">
                  <img src={reason.image} alt={reason.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[24px] sm:text-[28px] md:text-[32px] text-black font-semibold leading-[1.2] mb-2 sm:mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-[16px] sm:text-[18px] md:text-[20px] text-black leading-[1.6] sm:leading-[1.8]">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Talent Approach Section */}
        <div className="relative min-h-[800px] sm:min-h-[1000px] md:min-h-[1200px] xl:h-[1314px]">
          {/* Star decorations */}
          <div ref={starLeftRef} className="hidden xl:block absolute left-1/2 -ml-[580px] top-[300px] w-[100px] h-[100px] opacity-30">
            <svg viewBox="0 0 100 100" fill="none">
              <path d="M50 10 L55 45 L90 50 L55 55 L50 90 L45 55 L10 50 L45 45 Z" fill="#FFD700" />
            </svg>
          </div>
          <div ref={starRightRef} className="hidden xl:block absolute left-1/2 ml-[480px] bottom-[100px] w-[100px] h-[100px] opacity-30">
            <svg viewBox="0 0 100 100" fill="none">
              <path d="M50 10 L55 45 L90 50 L55 55 L50 90 L45 55 L10 50 L45 45 Z" fill="#FFD700" />
            </svg>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#232323] font-semibold leading-tight mb-7">
              Talent approach
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-black leading-relaxed max-w-full lg:max-w-[1472px]">
              We nurture diverse talent by empowering individuals, encouraging creativity, and valuing every contribution. Through small, focused teams, honest feedback, and a supportive culture, we promote growth, recognize achievements, and maintain healthy workloads—creating an environment where collaboration and talent thrive.
            </p>
          </div>

          <div className="relative xl:absolute xl:left-1/2 xl:top-[334px] xl:-translate-x-1/2 w-full xl:w-[890px] mx-auto">
            {/* Back card */}
            <div ref={backCardRef} className="hidden xl:block absolute top-0 left-0 right-0 flex items-center justify-center z-10">
              <div className="bg-white rounded-[20px] shadow-[0px_0px_9px_0px_rgba(0,0,0,0.25)] w-[834px] h-[834px]" style={{ transform: 'rotate(4deg)' }}>
              </div>
            </div>

            {/* Front card */}
            <div className="relative xl:absolute xl:top-0 xl:-left-[20px] xl:right-0 flex items-center justify-center z-20">
              <div
                ref={frontCardRef}
                className="bg-white rounded-[20px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] w-full max-w-[834px] h-auto min-h-[600px] xl:w-[834px] xl:h-[834px] p-6 sm:p-8 md:p-12 xl:p-[74px] front-card-rotate"
              >
                <div className="flex flex-col gap-6 sm:gap-8 xl:gap-[30px]">
                  {talentApproach.map((item, index) => (
                    <div key={index} className="talent-item flex gap-4 sm:gap-6 xl:gap-[44px] items-center">
                      <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] lg:w-[94px] lg:h-[94px] shrink-0 flex items-center justify-center bg-primary/10 rounded-full">
                        <svg className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] lg:w-[50px] lg:h-[50px]" viewBox="0 0 50 50" fill="#005c89">
                          <path d="M25 5 L30 20 L45 25 L30 30 L25 45 L20 30 L5 25 L20 20 Z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-black font-medium leading-[1.3] sm:leading-[1.4] lg:leading-[34px] mb-1 sm:mb-2 lg:mb-[6px]">
                          {item.title}
                        </h4>
                        <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-black leading-[1.5] sm:leading-[1.6] lg:leading-[34px]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience life inside our home */}
        <div className="mb-8 sm:mb-12 lg:mb-[69px]">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#232323] font-semibold leading-tight mb-6">
            Experience life inside our home
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-black leading-relaxed">
            A place where smart people collaborate, celebrate wins, and support one another. Happiness and well-being aren't perks they're part of how we work.
          </p>
        </div>

        {/* Image Carousel */}
        <div className="flex gap-4 sm:gap-6 xl:gap-[58px] items-center mb-[50px] sm:mb-[70px] xl:mb-[100px]">
          <button
            onClick={handlePrevImage}
            className="bg-[#969494] rounded-full p-3 sm:p-4 lg:p-[16px] hover:bg-gray-400 transition shrink-0"
            aria-label="Previous image"
          >
            <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" viewBox="0 0 48 48" fill="none" style={{ transform: 'rotate(180deg)' }}>
              <path d="M18 12 L30 24 L18 36" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex-1 h-[250px] sm:h-[350px] md:h-[400px] lg:h-[489px] rounded-[30px] sm:rounded-[40px] lg:rounded-[50px] overflow-hidden">
            <img
              src={images[currentImageIndex]}
              alt="Office life"
              className="w-full h-full object-cover"
            />
          </div>

          <button
            onClick={handleNextImage}
            className="bg-[#969494] rounded-full p-3 sm:p-4 lg:p-[16px] hover:bg-gray-400 transition shrink-0"
            aria-label="Next image"
          >
            <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" viewBox="0 0 48 48" fill="none">
              <path d="M18 12 L30 24 L18 36" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Recent Job Openings */}
        <div id="recent-job-openings">
          <h2 className="text-[28px] sm:text-[32px] md:text-[36px] xl:text-[40px] text-black font-semibold leading-[1.3] sm:leading-[1.4] xl:leading-[60px] mb-6 sm:mb-8 xl:mb-[36px]">
            <span className="font-normal">Recent</span> Job Openings
          </h2>

          {jobOpenings.length > 0 ? (
            <div className="flex flex-col gap-6 sm:gap-8 xl:gap-[32px]">
              {/* Desktop: Grid layout */}
              {jobOpenings.length >= 3 && (
                <div className="hidden xl:grid grid-cols-3 gap-[20px]">
                  {jobOpenings.slice(0, 3).map((job) => (
                    <HoverCard
                      key={job.id}
                      href={`/careers/${job.slug}`}
                      as="link"
                      borderColor="border-[#005c89]"
                      borderWidth="border-2"
                      borderRadius="rounded-[30px]"
                      padding="p-[20px]"
                      shadow="hover:shadow-lg"
                      className="gap-[27px]"
                    >
                      <h3 className="text-[24px] text-black font-medium leading-[34px]">
                        {job.title}
                      </h3>
                      <p className="text-[16px] text-black leading-[44px] flex-1">
                        {job.description}
                      </p>
                      <div className="flex items-center gap-[15px] text-[24px] text-black font-medium leading-[60px] hover:text-[#005c89] transition">
                        View details
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="currentColor" className="rotate-90">
                          <path d="M10 14 L17 7 L24 14" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </HoverCard>
                  ))}
                </div>
              )}

              {jobOpenings.length > 3 && (
                <div className="hidden xl:block w-[500px]">
                  <HoverCard
                    href={`/careers/${jobOpenings[3].slug}`}
                    as="link"
                    borderColor="border-[#005c89]"
                    borderWidth="border-2"
                    borderRadius="rounded-[30px]"
                    padding="p-[20px]"
                    shadow="hover:shadow-lg"
                    className="gap-[27px]"
                  >
                    <h3 className="text-[24px] text-black font-medium leading-[34px]">
                      {jobOpenings[3].title}
                    </h3>
                    <div className="flex items-center gap-[15px] text-[24px] text-black font-medium leading-[60px] hover:text-[#005c89] transition">
                      View details
                      <svg width="34" height="34" viewBox="0 0 34 34" fill="currentColor" className="rotate-90">
                        <path d="M10 14 L17 7 L24 14" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </HoverCard>
                </div>
              )}

              {jobOpenings.length < 4 && jobOpenings.length > 0 && (
                <div className="hidden xl:grid grid-cols-3 gap-[20px]">
                  {jobOpenings.map((job) => (
                    <HoverCard
                      key={job.id}
                      href={`/careers/${job.slug}`}
                      as="link"
                      borderColor="border-[#005c89]"
                      borderWidth="border-2"
                      borderRadius="rounded-[30px]"
                      padding="p-[20px]"
                      shadow="hover:shadow-lg"
                      className="gap-[27px]"
                    >
                      <h3 className="text-[24px] text-black font-medium leading-[34px]">
                        {job.title}
                      </h3>
                      <p className="text-[16px] text-black leading-[44px] flex-1">
                        {job.description}
                      </p>
                      <div className="flex items-center gap-[15px] text-[24px] text-black font-medium leading-[60px] hover:text-[#005c89] transition">
                        View details
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="currentColor" className="rotate-90">
                          <path d="M10 14 L17 7 L24 14" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </HoverCard>
                  ))}
                </div>
              )}

              {/* Mobile/Tablet: Vertical stacked cards */}
              <div className="xl:hidden flex flex-col gap-4 sm:gap-6">
                {jobOpenings.map((job) => (
                  <HoverCard
                    key={job.id}
                    href={`/careers/${job.slug}`}
                    as="link"
                    borderColor="border-[#005c89]"
                    borderWidth="border-2"
                    borderRadius="rounded-[20px] sm:rounded-[30px]"
                    padding="p-4 sm:p-5"
                    shadow="hover:shadow-lg"
                    className="gap-4 sm:gap-6"
                  >
                    <h3 className="text-[20px] sm:text-[22px] text-black font-medium leading-[1.3] sm:leading-[1.4]">
                      {job.title}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] text-black leading-[1.6] sm:leading-[1.8] flex-1">
                      {job.description}
                    </p>
                    <div className="flex items-center gap-3 sm:gap-[15px] text-[18px] sm:text-[20px] text-black font-medium leading-[1.5] sm:leading-[1.6] hover:text-[#005c89] transition">
                      View details
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 rotate-90" viewBox="0 0 34 34" fill="currentColor">
                        <path d="M10 14 L17 7 L24 14" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </HoverCard>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <p className="text-[18px] sm:text-[20px] lg:text-[24px] text-gray-500">No job openings at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}