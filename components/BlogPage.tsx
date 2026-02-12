"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/lib/utils";
import BlogCard from "./BlogCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter posts based on selected category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") {
      return posts;
    }
    return posts.filter((post) =>
      post.categories?.some((cat) => cat._id === selectedCategory)
    );
  }, [posts, selectedCategory]);

  // Get recent posts for carousel (first 5 posts)
  const recentPosts = useMemo(() => {
    return posts.slice(0, 5);
  }, [posts]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.offsetWidth;
      container.scrollBy({ left: -itemWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.offsetWidth;
      container.scrollBy({ left: itemWidth, behavior: "smooth" });
    }
  };

  return (
    <main id="main-content" className="bg-white w-full pt-[100px] sm:pt-[120px] lg:pt-[146px] pb-[50px] sm:pb-[70px] lg:pb-[90px] px-4 sm:px-6 md:px-8 xl:px-[70px]">
      <div className="max-w-[1681px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center py-8 sm:py-12 lg:py-[10px]">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl text-[#232323] font-semibold leading-tight tracking-tight mb-4 sm:mb-5 lg:mb-6 text-center">
            Knowledge Hub
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#5a5a5a] leading-relaxed max-w-[700px] mx-auto text-center">
            Stay updated with the latest trends and insights in the world of technology.
          </p>
        </div>

        {/* Recent Posts Carousel with Arrow Buttons - Shows One at a Time */}
        {recentPosts.length > 0 && (
          <div className="w-full relative mt-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#232323] mb-4 sm:mb-5 lg:mb-6">
              Recent Blog Posts
            </h2>

            <div className="relative">
              {/* Left Arrow Button */}
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-[#E0E0E0] rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-colors -translate-x-4 sm:-translate-x-6 lg:-translate-x-8"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-black" />
              </button>

              {/* Scrollable Container - Shows One Item at a Time */}
              <div
                ref={scrollContainerRef}
                className="flex gap-0 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {recentPosts.map((post) => {
                  const postAuthorName =
                    post.author?.firstName && post.author?.lastName
                      ? `${post.author.firstName} ${post.author.lastName}`
                      : "Unknown Author";
                  const postDate = post.date
                    ? new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                    : "";

                  return (
                    <Link
                      key={post._id}
                      href={`/blog/${post.slug}`}
                      className="relative flex-shrink-0 w-full snap-start rounded-[20px] overflow-hidden p-4 sm:p-6 lg:p-[30px] min-h-[280px] sm:min-h-[320px] lg:min-h-[360px] group"
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0 pointer-events-none rounded-[20px]">
                        <div className="absolute bg-[#1a1a1a] inset-0 rounded-[20px]" />
                        {post.coverImage && (
                          <Image
                            src={urlFor(post.coverImage)?.width(1681).height(262).url() || ''}
                            alt={post.title}
                            fill
                            className="object-cover opacity-20 rounded-[20px] group-hover:opacity-25 transition-opacity"
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="relative h-full flex flex-col items-start justify-center text-white z-10">
                        <div className="flex flex-col gap-3 sm:gap-4 lg:gap-[20px] items-start relative shrink-0 w-full">
                          <p className="font-['Manrope',sans-serif] font-semibold leading-[1.2] sm:leading-[1.3] lg:leading-[50.6px] relative shrink-0 text-[24px] sm:text-[28px] md:text-[36px] lg:text-[60px] tracking-[-0.02em] lg:tracking-[-0.9px] w-full line-clamp-2">
                            {post.title.split(":")[0]}{post.title.includes(":") ? ":" : ""}
                          </p>
                          {post.title.includes(":") && (
                            <p className="font-['Manrope',sans-serif] font-normal leading-[1.3] sm:leading-[1.4] lg:leading-[52.6px] relative shrink-0 text-[18px] sm:text-[20px] md:text-[24px] lg:text-[30px] tracking-[-0.02em] lg:tracking-[-0.45px] w-full line-clamp-2">
                              {post.title.split(":")[1].trim()}
                            </p>
                          )}
                        </div>
                        <p className="font-['Manrope',sans-serif] font-light leading-[1.3] sm:leading-[1.4] lg:leading-[50.6px] relative shrink-0 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] tracking-[-0.02em] lg:tracking-[-0.3px] w-full mt-2 sm:mt-3 lg:mt-4">
                          by {postAuthorName} | {postDate}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Right Arrow Button */}
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-[#E0E0E0] rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-colors translate-x-4 sm:translate-x-6 lg:translate-x-8"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-black" />
              </button>
            </div>
          </div>
        )}

        {/* Categories Section */}
        <div className="w-full mt-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#232323] mb-4 sm:mb-5 lg:mb-6">
            Categories
          </h2>
          <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-[13px] items-center">
            {/* All Category Chip */}
            <button
              onClick={() => setSelectedCategory("all")}
              className="border-[1.195px] border-solid content-stretch flex items-center justify-center px-4 sm:px-[16.95px] py-2 sm:py-[12.95px] relative rounded-[23.893px] shrink-0 transition-all duration-300 hover:border-[#005c89] hover:bg-[rgba(215,237,248,0.4)] hover:text-[#005c89]"
              style={{
                borderColor: selectedCategory === "all" ? "#005c89" : "#E0E0E0",
                backgroundColor: selectedCategory === "all" ? "rgba(215, 237, 248, 0.4)" : "white",
                color: selectedCategory === "all" ? "#005c89" : "black",
              }}
            >
              <p className="font-['Manrope',sans-serif] font-bold leading-[1.4] sm:leading-[27.964px] relative shrink-0 text-[14px] sm:text-[16px] text-nowrap tracking-[0.0067px] whitespace-pre">
                All
              </p>
            </button>

            {/* Category Chips */}
            {categories.map((category) => {
              const isSelected = selectedCategory === category._id;
              const categoryColor = category.color || "#66C2E2";

              return (
                <button
                  key={category._id}
                  onClick={() => setSelectedCategory(category._id)}
                  className="border-[1.195px] border-solid content-stretch flex items-center justify-center px-4 sm:px-[16.95px] py-2 sm:py-[12.95px] relative rounded-[23.893px] shrink-0 transition-all duration-300 hover:border-[var(--cat-color)] hover:bg-[var(--cat-bg)] hover:text-[var(--cat-color)]"
                  style={{
                    ['--cat-color' as any]: categoryColor,
                    ['--cat-bg' as any]: `${categoryColor}15`,
                    borderColor: isSelected ? categoryColor : "#E0E0E0",
                    backgroundColor: isSelected ? `${categoryColor}15` : "white",
                    color: isSelected ? categoryColor : "black",
                  }}
                >
                  <p className="font-['Manrope',sans-serif] font-bold leading-[1.4] sm:leading-[27.964px] relative shrink-0 text-[14px] sm:text-[16px] text-nowrap tracking-[0.0067px] whitespace-pre">
                    {category.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="flex flex-col gap-8 sm:gap-12 xl:gap-[94px] items-start py-8 sm:py-12 xl:py-[50px]">
          {filteredPosts.length > 0 ? (
            <>
              {/* Desktop: Grid Layout */}
              <div className="hidden xl:grid grid-cols-3 gap-[13px] w-full">
                {filteredPosts.map((post) => (
                  <BlogCard key={post._id} {...post} />
                ))}
              </div>

              {/* Mobile/Tablet: Grid Layout */}
              <div className="xl:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
                {filteredPosts.map((post) => (
                  <BlogCard key={post._id} {...post} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 w-full">
              <p className="text-[18px] sm:text-[20px] xl:text-[24px] text-gray-500">No blog posts found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
