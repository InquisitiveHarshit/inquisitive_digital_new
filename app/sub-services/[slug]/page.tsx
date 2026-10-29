import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import SubServiceDetailClient from "./SubServiceDetailClient";
import connectDB from "@/lib/mongodb";
import SubService from "@/lib/models/SubService";

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  try {
    await connectDB();
    const item = await SubService.findOne({ slug, isActive: true }).lean();
    if (item) {
      return {
        title: (item as any).seoTitle || `${(item as any).title} | Inquisitive Digital`,
        description: (item as any).seoDescription || (item as any).excerpt || (item as any).intro || "",
        openGraph: {
          title: (item as any).seoTitle || (item as any).title,
          description: (item as any).seoDescription || (item as any).excerpt || (item as any).intro,
          images: (item as any).heroImage?.url ? [(item as any).heroImage.url] : [],
        },
      };
    }
  } catch {
    // fallback
  }

  return {
    title: "Sub Service | Inquisitive Digital",
    description: "Specialized digital services and solutions by Inquisitive Digital.",
  };
}

export default async function SubServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  let subService: any = null;
  let allSubServices: any[] = [];

  try {
    await connectDB();

    const dbItem = await SubService.findOne({ slug }).lean();
    if (dbItem) {
      subService = JSON.parse(JSON.stringify(dbItem));
    }

    const fetchedItems = await SubService.find({ isActive: true })
      .select("title slug parentService category heroImage excerpt")
      .sort({ priority: -1, createdAt: -1 })
      .limit(6)
      .lean();

    if (fetchedItems) {
      allSubServices = JSON.parse(JSON.stringify(fetchedItems));
    }
  } catch (error) {
    console.error("[SubServicePage] DB Error:", error);
  }

  if (!subService) {
    notFound();
  }

  return (
    <>
      {subService.script && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: typeof subService.script === "string" ? subService.script : JSON.stringify(subService.script),
          }}
        />
      )}
      <SubServiceDetailClient
        subService={subService}
        relatedSubServices={allSubServices.filter((s) => s.slug !== slug)}
      />
    </>
  );
}
