import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Application from "@/lib/models/Application";
import Job from "@/lib/models/Job"; // required for populate
import { verifyAuth } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    await verifyAuth(request);
    await connectDB();

    const { id } = await params;
    const application = await Application.findById(id).populate("job_id");

    if (!application) {
      return NextResponse.json({ success: false, message: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: application });
  } catch (err) {
    console.error(`[ERROR] GET /api/admin/applications/${params?.id}:`, err.message);
    if (err.message.includes("Not authorised") || err.message.includes("token")) {
      return NextResponse.json({ success: false, message: err.message }, { status: 401 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
