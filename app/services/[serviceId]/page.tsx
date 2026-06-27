import React from "react";
import ServiceDetailClient from "./ServiceDetailClient";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";

export const revalidate = 3600; // Revalidate every hour

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
