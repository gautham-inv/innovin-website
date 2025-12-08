"use client";

// Hero background image (check for both .png and .jpg)
const imgHeroBackground = "/images/efdf1ab711ffad6d48b3163655ede5890772aaf2.png";
const imgHeroBackgroundJpg = "/images/efdf1ab711ffad6d48b3163655ede5890772aaf2.jpg";

// Team photos
const imgImg18641 = "/images/573ac6c833b631241442f52f9339c8f43a7bcb76.png";
const imgImg18642 = "/images/d7fbbc268730dca1329c17ec05aad7e281134f4f.png";
const imgImg18643 = "/images/af0d73906f117e3a32a5cb2964335364aff6973e.png";
const imgImg18644 = "/images/e87e7e5ce49a5f43a07cdf9755cceca7ff36ee28.png";

// Leadership team photos
const imgVidyanand = "/images/ea9ab769881ecbef17a1ee8f61ef0d854e440010.png";
const imgSujith = "/images/1ff65672b25e8ee1fea3e17ba66c200d1c3294f2.png";
const imgSreeprabha = "/images/229320ea590322c52ad0db8e7533da4cd67039f2.png";
const imgStallon = "/images/933fecc62b2892d17dfc22100b977c6d0d0c8765.png";
const imgVineetha = "/images/7677f8afea32b88a8e5c37524020b9e07fcacbd5.png";
const imgHimanshu = "/images/397fbb475b8669ae9e88c4783d18e3330f7e69ec.png";
const imgSreekanth = "/images/26ae0043f4b22f49b21a70a7456c7256843e767c.png";

const leadershipTeam = [
  { name: "Vidyanand Krishnan", role: "Founder, CEO", image: imgVidyanand },
  { name: "Sujith Chellappan", role: "MD, Sales and Operations, ANZ", image: imgSujith },
  { name: "Sreeprabha", role: "Program Lead", image: imgSreeprabha },
  { name: "Stallon Selvan", role: "CTO", image: imgStallon },
  { name: "Vineetha Nambiar", role: "Technical Lead", image: imgVineetha },
  { name: "Himanshu Verma", role: "Advisor", image: imgHimanshu },
  { name: "Sreekanth Sreedharan", role: "AI Advisor", image: imgSreekanth },
];

const coreValues = [
  { title: "Be Customer Obsessed", icon: "🎯" },
  { title: "Excellence", icon: "🏆" },
  { title: "Honesty and Integrity", icon: "⚖️" },
  { title: "Entrepreneurial Mindset", icon: "💡" },
  { title: "Give more than you take", icon: "🤝" },
  { title: "Make progress over perfection", icon: "📈" },
];

