"use client";

import { useState } from "react";

const imgEllipse = "/images/4c3dce0794efde83822631e43c726b0634816851.png";
const imgAshwanth = "/images/9454b043f49c13ff58150de23ad3177131cba25a.png";
const imgMohammed = "/images/b96a25f5c5aaa1da26f63e8a421b0a4c393b75f5.png";

const teamQuotes = [
  {
    id: 1,
    quote: "This is the first place where my ideas didn't just get heard they got built. That kind of trust changes everything.",
    author: "Mohammed Hinan",
    role: "Product Designer",
    avatar: imgMohammed,
    gradient: false,
    rotation: "rotate-[-1deg]",
    position: { top: "328px", left: "209px" }
  },
  {
    id: 2,
    quote: "We build fast, think bold, and ship smarter with AI. Every day feels like we're creating something that actually matters.",
    author: "Ashwanth T V",
    role: "Product Engineer",
    avatar: imgAshwanth,
    gradient: false,
    rotation: "rotate-[4deg]",
    position: { top: "634px", left: "292px" }
  },
  {
    id: 3,
    quote: "This is the first place where my ideas didn't just get heard they got built. That kind of trust changes everything.",
    author: "Mohammed Hinan",
    role: "Product Designer",
    avatar: imgMohammed,
    gradient: true,
    rotation: "rotate-[-3deg]",
    position: { top: "334px", left: "671px" }
  },
  {
    id: 4,
    quote: "This is the first place where my ideas didn't just get heard they got built. That kind of trust changes everything.",
    author: "Mohammed Hinan",
    role: "Product Designer",
    avatar: imgMohammed,
    gradient: false,
    rotation: "rotate-[-3deg]",
    position: { top: "697px", left: "697px" }
  },
  {
    id: 5,
    quote: "This is the first place where my ideas didn't just get heard they got built. That kind of trust changes everything.",
    author: "Mohammed Hinan",
    role: "Product Designer",
    avatar: imgMohammed,
    gradient: true,
    rotation: "rotate-[1deg]",
    position: { top: "314px", left: "1116px" }
  },
  {
    id: 6,
    quote: "This is the first place where my ideas didn't just get heard they got built. That kind of trust changes everything.",
    author: "Mohammed Hinan",
    role: "Product Designer",
    avatar: imgMohammed,
    gradient: true,
    rotation: "rotate-[2deg]",
    position: { top: "645px", left: "1121px" }
  },
];

export default function Careers() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="bg-white min-h-[1111px] overflow-hidden relative py-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[445px] left-[410px] w-[1066px] h-[455px] opacity-30">
          <img 
            src={imgEllipse} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="max-w-[1681px] mx-auto px-5 relative">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-[40px]">
          <h2 className="text-[48px] text-black font-bold leading-[85.4px] tracking-[1.44px] max-w-[1183px]">
            The Next Big Move Is Yours
          </h2>
          <button 
            className="bg-white border-4 border-secondary/50 rounded-[46.816px] px-[35.112px] py-[9.363px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)] text-black text-[16.386px] font-bold transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-secondary active:scale-95"
          >
            Explore Roles
          </button>
        </div>

        {/* Description Text */}
        <div className="mb-[60px]">
          <p className="text-[24px] text-[#005c89] leading-[40px] tracking-[0.72px] max-w-[1526px]">
            We're not just creating products we're crafting a team of product champions who push boundaries and deliver excellence.
            <br />
            Think you've got the spark?
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative h-[700px] -mt-[300px]">
          {teamQuotes.map((quote) => (
            <div
              key={quote.id}
              className="absolute transition-all duration-300 ease-out cursor-pointer"
              style={{
                top: quote.position.top,
                left: quote.position.left,
              }}
              onMouseEnter={() => setHoveredCard(quote.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div 
                className={`${quote.rotation} transition-all duration-300 ${
                  hoveredCard === quote.id ? 'scale-105 rotate-0' : ''
                }`}
              >
                <div 
                  className={`
                    ${quote.gradient 
                      ? 'bg-gradient-to-b from-primary to-secondary' 
                      : 'bg-white'
                    }
                    rounded-[10px] p-[20px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)]
                    flex flex-col gap-[10px] w-[310px]
                    transition-shadow duration-300
                    ${hoveredCard === quote.id ? 'shadow-[0px_4px_12px_0px_rgba(0,0,0,0.3)]' : ''}
                  `}
                >
                  {/* Quote */}
                  <p 
                    className={`
                      text-[20px] leading-[30px] font-['Schoolbell',sans-serif]
                      ${quote.gradient ? 'text-white' : 'text-black'}
                    `}
                  >
                    "{quote.quote}"
                  </p>

                  {/* Author Info */}
                  <div className="flex gap-[20px] items-center">
                    <div className="flex flex-col">
                      <p 
                        className={`
                          text-[20px] font-bold
                          ${quote.gradient ? 'text-[#66c2e2]' : 'text-[#005c89]'}
                        `}
                      >
                        {quote.author}
                      </p>
                      <p 
                        className={`
                          text-[14px] font-medium
                          ${quote.gradient ? 'text-[#66c2e2]' : 'text-[#005c89]'}
                        `}
                      >
                        {quote.role}
                      </p>
                    </div>
                    
                    {/* Avatar */}
                    <div className="relative w-[92px] h-[92px] rounded-full overflow-hidden shrink-0">
                      <img 
                        src={quote.avatar} 
                        alt={quote.author}
                        className="w-full h-full object-cover"
                      />
                      <div 
                        className={`absolute inset-0 ${
                          quote.gradient 
                            ? 'bg-[rgba(0,92,137,0.2)]' 
                            : 'bg-[rgba(0,0,0,0.2)]'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

