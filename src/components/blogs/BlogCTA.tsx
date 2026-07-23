import React from "react";
import { ArrowRight, BookOpen, UserPlus } from "lucide-react";
import { MEDIUM_USERNAME } from "@/constants/medium";

interface BlogCTAProps {
  className?: string;
}

export default function BlogCTA({ className = "" }: BlogCTAProps) {
  const profileUrl = `https://medium.com/@${MEDIUM_USERNAME}`;

  return (
    <div
      className={`relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl ${className}`}
    >
      {/* Accent Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-accent text-xs font-bold rounded-full border border-cyan-500/20 mb-4">
            <BookOpen size={14} />
            <span>Continuous Learning & Tech Insights</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-bold text-slate-50 mb-3 font-heading">
            Want more QA & Web Automation Insights?
          </h3>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Follow my latest engineering articles, test automation frameworks, Playwright tutorials, and Selenium best practices directly on Medium.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 group"
          >
            <span>Read all articles on Medium</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold rounded-xl border border-slate-700 transition-colors"
          >
            <UserPlus size={18} className="text-accent" />
            <span>Follow me on Medium</span>
          </a>
        </div>
      </div>
    </div>
  );
}
