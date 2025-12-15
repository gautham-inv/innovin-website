import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const imgEllipse = "/images/4c3dce0794efde83822631e43c726b0634816851.png";
const imgMohammed = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80";
const imgAshwanth = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80";

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
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  setVisibleCards((prev) => [...new Set([...prev, index])]);
                }, index * 150); // Staggered delay
              }
            });
          },
          {
            threshold: 0.5,
            rootMargin: '-100px 0px'
          }
        );
        
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const router = useRouter();

  return (
    <section className="bg-white overflow-hidden relative py-8 md:py-20">
      {/* Desktop Layout */}
      <div className="hidden lg:block min-h-[1111px]">
        <div className="max-w-[1681px] mx-auto px-5 relative">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-[40px]">
            <h2 className="text-[48px] text-black font-bold leading-[85.4px] tracking-[1.44px] max-w-[1183px]">
              The Next Big Move Is Yours
            </h2>
            <button 
              onClick={() => router.push("/careers")} 
              className="bg-gradient-to-r from-[#005c89] to-[#00a3cc] text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition scale-[1.45]"
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
            <div className="absolute top-[420px] left-1/2 transform -translate-x-1/2 w-[1000px] h-auto">
              <img 
                src={imgEllipse} 
                alt="Ellipse" 
                className="w-full h-auto object-contain" 
              />
            </div>
            
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
      </div>

      {/* Mobile Layout - Chat Bubble Style */}
      <div className="lg:hidden px-4 py-8">
        <div className="space-y-6">
          {teamQuotes.map((quote, index) => {
            const isLeft = index % 2 === 0;
            const isVisible = visibleCards.includes(index);
            
            return (
              <div
                key={quote.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`
                  flex ${isLeft ? 'justify-start' : 'justify-end'}
                  transition-all duration-700 ease-out
                  ${isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : `opacity-0 ${isLeft ? '-translate-x-12' : 'translate-x-12'}`
                  }
                `}
              >
                <div 
                  className={`
                    ${quote.gradient 
                      ? 'bg-gradient-to-br from-[#005c89] to-[#00a3cc]' 
                      : 'bg-white border border-gray-200'
                    }
                    rounded-2xl p-4 shadow-md max-w-[85%]
                    ${isLeft ? 'rounded-tl-sm' : 'rounded-tr-sm'}
                  `}
                >
                  <p 
                    className={`
                      text-sm leading-relaxed mb-3
                      ${quote.gradient ? 'text-white' : 'text-gray-800'}
                    `}
                  >
                    "{quote.quote}"
                  </p>

                  <div className="flex gap-3 items-center">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                      <img 
                        src={quote.avatar} 
                        alt={quote.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <p 
                        className={`
                          text-xs font-bold
                          ${quote.gradient ? 'text-[#66c2e2]' : 'text-[#005c89]'}
                        `}
                      >
                        {quote.author}
                      </p>
                      <p 
                        className={`
                          text-xs
                          ${quote.gradient ? 'text-[#66c2e2]/80' : 'text-[#005c89]/80'}
                        `}
                      >
                        {quote.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Header Section - After Cards */}
        <div className="mt-12 text-center space-y-6">
          <h2 className="text-3xl text-black font-bold leading-tight px-4">
            The Next Big Move Is Yours
          </h2>
          
          <p className="text-base text-[#005c89] leading-relaxed px-4">
            We're not just creating products we're crafting a team of product champions who push boundaries and deliver excellence.
            <br />
            Think you've got the spark?
          </p>
          
          <button onClick={() => router.push("/careers")} className="bg-gradient-to-r from-[#005c89] to-[#00a3cc] text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition">
            Explore Roles
          </button>
        </div>
      </div>
    </section>
  );
}