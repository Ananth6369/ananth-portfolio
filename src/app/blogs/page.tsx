import React from "react";
import type { Metadata } from "next";
import { getAllBlogs } from "@/lib/medium";
import BlogPlatformClient from "@/components/blogs/BlogPlatformClient";
import JsonLd from "@/components/seo/JsonLd";
import { generateBlogSchema, generateBreadcrumbSchema } from "@/utils/jsonLd";
import { SITE_CONFIG } from "@/constants/seo";
import { Blog } from "@/types/blog";

export const metadata: Metadata = {
  title: "Engineering Blog | Automation Testing | Playwright | Selenium | Ananth A",
  description:
    "Technical articles on Automation Testing, Playwright, Selenium, Software Quality, API Testing, Performance Testing, and QA Engineering.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Engineering Blog | Automation Testing | Playwright | Selenium | Ananth A",
    description:
      "Technical articles on Automation Testing, Playwright, Selenium, Software Quality, API Testing, Performance Testing, and QA Engineering.",
    url: `${SITE_CONFIG.url}/blogs`,
    siteName: "Ananth A Engineering Blog",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ananth A Engineering Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Blog | Automation Testing | Playwright | Selenium | Ananth A",
    description:
      "Technical articles on Automation Testing, Playwright, Selenium, Software Quality, API Testing, Performance Testing, and QA Engineering.",
    images: ["/og-image.png"],
  },
};

export default async function BlogsPage() {
  let blogs: Blog[] = [];
  let isError = false;

  try {
    blogs = await getAllBlogs();
  } catch (error) {
    console.error("Failed to fetch blog posts for /blogs page:", error);
    isError = true;
  }

  const blogSchema = generateBlogSchema(
    "Technical articles on Automation Testing, Playwright, Selenium, Software Quality, API Testing, Performance Testing, and QA Engineering."
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blogs", url: "/blogs" },
  ]);

  return (
    <>
      <JsonLd schema={[blogSchema, breadcrumbSchema]} />
      <BlogPlatformClient blogs={blogs || []} isError={isError} />
    </>
  );
}
