import React from "react";
import Image from "next/image";
import { ExternalLink, Calendar, Clock, BookOpen } from "lucide-react";
import { Blog } from "@/types/blog";
import CategoryBadge from "./CategoryBadge";
import FeaturedRibbon from "./FeaturedRibbon";
import { formatDate } from "@/utils/date";
import { DEFAULT_BLOG_IMAGE } from "@/constants/medium";

interface FeaturedBlogProps {
  blog: Blog;
  className?: string;
}

export default function FeaturedBlog({ blog, className = "" }: FeaturedBlogProps) {
  if (!blog) return null;

  const isDefaultImage = blog.image === DEFAULT_BLOG_IMAGE || !blog.image;

  return (
    <div
      className={`group relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-accent/40 transition-all duration-300 shadow-xl hover:-translate-y-1 ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left / Top Image Container */}
        <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-full min-h-[280px] bg-slate-800 overflow-hidden">
          {!isDefaultImage ? (
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950/40 flex flex-col items-center justify-center p-8 text-center group-hover:scale-105 transition-transform duration-500">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4 text-accent">
                <BookOpen size={36} />
              </div>
              <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
                Automation Insights
              </span>
            </div>
          )}

          {/* Dark Overlay for better contrast on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />

          <div className="absolute top-4 left-4 z-10">
            <FeaturedRibbon />
          </div>
        </div>

        {/* Right / Bottom Content Container */}
        <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            {/* Category Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.categories.slice(0, 4).map((cat) => (
                <CategoryBadge key={cat} category={cat} />
              ))}
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-50 mb-4 group-hover:text-accent transition-colors leading-tight font-heading">
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
            <p className="text-slate-300 text-base sm:text-lg mb-6 leading-relaxed line-clamp-3">
              {blog.description}
            </p>
          </div>

          {/* Footer Metadata & CTA */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar size={15} className="text-slate-500" />
                {formatDate(blog.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-slate-500" />
                {blog.readingTime}
              </span>
            </div>

            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm rounded-xl border border-slate-700 transition-colors group-hover:border-accent/40"
              aria-label={`Read ${blog.title} on Medium`}
            >
              <span>Read on Medium</span>
              <ExternalLink size={16} className="text-accent" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
