export const MEDIUM_USERNAME =
  process.env.NEXT_PUBLIC_MEDIUM_USERNAME || "ananthalagarsamy";

export const MEDIUM_RSS_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;

export const HOMEPAGE_BLOG_LIMIT = 3;

export const BLOG_PAGE_SIZE = 6;

/**
 * Cache duration in milliseconds (6 Hours)
 */
export const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

/**
 * Default placeholder cover image for blog posts without embedded images
 */
export const DEFAULT_BLOG_IMAGE = "/images/blog-placeholder.jpg";

/**
 * RSS fetch timeout in milliseconds
 */
export const FETCH_TIMEOUT_MS = 8000;
