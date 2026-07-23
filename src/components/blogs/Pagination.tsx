import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Blog Pagination Navigation"
      className={`flex items-center justify-center gap-2 mt-12 ${className}`}
    >
      {/* Previous Page Button */}
      <button
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous Page"
        className="flex items-center justify-center p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:border-accent/40 hover:text-accent disabled:opacity-40 disabled:hover:border-slate-800 disabled:hover:text-slate-300 transition-colors"
      >
        <ArrowLeft size={18} />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5 px-2">
        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange?.(page)}
              aria-current={isActive ? "page" : undefined}
              aria-label={`Page ${page}`}
              className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all ${
                isActive
                  ? "bg-accent text-slate-950 font-bold shadow-lg shadow-cyan-500/20"
                  : "bg-slate-900 border border-slate-800 text-slate-300 hover:border-accent/40 hover:text-accent"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Page Button */}
      <button
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next Page"
        className="flex items-center justify-center p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:border-accent/40 hover:text-accent disabled:opacity-40 disabled:hover:border-slate-800 disabled:hover:text-slate-300 transition-colors"
      >
        <ArrowRight size={18} />
      </button>
    </nav>
  );
}
