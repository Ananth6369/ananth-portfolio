import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/seo";
import { getAllBlogs } from "@/lib/medium";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  // Base static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // Dynamically prepare architecture for article URLs
  try {
    const blogs = await getAllBlogs();
    if (blogs && blogs.length > 0) {
      blogs.forEach((blog) => {
        if (blog.url) {
          routes.push({
            url: blog.url,
            lastModified: new Date(blog.publishedAt || Date.now()),
            changeFrequency: "monthly",
            priority: 0.7,
          });
        }
      });
    }
  } catch (error) {
    console.error("Failed to generate sitemap entries for blogs:", error);
  }

  return routes;
}
