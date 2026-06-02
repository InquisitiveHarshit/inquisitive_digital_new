import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/backend/src/models/Blog";
import slugify from "slugify";
import { sitemapState } from "@/lib/sitemapCache";

export async function GET(request) {
  try {
    await connectDB();

    const blogs = await Blog.find().select("-content").sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: blogs.length, data: blogs });
  } catch (err) {
    console.error("[ERROR] GET /api/admin/blogs:", err.message);
    if (err.message.includes("Not authorised") || err.message.includes("token")) {
      return NextResponse.json({ success: false, message: err.message }, { status: 401 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const payload = await request.json();

    if (!payload.slug && payload.title) {
      payload.slug = slugify(payload.title, { lower: true, strict: true, trim: true });
    } else if (payload.slug) {
      payload.slug = slugify(payload.slug, { lower: true, strict: true, trim: true });
    }

    const blog = await Blog.create(payload);

    sitemapState.bust(); // invalidate sitemap cache
    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (err) {
    console.error("[ERROR] POST /api/admin/blogs:", err.message);
    
    if (err.message.includes("Not authorised") || err.message.includes("token")) {
      return NextResponse.json({ success: false, message: err.message }, { status: 401 });
    }
    if (err.code === 11000) {
      return NextResponse.json({ success: false, message: "A record with that slug already exists" }, { status: 400 });
    }

    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
