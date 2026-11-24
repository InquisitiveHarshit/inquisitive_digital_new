import { MetadataRoute } from "next";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import SubService from "@/lib/models/SubService";
import Blog from "@/lib/models/Blog";

export const dynamic = "force-dynamic"; // always regenerate, never cache statically
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.inquisitivedigital.com";

  // 1. Core static marketing and institutional routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`,           lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${baseUrl}/services`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${baseUrl}/blogs`,      lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${baseUrl}/about-us`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/careers`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = [];
  const subServiceRoutes: MetadataRoute.Sitemap = [];
  const countryRoutes: MetadataRoute.Sitemap = [];
  const cityRoutes: MetadataRoute.Sitemap = [];
  const blogRoutes: MetadataRoute.Sitemap = [];

  try {
    await connectDB();

    const [services, subServices, blogs] = await Promise.all([
      Service.find({ isActive: true }).select("slug updatedAt locations").lean(),
      SubService.find({ isActive: true }).select("slug updatedAt").lean(),
      Blog.find({ isActive: true }).select("slug updatedAt").lean(),
    ]);

    // 2. Parent Services + Nested Country Hubs + Nested City Pages
    if (Array.isArray(services)) {
      for (const service of services as any[]) {
        if (!service.slug) continue;

        const serviceUpdated = service.updatedAt ? new Date(service.updatedAt) : new Date();

        // Service root (e.g. /services/seo-aeo-geo)
        serviceRoutes.push({
          url: `${baseUrl}/services/${service.slug}`,
          lastModified: serviceUpdated,
          changeFrequency: "weekly" as const,
          priority: 0.9,
        });

        // Nested Locations: Country Hubs & City Pages
        if (Array.isArray(service.locations)) {
          for (const country of service.locations) {
            if (!country?.slug) continue;

            // Country Hub (e.g. /services/seo-aeo-geo/india)
            countryRoutes.push({
              url: `${baseUrl}/services/${service.slug}/${country.slug}`,
              lastModified: serviceUpdated,
              changeFrequency: "weekly" as const,
              priority: 0.8,
            });

            // City Pages (e.g. /services/seo-aeo-geo/india/delhi)
            if (Array.isArray(country.cities)) {
              for (const city of country.cities) {
                if (!city?.slug) continue;

                cityRoutes.push({
                  url: `${baseUrl}/services/${service.slug}/${country.slug}/${city.slug}`,
                  lastModified: serviceUpdated,
                  changeFrequency: "weekly" as const,
                  priority: 0.75,
                });
              }
            }
          }
        }
      }
    }

    // 3. Sub-Services (e.g. /sub-services/ecommerce-seo)
    if (Array.isArray(subServices)) {
      for (const sub of subServices as any[]) {
        if (!sub?.slug) continue;

        subServiceRoutes.push({
          url: `${baseUrl}/sub-services/${sub.slug}`,
          lastModified: sub.updatedAt ? new Date(sub.updatedAt) : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.85,
        });
      }
    }

    // 4. Blog Posts (e.g. /blogs/future-of-generative-engine-optimization)
    if (Array.isArray(blogs)) {
      for (const blog of blogs as any[]) {
        if (!blog?.slug) continue;

        blogRoutes.push({
          url: `${baseUrl}/blogs/${blog.slug}`,
          lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        });
      }
    }
  } catch (err) {
    console.error("[sitemap] DB fetch error:", err);
  }

  // Deduplicate entries by canonical URL to guarantee 100% valid sitemap XML
  const sitemapMap = new Map<string, MetadataRoute.Sitemap[number]>();

  const allRoutes = [
    ...staticRoutes,
    ...serviceRoutes,
    ...subServiceRoutes,
    ...countryRoutes,
    ...cityRoutes,
    ...blogRoutes,
  ];

  for (const route of allRoutes) {
    if (!sitemapMap.has(route.url)) {
      sitemapMap.set(route.url, route);
    }
  }

  return Array.from(sitemapMap.values());
}
