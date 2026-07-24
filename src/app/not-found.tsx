import React from "react";
import Link from "next/link";
import { BookOpen, Home, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Ananth A",
  description: "The requested page could not be found. Return to the homepage or explore engineering blogs.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      {/* Glow Effect */}
      <div className="w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <main className="relative z-10 max-w-lg mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-md">
        <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-accent mx-auto mb-6">
          <AlertCircle size={40} />
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-50 mb-3 font-heading">
          404
        </h1>

        <h2 className="text-xl font-bold text-slate-200 mb-3 font-heading">
          Page Not Found
        </h2>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-slate-950 font-bold text-sm rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
          >
            <Home size={18} />
            <span>Back To Home</span>
          </Link>

          <Link
            href="/blogs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm rounded-xl border border-slate-700 transition-colors"
          >
            <BookOpen size={18} className="text-accent" />
            <span>Explore Blogs</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
