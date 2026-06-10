import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";

export async function GET(request) {
  try {
    await connectDB();

    const services = await Service.find({})
      .select("slug title category shortDescription icon ctaText order")
      .sort({ order: 1, createdAt: -1 });

    return NextResponse.json({ success: true, count: services.length, data: services });
  } catch (err) {
    console.error("[ERROR] GET /api/services:", err.message);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

