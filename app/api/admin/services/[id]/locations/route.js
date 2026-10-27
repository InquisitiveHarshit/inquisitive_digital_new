import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";

/**
 * GET /api/admin/services/[id]/locations
 * Returns just the locations array for a service.
 */
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const service = await Service.findById(id).select("locations slug title");
    if (!service) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: service.locations ?? [], slug: service.slug, title: service.title });
  } catch (err) {
    console.error(`[ERROR] GET /api/admin/services/${params?.id}/locations:`, err.message);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

/**
 * PUT /api/admin/services/[id]/locations
 * Body: { locations: LocationCountryData[] }
 * Replaces the entire locations array for a service.
 */
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const { locations } = body;

    if (!Array.isArray(locations)) {
      return NextResponse.json({ success: false, message: "locations must be an array" }, { status: 400 });
    }

    const service = await Service.findByIdAndUpdate(
      id,
      { $set: { locations } },
      { new: true, runValidators: false }
    );

    if (!service) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }

    // Revalidate all affected pages
    revalidatePath("/services");
    revalidatePath(`/services/${service.slug}`);
    if (Array.isArray(locations)) {
      for (const loc of locations) {
        if (loc?.slug) {
          revalidatePath(`/services/${service.slug}/${loc.slug}`);
        }
      }
    }

    return NextResponse.json({ success: true, data: service.locations });
  } catch (err) {
    console.error(`[ERROR] PUT /api/admin/services/${params?.id}/locations:`, err.message);
    return NextResponse.json({ success: false, message: err.message || "Internal server error" }, { status: 500 });
  }
}
