"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { blogs } from "./data";

export default function BlogsPage() {
  const [themeMode, setThemeMode] = useState<"brutalist" | "singular-light" | "singular-dark">("singular-light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (document.body.classList.contains("singular-theme")) {
        setThemeMode("singular-light");
      } else if (document.body.classList.contains("singular-dark-theme")) {
        setThemeMode("singular-dark");
      }

      const handleThemeChange = (e: any) => {
        setThemeMode(e.detail);
      };

      window.addEventListener("theme-change" as any, handleThemeChange);
      return () => {
        window.removeEventListener("theme-change" as any, handleThemeChange);
      };
    }
  }, []);

  const isLight = themeMode === "singular-light";
  const isDarkSingular = themeMode === "singular-dark";

  return (
    <>
      <Header />
      <main className={`flex-grow w-full pt-32 md:pt-40 pb-24 min-h-[80vh] transition-colors duration-500 overflow-hidden flex flex-col items-center justify-start ${isLight ? "bg-white" : isDarkSingular ? "bg-[#0a0a0a]" : "bg-[#0f0e0e]"}`}>
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop relative text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight mb-6 ${isLight ? "text-slate-900" : "text-white"}`}
          >
            OUR <span className="text-brand-accent">BLOGS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-body text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${isLight ? "text-slate-600" : "text-slate-400"}`}
          >
            Insights, strategies, and deep dives into the digital marketing landscape.
          </motion.p>
        </div>

        {/* Blogs Grid */}
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.a
                href={`/blogs/${blog.slug}`}
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group flex flex-col border-2 rounded-2xl p-6 transition-all duration-300 ${
                  isLight
                    ? "border-slate-200 bg-slate-50 hover:border-slate-400 hover:-translate-y-1 shadow-sm"
                    : "border-white/10 bg-surface hover:border-white/20 hover:-translate-y-1 shadow-black/40"
                }`}
                style={{
                  boxShadow: isLight ? "4px 4px 0px 0px rgba(0,0,0,0.05)" : "4px 4px 0px 0px #f5c200"
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    isLight ? "bg-slate-200 text-slate-700" : "bg-white/10 text-slate-300"
                  }`}>
                    {blog.category}
                  </span>
                  <span className={`text-[10px] font-medium ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                    {blog.readTime}
                  </span>
                </div>
                <h3 className={`font-display text-xl font-bold uppercase tracking-tight mb-3 transition-colors ${
                  isLight ? "text-slate-900 group-hover:text-brand-accent" : "text-white group-hover:text-brand-accent"
                }`}>
                  {blog.title}
                </h3>
                <p className={`font-body text-sm leading-relaxed mb-6 flex-grow ${
                  isLight ? "text-slate-600" : "text-on-surface-variant"
                }`}>
                  {blog.excerpt}
                </p>
                <div className="mt-auto border-t border-outline-variant/30 pt-4 flex items-center justify-between">
                  <span className={`text-xs font-medium ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                    {blog.date}
                  </span>
                  <span className="text-brand-accent font-bold text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    Read More →
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
