import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Application from "@/backend/src/models/Application";
import { verifyAuth } from "@/lib/auth";

export async function PUT(request, { params }) {
  try {
    await verifyAuth(request);
    await connectDB();

    const { id } = await params;
    const payload = await request.json();
    const { status } = payload;

    if (!["pending", "shortlisted", "rejected"].includes(status?.toLowerCase())) {
      return NextResponse.json(
        { success: false, message: "Status must be: pending, shortlisted, or rejected" },
        { status: 400 }
      );
    }

    const application = await Application.findByIdAndUpdate(
      id,
      { status: status.toLowerCase() },
      { new: true, runValidators: true }
    );

    if (!application) {
      return NextResponse.json({ success: false, message: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: application });
  } catch (err) {
    console.error(`[ERROR] PUT /api/admin/applications/${params?.id}/status:`, err.message);
    if (err.message.includes("Not authorised") || err.message.includes("token")) {
      return NextResponse.json({ success: false, message: err.message }, { status: 401 });
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
