import React from 'react';

export default function Hero() {
  return (
    <section className="bg-white min-h-screen flex items-center justify-center overflow-hidden relative">
      {/* Animated Gradient Background - Optimized */}
      <div className="absolute inset-0 overflow-hidden will-change-transform">
        {/* Base gradient that moves */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(135,206,250,0.3) 50%, rgba(0,149,255,0.5) 100%)',
            animation: 'gradientMove 8s ease-in-out infinite',
            willChange: 'transform'
          }}
        />
        
        {/* Animated blur circles - Optimized for performance */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(135,206,250,0.8) 0%, rgba(0,149,255,0.4) 50%, transparent 70%)',
            bottom: '-400px',
            left: '50%',
            transform: 'translateX(-50%)',
            filter: 'blur(80px)',
            animation: 'float1 10s ease-in-out infinite',
            willChange: 'transform'
          }}
        />
        
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(100,200,255,0.6) 0%, rgba(0,149,255,0.3) 50%, transparent 70%)',
            bottom: '-200px',
            left: '20%',
            filter: 'blur(80px)',
            animation: 'float2 12s ease-in-out infinite',
            willChange: 'transform'
          }}
        />
        
        <div 
          className="absolute w-[700px] h-[700px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(135,206,250,0.7) 0%, rgba(0,149,255,0.3) 50%, transparent 70%)',
            bottom: '-300px',
            right: '20%',
            filter: 'blur(80px)',
            animation: 'float3 14s ease-in-out infinite',
            willChange: 'transform'
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto text-center px-4 sm:px-6 py-16 sm:py-20">
        {/* Main headline with smooth blur fade-in animation */}
        <h1 
          className="font-semibold text-[#232323] mb-6 sm:mb-8 md:mb-10 lg:mb-12 fade-in-blur"
        >
          {/* Mobile and Tablet */}
          <span className="block xl:hidden">
            <span className="block text-[32px] sm:text-[48px] md:text-[64px] leading-[1.1] tracking-[-0.02em]">
              <span className="font-normal">Rapidly Transforming</span>{" "}
              <span className="font-bold bg-gradient-to-r from-[#005c89] to-[#0095ff] bg-clip-text text-transparent">Ideas</span>{" "}
              <span className="font-normal">into</span>
            </span>
            <span className="block text-[32px] sm:text-[48px] md:text-[64px] leading-[1.1] tracking-[-0.02em] mt-2">
              <span className="font-normal">robust</span>{" "}
              <span className="font-bold bg-gradient-to-r from-[#005c89] to-[#0095ff] bg-clip-text text-transparent">Digital Solutions</span>
            </span>
          </span>

          {/* Desktop - Centered */}
          <span className="hidden xl:block">
            <span className="block text-[80px] xl:text-[105px] leading-[1.1] tracking-[-0.02em]">
              <span className="font-normal">Rapidly Transforming</span>{" "}
              <span className="font-bold bg-gradient-to-r from-[#005c89] to-[#0095ff] bg-clip-text text-transparent">Ideas</span>{" "}
              <span className="font-normal">into</span>
            </span>
            <span className="block text-[80px] xl:text-[105px] leading-[1.1] tracking-[-0.02em] mt-2">
              <span className="font-normal">robust</span>{" "}
              <span className="font-bold bg-gradient-to-r from-[#005c89] to-[#0095ff] bg-clip-text text-transparent">Digital Solutions</span>
            </span>
          </span>
        </h1>
        
        {/* Tagline with delayed smooth fade-in */}
        <p 
          className="text-[#005c89] text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[31px] leading-[1.4] sm:leading-[1.5] lg:leading-[1.6] max-w-[90%] sm:max-w-4xl mx-auto font-medium fade-in-blur"
          style={{ animationDelay: '0.2s' }}
        >
          We help startups and small businesses build bold, scalable tech fast.
        </p>

        
      </div>

      {/* Optimized CSS Animations */}
      <style>{`
        /* Smoother blur fade-in with GPU acceleration */
        @keyframes blurFadeIn {
          0% {
            opacity: 0;
            filter: blur(8px);
            transform: translate3d(0, 15px, 0);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: translate3d(0, 0, 0);
          }
        }

        .fade-in-blur {
          animation: blurFadeIn 1s cubic-bezier(0.4, 0, 0.2, 1) backwards;
          will-change: opacity, filter, transform;
        }

        /* Reduce animations on mobile for better performance */
        @media (max-width: 768px) {
          .fade-in-blur {
            animation: simpleFadeIn 0.8s ease-out backwards;
          }
          
          @keyframes simpleFadeIn {
            0% {
              opacity: 0;
              transform: translate3d(0, 10px, 0);
            }
            100% {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }
        }

        /* Smoother background animations with GPU acceleration */
        @keyframes gradientMove {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, -30px, 0) scale(1.05);
          }
        }

        @keyframes float1 {
          0%, 100% {
            transform: translate3d(-50%, 0, 0) scale(1);
          }
          33% {
            transform: translate3d(-45%, -20px, 0) scale(1.1);
          }
          66% {
            transform: translate3d(-55%, 10px, 0) scale(0.95);
          }
        }

        @keyframes float2 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          33% {
            transform: translate3d(30px, -30px, 0) scale(1.05);
          }
          66% {
            transform: translate3d(-20px, 15px, 0) scale(0.9);
          }
        }

        @keyframes float3 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          33% {
            transform: translate3d(-40px, -25px, 0) scale(1.08);
          }
          66% {
            transform: translate3d(25px, 20px, 0) scale(0.92);
          }
        }

        /* Disable animations on devices that prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .fade-in-blur,
          [style*="animation"] {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}