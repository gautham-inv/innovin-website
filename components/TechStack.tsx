"use client";

import { useLayoutEffect, useState } from "react";
import LogoLoop from "./LogoLoop";

const img1 = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop";
const img2 = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop";
const img3 = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop";

const techLogosTop = [
  { src: "/images/d1f3457c582c326cacd5999f9462244cd0b086a6.svg", alt: "WordPress", title: "WordPress", href: "https://wordpress.org" },
  { src: "/images/d1fe1a927e11f7d2b0833f603607ab2e0464cb5b.svg", alt: "npm", title: "npm", href: "https://www.npmjs.com" },
  { src: "/images/d6bfd701a788246b82a09a8007bc04b677cc62ba.svg", alt: "PostgreSQL", title: "PostgreSQL", href: "https://www.postgresql.org" },
  { src: "/images/0af3641ecb5ea7fd5f0667678b682dac4173e8be.svg", alt: "JavaScript", title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { src: "/images/2c612ef9a4f9e0710604d17da4a52c460b490b54.svg", alt: "Spring Boot", title: "Spring Boot", href: "https://spring.io/projects/spring-boot" },
  { src: "/images/6d43c8088e8df9a142241e9404a0f9ab98633139.svg", alt: "Next.js", title: "Next.js", href: "https://nextjs.org" },
  { src: "/images/7dd42279941dabce7e0b301fe90d489ca26ea081.svg", alt: "Azure", title: "Microsoft Azure", href: "https://azure.microsoft.com" },
  { src: "/images/96c0167700032892ddce94d351d540bacced94d7.svg", alt: "Google Cloud", title: "Google Cloud", href: "https://cloud.google.com" },
  { src: "/images/4076a00dcf114223bee46321b8b5539570416f58.svg", alt: "Figma", title: "Figma", href: "https://www.figma.com" },
  { src: "/images/4dd2dc87d646964956fdd937a05639c2b1e8ca99.svg", alt: "React", title: "React", href: "https://react.dev" },
  { src: "/images/736b413565258b845495ca4fece9c434674f0611.svg", alt: "Svelte", title: "Svelte", href: "https://svelte.dev" },
  { src: "/images/bfe81755eb2f120ba86e7beea698930ea938c495.svg", alt: "JavaScript", title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
];

const techLogosBottom = [
  { src: "/images/812700fa752137f1c86e9fdec5ec4cc56ad26459.svg", alt: "PHP", title: "PHP", href: "https://www.php.net" },
  { src: "/images/92237671aae3581d2a3e9740ba5ef3e9575a751a.svg", alt: "Tailwind CSS", title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { src: "/images/03f9caf8cbeb5f4da09a55c0ea692347b6b54889.svg", alt: "HTML5", title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { src: "/images/237b207eba33736dfdb80b599e5e675452062bf7.svg", alt: "CSS3", title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { src: "/images/243f3f2659df6453521c052e5106e549d31abe60.svg", alt: "Firebase", title: "Firebase", href: "https://firebase.google.com" },
  { src: "/images/2434594fe1772d6aba5c914d628d96ae9e7b83bc.svg", alt: "Vercel", title: "Vercel", href: "https://vercel.com" },
  { src: "/images/30e10ea8e914fc7e3b7c930fb0ab9e24eedb665b.svg", alt: "Angular", title: "Angular", href: "https://angular.io" },
  { src: "/images/df845869ea73e5f1c42dcc143944798263077906.svg", alt: "Kubernetes", title: "Kubernetes", href: "https://kubernetes.io" },
  { src: "/images/4e43daeb50bac0ce6e6f985139ee196def02c494.svg", alt: "Laravel", title: "Laravel", href: "https://laravel.com" },
  { src: "/images/37443694e9095109910764ac096467df5beab4fb.svg", alt: "Flutter", title: "Flutter", href: "https://flutter.dev" },
  { src: "/images/907350fc7dc8e6714e16460d08bac7c6cdcbc976.svg", alt: "MySQL", title: "MySQL", href: "https://www.mysql.com" },
];

export default function TechStack() {
  // Responsive control for logo size + speed
  const [logoHeight, setLogoHeight] = useState<number>(48);
  const [speed, setSpeed] = useState<number>(120);
  const [gap, setGap] = useState<number>(40);

  useLayoutEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      // Logo height
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
        setLogoHeight(42);
        setSpeed(40);
        setGap(36);
      } else { // mobile
        setLogoHeight(36);
        setSpeed(40);
        setGap(28);
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
        </div>
      </section>
    </div>
  );
}
