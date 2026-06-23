"use client";

import React from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { useTheme } from "@/components/ThemeProvider";
import { BlogCard } from "@/components/ui/BlogCard";
import type { BlogPost } from "./data";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80",
];

export default function BlogsClient({ initialBlogs }: { initialBlogs: BlogPost[] }) {
  const { themeMode } = useTheme();

  const isLight = themeMode === "singular-light";
  const isDarkSingular = themeMode === "singular-dark";

  return (
    <>
      <Header />
      <main
        className={`flex-grow w-full pt-32 md:pt-40 pb-24 min-h-[80vh] transition-colors duration-500 overflow-hidden flex flex-col items-center justify-start ${
          isLight ? "bg-white" : isDarkSingular ? "bg-[#0a0a0a]" : "bg-[#0f0e0e]"
        }`}
      >
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop relative text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight mb-6 ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            OUR <span className="text-brand-accent">BLOGS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-body text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${
              isLight ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Insights, strategies, and deep dives into the digital marketing landscape.
          </motion.p>
        </div>

        {/* Blogs Grid */}
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {initialBlogs.map((blog, index) => (
                <div key={blog.id || (blog as { _id?: string })._id || index} className="h-full">
                  <BlogCard
                    slug={blog.slug}
                    date={blog.date}
                    readTime={blog.readTime}
                    category={blog.category}
                    title={blog.title}
                    desc={blog.excerpt}
                    image={blog.imageUrl || FALLBACK_IMAGES[index % 3]}
                    delay={index * 0.1}
                  />
                </div>
              ))}
            </div>
        </div>
      </main>
      <FloatingWhatsApp />
    </>
  );
}
