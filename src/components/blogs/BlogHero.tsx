import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  BookOpen,
  Tag,
  Calendar,
  Sparkles,
} from "lucide-react";
import { MEDIUM_USERNAME } from "@/constants/medium";

interface BlogHeroProps {
  totalArticles: number;
  totalCategories: number;
  latestPublishedDate: string;
  className?: string;
}

export default function BlogHero({
  totalArticles,
  totalCategories,
  latestPublishedDate,
  className = "",
}: BlogHeroProps) {
  const profileUrl = `https://medium.com/@${MEDIUM_USERNAME}`;

  return (
    <header className={`relative py-12 md:py-20 overflow-hidden ${className}`}>
      {/* Background Decorator Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Navigation / Top Bar Actions */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-accent border border-slate-800 rounded-xl text-sm font-semibold transition-all group shadow-md"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back To Home</span>
          </Link>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-accent border border-slate-800 rounded-xl text-sm font-semibold transition-all group shadow-md"
          >
            <span>Medium Profile</span>
            <ExternalLink size={15} className="text-accent group-hover:scale-110 transition-transform" />
          </a>
        </div>

        {/* Hero Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading & Subtitle */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-accent text-xs font-bold rounded-full border border-cyan-500/20 mb-4">
              <Sparkles size={14} />
              <span>QA & SDET Engineering Hub</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-50 mb-4 font-heading leading-tight">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Notes</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 max-w-2xl">
              Share practical insights on{" "}
              <span className="text-slate-100 font-semibold">Automation Testing</span>,{" "}
              <span className="text-slate-100 font-semibold">Playwright</span>,{" "}
              <span className="text-slate-100 font-semibold">Selenium</span>,{" "}
              <span className="text-slate-100 font-semibold">API Testing</span>,{" "}
              <span className="text-slate-100 font-semibold">Software Engineering</span>,{" "}
              <span className="text-slate-100 font-semibold">Performance Testing</span>,{" "}
              <span className="text-slate-100 font-semibold">Career Growth</span>, and{" "}
              <span className="text-slate-100 font-semibold">AI in Testing</span>.
            </p>
          </div>

          {/* Right Column: Statistics Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <BookOpen size={16} className="text-accent" />
                <span>Publication Overview</span>
              </h2>

              <div className="grid grid-cols-3 gap-4 text-center">
                {/* Total Articles */}
                <div className="p-3 sm:p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center justify-center text-cyan-400 mb-1">
                    <BookOpen size={18} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-50 font-heading">
                    {totalArticles}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">
                    Total Articles
                  </div>
                </div>

                {/* Categories */}
                <div className="p-3 sm:p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center justify-center text-purple-400 mb-1">
                    <Tag size={18} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-50 font-heading">
                    {totalCategories}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">
                    Categories
                  </div>
                </div>

                {/* Latest Published */}
                <div className="p-3 sm:p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col items-center justify-between">
                  <div className="flex items-center justify-center text-emerald-400 mb-1">
                    <Calendar size={18} />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-100 font-heading line-clamp-1">
                    {latestPublishedDate || "N/A"}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">
                    Latest Article
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
