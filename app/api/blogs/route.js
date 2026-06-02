import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/backend/src/models/Blog";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const filter = { isActive: true };
    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    const blogs = await Blog.find(filter)
      .select("-content") // exclude heavy content from listing
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, count: blogs.length, data: blogs });
  } catch (err) {
    console.error("[ERROR] GET /api/blogs:", err.message);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
