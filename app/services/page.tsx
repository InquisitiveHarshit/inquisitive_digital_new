import React from "react";
import ServicesClient from "./ServicesClient";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";

export const revalidate = 3600; // Revalidate every hour

export default async function ServicesPage() {
  let initialServices: any[] = [];

  try {
    await connectDB();
    const fetchedServices = await Service.find({ isActive: true })
      .select("_id slug title category shortDescription icon ctaText")
      .sort({ order: 1 })
      .lean();

    if (fetchedServices && fetchedServices.length > 0) {
      initialServices = fetchedServices.map((s: any) => ({
        _id: s._id.toString(),
        slug: s.slug,
        title: s.title,
        category: s.category || "Service",
        shortDescription: s.shortDescription,
        icon: s.icon,
        ctaText: s.ctaText || "Explore Solution",
      }));
    }
  } catch (error) {
    console.error("[ServicesPage] Error fetching services:", error);
  }

  return <ServicesClient initialServices={initialServices} />;
}
