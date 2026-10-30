import React from "react";
import ServicesClient from "./ServicesClient";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";

import { dataEngineeringData } from "@/app/services/data/data-engineering";
import { seoData } from "@/app/services/data/seo";
import { performanceMarketingData } from "@/app/services/data/performance-marketing";
import { contentMarketingData } from "@/app/services/data/content-marketing";
import { socialMediaData } from "@/app/services/data/social-media";
import { webDevelopmentData } from "@/app/services/data/web-development";
import { creativeServicesData } from "@/app/services/data/creative-services";

export const revalidate = 3600; // Revalidate every hour

const STATIC_SERVICES_LIST = [
  { ...seoData, slug: "seo-services", icon: "Search" },
  { ...performanceMarketingData, slug: "performance-marketing", icon: "TrendingUp" },
  { ...contentMarketingData, slug: "content-marketing", icon: "FileText" },
  { ...socialMediaData, slug: "social-media-marketing", icon: "Share2" },
  { ...webDevelopmentData, slug: "web-development", icon: "Code" },
  { ...creativeServicesData, slug: "creative-services", icon: "Palette" },
  { ...dataEngineeringData, slug: "data-engineering", icon: "Database" },
].map((s) => ({
  _id: `static-${s.slug}`,
  slug: s.slug,
  title: s.title,
  category: s.category || "Service",
  shortDescription: s.shortDesc || (s as any).shortDescription,
  icon: s.icon,
  ctaText: s.ctaText || "Explore Solution",
}));

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

      // Ensure data-engineering is present even if DB was seeded before this update
      if (!initialServices.some((s) => s.slug === "data-engineering")) {
        const deStatic = STATIC_SERVICES_LIST.find((s) => s.slug === "data-engineering");
        if (deStatic) initialServices.push(deStatic);
      }

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

  if (initialServices.length === 0) {
    initialServices = STATIC_SERVICES_LIST;
  }

  return (
    <ServicesClient
      initialServices={initialServices}
      primaryServiceSlug={primaryServiceSlug}
      locations={locations}
    />
  );
}
