import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Home, FileText, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Ananth A",
  description: "The requested page could not be found. Return to the homepage, explore engineering blogs, or download resume.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div
      data-testid="not-found-container"
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
    >
      {/* Background Decorator Glows */}
      <div className="w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <main className="relative z-10 max-w-xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-md">
        {/* Custom Portrait Artwork Container */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 blur-md opacity-40 animate-pulse" />
          <div className="relative w-full h-full rounded-full border-2 border-accent overflow-hidden shadow-xl bg-slate-800">
            <Image
              src="/profile-headshot.png"
              alt="Ananth A Portrait"
              fill
              priority
              sizes="128px"
              className="object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-slate-900 border border-slate-700 p-1.5 rounded-full text-accent shadow-md">
            <Sparkles size={16} />
          </div>
        </div>

        {/* 404 Header */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-slate-100 to-blue-400 mb-2 font-heading tracking-tight">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mb-3 font-heading">
          Page Not Found
        </h2>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
          Oops! The route you are trying to access doesn&apos;t exist or has moved. Explore the portfolio sections or check out the latest QA automation blogs.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            data-testid="not-found-home-button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent text-slate-950 font-bold text-sm rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
          >
            <Home size={16} />
            <span>Back To Home</span>
          </Link>

          <Link
            href="/blogs"
            data-testid="not-found-blogs-button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm rounded-xl border border-slate-700 transition-colors"
          >
            <BookOpen size={16} className="text-accent" />
            <span>Browse Blogs</span>
          </Link>

          <a
            href="/resume.pdf"
            data-testid="not-found-resume-button"
            download="Ananth_A_Resume.pdf"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-slate-100 font-bold text-sm rounded-xl border border-slate-700/80 transition-colors"
          >
            <FileText size={16} className="text-emerald-400" />
            <span>Resume</span>
          </a>
        </div>
      </main>
    </div>
  );
}
