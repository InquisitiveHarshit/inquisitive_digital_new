"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { BlogCard } from "../ui/BlogCard";

export const Insights: React.FC = () => {
  const articles = [
    {
      id: 1,
      slug: "seo-strategies-2026",
      date: "May 10, 2026",
      readTime: "5 min read",
      category: "SEO",
      title: "Top SEO Strategies for 2026: Dominating Search with AI",
      desc: "Learn how to optimize your content for both traditional search engines and emerging AI discovery platforms.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
      delay: 0.1,
    },
    {
      id: 2,
      slug: "maximizing-social-media-roi",
      date: "May 15, 2026",
      readTime: "7 min read",
      category: "PERFORMANCE MARKETING",
      title: "Maximizing Your Social Media ROI in a Crowded Market",
      desc: "Stop wasting ad spend. Here is a data-driven approach to targeting and converting your ideal audience.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      delay: 0.2,
    },
    {
      id: 3,
      slug: "the-power-of-brutalist-design",
      date: "May 20, 2026",
      readTime: "4 min read",
      category: "WEB DESIGN",
      title: "The Power of Brutalist Web Design in B2B SaaS",
      desc: "Why some of the fastest-growing startups are ditching safe, corporate designs for bold, brutalist aesthetics.",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80",
      delay: 0.3,
    },
  ];

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
          {articles.map((article) => (
            <div key={article.id}>
              <BlogCard
                slug={article.slug}
                date={article.date}
                readTime={article.readTime}
                category={article.category}
                title={article.title}
                desc={article.desc}
                image={article.image}
                delay={article.delay}
              />
            </div>
          ))}
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
