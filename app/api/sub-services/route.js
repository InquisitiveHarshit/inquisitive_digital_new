import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SubService from "@/lib/models/SubService";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const parentService = searchParams.get("parentService");

    const filter = { isActive: true };
    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }
    if (parentService) {
      filter.parentService = { $regex: parentService, $options: "i" };
    }

    const subServices = await SubService.find(filter)
      .sort({ priority: -1, createdAt: -1 });

    return NextResponse.json({ success: true, count: subServices.length, data: subServices });
  } catch (err) {
    console.error("[ERROR] GET /api/sub-services:", err.message);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
