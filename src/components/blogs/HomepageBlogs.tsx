import React from "react";
import { getAllBlogs, getFeaturedBlog } from "@/lib/medium";
import BlogSection from "./BlogSection";
import SectionHeader from "./SectionHeader";
import FeaturedBlog from "./FeaturedBlog";
import BlogGrid from "./BlogGrid";
import BlogCard from "./BlogCard";
import BlogCTA from "./BlogCTA";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import { Blog } from "@/types/blog";

export default async function HomepageBlogs() {
  let blogs: Blog[] = [];
  let featuredBlog: Blog | null = null;
  let isError = false;

  try {
    const [allBlogs, featured] = await Promise.all([
      getAllBlogs(),
      getFeaturedBlog(),
    ]);
    blogs = allBlogs || [];
    featuredBlog = featured;
  } catch (error) {
    console.error("Failed to fetch blogs for homepage:", error);
    isError = true;
  }

  // Handle Error State
  if (isError) {
    return (
      <BlogSection id="blogs" className="bg-slate-900/50">
        <SectionHeader
          title="Latest Blogs"
          subtitle="Sharing insights on Automation Testing, Playwright, Selenium, API Testing, Performance Testing, QA Engineering, and Software Quality."
          actionUrl="/blogs"
          actionText="View All →"
        />
        <ErrorState />
      </BlogSection>
    );
  }

  // Handle Case 1: Empty State (0 Blogs)
  if (!blogs || blogs.length === 0) {
    return (
      <BlogSection id="blogs" className="bg-slate-900/50">
        <SectionHeader
          title="Latest Blogs"
          subtitle="Sharing insights on Automation Testing, Playwright, Selenium, API Testing, Performance Testing, QA Engineering, and Software Quality."
          actionUrl="/blogs"
          actionText="View All →"
        />
        <EmptyState
          title="No Articles Yet"
          description="Be the first to read my latest automation articles."
        />
      </BlogSection>
    );
  }

  // Exclude featured article from grid to avoid duplicates
  const featuredId = featuredBlog?.id || blogs[0]?.id;
  const remainingBlogs = blogs
    .filter((blog) => blog.id !== featuredId)
    .slice(0, 2);

  return (
    <BlogSection id="blogs" className="bg-slate-900/50">
      <SectionHeader
        title="Latest Blogs"
        subtitle="Sharing insights on Automation Testing, Playwright, Selenium, API Testing, Performance Testing, QA Engineering, and Software Quality."
        actionUrl="/blogs"
        actionText="View All →"
      />

      {/* Featured Blog Hero Card (Case 2, 3, 4) */}
      {featuredBlog && (
        <div className="mb-12">
          <FeaturedBlog blog={featuredBlog} />
        </div>
      )}

      {/* Grid of Remaining Latest Blogs (Up to 2) */}
      {remainingBlogs.length > 0 && (
        <div className="mb-16">
          <BlogGrid>
            {remainingBlogs.map((blog) => (
              <BlogCard key={blog.id || blog.slug} blog={blog} />
            ))}
          </BlogGrid>
        </div>
      )}

      {/* Blog CTA Banner */}
      <BlogCTA />
    </BlogSection>
  );
}
