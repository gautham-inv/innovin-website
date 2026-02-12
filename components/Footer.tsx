"use client";

import { useRouter } from "next/navigation";
import { useContactModal } from "./ContactModal";
import { useState } from "react";

export default function Footer() {
  const router = useRouter();
  const { openModal } = useContactModal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <footer className="bg-white min-h-[600px] sm:min-h-[650px] md:min-h-[700px] xl:h-[962px] overflow-hidden relative pt-8 sm:pt-10 md:pt-12 xl:pt-0 px-4 sm:px-6 md:px-8 xl:px-[70px] pb-4 sm:pb-6 md:pb-8 xl:pb-[70px] xl:flex xl:items-center">
      <div className="relative bg-black min-h-[550px] sm:min-h-[600px] md:min-h-[700px] xl:h-[850.707px] w-full max-w-[1681px] mx-auto rounded-[20px] sm:rounded-[24px] md:rounded-[28px] xl:rounded-[29.301px] overflow-hidden p-6 sm:p-8 md:p-12 xl:p-0">
        {/* Main Tagline */}
        <p className="xl:absolute xl:left-[79.11px] xl:top-[48.84px] text-[32px] sm:text-[42px] md:text-[56px] xl:text-[72.276px] text-white font-medium leading-[1.3] sm:leading-[1.28] md:leading-[1.26] xl:leading-[90.833px] tracking-[1.5px] sm:tracking-[2px] md:tracking-[2.8px] xl:tracking-[3.6138px] md:w-[90%] xl:w-[1003.07px] mb-8 sm:mb-10 md:mb-12 xl:mb-0">
          Fueling bold ideas with AI to help startups scale, innovate, and lead the future.
        </p>

        {/* Navigation Links */}
        <div className="xl:absolute xl:left-[79.11px] xl:top-[657.32px] flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 md:gap-[16.604px] items-start sm:items-center mb-8 sm:mb-10 md:mb-12 xl:mb-0">
          <button
            onClick={() => router.push("/")}
            className="px-[16px] sm:px-[18px] md:px-[20px] xl:px-[21.487px] py-[10px] sm:py-[11px] md:py-[12px] xl:py-[13.674px] rounded-[12px] md:rounded-[13px] xl:rounded-[14px] hover:bg-[#1a1a1a] transition-colors"
          >
            <p className="text-[#b4b7bc] text-[16px] sm:text-[17px] md:text-[19px] xl:text-[22.19px] font-medium leading-[1.3] md:leading-[1.35] xl:leading-[27.884px] text-left">
              Home
            </p>
          </button>
          <button
            onClick={() => router.push("/services")}
            className="px-[16px] sm:px-[18px] md:px-[20px] xl:px-[21.487px] py-[10px] sm:py-[11px] md:py-[12px] xl:py-[13.674px] rounded-[12px] md:rounded-[13px] xl:rounded-[14px] hover:bg-[#1a1a1a] transition-colors"
          >
            <p className="text-[#b4b7bc] text-[16px] sm:text-[17px] md:text-[19px] xl:text-[22.19px] font-medium leading-[1.3] md:leading-[1.35] xl:leading-[27.884px] text-left">
              Services
            </p>
          </button>
          <button
            onClick={() => router.push("/why-us")}
            className="px-[16px] sm:px-[18px] md:px-[20px] xl:px-[21.487px] py-[10px] sm:py-[11px] md:py-[12px] xl:py-[13.674px] rounded-[12px] md:rounded-[13px] xl:rounded-[14px] hover:bg-[#1a1a1a] transition-colors"
          >
            <p className="text-[#b4b7bc] text-[16px] sm:text-[17px] md:text-[19px] xl:text-[22.19px] font-medium leading-[1.3] md:leading-[1.35] xl:leading-[27.884px] text-left">
              Why us
            </p>
          </button>
          <button
            onClick={() => router.push("/about")}
            className="px-[16px] sm:px-[18px] md:px-[20px] xl:px-[21.487px] py-[10px] sm:py-[11px] md:py-[12px] xl:py-[13.674px] rounded-[12px] md:rounded-[13px] xl:rounded-[14px] hover:bg-[#1a1a1a] transition-colors"
          >
            <p className="text-[#b4b7bc] text-[16px] sm:text-[17px] md:text-[19px] xl:text-[22.19px] font-medium leading-[1.3] md:leading-[1.35] xl:leading-[27.884px] text-left">
              About us
            </p>
          </button>
          <button
            onClick={() => router.push("/blog")}
            className="px-[16px] sm:px-[18px] md:px-[20px] xl:px-[21.487px] py-[10px] sm:py-[11px] md:py-[12px] xl:py-[13.674px] rounded-[12px] md:rounded-[13px] xl:rounded-[14px] hover:bg-[#1a1a1a] transition-colors"
          >
            <p className="text-[#b4b7bc] text-[16px] sm:text-[17px] md:text-[19px] xl:text-[22.19px] font-medium leading-[1.3] md:leading-[1.35] xl:leading-[27.884px] text-left">
              Knowledge hub
            </p>
          </button>
          <button
            onClick={() => router.push("/careers")}
            className="px-[16px] sm:px-[18px] md:px-[20px] xl:px-[21.487px] py-[10px] sm:py-[11px] md:py-[12px] xl:py-[13.674px] rounded-[12px] md:rounded-[13px] xl:rounded-[14px] hover:bg-[#1a1a1a] transition-colors"
          >
            <p className="text-[#b4b7bc] text-[16px] sm:text-[17px] md:text-[19px] xl:text-[22.19px] font-medium leading-[1.3] md:leading-[1.35] xl:leading-[27.884px] text-left">
              Careers
            </p>
          </button>
          <button
            onClick={() => { openModal(); setIsMobileMenuOpen(false); }}
            className="px-[16px] sm:px-[18px] md:px-[20px] xl:px-[21.487px] py-[10px] sm:py-[11px] md:py-[12px] xl:py-[13.674px] rounded-[12px] md:rounded-[13px] xl:rounded-[14px] hover:bg-[#1a1a1a] transition-colors"
          >
            <p className="text-[#b4b7bc] text-[16px] sm:text-[17px] md:text-[19px] xl:text-[22.19px] font-medium leading-[1.3] md:leading-[1.35] xl:leading-[27.884px] text-left">
              Contact
            </p>
          </button>
        </div>

        {/* Divider */}
        <div className="xl:absolute xl:left-[79.11px] xl:right-[79.11px] xl:top-[757.92px] bg-[#393f45] h-[1px] xl:h-[0.977px] w-full xl:w-auto mb-6 sm:mb-7 md:mb-8 xl:mb-0"></div>

        {/* Footer Bottom */}
        <div className="xl:absolute xl:left-[79.11px] xl:right-[79.11px] xl:bottom-[55px] xl:top-auto xl:w-auto flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 items-start sm:items-center justify-between text-white text-[13px] sm:text-[14px] md:text-[15px] xl:text-[15.627px] leading-[1.5] sm:leading-[1.6] md:leading-[1.7] xl:leading-[27.884px]">
          <p>Innovin Labs ©,2026, All rights reserved</p>
          <div className="flex flex-row gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => router.push("/privacy")}
              className="hover:text-[#b4b7bc] transition-colors cursor-pointer"
            >
              Privacy policy
            </button>
            <button
              type="button"
              onClick={() => router.push("/terms")}
              className="hover:text-[#b4b7bc] transition-colors cursor-pointer"
            >
              Terms & conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}