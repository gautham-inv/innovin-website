"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/lib/utils";
import BlogCard from "./BlogCard";
import Footer from "./Footer";

interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  color?: string;
}

interface Post {
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
  categories?: Category[];
}

interface BlogPageProps {
  posts: Post[];
  categories: Category[];
  featuredPost?: Post;
}

export default function BlogPage({ posts, categories, featuredPost }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter posts based on selected category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") {
      return posts;
    }
    return posts.filter((post) =>
      post.categories?.some((cat) => cat._id === selectedCategory)
    );
  }, [posts, selectedCategory]);

  // Get featured post (first post if not provided)
  const featured = featuredPost || posts[0];
  const featuredAuthorName =
    featured?.author?.firstName && featured?.author?.lastName
      ? `${featured.author.firstName} ${featured.author.lastName}`
      : "Unknown Author";
  const featuredDate = featured?.date
    ? new Date(featured.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="bg-white w-full pt-[146px] pb-[90px]">
      <div className="max-w-[1681px] mx-auto px-[70px]">
        {/* Header Section */}
        <div className="flex flex-col gap-[50px] items-center justify-center py-[70px]">
          <h1 className="font-['Manrope',sans-serif] font-semibold leading-[90.6px] relative shrink-0 text-[56px] text-black tracking-[-0.84px] w-full text-center">
            Unlock the Secrets of Tech: Engineering Excellence Uncovered
          </h1>
          <p className="font-['Inter',sans-serif] font-normal leading-[1.2] not-italic relative shrink-0 text-[#005c89] text-[31px] w-full text-center">
            Explore the minds of our engineers — real-world challenges, innovative solutions, and insights on AI, DevOps, Analytics, UI/UX, and more.
          </p>

          {/* Featured Post Hero */}
          {featured && (
            <div className="relative w-full rounded-[20px] overflow-hidden p-[30px] min-h-[262px]">
              <div className="absolute inset-0 pointer-events-none rounded-[20px]">
                <div className="absolute bg-[#1a1a1a] inset-0 rounded-[20px]" />
                {featured.coverImage && (
                  <Image
                    src={urlFor(featured.coverImage)?.width(1681).height(262).url() || ''}
                    alt={featured.title}
                    fill
                    className="object-cover opacity-20 rounded-[20px]"
                  />
                )}
              </div>
              <div className="relative h-full flex flex-col items-start justify-center text-white">
                <div className="flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                  <p className="font-['Manrope',sans-serif] font-semibold leading-[50.6px] relative shrink-0 text-[60px] tracking-[-0.9px] w-full">
                    {featured.title.split(":")[0]}{featured.title.includes(":") ? ":" : ""}
                  </p>
                  <p className="font-['Manrope',sans-serif] font-normal leading-[52.6px] relative shrink-0 text-[30px] tracking-[-0.45px] w-full">
                    {featured.title.includes(":") ? featured.title.split(":")[1].trim() : featured.title}
                  </p>
                </div>
                <p className="font-['Manrope',sans-serif] font-light leading-[50.6px] relative shrink-0 text-[20px] tracking-[-0.3px] w-full mt-4">
                  by {featuredAuthorName} | {featuredDate}
                </p>
              </div>
            </div>
          )}

          {/* Categories Section */}
          <div className="w-full">
            <h2 className="font-['Manrope',sans-serif] font-semibold leading-[47.6px] relative shrink-0 text-[24px] text-black tracking-[-0.36px] w-full mb-6">
              Categories
            </h2>
            <div className="flex flex-wrap gap-[13px] items-center">
              {/* All Category Chip */}
              <button
                onClick={() => setSelectedCategory("all")}
                className={`border-[1.195px] border-solid content-stretch flex items-center justify-center px-[16.95px] py-[12.95px] relative rounded-[23.893px] shrink-0 transition-colors ${
                  selectedCategory === "all"
                    ? "bg-[rgba(215,237,248,0.6)] border-[#005c89]"
                    : "bg-white border-[#E0E0E0] hover:bg-gray-50"
                }`}
              >
                <p className="font-['Manrope',sans-serif] font-normal leading-[27.964px] relative shrink-0 text-[16px] text-black text-nowrap tracking-[0.0067px] whitespace-pre">
                  All
                </p>
              </button>

              {/* Category Chips */}
              {categories.map((category) => {
                const isSelected = selectedCategory === category._id;
                const categoryColor = category.color || "#1abcfe";
                return (
                  <button
                    key={category._id}
                    onClick={() => setSelectedCategory(category._id)}
                    className={`border-[1.195px] border-solid content-stretch flex items-center justify-center px-[16.95px] py-[12.95px] relative rounded-[23.893px] shrink-0 transition-colors ${
                      isSelected
                        ? "bg-[rgba(215,237,248,0.6)] border-[#005c89]"
                        : "bg-white border-[#E0E0E0] hover:bg-gray-50"
                    }`}
                  >
                    <p className="font-['Manrope',sans-serif] font-normal leading-[27.964px] relative shrink-0 text-[16px] text-black text-nowrap tracking-[0.0067px] whitespace-pre">
                      {category.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="flex flex-col gap-[94px] items-start py-[50px]">
          {filteredPosts.length > 0 ? (
            <>
              {/* First Row */}
              {filteredPosts.length >= 3 && (
                <div className="flex gap-[13px] items-start justify-center relative shrink-0 w-full">
                  {filteredPosts.slice(0, 3).map((post) => (
                    <BlogCard key={post._id} {...post} />
                  ))}
                </div>
              )}

              {/* Second Row */}
              {filteredPosts.length >= 6 && (
                <div className="flex gap-[13px] items-start justify-center relative shrink-0 w-full">
                  {filteredPosts.slice(3, 6).map((post) => (
                    <BlogCard key={post._id} {...post} />
                  ))}
                </div>
              )}

              {/* Remaining Posts */}
              {filteredPosts.length > 6 && (
                <div className="flex gap-[13px] items-start justify-center relative shrink-0 w-full flex-wrap">
                  {filteredPosts.slice(6).map((post) => (
                    <BlogCard key={post._id} {...post} />
                  ))}
                </div>
              )}

              {/* If less than 3 posts, show them in a single row */}
              {filteredPosts.length < 3 && (
                <div className="flex gap-[13px] items-start justify-center relative shrink-0 w-full flex-wrap">
                  {filteredPosts.map((post) => (
                    <BlogCard key={post._id} {...post} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 w-full">
              <p className="text-[24px] text-gray-500">No blog posts found in this category.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

