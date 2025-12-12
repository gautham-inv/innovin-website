"use client";

const imgEllipse1 = "/images/blue_gradient.svg";

export default function Hero() {
  return (
    <section className="bg-white min-h-screen flex items-center justify-center overflow-clip relative py-16 sm:py-20 px-4 sm:px-6">
      {/* Background decorative ellipse */}
      <div className="absolute h-[600px] sm:h-[750px] lg:h-[950.137px] left-1/2 -translate-x-1/2 bottom-[-200px] sm:bottom-[-300px] lg:bottom-[-400px] w-[1200px] sm:w-[1500px] lg:w-[1755.93px] max-w-[200%] pointer-events-none">
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

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Main headline */}
        <h1 className="font-semibold text-[#232323] mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          {/* Mobile and Tablet: Stack naturally */}
          <span className="block lg:hidden">
            <span className="block text-[32px] sm:text-[48px] md:text-[64px] leading-[1.1] tracking-[-0.02em]">
              <span className="font-normal">Rapidly Transforming</span>{" "}
              <span className="font-bold">Ideas</span>{" "}
              <span className="font-normal">into</span>
            </span>
            <span className="block text-[32px] sm:text-[48px] md:text-[64px] leading-[1.1] tracking-[-0.02em] mt-2">
              <span className="font-normal">robust</span>{" "}
              <span className="font-bold">Digital Solutions</span>
            </span>
          </span>

          {/* Desktop: Keep all on one line, then second line */}
          <span className="hidden lg:block">
            <span className="block text-[80px] xl:text-[105px] leading-[1.1] tracking-[-0.02em] whitespace-nowrap">
              <span className="font-normal">Rapidly Transforming</span>{" "}
              <span className="font-bold">Ideas</span>{" "}
              <span className="font-normal">into</span>
            </span>
            <span className="block text-[80px] xl:text-[105px] leading-[1.1] tracking-[-0.02em] mt-2">
              <span className="font-normal">robust</span>{" "}
              <span className="font-bold">Digital Solutions</span>
            </span>
          </span>
        </h1>
        
        {/* Tagline */}
        <p className="text-[#005c89] text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[31px] leading-[1.4] sm:leading-[1.5] lg:leading-[1.6] max-w-[90%] sm:max-w-4xl mx-auto">
          We help startups and small businesses build bold, scalable tech fast.
        </p>
      </div>
    </section>
  );
}