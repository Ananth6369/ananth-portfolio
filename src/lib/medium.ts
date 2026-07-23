import { Blog } from "@/types/blog";
import { parseRssFeed } from "@/lib/rss";
import { getCachedData, setCachedData } from "@/lib/cache";
import { HOMEPAGE_BLOG_LIMIT } from "@/constants/medium";

const CACHE_KEY_ALL_BLOGS = "medium_all_blogs";

/**
 * Internal helper to fetch all blogs with caching.
 */
async function fetchAllBlogsCached(): Promise<Blog[]> {
  const cached = getCachedData<Blog[]>(CACHE_KEY_ALL_BLOGS);
  if (cached && Array.isArray(cached) && cached.length > 0) {
    return cached;
  }

  const blogs = await parseRssFeed();
  if (blogs.length > 0) {
    setCachedData(CACHE_KEY_ALL_BLOGS, blogs);
  }

  return blogs;
}

/**
 * Retrieves all Medium blog posts.
 */
export async function getAllBlogs(): Promise<Blog[]> {
  return await fetchAllBlogsCached();
}

/**
 * Retrieves the latest N blog posts (defaults to HOMEPAGE_BLOG_LIMIT).
 */
export async function getLatestBlogs(limit: number = HOMEPAGE_BLOG_LIMIT): Promise<Blog[]> {
  const blogs = await fetchAllBlogsCached();
  return blogs.slice(0, Math.max(1, limit));
}

/**
 * Retrieves the featured blog post.
 * If no article has featured=true, defaults to the most recent blog post.
 */
export async function getFeaturedBlog(): Promise<Blog | null> {
  const blogs = await fetchAllBlogsCached();
  if (blogs.length === 0) return null;

  const featured = blogs.find((blog) => blog.featured);
  return featured || blogs[0];
}

/**
 * Retrieves a specific blog post by its unique URL slug.
 */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  if (!slug) return null;
  const blogs = await fetchAllBlogsCached();
  return blogs.find((blog) => blog.slug === slug) || null;
}
