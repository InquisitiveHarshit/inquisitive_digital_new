import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "inquisitive_digital_super_secret_change_in_production";

export async function POST(request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email/username and password are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Fetch admin including the select: false password field
    const admin = await Admin.findOne({ email: normalizedEmail }).select("+password");

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid email/username or password" },
        { status: 401 }
      );
    }

    if (!admin.isActive) {
      return NextResponse.json(
        { success: false, message: "Account is inactive" },
        { status: 401 }
      );
    }

    // Compare password
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email/username or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    });

    return NextResponse.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (err) {
    console.error("[ERROR] POST /api/admin/auth/login:", err.message);
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

