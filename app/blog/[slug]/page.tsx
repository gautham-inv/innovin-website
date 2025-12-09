import { Metadata } from "next";
import { type PortableTextBlock } from "next-sanity";
import { sanityFetch } from "@/lib/sanity/lib/live";
import { postQuery, postSlugs, relatedPostsQuery } from "@/lib/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/lib/utils";
import PortableText from "@/components/PortableText";
import Footer from "@/components/Footer";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate static params for all post slugs at build time.
 */
export async function generateStaticParams() {
  try {
    const { data } = await sanityFetch({
      query: postSlugs,
      perspective: "published",
      stega: false,
    });
    return data || [];
  } catch (error) {
    console.warn("Sanity not configured, returning empty post slugs:", error);
    return [];
  }
}

/**
 * Generate metadata for the page.
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: post } = await sanityFetch({
    query: postQuery,
    params: { slug: params.slug },
    perspective: "published",
    stega: false,
  });

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || "",
    openGraph: {
      images: post.coverImage
        ? [
            {
              url: urlFor(post.coverImage)?.width(1200).height(627).url() || "",
              alt: post.title,
            },
          ]
        : [],
    },
  };
}

export default async function BlogPost(props: Props) {
  const params = await props.params;
  const { data: post } = await sanityFetch({
    query: postQuery,
    params: { slug: params.slug },
    perspective: "published",
    stega: false,
  });

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Post not found</h1>
      </div>
    );
  }

  // Fetch related posts from the same category
  const primaryCategoryId = post.categories && post.categories.length > 0 
    ? post.categories[0]._id 
    : null;

  let relatedPosts: any[] = [];
  if (primaryCategoryId) {
    const { data } = await sanityFetch({
      query: relatedPostsQuery,
      params: { 
        currentSlug: params.slug,
        categoryId: primaryCategoryId 
      },
      perspective: "published",
      stega: false,
    });
    relatedPosts = data || [];
  }

  const authorName =
    post.author?.firstName && post.author?.lastName
      ? `${post.author.firstName} ${post.author.lastName}`
      : "Unknown Author";

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <article className="bg-white w-full pt-[146px] pb-[90px]">
      <div className="max-w-[1681px] mx-auto px-[70px]">
        <div className="flex gap-8">
          {/* Main Content - 70% */}
          <div className="flex-1 max-w-[88%]">
            {/* Header */}
            <header className="mb-12">
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.categories.map((category: any) => {
                    return (
                      <div
                        key={category._id}
                        className="bg-white flex gap-[2.115px] items-center px-[5.288px] py-[4.231px] rounded-[52.881px] border border-gray-200"
                      >
                        <span className="font-['Inter',sans-serif] font-normal text-[12.692px] text-black">
                          {category.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              <h1 className="text-[56px] font-semibold leading-[1.3] text-black mb-6 font-['Manrope',sans-serif]">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-[28px] text-[#005c89] leading-[1.6] mb-8 font-['Manrope',sans-serif]">
                  {post.excerpt}
                </p>
              )}

              <div className="flex items-center gap-4 text-[18px] text-gray-600">
                <span className="font-['Manrope',sans-serif] font-bold">
                  {authorName}
                </span>
                <span>•</span>
                <time dateTime={post.date}>{formattedDate}</time>
              </div>
            </header>

            {/* Cover Image */}
            {post.coverImage && (
              <div className="relative w-full h-[500px] mb-12 rounded-[16px] overflow-hidden">
                <Image
                  src={urlFor(post.coverImage)?.width(1200).height(500).url() || ""}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Content */}
            {post.content && (
              <div className="prose prose-xl max-w-none">
                <PortableText 
                  value={post.content as PortableTextBlock[]}
                  className="blog-content"
                />
              </div>
            )}

            {/* Author Details Section */}
            {post.author && (
            
              <div className="mt-16 pt-12 border-t border-[#E0E0E0]">
                <p className="text-[35px] font-semibold text-black mb-10 font-['Manrope',sans-serif]">About Author</p>
                <div className="flex gap-6 items-start">
                  {post.author.picture && (
                    <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={urlFor(post.author.picture)?.width(120).height(120).url() || ""}
                        alt={authorName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-[28px] font-semibold text-black mb-3 font-['Manrope',sans-serif]">
                      {authorName}
                    </h3>
                    {post.author.description && (
                      <p className="text-[18px] text-gray-700 leading-[1.7] mb-4 font-['Manrope',sans-serif]">
                        {post.author.description}
                      </p>
                    )}
                    {post.author.linkedinUrl && (
                      <a
                        href={post.author.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#0077b5] text-white rounded-[8px] hover:bg-[#005885] transition-colors font-['Manrope',sans-serif] font-medium text-[16px]"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        View LinkedIn Profile
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Vertical Separator */}
          <div className="w-px bg-[#E0E0E0] mx-4"></div>

          {/* Related Posts Sidebar - 30% */}
          <aside className="w-[12%] min-w-[200px]">
            <div className="sticky top-[146px]">
              <h2 className="text-[32px] font-semibold text-black mb-6 font-['Manrope',sans-serif]">
                Related Posts
              </h2>
              {relatedPosts.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {relatedPosts.map((relatedPost: any) => {
                    const relatedAuthorName =
                      relatedPost.author?.firstName && relatedPost.author?.lastName
                        ? `${relatedPost.author.firstName} ${relatedPost.author.lastName}`
                        : "Unknown Author";
                    const relatedDate = relatedPost.date
                      ? new Date(relatedPost.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "";
                    const primaryCategory = relatedPost.categories && relatedPost.categories.length > 0 
                      ? relatedPost.categories[0] 
                      : null;

                    return (
                      <Link
                        key={relatedPost._id}
                        href={`/blog/${relatedPost.slug}`}
                        className="group"
                      >
                        <div className="flex flex-col gap-3 p-4 border border-[#E0E0E0] rounded-[16px] hover:border-[#005c89] transition-colors">
                          {relatedPost.coverImage && (
                            <div className="relative w-full h-[180px] rounded-[12px] overflow-hidden">
                              <Image
                                src={urlFor(relatedPost.coverImage)?.width(400).height(180).url() || ""}
                                alt={relatedPost.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          {primaryCategory && (
                            <div className="flex items-center gap-2">
                              <div
                                className="rounded-full size-[6px]"
                                style={{ backgroundColor: primaryCategory.color || "#1abcfe" }}
                              />
                              <span className="text-[12px] text-gray-600 font-['Inter',sans-serif]">
                                {primaryCategory.title}
                              </span>
                            </div>
                          )}
                          <h3 className="text-[18px] font-semibold text-black leading-[1.4] group-hover:text-[#005c89] transition-colors font-['Manrope',sans-serif] line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <div className="flex items-center gap-2 text-[14px] text-gray-500">
                            <span>{relatedAuthorName}</span>
                            <span>•</span>
                            <time>{relatedDate}</time>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-[16px]">No related posts found.</p>
              )}
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </article>
  );
}

