import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { BrandsMarquee } from "@/components/sections/BrandsMarquee";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Metrics } from "@/components/sections/Metrics";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Services } from "@/components/sections/Services";
import { Deliverables } from "@/components/sections/Deliverables";
import { PainPoints } from "@/components/sections/PainPoints";
import { Process } from "@/components/sections/Process";
import { BookingSteps } from "@/components/sections/BookingSteps";
import { Industries } from "@/components/sections/Industries";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { Insights } from "@/components/sections/blogSection";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { TrustBar } from "@/components/ui/TrustBar";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in India | SEO, PPC & Social Media",
  description: "Looking for a top digital marketing agency in India? Inquisitive Digital delivers expert SEO, Google Ads, social media & performance marketing. 100+ brands scaled. Get a free consultation today!",
  alternates: {
    canonical: "https://www.inquisitivedigital.com/",
  },
  openGraph: {
    title: "Digital Marketing Agency in India | SEO, PPC & Social Media",
    description: "Looking for a top digital marketing agency in India? Inquisitive Digital delivers expert SEO, Google Ads, social media & performance marketing. 100+ brands scaled. Get a free consultation today!",
    url: "https://www.inquisitivedigital.com/",
  },
};

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.inquisitivedigital.com/#organization",
    "name": "Inquisitive Digital",
    "alternateName": "Inquisitive Digital Marketing Agency",
    "url": "https://www.inquisitivedigital.com",
    "logo": "https://www.inquisitivedigital.com/logo-3.png",
    "image": "https://www.inquisitivedigital.com/logo-3.png",
    "description": "Inquisitive Digital is a digital marketing agency in India offering SEO, AEO, GEO, Performance Marketing, Social Media Marketing, Web Development, Content Writing, and Graphic Design services.",
    "foundingDate": "2022",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Suite 001, H-36, Sector 63",
      "addressLocality": "Noida",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "201301",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7310-777-430",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": [
        "English",
        "Hindi"
      ]
    },
    "sameAs": [
      "https://www.instagram.com/inquisitivedigital",
      "https://www.linkedin.com/company/inquisitive-digital/"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.inquisitivedigital.com/#localbusiness",
    "name": "Inquisitive Digital",
    "image": "https://www.inquisitivedigital.com/logo-3.png",
    "url": "https://www.inquisitivedigital.com",
    "telephone": "+91-7310-777-430",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Suite 001, H-36, Sector 63",
      "addressLocality": "Noida",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "201301",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.6128",
      "longitude": "77.3768"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.instagram.com/inquisitivedigital",
      "https://www.linkedin.com/company/inquisitive-digital/"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.inquisitivedigital.com/#website",
    "url": "https://www.inquisitivedigital.com",
    "name": "Inquisitive Digital",
    "publisher": {
      "@id": "https://www.inquisitivedigital.com/#organization"
    },
    "inLanguage": "en-IN"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.inquisitivedigital.com/"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Header Navigation */}
      <Header />

      {/* Main Sections */}
      <main className="flex-grow flex flex-col w-full">
        {/* Hero Section */}
        <Hero />

        {/* Brands Marquee Section */}
        <BrandsMarquee />

        {/* Trust Strip / Social Proof Ribbon
        <TrustStrip /> */}

        {/* About the Agency & Stats Counter Section */}
        <Metrics />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Services Overview Section */}
        <Services />

        {/* Deliverables Checklist Section */}
        <Deliverables />

        {/* Pain Points Section */}
        <PainPoints />

        {/* Process Flow Section */}
        <Process />

        {/* Booking Steps Section */}
        <BookingSteps />

        {/* Industries We Serve Grid */}
        <Industries />

        {/* Case Studies / Portfolio Section */}
        {/* <CaseStudies /> */}

        {/* Client Testimonials Carousel/Grid */}
        <Testimonials />

        {/* Insights & Blog Preview Section */}
        <Insights />

        {/* Final Call to Action Section */}
        <CTA />

        {/* Frequently Asked Questions Section */}
        <FAQ />

      </main>


      {/* Interactive WhatsApp Floating Button */}
      <FloatingWhatsApp />

      {/* Floating Bottom Left Trust & Social Bar */}
      {/* <TrustBar /> */}

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </>
  );
}
