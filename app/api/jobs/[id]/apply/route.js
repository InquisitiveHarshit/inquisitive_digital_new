import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/lib/mongodb";
import Job from "@/backend/src/models/Job";
import Application from "@/backend/src/models/Application";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    // Convert file to base64 for Cloudinary upload
    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const b64 = buffer.toString("base64");
    const dataURI = `data:${resumeFile.type};base64,${b64}`;

    // Upload to Cloudinary
    // We use raw resource_type since resumes could be PDF or DOCX
    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: "inquisitive-digital/resumes",
      resource_type: "auto",
      public_id: `${Date.now()}-${resumeFile.name.replace(/\s/g, "_")}`,
    });

    // Save Application record
    const application = await Application.create({
      job_id: id,
      full_name: name,
      email,
      phone,
      cover_letter: coverLetter,
      resume_url: uploadResult.secure_url,
      resume_original_name: resumeFile.name,
    });

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
