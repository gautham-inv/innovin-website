// Icon assets
const iconNetwork = "/images/4076a00dcf114223bee46321b8b5539570416f58.svg";
const iconTalents = "/images/30e10ea8e914fc7e3b7c930fb0ab9e24eedb665b.svg";

export default function WhyUsPage() {

  const engagementModels = [
    {
      title: "Tap India's Tech Talent Pool",
      description: "Enabling access to India's exceptional talent by tapping into a diverse pool of skilled professionals to drive project success.",
      icon: iconNetwork,
    },
    {
      title: "Project-Based Execution",
      description: "From defining tasks and timelines to building and delivering the final product, we ensure smooth execution and set the stage for ongoing improvement.",
      icon: iconNetwork,
    },
    {
      title: "Remote CTO & Technology Team",
      description: "Enhance your business with our CTO and expert tech team, seamlessly filling skill gaps and offering flexible, scalable, and cost-effective solutions without the overhead of in-house hiring.",
      icon: iconNetwork,
    },
    {
      title: "Build, Operate, Transfer",
      description: "We build the team, operate it for a set period, and then transfer full ownership to the client, ensuring a smooth transition.",
      icon: iconNetwork,
    },
  ];

  return (
    <div className="bg-white w-full pt-[100px] sm:pt-[120px] lg:pt-[146px] pb-[50px] sm:pb-[60px] lg:pb-[40px] overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="hidden lg:block absolute left-[1780px] top-[2238px] w-[3888px] h-[2104px] pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-blue-200 via-blue-100 to-transparent blur-3xl" />
      </div>
      <div className="hidden lg:block absolute left-[-4020px] top-[2238px] w-[3888px] h-[2104px] pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-blue-200 via-blue-100 to-transparent blur-3xl" />
      </div>

      <div className="max-w-[1593px] mx-auto px-5 sm:px-8 md:px-10 lg:px-4">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-[50px]">
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] text-[#232323] font-semibold leading-[1.1] sm:leading-[1.2] lg:leading-[62.1px] mb-5 sm:mb-6 lg:mb-[20px]">
            Why us
          </h1>
          <p className="text-[18px] sm:text-[22px] md:text-[26px] lg:text-[31px] text-[#005c89] leading-[1.4] sm:leading-[1.6] lg:leading-[62.1px] max-w-[900px] mx-auto">
            Discover the values, expertise, and commitment that set us apart and make us the ideal partner for your journey.
          </p>
        </div>

        {/* Unique Value Proposition */}
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-[118px] items-center mb-12 sm:mb-16 lg:mb-[50px]">
          {/* Mobile/Tablet: Image first */}
          <div className="bg-[#959595] w-full sm:w-[500px] md:w-[600px] lg:w-[745px] h-[220px] sm:h-[260px] md:h-[300px] lg:h-[320px] rounded-[12px] sm:rounded-[16px] lg:rounded-[8px] flex items-center justify-center shrink-0 order-1 lg:order-2">
            <p className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[31px] text-black text-center">
              Placeholder
            </p>
          </div>
          
          {/* Mobile/Tablet: Content second */}
          <div className="flex-1 w-full lg:w-auto order-2 lg:order-1">
            <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] text-black font-semibold leading-[1.3] sm:leading-[1.4] lg:leading-[60px] mb-4 sm:mb-5 lg:mb-[20px]">
              Unique Value Proposition
            </h2>
            <p className="text-[17px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-black leading-[1.6] sm:leading-[1.65] lg:leading-[60px]">
              Fueling Startups and emerging/growing businesses success – we leverage AI tools and open source programs to deliver faster, cost-effective solutions that unlock their growth potential.
            </p>
          </div>
        </div>

        {/* Our Expertise */}
        <div className="mb-12 sm:mb-16 lg:mb-[30px]">
          <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] text-black font-semibold leading-[1.3] sm:leading-[1.4] lg:leading-[60px] mb-4 sm:mb-5 lg:mb-[20px]">
            Our Expertise
          </h2>
          <p className="text-[17px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-black leading-[1.6] sm:leading-[1.65] lg:leading-[60px] mb-8 sm:mb-10 lg:mb-[30px]">
            We believe in nurturing diverse talent, fostering creativity, and empowering individuals to reach their full potential.
          </p>

          {/* Expertise Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-[20px]">
            <div className="bg-white border border-[#66c2e2] rounded-[16px] sm:rounded-[20px] lg:rounded-[16px] p-6 sm:p-8 lg:p-[24px] shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)] h-auto lg:h-[448px]">
              <div className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] lg:w-[94px] lg:h-[94px] mb-4 sm:mb-5 lg:mb-[13px] overflow-hidden">
                <img src={iconNetwork} alt="Network icon" className="w-full h-full" />
              </div>
              <h3 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[31px] text-black font-medium leading-[1.3] sm:leading-[1.4] lg:leading-[60px] mb-3 sm:mb-4 lg:mb-[13px]">
                Network of Tech SMES
              </h3>
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-black leading-[1.6] sm:leading-[1.65] lg:leading-[44px]">
                Our expert network comprises accomplished industry leaders from around the globe, bringing together a wealth of diverse insights and unparalleled expertise to foster collaboration, drive innovation, and offer strategic guidance across various sectors.
              </p>
            </div>

            <div className="bg-white border border-[#66c2e2] rounded-[16px] sm:rounded-[20px] lg:rounded-[16px] p-6 sm:p-8 lg:p-[24px] shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)] h-auto lg:h-[448px]">
              <div className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] lg:w-[94px] lg:h-[94px] mb-4 sm:mb-5 lg:mb-[13px] overflow-hidden">
                <img src={iconTalents} alt="Talents icon" className="w-full h-full" />
              </div>
              <h3 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[31px] text-black font-medium leading-[1.3] sm:leading-[1.4] lg:leading-[60px] mb-3 sm:mb-4 lg:mb-[13px]">
                Top tech talents
              </h3>
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-black leading-[1.6] sm:leading-[1.65] lg:leading-[44px]">
                At the core of our top tech talents lies an unwavering commitment to excellence, cultivated through meticulous hiring practices, hands-on training, and mentorship-led assimilation, ensuring a dynamic and proficient team ready to tackle the most complex technological challenges.
              </p>
            </div>
          </div>
        </div>

        {/* Our Engagement Models */}
        <div className="mb-8 sm:mb-10 lg:mb-[30px]">
          <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] text-black font-semibold leading-[1.3] sm:leading-[1.4] lg:leading-[60px] mb-4 sm:mb-5 lg:mb-[20px]">
            Our Engagement Models
          </h2>
          <p className="text-[17px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-black leading-[1.6] sm:leading-[1.65] lg:leading-[60px] mb-10 sm:mb-12 lg:mb-[50px]">
            We offer flexible engagement models as per the client requirements.
          </p>

          {/* Desktop: Engagement Models Diagram with arrows and center card */}
          <div className="hidden lg:block relative h-[1024px] w-full">
            {/* Center Box */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-black rounded-[20px] p-[50px] z-10">
              <p className="text-[40px] text-[#005c89] font-semibold leading-[60px] whitespace-nowrap">
                Our Engagement Models
              </p>
            </div>

            {/* Top Left Card - Tap India's Tech Talent Pool */}
            <div className="absolute left-0 top-[40px] w-[463px] bg-white border border-[#66c2e2] rounded-[16px] p-[24px] shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)] z-20">
              <div className="w-[94px] h-[94px] mb-[13px] overflow-hidden">
                <img src={iconNetwork} alt="Icon" className="w-full h-full" />
              </div>
              <h3 className="text-[31px] text-black font-medium leading-[60px] mb-[13px]">
                Tap India's Tech Talent Pool
              </h3>
              <p className="text-[16px] text-black leading-[44px]">
                Enabling access to India's exceptional talent by tapping into a diverse pool of skilled professionals to drive project success.
              </p>
            </div>

            {/* Top Right Card - Project-Based Execution */}
            <div className="absolute right-0 top-[40px] w-[463px] bg-white border border-[#66c2e2] rounded-[16px] p-[24px] shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)] z-20">
              <div className="w-[94px] h-[94px] mb-[13px] overflow-hidden">
                <img src={iconNetwork} alt="Icon" className="w-full h-full" />
              </div>
              <h3 className="text-[31px] text-black font-medium leading-[60px] mb-[13px]">
                Project-Based Execution
              </h3>
              <p className="text-[16px] text-black leading-[44px]">
                From defining tasks and timelines to building and delivering the final product, we ensure smooth execution and set the stage for ongoing improvement.
              </p>
            </div>

            {/* Bottom Left Card - Remote CTO & Technology Team */}
            <div className="absolute left-0 bottom-0 w-[624px] bg-white border border-[#66c2e2] rounded-[16px] p-[24px] shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)] z-20">
              <div className="w-[94px] h-[94px] mb-[13px] overflow-hidden">
                <img src={iconNetwork} alt="Icon" className="w-full h-full" />
              </div>
              <h3 className="text-[31px] text-black font-medium leading-[60px] mb-[13px]">
                Remote CTO & Technology Team
              </h3>
              <p className="text-[16px] text-black leading-[44px]">
                Enhance your business with our CTO and expert tech team, seamlessly filling skill gaps and offering flexible, scalable, and cost-effective solutions without the overhead of in-house hiring.
              </p>
            </div>

            {/* Bottom Right Card - Build, Operate, Transfer */}
            <div className="absolute right-0 bottom-[100px] w-[463px] bg-white border border-[#66c2e2] rounded-[16px] p-[24px] shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)] z-20">
              <div className="w-[94px] h-[94px] mb-[13px] overflow-hidden">
                <img src={iconNetwork} alt="Icon" className="w-full h-full" />
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

          {/* Mobile/Tablet: Vertical stacked cards (no arrows, no center card) */}
          <div className="lg:hidden flex flex-col gap-6 sm:gap-8">
            {engagementModels.map((model, index) => (
              <div
                key={index}
                className="bg-white border border-[#66c2e2] rounded-[16px] sm:rounded-[20px] p-6 sm:p-8 shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)]"
              >
                <div className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] mb-4 sm:mb-5 overflow-hidden">
                  <img src={model.icon} alt="Icon" className="w-full h-full" />
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
  );
}