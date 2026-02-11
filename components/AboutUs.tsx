"use client";
import { useEffect, useRef, useState } from "react";
import { X, Linkedin } from "lucide-react";
import Footer from "./Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  { title: "Be Customer Obsessed", icon: "/images/c1.png" },
  { title: "Excellence", icon: "/images/c2.png" },
  { title: "Honesty and Integrity", icon: "/images/c3.png" },
  { title: "Entrepreneurial Mindset", icon: "/images/c4.png" },
  { title: "Give more than you take", icon: "/images/c5.png" },
  { title: "Make progress over perfection", icon: "/images/c6.png" },
];

/* ───────── Reusable sub-components (unchanged) ───────── */

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

/* ───────── Content for the stacking section ───────── */

const stackSections = [
  {
    id: "journey",
    title: "Our Journey",
    content:
    "Innovin Labs began as innovators building social health solutions for the elderly, facing real-world challenges that shaped our adaptability, empathy, and technical expertise. That journey defined our mission—to help startups and scale-ups turn ideas into successful products. Today, we partner closely with founders, offering tailored tech solutions and product expertise, treating every product as our own and supporting teams at every stage of development. At Innovin Labs, we don’t just build technology—we collaborate, share experience, and help your vision succeed."
  },
  {
    id: "mission",
    title: "Our Mission",
    content:
      "Revolutionize the tech industry by combining cutting-edge technology employing AI capabilities. Revolutionize the tech industry by combining cutting-edge technology employing AI capabilities. Revolutionize the tech industry by combining cutting-edge technology employing AI capabilities.",
  },
  {
    id: "vision",
    title: "Our Vision",
    content:
      "We envision a world where every startup, regardless of size, has access to world-class engineering talent and product thinking \u2014 enabling ideas to move from concept to reality faster than ever before. Revolutionize the tech industry by combining cutting-edge technology employing AI capabilities.",
  },
];

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
  const stackWrapperRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

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

  /* ── GSAP: Stacking content with center line growth ── */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const items = contentRefs.current.filter(Boolean) as HTMLDivElement[];
    const wrapper = stackWrapperRef.current;
    const line = lineRef.current;
    if (items.length === 0 || !wrapper || !line) return;

    const initTimeout = setTimeout(() => {
      if (wrapper.offsetHeight === 0) return;

      // Set initial states: first visible, rest hidden
      items.forEach((item, i) => {
        gsap.set(item, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 40,
        });
      });

      // Line starts at 1/3 height
      gsap.set(line, { height: "33.33%" });

      const totalScroll = items.length * window.innerHeight;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: `+=${totalScroll}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Timeline positions (total duration = 3):
      //
      // 0.0 → 0.3 : Hold on Journey (reading time)
      // 0.3 → 0.9 : Journey fades out, Mission fades in, line grows to 66%
      // 0.9 → 1.5 : Hold on Mission
      // 1.5 → 2.1 : Mission fades out, Vision fades in, line grows to 100%
      // 2.1 → 3.0 : Hold on Vision

      // Transition 1: Journey → Mission
      tl.to(items[0], { opacity: 0, y: -30, duration: 0.6, ease: "power1.in" }, 0.3);
      tl.to(items[1], { opacity: 1, y: 0, duration: 0.6, ease: "power1.out" }, 0.3);
      tl.to(line, { height: "66.66%", duration: 0.6, ease: "none" }, 0.3);

      // Transition 2: Mission → Vision
      tl.to(items[1], { opacity: 0, y: -30, duration: 0.6, ease: "power1.in" }, 1.5);
      tl.to(items[2], { opacity: 1, y: 0, duration: 0.6, ease: "power1.out" }, 1.5);
      tl.to(line, { height: "100%", duration: 0.6, ease: "none" }, 1.5);

      // Extend timeline to fill the full scroll distance
      tl.set({}, {}, 3);

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(initTimeout);
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === wrapper) st.kill(true);
      });
    };
  }, []);

  const lastRowCount = leadershipTeam.length % 3;
  const needsCentering = lastRowCount !== 0;

  return (
    <main id="main-content" className="bg-white w-full">
      {/* ═══════ HERO — Clean white bg, centered heading + description ═══════ */}
      <section className="relative w-full pt-[100px] sm:pt-[120px] lg:pt-[146px] pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-6 md:px-8 xl:px-[70px] bg-white">
        <div ref={heroRef} className="max-w-[1681px] mx-auto">
          <div className="max-w-[800px] mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl text-[#232323] font-semibold leading-tight tracking-tight mb-4 sm:mb-5 lg:mb-6">
            About us
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#5a5a5a] leading-relaxed max-w-[600px] mx-auto">
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

      {/* ═══════ IMAGE — Picture fixed; overlay panels shrink on scroll (revealing more) ═══════ */}
      <section
        ref={imageSectionRef}
        className="relative w-full bg-white py-6 sm:py-10 lg:py-14 overflow-hidden px-4 sm:px-6 md:px-8 xl:px-[70px]"
      >
        <div className="relative w-full max-w-[1681px] mx-auto">
          {/* Picture — fixed size, stays put */}
          <img
            ref={pictureRef}
            src={imgHeroBackground}
            alt="Innovin Labs team"
            className="w-full h-[350px] sm:h-[450px] lg:h-[550px] xl:h-[620px] object-cover rounded-xl sm:rounded-2xl"
          />

          {/* Left overlay — shrinks on scroll */}
          <div
            ref={overlayLeftRef}
            className="absolute top-0 left-0 bottom-0 bg-white z-10 hidden md:block"
            style={{ width: "25%" }}
          />
          {/* Right overlay — shrinks on scroll */}
          <div
            ref={overlayRightRef}
            className="absolute top-0 right-0 bottom-0 bg-white z-10 hidden md:block"
            style={{ width: "25%" }}
          />
        </div>
      </section>

      {/* ═══════ STACKING CONTENT — Journey / Mission / Vision ═══════ */}
      {/* Desktop/Tablet: pinned, two-column layout with growing center line */}
      <section
        ref={stackWrapperRef}
        className="relative w-full h-screen hidden md:block bg-white px-4 sm:px-6 md:px-8 xl:px-[70px]"
      >
        <div className="relative w-full h-full max-w-[1681px] mx-auto">
          {/* Vertical center line — grows from 33% to 100% */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 w-[1.5px] bg-[#deeafc] -translate-x-1/2 z-0"
            style={{ height: "33.33%" }}
          />

          {/* Horizontal separator lines */}
          <div className="absolute left-0 right-0 top-1/3 h-[1.5px] bg-[#deeafc] z-0" />
          <div className="absolute left-0 right-0 top-2/3 h-[1.5px] bg-[#deeafc] z-0" />

          {/* Content layers — each is absolutely positioned, cross-fades */}
          {stackSections.map((section, i) => (
            <div
              key={section.id}
              ref={(el) => {
                contentRefs.current[i] = el;
              }}
              className="absolute inset-0 w-full h-full flex items-center z-10"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              {/* Left column — title */}
              <div className="w-1/2 h-full flex items-center justify-center pr-8 lg:pr-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#005c89] font-semibold italic leading-tight tracking-tight">
                  {section.title}
                </h2>
              </div>

              {/* Right column — content */}
              <div className="w-1/2 h-full flex items-center pl-8 lg:pl-12">
                <p className="text-base sm:text-lg lg:text-xl text-black leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile: simple vertical stack (no GSAP pinning) */}
      <section className="md:hidden bg-white px-4 sm:px-6">
        {stackSections.map((section) => (
          <div
            key={section.id}
            className="w-full py-10 sm:py-12 border-b border-[#deeafc] last:border-b-0"
          >
            <h2 className="text-3xl sm:text-4xl text-[#005c89] font-semibold italic leading-tight tracking-tight mb-4 sm:mb-5">
              {section.title}
            </h2>
            <p className="text-base sm:text-lg text-black leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}
      </section>

      {/* ═══════ CORE VALUES — unchanged ═══════ */}
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

      {/* ═══════ LEADERSHIP TEAM — unchanged ═══════ */}
      <section className="bg-white py-12 sm:py-14 md:py-16 lg:py-[60px] px-4 sm:px-6 lg:px-6 xl:px-[70px]">
        <div className="max-w-[1681px] mx-auto">
          <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-[20px]">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-black font-semibold leading-tight mb-4 sm:mb-5 lg:mb-6">
              Our Leadership Team
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

      {/* ═══════ IMAGE MODAL — unchanged ═══════ */}
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
