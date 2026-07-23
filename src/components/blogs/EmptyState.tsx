import React from "react";
import { BookOpen, ExternalLink } from "lucide-react";
import { MEDIUM_USERNAME } from "@/constants/medium";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionUrl?: string;
  className?: string;
}

export default function EmptyState({
  title = "No Articles Found",
  description = "New technical articles and QA automation insights are published regularly on Medium.",
  actionText = "Visit Medium Profile",
  actionUrl = `https://medium.com/@${MEDIUM_USERNAME}`,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`bg-slate-900/60 border border-slate-800 rounded-3xl p-10 sm:p-14 text-center flex flex-col items-center justify-center max-w-2xl mx-auto my-12 ${className}`}
    >
      <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-accent mb-6">
        <BookOpen size={40} />
      </div>

      <h3 className="text-2xl font-bold text-slate-100 mb-3 font-heading">
        {title}
      </h3>

      <p className="text-slate-400 text-base max-w-md mb-8 leading-relaxed">
        {description}
      </p>

      {actionUrl && (
        <a
          href={actionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
        >
          <span>{actionText}</span>
          <ExternalLink size={18} />
        </a>
      )}
    </div>
  );
}
