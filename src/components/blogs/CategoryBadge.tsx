import React from "react";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

/**
 * Returns consistent color scheme classes based on category tag string
 */
function getCategoryColorStyle(category: string): string {
  const normalized = category.toLowerCase().trim();

  if (normalized.includes("playwright") || normalized.includes("automation")) {
    return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20";
  }

  if (normalized.includes("java") || normalized.includes("selenium")) {
    return "bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20";
  }

  if (normalized.includes("github") || normalized.includes("git") || normalized.includes("devops")) {
    return "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20";
  }

  if (normalized.includes("testing") || normalized.includes("qa") || normalized.includes("testng")) {
    return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20";
  }

  if (normalized.includes("web") || normalized.includes("react") || normalized.includes("next")) {
    return "bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20";
  }

  return "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700/80";
}

export default function CategoryBadge({ category, className = "" }: CategoryBadgeProps) {
  if (!category) return null;

  const colorStyles = getCategoryColorStyle(category);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full border transition-colors ${colorStyles} ${className}`}
    >
      {category}
    </span>
  );
}
