import React from "react";

interface SectionSkeletonProps {
  count?: number;
  className?: string;
}

export default function SectionSkeleton({
  count = 3,
  className = "",
}: SectionSkeletonProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${className}`}>
      {Array.from({ length: count }, (_, idx) => (
        <div
          key={idx}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 animate-pulse space-y-4"
        >
          <div className="h-48 bg-slate-800 rounded-2xl" />
          <div className="h-6 bg-slate-800 rounded-lg w-3/4" />
          <div className="h-4 bg-slate-800/80 rounded w-full" />
          <div className="h-4 bg-slate-800/80 rounded w-5/6" />
          <div className="pt-4 flex justify-between">
            <div className="h-4 w-24 bg-slate-800 rounded" />
            <div className="h-8 w-24 bg-slate-800 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
