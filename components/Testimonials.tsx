"use client";

import { useEffect, useRef, useState } from "react";

const imgZirklyFullLogo1 = "/images/logo.png";

const testimonials = new Array(5).fill(null).map(() => ({
  quote:
    "As an entrepreneur, I needed to get my new website delivered in a timely and effective manner. Finding someone to do the work was not difficult, but finding someone that could do the work by sharing my company values and vision, wasn't. They delivered the project on time with high quality and excellent communication.",
  author: "Sujith Chellappan",
  logo: imgZirklyFullLogo1,
}));

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState<number>(2);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  const autoplayRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);

  const total = testimonials.length;
  const transitionMs = 600;

  useEffect(() => {
    setMounted(true);
    const update = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    update();
    const onResize = () => {
      requestAnimationFrame(update);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
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
    if (Math.abs(pos) <= 1) {
      snapToCard(index);
      stopAutoplay();
      startAutoplay();
    } else {
      snapToCard(index);
      stopAutoplay();
      startAutoplay();
    }
  };

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        snapToCard(currentIndex + 1);
        stopAutoplay();
        startAutoplay();
      }
      if (e.key === "ArrowLeft") {
        snapToCard(currentIndex - 1);
        stopAutoplay();
        startAutoplay();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex, isAnimating]);

  // Touch swipe handlers for mobile
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchEndX.current = null;
      isDragging.current = false;
    };
    
    const onTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
      if (touchStartX.current && Math.abs(touchEndX.current - touchStartX.current) > 10) {
        isDragging.current = true;
      }
    };
    
    const onTouchEnd = () => {
      if (touchStartX.current == null || touchEndX.current == null) {
        touchStartX.current = touchEndX.current = null;
        isDragging.current = false;
        return;
      }
      const dx = touchEndX.current - touchStartX.current;
      if (Math.abs(dx) > 50) {
        if (dx < 0) {
          snapToCard(currentIndex + 1);
        } else {
          snapToCard(currentIndex - 1);
        }
        stopAutoplay();
        startAutoplay();
      }
      touchStartX.current = touchEndX.current = null;
      isDragging.current = false;
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

  function cardStyleForDesktop(position: number) {
    const abs = Math.abs(position);
    const baseTranslate = position * 380;
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
    <section className="
  testimonials-section
  bg-white
  w-full
  flex
  items-start
  lg:items-center
  justify-center
  py-10
  sm:py-10
  lg:py-20
  overflow-hidden
  relative
">


      {/* decorative blobs */}
      <div className="absolute left-[-400px] top-[100px] w-[800px] h-[400px] opacity-20 mix-blend-multiply pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-blue-400/10 to-transparent blur-2xl" />
      </div>
      <div className="absolute right-[-400px] bottom-[100px] w-[800px] h-[400px] opacity-15 mix-blend-multiply pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/15 via-cyan-400/8 to-transparent blur-2xl" />
      </div>

      <div className="max-w-[1681px] mx-auto px-4 sm:px-5 w-full relative z-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[82px] text-black font-medium leading-tight lg:leading-[90px] text-center tracking-[-1.2px] mb-8 sm:mb-12 lg:mb-24">
          Trusted by companies
        </h2>

        {!mounted || !isDesktop ? (
          // Mobile/Tablet Layout - Swipeable, no buttons
          <div
            className="relative w-full flex items-center justify-center"
            ref={containerRef}
            onMouseEnter={() => stopAutoplay()}
            onMouseLeave={() => startAutoplay()}
          >
            <div className="w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px]">
              <div className="relative touch-pan-y">
                {testimonials.map((t, idx) => {
                  const isCenter = normalize(idx) === normalize(currentIndex);
                  return (
                    <div
                      key={idx}
                      className={`mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-xl transition-all duration-500 ${
                        isCenter ? "relative opacity-100 scale-100" : "hidden opacity-0 scale-95"
                      }`}
                      style={{
                        background: "white",
                        pointerEvents: isCenter ? "auto" : "none",
                      }}
                    >
                      <div className="h-full p-5 sm:p-6 md:p-8 flex flex-col justify-between gap-4 sm:gap-6">
                        <p className="text-base sm:text-lg md:text-xl text-neutral-700 leading-relaxed">
                          "{t.quote}"
                        </p>
                        <div className="flex items-center justify-between gap-4">
                          <div className="h-[36px] w-[130px] sm:h-[44px] sm:w-[160px] md:h-[50px] md:w-[180px] flex-shrink-0">
                            <img
                              alt="Company Logo"
                              className="w-full h-full object-contain"
                              src={t.logo}
                              draggable={false}
                            />
                          </div>
                          <p className="text-sm sm:text-base md:text-lg font-semibold text-black">
                            {t.author}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          // Desktop layout
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

        {/* Dots indicators */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                snapToCard(i);
                stopAutoplay();
                startAutoplay();
              }}
              className={`h-2 rounded-full transition-all ${
                isActiveIndicator(i) ? "bg-black w-8 sm:w-10" : "bg-neutral-300 w-2"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}