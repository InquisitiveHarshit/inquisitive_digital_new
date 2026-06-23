import React from "react";
import BlogsClient from "./BlogsClient";
import connectDB from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import { blogs as staticBlogs } from "./data";
import type { BlogPost } from "./data";

export const revalidate = 3600; // Revalidate every hour

export default async function BlogsPage() {
  let initialBlogs: BlogPost[] = staticBlogs;

  try {
    await connectDB();
    const fetchedBlogs = await Blog.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();

    if (fetchedBlogs && fetchedBlogs.length > 0) {
      initialBlogs = fetchedBlogs.map((b: any) => ({
        id: b._id.toString(),
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
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
    console.error("[BlogsPage] Error fetching blogs:", error);
  }

  return <BlogsClient initialBlogs={initialBlogs} />;
}
