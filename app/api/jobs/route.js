import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Job from "@/lib/models/Job";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const department = searchParams.get("department");
    const type = searchParams.get("type");
    const location = searchParams.get("location");

    const query = { is_active: { $ne: false } }; // default to true

    if (department && department !== "All") {
      query.department = { $regex: new RegExp(`^${department}$`, "i") };
    }

    if (type && type !== "All") {
      // Handle potential casing issues (e.g. Remote -> remote, Full-time -> full-time)
      query.type = type.toLowerCase();
    }

    if (location && location !== "All") {
      query.location = { $regex: new RegExp(`^${location}$`, "i") };
    }

    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { title: searchRegex },
        { department: searchRegex },
        { location: searchRegex }
      ];
    }

    console.log("🔍 Checking mongoose connection readyState before Job.find:", mongoose.connection.readyState);
    const jobs = await Job.find(query).sort({ created_at: -1 });
    console.log("✅ Job.find resolved, found", jobs.length, "jobs");

    return NextResponse.json({ success: true, data: jobs });
  } catch (err) {
    console.error("[ERROR] GET /api/jobs:", err.message);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

