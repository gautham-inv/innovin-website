"use client";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Footer from "./Footer";

// Image assets
const imgHeroBackground = "/images/compressed_efdf1ab711ffad6d48b3163655ede5890772aaf2.webp";
const imgHeroBackgroundJpg = "/images/compressed_efdf1ab711ffad6d48b3163655ede5890772aaf2.webp";

const teamPhotos = [
  "/images/compressed_573ac6c833b631241442f52f9339c8f43a7bcb76.webp",
  "/images/compressed_d7fbbc268730dca1329c17ec05aad7e281134f4f.webp",
  "/images/compressed_af0d73906f117e3a32a5cb2964335364aff6973e.webp",
  "/images/compressed_efdf1ab711ffad6d48b3163655ede5890772aaf2.webp",
];

const teamPhotoPositions = [
  { left: "10px", top: "20px", rotation: -6 },
  { left: "290px", top: "20px", rotation: 7 },
  { left: "15px", top: "185px", rotation: -5 },
  { left: "295px", top: "180px", rotation: 3 },
];

import { leadershipTeam } from "@/lib/leadership";
import { Linkedin } from "lucide-react";

const coreValues = [
  { title: "Be Customer Obsessed", icon: "/images/c1.png" },
  { title: "Excellence", icon: "/images/c2.png" },
  { title: "Honesty and Integrity", icon: "/images/c3.png" },
  { title: "Entrepreneurial Mindset", icon: "/images/c4.png" },
  { title: "Give more than you take", icon: "/images/c5.png" },
  { title: "Make progress over perfection", icon: "/images/c6.png" },
];

// Reusable Components
function TeamPhotoCard({ src, alt, className = "", style = {}, onClick }: { src: string; alt: string; className?: string; style?: React.CSSProperties, onClick?: () => void }) {
  return (
    <div
      className={`bg-white p-[8px] shadow-lg ${className} ${onClick ? 'cursor-pointer hover:scale-[1.02] transition-transform duration-300' : ''}`}
      style={style}
      onClick={onClick}
    >
      <img src={src} alt={alt} className="w-full aspect-[16/9] object-cover" />
    </div>
  );
}


function CoreValueCard({ icon, title, delay = 0 }: { icon: string; title: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -200px 0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col items-center transition-all duration-700 ease-out w-[200px] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-[200px] h-[165px] mb-[13px] text-[80px] flex items-center justify-center flex-shrink-0">
        <img src={icon} alt={title} className="w-full h-full object-cover" />
      </div>
      <p className="text-[25px] text-white leading-[1.4] tracking-[-0.375px] text-center break-words">
        {title}
      </p>
    </div>
  );
}

function CoreValueCardMobile({ icon, title, delay = 0 }: { icon: string; title: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col items-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] mb-3 sm:mb-4 text-[50px] sm:text-[60px] md:text-[70px] flex items-center justify-center">
        <img src={icon} alt={title} className="w-full h-full object-cover" />
      </div>
      <p className="text-[15px] sm:text-[17px] md:text-[20px] text-white leading-[1.5] sm:leading-[1.6] text-center">
        {title}
      </p>
    </div>
  );
}

