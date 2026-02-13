"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/lib/utils";

interface BlogCardProps {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: any;
  date?: string;
  author?: {
    firstName?: string;
    lastName?: string;
    picture?: any;
  };
  categories?: Array<{
    _id: string;
    title: string;
    color?: string;
  }>;
}

export default function BlogCard({
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  date,
  author,
  categories,
}: BlogCardProps) {
  const authorName = author?.firstName && author?.lastName
    ? `${author.firstName} ${author.lastName}`
    : "Unknown Author";

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
    : "";

  const primaryCategory = categories && categories.length > 0 ? categories[0] : null;
  const categoryColor = primaryCategory?.color || "#66C2E2";

  return (
    <Link
      href={`/blog/${slug}`}
      className="flex flex-col gap-[15px] p-[20px] border border-[#E0E0E0] rounded-[16px] group w-full min-w-0 h-full transition-all duration-300 hover:bg-[var(--theme-color-light)] hover:border-[var(--theme-color)]"
      style={{
        // Define CSS variable for the theme color
        ['--theme-color' as any]: categoryColor,
        ['--theme-color-light' as any]: `${categoryColor}15`, // ~8% opacity hex suffix
      } as any}
    >
      {/* Image Container */}
      <div className="bg-white h-[244px] overflow-hidden relative rounded-[16px] w-full">
        {coverImage && (
          <div className="absolute inset-0">
            <div className="absolute inset-0 pointer-events-none rounded-[16px]">
              {urlFor(coverImage)?.width(800).url() && (
                <Image
                  src={urlFor(coverImage)?.width(800).url()!}
                  alt={title}
                  fill
                  className="object-contain rounded-[16px] transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute bg-[rgba(0,0,0,0.3)] inset-0 rounded-[16px]" />
            </div>
          </div>
        )}

        {/* Category Chip */}
        {primaryCategory && (
          <div
            className="absolute flex items-center gap-2 left-[18px] px-3 py-1.5 rounded-full top-[18px] z-10 font-['Manrope',sans-serif] font-bold text-[12px] shadow-sm border bg-white border-[#E0E0E0] text-neutral-700"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: categoryColor }}
            />
            {primaryCategory.title}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col items-start relative shrink-0 w-full flex-1">
        <div className="flex flex-col gap-[5px] items-start relative shrink-0 text-black w-full">
          <p className="font-['Manrope',sans-serif] font-semibold leading-[30.7px] relative shrink-0 text-[24px] tracking-[-0.36px] w-full transition-colors">
            {title}
          </p>
        </div>
      </div>

      {/* Author and Date */}
      <div className="flex items-center justify-between font-['Manrope',sans-serif] font-bold leading-[20.729px] text-[12px] text-neutral-500 tracking-[-0.18px] w-full gap-4 pt-2">
        <p className="relative shrink-0">{authorName}</p>
        <p className="relative shrink-0">{formattedDate}</p>
      </div>
    </Link>
  );
}

