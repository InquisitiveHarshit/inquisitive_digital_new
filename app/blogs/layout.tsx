import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing Blog | SEO Tips, Marketing Insights | Inquisitive Digital",
  description: "Stay ahead with expert digital marketing insights from Inquisitive Digital. Explore our blog for actionable SEO tips, performance marketing strategies, social media trends, and industry updates to grow your business.",
  openGraph: {
    title: "Digital Marketing Blog | SEO Tips, Marketing Insights | Inquisitive Digital",
    description: "Stay ahead with expert digital marketing insights from Inquisitive Digital. Explore our blog for actionable SEO tips, performance marketing strategies, social media trends, and industry updates to grow your business.",
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
