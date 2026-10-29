import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import SubService from "@/lib/models/SubService";
import slugify from "slugify";
import { sitemapState } from "@/lib/sitemapCache";
import { verifyAuth } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    await verifyAuth(request);
    await connectDB();

    const { id } = await params;
    const subService = await SubService.findById(id);
    if (!subService) {
      return NextResponse.json({ success: false, message: "Sub-service not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: subService });
  } catch (err) {
    console.error(`[ERROR] GET /api/admin/sub-services/${params?.id}:`, err.message);
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
    await verifyAuth(request);
    await connectDB();

    const { id } = await params;
    const payload = await request.json();

    if (payload.slug) {
      payload.slug = slugify(payload.slug, { lower: true, strict: true, trim: true });
    } else if (payload.title) {
      payload.slug = slugify(payload.title, { lower: true, strict: true, trim: true });
    }

    const subService = await SubService.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true, runValidators: true }
    );

    if (!subService) {
      return NextResponse.json({ success: false, message: "Sub-service not found" }, { status: 404 });
    }

    sitemapState.bust();
    revalidatePath("/sub-services");
    revalidatePath(`/sub-services/${subService.slug}`);
    revalidatePath("/services");
    return NextResponse.json({ success: true, data: subService });
  } catch (err) {
    console.error(`[ERROR] PUT /api/admin/sub-services/${params?.id}:`, err.message);
    
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
    await verifyAuth(request);
    await connectDB();

    const { id } = await params;
    const subService = await SubService.findByIdAndDelete(id);
    if (!subService) {
      return NextResponse.json({ success: false, message: "Sub-service not found" }, { status: 404 });
    }
    
    sitemapState.bust();
    revalidatePath("/sub-services");
    revalidatePath("/services");
    return NextResponse.json({ success: true, message: "Sub-service deleted successfully" });
  } catch (err) {
    console.error(`[ERROR] DELETE /api/admin/sub-services/${params?.id}:`, err.message);
    if (err.message.includes("Not authorised") || err.message.includes("token")) {
      return NextResponse.json({ success: false, message: err.message }, { status: 401 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
