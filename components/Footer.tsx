"use client";

import { useRouter } from "next/navigation";
import { useContactModal } from "./ContactModal";
import { useState } from "react";
export default function Footer() {
  const router = useRouter();
  const { openModal } = useContactModal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <footer className="bg-white min-h-[600px] sm:min-h-[700px] lg:h-[962px] overflow-hidden relative pt-8 sm:pt-12 lg:pt-0 px-4 sm:px-6 lg:px-[70px] pb-4 sm:pb-6 lg:pb-[70px]">
      <div className="relative lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 bg-black min-h-[550px] sm:min-h-[650px] lg:h-[850.707px] w-full max-w-[1593px] mx-auto rounded-[20px] sm:rounded-[24px] lg:rounded-[29.301px] overflow-hidden p-6 sm:p-10 lg:p-0">
        {/* Main Tagline */}
        <p className="lg:absolute lg:left-[79.11px] lg:top-[48.84px] text-[32px] sm:text-[48px] lg:text-[72.276px] text-white font-medium leading-[1.3] sm:leading-[1.25] lg:leading-[90.833px] tracking-[1.5px] sm:tracking-[2.5px] lg:tracking-[3.6138px] lg:w-[1003.07px] mb-8 sm:mb-12 lg:mb-0">
          Fueling bold ideas with AI to help startups scale, innovate, and lead the future.
        </p>

        {/* Navigation Links */}
        <div className="lg:absolute lg:left-[79.11px] lg:top-[657.32px] flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-[16.604px] items-start sm:items-center mb-8 sm:mb-10 lg:mb-0">
          <button 
            onClick={() => router.push("/")} 
            className="px-[16px] sm:px-[21.487px] py-[10px] sm:py-[13.674px] rounded-[12px] sm:rounded-[14px] hover:bg-[#1a1a1a] transition-colors"
          >
            <p className="text-[#b4b7bc] text-[16px] sm:text-[18px] lg:text-[22.19px] font-medium leading-[1.3] sm:leading-[27.884px] text-left">
              Home
            </p>
          </button>
          <button 
            onClick={() => router.push("/why-us")} 
            className="px-[16px] sm:px-[21.487px] py-[10px] sm:py-[13.674px] rounded-[12px] sm:rounded-[14px] hover:bg-[#1a1a1a] transition-colors"
          >
            <p className="text-[#b4b7bc] text-[16px] sm:text-[18px] lg:text-[22.19px] font-medium leading-[1.3] sm:leading-[27.884px] text-left">
              Why us
            </p>
          </button>
          <button 
            onClick={() => router.push("/about")} 
            className="px-[16px] sm:px-[21.487px] py-[10px] sm:py-[13.674px] rounded-[12px] sm:rounded-[14px] hover:bg-[#1a1a1a] transition-colors"
          >
            <p className="text-[#b4b7bc] text-[16px] sm:text-[18px] lg:text-[22.19px] font-medium leading-[1.3] sm:leading-[27.884px] text-left">
              About us
            </p>
          </button>
          <button 
            onClick={() => router.push("/blog")} 
            className="px-[16px] sm:px-[21.487px] py-[10px] sm:py-[13.674px] rounded-[12px] sm:rounded-[14px] hover:bg-[#1a1a1a] transition-colors"
          >
            <p className="text-[#b4b7bc] text-[16px] sm:text-[18px] lg:text-[22.19px] font-medium leading-[1.3] sm:leading-[27.884px] text-left">
              Knowledge hub
            </p>
          </button>
          <button 
            onClick={() => router.push("/careers")} 
            className="px-[16px] sm:px-[21.487px] py-[10px] sm:py-[13.674px] rounded-[12px] sm:rounded-[14px] hover:bg-[#1a1a1a] transition-colors"
          >
            <p className="text-[#b4b7bc] text-[16px] sm:text-[18px] lg:text-[22.19px] font-medium leading-[1.3] sm:leading-[27.884px] text-left">
              Careers
            </p>
          </button>
          <button onClick={() => { openModal(); setIsMobileMenuOpen(false); }} className="px-[16px] sm:px-[21.487px] py-[10px] sm:py-[13.674px] rounded-[12px] sm:rounded-[14px] hover:bg-[#1a1a1a] transition-colors">
            <p className="text-[#b4b7bc] text-[16px] sm:text-[18px] lg:text-[22.19px] font-medium leading-[1.3] sm:leading-[27.884px] text-left">
              Contact
            </p>
          </button>
        </div>

        {/* Divider */}
        <div className="lg:absolute lg:left-1/2 lg:top-[757.92px] lg:-translate-x-1/2 bg-[#393f45] h-[1px] lg:h-[0.977px] w-full lg:w-[1497.28px] mb-6 sm:mb-8 lg:mb-0"></div>

        {/* Footer Bottom */}
        <div className="lg:absolute lg:left-[79.11px] lg:top-[789.17px] lg:w-[1466.03px] flex flex-col sm:flex-row gap-4 sm:gap-0 items-start sm:items-center justify-between text-white text-[13px] sm:text-[14px] lg:text-[15.627px] leading-[1.5] sm:leading-[27.884px]">
          <p>Innovin Labs ©,2025, All rights reserved</p>
          <p className="hover:text-[#b4b7bc] transition-colors cursor-pointer">Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
}