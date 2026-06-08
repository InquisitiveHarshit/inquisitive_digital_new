import { NextResponse } from "next/server";
// trigger reload
import connectDB from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";

export async function GET(request) {
  try {
    await connectDB();

    // Check if "admin" user already exists
    let admin = await Admin.findOne({ email: "admin" });
    if (!admin) {
      admin = await Admin.create({
        name: "Admin User",
        email: "admin",
        password: "admin",
        role: "super_admin",
        isActive: true
      });
      console.log("✅ Admin user seeded: email='admin', password='admin'");
      return NextResponse.json({
        success: true,
        message: "Admin user seeded successfully",
        data: { email: admin.email, role: admin.role }
      });
    } else {
      return NextResponse.json({
        success: true,
        message: "Admin user already exists",
        data: { email: admin.email, role: admin.role }
      });
    }
  } catch (err) {
    console.error("[ERROR] GET /api/admin/auth/seed:", err.message);
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

