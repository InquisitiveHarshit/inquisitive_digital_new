import { MetadataRoute } from "next";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import Blog from "@/lib/models/Blog";

export const dynamic = "force-dynamic"; // always regenerate, never cache statically

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.inquisitivedigital.com";

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`,           lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${baseUrl}/services`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${baseUrl}/blogs`,      lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${baseUrl}/about-us`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/careers`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  let serviceRoutes: MetadataRoute.Sitemap = [];
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    await connectDB();

    const [services, blogs] = await Promise.all([
      Service.find({ isActive: true }).select("slug updatedAt").lean(),
      Blog.find({ isActive: true }).select("slug updatedAt").lean(),
    ]);

    serviceRoutes = (services as any[]).map((s) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: s.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

    blogRoutes = (blogs as any[]).map((b) => ({
      url: `${baseUrl}/blogs/${b.slug}`,
      lastModified: b.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (err) {
    // If DB is unavailable, return static routes only
    console.error("[sitemap] DB error:", err);
  }

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
