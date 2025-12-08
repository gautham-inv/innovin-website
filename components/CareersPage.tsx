"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// Image assets
const careerImage = "/images/cdedc12b1b86c0aaa766bfbfd4091d46fcbd8773.png";
const iconCheck = "/images/21d929d3882a56f4a14a488dee787d233888e288.svg"; // Frame icon

export default function CareersPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const reasonToChooseRef = useRef<HTMLDivElement>(null);
  
  const images = [careerImage, careerImage, careerImage]; // Using same image for demo
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

    // Initial hidden state
    items.forEach((item) => gsap.set(item, { opacity: 0, x: 60 }));

    const tl = gsap.timeline({ repeat: -1 });

    items.forEach((item) => {
      tl.to(item, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" });
      tl.to(item, { duration: 5 }); // hold for 5s
      tl.to(item, { opacity: 0, x: -60, duration: 0.6, ease: "power2.in" });
    });

    return ()=>{}
  }, []);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const jobOpenings = [
    {
      title: "UX/UI Designer",
      description: "As a UI/UX Designer, you'll craft intuitive, user-centered designs that enhance digital experiences. You'll collaborate with cross-functional teams to create visually engaging, context-aware interfaces that drive user satisfaction.",
    },
    {
      title: "Senior Software Engineer",
      description: "As a Senior Software Engineer, you'll build robust, scalable, intelligent systems that turn complex data into meaningful impact. You'll collaborate across teams to deliver high-quality, context-aware software experiences with precision.",
    },
    {
      title: "Product Engineer",
      description: "As a Product Engineer, you'll design scalable, intelligent, innovative product features that leverage AI for impact. You'll collaborate across disciplines to deliver high-value, user-centered digital experiences with precision.",
    },
    {
      title: "Technical Lead",
      description: "As a Technical Lead, you'll drive the design and delivery of scalable, high-impact software solutions. You'll guide cross-functional teams to build context-aware systems that enable data-driven decision-making.",
    },
  ];

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

            {/* Front card - rotated 359 degrees (almost straight) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-[20px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] w-[834px] h-[834px] p-[74px]" style={{ transform: 'rotate(359deg)' }}>
                <div className="flex flex-col gap-[30px]">
                  {talentApproach.map((item, index) => (
                    <div key={index} className="flex gap-[44px] items-center">
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
          
          <div className="flex flex-col gap-[32px]">
            {/* First row - 3 jobs */}
            <div className="grid grid-cols-3 gap-[20px]">
              {jobOpenings.slice(0, 3).map((job, index) => (
                <div 
                  key={index}
                  className="border-2 border-[#005c89] rounded-[30px] p-[20px] flex flex-col gap-[27px] hover:shadow-lg transition"
                >
                  <h3 className="text-[24px] text-black font-medium leading-[34px]">
                    {job.title}
                  </h3>
                  <p className="text-[16px] text-black leading-[44px] flex-1">
                    {job.description}
                  </p>
                  <button className="flex items-center gap-[15px] text-[24px] text-black font-medium leading-[60px] hover:text-[#005c89] transition">
                    View details
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="currentColor" className="-rotate-90">
                      <path d="M10 14 L17 7 L24 14" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            
            {/* Second row - 1 job */}
            <div className="w-[500px]">
              <div className="border-2 border-[#005c89] rounded-[30px] p-[20px] flex flex-col gap-[27px] hover:shadow-lg transition">
                <h3 className="text-[24px] text-black font-medium leading-[34px]">
                  {jobOpenings[3].title}
                </h3>
                <p className="text-[16px] text-black leading-[44px]">
                  {jobOpenings[3].description}
                </p>
                <button className="flex items-center gap-[15px] text-[24px] text-black font-medium leading-[60px] hover:text-[#005c89] transition">
                  View details
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="currentColor" className="-rotate-90">
                    <path d="M10 14 L17 7 L24 14" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

