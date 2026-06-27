import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Application from "@/lib/models/Application";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // We must explicitly select the resume_data field since it's excluded by default
    const application = await Application.findById(id).select("+resume_data +resume_content_type +resume_original_name");

    if (!application || !application.resume_data) {
      return NextResponse.json({ success: false, message: "Resume not found" }, { status: 404 });
    }

    const headers = new Headers();
    headers.set("Content-Type", application.resume_content_type || "application/pdf");
    
    // Add Content-Disposition header to prompt download or display properly in browser
    headers.set("Content-Disposition", `inline; filename="${application.resume_original_name}"`);

    return new NextResponse(application.resume_data, {
      status: 200,
      headers
    });
  } catch (err) {
    console.error(`[ERROR] GET /api/resumes/${params.id}:`, err.message);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const application = await Application.findById(id);

    if (!application) {
      return NextResponse.json({ success: false, message: "Application not found" }, { status: 404 });
    }

    application.resume_data = undefined;
    application.resume_content_type = undefined;
    application.resume_url = ""; // Clear the URL so the UI knows it's gone
    
    await application.save();

    return NextResponse.json({ success: true, message: "Resume cleared successfully" });
  } catch (err) {
    console.error(`[ERROR] DELETE /api/resumes/${params.id}:`, err.message);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
