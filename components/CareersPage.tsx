"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import HoverCard from "./HoverCard";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Image assets
const careerImage = "/images/cdedc12b1b86c0aaa766bfbfd4091d46fcbd8773.png";
const iconCheck = "/images/21d929d3882a56f4a14a488dee787d233888e288.svg";

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
  const reasonToChooseRef = useRef<HTMLDivElement>(null);
  const frontCardRef = useRef<HTMLDivElement>(null);
  
  const images = [careerImage, careerImage, careerImage];
  const reasonsToChoose = [
    {
      title: "Education",
      description: "We offer you the opportunity to elevate your expertise and stay ahead in the tech-driven landscape.",
      image: careerImage,
    },
    {
      title: "Experience",
      description: "Embark on a transformative journey with us, gaining valuable experience in diverse areas for personal and professional growth.",
      image: careerImage,
    },
    {
      title: "Exposure",
      description: "Gain unparalleled exposure to diverse fields and cutting-edge technologies as you collaborate with us.",
      image: careerImage,
    },
  ];

  useEffect(() => {
    const container = reasonToChooseRef.current;
    if (!container) return;

    const items = Array.from(container.querySelectorAll<HTMLElement>(".reason-item"));
    if (!items.length) return;

    items.forEach((item) => gsap.set(item, { opacity: 0, x: 60 }));

    const tl = gsap.timeline({ repeat: -1 });

    items.forEach((item) => {
      tl.to(item, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" });
      tl.to(item, { duration: 5 });
      tl.to(item, { opacity: 0, x: -60, duration: 0.6, ease: "power2.in" });
    });

    return () => {};
  }, []);

  // Scroll animation for front card items
  useEffect(() => {
    const frontCard = frontCardRef.current;
    if (!frontCard) return;

    const items = Array.from(frontCard.querySelectorAll<HTMLElement>(".talent-item"));
    if (!items.length) return;

    // Set initial state
    gsap.set(items, { opacity: 0, x: -60 });

    // Create scroll trigger animation
    items.forEach((item, index) => {
      gsap.to(item, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: frontCard,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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

  return (
    <div className="bg-white w-full pt-[146px] pb-[90px]">
      <div className="max-w-[1681px] mx-auto px-[70px]">
        {/* Hero Section */}
        <div className="flex gap-[141px] items-center mb-[100px]">
          <div className="flex-1">
            <h1 className="text-[56px] text-[#232323] font-semibold leading-[62.1px] mb-[24px]">
              Ignite your <span className="text-[#005c89]">Career with Us</span>
            </h1>
            <p className="text-[31px] text-[#7c7c7c] leading-[62.1px]">
              Join a team of product champions powering innovation at global scale.
            </p>
          </div>
          <button className="bg-white border-4 border-[rgba(0,92,137,0.5)] rounded-[46.816px] px-[35px] py-[9px] text-black text-[16.4px] font-bold shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)] hover:bg-gray-50 transition shrink-0">
            Explore Roles
          </button>
        </div>

        {/* Divider */}
        <div className="bg-[#969396] h-px w-full mb-[100px]" />

        {/* Reason to Choose Us */}
        <div className="mb-[100px]">
          <h2 className="text-[56px] text-[#232323] font-semibold leading-[62.1px] mb-[30px]">
            Reason to Choose Us
          </h2>
          <div ref={reasonToChooseRef} className="relative h-[347px] overflow-hidden">
            {reasonsToChoose.map((reason, index) => (
              <div
                key={index}
                className="reason-item absolute inset-0 flex gap-[74px] items-center"
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
        </div>

        {/* Talent Approach Section */}
        <div className="relative h-[1439px] mb-[100px]">
          {/* Star decorations */}
          <div className="absolute left-[288px] top-[416px] w-[100px] h-[100px] opacity-30">
            <svg viewBox="0 0 100 100" fill="none">
              <path d="M50 10 L55 45 L90 50 L55 55 L50 90 L45 55 L10 50 L45 45 Z" fill="#FFD700" />
            </svg>
          </div>
          <div className="absolute right-[275px] bottom-[100px] w-[100px] h-[100px] opacity-30">
            <svg viewBox="0 0 100 100" fill="none">
              <path d="M50 10 L55 45 L90 50 L55 55 L50 90 L45 55 L10 50 L45 45 Z" fill="#FFD700" />
            </svg>
          </div>

          <div className="mb-[80px]">
            <h2 className="text-[56px] text-[#232323] font-semibold leading-[62.1px] mb-[24px]">
              Talent approach
            </h2>
            <p className="text-[24px] text-black leading-[60px] max-w-[1472px]">
              We are committed to cultivating diverse talent, encouraging creativity, and empowering every individual to make a meaningful impact. By maintaining small, focused teams, providing honest feedback, and fostering a supportive community, we ensure personal growth, recognition of achievements, and mindful management of workloads. Our approach creates an environment where talent thrives, collaboration flourishes, and every contribution is valued.
            </p>
          </div>

          {/* Stacked Cards */}
          <div className="absolute left-[397px] top-[459px] w-[890px] h-[890px]">
            {/* Back card - rotated 4 degrees */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-[20px] shadow-[0px_0px_9px_0px_rgba(0,0,0,0.25)] w-[834px] h-[834px] p-[74px]" style={{ transform: 'rotate(4deg)' }}>
                <div className="flex flex-col gap-[30px]">
                  {talentApproach.map((item, index) => (
                    <div key={index} className="flex gap-[44px] items-center">
                      <div className="w-[94px] h-[94px] shrink-0 flex items-center justify-center bg-primary/10 rounded-full">
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="#005c89">
                          <path d="M25 5 L30 20 L45 25 L30 30 L25 45 L20 30 L5 25 L20 20 Z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[24px] text-black font-semibold leading-[34px] mb-[6px]">
                          {item.title}
                        </h4>
                        <p className="text-[20px] text-black leading-[34px]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Front card - rotated 359 degrees with scroll animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                ref={frontCardRef}
                className="bg-white rounded-[20px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] w-[834px] h-[834px] p-[74px]" 
                style={{ transform: 'rotate(359deg)' }}
              >
                <div className="flex flex-col gap-[30px]">
                  {talentApproach.map((item, index) => (
                    <div key={index} className="talent-item flex gap-[44px] items-center">
                      <div className="w-[94px] h-[94px] shrink-0 flex items-center justify-center bg-primary/10 rounded-full">
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="#005c89">
                          <path d="M25 5 L30 20 L45 25 L30 30 L25 45 L20 30 L5 25 L20 20 Z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[24px] text-black font-medium leading-[34px] mb-[6px]">
                          {item.title}
                        </h4>
                        <p className="text-[20px] text-black leading-[34px]">
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
        <div className="mb-[69px]">
          <h2 className="text-[56px] text-[#232323] font-semibold leading-[62.1px] mb-[24px]">
            Experience life inside our home
          </h2>
          <p className="text-[24px] text-black leading-[60px]">
            A place where smart people collaborate, celebrate wins, and support one another. Happiness and well-being aren't perks they're part of how we work.
          </p>
        </div>

        {/* Image Carousel */}
        <div className="flex gap-[58px] items-center mb-[100px]">
          <button 
            onClick={handlePrevImage}
            className="bg-[#969494] rounded-full p-[16px] hover:bg-gray-400 transition"
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="rotate-180">
              <path d="M18 12 L30 24 L18 36" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="flex-1 h-[489px] rounded-[50px] overflow-hidden">
            <img 
              src={images[currentImageIndex]} 
              alt="Office life" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <button 
            onClick={handleNextImage}
            className="bg-[#969494] rounded-full p-[16px] hover:bg-gray-400 transition"
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M18 12 L30 24 L18 36" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Recent Job Openings */}
        <div>
          <h2 className="text-[40px] text-black font-semibold leading-[60px] mb-[36px]">
            <span className="font-normal">Recent</span> Job Openings
          </h2>
          
          {jobOpenings.length > 0 ? (
            <div className="flex flex-col gap-[32px]">
              {jobOpenings.length >= 3 && (
                <div className="grid grid-cols-3 gap-[20px]">
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
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="currentColor" className="-rotate-90">
                          <path d="M10 14 L17 7 L24 14" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </HoverCard>
                  ))}
                </div>
              )}
              
              {jobOpenings.length > 3 && (
                <div className="w-[500px]">
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
                    <p className="text-[16px] text-black leading-[44px]">
                      {jobOpenings[3].description}
                    </p>
                    <div className="flex items-center gap-[15px] text-[24px] text-black font-medium leading-[60px] hover:text-[#005c89] transition">
                      View details
                      <svg width="34" height="34" viewBox="0 0 34 34" fill="currentColor" className="-rotate-90">
                        <path d="M10 14 L17 7 L24 14" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </HoverCard>
                </div>
              )}

              {jobOpenings.length < 4 && jobOpenings.length > 0 && (
                <div className="grid grid-cols-3 gap-[20px]">
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
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="currentColor" className="-rotate-90">
                          <path d="M10 14 L17 7 L24 14" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </HoverCard>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[24px] text-gray-500">No job openings at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}