import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import SubService from "@/lib/models/SubService";
import slugify from "slugify";
import { sitemapState } from "@/lib/sitemapCache";
import { verifyAuth } from "@/lib/auth";

export async function GET(request) {
  try {
    await verifyAuth(request);
    await connectDB();

    const subServices = await SubService.find().sort({ priority: -1, createdAt: -1 });
    return NextResponse.json({ success: true, count: subServices.length, data: subServices });
  } catch (err) {
    console.error("[ERROR] GET /api/admin/sub-services:", err.message);
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
    await verifyAuth(request);
    await connectDB();

    const payload = await request.json();

    if (!payload.slug && payload.title) {
      payload.slug = slugify(payload.title, { lower: true, strict: true, trim: true });
    } else if (payload.slug) {
      payload.slug = slugify(payload.slug, { lower: true, strict: true, trim: true });
    }

    const subService = await SubService.create(payload);

    sitemapState.bust(); // invalidate sitemap cache
    revalidatePath("/sub-services");
    revalidatePath("/services");
    return NextResponse.json({ success: true, data: subService }, { status: 201 });
  } catch (err) {
    console.error("[ERROR] POST /api/admin/sub-services:", err.message);
    
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
