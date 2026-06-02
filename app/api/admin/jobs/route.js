import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Job from "@/backend/src/models/Job";

export async function GET(request) {
  try {
    await connectDB();

    const jobs = await Job.aggregate([
      {
        $lookup: {
          from: "applications",
          localField: "_id",
          foreignField: "job_id",
          as: "applications"
        }
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          title: 1,
          department: 1,
          location: 1,
          type: 1,
          description: 1,
          requirements: 1,
          salary_range: 1,
          is_active: 1,
          created_at: 1,
          updated_at: 1,
          applications_count: { $size: "$applications" }
        }
      },
      {
        $sort: { created_at: -1 }
      }
    ]);

    return NextResponse.json({ success: true, data: jobs });
  } catch (err) {
    console.error("[ERROR] GET /api/admin/jobs:", err.message);
    if (err.message.includes("Not authorised") || err.message.includes("token")) {
      return NextResponse.json({ success: false, message: err.message }, { status: 401 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const payload = await request.json();
    const { title, department, location, type, description, requirements, salary_range } = payload;

    const job = await Job.create({
      title,
      department,
      location,
      type: type?.toLowerCase(),
      description,
      requirements,
      salary_range: salary_range || null
    });

    return NextResponse.json({ success: true, data: job }, { status: 201 });
  } catch (err) {
    console.error("[ERROR] POST /api/admin/jobs:", err.message);
    
    if (err.message.includes("Not authorised") || err.message.includes("token")) {
      return NextResponse.json({ success: false, message: err.message }, { status: 401 });
    }
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return NextResponse.json({ success: false, message: messages.join(". ") }, { status: 400 });
    }

    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
