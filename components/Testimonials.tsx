"use client";

import { useEffect, useRef, useState } from "react";

const imgZirklyFullLogo1 = "/images/zirkly.png";
const imgEllipse1 = "/images/blue_gradient.svg";

const testimonials = [
  {
    quote: "As an entrepreneur, I needed to get my new website delivered in a timely and effective manner. Finding someone to do the work was not difficult, but finding someone that could do the work by sharing my company values and vision, wasn't. They delivered the project on time with high quality and excellent communication. The team was responsive and efficiently made modifications to our website. I highly recommend Innovin Labs for their professionalism and dedication",
    author: "Sujith Chellappan",
    logo: imgZirklyFullLogo1,
  },
  {
    quote: "As an entrepreneur, I needed to get my new website delivered in a timely and effective manner. Finding someone to do the work was not difficult, but finding someone that could do the work by sharing my company values and vision, wasn't. They delivered the project on time with high quality and excellent communication. The team was responsive and efficiently made modifications to our website. I highly recommend Innovin Labs for their professionalism and dedication",
    author: "Sujith Chellappan",
    logo: imgZirklyFullLogo1,
  },
  {
    quote: "As an entrepreneur, I needed to get my new website delivered in a timely and effective manner. Finding someone to do the work was not difficult, but finding someone that could do the work by sharing my company values and vision, wasn't. They delivered the project on time with high quality and excellent communication. The team was responsive and efficiently made modifications to our website. I highly recommend Innovin Labs for their professionalism and dedication",
    author: "Sujith Chellappan",
    logo: imgZirklyFullLogo1,
  },
  {
    quote: "As an entrepreneur, I needed to get my new website delivered in a timely and effective manner. Finding someone to do the work was not difficult, but finding someone that could do the work by sharing my company values and vision, wasn't. They delivered the project on time with high quality and excellent communication. The team was responsive and efficiently made modifications to our website. I highly recommend Innovin Labs for their professionalism and dedication",
    author: "Sujith Chellappan",
    logo: imgZirklyFullLogo1,
  },
  {
    quote: "As an entrepreneur, I needed to get my new website delivered in a timely and effective manner. Finding someone to do the work was not difficult, but finding someone that could do the work by sharing my company values and vision, wasn't. They delivered the project on time with high quality and excellent communication. The team was responsive and efficiently made modifications to our website. I highly recommend Innovin Labs for their professionalism and dedication",
    author: "Sujith Chellappan",
    logo: imgZirklyFullLogo1,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState<number>(2);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const totalCards = testimonials.length;

  const getAllCards = () => {
    return testimonials.map((_, index) => ({
      index,
      originalIndex: index,
    }));
  };

  const getCardPosition = (cardIndex: number) => {
    let diff = cardIndex - currentIndex;
    
    if (diff > totalCards / 2) {
      diff -= totalCards;
    } else if (diff < -totalCards / 2) {
      diff += totalCards;
    }
    
    return diff;
  };

  const getCardStyle = (cardIndex: number) => {
    const position = getCardPosition(cardIndex);
    const absPosition = Math.abs(position);
    
    let scale = 1;
    let blur = 0;
    let zIndex = 10;
    let translateX = position * 400;
    let opacity = 0; // Hide cards by default

    if (absPosition === 0) {
      // Center card (front) - no blur
      scale = 1;
      blur = 0;
      zIndex = 50;
      opacity = 1;
    } else if (absPosition === 1) {
      // Cards immediately next to center - slight blur
      scale = 0.92;
      blur = 4;
      zIndex = 40;
      opacity = 1;
    } else {
      // Hide all other cards
      scale = 0.7;
      blur = 10;
      zIndex = 10;
      opacity = 0;
    }

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      filter: `blur(${blur}px)`,
      opacity,
      zIndex: 50 - absPosition * 5,
      pointerEvents: absPosition <= 1 ? 'auto' : 'none',
    };
  };

  const snapToCard = (targetIndex: number) => {
    if (isAnimating) return;
    
    let normalizedIndex = targetIndex % totalCards;
    if (normalizedIndex < 0) normalizedIndex += totalCards;
    
    setIsAnimating(true);
    setCurrentIndex(normalizedIndex);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % totalCards);
    }, 5000);
  
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  const handleCardClick = (cardIndex: number) => {
    const position = getCardPosition(cardIndex);
    
    if (Math.abs(position) <= 1) {
      snapToCard(cardIndex);
      
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      autoPlayRef.current = setInterval(() => {
        snapToCard(currentIndex + 1);
      }, 5000);
    }
  };

  const allCards = getAllCards();

  return (
    <section className="testimonials-section bg-white min-h-screen flex items-center justify-center py-20 overflow-clip relative">
      {/* Background gradient blobs */}
      <div className="absolute left-[-400px] top-[100px] w-[800px] h-[400px] opacity-20 mix-blend-multiply pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-blue-400/10 to-transparent blur-2xl" />
      </div>
      <div className="absolute right-[-400px] bottom-[100px] w-[800px] h-[400px] opacity-15 mix-blend-multiply pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/15 via-cyan-400/8 to-transparent blur-2xl" />
      </div>

      <div className="max-w-[1681px] mx-auto px-5 w-full relative z-10">
        <h2 className="text-5xl md:text-6xl lg:text-[82px] text-black font-medium leading-tight lg:leading-[90px] text-center tracking-[-1.2px] mb-16 lg:mb-24">
          Trusted by companies
        </h2>

        <div className="relative w-full h-[600px] flex items-center justify-center overflow-visible px-4">
          <div className="relative w-full max-w-[2200px] h-full flex items-center justify-center">
            {allCards.map(({ index, originalIndex }) => {
              const style = getCardStyle(index);
              const testimonial = testimonials[originalIndex];
              
              return (
                <div
                  key={index}
                  className="testimonial-card absolute top-1/2 left-1/2 cursor-pointer"
                  style={{ 
                    width: '700px',
                    marginLeft: '-350px',
                    marginTop: '-300px',
                    transform: style.transform,
                    filter: style.filter,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                    transformOrigin: 'center center',
                    transition: 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1), filter 0.6s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.6s cubic-bezier(0.33, 1, 0.68, 1)',
                    pointerEvents: style.pointerEvents as any,
                  }}
                  onClick={() => handleCardClick(index)}
                >
                  <div 
                    className="rounded-3xl shadow-2xl p-8 md:p-10 flex flex-col gap-8 md:gap-12 h-full bg-white border border-neutral-200"
                  >
                    <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed md:leading-[38px] tracking-wide">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center justify-between gap-8 md:gap-12">
                      <div className="h-[50px] md:h-[62px] w-[180px] md:w-[219px] flex-shrink-0">
                        <img 
                          alt="Company Logo" 
                          className="w-full h-full object-contain" 
                          src={testimonial.logo}
                          draggable={false}
                        />
                      </div>
                      <p className="text-lg md:text-xl text-black leading-relaxed font-semibold whitespace-nowrap">
                        {testimonial.author}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => snapToCard(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-black w-10' : 'bg-neutral-300 w-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}