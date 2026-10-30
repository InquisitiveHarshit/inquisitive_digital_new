import React from "react";
import ServiceDetailClient from "./ServiceDetailClient";
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

const STATIC_FALLBACK_MAP: Record<string, { data: any; icon: string }> = {
  "data-engineering": { data: dataEngineeringData, icon: "Database" },
  "seo-services": { data: seoData, icon: "Search" },
  "web-development": { data: webDevelopmentData, icon: "Code" },
  "performance-marketing": { data: performanceMarketingData, icon: "TrendingUp" },
  "content-marketing": { data: contentMarketingData, icon: "FileText" },
  "social-media-marketing": { data: socialMediaData, icon: "Share2" },
  "creative-services": { data: creativeServicesData, icon: "Palette" },
};

export default async function ServiceDetailPage({ params }: { params: Promise<{ serviceId: string }> }) {
  const resolvedParams = await params;
  const serviceId = resolvedParams.serviceId;

  let initialService = null;

  try {
    await connectDB();
    const dbService = await Service.findOne({ slug: serviceId, isActive: true }).lean();

    if (dbService) {
      initialService = JSON.parse(JSON.stringify(dbService));
      if (initialService._id) {
        initialService._id = initialService._id.toString();
      }
    }
  } catch (error) {
    console.error("[ServiceDetailPage] Error fetching service:", error);
  }

  // Fallback to static data if not found in database or during build/offline
  if (!initialService && STATIC_FALLBACK_MAP[serviceId]) {
    const fallback = STATIC_FALLBACK_MAP[serviceId];
    const { id, shortDesc, detailedDesc, ...rest } = fallback.data;
    initialService = {
      ...rest,
      _id: `static-${id}`,
      slug: id,
      shortDescription: shortDesc,
      description: detailedDesc,
      icon: fallback.icon,
      ctaText: rest.ctaText || "Explore Solution",
    };
  }

  const schema = initialService?.schemaData || null;

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <ServiceDetailClient initialService={initialService} />
    </>
  );
}
