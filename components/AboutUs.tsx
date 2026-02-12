"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { X, Linkedin } from "lucide-react";
import Footer from "./Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PreloadImage } from "./PreloadImage";

gsap.registerPlugin(ScrollTrigger);

// Image assets
const imgHeroBackground =
  "/images/compressed_efdf1ab711ffad6d48b3163655ede5890772aaf2.webp";

const teamPhotos = [
  "/images/compressed_573ac6c833b631241442f52f9339c8f43a7bcb76.webp",
  "/images/compressed_d7fbbc268730dca1329c17ec05aad7e281134f4f.webp",
  "/images/compressed_af0d73906f117e3a32a5cb2964335364aff6973e.webp",
  "/images/compressed_efdf1ab711ffad6d48b3163655ede5890772aaf2.webp",
];

import { leadershipTeam } from "@/lib/leadership";

const coreValues = [
  { title: "Be customer obsessed", icon: "/images/c1.png" },
  { title: "Excellence", icon: "/images/c2.png" },
  { title: "Honesty and integrity", icon: "/images/c3.png" },
  { title: "Entrepreneurial mindset", icon: "/images/c4.png" },
  { title: "Give more than you take", icon: "/images/c5.png" },
  { title: "Make progress over perfection", icon: "/images/c6.png" },
];

/* ───────── Content ───────── */
const journeyContent =
  "Innovin Labs began as innovators building social health solutions for the elderly, facing real-world challenges that shaped our adaptability, empathy, and technical expertise. That journey defined our mission\u2014to help startups and scale-ups turn ideas into successful products. Today, we partner closely with founders, offering tailored tech solutions and product expertise, treating every product as our own and supporting teams at every stage of development. At Innovin Labs, we don\u2019t just build technology\u2014we collaborate, share experience, and help your vision succeed.";

const missionContent =
  "Revolutionize the tech industry by combining cutting-edge technology employing AI capabilities. Revolutionize the tech industry by combining cutting-edge technology employing AI capabilities. Revolutionize the tech industry by combining cutting-edge technology employing AI capabilities.";

const visionContent =
  "We envision a world where every startup, regardless of size, has access to world-class engineering talent and product thinking \u2014 enabling ideas to move from concept to reality faster than ever before. Revolutionize the tech industry by combining cutting-edge technology employing AI capabilities.";

/* ───────── Reusable sub-components ───────── */

