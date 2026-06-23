import React from "react";
import { notFound } from "next/navigation";
import BlogDetailClient from "./BlogDetailClient";
import connectDB from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import { blogs as staticBlogs, getBlogBySlug } from "../data";
import type { BlogPost } from "../data";

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  let blog: BlogPost | null = null;
  let allBlogs: BlogPost[] = staticBlogs;

  try {
    await connectDB();
    
    // Fetch the specific blog
    const dbBlog = await Blog.findOne({ slug, isActive: true }).lean();
    if (dbBlog) {
      blog = {
        id: (dbBlog as any)._id.toString(),
        slug: (dbBlog as any).slug,
        title: (dbBlog as any).title,
        excerpt: (dbBlog as any).excerpt,
        content: (dbBlog as any).content,
        imageUrl: (dbBlog as any).heroImage?.url || (dbBlog as any).heroImageUrl || (dbBlog as any).imageUrl,
        heroImageUrl: (dbBlog as any).heroImage?.url || (dbBlog as any).heroImageUrl || (dbBlog as any).imageUrl,
        heroImage: (dbBlog as any).heroImage,
        date: (dbBlog as any).createdAt 
          ? new Date((dbBlog as any).createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
          : "Recently",
        readTime: (dbBlog as any).readTime || "5 min read",
        category: (dbBlog as any).category || "Insight",
        sections: (dbBlog as any).sections || [],
        faqs: (dbBlog as any).faqs || [],
      } as BlogPost;
    } else {
      // Fallback to static blog
      const staticBlog = getBlogBySlug(slug);
      if (staticBlog) blog = staticBlog;
    }

    // Fetch all blogs for prev/next
    const fetchedBlogs = await Blog.find({ isActive: true })
      .select("slug title excerpt imageUrl heroImageUrl heroImage createdAt readTime category")
      .sort({ createdAt: -1 })
      .lean();

    if (fetchedBlogs && fetchedBlogs.length > 0) {
      allBlogs = fetchedBlogs.map((b: any) => ({
        id: b._id.toString(),
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        imageUrl: b.heroImage?.url || b.heroImageUrl || b.imageUrl,
        heroImageUrl: b.heroImage?.url || b.heroImageUrl || b.imageUrl,
        heroImage: b.heroImage,
        date: b.createdAt 
          ? new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
          : "Recently",
        readTime: b.readTime || "5 min read",
        category: b.category || "Insight",
      }));
    }
  } catch (error) {
    console.error("[BlogPostPage] Error fetching blog data:", error);
    // Fallback to static if DB fails
    const staticBlog = getBlogBySlug(slug);
    if (staticBlog) blog = staticBlog;
  }

  if (!blog) {
    notFound();
  }

  return <BlogDetailClient blog={JSON.parse(JSON.stringify(blog))} allBlogs={allBlogs} />;
}
