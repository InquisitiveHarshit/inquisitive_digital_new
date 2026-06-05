import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Admin from "@/backend/src/models/Admin";
import { verifyAuth } from "@/lib/auth";

export async function POST(request) {
  try {
    // 1. Verify that the requester is a logged-in admin user
    await verifyAuth(request);

    await connectDB();

    const payload = await request.json();
    const { name, email, password, role } = payload;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email/username, and password are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if the username/email is already taken
    const existingAdmin = await Admin.findOne({ email: normalizedEmail });
    if (existingAdmin) {
      return NextResponse.json(
        { success: false, message: "Email or username is already taken" },
        { status: 400 }
      );
    }

    // Create the new admin
    const newAdmin = await Admin.create({
      name: name.trim(),
      email: normalizedEmail,
      password, // Password hashing happens in pre-save hook
      role: role || "editor",
      isActive: true
    });

    return NextResponse.json({
      success: true,
      message: "Admin created successfully",
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role
      }
    }, { status: 201 });

  } catch (err) {
    console.error("[ERROR] POST /api/admin/auth/create:", err.message);
    if (err.message.includes("Not authorised") || err.message.includes("token")) {
      return NextResponse.json({ success: false, message: err.message }, { status: 401 });
    }
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