export default function AboutUs() {
  return (
    <div className="bg-white w-full">
      {/* Hero Section with Background Image */}
      <section className="relative w-full px-[80px] py-[130px] min-h-[600px] flex flex-col justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={imgHeroBackground}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to .jpg if .png doesn't exist
              if (e.currentTarget.src !== imgHeroBackgroundJpg) {
                e.currentTarget.src = imgHeroBackgroundJpg;
              }
            }}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1680px] mx-auto w-full">
          <h1 className="text-[56px] text-white font-semibold leading-[97.8px] tracking-[1.68px] mb-[40px]">
            About Us
          </h1>
          <p className="text-[32px] text-white font-medium leading-[97.8px] tracking-[0.96px] max-w-[1520px]">
            Innovin Labs is more than a name — it's a reflection of how we turn raw ideas into purposeful products. Our identity represents the seamless blend of imagination and execution, where every stroke symbolizes collaboration and continuous evolution. It embodies our promise to walk alongside founders, shaping, refining, and building products that create lasting impact.
          </p>
        </div>
      </section>

      {/* Our Journey / Vision / Mission Section */}
      <section className="bg-white px-[50px] py-[50px]">
        <div className="max-w-[1680px] mx-auto flex gap-[20px]">
          {/* Left Column - Our Journey */}
          <div className="flex-1 pl-[50px] pr-[20px]">
            <h2 className="text-[56px] text-[#005c89] font-semibold leading-[50.6px] tracking-[-0.84px] mb-[22px]">
              Our Journey
            </h2>
            <div className="text-[25px] text-black leading-[54px] tracking-[-0.375px] font-light">
              <p className="mb-[1em]">We understand the startup journey because we've lived it. Innovin Labs wasn't always a tech partner — we began as innovators building social health solutions for the elderly, a space filled with unique challenges. Those hurdles shaped our mindset, teaching us adaptability, empathy, and the importance of a reliable tech foundation.</p>
              <p className="mb-[1em]">That experience birthed our mission: to help startups and scale-ups become successful companies. Today, we work hand-in-hand with founders, offering tailored tech solutions, product expertise, and the support needed to overcome technical barriers. Treating every product as our own, we transform raw ideas into thriving realities and walk alongside our partners through every stage of product development.</p>
              <p>Our story isn't just about technology — it's about shared experience, collaboration, and a commitment to helping your vision succeed. Don't let tech challenges slow your momentum. Partner with Innovin Labs, and let us empower your journey.</p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-[2px] bg-[#deeafc] h-[953px] shrink-0" />

          {/* Right Column - Vision / Mission / Photos */}
          <div className="flex-1">
            {/* Vision */}
            <div className="mb-[40px]">
              <h2 className="text-[56px] text-[#005c89] font-semibold leading-[80px] tracking-[-0.84px] mb-[13px]">
                Our vision
              </h2>
              <p className="text-[25px] text-black leading-[54px] tracking-[-0.375px] font-light">
                Revolutionize the tech industry by combining cutting-edge technology employing AI capabilities.
              </p>
            </div>

            {/* Mission */}
            <div className="mb-[40px]">
              <h2 className="text-[56px] text-[#005c89] font-semibold leading-[50px] tracking-[-0.84px] mb-[13px]">
                Our mission
              </h2>
              <p className="text-[25px] text-black leading-[54px] tracking-[-0.375px] font-light">
                Our mission is to enhance the efficiency, quality, and product development with an AI-first approach.
              </p>
            </div>

            {/* Team Photos Grid */}
            <div className="relative h-[565px] w-full">
              <div className="absolute left-[10px] top-[59px] rotate-[-6deg]">
                <div className="bg-white p-[24px] shadow-lg w-[330px]">
                  <img src={imgImg18641} alt="" className="w-full aspect-[16/9] object-cover" />
                </div>
              </div>
              <div className="absolute left-[368px] top-[59px] rotate-[7deg]">
                <div className="bg-white p-[24px] shadow-lg w-[330px]">
                  <img src={imgImg18642} alt="" className="w-full aspect-[16/9] object-cover" />
                </div>
              </div>
              <div className="absolute left-[22px] top-[284px] rotate-[-5deg]">
                <div className="bg-white p-[24px] shadow-lg w-[330px]">
                  <img src={imgImg18643} alt="" className="w-full aspect-[16/9] object-cover" />
                </div>
              </div>
              <div className="absolute left-[372px] top-[281px] rotate-[3deg]">
                <div className="bg-white p-[24px] shadow-lg w-[330px]">
                  <img src={imgImg18644} alt="" className="w-full aspect-[16/9] object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-black py-[126px] overflow-hidden relative">
        <div className="max-w-[1680px] mx-auto text-center">
          <h2 className="text-[64px] text-white leading-[60px] tracking-[-0.96px] mb-[200px]">
            The <span className="text-[#66c2e2] text-[70px] font-medium">6 core values</span> that are embedded in our everyday work practices:
          </h2>

          {/* Core Values Grid - Top Row */}
          <div className="flex justify-center gap-[200px] mb-[90px]">
            <div className="flex flex-col items-center w-[300px]">
              <div className="w-[200px] h-[165px] mb-[13px] text-[80px]">
                {coreValues[0].icon}
              </div>
              <p className="text-[25px] text-white leading-[54px] tracking-[-0.375px]">
                {coreValues[0].title}
              </p>
            </div>
            <div className="flex flex-col items-center w-[300px]">
              <div className="w-[200px] h-[165px] mb-[13px] text-[80px]">
                {coreValues[1].icon}
              </div>
              <p className="text-[25px] text-white leading-[54px] tracking-[-0.375px]">
                {coreValues[1].title}
              </p>
            </div>
            <div className="flex flex-col items-center w-[300px]">
              <div className="w-[200px] h-[165px] mb-[13px] text-[80px]">
                {coreValues[2].icon}
              </div>
              <p className="text-[25px] text-white leading-[54px] tracking-[-0.375px]">
                {coreValues[2].title}
              </p>
            </div>
          </div>

          {/* Core Values Grid - Bottom Row */}
          <div className="flex justify-center gap-[200px]">
            <div className="flex flex-col items-center w-[300px]">
              <div className="w-[200px] h-[165px] mb-[13px] text-[80px]">
                {coreValues[3].icon}
              </div>
              <p className="text-[25px] text-white leading-[54px] tracking-[-0.375px]">
                {coreValues[3].title}
              </p>
            </div>
            <div className="flex flex-col items-center w-[300px]">
              <div className="w-[200px] h-[165px] mb-[13px] text-[80px]">
                {coreValues[4].icon}
              </div>
              <p className="text-[25px] text-white leading-[54px] tracking-[-0.375px]">
                {coreValues[4].title}
              </p>
            </div>
            <div className="flex flex-col items-center w-[300px]">
              <div className="w-[200px] h-[165px] mb-[13px] text-[80px]">
                {coreValues[5].icon}
              </div>
              <p className="text-[25px] text-white leading-[54px] tracking-[-0.375px]">
                {coreValues[5].title}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="bg-white py-[60px] px-[51px]">
        <div className="max-w-[1681px] mx-auto">
          {/* Header */}
          <div className="mb-[20px]">
            <h2 className="text-[48px] text-black font-bold leading-[97.8px] tracking-[-0.48px]">
              Our Leadership Team
            </h2>
            <p className="text-[24px] text-black font-semibold leading-[97.8px] tracking-[-0.24px]">
              Visionaries behind our promise to build world-class products together.
            </p>
          </div>

          {/* Leadership Grid - 3 columns */}
          <div className="grid grid-cols-3 gap-x-[116px] gap-y-[60px]">
            {leadershipTeam.map((leader, index) => (
              <div key={index} className="flex flex-col gap-[24px]">
                <div className="w-full h-[503px] rounded-[10px] overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-[9px] leading-[34px]">
                  <p className="text-[24px] text-black font-semibold tracking-[-0.36px]">
                    {leader.name}
                  </p>
                  <p className="text-[20px] text-black font-medium tracking-[-0.3px]">
                    {leader.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

