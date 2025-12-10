"use client";

const imgEllipse1 = "/images/blue_gradient.svg";

export default function Hero() {
  return (
    <section className="bg-white min-h-screen flex items-center justify-center overflow-clip relative py-20 px-4">
      {/* Background decorative ellipse */}
      <div className="absolute h-[950.137px] left-1/2 -translate-x-1/2 bottom-[-400px] w-[1755.93px] max-w-[200%] pointer-events-none">
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
        <h1 className="font-semibold text-[#232323] mb-8 md:mb-10 lg:mb-12">
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[105px] leading-tight tracking-tight">
            <span className="font-normal">Rapidly Transforming</span>{" "}
            <span className="font-bold">Ideas</span>{" "}
            <span className="font-normal">into</span>
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[105px] leading-tight tracking-tight mt-2">
            <span className="font-normal">robust</span>{" "}
            <span className="font-bold">Digital Solutions</span>
          </span>
        </h1>
        
        {/* Tagline */}
        <p className="text-[#005c89] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[31px] leading-relaxed max-w-4xl mx-auto px-4">
          We help startups and small businesses build bold, scalable tech fast.
        </p>
      </div>
    </section>
  );
}