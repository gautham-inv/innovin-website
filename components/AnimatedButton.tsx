"use client";

import { ArrowUpRight } from "lucide-react";

interface AnimatedButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function AnimatedButton({ href, onClick, children, className = "" }: AnimatedButtonProps) {
  const buttonContent = (
    <span className="relative inline-flex items-center justify-center gap-2 overflow-hidden">
      {/* Left arrow - initially hidden */}
      <ArrowUpRight 
        className="absolute left-0 w-4 h-4 opacity-0 -translate-x-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" 
      />
      
      {/* Button text - shifts right on hover */}
      <span className="transition-all duration-300 group-hover:translate-x-5">
        {children}
      </span>
      
      {/* Right arrow - visible initially, slides out on hover */}
      <ArrowUpRight 
        className="w-4 h-4 opacity-100 translate-x-0 transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-full" 
      />
    </span>
  );

  const buttonClasses = `
    group relative
    px-6 py-2.5
    rounded-full
    border border-[#005C89]/50
    bg-gradient-to-l from-[#005C89] to-[#0088CC]
    text-white text-sm font-semibold
    overflow-hidden
    transition-all duration-300
    hover:bg-none hover:bg-white hover:text-[#005C89]
    hover:shadow-lg
    focus:outline-none focus:ring-2 focus:ring-[#005C89]/40
    ${className}
  `;

  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {/* Gradient overlay that appears on hover */}
        <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-full" 
          style={{ background: 'linear-gradient(135deg, rgba(0,92,137,0.5), rgba(0,92,137,0.8))' }}
        />
        <span className="relative z-10">
          {buttonContent}
        </span>
      </a>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {/* Gradient overlay that appears on hover */}
      <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-full" 
        style={{ background: 'linear-gradient(135deg, rgba(0,92,137,0.5), rgba(0,92,137,0.8))' }}
      />
      <span className="relative z-10">
        {buttonContent}
      </span>
    </button>
  );
}

