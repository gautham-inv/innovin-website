"use client";

import Link from "next/link";
import { MapPin, Briefcase } from "lucide-react";

interface JobCardProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  location?: string;
  employmentType?: string;
  variant?: "default" | "compact";
}

const ArrowIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

function JobCard({ title, slug, description, location, employmentType, variant = "default" }: JobCardProps) {
  const isCompact = variant === "compact";

  return (
    <Link
      href={`/careers/${slug}`}
      className="group relative flex flex-col bg-white rounded-2xl border border-gray-200/80 overflow-hidden
        transition-all duration-300 ease-out
        hover:border-[#005c89]/40 hover:shadow-[0_8px_30px_rgba(0,92,137,0.12)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005c89]/50"
    >
      {/* Subtle accent bar */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#005c89] to-[#66C2E2] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className={`flex flex-col h-full ${isCompact ? "p-5 sm:p-6" : "p-6 sm:p-7 lg:p-8"} gap-4 sm:gap-5`}>
        {/* Badges */}
        {(location || employmentType) && (
          <div className="flex flex-wrap gap-2">
            {location && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs sm:text-[13px] font-medium text-[#005c89] bg-[#005c89]/8">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                {location}
              </span>
            )}
            {employmentType && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs sm:text-[13px] font-medium text-[#005c89] bg-[#005c89]/8">
                <Briefcase className="w-3.5 h-3.5 flex-shrink-0" />
                {employmentType}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className={`text-[#232323] font-semibold leading-tight text-balance ${
          isCompact ? "text-[20px] sm:text-[22px]" : "text-[22px] sm:text-[24px] lg:text-[26px]"
        }`}>
          {title}
        </h3>

        {/* Description */}
        <p className={`text-gray-600 leading-relaxed flex-1 line-clamp-3 ${
          isCompact ? "text-[14px] sm:text-[15px]" : "text-[15px] sm:text-[16px]"
        }`}>
          {description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-2 text-[#005c89] font-semibold text-[15px] sm:text-[16px] mt-auto pt-1
          group-hover:gap-3 transition-all duration-300">
          View details
          <ArrowIcon className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

export default JobCard;
