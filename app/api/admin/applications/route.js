import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Application from "@/backend/src/models/Application";
import Job from "@/backend/src/models/Job"; // required for populate

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const job_id = searchParams.get("job_id");
    const status = searchParams.get("status");

    const query = {};

    if (job_id && job_id !== "All") {
      query.job_id = job_id;
    }

    if (status && status !== "All") {
      query.status = status.toLowerCase();
    }

    // Populate Job details (title and department)
    const applications = await Application.find(query)
      .populate("job_id", "title department")
      .sort({ applied_at: -1 });

    return NextResponse.json({ success: true, data: applications });
  } catch (err) {
    console.error("[ERROR] GET /api/admin/applications:", err.message);
    if (err.message.includes("Not authorised") || err.message.includes("token")) {
      return NextResponse.json({ success: false, message: err.message }, { status: 401 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
