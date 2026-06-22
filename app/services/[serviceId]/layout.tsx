import { Metadata } from "next";
import { headers } from "next/headers";

type Props = {
  params: Promise<{ serviceId: string }> | { serviceId: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const serviceId = params.serviceId;

  try {
    const connectDB = (await import("@/lib/mongodb")).default;
    const Service = (await import("@/lib/models/Service")).default;

    await connectDB();
    const service = await Service.findOne({ slug: serviceId }).lean();

    if (service) {
      const metaTitle = (service as any).metaTitle;
      const title = (service as any).title;
      const metaDescription = (service as any).metaDescription;
      const shortDescription = (service as any).shortDescription;

      const t = metaTitle || `${title} | Inquisitive Digital`;
      const d = metaDescription || shortDescription;
      const canonicalUrl = `https://www.inquisitivedigital.com/services/${serviceId}`;

      return {
        title: t,
        description: d,
        alternates: { canonical: canonicalUrl },
        openGraph: { title: t, description: d, url: canonicalUrl },
        twitter: { card: "summary_large_image", title: t, description: d },
      };
    }
  } catch (error) {
    console.error("[generateMetadata] service fetch failed:", error);
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
