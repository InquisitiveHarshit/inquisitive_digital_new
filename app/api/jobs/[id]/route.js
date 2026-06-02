import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Job from "@/backend/src/models/Job";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const job = await Job.findOne({ _id: id, is_active: { $ne: false } });

    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job not found or is no longer active" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: job });
  } catch (err) {
    console.error(`[ERROR] GET /api/jobs/${params.id}:`, err.message);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
