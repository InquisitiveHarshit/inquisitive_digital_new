"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { useTheme } from "@/components/ThemeProvider";
import { BlogCard } from "@/components/ui/BlogCard";
import type { BlogPost } from "./data";
import { X } from "lucide-react";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80",
];

export default function BlogsClient({ initialBlogs }: { initialBlogs: BlogPost[] }) {
  const { themeMode } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read category from URL — single source of truth
  const activeCategory = searchParams.get("category") ?? "";

  const isLight = themeMode === "singular-light";
  const isDarkSingular = themeMode === "singular-dark";

  // Filter blogs based on URL param
  const filteredBlogs = useMemo(() => {
    if (!activeCategory) return initialBlogs;
    return initialBlogs.filter(
      (b) => b.category?.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [initialBlogs, activeCategory]);

  return (
    <>
      <Header />
      <main
        className={`flex-grow w-full pt-32 md:pt-40 pb-24 min-h-[80vh] transition-colors duration-500 overflow-hidden flex flex-col items-center justify-start ${
          isLight ? "bg-white" : isDarkSingular ? "bg-[#0a0a0a]" : "bg-[#0f0e0e]"
        }`}
      >
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop relative text-center mb-12">
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

          {/* Active filter badge — renders only when a category is active */}
          <AnimatePresence mode="wait">
            {activeCategory && (
              <motion.div
                key="filter-badge"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mt-6 flex items-center justify-center gap-2"
              >
                <span
                  className={`text-xs font-bold uppercase tracking-widest ${
                    isLight ? "text-slate-400" : "text-white/40"
                  }`}
                >
                  Filtered by:
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent text-slate-900 text-xs font-bold uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
                  {activeCategory}
                  <button
                    onClick={() => router.push("/blogs")}
                    aria-label="Clear filter"
                    className="ml-0.5 hover:opacity-70 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Blogs Grid */}
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop w-full">
          <AnimatePresence mode="wait">
            {filteredBlogs.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`text-center py-20 rounded-2xl border ${
                  isLight ? "border-slate-200 bg-slate-50" : "border-white/10 bg-white/5"
                }`}
              >
                <p
                  className={`text-lg font-bold mb-3 ${
                    isLight ? "text-slate-700" : "text-white"
                  }`}
                >
                  No blogs found in &quot;{activeCategory}&quot;
                </p>
                <button
                  onClick={() => router.push("/blogs")}
                  className="text-sm font-semibold text-brand-accent underline underline-offset-4 hover:opacity-80 transition-opacity"
                >
                  View All Blogs
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory || "all"}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredBlogs.map((blog, index) => (
                  <div key={blog.id || (blog as { _id?: string })._id || index} className="h-full">
                    <BlogCard
                      slug={blog.slug}
                      date={blog.date}
                      readTime={blog.readTime}
                      category={blog.category}
                      title={blog.title}
                      desc={blog.excerpt}
                      image={blog.imageUrl || FALLBACK_IMAGES[index % 3]}
                      delay={index * 0.07}
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <FloatingWhatsApp />
    </>
  );
}
