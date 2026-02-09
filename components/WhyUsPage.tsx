"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { Users, Target, Cpu, Repeat } from "lucide-react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

const Word = ({ children, progress, range, highlight = false }: { children: ReactNode, progress: MotionValue<number>, range: [number, number], highlight?: boolean }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <motion.span style={{ opacity }} className={`mr-[0.2em] relative inline-block ${highlight ? 'text-[#66c2e2]' : ''}`}>
      {children}
    </motion.span>
  )
}

// Icon assets
const iconNetwork = "/images/network.webp";
const iconTalents = "/images/star.png";
const imgUniqueValueProposition = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop";

export default function WhyUsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const headingText = "Unique Value Proposition";
  const contentText = "Fueling Startups and emerging/growing businesses success – we leverage AI tools and open source programs to deliver faster, cost-effective solutions that unlock their growth potential.";

  const headingWords = headingText.split(" ");
  const contentWords = contentText.split(" ");
  const totalWords = headingWords.length + contentWords.length;

  const engagementModels = [
    {
      title: "Tap India's Tech Talent Pool",
      description: "Enabling access to India's exceptional talent by tapping into a diverse pool of skilled professionals to drive project success.",
      Icon: Users,
    },
    {
      title: "Project-Based Execution",
      description: "From defining tasks and timelines to building and delivering the final product, we ensure smooth execution and set the stage for ongoing improvement.",
      Icon: Target,
    },
    {
      title: "Remote CTO & Technology Team",
      description: "Enhance your business with our CTO and expert tech team, seamlessly filling skill gaps and offering flexible, scalable, and cost-effective solutions without the overhead of in-house hiring.",
      Icon: Cpu,
    },
    {
      title: "Build, Operate, Transfer",
      description: "We build the team, operate it for a set period, and then transfer full ownership to the client, ensuring a smooth transition.",
      Icon: Repeat,
    },
  ];

  return (
    <main id="main-content">
      <div className="bg-white w-full pt-[100px] sm:pt-[120px] lg:pt-[146px] overflow-clip relative px-4 sm:px-6 md:px-8 xl:px-[70px]">
        <div className="max-w-[1681px] mx-auto">
          {/* Header Section */}
          {/* Hero Section */}
          {/* Hero Section */}
          {/* Hero Section */}
          <div className="relative w-full max-w-[1920px] mx-auto min-h-[600px] lg:min-h-[700px] flex items-center justify-center mb-16 lg:mb-24 overflow-visible">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#E0F2FE]/60 pointer-events-none" />

            {/* Left Image Group - Visible on XL screens */}
            <div className="hidden xl:block absolute left-[6%] top-1/2 -translate-y-1/2 w-[400px] h-[400px]">
              {/* Top Left - Vertical image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
                className="absolute left-0 top-0 w-[150px] h-[215px] rounded-[16px] overflow-hidden shadow-xl z-10 border-[3px] border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop"
                  alt="Professional woman"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Top Right - Horizontal image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
                className="absolute left-[160px] top-[50px] w-[212px] h-[142px] rounded-[16px] overflow-hidden shadow-xl z-20 border-[3px] border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Bottom Left - Horizontal image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 100 }}
                className="absolute left-[60px] top-[230px] w-[195px] h-[146px] rounded-[16px] overflow-hidden shadow-xl z-10 border-[3px] border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop"
                  alt="Team working"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Center Content */}
            <div className="relative z-30 text-center max-w-[800px] px-4 mx-auto">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl text-[#232323] font-semibold leading-tight tracking-tight mb-4 sm:mb-5 lg:mb-6">
                Why us
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-[#5a5a5a] leading-relaxed max-w-[600px] mx-auto">
                Discover the values, expertise, and commitment that set us apart and make us the ideal partner for your journey.
              </p>
            </div>

            {/* Right Image Group - Visible on XL screens */}
            <div className="hidden xl:block absolute right-[6%] top-1/2 -translate-y-1/2 w-[400px] h-[400px]">
              {/* Top Right - Vertical image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
                className="absolute right-0 top-0 w-[150px] h-[215px] rounded-[16px] overflow-hidden shadow-xl z-10 border-[3px] border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=400&h=600&fit=crop"
                  alt="Working on laptop"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Top Left - Horizontal image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
                className="absolute right-[160px] top-[50px] w-[212px] h-[142px] rounded-[16px] overflow-hidden shadow-xl z-20 border-[3px] border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop"
                  alt="Meeting discussion"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Bottom Right - Horizontal image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, type: "spring", stiffness: 100 }}
                className="absolute right-[60px] top-[230px] w-[195px] h-[146px] rounded-[16px] overflow-hidden shadow-xl z-10 border-[3px] border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&h=300&fit=crop"
                  alt="Modern office"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative w-full bg-black"
        style={{ height: '180vh' }}
      >
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 sm:px-10 lg:px-20 py-20 overflow-hidden">
          <div className="w-full max-w-[1366px] mx-auto flex flex-col gap-[30px] sm:gap-[40px] lg:gap-[50px]">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl text-white font-semibold leading-tight tracking-tight text-left flex flex-wrap gap-x-[0.3em] gap-y-2">
              {headingWords.map((word, i) => {
                // Map to 0-0.3 range for heading (first 30% of scroll)
                const start = (i / totalWords) * 0.75 + 0.02;
                const end = start + (0.85 / totalWords);
                return (
                  <Word key={i} progress={scrollYProgress} range={[start, end]}>
                    {word}
                  </Word>
                );
              })}
            </h2>
            <p className="text-xl sm:text-3xl lg:text-5xl text-white font-normal leading-relaxed text-left flex flex-wrap gap-x-[0.3em] gap-y-2">
              {contentWords.map((word, i) => {
                const globalIndex = i + headingWords.length;
                // Map to compressed range
                const start = (globalIndex / totalWords) * 0.8 + 0.02;
                const end = start + (0.95 / totalWords);
                const text = String(word).toLowerCase();
                const isHighlight = text.includes("faster") || text.includes("cost-effective");
                return (
                  <Word key={i} progress={scrollYProgress} range={[start, end]} highlight={isHighlight}>
                    {word}
                  </Word>
                );
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white w-full pb-[50px] sm:pb-[60px] lg:pb-[40px] overflow-clip relative">
        {/* Background decorative elements - Moved here */}
        <div className="hidden xl:block absolute left-[1780px] top-0 w-[3888px] h-[2104px] pointer-events-none opacity-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-blue-200 via-blue-100 to-transparent blur-3xl" />
        </div>
        <div className="hidden xl:block absolute left-[-4020px] top-0 w-[3888px] h-[2104px] pointer-events-none opacity-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-blue-200 via-blue-100 to-transparent blur-3xl" />
        </div>

        <div className="max-w-[1593px] mx-auto px-5 sm:px-8 md:px-10 lg:px-4">
          {/* Our Expertise */}
          <div className="mb-12 sm:mb-16 lg:mb-[30px] pt-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-black font-semibold leading-tight mb-4 sm:mb-5 lg:mb-6">
              Our Expertise
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-black leading-relaxed mb-8 sm:mb-10 lg:mb-[30px] max-w-4xl">
              We believe in nurturing diverse talent, fostering creativity, and empowering individuals to reach their full potential.
            </p>

            {/* Expertise Cards - Modern Design */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 xl:gap-[20px]">
              {/* Network of Tech SMES Card */}
              <div className="group bg-white rounded-[20px] sm:rounded-[24px] lg:rounded-[20px] p-6 sm:p-8 lg:p-[32px] shadow-[0px_4px_20px_rgba(102,194,226,0.15)] hover:shadow-[0px_6px_24px_rgba(102,194,226,0.2)] transition-all duration-300 h-auto lg:h-[448px] relative overflow-hidden hover:bg-gradient-to-br hover:from-white hover:to-blue-50">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#66c2e2]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-50 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Icon with background */}
                  <div className="w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] lg:w-[100px] lg:h-[100px] mb-5 sm:mb-6 lg:mb-[20px] bg-gradient-to-br from-[#66c2e2] to-[#005c89] rounded-2xl p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img src={iconNetwork} alt="Network icon" className="w-full h-full object-contain filter brightness-0 invert" />
                  </div>

                  <h3 className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] text-[#232323] font-bold leading-[1.3] sm:leading-[1.4] lg:leading-[1.4] mb-3 sm:mb-4 lg:mb-[16px]">
                    Network of Tech SMEs
                  </h3>

                  <p className="text-[16px] sm:text-[18px] lg:text-[18px] text-[#4a5568] leading-[1.7] sm:leading-[1.75] lg:leading-[1.8]">
                    Our expert network comprises accomplished industry leaders from around the globe, bringing together a wealth of diverse insights and unparalleled expertise to foster collaboration, drive innovation, and offer strategic guidance across various sectors.
                  </p>
                </div>
              </div>

              {/* Top tech talents Card */}
              <div className="group bg-white rounded-[20px] sm:rounded-[24px] lg:rounded-[20px] p-6 sm:p-8 lg:p-[32px] shadow-[0px_4px_20px_rgba(102,194,226,0.15)] hover:shadow-[0px_6px_24px_rgba(102,194,226,0.2)] transition-all duration-300 h-auto lg:h-[448px] relative overflow-hidden hover:bg-gradient-to-br hover:from-white hover:to-blue-50">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#66c2e2]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-50 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Icon with background */}
                  <div className="w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] lg:w-[100px] lg:h-[100px] mb-5 sm:mb-6 lg:mb-[20px] bg-gradient-to-br from-[#66c2e2] to-[#005c89] rounded-2xl p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img src={iconTalents} alt="Talents icon" className="w-full h-full object-contain filter brightness-0 invert" />
                  </div>

                  <h3 className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] text-[#232323] font-bold leading-[1.3] sm:leading-[1.4] lg:leading-[1.4] mb-3 sm:mb-4 lg:mb-[16px]">
                    Top tech talents
                  </h3>

                  <p className="text-[16px] sm:text-[18px] lg:text-[18px] text-[#4a5568] leading-[1.7] sm:leading-[1.75] lg:leading-[1.8]">
                    At the core of our top tech talents lies an unwavering commitment to excellence, cultivated through meticulous hiring practices, hands-on training, and mentorship-led assimilation, ensuring a dynamic and proficient team ready to tackle the most complex technological challenges.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Engagement Models */}
          <div className="mb-8 sm:mb-10  pt-20 the footer margin">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-black font-semibold leading-tight mb-4 sm:mb-5 lg:mb-6">
              Our Engagement Models
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-black leading-relaxed mb-10 sm:mb-12 lg:mb-[50px] max-w-4xl">
              We offer flexible engagement models as per the client requirements.
            </p>

            {/* Desktop: Engagement Models Diagram with arrows and center card */}
            <div className="hidden xl:block relative h-[1024px] w-full">
              {/* Center Box */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-black rounded-[20px] p-[50px] z-10">
                <p className="text-[40px] text-[#005c89] font-semibold leading-[60px] whitespace-nowrap">
                  Our Engagement Models
                </p>
              </div>

              {/* Top Left Card - Tap India's Tech Talent Pool */}
              <div className="absolute left-0 top-[40px] w-[463px] bg-white border border-[#66c2e2] rounded-[16px] p-[24px] shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)] z-20 text-center transition-all duration-300 hover:shadow-[0px_4px_14px_0px_rgba(102,194,226,0.35)]">
                <div className="w-[94px] h-[94px] mb-[13px] flex items-center justify-center bg-[#f0f9ff] rounded-2xl mx-auto">
                  <Users className="w-12 h-12 text-[#005c89]" />
                </div>
                <h3 className="text-[31px] text-black font-medium leading-[60px] mb-[13px]">
                  Tap India's Tech Talent Pool
                </h3>
                <p className="text-[16px] text-black leading-[44px]">
                  Enabling access to India's exceptional talent by tapping into a diverse pool of skilled professionals to drive project success.
                </p>
              </div>

              {/* Top Right Card - Project-Based Execution */}
              <div className="absolute right-0 top-[40px] w-[463px] bg-white border border-[#66c2e2] rounded-[16px] p-[24px] shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)] z-20 text-center transition-all duration-300 hover:shadow-[0px_4px_14px_0px_rgba(102,194,226,0.35)]">
                <div className="w-[94px] h-[94px] mb-[13px] flex items-center justify-center bg-[#f0f9ff] rounded-2xl mx-auto">
                  <Target className="w-12 h-12 text-[#005c89]" />
                </div>
                <h3 className="text-[31px] text-black font-medium leading-[60px] mb-[13px]">
                  Project-Based Execution
                </h3>
                <p className="text-[16px] text-black leading-[44px]">
                  From defining tasks and timelines to building and delivering the final product, we ensure smooth execution and set the stage for ongoing improvement.
                </p>
              </div>

              {/* Bottom Left Card - Remote CTO & Technology Team */}
              <div className="absolute left-0 bottom-[50px] w-[624px] bg-white border border-[#66c2e2] rounded-[16px] p-[24px] shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)] z-20 text-center transition-all duration-300 hover:shadow-[0px_4px_14px_0px_rgba(102,194,226,0.35)]">
                <div className="w-[94px] h-[94px] mb-[13px] flex items-center justify-center bg-[#f0f9ff] rounded-2xl mx-auto">
                  <Cpu className="w-12 h-12 text-[#005c89]" />
                </div>
                <h3 className="text-[31px] text-black font-medium leading-[60px] mb-[13px]">
                  Remote CTO & Technology Team
                </h3>
                <p className="text-[16px] text-black leading-[44px]">
                  Enhance your business with our CTO and expert tech team, seamlessly filling skill gaps and offering flexible, scalable, and cost-effective solutions without the overhead of in-house hiring.
                </p>
              </div>

              {/* Bottom Right Card - Build, Operate, Transfer */}
              <div className="absolute right-0 bottom-[140px] w-[463px] bg-white border border-[#66c2e2] rounded-[16px] p-[24px] shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)] z-20 text-center transition-all duration-300 hover:shadow-[0px_4px_14px_0px_rgba(102,194,226,0.35)]">
                <div className="w-[94px] h-[94px] mb-[13px] flex items-center justify-center bg-[#f0f9ff] rounded-2xl mx-auto">
                  <Repeat className="w-12 h-12 text-[#005c89]" />
                </div>
                <h3 className="text-[31px] text-black font-medium leading-[60px] mb-[13px]">
                  Build, Operate, Transfer
                </h3>
                <p className="text-[16px] text-black leading-[44px]">
                  We build the team, operate it for a set period, and then transfer full ownership to the client, ensuring a smooth transition.
                </p>
              </div>

              {/* Static Arrow SVG Paths - matching Figma design exactly */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5]" viewBox="0 0 1240 720" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                {/* Top Left Arrow - from center to top-left card */}
                <path
                  d="M 466 319 L 466 265 Q 460 255 450 255 L 308 255"
                  stroke="#000000"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Top Right Arrow - from center to top-right card */}
                <path
                  d="M 773 319 L 773 265 Q 779 255 789 255 L 966 255"
                  stroke="#000000"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Bottom Left Arrow - from center to bottom-left card */}
                <path
                  d="M 584 410
  L 584 500
  Q 578 510 568 510
  L 380 510
  "
                  stroke="#000000"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Bottom Right Arrow - from center to bottom-right card */}
                <path
                  d="M 721 400 L 721 460 Q 731 470 741 470 L 919 470"
                  stroke="#000000"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            {/* Mobile/Tablet: Vertical stacked cards with dotted connecting line */}
            <div className="xl:hidden relative">
              {/* Dotted vertical line connecting cards - centered to screen */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0 border-l-2 border-dashed border-[#66c2e2] -translate-x-1/2 z-0" style={{ height: '100%' }} />

              {/* Cards */}
              <div className="relative z-10 flex flex-col gap-6 sm:gap-8">
                {engagementModels.map((model, index) => (
                  <div
                    key={index}
                    className="bg-white border border-[#66c2e2] rounded-[16px] sm:rounded-[20px] p-6 sm:p-8 shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)] text-center transition-all duration-300 hover:shadow-[0px_4px_14px_0px_rgba(102,194,226,0.35)]"
                  >
                    <div className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] mb-4 sm:mb-5 flex items-center justify-center bg-[#f0f9ff] rounded-2xl mx-auto">
                      <model.Icon className="w-10 h-10 sm:w-12 sm:h-12 text-[#005c89]" />
                    </div>
                    <h3 className="text-[22px] sm:text-[26px] md:text-[28px] text-black font-medium leading-[1.3] sm:leading-[1.4] mb-3 sm:mb-4">
                      {model.title}
                    </h3>
                    <p className="text-[16px] sm:text-[18px] text-black leading-[1.6] sm:leading-[1.65]">
                      {model.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}