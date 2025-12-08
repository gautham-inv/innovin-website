"use client";

export default function Footer() {
  return (
    <footer className="bg-white h-[962px] overflow-hidden relative">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black h-[850.707px] w-[1593px] rounded-[29.301px] overflow-hidden">
        <p className="absolute left-[79.11px] top-[48.84px] text-[72.276px] text-white font-medium leading-[90.833px] tracking-[3.6138px] w-[1003.07px]">
          Fueling bold ideas with AI to help startups scale, innovate, and lead the future.
        </p>
        <div className="absolute left-[79.11px] top-[657.32px] flex gap-[16.604px] items-center">
          <button className="px-[21.487px] py-[13.674px] rounded-[14px]">
            <p className="text-[#b4b7bc] text-[22.19px] font-medium leading-[27.884px]">
              Home
            </p>
          </button>
          <button className="px-[21.487px] py-[13.674px] rounded-[14px]">
            <p className="text-[#b4b7bc] text-[22.19px] font-medium leading-[27.884px]">
              Why us
            </p>
          </button>
          <button className="px-[21.487px] py-[13.674px] rounded-[14px]">
            <p className="text-[#b4b7bc] text-[22.19px] font-medium leading-[27.884px]">
              About us
            </p>
          </button>
          <button className="px-[21.487px] py-[13.674px] rounded-[14px]">
            <p className="text-[#b4b7bc] text-[22.19px] font-medium leading-[27.884px]">
              Knowledge hub
            </p>
          </button>
          <button className="px-[21.487px] py-[13.674px] rounded-[14px]">
            <p className="text-[#b4b7bc] text-[22.19px] font-medium leading-[27.884px]">
              Careers
            </p>
          </button>
          <button className="px-[21.487px] py-[13.674px] rounded-[14px]">
            <p className="text-[#b4b7bc] text-[22.19px] font-medium leading-[27.884px]">
              Contact
            </p>
          </button>
        </div>
        <div className="absolute left-1/2 top-[757.92px] -translate-x-1/2 bg-[#393f45] h-[0.977px] w-[1497.28px]"></div>
        <div className="absolute left-[79.11px] top-[789.17px] w-[1466.03px] flex items-center justify-between text-white text-[15.627px] leading-[27.884px]">
          <p>Innovin Labs ©,2025, All rights reserved</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
}

