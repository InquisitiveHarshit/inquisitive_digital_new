"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Button } from "../ui/Button";

interface TestimonialItem {
  id: number;
  quote: string;
  author: string;
  role: string;
  stars: number;
}

export const Testimonials: React.FC = () => {
  const testimonials: TestimonialItem[] = [
    {
      id: 1,
      quote: "Working with this team completely transformed our online presence. Our website traffic increased by 3x and leads doubled within months.",
      author: "Rahul Mehta",
      role: "Founder, Tech Startup",
      stars: 5,
    },
    {
      id: 2,
      quote: "Their SEO and ad strategies are highly effective. We saw real ROI, not just impressions. Highly recommended!",
      author: "Priya Sharma",
      role: "Marketing Head, E-commerce Brand",
      stars: 5,
    },
    {
      id: 3,
      quote: "Professional, responsive, and results-driven. They truly understand business growth.",
      author: "Amit Verma",
      role: "CEO, Real Estate Firm",
      stars: 5,
    },
  ];

  return (
    <section className="w-full py-section-gap px-6 md:px-margin-desktop bg-[#161515] border-b border-outline-variant/30 relative overflow-hidden" id="testimonials">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-brand-accent/3 blur-[120px] pointer-events-none" />

      <div className="max-w-container-max mx-auto relative z-10">
        
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
              CLIENTS <span className="text-brand-accent">ON OUR IMPACT</span>
            </motion.h2>
            <motion.p
              className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Don't just take our word for it. Here is what business owners and founders say about our growth frameworks.
            </motion.p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              className="border border-outline-variant/20 p-8 rounded-sm bg-background relative flex flex-col justify-between hover:border-brand-accent transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Quote Mark Icon */}
              <div className="absolute top-6 right-8 text-outline-variant/10 group-hover:text-brand-accent/10 transition-colors duration-300">
                <Quote className="w-12 h-12 stroke-[1]" />
              </div>

              <div>
                {/* Stars */}
                <div className="flex gap-1 text-brand-accent mb-6 text-sm">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-body text-base text-on-surface leading-relaxed mb-8 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="border-t border-outline-variant/20 pt-6 mt-auto">
                <h4 className="font-display font-bold text-on-surface uppercase text-base tracking-wide mb-1">
                  {t.author}
                </h4>
                <p className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  {t.role}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Button href="#contact" variant="outline" className="px-8 py-4">
            View All Reviews →
          </Button>
        </div>

      </div>
    </section>
  );
};
