import React from "react";

interface LoadingSkeletonProps {
  count?: number;
  showFeatured?: boolean;
  className?: string;
}

export function FeaturedSkeleton() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden animate-pulse mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-6 h-64 sm:h-80 lg:h-full bg-slate-800" />
        <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="h-6 w-20 bg-slate-800 rounded-full" />
              <div className="h-6 w-24 bg-slate-800 rounded-full" />
            </div>
            <div className="h-8 bg-slate-800 rounded-xl w-3/4" />
            <div className="h-8 bg-slate-800 rounded-xl w-1/2" />
            <div className="h-4 bg-slate-800/80 rounded w-full" />
            <div className="h-4 bg-slate-800/80 rounded w-5/6" />
          </div>
          <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
            <div className="h-4 w-32 bg-slate-800 rounded" />
            <div className="h-10 w-36 bg-slate-800 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden animate-pulse flex flex-col h-[420px]">
      <div className="h-48 bg-slate-800" />
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="h-5 w-16 bg-slate-800 rounded-full" />
            <div className="h-5 w-20 bg-slate-800 rounded-full" />
          </div>
          <div className="h-6 bg-slate-800 rounded-lg w-5/6" />
          <div className="h-4 bg-slate-800/80 rounded w-full" />
          <div className="h-4 bg-slate-800/80 rounded w-4/5" />
        </div>
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
          <div className="h-4 w-24 bg-slate-800 rounded" />
          <div className="h-4 w-16 bg-slate-800 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function LoadingSkeleton({
  count = 3,
  showFeatured = false,
  className = "",
}: LoadingSkeletonProps) {
  return (
    <div className={className}>
      {showFeatured && <FeaturedSkeleton />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: count }, (_, idx) => (
          <CardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}
