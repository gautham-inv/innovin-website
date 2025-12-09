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
  const categoryColor = primaryCategory?.color || "#1abcfe";

  return (
    <Link href={`/blog/${slug}`} className="flex flex-col gap-[15px] p-[20px] border border-[#E0E0E0] rounded-[16px] group">
      {/* Image Container */}
      <div className="bg-white h-[244px] overflow-hidden relative rounded-[16px] w-full">
        {coverImage && (
          <div className="absolute h-[305.333px] left-0 rounded-tl-[16px] rounded-tr-[16px] top-0 w-[458px]">
            <div className="absolute inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]">
              <Image
                src={urlFor(coverImage)?.width(458).height(305).url() || ''}
                alt={title}
                fill
                className="object-cover rounded-tl-[16px] rounded-tr-[16px]"
              />
              <div className="absolute bg-[rgba(0,0,0,0.4)] inset-0 rounded-tl-[16px] rounded-tr-[16px]" />
            </div>
          </div>
        )}
        
        {/* Category Chip */}
        {primaryCategory && (
          <div
            className="absolute bg-white flex gap-[2.115px] items-center left-[18px] px-[5.288px] py-[4.231px] rounded-[52.881px] top-[28px] z-10"
          >
            <p className="font-['Inter',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12.692px] text-black text-nowrap tracking-[-0.1904px] whitespace-pre">
              {primaryCategory.title}
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <div className="flex flex-col gap-[5px] items-start relative shrink-0 text-black w-full">
          <p className="font-['Manrope',sans-serif] font-medium leading-[38.709px] min-w-full relative shrink-0 text-[16px] tracking-[-0.24px] w-[min-content]">
            {title.split(":")[0]}{title.includes(":") ? ":" : ""}
          </p>
          <p className="font-['Manrope',sans-serif] font-semibold leading-[30.7px] relative shrink-0 text-[24px] tracking-[-0.36px] w-full group-hover:text-[#005c89] transition-colors">
            {title.includes(":") ? title.split(":")[1].trim() : title}
          </p>
        </div>
      </div>

      {/* Author and Date */}
      <div className="flex font-['Manrope',sans-serif] font-bold gap-[257px] items-center leading-[20.729px] relative shrink-0 text-[12px] text-black text-nowrap tracking-[-0.18px] w-full whitespace-pre">
        <p className="relative shrink-0">{authorName}</p>
        <p className="relative shrink-0">{formattedDate}</p>
      </div>
    </Link>
  );
}

