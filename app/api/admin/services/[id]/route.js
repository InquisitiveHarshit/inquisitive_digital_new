import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/backend/src/models/Service";
import slugify from "slugify";
import { sitemapState } from "@/lib/sitemapCache";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const service = await Service.findById(id);
    if (!service) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: service });
  } catch (err) {
    console.error(`[ERROR] GET /api/admin/services/${params?.id}:`, err.message);
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

    if (payload.title) {
      payload.slug = slugify(payload.title, { lower: true, strict: true, trim: true });
    }

    const service = await Service.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true, runValidators: true }
    );

    if (!service) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }

    sitemapState.bust();
    return NextResponse.json({ success: true, data: service });
  } catch (err) {
    console.error(`[ERROR] PUT /api/admin/services/${params?.id}:`, err.message);
    
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
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }
    
    sitemapState.bust();
    return NextResponse.json({ success: true, message: "Service deleted successfully" });
  } catch (err) {
    console.error(`[ERROR] DELETE /api/admin/services/${params?.id}:`, err.message);
    if (err.message.includes("Not authorised") || err.message.includes("token")) {
      return NextResponse.json({ success: false, message: err.message }, { status: 401 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
