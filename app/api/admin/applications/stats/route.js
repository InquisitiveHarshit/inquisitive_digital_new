import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Application from "@/lib/models/Application";
import Job from "@/lib/models/Job";

export async function GET(request) {
  try {
    await connectDB();

    const total_jobs = await Job.countDocuments();
    const active_jobs = await Job.countDocuments({ is_active: { $ne: false } });
    const total_applications = await Application.countDocuments();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const new_this_week = await Application.countDocuments({
      applied_at: { $gte: sevenDaysAgo }
    });

    return NextResponse.json({
      success: true,
      data: {
        total_jobs,
        active_jobs,
        total_applications,
        new_this_week
      }
    });
  } catch (err) {
    console.error("[ERROR] GET /api/admin/applications/stats:", err.message);
    if (err.message.includes("Not authorised") || err.message.includes("token")) {
      return NextResponse.json({ success: false, message: err.message }, { status: 401 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

