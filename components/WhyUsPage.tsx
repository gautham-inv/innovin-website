import HoverCard from "./HoverCard";

// Icon assets
const iconNetwork = "/images/4076a00dcf114223bee46321b8b5539570416f58.svg";
const iconTalents = "/images/30e10ea8e914fc7e3b7c930fb0ab9e24eedb665b.svg";

export default function WhyUsPage() {

  return (
    <div className="bg-white w-full pt-[146px] pb-[40px] overflow-hidden relative">
    {/* Background decorative elements */}
    <div className="absolute left-[1780px] top-[2238px] w-[3888px] h-[2104px] pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-blue-200 via-blue-100 to-transparent blur-3xl" />
    </div>
    <div className="absolute left-[-4020px] top-[2238px] w-[3888px] h-[2104px] pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-blue-200 via-blue-100 to-transparent blur-3xl" />
    </div>

      <div className="max-w-[1593px] mx-auto px-5">
        {/* Header Section */}
        <div className="text-center mb-[50px]">
          <h1 className="text-[56px] text-[#232323] font-semibold leading-[62.1px] mb-[20px]">
            Why us
          </h1>
          <p className="text-[31px] text-[#005c89] leading-[62.1px]">
            Discover the values, expertise, and commitment that set us apart and make us the ideal partner for your journey.
          </p>
        </div>

        {/* Unique Value Proposition */}
        <div className="flex gap-[118px] items-center mb-[50px]">
          <div className="flex-1">
            <h2 className="text-[40px] text-black font-semibold leading-[60px] mb-[20px]">
              Unique Value Proposition
            </h2>
            <p className="text-[24px] text-black leading-[60px]">
              Fueling Startups and emerging/growing businesses success – we leverage AI tools and open source programs to deliver faster, cost-effective solutions that unlock their growth potential.
            </p>
          </div>
          <div className="bg-[#959595] w-[745px] h-[320px] rounded-[8px] flex items-center justify-center shrink-0">
            <p className="text-[31px] text-black text-center">
              Placeholder
            </p>
          </div>
        </div>

        {/* Our Expertise */}
        <div className="mb-[30px]">
          <h2 className="text-[40px] text-black font-semibold leading-[60px] mb-[20px]">
            Our Expertise
          </h2>
          <p className="text-[24px] text-black leading-[60px] mb-[30px]">
            We believe in nurturing diverse talent, fostering creativity, and empowering individuals to reach their full potential.
          </p>

          {/* Expertise Cards */}
          <div className="grid grid-cols-2 gap-[20px]">
            <HoverCard
              icon={
                <div className="w-[94px] h-[94px] overflow-hidden">
                  <img src={iconNetwork} alt="Network icon" className="w-full h-full" />
                </div>
              }
              title="Network of Tech SMES"
              description="Our expert network comprises accomplished industry leaders from around the globe, bringing together a wealth of diverse insights and unparalleled expertise to foster collaboration, drive innovation, and offer strategic guidance across various sectors."
              borderColor="border-[#66c2e2]"
              padding="p-[24px]"
              shadow="shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)]"
              height="h-[448px]"
              titleClassName="text-[31px] text-black font-medium leading-[60px] mb-[13px]"
              descriptionClassName="text-[20px] text-black leading-[44px]"
              contentClassName=""
            />

            <HoverCard
              icon={
                <div className="w-[94px] h-[94px] overflow-hidden">
                  <img src={iconTalents} alt="Talents icon" className="w-full h-full" />
                </div>
              }
              title="Top tech talents"
              description="At the core of our top tech talents lies an unwavering commitment to excellence, cultivated through meticulous hiring practices, hands-on training, and mentorship-led assimilation, ensuring a dynamic and proficient team ready to tackle the most complex technological challenges."
              borderColor="border-[#66c2e2]"
              padding="p-[24px]"
              shadow="shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)]"
              height="h-[448px]"
              titleClassName="text-[31px] text-black font-medium leading-[60px] mb-[13px]"
              descriptionClassName="text-[20px] text-black leading-[44px]"
              contentClassName=""
            />
          </div>
        </div>

        {/* Our Engagement Models */}
        <div className="mb-[30px]">
          <h2 className="text-[40px] text-black font-semibold leading-[60px] mb-[20px]">
            Our Engagement Models
          </h2>
          <p className="text-[24px] text-black leading-[60px] mb-[50px]">
            We offer flexible engagement models as per the client requirements.
          </p>

          {/* Engagement Models Diagram */}
          <div className="relative h-[1024px] w-full">
            {/* Center Box */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-black rounded-[20px] p-[50px] z-10">
              <p className="text-[40px] text-[#005c89] font-semibold leading-[60px] whitespace-nowrap">
                Our Engagement Models
              </p>
            </div>

            {/* Top Left Card - Tap India's Tech Talent Pool */}
            <HoverCard
              className="absolute left-0 top-[40px] z-20"
              icon={
                <div className="w-[94px] h-[94px] overflow-hidden">
                  <img src={iconNetwork} alt="Icon" className="w-full h-full" />
                </div>
              }
              title="Tap India's Tech Talent Pool"
              description="Enabling access to India's exceptional talent by tapping into a diverse pool of skilled professionals to drive project success."
              borderColor="border-[#66c2e2]"
              padding="p-[24px]"
              shadow="shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)]"
              width="w-[463px]"
              titleClassName="text-[31px] text-black font-medium leading-[60px] mb-[13px]"
              descriptionClassName="text-[16px] text-black leading-[44px]"
              contentClassName=""
            />

            {/* Top Right Card - Project-Based Execution */}
            <HoverCard
              className="absolute right-0 top-[40px] z-20"
              icon={
                <div className="w-[94px] h-[94px] overflow-hidden">
                  <img src={iconNetwork} alt="Icon" className="w-full h-full" />
                </div>
              }
              title="Project-Based Execution"
              description="From defining tasks and timelines to building and delivering the final product, we ensure smooth execution and set the stage for ongoing improvement."
              borderColor="border-[#66c2e2]"
              padding="p-[24px]"
              shadow="shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)]"
              width="w-[463px]"
              titleClassName="text-[31px] text-black font-medium leading-[60px] mb-[13px]"
              descriptionClassName="text-[16px] text-black leading-[44px]"
              contentClassName=""
            />

            {/* Bottom Left Card - Remote CTO & Technology Team */}
            <HoverCard
              className="absolute left-0 bottom-0 z-20"
              icon={
                <div className="w-[94px] h-[94px] overflow-hidden">
                  <img src={iconNetwork} alt="Icon" className="w-full h-full" />
                </div>
              }
              title="Remote CTO & Technology Team"
              description="Enhance your business with our CTO and expert tech team, seamlessly filling skill gaps and offering flexible, scalable, and cost-effective solutions without the overhead of in-house hiring."
              borderColor="border-[#66c2e2]"
              padding="p-[24px]"
              shadow="shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)]"
              width="w-[624px]"
              titleClassName="text-[31px] text-black font-medium leading-[60px] mb-[13px]"
              descriptionClassName="text-[16px] text-black leading-[44px]"
              contentClassName=""
            />

            {/* Bottom Right Card - Build, Operate, Transfer */}
            <HoverCard
              className="absolute right-0 bottom-[100px] z-20"
              icon={
                <div className="w-[94px] h-[94px] overflow-hidden">
                  <img src={iconNetwork} alt="Icon" className="w-full h-full" />
                </div>
              }
              title="Build, Operate, Transfer"
              description="We build the team, operate it for a set period, and then transfer full ownership to the client, ensuring a smooth transition."
              borderColor="border-[#66c2e2]"
              padding="p-[24px]"
              shadow="shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)]"
              width="w-[463px]"
              titleClassName="text-[31px] text-black font-medium leading-[60px] mb-[13px]"
              descriptionClassName="text-[16px] text-black leading-[44px]"
              contentClassName=""
            />

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
        </div>
      </div>
    </div>
  );
}
