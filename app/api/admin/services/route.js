import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import slugify from "slugify";
import { sitemapState } from "@/lib/sitemapCache";

export async function GET(request) {
  try {
    await connectDB();

    const services = await Service.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, count: services.length, data: services });
  } catch (err) {
    console.error("[ERROR] GET /api/admin/services:", err.message);
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

    if (payload.title) {
      payload.slug = slugify(payload.title, { lower: true, strict: true, trim: true });
    }

    const service = await Service.create(payload);

    sitemapState.bust();
    revalidatePath("/services"); // instantly refresh the /services listing page
    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (err) {
    console.error("[ERROR] POST /api/admin/services:", err.message);
    
    if (err.message.includes("Not authorised") || err.message.includes("token")) {
      return NextResponse.json({ success: false, message: err.message }, { status: 401 });
    }
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return NextResponse.json({ success: false, message: messages.join(". ") }, { status: 400 });
    }
    if (err.code === 11000) {
      return NextResponse.json({ success: false, message: "A record with that slug already exists" }, { status: 400 });
    }

    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

