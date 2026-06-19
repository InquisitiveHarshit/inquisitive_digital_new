import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing Services | SEO, PPC, Social Media & More | Inquisitive Digital",
  description: "Explore full-suite digital marketing services by Inquisitive Digital — SEO, paid ads, social media marketing, content creation, web development & creative services. Tailored strategies for measurable business growth.",
  alternates: { canonical: "https://inquisitivedigital.com/services" },
  openGraph: {
    title: "Digital Marketing Services | SEO, PPC, Social Media & More | Inquisitive Digital",
    description: "Explore full-suite digital marketing services by Inquisitive Digital — SEO, paid ads, social media marketing, content creation, web development & creative services. Tailored strategies for measurable business growth.",
    url: "https://inquisitivedigital.com/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
