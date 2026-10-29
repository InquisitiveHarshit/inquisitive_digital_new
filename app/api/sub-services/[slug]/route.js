import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SubService from "@/lib/models/SubService";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { slug } = await params;
    const subService = await SubService.findOne({ slug, isActive: true });
    if (!subService) {
      return NextResponse.json({ success: false, message: "Sub-service not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: subService });
  } catch (err) {
    console.error(`[ERROR] GET /api/sub-services/${params?.slug}:`, err.message);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
