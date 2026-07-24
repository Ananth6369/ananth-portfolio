"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Boundary caught exception:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <main className="max-w-lg mx-auto bg-slate-900/90 border border-red-500/20 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-md">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto mb-6">
          <AlertCircle size={36} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-50 mb-3 font-heading">
          Something went wrong
        </h1>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
          An unexpected application error occurred. You can retry the operation or navigate back to safety.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-slate-950 font-bold text-sm rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
          >
            <RotateCw size={18} />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm rounded-xl border border-slate-700 transition-colors"
          >
            <Home size={18} />
            <span>Back To Home</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
