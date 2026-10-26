import React from "react";
import ServicesClient from "./ServicesClient";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";

export const revalidate = 3600; // Revalidate every hour

export default async function ServicesPage() {
  let initialServices: any[] = [];
  let primaryServiceSlug = "seo-services";
  let locations: any[] = [];

  try {
    await connectDB();
    const fetchedServices = await Service.find({ isActive: true })
      .select("_id slug title category shortDescription icon ctaText locations")
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

      // Find service with configured locations
      const configuredService = fetchedServices.find(
        (s: any) => Array.isArray(s.locations) && s.locations.length > 0
      );

      if (configuredService) {
        primaryServiceSlug = configuredService.slug;
        locations = JSON.parse(JSON.stringify(configuredService.locations));
      }
    }
  } catch (error) {
    console.error("[ServicesPage] Error fetching services:", error);
  }

  return (
    <ServicesClient
      initialServices={initialServices}
      primaryServiceSlug={primaryServiceSlug}
      locations={locations}
    />
  );
}