function LeadershipCard({ name, role, image, description, linkedin }: { name: string; role: string; image: string; description?: string; linkedin?: string }) {
  return (
    <div className="flex flex-col gap-[24px] group">
      <div className="w-full h-[450px] rounded-[10px] overflow-hidden relative">
        <img src={image} alt={name} className="w-full h-full object-cover" />

        {/* Wiping Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#005c89]/90 via-[#005c89]/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

        {/* Content on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out delay-75 flex flex-col gap-4">
          <p className="text-white text-[16px] font-medium leading-[1.5]">
            {description || "A key leader driving innovation and excellence."}
          </p>
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-[#66c2e2] transition-colors w-fit"
            >
              <Linkedin size={24} />
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-[9px] leading-[34px]">
        <p className="text-[24px] text-black font-semibold tracking-[-0.36px]">
          {name}
        </p>
        <p className="text-[20px] text-black font-medium tracking-[-0.3px]">
          {role}
        </p>
      </div>
    </div>
  );
}

function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-3xl sm:text-4xl lg:text-5xl text-[#005c89] font-semibold leading-tight tracking-tight mb-4 ${className}`}>
      {children}
    </h2>
  );
}

function SectionText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-base sm:text-lg lg:text-xl text-black leading-relaxed font-light ${className}`}>
      {children}
    </p>
  );
}

export default function AboutUs() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + teamPhotos.length) % teamPhotos.length);
    }
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % teamPhotos.length);
    }
  };

  const journeyText = [
    "At Innovin Labs, our understanding of the startup journey is deeply personal—because we’ve lived it ourselves.",
    "We began by building social health solutions for the elderly, a space filled with complex challenges that demanded adaptability, empathy, and rock-solid technology. Those early experiences shaped our product mindset and gave us firsthand insight into what it truly means to build as a founder.",
    "That journey led to our mission: helping startups and scale-ups become successful companies.",
    "Today, we partner closely with founders as an extension of their team—delivering tailored tech solutions, strong product thinking, and hands-on engineering support across every stage of product development. We treat every product as our own, transforming ideas into scalable, real-world solutions.",
    "Innovin Labs is about more than technology — it is about shared experience, collaboration, and helping your vision succeed. Partner with Innovin Labs, and let us power your journey forward."
  ];

  // Calculate how many items in the last row for leadership team
  const lastRowCount = leadershipTeam.length % 3;
  const needsCentering = lastRowCount !== 0;

  return (
    <main id="main-content" className="bg-white w-full">
      {/* Hero Section */}
      <section className="relative w-full px-4 sm:px-6 md:px-8 xl:px-[70px] py-16 sm:py-20 md:py-24 lg:py-28 min-h-[350px] sm:min-h-[450px] lg:min-h-[550px] flex flex-col justify-center">
        <div className="absolute inset-0">
          <img
            src={imgHeroBackground}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              if (e.currentTarget.src !== imgHeroBackgroundJpg) {
                e.currentTarget.src = imgHeroBackgroundJpg;
              }
            }}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 mt-8 max-w-[1400px] mx-auto w-full">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl text-white font-semibold leading-tight tracking-tight mb-4 sm:mb-5 lg:mb-6">
            About Us
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white font-medium leading-relaxed max-w-[900px]">
            Innovin Labs is more than a name — it's a reflection of how we turn raw ideas into purposeful products. Our identity represents the seamless blend of imagination and execution, where every stroke symbolizes collaboration and continuous evolution. It embodies our promise to walk alongside founders, shaping, refining, and building products that create lasting impact.
          </p>
        </div>
      </section>

      {/* Our Journey / Vision / Mission Section */}
      <section className="bg-white pt-10 sm:pt-12 md:pt-14 lg:pt-[50px] pb-2 sm:pb-4 lg:pb-[40px] px-4 sm:px-6 md:px-8 xl:px-[70px]">
        <div className="max-w-[1681px] mx-auto">
          {/* Desktop: Two Columns */}
          <div className="hidden xl:flex gap-[20px] items-stretch">
            {/* Left Column - Our Journey */}
            <div className="flex-1 px-4 lg:pl-0 lg:pr-10">
              <div className="mb-4">
                <SectionHeading>Our Journey</SectionHeading>
              </div>
              <div className="text-base sm:text-lg lg:text-xl text-black leading-relaxed font-light">
                {journeyText.map((text, index) => (
                  <p key={index} className={index < journeyText.length - 1 ? "mb-4" : ""}>
                    {text}
                  </p>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="w-[1.5px] bg-[#deeafc] h-auto self-stretch my-4 shrink-0" />

            {/* Right Column - Vision / Mission / Photos */}
            <div className="flex-1">
              <div className="mb-8 lg:mb-10">
                <SectionHeading>Our vision</SectionHeading>
                <SectionText>Revolutionize the tech industry by combining cutting-edge technology employing AI capabilities.</SectionText>
              </div>

              <div className="mb-8 lg:mb-10">
                <SectionHeading>Our mission</SectionHeading>
                <SectionText>Our mission is to enhance the efficiency, quality, and product development with an AI-first approach.</SectionText>
              </div>

              {/* Team Photos Grid - Desktop */}
              <div className="relative w-full h-[420px]">
                {teamPhotos.map((img, index) => {
                  const position = teamPhotoPositions[index];
                  return (
                    <div
                      key={index}
                      className="absolute"
                      style={{
                        left: position.left,
                        top: position.top,
                        transform: `rotate(${position.rotation}deg)`,
                      }}
                    >
                      <TeamPhotoCard
                        src={img}
                        alt={`Team photo ${index + 1}`}
                        className="w-[260px]"
                        onClick={() => setSelectedImageIndex(index)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet: Vertical Stack */}
          <div className="xl:hidden flex flex-col gap-10 sm:gap-12 md:gap-14">
            <div>
              <h2 className="text-[32px] sm:text-[38px] md:text-[44px] text-[#005c89] font-semibold leading-[1.2] sm:leading-[1.3] mb-4 sm:mb-5 md:mb-6">
                Our Journey
              </h2>
              <div className="text-[16px] sm:text-[18px] md:text-[20px] text-black leading-[1.7] sm:leading-[1.8] font-light">
                {journeyText.map((text, index) => (
                  <p key={index} className={index < journeyText.length - 1 ? "mb-[1em]" : ""}>
                    {text}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-[32px] sm:text-[38px] md:text-[44px] text-[#005c89] font-semibold leading-[1.2] sm:leading-[1.3] mb-4 sm:mb-5 md:mb-6">
                Our vision
              </h2>
              <p className="text-[16px] sm:text-[18px] md:text-[20px] text-black leading-[1.7] sm:leading-[1.8] font-light">
                Revolutionize the tech industry by combining cutting-edge technology employing AI capabilities.
              </p>
            </div>

            <div>
              <h2 className="text-[32px] sm:text-[38px] md:text-[44px] text-[#005c89] font-semibold leading-[1.2] sm:leading-[1.3] mb-4 sm:mb-5 md:mb-6">
                Our mission
              </h2>
              <p className="text-[16px] sm:text-[18px] md:text-[20px] text-black leading-[1.7] sm:leading-[1.8] font-light">
                Our mission is to enhance the efficiency, quality, and product development with an AI-first approach.
              </p>
            </div>

            {/* Team Photos - Mobile/Tablet */}
            <div className="grid grid-cols-2 gap-4 max-w-[500px] mx-auto">
              {teamPhotos.map((img, index) =>
                <TeamPhotoCard
                  key={index}
                  src={img}
                  alt={`Team ${index + 1}`}
                  className="w-full p-2 sm:p-[6px]"
                  onClick={() => setSelectedImageIndex(index)}
                />
              )}
            </div>

            {/* Tablet previously used a tilted absolute layout; keep a clean grid so md behaves like mobile */}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-black pt-12 sm:pt-16 md:pt-20 lg:pt-[60px] pb-16 sm:pb-20 md:pb-24 lg:pb-[126px] overflow-hidden relative px-4 sm:px-6 lg:px-6 xl:px-[70px]">
        <div className="max-w-[1681px] mx-auto text-center">
          <h2 className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[64px] text-white leading-[1.3] sm:leading-[1.4] lg:leading-[60px] tracking-[-0.02em] lg:tracking-[-0.96px] mb-12 sm:mb-16 md:mb-24 lg:mb-[100px] px-4">
            The <span className="text-[#66c2e2] text-[32px] sm:text-[40px] md:text-[52px] lg:text-[70px] font-medium">6 core values</span> that are embedded in our everyday work practices:
          </h2>

          {/* Desktop: 3x2 Grid with proper centering */}
          <div className="hidden xl:block w-full">
            <div className="flex justify-between items-start mb-16 w-full max-w-[1400px] mx-auto">
              {coreValues.slice(0, 3).map((value, index) => (
                <CoreValueCard key={index} icon={value.icon} title={value.title} delay={index * 150} />
              ))}
            </div>
            <div className="flex justify-between items-start w-full max-w-[1400px] mx-auto">
              {coreValues.slice(3, 6).map((value, index) => (
                <CoreValueCard key={index + 3} icon={value.icon} title={value.title} delay={(index + 3) * 150} />
              ))}
            </div>
          </div>

          {/* Mobile/Tablet: 2 per row */}
          <div className="xl:hidden grid grid-cols-2 gap-x-6 sm:gap-x-10 md:gap-x-16 gap-y-10 sm:gap-y-12 md:gap-y-16 max-w-[700px] mx-auto">
            {coreValues.map((value, index) => (
              <CoreValueCardMobile key={index} icon={value.icon} title={value.title} delay={index * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="bg-white py-12 sm:py-14 md:py-16 lg:py-[60px] px-4 sm:px-6 lg:px-6 xl:px-[70px]">
        <div className="max-w-[1681px] mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-[20px]">
            <h2 className="text-[32px] sm:text-[38px] md:text-[44px] lg:text-[48px] text-black font-bold leading-[1.3] sm:leading-[1.5] lg:leading-[97.8px] tracking-[-0.02em] lg:tracking-[-0.48px] mb-2 sm:mb-3">
              Our Leadership Team
            </h2>
            <p className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-black font-medium leading-[1.6] sm:leading-[1.8] lg:leading-[97.8px] tracking-[-0.01em] lg:tracking-[-0.24px]">
              Visionaries behind our promise to build world-class products together.
            </p>
          </div>

          {/* Desktop: 3 columns grid with center-aligned last row */}
          <div className="hidden xl:block">
            <div className="grid grid-cols-3 gap-x-[116px] gap-y-[60px]">
              {leadershipTeam.map((leader, index) => {
                const isInLastRow = index >= leadershipTeam.length - lastRowCount;
                const shouldCenter = needsCentering && isInLastRow;

                return (
                  <div
                    key={index}
                    className={shouldCenter ? "col-start-2" : ""}
                    style={
                      shouldCenter && lastRowCount === 1
                        ? { gridColumn: "2 / 3" }
                        : shouldCenter && lastRowCount === 2 && index === leadershipTeam.length - 2
                          ? { gridColumn: "1 / 2", marginLeft: "auto", marginRight: "58px" }
                          : shouldCenter && lastRowCount === 2 && index === leadershipTeam.length - 1
                            ? { gridColumn: "2 / 3", marginLeft: "58px", marginRight: "auto" }
                            : {}
                    }
                  >
                    <LeadershipCard
                      name={leader.name}
                      role={leader.role}
                      image={leader.image}
                      description={leader.description}
                      linkedin={leader.linkedin}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet: 2 columns */}
          <div className="xl:hidden grid grid-cols-2 gap-x-6 sm:gap-x-8 md:gap-x-12 gap-y-8 sm:gap-y-10 md:gap-y-12 justify-items-center">
            {leadershipTeam.map((leader, index) => {
              const isLastOdd = leadershipTeam.length % 2 === 1 && index === leadershipTeam.length - 1;
              return (
                <div
                  key={index}
                  className="flex flex-col gap-4 sm:gap-5 md:gap-6 items-center"
                  style={isLastOdd ? { justifySelf: "center", gridColumn: "1 / -1" } : {}}
                >
                  <div className="w-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px] aspect-[3/4] rounded-[8px] sm:rounded-[10px] overflow-hidden relative group">
                    <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />

                    {/* Mobile/Tablet Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#005c89]/90 via-[#005c89]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
                      {leader.linkedin && (
                        <a
                          href={leader.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white bg-white/20 p-2 rounded-full backdrop-blur-sm"
                        >
                          <Linkedin size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:gap-[6px] items-center">
                    <p className="text-[16px] sm:text-[18px] md:text-[20px] text-black font-semibold leading-[1.3] sm:leading-[1.4] text-center">
                      {leader.name}
                    </p>
                    <p className="text-[14px] sm:text-[16px] md:text-[18px] text-black font-medium leading-[1.4] sm:leading-[1.5] text-center">
                      {leader.role}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />

      {/* Image Modal with Navigation */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md transition-all duration-300"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white hover:text-[#66c2e2] transition-colors z-[110] p-2"
            onClick={() => setSelectedImageIndex(null)}
          >
            <X size={40} />
          </button>

          {/* Navigation Arrows */}
          <button
            className="absolute left-4 sm:left-10 text-white hover:text-[#66c2e2] transition-colors z-[110] p-4 bg-white/10 hover:bg-white/20 rounded-full"
            onClick={prevImage}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M25 10 L15 20 L25 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            className="absolute right-4 sm:right-10 text-white hover:text-[#66c2e2] transition-colors z-[110] p-4 bg-white/10 hover:bg-white/20 rounded-full"
            onClick={nextImage}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M15 10 L25 20 L15 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            className="relative w-full max-w-6xl max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={teamPhotos[selectedImageIndex]}
              alt="Team Photo"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white font-medium bg-black/50 px-6 py-2 rounded-full">
            {selectedImageIndex + 1} / {teamPhotos.length}
          </div>
        </div>
      )}
    </main>
  );
}