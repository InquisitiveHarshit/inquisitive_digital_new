import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import { dataEngineeringData } from "@/app/services/data/data-engineering";

export async function GET(request) {
  try {
    await connectDB();

    let services = await Service.find({})
      .select("slug title category shortDescription icon ctaText order")
      .sort({ order: 1, createdAt: -1 });

    const hasDataEngineering = services.some((s) => s.slug === "data-engineering");
    if (!hasDataEngineering) {
      try {
        const { id, shortDesc, detailedDesc, ...rest } = dataEngineeringData;
        const newDE = await Service.findOneAndUpdate(
          { slug: "data-engineering" },
          {
            $set: {
              ...rest,
              slug: "data-engineering",
              title: "Data Engineering Services",
              category: "Data & AI",
              shortDescription: shortDesc,
              description: detailedDesc,
              icon: "Database",
              order: 7,
              isActive: true,
            },
          },
          { upsert: true, new: true, runValidators: true }
        );
        if (newDE) {
          services.push(newDE);
        }
      } catch (upsertErr) {
        console.warn("[WARN] Could not auto-upsert data-engineering in /api/services:", upsertErr.message);
        services.push({
          slug: "data-engineering",
          title: "Data Engineering Services",
          category: "Data & AI",
          shortDescription: dataEngineeringData.shortDesc,
          icon: "Database",
          order: 7,
        });
      }
    }

    return NextResponse.json({ success: true, count: services.length, data: services });
  } catch (err) {
    console.error("[ERROR] GET /api/services:", err.message);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
