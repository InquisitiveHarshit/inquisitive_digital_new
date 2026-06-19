import { Metadata } from "next";
import { headers } from "next/headers";

type Props = {
  params: Promise<{ serviceId: string }> | { serviceId: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const serviceId = params.serviceId;

  try {
    // Dynamically derive the base URL from the incoming request headers.
    // This works on localhost AND on Hostinger/Vercel/any host without
    // needing NEXT_PUBLIC_APP_URL env variables.
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol =
      process.env.NODE_ENV === "production" ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/services/${serviceId}`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const { metaTitle, metaDescription, title, shortDescription } =
          json.data;
        const t = metaTitle || `${title} | Inquisitive Digital`;
        const d = metaDescription || shortDescription;

        return {
          title: t,
          description: d,
          openGraph: { title: t, description: d },
          twitter: { card: "summary_large_image", title: t, description: d },
        };
      }
    }
  } catch (error) {
    console.error("[generateMetadata] service error:", error);
  }

  return {
    title: "Service | Inquisitive Digital",
    description: "Explore our digital marketing services.",
  };
}

export default function ServiceDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
