import React from "react";
import { Sparkles } from "lucide-react";

interface FeaturedRibbonProps {
  className?: string;
}

export default function FeaturedRibbon({ className = "" }: FeaturedRibbonProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-500/20 to-cyan-500/20 text-amber-300 text-xs font-bold rounded-full border border-amber-500/40 shadow-sm shadow-amber-500/10 backdrop-blur-sm ${className}`}
    >
      <Sparkles size={13} className="text-amber-400 animate-pulse" />
      <span>Featured Article</span>
    </span>
  );
}
