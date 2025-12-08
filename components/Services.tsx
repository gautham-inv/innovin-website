"use client";

import HorizontalScrollCarousel from "./HorizontalScrollCarousel";

const img1 = "/images/14f42026da7cb504578d95bd4fe568ba9d508990.png";
const img2 = "/images/40688c96c85b7fc360b2720ac8410be60bf7b82d.png";
const img3 = "/images/f7e1504dcfcf4d9d9e376a8efb89089a46d51dbe.png";

export default function Services() {
  const services = [
    {
      title: "Smart Product Development",
      description:
        "We're not just software consultants – we're your Trusted Tech Innovation Partner and efficiency architects.",
      image: img1,
    },
    {
      title: "Strategic Technology Consulting",
      description:
        "We're not just software consultants – we're your Trusted Tech Innovation Partner and efficiency architects.",
      image: img2,
    },
    {
      title: "Strategic AI Consulting",
      description:
        "We empower you with intelligent solutions, leveraging AI tools to solve specific business problems and achieve strategic goals.",
      image: img3,
    },
  ];

  return (
    <section id="services" className="bg-black overflow-hidden relative" style={{ paddingBottom: '0px' }}>
      {/* Background decorative ellipses */}
      <div className="absolute left-[-1388px] top-[243px] w-[1471px] h-[509px] opacity-40 mix-blend-screen pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/30 via-blue-400/20 to-transparent blur-3xl" />
      </div>
      <div className="absolute left-[-1388px] top-[243px] w-[1471px] h-[509px] opacity-30 mix-blend-screen pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-cyan-400/10 to-transparent blur-3xl" />
      </div>

      {/* WRAPPER — EVERYTHING INSIDE THIS GETS PINNED */}
      <div
        id="services-pin-wrapper"
        className="relative w-full min-h-screen overflow-hidden pt-[40px]"
      >
        {/* Fade edge overlay on left side to hide cards under text */}
        <div className="absolute left-0 top-0 bottom-0 w-[200px] z-30 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 200px, rgba(0,0,0,0.15) 300px, rgba(0,0,0,0.05), transparent 450px)'
          }}
        />

        {/* Static title - positioned on the left side with background */}
        <div className="absolute left-[80px] top-[301px] z-40">
          <h2 className="text-[64px] text-white font-medium leading-[80px] tracking-[-0.96px] mb-4 w-[279px] relative">
            our services
          </h2>
          <p className="text-[21px] text-neutral-500 leading-[30px] tracking-[0.325px] w-[272px] relative">
            Explore the range of services offered by our tech and consulting company.
          </p>
        </div>

        {/* Carousel inside pinned wrapper */}
        <HorizontalScrollCarousel
          cards={services}
          cardWidth={1086}
          gap={84}
          backgroundColor="bg-black"
          pinWrapperId="services-pin-wrapper"
        />
      </div>
    </section>
  );
}
