

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { teamQuotes } from '@/lib/teamQuotes';

const imgEllipse = "/images/4c3dce0794efde83822631e43c726b0634816851.png";



export default function Careers() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [showButton, setShowButton] = useState(false);
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
                  setVisibleCards((prev) => {
                    const newCards = [...new Set([...prev, index])];
                    if (newCards.length === teamQuotes.length) {
                      setTimeout(() => setShowButton(true), 300);
                    }
                    return newCards;
                  });
                }, index * 150);
              }
            });
          },
          {
            threshold: 0.2,
            rootMargin: '100px 0px'
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
    <section className="bg-white overflow-hidden relative pt-8 xl:pt-20 mesh-bg">
      {/* Desktop Layout - Only for XL screens */}
      <div className="hidden xl:block min-h-[1111px]">
        <div className="max-w-[1681px] mx-auto px-4 sm:px-6 lg:px-[70px] relative">
          {/* Header Section */}
          <div className="flex items-start xl:items-center justify-between gap-6 mb-[40px]">
            <h2 className="text-[36px] xl:text-[48px] text-black font-bold leading-tight xl:leading-[85.4px] tracking-[1.44px] max-w-[1183px]">
              The Next Big Move Is Yours
            </h2>
            <button
              onClick={() => router.push("/careers")}
              className="bg-gradient-to-r cursor-pointer from-[#005c89] to-[#00a3cc] text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition z-20 whitespace-nowrap"
            >
              Explore Roles
            </button>
          </div>

          {/* Description Text */}
          <div className="mb-[60px]">
            <p className="text-[18px] xl:text-[24px] text-[#005c89] leading-relaxed xl:leading-[40px] tracking-[0.72px] max-w-[1526px]">
              We're not just creating products we're crafting a team of product champions who push boundaries and deliver excellence.
              <br />
              Think you've got the spark?
            </p>
          </div>

          {/* Cards Container */}
          <div className="relative h-[700px] -mt-[300px]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1681px] h-full pointer-events-none">
              <div className="absolute top-[420px] left-1/2 transform -translate-x-1/2 w-[1000px] h-auto pointer-events-auto">
                <img
                  src={imgEllipse}
                  alt="Ellipse"
                  className="w-full h-auto object-contain"
                />
              </div>

              {teamQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className="absolute transition-all duration-300 ease-out cursor-pointer pointer-events-auto"
                  style={{
                    top: quote.position.top,
                    left: quote.position.left,
                  }}
                  onMouseEnter={() => setHoveredCard(quote.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => window.open(quote.link, "_blank")}
                >
                  <div
                    className="transition-all duration-300"
                    style={{
                      transform: hoveredCard === quote.id
                        ? 'scale(1.05) rotate(0deg)'
                        : `${quote.rotation.replace('rotate-[', 'rotate(').replace(']', ')')}`
                    }}
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
                            className={`absolute inset-0 ${quote.gradient
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
      </div>

      {/* Mobile & Tablet Layout - Chat Bubble Style with Scroll Animations */}
      <div className="xl:hidden px-4 sm:px-6 md:px-12 py-8 md:py-12">
        {/* Header Section */}
        <div className="mb-12 md:mb-16 text-center space-y-6 md:space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-black font-bold leading-tight">
            The Next Big Move Is Yours
          </h2>

          <p className="text-base md:text-lg lg:text-xl text-[#005c89] leading-relaxed max-w-4xl mx-auto">
            We're not just creating products we're crafting a team of product champions who push boundaries and deliver excellence.
            <br />
            Think you've got the spark?
          </p>
        </div>

        {/* Cards with scroll animation */}
        <div className="space-y-6 md:space-y-8 mb-12 md:mb-16 max-w-3xl mx-auto">
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
                    rounded-2xl p-4 md:p-5 shadow-md max-w-[85%] md:max-w-[75%]
                    ${isLeft ? 'rounded-tl-sm' : 'rounded-tr-sm'}
                    transition-transform duration-300 cursor-pointer
                  `}
                  style={{
                    transform: isVisible ? `${quote.rotation.replace('rotate-[', 'rotate(').replace(']', ')')}` : 'none'
                  }}
                  onClick={() => window.open(quote.link, "_blank")}
                >
                  <p
                    className={`
                      text-sm md:text-base leading-relaxed mb-3 md:mb-4
                      ${quote.gradient ? 'text-white' : 'text-gray-800'}
                    `}
                  >
                    "{quote.quote}"
                  </p>

                  <div className="flex gap-3 md:gap-4 items-center">
                    <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shrink-0">
                      <img
                        src={quote.avatar}
                        alt={quote.author}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col">
                      <p
                        className={`
                          text-xs md:text-sm font-bold
                          ${quote.gradient ? 'text-[#66c2e2]' : 'text-[#005c89]'}
                        `}
                      >
                        {quote.author}
                      </p>
                      <p
                        className={`
                          text-xs md:text-sm
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

        {/* Button at the end */}
        <div className="text-center">
          <button
            onClick={() => router.push("/careers")}
            className={`
              bg-gradient-to-r from-[#005c89] to-[#00a3cc] text-white 
              px-12 md:px-16 py-4 md:py-5 rounded-full text-lg md:text-xl font-semibold 
              hover:opacity-90 transition-all duration-500
              ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            Explore Roles
          </button>
        </div>
      </div>
    </section>
  );
}