import React from "react";
import { Blog } from "@/types/blog";
import BlogCard from "./BlogCard";

interface BlogGridProps {
  blogs?: Blog[];
  children?: React.ReactNode;
  className?: string;
}

export default function BlogGrid({ blogs, children, className = "" }: BlogGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {children
        ? children
        : blogs?.map((blog) => <BlogCard key={blog.id || blog.slug} blog={blog} />)}
    </div>
  );
}
