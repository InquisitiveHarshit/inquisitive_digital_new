import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { slug } = await params;

    const blog = await Blog.findOne({ slug: slug, isActive: true });
    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (err) {
    console.error(`[ERROR] GET /api/blogs/${params.slug}:`, err.message);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
