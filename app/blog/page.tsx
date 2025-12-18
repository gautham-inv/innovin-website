import BlogPage from "@/components/BlogPage";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/lib/sanity/lib/live";
import { getSanityFetchConfig } from "@/lib/sanity/lib/preview";
import {
  allPostsQuery,
  allCategoriesQuery,
  featuredPostQuery,
} from "@/lib/sanity/lib/queries";

/**
 * Blog listing page - displays all published blog posts with category filtering.
 * Updates are triggered via webhook when posts are updated in Sanity.
 * See /api/revalidate for webhook handler.
 */
export default async function Blog() {
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
