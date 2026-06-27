import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Job from "@/lib/models/Job";
import Application from "@/lib/models/Application";

export async function POST(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    // Check if job is active
    const job = await Job.findOne({ _id: id, is_active: { $ne: false } });
    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job position not found or is no longer accepting applications" },
        { status: 404 }
      );
    }

    // Parse formData
    const formData = await request.formData();
    
    // Support both Frontend (name, coverLetter) and Standard schema formats
    const name = formData.get("name") || formData.get("full_name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const coverLetter = formData.get("coverLetter") || formData.get("cover_letter") || "";
    const resumeFile = formData.get("resume");

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    if (!resumeFile || typeof resumeFile === "string") {
      return NextResponse.json(
        { success: false, message: "Resume file is required" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save Application record
    const application = new Application({
      job_id: id,
      full_name: name,
      email,
      phone,
      cover_letter: coverLetter,
      resume_original_name: resumeFile.name,
      resume_content_type: resumeFile.type || "application/pdf",
      resume_data: buffer,
    });
    
    // Set a dynamic URL that routes to our new GET endpoint
    application.resume_url = `/api/resumes/${application._id}`;
    
    await application.save();

    return NextResponse.json(
      { success: true, data: { id: application.id } },
      { status: 201 }
    );
  } catch (err) {
    console.error(`[ERROR] POST /api/jobs/${params.id}/apply:`, err.message);
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
