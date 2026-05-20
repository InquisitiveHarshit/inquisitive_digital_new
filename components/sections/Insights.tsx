"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/Button";

interface Article {
  id: number;
  date: string;
  readTime: string;
  category: string;
  title: string;
  desc: string;
  delay: number;
}

export const Insights: React.FC = () => {
  const articles: Article[] = [
    {
      id: 1,
      date: "Jan 2026",
      readTime: "5 min read",
      category: "SEO",
      title: "How SEO is Changing in 2026: AEO & GEO Explained",
      desc: "Discover how AI-driven search, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO) are shifting the digital search landscape.",
      delay: 0.1,
    },
    {
      id: 2,
      date: "Feb 2026",
      readTime: "6 min read",
      category: "PAID ADS",
      title: "Google Ads vs Meta Ads: Which One is Better for Your Business?",
      desc: "A head-to-head comparison of high-intent search traffic vs interest-based visual discovery to find the best channel for your marketing budget.",
      delay: 0.2,
    },
    {
      id: 3,
      date: "March 2026",
      readTime: "4 min read",
      category: "LEAD GEN",
      title: "Top 10 Lead Generation Strategies That Actually Work",
      desc: "Cut through the noise with ten modern, battle-tested customer acquisition strategies and automation playbooks that generate high-intent prospects.",
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {articles.map((article) => (
            <motion.article
              key={article.id}
              className="border border-outline-variant/30 p-8 rounded-sm bg-gradient-to-br from-[#201f1f]/35 to-[#1c1b1b]/10 hover:border-brand-accent transition-colors duration-300 flex flex-col justify-between group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: article.delay }}
            >
              <div>
                {/* Meta Row */}
                <div className="flex flex-wrap justify-between items-center gap-2 mb-6 text-xs text-on-surface-variant">
                  <span className="font-display text-brand-accent uppercase tracking-widest font-bold">
                    {article.category}
                  </span>
                  <span className="whitespace-nowrap">
                    {article.date} • {article.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-on-surface uppercase mb-4 leading-snug tracking-tight group-hover:text-brand-accent transition-colors duration-300">
                  {article.title}
                </h3>

                {/* Short Desc */}
                <p className="font-body text-sm text-on-surface-variant group-hover:text-on-surface transition-colors duration-300 leading-relaxed mb-8">
                  {article.desc}
                </p>
              </div>

              {/* Action Indicator */}
              <div className="flex items-center gap-2 font-display text-[10px] text-on-surface uppercase tracking-widest font-bold group-hover:text-brand-accent transition-colors duration-300 pt-4 border-t border-outline-variant/20">
                Read Intel <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.article>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Button href="#contact" variant="outline" className="px-8 py-4">
            Visit Our Blog →
          </Button>
        </div>

      </div>
    </section>
  );
};
