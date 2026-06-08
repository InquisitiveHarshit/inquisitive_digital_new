import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Job from "@/lib/models/Job";
import Application from "@/lib/models/Application";
import { verifyAuth } from "@/lib/auth";

export async function PUT(request, { params }) {
  try {
    await verifyAuth(request);
    await connectDB();

    const { id } = await params;
    const payload = await request.json();

    const job = await Job.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true
    });

    if (!job) {
      return NextResponse.json({ success: false, message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: job });
  } catch (err) {
    console.error(`[ERROR] PUT /api/admin/jobs/${params?.id}:`, err.message);
    
    if (err.message.includes("Not authorised") || err.message.includes("token")) {
      return NextResponse.json({ success: false, message: err.message }, { status: 401 });
    }

    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await verifyAuth(request);
    await connectDB();

    const { id } = await params;
    const job = await Job.findByIdAndDelete(id);
    if (!job) {
      return NextResponse.json({ success: false, message: "Job not found" }, { status: 404 });
    }
    
    // Cascade delete all applications for this job
    await Application.deleteMany({ job_id: id });

    return NextResponse.json({ success: true, data: {} });
  } catch (err) {
    console.error(`[ERROR] DELETE /api/admin/jobs/${params?.id}:`, err.message);
    if (err.message.includes("Not authorised") || err.message.includes("token")) {
      return NextResponse.json({ success: false, message: err.message }, { status: 401 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
