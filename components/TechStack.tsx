"use client";

import { useLayoutEffect, useState } from "react";
import LogoLoop from "./LogoLoop";
import { getTechLogo, getTechName, hasValidLogo } from "@/lib/techLogos";

const img1 = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop";
const img2 = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop";
const img3 = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop";

// Define tech stack using API-based logos
const techLogosTop = [
  { techKey: "wordpress", href: "https://wordpress.org" },
  { techKey: "npm", href: "https://www.npmjs.com" },
  { techKey: "postgresql", href: "https://www.postgresql.org" },
  { techKey: "javascript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { techKey: "nodejs", href: "https://nodejs.org" },
  { techKey: "aws", href: "https://aws.amazon.com" },
  { techKey: "azure", href: "https://azure.microsoft.com" },
  { techKey: "gcp", href: "https://cloud.google.com" },
  { techKey: "figma", href: "https://www.figma.com" },
  { techKey: "react", href: "https://react.dev" },
  { techKey: "firebase", href: "https://firebase.google.com" },
  { techKey: "html5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
];

const techLogosBottom = [
  { techKey: "mysql", href: "https://www.mysql.com" },
  { techKey: "kubernetes", href: "https://kubernetes.io" },
  { techKey: "cloudflare", href: "https://www.cloudflare.com" },
  { techKey: "docker", href: "https://www.docker.com" },
  { techKey: "git", href: "https://git-scm.com" },
  { techKey: "github", href: "https://github.com" },
  { techKey: "nextjs", href: "https://nextjs.org" },
  { techKey: "tailwind", href: "https://tailwindcss.com" },
  { techKey: "typescript", href: "https://www.typescriptlang.org" },
  { techKey: "python", href: "https://www.python.org" },
  { techKey: "mongodb", href: "https://www.mongodb.com" },
];

// Transform tech data to logo format
const getLogos = (techArray: typeof techLogosTop) => 
  techArray
    .filter(({ techKey }) => hasValidLogo(techKey))
    .map(({ techKey, href }) => ({
      src: getTechLogo(techKey),
      alt: getTechName(techKey),
      title: getTechName(techKey),
      href,
    }));

export default function TechStack() {
  // Responsive control for logo size + speed
  const [logoHeight, setLogoHeight] = useState<number>(48);
  const [speed, setSpeed] = useState<number>(120);
  const [gap, setGap] = useState<number>(40);

  useLayoutEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      // Logo height - smaller on mobile
      if (w >= 1536) { // 2xl and bigger
        setLogoHeight(56);
        setSpeed(50);
        setGap(48);
      } else if (w >= 1280) { // xl
        setLogoHeight(48);
        setSpeed(40);
        setGap(44);
      } else if (w >= 1024) { // lg (desktop)
        setLogoHeight(48);
        setSpeed(40);
        setGap(40);
      } else if (w >= 640) { // md / tablet
        setLogoHeight(38);
        setSpeed(40);
        setGap(32);
      } else { // mobile - reduced from 36 to 28
        setLogoHeight(28);
        setSpeed(40);
        setGap(24);
      }
    };

    update();
    let rafId: number | null = null;
    const onResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="p-6 sm:p-8 md:p-10 lg:p-[45px]">
      <section
        className="bg-[#131518] rounded-[23.408px] relative overflow-hidden"
        style={{ minHeight: 0 }}
      >
        <div className="max-w-[1593px] mx-auto px-5 py-12 md:py-16 lg:py-20 flex flex-col gap-12 md:gap-20">
          {/* Heading Section */}
          <div className="text-center flex flex-col gap-4 md:gap-6 px-4">
            <h2
              className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[62px] text-white font-medium tracking-[0.6px] lg:tracking-[1.88px] leading-[1.05] lg:leading-[84px] font-['Manrope',sans-serif]"
            >
              Tech stack we use
            </h2>
            <p className="max-w-[1000px] mx-auto text-[15px] sm:text-[17px] md:text-[20px] lg:text-[29px] text-[#71757f] leading-[1.2] md:leading-[1.25]">
              Powerful tools and modern frameworks we're actively using to stay ahead and build what's next.
            </p>
          </div>

          {/* Top row: scrolls left → right (direction="right") */}
          <div className="w-full">
            <LogoLoop
              logos={getLogos(techLogosTop)}
              speed={speed}
              direction="right"
              logoHeight={logoHeight}
              gap={gap}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#131518"
              ariaLabel="Top row tech stack logos"
            />
          </div>

          {/* Bottom row: scrolls right → left (direction="left") */}
          <div className="w-full">
            <LogoLoop
              logos={getLogos(techLogosBottom)}
              speed={speed}
              direction="left"
              logoHeight={logoHeight}
              gap={gap}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#131518"
              ariaLabel="Bottom row tech stack logos"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
