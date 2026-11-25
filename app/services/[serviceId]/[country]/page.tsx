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
    `${country.headline || `${serviceTitle} in ${country.name}`} `;
  const pageDescription =
    country.seoDescription ||
    (country.description
      ? country.description
      : `Discover top-tier ${serviceTitle} across ${country.name}. Explore customized organic search campaigns for leading cities including ${country.cities.map((c) => c.name).slice(0, 3).join(", ")}.`);
  const canonicalUrl =
    country.canonicalUrl ||
    `https://www.inquisitivedigital.com/services/${serviceId}/${country.slug}`;

  const keywords = country.seoKeywords
    ? country.seoKeywords.split(",").map((k) => k.trim()).filter(Boolean)
    : undefined;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords,
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

  // WebPage schema
  const pageUrl =
    country.canonicalUrl ||
    `https://www.inquisitivedigital.com/services/${serviceId}/${country.slug}`;
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name:
      country.seoTitle ||
      country.headline ||
      `${serviceTitle} in ${country.name}`,
    description:
      country.seoDescription ||
      country.description ||
      `Discover top-tier ${serviceTitle} across ${country.name}.`,
    url: pageUrl,
    publisher: {
      "@type": "Organization",
      name: "Inquisitive Digital",
      url: "https://www.inquisitivedigital.com",
    },
  };

  // FAQPage schema — only when country has FAQs
  const faqSchema =
    country.faqs && country.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: country.faqs.map((faq: any) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer.replace(/<[^>]*>/g, ""),
            },
          })),
        }
      : null;

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
      {/* WebPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      {/* FAQPage JSON-LD — only rendered when the country has FAQs */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <CountryHubClient
        serviceSlug={serviceId}
        serviceTitle={serviceTitle}
        country={country}
      />
    </>
  );
}
