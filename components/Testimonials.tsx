"use client";

import { useEffect, useRef, useState } from "react";

const imgZirklyFullLogo1 = "/images/0e1e238a26444c8cba519ce5114ec632284ffba6.png";
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
    let opacity = 1;
    let zIndex = 10;
    let translateX = position * 350; // More overlap

    if (absPosition === 0) {
      // Center card (front)
      scale = 1;
      opacity = 1;
      zIndex = 50;
    } else if (absPosition === 1) {
      // Cards immediately next to center
      scale = 0.92;
      opacity = 0.85;
      zIndex = 40;
    } else if (absPosition === 2) {
      // Cards at the edges (pushed further back)
      scale = 0.84;
      opacity = 0.7;
      zIndex = 30;
    } else {
      // Cards further away (hidden)
      scale = 0.7;
      opacity = 0;
      zIndex = 10;
    }

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity,
      zIndex: 50 - absPosition * 5, // Dynamic z-index that changes during animation
      pointerEvents: absPosition <= 2 ? 'auto' : 'none',
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
    
    // Respond to clicks on any visible card
    if (Math.abs(position) <= 2) {
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
      <div className="absolute h-full left-1/2 overflow-clip rounded-[23.408px] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[98vw] max-w-[1800px]">
        {/* Background decorative ellipse at top */}
        <div className="absolute h-[950.137px] left-1/2 -translate-x-1/2 top-[-550px] w-[1755.93px] max-w-[200%]">
          <div className="absolute inset-[-75.24%_-40.71%]">
            <img 
              alt="" 
              className="block max-w-none w-full h-full object-contain" 
              src={imgEllipse1}
              onError={(e) => {
                console.error('Failed to load ellipse image:', imgEllipse1);
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1681px] mx-auto px-5 w-full relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-[64px] text-black font-semibold leading-tight lg:leading-[85.4px] text-center tracking-wide lg:tracking-[1.92px] mb-12 lg:mb-20 font-['Manrope',sans-serif]">
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
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                    transformOrigin: 'center center',
                    transition: 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.6s cubic-bezier(0.33, 1, 0.68, 1), z-index 0s linear',
                    pointerEvents: style.pointerEvents as any,
                  }}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="bg-white rounded-[10px] shadow-[0px_2.25px_5px_0px_rgba(0,0,0,0.25)] p-6 md:p-[25px] flex flex-col gap-8 md:gap-[52.5px] h-full">
                    <p className="text-lg md:text-xl lg:text-[25px] text-black leading-relaxed md:leading-[32.5px] tracking-wide md:tracking-[0.75px] font-['Plus_Jakarta_Sans',sans-serif]">
                      {testimonial.quote}
                    </p>

                    <div className="flex items-center justify-between gap-8 md:gap-[50px]">
                      <div className="h-[50px] md:h-[62px] w-[180px] md:w-[219px] flex-shrink-0">
                        <img 
                          alt="Company Logo" 
                          className="w-full h-full object-contain" 
                          src={testimonial.logo}
                          draggable={false}
                        />
                      </div>
                      <p className="text-base md:text-lg lg:text-[20px] text-black leading-relaxed md:leading-[32.5px] tracking-wide md:tracking-[0.6px] font-['Poppins',sans-serif] font-medium whitespace-nowrap">
                        {testimonial.author}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => snapToCard(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-black w-8' : 'bg-gray-300 w-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}