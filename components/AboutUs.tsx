"use client";

// Image assets
const imgHeroBackground = "/images/efdf1ab711ffad6d48b3163655ede5890772aaf2.png";
const imgHeroBackgroundJpg = "/images/efdf1ab711ffad6d48b3163655ede5890772aaf2.jpg";

const teamPhotos = [
  "/images/573ac6c833b631241442f52f9339c8f43a7bcb76.png",
  "/images/d7fbbc268730dca1329c17ec05aad7e281134f4f.png",
  "/images/af0d73906f117e3a32a5cb2964335364aff6973e.png",
  "/images/e87e7e5ce49a5f43a07cdf9755cceca7ff36ee28.png",
];

const teamPhotoPositions = [
  { left: "10px", top: "59px", rotation: -6 },
  { left: "368px", top: "59px", rotation: 7 },
  { left: "22px", top: "284px", rotation: -5 },
  { left: "372px", top: "281px", rotation: 3 },
];

const leadershipTeam = [
  { name: "Vidyanand Krishnan", role: "Founder, CEO", image: "/images/ea9ab769881ecbef17a1ee8f61ef0d854e440010.png" },
  { name: "Sujith Chellappan", role: "MD, Sales and Operations, ANZ", image: "/images/1ff65672b25e8ee1fea3e17ba66c200d1c3294f2.png" },
  { name: "Sreeprabha", role: "Program Lead", image: "/images/229320ea590322c52ad0db8e7533da4cd67039f2.png" },
  { name: "Stallon Selvan", role: "CTO", image: "/images/933fecc62b2892d17dfc22100b977c6d0d0c8765.png" },
  { name: "Vineetha Nambiar", role: "Technical Lead", image: "/images/7677f8afea32b88a8e5c37524020b9e07fcacbd5.png" },
  { name: "Himanshu Verma", role: "Advisor", image: "/images/397fbb475b8669ae9e88c4783d18e3330f7e69ec.png" },
  { name: "Sreekanth Sreedharan", role: "AI Advisor", image: "/images/26ae0043f4b22f49b21a70a7456c7256843e767c.png" },
];

const coreValues = [
  { title: "Be Customer Obsessed", icon: "🎯" },
  { title: "Excellence", icon: "🏆" },
  { title: "Honesty and Integrity", icon: "⚖️" },
  { title: "Entrepreneurial Mindset", icon: "💡" },
  { title: "Give more than you take", icon: "🤝" },
  { title: "Make progress over perfection", icon: "📈" },
];

// Reusable Components
function TeamPhotoCard({ src, alt, className = "", style = {} }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`bg-white p-[24px] shadow-lg ${className}`} style={style}>
      <img src={src} alt={alt} className="w-full aspect-[16/9] object-cover" />
    </div>
  );
}

function CoreValueCard({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[200px] h-[165px] mb-[13px] text-[80px] flex items-center justify-center">
        {icon}
      </div>
      <p className="text-[25px] text-white leading-[54px] tracking-[-0.375px]">
        {title}
      </p>
    </div>
  );
}

function CoreValueCardMobile({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] mb-3 sm:mb-4 text-[50px] sm:text-[60px] md:text-[70px] flex items-center justify-center">
        {icon}
      </div>
      <p className="text-[15px] sm:text-[17px] md:text-[20px] text-white leading-[1.5] sm:leading-[1.6] text-center">
        {title}
      </p>
    </div>
  );
}

function LeadershipCard({ name, role, image }: { name: string; role: string; image: string }) {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="w-full h-[503px] rounded-[10px] overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-[9px] leading-[34px]">
        <p className="text-[24px] text-black font-semibold tracking-[-0.36px]">
          {name}
        </p>
        <p className="text-[20px] text-black font-medium tracking-[-0.3px]">
          {role}
        </p>
      </div>
    </div>
  );
}

function LeadershipCardMobile({ name, role, image }: { name: string; role: string; image: string }) {
  return (
    <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
      <div className="w-full aspect-[3/4] rounded-[8px] sm:rounded-[10px] overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-2 sm:gap-[6px]">
        <p className="text-[16px] sm:text-[18px] md:text-[20px] text-black font-semibold leading-[1.3] sm:leading-[1.4]">
          {name}
        </p>
        <p className="text-[14px] sm:text-[16px] md:text-[18px] text-black font-medium leading-[1.4] sm:leading-[1.5]">
          {role}
        </p>
      </div>
    </div>
  );
}

function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-[56px] text-[#005c89] font-semibold leading-[50.6px] tracking-[-0.84px] mb-[13px] ${className}`}>
      {children}
    </h2>
  );
}

