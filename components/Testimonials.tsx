"use client";

import { useEffect, useRef, useState } from "react";

const imgZirklyFullLogo1 = "/images/zirkly.png";

const testimonials = new Array(5).fill(null).map(() => ({
  quote:
    "As an entrepreneur, I needed to get my new website delivered in a timely and effective manner. Finding someone to do the work was not difficult, but finding someone that could do the work by sharing my company values and vision, wasn't. They delivered the project on time with high quality and excellent communication.",
  author: "Sujith Chellappan",
  logo: imgZirklyFullLogo1,
}));

export default function Testimonials() {
  // Start with mobile-first rendering (false) to avoid SSR/client mismatch.
  const [currentIndex, setCurrentIndex] = useState<number>(2);
  const [isAnimating, setIsAnimating] = useState(false);
  // do NOT compute window size during render; use effect to update after mount
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  const autoplayRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = testimonials.length;
  const transitionMs = 600;

  // after mount determine desktop/mobile
  useEffect(() => {
    setMounted(true);
    const update = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    update();
    const onResize = () => {
      // throttle with requestAnimationFrame
      requestAnimationFrame(update);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // normalize index for circular carousel
  const normalize = (i: number) => {
    let idx = i % total;
    if (idx < 0) idx += total;
    return idx;
  };

  const getPosition = (cardIndex: number) => {
    let diff = cardIndex - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  // autoplay
  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  function startAutoplay() {
    stopAutoplay();
    autoplayRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => normalize(prev + 1));
    }, 5000);
  }
  function stopAutoplay() {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }

  const snapToCard = (target: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(normalize(target));
    window.setTimeout(() => setIsAnimating(false), transitionMs);
  };

  const handleCardClick = (index: number) => {
    const pos = getPosition(index);
    // if neighbor or center, bring to center
    if (Math.abs(pos) <= 1) {
      snapToCard(index);
      stopAutoplay();
      startAutoplay();
    } else {
      // jump toward clicked card
      snapToCard(index);
      stopAutoplay();
      startAutoplay();
    }
  };

  // Manual navigation handlers for buttons
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    snapToCard(currentIndex - 1);
    stopAutoplay();
    startAutoplay();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    snapToCard(currentIndex + 1);
    stopAutoplay();
    startAutoplay();
  };

  // keyboard navigation (left / right)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") snapToCard(currentIndex + 1);
      if (e.key === "ArrowLeft") snapToCard(currentIndex - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex, isAnimating]);

  // touch swipe handlers (mobile)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchEndX.current = null;
    };
    const onTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
    };
    const onTouchEnd = () => {
      if (touchStartX.current == null || touchEndX.current == null) {
        touchStartX.current = touchEndX.current = null;
        return;
      }
      const dx = touchEndX.current - touchStartX.current;
      if (Math.abs(dx) > 50) {
        if (dx < 0) snapToCard(currentIndex + 1);
        else snapToCard(currentIndex - 1);
        stopAutoplay();
        startAutoplay();
      }
      touchStartX.current = touchEndX.current = null;
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd);

    return () => {
      container.removeEventListener("touchstart", onTouchStart as EventListener);
      container.removeEventListener("touchmove", onTouchMove as EventListener);
      container.removeEventListener("touchend", onTouchEnd as EventListener);
    };
  }, [currentIndex]);

  // styles for desktop overlapping carousel
  function cardStyleForDesktop(position: number) {
    const abs = Math.abs(position);
    const baseTranslate = position * 380; // distance between centers
    if (abs === 0) {
      return {
        transform: `translateX(${baseTranslate}px) scale(1)`,
        filter: "blur(0px)",
        opacity: 1,
        zIndex: 50,
        pointerEvents: "auto" as const,
      };
    } else if (abs === 1) {
      return {
        transform: `translateX(${baseTranslate}px) scale(0.92)`,
        filter: "blur(4px)",
        opacity: 1,
        zIndex: 40,
        pointerEvents: "auto" as const,
      };
    } else {
      const off = position > 0 ? 900 : -900;
      return {
        transform: `translateX(${off}px) scale(0.72)`,
        filter: "blur(10px)",
        opacity: 0,
        zIndex: 10,
        pointerEvents: "none" as const,
      };
    }
  }

  const isActiveIndicator = (i: number) => normalize(i) === normalize(currentIndex);

  return (
    <section className="testimonials-section bg-white w-full min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden relative">
      {/* decorative blobs */}
      <div className="absolute left-[-400px] top-[100px] w-[800px] h-[400px] opacity-20 mix-blend-multiply pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-blue-400/10 to-transparent blur-2xl" />
      </div>
      <div className="absolute right-[-400px] bottom-[100px] w-[800px] h-[400px] opacity-15 mix-blend-multiply pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/15 via-cyan-400/8 to-transparent blur-2xl" />
      </div>

      <div className="max-w-[1681px] mx-auto px-5 w-full relative z-10">
        <h2 className="text-5xl md:text-6xl lg:text-[82px] text-black font-medium leading-tight lg:leading-[90px] text-center tracking-[-1.2px] mb-12 lg:mb-24">
          Trusted by companies
        </h2>

        {/* If not mounted yet we render the mobile layout (this matches server) */}
        {!mounted || !isDesktop ? (
          <div
            className="relative w-full flex items-center justify-center px-4"
            ref={containerRef}
            onMouseEnter={() => stopAutoplay()}
            onMouseLeave={() => startAutoplay()}
          >
            <div className="w-full max-w-[900px]">
              <div className="relative">
                {/* --- LEFT BUTTON (Mobile/Tablet) --- */}
                <button
                  onClick={handlePrev}
                  className="absolute left-[-15px] sm:left-[-25px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-black hover:scale-105 transition-all focus:outline-none"
                  aria-label="Previous testimonial"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>

                {/* --- CARDS --- */}
                {testimonials.map((t, idx) => {
                  const isCenter = normalize(idx) === normalize(currentIndex);
                  return (
                    <div
                      key={idx}
                      role="button"
                      aria-label={`testimonial ${idx + 1}`}
                      tabIndex={isCenter ? 0 : -1}
                      onClick={() => isCenter && handleCardClick(idx)}
                      className={`mx-auto rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-transform duration-500 ${
                        isCenter ? "relative" : "hidden"
                      }`}
                      style={{
                        height: 420,
                        background: "white",
                        pointerEvents: isCenter ? "auto" : "none",
                      }}
                    >
                      <div className="h-full p-6 md:p-8 flex flex-col justify-between">
                        <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">{`"${t.quote}"`}</p>
                        <div className="flex items-center justify-between mt-6">
                          <div className="h-[44px] w-[160px] md:h-[62px] md:w-[219px] flex-shrink-0">
                            <img
                              alt="Company Logo"
                              className="w-full h-full object-contain"
                              src={t.logo}
                              draggable={false}
                            />
                          </div>
                          <p className="text-base md:text-lg font-semibold">{t.author}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* --- RIGHT BUTTON (Mobile/Tablet) --- */}
                <button
                  onClick={handleNext}
                  className="absolute right-[-15px] sm:right-[-25px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-black hover:scale-105 transition-all focus:outline-none"
                  aria-label="Next testimonial"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Desktop layout (mounted && isDesktop)
          <div
            className="relative w-full h-[600px] flex items-center justify-center overflow-visible px-4"
            ref={containerRef}
            onMouseEnter={() => stopAutoplay()}
            onMouseLeave={() => startAutoplay()}
          >
            <div className="relative w-full max-w-[2200px] h-full flex items-center justify-center">
              {testimonials.map((t, idx) => {
                const pos = getPosition(idx);
                const style = cardStyleForDesktop(pos);

                return (
                  <div
                    key={idx}
                    role="button"
                    aria-label={`testimonial ${idx + 1}`}
                    tabIndex={0}
                    onClick={() => handleCardClick(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleCardClick(idx);
                    }}
                    className="testimonial-card absolute top-1/2 left-1/2 cursor-pointer"
                    style={{
                      width: 700,
                      marginLeft: -350,
                      marginTop: -300,
                      transformOrigin: "center center",
                      transition: `transform ${transitionMs}ms cubic-bezier(.33,1,.68,1), filter ${transitionMs}ms cubic-bezier(.33,1,.68,1), opacity ${transitionMs}ms cubic-bezier(.33,1,.68,1)`,
                      ...style,
                    }}
                  >
                    <div className="rounded-3xl shadow-2xl p-8 md:p-10 flex flex-col gap-8 md:gap-12 h-full bg-white border border-neutral-200">
                      <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed md:leading-[38px] tracking-wide">
                        "{t.quote}"
                      </p>

                      <div className="flex items-center justify-between gap-8 md:gap-12">
                        <div className="h-[50px] md:h-[62px] w-[180px] md:w-[219px] flex-shrink-0">
                          <img
                            alt="Company Logo"
                            className="w-full h-full object-contain"
                            src={t.logo}
                            draggable={false}
                          />
                        </div>
                        <p className="text-lg md:text-xl text-black leading-relaxed font-semibold whitespace-nowrap">
                          {t.author}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Dots / indicators (shared) */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                snapToCard(i);
                stopAutoplay();
                startAutoplay();
              }}
              className={`h-2 rounded-full transition-all ${
                isActiveIndicator(i) ? "bg-black w-10" : "bg-neutral-300 w-2"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}