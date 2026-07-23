/**
 * Normalized Blog Post Model
 */
export interface Blog {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  contentSnippet: string;
  image: string;
  url: string;
  slug: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  categories: string[];
  featured: boolean;
  readingTime: string;
  source: "medium";
}

/**
 * Standard API Response payload for Medium blogs endpoint
 */
export interface MediumApiResponse {
  status: "success" | "error";
  message?: string;
  count: number;
  featuredBlog: Blog | null;
  blogs: Blog[];
  timestamp: string;
}
