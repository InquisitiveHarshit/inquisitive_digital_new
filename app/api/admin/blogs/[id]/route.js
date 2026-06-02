import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/backend/src/models/Blog";
import slugify from "slugify";
import { sitemapState } from "@/lib/sitemapCache";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: blog });
  } catch (err) {
    console.error(`[ERROR] GET /api/admin/blogs/${params?.id}:`, err.message);
    if (err.message.includes("Not authorised") || err.message.includes("token")) {
      return NextResponse.json({ success: false, message: err.message }, { status: 401 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const payload = await request.json();

    if (payload.slug) {
      payload.slug = slugify(payload.slug, { lower: true, strict: true, trim: true });
    } else if (payload.title) {
      payload.slug = slugify(payload.title, { lower: true, strict: true, trim: true });
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }

    sitemapState.bust();
    return NextResponse.json({ success: true, data: blog });
  } catch (err) {
    console.error(`[ERROR] PUT /api/admin/blogs/${params?.id}:`, err.message);
    
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

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }
    
    sitemapState.bust();
    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (err) {
    console.error(`[ERROR] DELETE /api/admin/blogs/${params?.id}:`, err.message);
    if (err.message.includes("Not authorised") || err.message.includes("token")) {
      return NextResponse.json({ success: false, message: err.message }, { status: 401 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
