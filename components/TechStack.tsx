"use client";

import LogoLoop from './LogoLoop';
// Uncomment when react-icons is installed:
// import { 
//   SiReact, 
//   SiNextdotjs, 
//   SiTypescript, 
//   SiJavascript,
//   SiPostgresql,
//   SiWordpress,
//   SiNpm,
//   SiSpring,
//   SiMicrosoftazure,
//   SiGooglecloud,
//   SiFigma,
//   SiSvelte,
//   SiPhp,
//   SiTailwindcss,
//   SiHtml5,
//   SiCss3,
//   SiFirebase,
//   SiVercel,
//   SiAngular,
//   SiKubernetes,
//   SiLaravel,
//   SiFlutter,
//   SiMysql
// } from 'react-icons/si';

// Top row logos - scrolls left → right (direction="right")
// Based on Figma design: WordPress, npm, PostgreSQL, JavaScript, Spring Boot, Next.js, Azure, Google Cloud, Figma, React, Svelte, JavaScript
const techLogosTop = [
  // Using images for now - can be replaced with react-icons when available
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
  
  // Example with react-icons (uncomment when react-icons is installed):
  // { node: <SiReact />, title: "React", href: "https://react.dev" },
  // { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  // { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
];

// Bottom row logos - scrolls right → left (direction="left")
// Based on Figma design: PHP, Tailwind CSS, HTML5, CSS3, Firebase, Vercel, Angular, Kubernetes, Laravel, Flutter, MySQL
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
  
  // Example with react-icons (uncomment when react-icons is installed):
  // { node: <SiTypescript />, title: "TypeScript", href: "https://typescriptlang.org" },
  // { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

export default function TechStack() {
  return (
    <div className="p-[45px]">
    <section className="bg-[#131518] min-h-[674px] overflow-hidden rounded-[23.408px] relative py-20">
      <div className="max-w-[1593px] mx-auto px-5 flex flex-col gap-24">
        {/* Heading Section */}
        <div className="text-center flex flex-col gap-6">
          <h2 className="text-[62px] text-white font-medium tracking-[1.88px] leading-[84px] font-['Manrope',sans-serif]">
            Tech stack we use
          </h2>
          <p className="text-[29px] text-[#71757f] leading-[33px]">
            Powerful Tools and Modern Frameworks We're Actively Using to Stay Ahead and Build What's Next
          </p>
        </div>

        {/* Top row: scrolls left → right (direction="right") */}
        <LogoLoop
          logos={techLogosTop}
          speed={120}
          direction="right"
          logoHeight={48}
          gap={40}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#131518"
          ariaLabel="Top row tech stack logos"
        />

        {/* Bottom row: scrolls right → left (direction="left") */}
        <LogoLoop
          logos={techLogosBottom}
          speed={120}
          direction="left"
          logoHeight={48}
          gap={40}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#131518"
          ariaLabel="Bottom row tech stack logos"
        />
      </div>
    </section>
    </div>
  );
}
