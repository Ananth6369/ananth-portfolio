import React from "react";
import Image from "next/image";
import { ExternalLink, Calendar, Clock, BookOpen, Code2 } from "lucide-react";
import { Blog } from "@/types/blog";
import CategoryBadge from "./CategoryBadge";
import FeaturedRibbon from "./FeaturedRibbon";
import { formatDate } from "@/utils/date";
import { DEFAULT_BLOG_IMAGE } from "@/constants/medium";

interface BlogCardProps {
  blog: Blog;
  className?: string;
}

export default function BlogCard({ blog, className = "" }: BlogCardProps) {
  if (!blog) return null;

  const isDefaultImage = blog.image === DEFAULT_BLOG_IMAGE || !blog.image;
  const hasGithubReference = blog.categories.some(
    (c) =>
      c.toLowerCase().includes("github") ||
      c.toLowerCase().includes("automation") ||
      c.toLowerCase().includes("playwright") ||
      c.toLowerCase().includes("java")
  );

  return (
    <article
      className={`group relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-accent/40 transition-all duration-300 shadow-xl hover:-translate-y-2 flex flex-col ${className}`}
    >
      {/* Cover Image Container */}
      <div className="relative h-48 sm:h-52 bg-slate-800 overflow-hidden border-b border-slate-800/60">
        {!isDefaultImage ? (
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950/30 flex flex-col items-center justify-center p-6 text-center group-hover:scale-105 transition-transform duration-500">
            <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-2 text-accent">
              <BookOpen size={24} />
            </div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Technical Insight
            </span>
          </div>
        )}

        {/* Featured Ribbon if applicable */}
        {blog.featured && (
          <div className="absolute top-3 left-3 z-10">
            <FeaturedRibbon />
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
        <div>
          {/* Category Badges */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {blog.categories.slice(0, 3).map((cat) => (
              <CategoryBadge key={cat} category={cat} />
            ))}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-accent transition-colors line-clamp-2 leading-snug font-heading">
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="focus:outline-none focus:underline"
            >
              {blog.title}
            </a>
          </h3>

          {/* Description */}
          <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
            {blog.description}
          </p>
        </div>

        <div>
          {/* GitHub Related Project Indicator */}
          {hasGithubReference && (
            <div className="mb-4 pt-3 border-t border-slate-800/40 flex items-center gap-2 text-xs text-slate-400">
              <Code2 size={14} className="text-cyan-400" />
              <span>Includes Automation Code / Architecture</span>
            </div>
          )}

          {/* Footer Metadata & CTA */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar size={13} className="text-slate-500" />
                {formatDate(blog.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={13} className="text-slate-500" />
                {blog.readingTime}
              </span>
            </div>

            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:text-cyan-300 transition-colors p-1"
              aria-label={`Read ${blog.title} on Medium`}
            >
              <span>Read</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
