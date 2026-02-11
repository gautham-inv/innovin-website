"use client";

import { useLayoutEffect, useState } from "react";
import LogoLoop from "./LogoLoop";
import { getTechLogo, getTechName, hasValidLogo } from "@/lib/techLogos";

const img1 = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop";
const img2 = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop";
const img3 = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop";

import Link from "next/link";
import { techStackData } from "@/lib/techStackData";

const EXCLUDED_LOGOS = [
  "AWS", // Showing AWS
  "AWS Bedrock", // Showing AWS Bedrock
  "S3",
  "EC2",
  "Lambda",
  "RDS",
  "API Gateway",
  "SES",
  "Route53",
  "ELB",
  "IAM",
  "BeautifulSoup",
  "Flask",
  "Expo",
  "Sonarqube",
  "OpenAI",
  "LangChain",
  "Mixpanel",
  "JWT",
  "Auth0",
  "Cursor",
  "Windsurf",
  "Locofy",
  "Vercel",
  "Bluehost",
  "GoDaddy",
  "Squarespace",
  "Render",
  "GitHub",
];

// Extract all items from techStackData for the loop, filtering out logos that don't look good on dark BG
const allTechItems = techStackData
  .flatMap((category) => category.items)
  .filter((item) => !EXCLUDED_LOGOS.includes(item.name));

// Split them into top and bottom rows for the animation
const DARK_BG_OVERRIDES: Record<string, string> = {
  "MCP": "https://res.cloudinary.com/dejb29i0k/image/upload/f_auto,q_auto/v1770624325/mcp-new_1_lhbrcq.png",
  "Django": "https://res.cloudinary.com/dejb29i0k/image/upload/f_auto,q_auto/v1770624326/django-white_nc5wnz.png",
  "Sentry": "https://res.cloudinary.com/dejb29i0k/image/upload/f_auto,q_auto/v1770624326/sentry-red_pzyerv.png",
  "gRPC": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grpc/grpc-original.svg"
};

const midIndex = Math.ceil(allTechItems.length / 2);
const techLogosTop = allTechItems.slice(0, midIndex).map((item) => ({
  src: DARK_BG_OVERRIDES[item.name] || item.icon,
  alt: item.name,
  title: item.name,
  href: item.href,
}));

const techLogosBottom = allTechItems.slice(midIndex).map((item) => ({
  src: DARK_BG_OVERRIDES[item.name] || item.icon,
  alt: item.name,
  title: item.name,
  href: item.href,
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
    <div className="px-4 sm:px-6 lg:px-6 xl:px-[70px] mt-10 sm:mt-16 lg:mt-20 mb-10 sm:mb-16 lg:mb-20">
      <section
        className="bg-[#131518] rounded-[23.408px] relative overflow-hidden max-w-[1681px] mx-auto"
        style={{ minHeight: 0 }}
      >
        <div className="max-w-[1681px] mx-auto px-5 py-12 md:py-16 lg:py-20 flex flex-col gap-12 md:gap-20">
          {/* Heading Section */}
          <div className="text-center flex flex-col gap-4 sm:gap-5 lg:gap-6 px-4">
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
              logos={techLogosTop}
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
              logos={techLogosBottom}
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

          {/* View All Button */}
          <div className="flex justify-center mt-8">
            <Link
              href="/tech-stack"
              className="text-white border border-white/20 px-8 py-3 rounded-full hover:bg-white hover:text-[#131518] transition-all duration-300 font-medium"
            >
              View full tech stack
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
