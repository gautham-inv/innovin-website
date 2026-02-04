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
    <Link
      href={`/blog/${slug}`}
      className="flex flex-col gap-[15px] p-[20px] border border-[#E0E0E0] rounded-[16px] group xl:max-w-[520px] w-full min-w-0 h-full hover:bg-[#F2FBFF] hover:border-[#66C2E2] transition-colors duration-300"
    >
      {/* Image Container */}
      <div className="bg-white h-[244px] overflow-hidden relative rounded-[16px] w-full">
        {coverImage && (
          <div className="absolute inset-0">
            <div className="absolute inset-0 pointer-events-none rounded-[16px]">
              <Image
                src={urlFor(coverImage)?.width(800).height(540).url() || ''}
                alt={title}
                fill
                className="object-cover rounded-[16px]"
              />
              <div className="absolute bg-[rgba(0,0,0,0.4)] inset-0 rounded-[16px]" />
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
      <div className="flex flex-col items-start relative shrink-0 w-full flex-1">
        <div className="flex flex-col gap-[5px] items-start relative shrink-0 text-black w-full">
          <p className="font-['Manrope',sans-serif] font-medium leading-[38.709px] min-w-full relative shrink-0 text-[16px] tracking-[-0.24px] w-[min-content]">
            {title.split(":")[0]}{title.includes(":") ? ":" : ""}
          </p>
          <p className="font-['Manrope',sans-serif] font-semibold leading-[30.7px] relative shrink-0 text-[24px] tracking-[-0.36px] w-full group-hover:text-[#005c89] transition-colors group-hover:underline underline-offset-4 decoration-2">
            {title.includes(":") ? title.split(":")[1].trim() : title}
          </p>
        </div>
      </div>

      {/* Author and Date */}
      <div className="flex items-center justify-between font-['Manrope',sans-serif] font-bold leading-[20.729px] text-[12px] text-black tracking-[-0.18px] w-full gap-4">
        <p className="relative shrink-0">{authorName}</p>
        <p className="relative shrink-0">{formattedDate}</p>
      </div>
    </Link>
  );
}

