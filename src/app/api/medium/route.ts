import { NextResponse } from "next/server";
import { getAllBlogs, getFeaturedBlog } from "@/lib/medium";
import { MediumApiResponse } from "@/types/blog";

export async function GET() {
  try {
    const [blogs, featuredBlog] = await Promise.all([
      getAllBlogs(),
      getFeaturedBlog(),
    ]);

    const payload: MediumApiResponse = {
      status: "success",
      count: blogs.length,
      featuredBlog,
      blogs,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Error in /api/medium endpoint:", error);

    const errorPayload: MediumApiResponse = {
      status: "error",
      message: error instanceof Error ? error.message : "Failed to fetch Medium blogs",
      count: 0,
      featuredBlog: null,
      blogs: [],
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(errorPayload, { status: 500 });
  }
}
