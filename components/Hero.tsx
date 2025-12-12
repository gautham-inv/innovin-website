import React from 'react';

export default function Hero() {
  return (
    <section className="bg-white min-h-screen flex items-center justify-center overflow-hidden relative">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient that moves */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(135,206,250,0.3) 50%, rgba(0,149,255,0.5) 100%)',
            animation: 'gradientMove 8s ease-in-out infinite'
          }}
        />
        
        {/* Animated blur circles */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(135,206,250,0.8) 0%, rgba(0,149,255,0.4) 50%, transparent 70%)',
            bottom: '-400px',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'float1 10s ease-in-out infinite'
          }}
        />
        
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(100,200,255,0.6) 0%, rgba(0,149,255,0.3) 50%, transparent 70%)',
            bottom: '-200px',
            left: '20%',
            animation: 'float2 12s ease-in-out infinite'
          }}
        />
        
        <div 
          className="absolute w-[700px] h-[700px] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(135,206,250,0.7) 0%, rgba(0,149,255,0.3) 50%, transparent 70%)',
            bottom: '-300px',
            right: '20%',
            animation: 'float3 14s ease-in-out infinite'
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto text-center px-4 sm:px-6 py-16 sm:py-20">
        {/* Main headline with blur fade-in animation */}
        <h1 className="font-semibold text-[#232323] mb-6 sm:mb-8 md:mb-10 lg:mb-12" style={{ animation: 'blurFadeIn 1.2s ease-out' }}>
          {/* Mobile and Tablet */}
          <span className="block lg:hidden">
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

          {/* Desktop */}
          <span className="hidden lg:block">
            <span className="block text-[80px] xl:text-[105px] leading-[1.1] tracking-[-0.02em] whitespace-nowrap">
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
        
        {/* Tagline with delayed blur fade-in */}
        <p 
          className="text-[#005c89] text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[31px] leading-[1.4] sm:leading-[1.5] lg:leading-[1.6] max-w-[90%] sm:max-w-4xl mx-auto font-medium"
          style={{ animation: 'blurFadeIn 1.2s ease-out 0.3s backwards' }}
        >
          We help startups and small businesses build bold, scalable tech fast.
        </p>

        
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes blurFadeIn {
          0% {
            opacity: 0;
            filter: blur(10px);
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }

        @keyframes gradientMove {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-30px) scale(1.05);
          }
        }

        @keyframes float1 {
          0%, 100% {
            transform: translate(-50%, 0) scale(1);
          }
          33% {
            transform: translate(-45%, -20px) scale(1.1);
          }
          66% {
            transform: translate(-55%, 10px) scale(0.95);
          }
        }

        @keyframes float2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 15px) scale(0.9);
          }
        }

        @keyframes float3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-40px, -25px) scale(1.08);
          }
          66% {
            transform: translate(25px, 20px) scale(0.92);
          }
        }
      `}</style>
    </section>
  );
}