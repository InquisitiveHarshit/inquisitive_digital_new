import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/backend/src/models/Service";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { slug } = await params;

    const service = await Service.findOne({ slug: slug, isActive: true });
    if (!service) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: service });
  } catch (err) {
    console.error(`[ERROR] GET /api/services/${params.slug}:`, err.message);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
