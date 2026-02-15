import type { Metadata } from "next";
import BlogPage from "@/components/BlogPage";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/lib/sanity/lib/live";
import { getSanityFetchConfig } from "@/lib/sanity/lib/preview";
import {
  allPostsQuery,
  allCategoriesQuery,
  featuredPostQuery,
} from "@/lib/sanity/lib/queries";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title: "Blog | Innovin Labs - Tech Insights & Industry Updates",
  description: "Stay updated with the latest insights on AI, software development, startup growth, and technology trends from the Innovin Labs team.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Innovin Labs - Tech Insights & Industry Updates",
    description: "Stay updated with the latest insights on AI, software development, startup growth, and technology trends.",
    url: "https://innovinlabs.com/blog",
  },
};
/**
 * Blog listing page - displays all published blog posts with category filtering.
 * Updates are triggered via webhook when posts are updated in Sanity.
 * See /api/revalidate for webhook handler.
 */
export default async function Blog() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://innovinlabs.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://innovinlabs.com/blog"
      }
    ]
  };

  let posts: any[] = [];
  let categories: any[] = [];
  let featuredPost: any = null;

  try {
    const { perspective, stega } = await getSanityFetchConfig();
    const [postsResult, categoriesResult, featuredResult] = await Promise.all([
      sanityFetch({
        query: allPostsQuery,
        perspective,
        stega,
      }),
      sanityFetch({
        query: allCategoriesQuery,
        perspective,
        stega,
      }),
      sanityFetch({
        query: featuredPostQuery,
        perspective,
        stega,
      }),
    ]);

    posts = postsResult.data || [];
    categories = categoriesResult.data || [];
    featuredPost = featuredResult.data || null;

    console.log(
      `✅ Fetched ${posts.length} posts, ${categories.length} categories from Sanity`
    );
  } catch (error) {
    console.warn("❌ Failed to fetch blog data from Sanity:", error);
  }

  return (
    <>
      <BlogPage
        posts={posts}
        categories={categories}
        featuredPost={featuredPost}
      />
      <Footer />
    </>
  );
}
