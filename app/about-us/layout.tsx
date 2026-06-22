import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Inquisitive Digital | Data-Driven Digital Marketing Agency",
  description: "Learn about Inquisitive Digital — a performance-focused digital marketing agency with 4+ years of excellence, 100+ happy clients & 500+ projects completed. We engineer growth through strategy, data, and creativity.",
  alternates: { canonical: "https://www.inquisitivedigital.com/about-us" },
  openGraph: {
    title: "About Inquisitive Digital | Data-Driven Digital Marketing Agency",
    description: "Learn about Inquisitive Digital — a performance-focused digital marketing agency with 4+ years of excellence, 100+ happy clients & 500+ projects completed. We engineer growth through strategy, data, and creativity.",
    url: "https://www.inquisitivedigital.com/about-us",
  },
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
