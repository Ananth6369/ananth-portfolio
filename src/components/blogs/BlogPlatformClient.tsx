"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Search, X, Filter, RotateCw } from "lucide-react";
import { Blog } from "@/types/blog";
import BlogHero from "./BlogHero";
import FeaturedBlog from "./FeaturedBlog";
import BlogGrid from "./BlogGrid";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";
import BlogCTA from "./BlogCTA";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import Footer from "@/components/Footer";
import { BLOG_PAGE_SIZE } from "@/constants/medium";
import { normalizeCategories } from "@/utils/category";
import { formatDate } from "@/utils/date";

interface BlogPlatformClientProps {
  blogs: Blog[];
  isError?: boolean;
}

export default function BlogPlatformClient({
  blogs = [],
  isError = false,
}: BlogPlatformClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim().toLowerCase());
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleClearSearchText = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    setSelectedCategory("All");
    setCurrentPage(1);
  };

  // Extract all unique categories automatically
  const categories = useMemo(() => {
    if (!blogs || blogs.length === 0) return ["All"];
    const allTags = blogs.flatMap((b) => b.categories || []);
    const normalized = normalizeCategories(allTags);
    return ["All", ...normalized];
  }, [blogs]);

  // Compute stats for Blog Hero
  const totalArticlesCount = blogs.length;
  const totalCategoriesCount = Math.max(0, categories.length - 1);
  const latestPublishedDate = useMemo(() => {
    if (!blogs || blogs.length === 0) return "";
    return formatDate(blogs[0].publishedAt);
  }, [blogs]);

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    return blogs.filter((blog) => {
      // Category condition
      const matchesCategory =
        selectedCategory === "All" ||
        blog.categories.some(
          (cat) => cat.toLowerCase() === selectedCategory.toLowerCase()
        );

      if (!matchesCategory) return false;

      // Search query condition
      if (!debouncedQuery) return true;

      const titleMatch = blog.title.toLowerCase().includes(debouncedQuery);
      const descMatch = blog.description.toLowerCase().includes(debouncedQuery);
      const catMatch = blog.categories.some((cat) =>
        cat.toLowerCase().includes(debouncedQuery)
      );

      return titleMatch || descMatch || catMatch;
    });
  }, [blogs, selectedCategory, debouncedQuery]);

  // Determine featured article & remaining grid articles
  const { featuredArticle, gridArticles } = useMemo(() => {
    if (filteredArticles.length === 0) {
      return { featuredArticle: null, gridArticles: [] };
    }

    // Default primary featured article from entire feed
    const defaultFeatured =
      blogs.find((b) => b.featured) || (blogs.length > 0 ? blogs[0] : null);

    // If featured article exists in filtered results, isolate it as featured
    if (
      defaultFeatured &&
      filteredArticles.some((b) => b.id === defaultFeatured.id)
    ) {
      return {
        featuredArticle: defaultFeatured,
        gridArticles: filteredArticles.filter((b) => b.id !== defaultFeatured.id),
      };
    }

    // If default featured doesn't match current filter/search, no top hero featured article,
    // all matching articles are displayed in the grid
    return {
      featuredArticle: null,
      gridArticles: filteredArticles,
    };
  }, [blogs, filteredArticles]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(gridArticles.length / BLOG_PAGE_SIZE));
  const paginatedGridArticles = useMemo(() => {
    const startIdx = (currentPage - 1) * BLOG_PAGE_SIZE;
    return gridArticles.slice(startIdx, startIdx + BLOG_PAGE_SIZE);
  }, [gridArticles, currentPage]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <div>
        {/* Blog Hero Header */}
        <BlogHero
          totalArticles={totalArticlesCount}
          totalCategories={totalCategoriesCount}
          latestPublishedDate={latestPublishedDate}
        />

        {/* Main Content Body */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Error State */}
          {isError ? (
            <ErrorState
              title="Unable to load blog posts"
              message="Failed to retrieve latest engineering articles from RSS feed. Please check back shortly or visit Medium directly."
            />
          ) : blogs.length === 0 ? (
            /* Empty RSS Feed State */
            <EmptyState
              title="No Articles Published Yet"
              description="Articles on Playwright, Selenium, and API Automation are published regularly."
            />
          ) : (
            <>
              {/* Search & Category Filter Control Section */}
              <section className="mb-12 space-y-6">
                {/* Search Bar */}
                <div className="relative max-w-2xl mx-auto">
                  <div className="relative flex items-center">
                    <Search
                      size={20}
                      className="absolute left-4 text-slate-400 pointer-events-none"
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Search articles, Playwright, API Testing..."
                      className="w-full pl-12 pr-10 py-4 bg-slate-900/90 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-base shadow-xl"
                      aria-label="Search articles"
                    />
                    {searchQuery && (
                      <button
                        onClick={handleClearSearchText}
                        className="absolute right-4 p-1 text-slate-400 hover:text-slate-200 transition-colors"
                        aria-label="Clear search text"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-2">
                    <Filter size={14} className="text-slate-500" />
                    Categories:
                  </span>
                  {categories.map((cat) => {
                    const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                    return (
                      <button
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all duration-200 ${
                          isActive
                            ? "bg-accent text-slate-950 border-accent shadow-lg shadow-cyan-500/20 scale-105"
                            : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* No Search Results Found */}
              {filteredArticles.length === 0 ? (
                <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-10 sm:p-14 text-center max-w-xl mx-auto my-12 shadow-xl">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-4">
                    <Search size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100 mb-2 font-heading">
                    No matching articles
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    No articles match your search criteria. Try refining your keywords or clearing active filters.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-accent font-bold text-sm rounded-xl border border-slate-700 hover:border-accent/40 transition-all shadow-md"
                  >
                    <RotateCw size={16} />
                    <span>Clear Search & Filters</span>
                  </button>
                </div>
              ) : (
                <>
                  {/* Featured Article (Appears ONCE when present) */}
                  {featuredArticle && (
                    <section className="mb-12">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          Featured Insight
                        </span>
                      </div>
                      <FeaturedBlog blog={featuredArticle} />
                    </section>
                  )}

                  {/* Remaining Grid Articles */}
                  {paginatedGridArticles.length > 0 && (
                    <section className="mb-12">
                      {featuredArticle && (
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-xl font-bold text-slate-200 font-heading">
                            All Articles
                          </h2>
                          <span className="text-xs text-slate-400">
                            Showing {paginatedGridArticles.length} of {gridArticles.length} articles
                          </span>
                        </div>
                      )}
                      <BlogGrid>
                        {paginatedGridArticles.map((blog) => (
                          <BlogCard key={blog.id || blog.slug} blog={blog} />
                        ))}
                      </BlogGrid>
                    </section>
                  )}

                  {/* Pagination Section */}
                  {totalPages > 1 && (
                    <section className="mb-16">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 300, behavior: "smooth" });
                        }}
                      />
                    </section>
                  )}
                </>
              )}

              {/* Blog CTA Banner */}
              <section className="mt-16 mb-12">
                <BlogCTA />
              </section>
            </>
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
