"use client";

import { useEffect, useRef, useState } from "react";
import type React from "react";
import type { CSSProperties } from "react";
import { testimonials } from "@/lib/testimonials";
import type { Testimonial } from "@/lib/testimonials";

/* ─── helpers ─── */
function getCompanyName(t: Testimonial) {
  return t.company || t.author;
}

function getDomain(link: string) {
  try {
    return new URL(link).hostname.replace("www.", "");
  } catch {
    return link;
  }
}

/* ═══════════════════════════════════════════════════════════════
   Modal
   ═══════════════════════════════════════════════════════════════ */
function TestimonialModal({
  t,
  onClose,
}: {
  t: Testimonial;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    const seekTo = pct * duration;
    videoRef.current.currentTime = seekTo;
    setCurrentTime(seekTo);
  };

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const formatTime = (s: number) => {
    if (!Number.isFinite(s) || s < 0) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex min-h-full items-start sm:items-center justify-center p-4 py-8 sm:py-12">
        <div
          className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition-colors shadow-sm"
            aria-label="Close modal"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Media area */}
          <div className="relative rounded-t-2xl overflow-hidden bg-neutral-100">
            {/* Logo chip overlay */}
            <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 bg-white rounded-full px-3 py-1.5 shadow-md">
              <img
                src={t.logo}
                alt={getCompanyName(t)}
                className="h-5 w-auto object-contain"
                draggable={false}
              />
            </div>

            {t.video ? (
              <div className="relative flex flex-col items-center justify-center min-h-[300px] max-h-[440px] bg-neutral-900">
                <video
                  ref={videoRef}
                  src={t.video}
                  className="h-full max-h-[400px] w-auto object-contain"
                  autoPlay
                  muted
                  loop
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onClick={togglePlayPause}
                />
                {/* Controls bar */}
                <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center gap-2 px-3 py-2 bg-gradient-to-t from-black/80 to-transparent">
                  <button
                    onClick={togglePlayPause}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-neutral-800 transition-all flex-shrink-0"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                  <div
                    className="flex-1 h-1.5 bg-white/30 rounded-full cursor-pointer overflow-hidden"
                    onClick={handleProgressClick}
                    role="progressbar"
                    aria-valuenow={Math.round(progressPct)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="h-full bg-white rounded-full transition-[width] duration-150"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <span className="text-white/90 text-xs tabular-nums flex-shrink-0 min-w-[2.5rem] text-right">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                  <button
                    onClick={toggleMute}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-neutral-800 transition-all flex-shrink-0"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ) : t.image ? (
              <div className="relative h-[260px] sm:h-[400px] bg-neutral-900 border-b border-neutral-200">
                <img
                  src={t.image}
                  alt={getCompanyName(t)}
                  className="w-full h-full object-cover opacity-95"
                  draggable={false}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-[260px] bg-gradient-to-br from-neutral-50 to-neutral-100">
                <img
                  src={t.logo}
                  alt={getCompanyName(t)}
                  className="max-w-[220px] max-h-[110px] object-contain"
                  draggable={false}
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Author */}
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-xl font-bold text-blue-600">{t.author},</h3>
              {t.role && (
                <span className="text-neutral-500 text-base">
                  {t.role}
                  {t.company ? `, ${t.company}` : ""}
                </span>
              )}
            </div>

            {/* Quote */}
            <p className="mt-5 text-neutral-700 leading-relaxed text-[15px] sm:text-base">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* About */}
            {t.description && (
              <div className="mt-6 pt-5 border-t border-neutral-100">
                <p className="text-blue-500 text-sm font-medium mb-1.5">
                  About {getCompanyName(t)}
                </p>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {t.description}
                </p>
              </div>
            )}

            {/* Visit link */}
            {t.link && (
              <div className="mt-4">
                <a
                  href={t.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-500 text-sm font-medium hover:text-blue-700 hover:underline transition-colors"
                >
                  Visit {getDomain(t.link)}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Card (light theme — matches website)
   ═══════════════════════════════════════════════════════════════ */
function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="rounded-2xl bg-white border border-neutral-200 shadow-lg overflow-hidden h-full flex flex-col cursor-pointer group/card hover:shadow-xl hover:border-neutral-300 transition-all duration-300">
      {/* Logo chip */}
      <div className="p-5 pb-0">
        <div className="inline-flex items-center gap-2 bg-neutral-50 border border-neutral-100 rounded-full px-3 py-1.5">
          <img
            src={t.logo}
            alt={getCompanyName(t)}
            className="h-5 w-auto object-contain max-w-[110px]"
            draggable={false}
          />
        </div>
      </div>

      {/* Image area — company logo on subtle bg */}
      <div className="relative flex-1 mx-5 mt-4 rounded-xl bg-neutral-50 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover/card:scale-[1.01]">
        <img
          src={t.image || t.logo}
          alt={getCompanyName(t)}
          className={
            t.image
              ? "w-full h-full object-cover"
              : "w-[50%] max-h-[100px] object-contain opacity-80"
          }
          draggable={false}
        />
        {/* Play icon hint for video cards */}
        {t.video && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/80 shadow-md flex items-center justify-center text-neutral-600 group-hover/card:scale-110 transition-transform">
              <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 pt-4">
        <h3 className="text-neutral-900 font-bold text-base sm:text-lg leading-snug">
          {t.author}
        </h3>
        {t.role && (
          <p className="text-neutral-400 text-xs sm:text-sm mt-0.5">
            {t.role}
            {t.company ? `, ${t.company}` : ""}
          </p>
        )}
        <p className="text-neutral-500 text-xs sm:text-sm mt-2 sm:mt-3 line-clamp-3 leading-relaxed">
          {t.quote}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Testimonials Section
   ═══════════════════════════════════════════════════════════════ */
export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState<number>(2);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const autoplayRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);
  const isScrolling = useRef<boolean>(false);

  const total = testimonials.length;
  const transitionMs = 600;

  /* ── lifecycle ── */
  useEffect(() => {
    setMounted(true);
    const update = () => setIsDesktop(window.innerWidth >= 1280);
    update();
    const onResize = () => requestAnimationFrame(update);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── carousel helpers ── */
  const normalize = (i: number): number => {
    let idx = i % total;
    if (idx < 0) idx += total;
    return idx;
  };

  const getPosition = (cardIndex: number): number => {
    let diff = cardIndex - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  /* ── autoplay ── */
  function startAutoplay() {
    stopAutoplay();
    autoplayRef.current = window.setInterval(() => {
      if (isScrolling.current) return;
      setCurrentIndex((prev) => normalize(prev + 1));
    }, 5000);
  }

  function stopAutoplay() {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }

  useEffect(() => {
    if (modalIndex !== null) {
      stopAutoplay();
      return;
    }
    startAutoplay();
    return stopAutoplay;
  }, [currentIndex, isDesktop, modalIndex]);

  /* ── modal: escape to close (no body scroll lock — avoids jitter) ── */
  useEffect(() => {
    if (modalIndex === null) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [modalIndex]);

  /* ── modal handlers ── */
  const openModal = (index: number) => {
    setModalIndex(index);
    stopAutoplay();
  };

  const closeModal = () => {
    setModalIndex(null);
    startAutoplay();
  };

  /* ── scroll helpers ── */
  const scrollToCard = (index: number, smooth = true) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const card = container.querySelector(
      `[data-index="${index}"]`
    ) as HTMLElement | null;
    if (!card) return;
    isScrolling.current = true;
    const containerWidth = container.offsetWidth;
    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;
    const scrollLeft = cardLeft - (containerWidth - cardWidth) / 2;
    container.scrollTo({
      left: scrollLeft,
      behavior: smooth ? "smooth" : "auto",
    });
    window.setTimeout(() => {
      isScrolling.current = false;
    }, smooth ? 600 : 0);
  };

  useEffect(() => {
    if (!isDesktop && scrollContainerRef.current && mounted) {
      scrollToCard(currentIndex, true);
    }
  }, [currentIndex, isDesktop, mounted]);

  const snapToCard = (target: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    const normalizedTarget = normalize(target);
    setCurrentIndex(normalizedTarget);
    if (!isDesktop && scrollContainerRef.current) {
      scrollToCard(normalizedTarget);
    }
    window.setTimeout(() => setIsAnimating(false), transitionMs);
  };

  /* ── click handlers ── */
  const handleCardClick = (index: number) => {
    if (index === currentIndex) {
      openModal(index);
      return;
    }
    snapToCard(index);
    stopAutoplay();
    startAutoplay();
  };

  const handleMobileCardClick = (index: number) => {
    if (index === currentIndex) {
      openModal(index);
    }
  };

  /* ── keyboard ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (modalIndex !== null) return;
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
  }, [currentIndex, isAnimating, modalIndex]);

  /* ── mobile scroll detection ── */
  useEffect(() => {
    if (isDesktop || !scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    let scrollTimeout: number | null = null;

    const handleScroll = () => {
      if (isScrolling.current) return;
      stopAutoplay();
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        const containerWidth = container.offsetWidth;
        const scrollLeft = container.scrollLeft;
        const innerFlex = container.children[0] as HTMLElement;
        const firstCard = innerFlex.querySelector(
          '[data-index="0"]'
        ) as HTMLElement | null;
        if (!firstCard) return;
        const cardWidth = firstCard.offsetWidth;
        const gap = window.innerWidth >= 640 ? 24 : 16;
        const card0Left = firstCard.offsetLeft;
        const centerOffset = (containerWidth - cardWidth) / 2;
        const zeroScroll = card0Left - centerOffset;
        const calculatedIndex = Math.round(
          (scrollLeft - zeroScroll) / (cardWidth + gap)
        );
        const newIndex = Math.max(0, Math.min(calculatedIndex, total - 1));
        if (newIndex !== currentIndex) setCurrentIndex(newIndex);
        startAutoplay();
      }, 150);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [isDesktop, currentIndex]);

  /* ── touch swipe (mobile) ── */
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isDesktop) return;
    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchEndX.current = null;
      isDragging.current = false;
      stopAutoplay();
    };
    const onTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
      if (
        touchStartX.current !== null &&
        touchEndX.current !== null &&
        Math.abs(touchEndX.current - touchStartX.current) > 10
      )
        isDragging.current = true;
    };
    const onTouchEnd = () => {
      touchStartX.current = touchEndX.current = null;
      isDragging.current = false;
      startAutoplay();
    };
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd);
    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [currentIndex, isDesktop]);

  /* ── desktop card positioning (larger cards: 700×460) ── */
  function cardStyleForDesktop(
    position: number
  ): CSSProperties & { zIndex: number; opacity: number } {
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

  const isActiveIndicator = (i: number) =>
    normalize(i) === normalize(currentIndex);

  /* ═══════════════════════════════════ RENDER ═══════════════════════════════════ */
  return (
    <>
      <section className="testimonials-section bg-white w-full flex flex-col items-center justify-start py-8 sm:py-10 lg:py-14 overflow-hidden relative">
        {/* decorative blobs */}
        <div className="absolute left-[-400px] top-[100px] w-[800px] h-[400px] opacity-20 mix-blend-multiply pointer-events-none">
          <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-blue-400/10 to-transparent blur-2xl" />
        </div>
        <div className="absolute right-[-400px] bottom-[100px] w-[800px] h-[400px] opacity-15 mix-blend-multiply pointer-events-none">
          <div className="absolute inset-0 bg-gradient-radial from-cyan-500/15 via-cyan-400/8 to-transparent blur-2xl" />
        </div>

        <div className="max-w-[1681px] mx-auto px-4 sm:px-6 lg:px-6 xl:px-[70px] w-full relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[82px] text-black font-medium leading-tight lg:leading-[90px] text-center tracking-[-1.2px] mb-6 sm:mb-8 lg:mb-10">
            Trusted by companies
          </h2>

          {/* ─── Mobile / Tablet ─── */}
          {!mounted || !isDesktop ? (
            <div className="w-full">
              <div
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div className="flex gap-4 sm:gap-6 px-[7%] sm:px-[15%] md:px-[20%] pb-2">
                  {testimonials.map((t, idx) => (
                    <div
                      key={idx}
                      data-index={idx}
                      className="snap-center shrink-0 w-[86%] sm:w-[70%] md:w-[60%] h-[460px] sm:h-[480px] transition-opacity duration-500 cursor-pointer"
                      style={{ opacity: currentIndex === idx ? 1 : 0.7 }}
                      onClick={() => handleMobileCardClick(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          handleMobileCardClick(idx);
                      }}
                    >
                      <TestimonialCard t={t} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ─── Desktop Carousel ─── */
            <div
              className="relative w-full h-[460px] flex items-center justify-center overflow-visible px-4"
              ref={containerRef}
              onMouseEnter={() => stopAutoplay()}
              onMouseLeave={() => {
                if (modalIndex === null) startAutoplay();
              }}
            >
              <div className="relative w-full max-w-[2200px] h-full flex items-center justify-center">
                {testimonials.map((t, idx) => {
                  const pos = getPosition(idx);
                  const style = cardStyleForDesktop(pos);

                  return (
                    <div
                      key={idx}
                      role="button"
                      aria-label={`testimonial ${idx + 1} - click to expand`}
                      tabIndex={0}
                      onClick={() => handleCardClick(idx)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          handleCardClick(idx);
                      }}
                      className="testimonial-card absolute top-1/2 left-1/2 cursor-pointer"
                      style={{
                        width: 700,
                        height: 460,
                        marginLeft: -350,
                        marginTop: -230,
                        transformOrigin: "center center",
                        transition: `transform ${transitionMs}ms cubic-bezier(.33,1,.68,1), filter ${transitionMs}ms cubic-bezier(.33,1,.68,1), opacity ${transitionMs}ms cubic-bezier(.33,1,.68,1)`,
                        ...style,
                      }}
                    >
                      <TestimonialCard t={t} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  snapToCard(i);
                  stopAutoplay();
                  startAutoplay();
                }}
                className={`h-2 rounded-full transition-all duration-300 ${isActiveIndicator(i)
                  ? "bg-black w-8 sm:w-10"
                  : "bg-neutral-300 w-2"
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Modal (outside section to avoid overflow clipping) ─── */}
      {modalIndex !== null && (
        <TestimonialModal
          t={testimonials[modalIndex]}
          onClose={closeModal}
        />
      )}
    </>
  );
}
