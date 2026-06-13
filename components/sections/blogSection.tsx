"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { BlogCard } from "../ui/BlogCard";

const API_BASE = "";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80",
];

export const Insights: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch(`${API_BASE}/api/blogs`, { cache: "no-store" });
        if (!res.ok) throw new Error("API unavailable");
        const json = await res.json();
        const blogsArray = json.data || json.blogs;
        if (blogsArray && blogsArray.length > 0) {
          setArticles(blogsArray.slice(0, 3));
        }
      } catch {
        // Silently fail if API is unavailable
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <section className="w-full py-section-gap px-6 md:px-margin-desktop bg-surface-container-low/30 border-b border-outline-variant/30" id="insights">
      <div className="max-w-container-max mx-auto">

        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-20">
          <div className="md:col-span-8">
            <motion.h2
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-on-surface uppercase tracking-tight mb-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              INSIGHTS <span className="text-brand-accent">& INTEL</span>
            </motion.h2>
            <motion.p
              className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Our perspective on growth engineering, performance marketing, and shifting digital search realities.
            </motion.p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {loading ? (
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl border-2 h-[420px] animate-pulse bg-surface-container-high border-outline-variant/30"
              />
            ))
          ) : articles.length > 0 ? (
            articles.map((article, index) => (
              <div key={article.id || article._id || index}>
                <BlogCard
                  slug={article.slug}
                  date={article.date}
                  readTime={article.readTime}
                  category={article.category}
                  title={article.title}
                  desc={article.excerpt}
                  image={article.imageUrl || FALLBACK_IMAGES[index % 3]}
                  delay={index * 0.1}
                />
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-10 text-on-surface-variant">
              No insights available at the moment.
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex justify-center mt-4">
          <Button href="/blogs" variant="outline" className="px-8 py-4">
            Visit Our Blog →
          </Button>
        </div>

      </div>
    </section>
  );
};
