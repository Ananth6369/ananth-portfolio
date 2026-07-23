import Parser from "rss-parser";
import { Blog } from "@/types/blog";
import {
  MEDIUM_RSS_URL,
  DEFAULT_BLOG_IMAGE,
  FETCH_TIMEOUT_MS,
  MEDIUM_USERNAME,
} from "@/constants/medium";
import { createExcerpt } from "@/utils/excerpt";
import { calculateReadingTime } from "@/utils/readingTime";
import { formatISODate } from "@/utils/date";
import { normalizeCategories } from "@/utils/category";

interface CustomItem {
  id?: string;
  author?: string;
  creator?: string;
  "content:encoded"?: string;
  "dc:creator"?: string;
}

const parser = new Parser<Record<string, unknown>, CustomItem>({
  customFields: {
    item: ["content:encoded", ["dc:creator", "creator"]],
  },
});

/**
 * Extracts cover image URL from RSS item HTML content.
 */
function extractCoverImage(htmlContent: string): string {
  if (!htmlContent || typeof htmlContent !== "string") {
    return DEFAULT_BLOG_IMAGE;
  }

  // Search for <img> tag src attribute
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/i;
  const match = htmlContent.match(imgRegex);

  if (match && match[1]) {
    return match[1];
  }

  return DEFAULT_BLOG_IMAGE;
}

/**
 * Generates a clean URL-friendly slug from title and item identifier.
 */
function generateSlug(title: string, id: string): string {
  const cleanTitle = (title || "blog-post")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const shortId = id.replace(/[^a-zA-Z0-9]/g, "").slice(-6) || "post";
  return cleanTitle ? `${cleanTitle}-${shortId}` : `post-${shortId}`;
}

/**
 * Checks if article tags or categories specify featured status.
 */
function isArticleFeatured(categories: string[]): boolean {
  if (!Array.isArray(categories)) return false;
  return categories.some((cat) => {
    const lower = cat.toLowerCase().trim();
    return lower === "featured" || lower === "feature";
  });
}

/**
 * Fetches RSS feed with timeout control.
 */
async function fetchRssWithTimeout(url: string, timeoutMs: number): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PortfolioRSSParser/1.0)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
      next: { revalidate: 21600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.text();
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Fetches and parses Medium RSS feed into clean Blog models.
 */
export async function parseRssFeed(): Promise<Blog[]> {
  try {
    const xmlText = await fetchRssWithTimeout(MEDIUM_RSS_URL, FETCH_TIMEOUT_MS);
    const feed = await parser.parseString(xmlText);

    if (!feed || !Array.isArray(feed.items)) {
      return [];
    }

    return feed.items.map((item, index): Blog => {
      const rawContent = item["content:encoded"] || item.content || item.summary || "";
      const rawCategories = item.categories || [];
      const itemTitle = item.title?.trim() || "Untitled Article";
      const itemGuid = item.guid || item.link || item.id || `medium-${index}`;
      const coverImage = extractCoverImage(rawContent || item.contentSnippet || "");
      const normalizedCats = normalizeCategories(rawCategories);
      const featured = isArticleFeatured(rawCategories);
      const readingTime = calculateReadingTime(rawContent);

      return {
        id: itemGuid,
        title: itemTitle,
        subtitle: createExcerpt(rawContent, 100),
        description: createExcerpt(rawContent, 160),
        contentSnippet: createExcerpt(rawContent, 300),
        image: coverImage,
        url: item.link || `https://medium.com/@${MEDIUM_USERNAME}`,
        slug: generateSlug(itemTitle, itemGuid),
        author: item.creator || item.author || item["dc:creator"] || MEDIUM_USERNAME,
        publishedAt: formatISODate(item.isoDate || item.pubDate || ""),
        categories: normalizedCats,
        featured,
        readingTime,
        source: "medium",
      };
    });
  } catch (error) {
    console.error("Failed to fetch or parse Medium RSS feed:", error);
    return [];
  }
}
