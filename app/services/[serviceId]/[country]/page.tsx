import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CountryHubClient from "./CountryHubClient";
import { LocationCountryData } from "@/lib/data/locations";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";

interface CountryHubPageProps {
  params: Promise<{
    serviceId: string;
    country: string;
  }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getServiceAndCountry(serviceId: string, countrySlug: string) {
  let serviceTitle = "SEO Services";
  let country: LocationCountryData | undefined;

  try {
    await connectDB();
    const dbService = await Service.findOne({ slug: serviceId, isActive: true })
      .select("title locations")
      .lean();

    if (dbService) {
      if ((dbService as any).title) {
        serviceTitle = (dbService as any).title;
      }
      const dbLocations: LocationCountryData[] = (dbService as any).locations;
      if (Array.isArray(dbLocations) && dbLocations.length > 0) {
        const found = dbLocations.find(
          (c) => c.slug.toLowerCase() === countrySlug.toLowerCase()
        );
        if (found) {
          country = JSON.parse(JSON.stringify(found));
        }
      }
    }
  } catch (err) {
    console.error("[CountryHubPage] DB error:", err);
  }

  return { serviceTitle, country };
}

export async function generateMetadata({
  params,
}: CountryHubPageProps): Promise<Metadata> {
  const { serviceId, country: countrySlug } = await params;
  const { serviceTitle, country } = await getServiceAndCountry(serviceId, countrySlug);

  if (!country) {
    return {
      title: "Not Found | Inquisitive Digital",
    };
  }

  const pageTitle =
    country.seoTitle ||
    `${country.headline || `${serviceTitle} in ${country.name}`} | Regional Search Optimization`;
  const pageDescription =
    country.seoDescription ||
    (country.description
      ? country.description
      : `Discover top-tier ${serviceTitle} across ${country.name}. Explore customized organic search campaigns for leading cities including ${country.cities.map((c) => c.name).slice(0, 3).join(", ")}.`);
  const canonicalUrl = `https://www.inquisitivedigital.com/services/${serviceId}/${country.slug}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };
}

export default async function CountryHubPage({
  params,
}: CountryHubPageProps) {
  const { serviceId, country: countrySlug } = await params;
  const { serviceTitle, country } = await getServiceAndCountry(serviceId, countrySlug);

  // Return 404 if the country is not recognized
  if (!country) {
    notFound();
  }

  // Breadcrumbs schema for SEO
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.inquisitivedigital.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://www.inquisitivedigital.com/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: serviceTitle,
        item: `https://www.inquisitivedigital.com/services/${serviceId}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: `${country.name}`,
        item: `https://www.inquisitivedigital.com/services/${serviceId}/${country.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <CountryHubClient
        serviceSlug={serviceId}
        serviceTitle={serviceTitle}
        country={country}
      />
    </>
  );
}
