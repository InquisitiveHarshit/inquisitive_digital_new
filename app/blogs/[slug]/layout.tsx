import { Metadata } from "next";
import { headers } from "next/headers";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;

  try {
    const connectDB = (await import("@/lib/mongodb")).default;
    const Blog = (await import("@/lib/models/Blog")).default;

    await connectDB();
    const blog = await Blog.findOne({ slug: slug }).lean();

    if (blog) {
      const metaTitle = (blog as any).seoTitle;
      const title = (blog as any).title;
      const metaDescription = (blog as any).seoDescription;
      const excerpt = (blog as any).excerpt;

      const t = metaTitle || `${title} | Inquisitive Digital`;
      const d = metaDescription || excerpt || "Read our latest blog post.";
      const canonicalUrl = `https://www.inquisitivedigital.com/blogs/${slug}`;

      return {
        title: t,
        description: d,
        alternates: { canonical: canonicalUrl },
        openGraph: { title: t, description: d, url: canonicalUrl },
        twitter: { card: "summary_large_image", title: t, description: d },
      };
    }
  } catch (error) {
    console.error("[generateMetadata] blog error:", error);
  }

  return {
    title: "Blog | Inquisitive Digital",
    description: "Read our latest insights and articles.",
  };
}

export default function BlogDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
