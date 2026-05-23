"use client";

import React, { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { blogs, getBlogBySlug } from "../data";
import { ArrowLeft } from "lucide-react";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const [themeMode, setThemeMode] = useState<"brutalist" | "singular-light" | "singular-dark">("singular-light");

  const resolvedParams = use(params);
  const blog = getBlogBySlug(resolvedParams.slug);

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

  if (!blog) {
    notFound();
  }

  const isLight = themeMode === "singular-light";
  const isDarkSingular = themeMode === "singular-dark";

  return (
    <>
      <Header />
      <main className={`flex-grow w-full pt-32 md:pt-40 pb-24 transition-colors duration-500 overflow-hidden ${isLight ? "bg-white" : isDarkSingular ? "bg-[#0a0a0a]" : "bg-[#0f0e0e]"}`}>
        
        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-6 mb-8 relative z-20">
          <a
            href="/blogs"
            className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors py-2 px-4 rounded-full border ${
              isLight 
                ? "bg-slate-100 text-slate-600 border-slate-200 hover:text-brand-accent hover:border-brand-accent" 
                : "bg-white/5 text-slate-400 border-white/10 hover:text-brand-accent hover:border-brand-accent"
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Blogs
          </a>
        </div>

        {/* Blog Header */}
        <div className="max-w-4xl mx-auto px-6 relative mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${
                isLight ? "bg-slate-200 text-slate-700" : "bg-white/10 text-slate-300"
              }`}>
                {blog.category}
              </span>
              <span className={`text-xs font-medium ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                {blog.date} • {blog.readTime}
              </span>
            </div>
            
            <h1 className={`font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight mb-6 ${isLight ? "text-slate-900" : "text-white"}`}>
              {blog.title}
            </h1>
            
            <p className={`font-body text-xl leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              {blog.excerpt}
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <div className={`w-full h-px ${isLight ? "bg-slate-200" : "bg-outline-variant/30"}`} />
        </div>

        {/* Blog Content */}
        <div className="max-w-4xl mx-auto px-6">
          <motion.article 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`font-body text-lg leading-loose prose max-w-none ${
              isLight ? "prose-slate" : "prose-invert prose-p:text-slate-300 prose-headings:text-white prose-a:text-brand-accent"
            } prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:mb-6`}
          >
            {/* Simple markdown parsing simulation for the mock data */}
            {blog.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={index}>{paragraph.replace('## ', '')}</h2>;
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </motion.article>
        </div>

      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
