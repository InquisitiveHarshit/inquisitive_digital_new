"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";

import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/components/ThemeProvider";
import {
  Search,
  Share2,
  TrendingUp,
  Code,
  FileText,
  Award,
  Megaphone,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  detailedDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  ctaText: string;
}

export default function ServicesPage() {
  const { themeMode } = useTheme();

  const services: ServiceDetail[] = [
    {
      id: "seo",
      title: "SEO / AEO / GEO",
      category: "Search",
      shortDesc: "Rank higher on Google and AI search with advanced optimization strategies.",
      detailedDesc: "Our SEO campaigns focus on high-intent search terms that drive transactions. We optimize site architecture, build authority, and structure content to build permanent organic market share across search and AI engines.",
      icon: Search,
      ctaText: "Request Free SEO Audit",
    },
    {
      id: "social-media",
      title: "Social Media Marketing",
      category: "Organic",
      shortDesc: "Build brand awareness and engagement across all major platforms.",
      detailedDesc: "We create cohesive content strategies across platforms that turn casual followers into passionate brand evangelists and high-value customers.",
      icon: Share2,
      ctaText: "Scale My Socials",
    },
    {
      id: "performance-marketing",
      title: "Performance Marketing",
      category: "Paid Ads",
      shortDesc: "Data-driven campaigns focused on ROI and measurable growth.",
      detailedDesc: "Using structured funnels, pixel tracking, and predictive analytics, we scale paid advertising across social and search platforms to achieve optimal CAC/ROAS.",
      icon: TrendingUp,
      ctaText: "Launch Campaigns",
    },
    {
      id: "web-development",
      title: "Web Design & Development",
      category: "Web Tech",
      shortDesc: "Modern, responsive, and conversion-focused websites.",
      detailedDesc: "We build blazing-fast React and Next.js websites that pass Core Web Vitals with flying colors, offering an uncompromising experience that ranks higher.",
      icon: Code,
      ctaText: "Build My Website",
    },
    {
      id: "content-writing",
      title: "Content Writing & Blogging",
      category: "Organic",
      shortDesc: "SEO-optimized content that attracts and converts users.",
      detailedDesc: "We draft industry-leading educational blog series, whitepapers, and copy that establishes your brand as a primary source of authoritative knowledge.",
      icon: FileText,
      ctaText: "Get Content Plan",
    },
    {
      id: "branding",
      title: "Graphic Design & Branding",
      category: "Design",
      shortDesc: "Create a strong visual identity that stands out.",
      detailedDesc: "From custom typography and high-end design assets to unique market positioning, we construct premium visual ecosystems that demand attention.",
      icon: Award,
      ctaText: "Design My Brand",
    },
    {
      id: "lead-gen",
      title: "Lead Generation",
      category: "Paid Ads",
      shortDesc: "Generate high-quality leads that convert into customers.",
      detailedDesc: "We build conversion paths, landing pages, and smart lead forms optimized for capture, bringing high-intent prospects straight to your pipeline.",
      icon: Megaphone,
      ctaText: "Acquire High-Value Leads",
    },
  ];

  const isLight = themeMode === "singular-light";
  const isDarkSingular = themeMode === "singular-dark";

  return (
    <>
      <Header />

      {/* Sticky Offer Bar */}
      {/* <div className={`sticky top-[81px] md:top-[89px] z-40 w-full flex items-center justify-between px-6 md:px-margin-desktop py-3 border-b-2 transition-colors duration-300 ${
        themeMode === "brutalist"
          ? "bg-[#f5c200] border-black text-black"
          : isLight 
            ? "bg-slate-50 border-slate-200 text-slate-900" 
            : "bg-[#141414] border-white/10 text-white"
      }`}>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full animate-pulse ${
            themeMode === "brutalist" ? "bg-black" : "bg-brand-accent"
          }`} />
          <span className="font-body text-xs md:text-sm font-extrabold uppercase tracking-wider">
            Free strategy call — 30 min
          </span>
        </div>
        <a
          href="#contact"
          className={`inline-flex items-center justify-center font-body font-black uppercase tracking-wider text-[10px] md:text-xs py-1.5 px-4 rounded-full border-2 transition-all duration-300 hover:scale-[1.02] ${
            themeMode === "brutalist"
              ? "bg-black text-[#f5c200] border-black hover:bg-white hover:text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              : isLight
                ? "bg-brand-accent text-black border-black hover:bg-black hover:text-brand-accent hover:border-black"
                : "bg-brand-accent text-black border-brand-accent hover:bg-white hover:text-black hover:border-white"
          }`}
        >
          Book Now
        </a>
      </div> */}

      <main className={`flex-grow w-full pt-36 md:pt-40 pb-24 transition-colors duration-500 overflow-hidden ${isLight ? "bg-white" : isDarkSingular ? "bg-[#0a0a0a]" : "bg-[#0f0e0e]"
        }`}>
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop relative">

          {/* Decorative Background Glows */}
          <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />

          {/* Page Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
            {/* <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-accent/25 bg-brand-accent/5 text-brand-accent text-xs font-body font-bold uppercase tracking-wider mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Engineered Solutions
            </motion.div> */}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight mb-6 ${isLight ? "text-slate-900" : "text-white"
                }`}
            >
              SERVICES <span className="text-brand-accent">THAT DRIVE</span> REVENUE
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`font-body text-base sm:text-lg leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"
                }`}
            >
              We don&apos;t build generic vanity metrics. We construct robust conversion ecosystems tailored to deliver absolute growth for ambitious brands.
            </motion.p>

            {/* Horizontal Trust Bar */}
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-8">
              {[
                "No lock-in contracts",
                "Free onboarding audit",
                "Dedicated manager",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-body font-bold transition-all duration-300 ${isLight
                    ? "bg-slate-50/60 border-slate-100 text-slate-700 shadow-sm"
                    : "bg-[#141414]/40 border-white/5 text-slate-300"
                    }`}
                >
                  <svg
                    className="w-4 h-4 text-emerald-500 shrink-0 stroke-[3.5]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Grid Layout Container */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className={`group relative border-2 p-6 rounded-2xl bg-background cursor-pointer block transition-all duration-300 ${isLight
                    ? "border-slate-900/10 hover:border-slate-800 shadow-slate-100/50 hover:shadow-slate-200/50"
                    : "border-white/10 hover:border-white/20 shadow-black/40"
                    }`}
                  style={{
                    boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.05)"
                  }}
                >
                  {/* Card Header Details */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className={`font-body text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${isLight
                      ? "bg-slate-100 text-slate-600 border border-slate-200/40"
                      : "bg-white/5 text-slate-400 border border-white/5"
                      }`}>
                      {service.category}
                    </span>

                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300 group-hover:scale-110 ${isLight
                      ? "bg-slate-50 border-slate-200 text-brand-accent"
                      : "bg-[#141414] border-white/10 text-brand-accent"
                      }`}>
                      <Icon className="w-4 h-4 stroke-[2]" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`font-display text-lg font-black uppercase tracking-tight mb-2 transition-colors group-hover:text-brand-accent ${isLight ? "text-slate-900" : "text-white"
                    }`}>
                    {service.title}
                  </h3>

                  {/* Short description */}
                  <p className={`font-body text-xs sm:text-sm leading-relaxed mb-6 ${isLight ? "text-slate-500" : "text-slate-400"
                    }`}>
                    {service.shortDesc}
                  </p>

                  {/* Explore Link */}
                  <div className="flex items-center text-[10px] font-display font-black uppercase tracking-widest text-brand-accent mt-auto group-hover:translate-x-1 transition-transform">
                    Explore Solution <ArrowRight className="w-3 h-3 ml-2" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Quick Consultation Ribbon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`mt-24 p-8 sm:p-12 rounded-3xl border text-center relative overflow-hidden transition-all duration-300 ${isLight
              ? "bg-slate-50 border-slate-200/60 text-slate-900"
              : "bg-surface-container-low border-white/10 text-white"
              }`}
          >
            <div className="absolute inset-0 bg-brand-accent/5 pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
                Not sure which service is right?
              </h3>
              <p className={`font-body text-sm sm:text-base mb-8 max-w-lg mx-auto ${isLight ? "text-slate-600" : "text-slate-400"
                }`}>
                Book a direct growth workshop. We will audit your current channels and layout a high-performance roadmap completely free of charge.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="#contact" className="w-full sm:w-auto font-body font-extrabold uppercase text-xs">
                  Schedule Free Workshop
                </Button>
                <a
                  href="https://wa.me/918700049448"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full border-2 font-body text-xs font-extrabold uppercase tracking-wider transition-colors duration-300 ${isLight
                    ? "border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-black"
                    }`}
                >
                  Quick Chat on WhatsApp
                </a>
              </div>

              {/* Social Proof Row */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-8 border-t border-outline-variant/10">
                {/* Avatars */}
                <div className="flex -space-x-3">
                  {["JD", "MK", "AS"].map((initials, idx) => (
                    <div
                      key={idx}
                      className={`w-9 h-9 rounded-full flex items-center justify-center border-2 text-[10px] font-display font-black tracking-wider ${isLight
                        ? "bg-slate-900 text-white border-white"
                        : "bg-[#111] text-brand-accent border-[#1c1b1b]"
                        }`}
                    >
                      {initials}
                    </div>
                  ))}
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-brand-accent fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Text */}
                <span
                  className={`font-body text-xs font-bold uppercase tracking-wider ${isLight ? "text-slate-600" : "text-slate-400"
                    }`}
                >
                  50+ brands scaled
                </span>
              </div>

            </div>
          </motion.div>

        </div>
      </main>

      <FloatingWhatsApp />
    </>
  );
}
