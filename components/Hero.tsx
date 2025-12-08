"use client";

const imgEllipse1 = "/images/blue_gradient.svg";

export default function Hero() {
  return (
    <section className="bg-white h-[1124.77px] overflow-clip relative">
      <div className="absolute h-[1049.86px] left-1/2 overflow-clip rounded-[23.408px] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[98vw] max-w-[1800px]
">
        {/* Main headline */}
        <div className="absolute font-['Manrope:SemiBold',sans-serif] font-semibold leading-[0] left-1/2 text-[#232323] text-[0px] text-center text-nowrap top-[calc(50%-310.63px)] -translate-x-1/2 tracking-[-1.5801px] whitespace-pre">
          <p className="leading-[120.552px] mb-0 text-[105.337px]">
            <span className="font-['Manrope:Regular',sans-serif] font-normal">Rapidly Transforming</span> <span className="font-['Manrope:Bold',sans-serif] font-bold">Ideas</span> <span className="font-['Manrope:Regular',sans-serif] font-normal">into</span>
            <span className="font-['Manrope:Medium',sans-serif] font-medium"> </span>
          </p>
          <p className="leading-[120.552px] text-[105.337px]">
            <span className="font-['Manrope:Regular',sans-serif] font-normal">robust</span> <span className="font-['Manrope:Bold',sans-serif] font-bold">Digital Solutions</span>
          </p>
        </div>
        
        {/* Tagline */}
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[1.2] left-1/2 -translate-x-1/2 not-italic text-[#005c89] text-[31px] top-[482.55px] w-[90%] max-w-[1031px]">
          We help startups and small businesses build bold, scalable tech fast.
        </p>
        
        {/* Background decorative ellipse */}
        <div className="absolute h-[950.137px] left-1/2 -translate-x-1/2 top-[910.18px] w-[1755.93px] max-w-[200%]">
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
    </section>
  );
}

