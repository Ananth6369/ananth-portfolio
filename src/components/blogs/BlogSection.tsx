import React from "react";

interface BlogSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export default function BlogSection({
  children,
  id = "blogs",
  className = "",
}: BlogSectionProps) {
  return (
    <section id={id} className={`py-20 relative overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">{children}</div>
    </section>
  );
}