function CoreValueCard({
  icon,
  title,
  delay = 0,
}: {
  icon: string;
  title: string;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -200px 0px" }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col items-center transition-all duration-700 ease-out w-[200px] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
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

function CoreValueCardMobile({
  icon,
  title,
  delay = 0,
}: {
  icon: string;
  title: string;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.2, rootMargin: "0px" }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col items-center transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
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

function LeadershipCard({
  name,
  role,
  image,
  description,
  linkedin,
}: {
  name: string;
  role: string;
  image: string;
  description?: string;
  linkedin?: string;
}) {
  return (
    <div className="flex flex-col gap-[24px] group">
      <div className="w-full h-[450px] rounded-[10px] overflow-hidden relative">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#005c89]/90 via-[#005c89]/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
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
      <div className="flex flex-col gap-[9px]">
        <p className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] text-[#232323] font-bold leading-[1.3] sm:leading-[1.4]">
          {name}
        </p>
        <p className="text-[16px] sm:text-[18px] text-[#4a5568] leading-[1.5]">
          {role}
        </p>
      </div>
    </div>
  );
}

/* ───────── Journey letter card ───────── */
function JourneyCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className="relative max-w-3xl mx-auto bg-white border border-neutral-200 rounded-xl shadow-2xl overflow-hidden">
        {/* Title bar */}
        <div className="px-6 sm:px-10 pt-8 sm:pt-10 pb-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#005c89] font-semibold leading-tight tracking-tight">
            Our journey
          </h2>
        </div>
        {/* Letter body */}
        <div className="px-6 sm:px-10 pt-5 sm:pt-6 pb-8 sm:pb-10">
          <p className="text-base sm:text-lg lg:text-xl text-[#232323] leading-relaxed">
            {journeyContent}
          </p>
          <div className="mt-8 sm:mt-10 text-sm sm:text-base text-[#5a5a5a] leading-relaxed">
            <p className="mb-1">with commitment,</p>
            <p className="font-semibold text-[#232323]">Innovin Labs</p>
          </div>
        </div>
        {/* Tilted stamp / photo — bottom right */}
        <div className="absolute -bottom-3 -right-3 sm:bottom-4 sm:right-4 w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] rotate-[8deg] rounded-lg overflow-hidden shadow-lg border-[3px] border-white pointer-events-none select-none">
          <img
            src={imgHeroBackground}
            alt="Innovin Labs team"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

/* ───────── Timeline section (Mission & Vision) ───────── */
function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const section = sectionRef.current;
    const line = lineRef.current;
    const mission = missionRef.current;
    const vision = visionRef.current;
    if (!section || !line || !mission || !vision) return;

    gsap.set(line, { scaleY: 0, transformOrigin: "top center" });
    gsap.set(mission, { opacity: 0, y: 40 });
    gsap.set(vision, { opacity: 0, y: 40 });

    // Line grows behind the cards
    gsap.to(line, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 60%",
        scrub: 0.5,
      },
    });

    // Mission fades in
    gsap.to(mission, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: mission,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Vision fades in
    gsap.to(vision, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: vision,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section || st.trigger === mission || st.trigger === vision) {
          st.kill(true);
        }
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative max-w-3xl mx-auto py-16 sm:py-20 lg:py-24">
      {/* Center vertical line — runs behind the cards (z-0) */}
      <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] z-0">
        <div
          ref={lineRef}
          className="w-full h-full bg-[#005c89]/20"
          style={{ transformOrigin: "top center" }}
        />
      </div>

      {/* Dot at top of line */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-[#005c89] z-10" />

      {/* Mission — center aligned, card sits on top of line */}
      <div ref={missionRef} className="relative z-10 mb-16 sm:mb-20 lg:mb-24">
        <div className="bg-white border border-neutral-200 rounded-xl shadow-md p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl text-[#005c89] font-semibold leading-tight tracking-tight mb-3 sm:mb-4">
            Our mission
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-[#232323] leading-relaxed">
            {missionContent}
          </p>
        </div>
      </div>

      {/* Vision — center aligned, card sits on top of line */}
      <div ref={visionRef} className="relative z-10">
        <div className="bg-white border border-neutral-200 rounded-xl shadow-md p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl text-[#005c89] font-semibold leading-tight tracking-tight mb-3 sm:mb-4">
            Our vision
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-[#232323] leading-relaxed">
            {visionContent}
          </p>
        </div>
      </div>

      {/* Dot at bottom of line */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-3 h-3 rounded-full bg-[#005c89] z-10" />
    </div>
  );
}

/* ───────── Mobile timeline (no GSAP) ───────── */
function TimelineMobile() {
  return (
    <div className="relative pl-8 sm:pl-10 py-8 sm:py-12">
      {/* Vertical line */}
      <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-[2px] bg-[#005c89]/20" />

      {/* Mission */}
      <div className="relative mb-10 sm:mb-14">
        <div className="absolute -left-[calc(1.25rem+1px)] sm:-left-[calc(1.5rem+1px)] top-1 w-3 h-3 rounded-full bg-[#005c89] z-10" />
        <h3 className="text-2xl sm:text-3xl text-[#005c89] font-semibold leading-tight tracking-tight mb-3">
          Our mission
        </h3>
        <p className="text-base sm:text-lg text-[#232323] leading-relaxed">
          {missionContent}
        </p>
      </div>

      {/* Vision */}
      <div className="relative">
        <div className="absolute -left-[calc(1.25rem+1px)] sm:-left-[calc(1.5rem+1px)] top-1 w-3 h-3 rounded-full bg-[#005c89] z-10" />
        <h3 className="text-2xl sm:text-3xl text-[#005c89] font-semibold leading-tight tracking-tight mb-3">
          Our vision
        </h3>
        <p className="text-base sm:text-lg text-[#232323] leading-relaxed">
          {visionContent}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════  MAIN COMPONENT  ═══════════════════ */

export default function AboutUs() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  /* Refs */
  const heroRef = useRef<HTMLDivElement>(null);
  const imageSectionRef = useRef<HTMLDivElement>(null);
  const overlayLeftRef = useRef<HTMLDivElement>(null);
  const overlayRightRef = useRef<HTMLDivElement>(null);
  const pictureRef = useRef<HTMLImageElement>(null);

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null)
      setSelectedImageIndex(
        (selectedImageIndex - 1 + teamPhotos.length) % teamPhotos.length
      );
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null)
      setSelectedImageIndex((selectedImageIndex + 1) % teamPhotos.length);
  };

  /* ── GSAP: Hero + picture fade in ── */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hero = heroRef.current;
    const picture = pictureRef.current;
    if (!hero || !picture) return;

    gsap.set([hero, picture], { opacity: 0, y: 20 });

    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(hero, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" });
    tl.to(picture, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, "-=0.6");
  }, []);

  /* ── GSAP: Overlay expands (left/right panels shrink, revealing picture) ── */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageSectionRef.current,
          start: "top 80%",
          end: "center center",
          scrub: true,
        },
      });

      tl.to(overlayLeftRef.current, { width: "0%", ease: "none", duration: 1 }, 0);
      tl.to(overlayRightRef.current, { width: "0%", ease: "none", duration: 1 }, 0);
    });

    mm.add("(max-width: 767px)", () => {
      gsap.set([overlayLeftRef.current, overlayRightRef.current], { width: "0%" });
    });

    return () => mm.revert();
  }, []);

  const lastRowCount = leadershipTeam.length % 3;
  const needsCentering = lastRowCount !== 0;

  return (
    <main id="main-content" className="bg-white w-full">
      <PreloadImage href={imgHeroBackground} />

      {/* ═══════ HERO ═══════ */}
      <section className="relative w-full pt-[100px] sm:pt-[120px] lg:pt-[146px] pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-6 md:px-8 xl:px-[70px] bg-white">
        <div ref={heroRef} className="max-w-[1681px] mx-auto">
          <div className="max-w-[1000px] mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl text-[#232323] font-semibold leading-tight tracking-tight mb-4 sm:mb-5 lg:mb-6">
              About us
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[#5a5a5a] leading-relaxed max-w-[800px] mx-auto">
              Innovin Labs is more than a name — it&apos;s a reflection of how we
              turn raw ideas into purposeful products. Our identity represents the
              seamless blend of imagination and execution, where every stroke
              symbolizes collaboration and continuous evolution. It embodies our
              promise to walk alongside founders, shaping, refining, and building
              products that create lasting impact.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ IMAGE ═══════ */}
      <section
        ref={imageSectionRef}
        className="relative w-full bg-white py-6 sm:py-10 lg:py-14 overflow-hidden px-4 sm:px-6 md:px-8 xl:px-[70px]"
      >
        <div className="relative w-full max-w-[1681px] mx-auto">
          <img
            ref={pictureRef}
            src={imgHeroBackground}
            alt="Innovin Labs team"
            width={1681}
            height={620}
            fetchPriority="high"
            loading="eager"
            className="w-full h-[350px] sm:h-[450px] lg:h-[550px] xl:h-[620px] object-cover rounded-xl sm:rounded-2xl"
          />
          <div
            ref={overlayLeftRef}
            className="absolute top-0 left-0 bottom-0 bg-white z-10 hidden md:block"
            style={{ width: "25%" }}
          />
          <div
            ref={overlayRightRef}
            className="absolute top-0 right-0 bottom-0 bg-white z-10 hidden md:block"
            style={{ width: "25%" }}
          />
        </div>
      </section>

      {/* ═══════ OUR JOURNEY — letter card ═══════ */}
      <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 xl:px-[70px]">
        <JourneyCard />
      </section>

      {/* ═══════ MISSION & VISION — timeline ═══════ */}
      <section className="bg-white px-4 sm:px-6 md:px-8 xl:px-[70px]">
        {/* Desktop: center-line timeline with left/right cards */}
        <div className="hidden md:block">
          <TimelineSection />
        </div>
        {/* Mobile: simple vertical left-aligned timeline */}
        <div className="md:hidden">
          <TimelineMobile />
        </div>
      </section>

      {/* ═══════ CORE VALUES ═══════ */}
      <section className="bg-black pt-12 sm:pt-16 md:pt-20 lg:pt-[60px] pb-16 sm:pb-20 md:pb-24 lg:pb-[126px] overflow-hidden relative px-4 sm:px-6 lg:px-6 xl:px-[70px]">
        <div className="max-w-[1681px] mx-auto text-center">
          <h2 className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[64px] text-white leading-[1.3] sm:leading-[1.4] lg:leading-[60px] tracking-[-0.02em] lg:tracking-[-0.96px] mb-12 sm:mb-16 md:mb-24 lg:mb-[100px] px-4">
            The{" "}
            <span className="text-[#66c2e2] text-[32px] sm:text-[40px] md:text-[52px] lg:text-[70px] font-medium">
              6 core values
            </span>{" "}
            that are embedded in our everyday work practices:
          </h2>

          {/* Desktop: 3x2 Grid */}
          <div className="hidden xl:block w-full">
            <div className="flex justify-between items-start w-full max-w-[1400px] mx-auto">
              {coreValues.slice(0, 3).map((value, index) => (
                <CoreValueCard
                  key={index}
                  icon={value.icon}
                  title={value.title}
                  delay={index * 150}
                />
              ))}
            </div>
            <div className="flex justify-between items-start w-full max-w-[1400px] mx-auto">
              {coreValues.slice(3, 6).map((value, index) => (
                <CoreValueCard
                  key={index + 3}
                  icon={value.icon}
                  title={value.title}
                  delay={(index + 3) * 150}
                />
              ))}
            </div>
          </div>

          {/* Mobile/Tablet: 2 per row */}
          <div className="xl:hidden grid grid-cols-2 gap-x-6 sm:gap-x-10 md:gap-x-16 gap-y-10 sm:gap-y-12 md:gap-y-16 max-w-[700px] mx-auto">
            {coreValues.map((value, index) => (
              <CoreValueCardMobile
                key={index}
                icon={value.icon}
                title={value.title}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ LEADERSHIP TEAM ═══════ */}
      <section className="bg-white py-12 sm:py-14 md:py-16 lg:py-[60px] px-4 sm:px-6 lg:px-6 xl:px-[70px]">
        <div className="max-w-[1681px] mx-auto">
          <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-[20px]">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-black font-semibold leading-tight mb-4 sm:mb-5 lg:mb-6">
              Our leadership team
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-black leading-relaxed max-w-4xl">
              Visionaries behind our promise to build world-class products
              together.
            </p>
          </div>

          {/* Desktop: 3 columns */}
          <div className="hidden xl:block">
            <div className="grid grid-cols-3 gap-x-[116px] gap-y-[60px]">
              {leadershipTeam.map((leader, index) => {
                const isInLastRow =
                  index >= leadershipTeam.length - lastRowCount;
                const shouldCenter = needsCentering && isInLastRow;

                return (
                  <div
                    key={index}
                    className={shouldCenter ? "col-start-2" : ""}
                    style={
                      shouldCenter && lastRowCount === 1
                        ? { gridColumn: "2 / 3" }
                        : shouldCenter &&
                            lastRowCount === 2 &&
                            index === leadershipTeam.length - 2
                          ? {
                              gridColumn: "1 / 2",
                              marginLeft: "auto",
                              marginRight: "58px",
                            }
                          : shouldCenter &&
                              lastRowCount === 2 &&
                              index === leadershipTeam.length - 1
                            ? {
                                gridColumn: "2 / 3",
                                marginLeft: "58px",
                                marginRight: "auto",
                              }
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
              const isLastOdd =
                leadershipTeam.length % 2 === 1 &&
                index === leadershipTeam.length - 1;
              return (
                <div
                  key={index}
                  className="flex flex-col gap-4 sm:gap-5 md:gap-6 items-center"
                  style={
                    isLastOdd
                      ? { justifySelf: "center", gridColumn: "1 / -1" }
                      : {}
                  }
                >
                  <div className="w-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px] aspect-[3/4] rounded-[8px] sm:rounded-[10px] overflow-hidden relative group">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
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
                    <p className="text-[16px] sm:text-[18px] md:text-[20px] text-[#232323] font-semibold leading-[1.3] sm:leading-[1.4] text-center">
                      {leader.name}
                    </p>
                    <p className="text-[14px] sm:text-[16px] md:text-[18px] text-[#4a5568] font-medium leading-[1.4] sm:leading-[1.5] text-center">
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

      {/* ═══════ IMAGE MODAL ═══════ */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md transition-all duration-300"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button
            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white hover:text-[#66c2e2] transition-colors z-[110] p-2"
            onClick={() => setSelectedImageIndex(null)}
          >
            <X size={40} />
          </button>
          <button
            className="absolute left-4 sm:left-10 text-white hover:text-[#66c2e2] transition-colors z-[110] p-4 bg-white/10 hover:bg-white/20 rounded-full"
            onClick={prevImage}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path
                d="M25 10 L15 20 L25 30"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="absolute right-4 sm:right-10 text-white hover:text-[#66c2e2] transition-colors z-[110] p-4 bg-white/10 hover:bg-white/20 rounded-full"
            onClick={nextImage}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path
                d="M15 10 L25 20 L15 30"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white font-medium bg-black/50 px-6 py-2 rounded-full">
            {selectedImageIndex + 1} / {teamPhotos.length}
          </div>
        </div>
      )}
    </main>
  );
}
