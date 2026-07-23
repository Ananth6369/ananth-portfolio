import React from "react";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionUrl?: string;
  actionText?: string;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  actionUrl,
  actionText = "View All Articles",
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-50 mb-3 font-heading">
            {title}
          </h2>
          {subtitle && (
            <p className="text-slate-400 text-base md:text-lg max-w-2xl">
              {subtitle}
            </p>
          )}
          <div className="w-20 h-1.5 bg-accent rounded-full mt-4" />
        </div>

        {actionUrl && (
          <a
            href={actionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-800 text-accent font-semibold text-sm rounded-xl hover:border-accent/40 hover:bg-slate-800/80 transition-all group self-start md:self-auto"
          >
            <span>{actionText}</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        )}
      </div>
    </div>
  );
}
