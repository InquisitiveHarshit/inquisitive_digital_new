import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CityPageClient from "./CityPageClient";
import { LocationCountryData, LocationCityData } from "@/lib/data/locations";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";

interface CityPageProps {
  params: Promise<{
    serviceId: string;
    country: string;
    slug: string;
  }>;
}

export const revalidate = 3600;

async function getServiceCountryAndCity(serviceId: string, countrySlug: string, citySlug: string) {
  let serviceTitle = "SEO Services";
  let country: LocationCountryData | undefined;
  let city: LocationCityData | undefined;

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
        country = dbLocations.find(
          (c) => c.slug.toLowerCase() === countrySlug.toLowerCase()
        );
        if (country) {
          city = country.cities.find(
            (ci) => ci.slug.toLowerCase() === citySlug.toLowerCase()
          );
        }
      }
    }
  } catch (err) {
    console.error("[CityPage] error fetching service:", err);
  }

  return { serviceTitle, country, city };
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { serviceId, country: countrySlug, slug: citySlug } = await params;
  const { serviceTitle, country, city } = await getServiceCountryAndCity(serviceId, countrySlug, citySlug);

  if (!country || !city) return { title: "Not Found | Inquisitive Digital" };

  const title = city.seoTitle || `${serviceTitle} in ${city.name}, ${country.name} | Inquisitive Digital`;
  const description = city.seoDescription || `Accelerate organic search performance in ${city.name} with top ${serviceTitle}. Local map pack optimization, technical audits, and high-conversion strategy.`;
  const canonicalUrl = `https://www.inquisitivedigital.com/services/${serviceId}/${country.slug}/${city.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { serviceId, country: countrySlug, slug: citySlug } = await params;
  const { serviceTitle, country, city } = await getServiceCountryAndCity(serviceId, countrySlug, citySlug);

  // Return 404 if either country or city is not recognized
  if (!country || !city) {
    notFound();
  }

  const otherCities = country.cities.filter((c) => c.slug !== city.slug);

  // ── JSON-LD Structured Data: BreadcrumbList + Service Schema + FAQPage ──────
  const breadcrumbSchema = {
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
        name: country.name,
        item: `https://www.inquisitivedigital.com/services/${serviceId}/${country.slug}`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: city.name,
        item: `https://www.inquisitivedigital.com/services/${serviceId}/${country.slug}/${city.slug}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${serviceTitle} in ${city.name}`,
    serviceType: serviceTitle,
    provider: {
      "@type": "Organization",
      name: "Inquisitive Digital",
      url: "https://www.inquisitivedigital.com",
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "Country",
        name: country.name,
      },
    },
    description: `Leading ${serviceTitle} customized for enterprises and local brands in ${city.name}.`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How long does it take to see SEO results in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `In competitive metropolitan markets like ${city.name}, high-intent keywords and Google Business Profile optimizations typically begin showing significant movement within 60 to 90 days.`,
        },
      },
      {
        "@type": "Question",
        name: `Why do I need a localized ${city.name} SEO strategy?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Search intent in ${city.name} is shaped by local competition, proximity signals, and regional authority factors that generic national campaigns fail to address.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CityPageClient
        serviceSlug={serviceId}
        serviceTitle={serviceTitle}
        country={country}
        city={city}
        otherCities={otherCities}
      />
    </>
  );
}