function SectionText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[25px] text-black leading-[54px] tracking-[-0.375px] font-light ${className}`}>
      {children}
    </p>
  );
}

export default function AboutUs() {
  const journeyText = [
    "We understand the startup journey because we've lived it. Innovin Labs wasn't always a tech partner — we began as innovators building social health solutions for the elderly, a space filled with unique challenges. Those hurdles shaped our mindset, teaching us adaptability, empathy, and the importance of a reliable tech foundation.",
    "That experience birthed our mission: to help startups and scale-ups become successful companies. Today, we work hand-in-hand with founders, offering tailored tech solutions, product expertise, and the support needed to overcome technical barriers. Treating every product as our own, we transform raw ideas into thriving realities and walk alongside our partners through every stage of product development.",
    "Our story isn't just about technology — it's about shared experience, collaboration, and a commitment to helping your vision succeed. Don't let tech challenges slow your momentum. Partner with Innovin Labs, and let us empower your journey.",
  ];

  return (
    <div className="bg-white w-full">
      {/* Hero Section */}
      <section className="relative w-full px-6 sm:px-10 md:px-16 lg:px-[80px] py-20 sm:py-24 md:py-28 lg:py-[130px] min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex flex-col justify-center">
        <div className="absolute inset-0">
          <img
            src={imgHeroBackground}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              if (e.currentTarget.src !== imgHeroBackgroundJpg) {
                e.currentTarget.src = imgHeroBackgroundJpg;
              }
            }}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 mt-12 max-w-[1680px] mx-auto w-full">
          <h1 className="text-[36px] sm:text-[44px] md:text-[52px] lg:text-[56px] text-white font-semibold leading-[1.3] sm:leading-[1.5] lg:leading-[97.8px] tracking-[0.05em] lg:tracking-[1.68px] mb-6 sm:mb-8 lg:mb-[40px]">
            About Us
          </h1>
          <p className="text-[18px] sm:text-[22px] md:text-[26px] lg:text-[32px] text-white font-medium leading-[1.6] sm:leading-[1.8] lg:leading-[97.8px] tracking-[0.02em] lg:tracking-[0.96px] max-w-full lg:max-w-[1520px]">
            Innovin Labs is more than a name — it's a reflection of how we turn raw ideas into purposeful products. Our identity represents the seamless blend of imagination and execution, where every stroke symbolizes collaboration and continuous evolution. It embodies our promise to walk alongside founders, shaping, refining, and building products that create lasting impact.
          </p>
        </div>
      </section>

      {/* Our Journey / Vision / Mission Section */}
      <section className="bg-white px-6 sm:px-8 md:px-10 lg:px-[50px] py-10 sm:py-12 md:py-14 lg:py-[50px]">
        <div className="max-w-[1680px] mx-auto">
          {/* Desktop: Two Columns */}
          <div className="hidden lg:flex gap-[20px]">
            {/* Left Column - Our Journey */}
            <div className="flex-1 pl-[50px] pr-[20px]">
              <SectionHeading>Our Journey</SectionHeading>
              <div className="text-[25px] text-black leading-[54px] tracking-[-0.375px] font-light">
                {journeyText.map((text, index) => (
                  <p key={index} className={index < journeyText.length - 1 ? "mb-[1em]" : ""}>
                    {text}
                  </p>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="w-[2px] bg-[#deeafc] h-[953px] shrink-0" />

            {/* Right Column - Vision / Mission / Photos */}
            <div className="flex-1">
              <div className="mb-[40px]">
                <SectionHeading className="leading-[80px]">Our vision</SectionHeading>
                <SectionText>Revolutionize the tech industry by combining cutting-edge technology employing AI capabilities.</SectionText>
              </div>

              <div className="mb-[40px]">
                <SectionHeading className="leading-[50px]">Our mission</SectionHeading>
                <SectionText>Our mission is to enhance the efficiency, quality, and product development with an AI-first approach.</SectionText>
              </div>

              {/* Team Photos Grid - Desktop */}
              <div className="relative h-[565px] w-full">
                {teamPhotos.map((img, index) => {
                  const position = teamPhotoPositions[index];
                  return (
                    <div
                      key={index}
                      className="absolute"
                      style={{
                        left: position.left,
                        top: position.top,
                        transform: `rotate(${position.rotation}deg)`,
                      }}
                    >
                      <TeamPhotoCard src={img} alt={`Team photo ${index + 1}`} className="w-[330px]" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet: Vertical Stack */}
          <div className="lg:hidden flex flex-col gap-10 sm:gap-12 md:gap-14">
            <div>
              <h2 className="text-[32px] sm:text-[38px] md:text-[44px] text-[#005c89] font-semibold leading-[1.2] sm:leading-[1.3] mb-4 sm:mb-5 md:mb-6">
                Our Journey
              </h2>
              <div className="text-[16px] sm:text-[18px] md:text-[20px] text-black leading-[1.7] sm:leading-[1.8] font-light">
                {journeyText.map((text, index) => (
                  <p key={index} className={index < journeyText.length - 1 ? "mb-[1em]" : ""}>
                    {text}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-[32px] sm:text-[38px] md:text-[44px] text-[#005c89] font-semibold leading-[1.2] sm:leading-[1.3] mb-4 sm:mb-5 md:mb-6">
                Our vision
              </h2>
              <p className="text-[16px] sm:text-[18px] md:text-[20px] text-black leading-[1.7] sm:leading-[1.8] font-light">
                Revolutionize the tech industry by combining cutting-edge technology employing AI capabilities.
              </p>
            </div>

            <div>
              <h2 className="text-[32px] sm:text-[38px] md:text-[44px] text-[#005c89] font-semibold leading-[1.2] sm:leading-[1.3] mb-4 sm:mb-5 md:mb-6">
                Our mission
              </h2>
              <p className="text-[16px] sm:text-[18px] md:text-[20px] text-black leading-[1.7] sm:leading-[1.8] font-light">
                Our mission is to enhance the efficiency, quality, and product development with an AI-first approach.
              </p>
            </div>

            {/* Team Photos - Mobile/Tablet */}
            <div className="grid grid-cols-2 gap-4 md:hidden max-w-[700px] mx-auto">
              {teamPhotos.map((img, index) => (
                <TeamPhotoCard key={index} src={img} alt={`Team ${index + 1}`} className="w-full p-3 sm:p-4" />
              ))}
            </div>

            {/* Team Photos - Tablet (scaled tilted layout) */}
            <div className="hidden md:block lg:hidden relative h-[320px] sm:h-[400px] md:h-[480px] w-full mx-auto max-w-[600px]">
              {teamPhotos.map((img, index) => {
                const position = teamPhotoPositions[index];
                const mobilePositions = [
                  { left: "5%", top: "8%", rotation: -6 },
                  { right: "5%", top: "8%", rotation: 7 },
                  { left: "8%", bottom: "8%", rotation: -5 },
                  { right: "8%", bottom: "12%", rotation: 3 },
                ];
                const mobilePos = mobilePositions[index];
                return (
                  <div
                    key={index}
                    className="absolute"
                    style={{
                      ...(mobilePos.left && { left: mobilePos.left }),
                      ...(mobilePos.right && { right: mobilePos.right }),
                      ...(mobilePos.top && { top: mobilePos.top }),
                      ...(mobilePos.bottom && { bottom: mobilePos.bottom }),
                      transform: `rotate(${mobilePos.rotation}deg)`,
                    }}
                  >
                    <TeamPhotoCard src={img} alt={`Team photo ${index + 1}`} className="w-[42%] sm:w-[45%] p-3 sm:p-4 md:p-5" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-black py-16 sm:py-20 md:py-24 lg:py-[126px] overflow-hidden relative px-6 sm:px-8 md:px-10">
        <div className="max-w-[1680px] mx-auto text-center">
          <h2 className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[64px] text-white leading-[1.3] sm:leading-[1.4] lg:leading-[60px] tracking-[-0.02em] lg:tracking-[-0.96px] mb-12 sm:mb-16 md:mb-24 lg:mb-[200px] px-4">
            The <span className="text-[#66c2e2] text-[32px] sm:text-[40px] md:text-[52px] lg:text-[70px] font-medium">6 core values</span> that are embedded in our everyday work practices:
          </h2>

          {/* Desktop: 3x2 Grid */}
          <div className="hidden lg:block">
            <div className="flex justify-center gap-[200px] mb-[90px]">
              {coreValues.slice(0, 3).map((value, index) => (
                <CoreValueCard key={index} icon={value.icon} title={value.title} />
              ))}
            </div>
            <div className="flex justify-center gap-[200px]">
              {coreValues.slice(3, 6).map((value, index) => (
                <CoreValueCard key={index + 3} icon={value.icon} title={value.title} />
              ))}
            </div>
          </div>

          {/* Mobile/Tablet: 2 per row */}
          <div className="lg:hidden grid grid-cols-2 gap-x-6 sm:gap-x-10 md:gap-x-16 gap-y-10 sm:gap-y-12 md:gap-y-16 max-w-[700px] mx-auto">
            {coreValues.map((value, index) => (
              <CoreValueCardMobile key={index} icon={value.icon} title={value.title} />
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="bg-white py-12 sm:py-14 md:py-16 lg:py-[60px] px-6 sm:px-8 md:px-10 lg:px-[51px]">
        {/* Mobile/Tablet: 2 columns, last centered if odd */}
        <div className="lg:hidden grid grid-cols-2 gap-x-6 sm:gap-x-8 md:gap-x-12 gap-y-8 sm:gap-y-10 md:gap-y-12 justify-items-center">
          {leadershipTeam.map((leader, index) => {
            const isLastOdd = leadershipTeam.length % 2 === 1 && index === leadershipTeam.length - 1;
            return (
              <div
                key={index}
                className="flex flex-col gap-4 sm:gap-5 md:gap-6"
                // Only center the last odd item
                style={isLastOdd ? { justifySelf: "center" } : {}}
              >
                <div className="w-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px] aspect-[3/4] rounded-[8px] sm:rounded-[10px] overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2 sm:gap-[6px] items-center">
                  <p className="text-[16px] sm:text-[18px] md:text-[20px] text-black font-semibold leading-[1.3] sm:leading-[1.4] text-center">
                    {leader.name}
                  </p>
                  <p className="text-[14px] sm:text-[16px] md:text-[18px] text-black font-medium leading-[1.4] sm:leading-[1.5] text-center">
                    {leader.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
