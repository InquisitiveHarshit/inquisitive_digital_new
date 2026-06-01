import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Inquisitive Digital",
  description: "Admin panel for managing blog posts.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Completely standalone layout — no site header, footer, or contact section
  return <>{children}</>;
}
