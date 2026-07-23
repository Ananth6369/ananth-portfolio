import React from "react";
import { AlertCircle, RotateCw, ExternalLink } from "lucide-react";
import { MEDIUM_USERNAME } from "@/constants/medium";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorState({
  title = "Unable to Load Articles",
  message = "We encountered a temporary network issue fetching Medium articles. You can retry or visit Medium directly.",
  onRetry,
  className = "",
}: ErrorStateProps) {
  return (
    <div
      className={`bg-slate-900/80 border border-red-500/20 rounded-3xl p-10 sm:p-14 text-center flex flex-col items-center justify-center max-w-2xl mx-auto my-12 ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-6">
        <AlertCircle size={36} />
      </div>

      <h3 className="text-2xl font-bold text-slate-100 mb-3 font-heading">
        {title}
      </h3>

      <p className="text-slate-400 text-base max-w-md mb-8 leading-relaxed">
        {message}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold rounded-xl border border-slate-700 transition-colors"
          >
            <RotateCw size={18} />
            <span>Try Again</span>
          </button>
        )}

        <a
          href={`https://medium.com/@${MEDIUM_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
        >
          <span>Read on Medium</span>
          <ExternalLink size={18} />
        </a>
      </div>
    </div>
  );
}
