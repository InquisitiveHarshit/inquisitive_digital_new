"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { Button } from "@/components/ui/Button";
import {
  Search,
  Share2,
  TrendingUp,
  Code,
  FileText,
  Award,
  Megaphone,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  HelpCircle,
} from "lucide-react";

interface ServiceFullDetail {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  detailedDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  deliverables: string[];
  ctaText: string;
  painPoints: string[];
  benefits: string[];
  faq: { q: string; a: string }[];
}

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params?.serviceId as string;

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

  const servicesData: Record<string, ServiceFullDetail> = {
    seo: {
      id: "seo",
      title: "SEO / AEO / GEO",
      category: "Search",
      shortDesc: "Rank higher on Google and AI search with advanced optimization strategies.",
      detailedDesc: "Our SEO campaigns focus on high-intent search terms that drive transactions. We optimize site architecture, build authority, and structure content to build permanent organic market share across search and AI engines.",
      icon: Search,
      deliverables: [
        "Advanced Intent Keyword Mapping & Clustering",
        "Core Web Vitals Optimization & Architecture audits",
        "High-Authority Editorial Backlink Acquisition",
        "AI Search Optimizations (Google Gemini, Perplexity, OpenAI)",
        "Structured Schema Markup & Semantic HTML Injection",
      ],
      ctaText: "Request Free SEO Audit",
      painPoints: [
        "Losing keyword rankings to faster, modernized competitor websites.",
        "High paid ads dependency with skyrocketing Customer Acquisition Costs (CAC).",
        "Invisible on AI-driven conversational searches (AEO/GEO).",
      ],
      benefits: [
        "Permanent monthly traffic growth that keeps compounding over time.",
        "High trust credibility with primary organic ranking badges.",
        "Optimized layout alignment scoring 100% on search engine audits.",
      ],
      faq: [
        {
          q: "What is AEO & GEO?",
          a: "Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) are methods to optimize your website so AI systems (like OpenAI Search, Perplexity, Google Gemini) choose your content as the absolute answer source.",
        },
        {
          q: "How long before we see SEO results?",
          a: "Technical fixes show immediate indexing boosts within weeks, while robust authority and ranking expansion generally mature in 3 to 6 months.",
        },
      ],
    },
    "social-media": {
      id: "social-media",
      title: "Social Media Marketing",
      category: "Organic",
      shortDesc: "Build brand awareness and engagement across all major platforms.",
      detailedDesc: "We create cohesive content strategies across platforms that turn casual followers into passionate brand evangelists and high-value customers.",
      icon: Share2,
      deliverables: [
        "Platform-Specific Visual Style & Content Systems",
        "Engaging Reels, Carousels & Video Scriptwriting",
        "Community Growth & Social Sentiment Monitoring",
        "Strategic Creator & Key Opinion Leader Partnerships",
        "Cross-Channel Brand Narrative Engineering",
      ],
      ctaText: "Scale My Socials",
      painPoints: [
        "Posting content consistently without generating actual business inquiries.",
        "Low organic reach and follower engagement due to algorithmic changes.",
        "Unprofessional or inconsistent brand designs across platforms.",
      ],
      benefits: [
        "High-fidelity custom graphic templates that make you stand out.",
        "A highly passionate community actively engaging with your products.",
        "Predictable organic lead channels generated directly through direct messages.",
      ],
      faq: [
        {
          q: "Which social platforms do you support?",
          a: "We actively scale channels on Instagram, LinkedIn, YouTube, Meta, and TikTok depending on where your target buyers exist.",
        },
        {
          q: "Do you handle custom video editing?",
          a: "Yes! We draft scripts, direct visual content formats, and edit short-form reels/shorts optimized for retention.",
        },
      ],
    },
    "performance-marketing": {
      id: "performance-marketing",
      title: "Performance Marketing",
      category: "Paid Ads",
      shortDesc: "Data-driven campaigns focused on ROI and measurable growth.",
      detailedDesc: "Using structured funnels, pixel tracking, and predictive analytics, we scale paid advertising across social and search platforms to achieve optimal CAC/ROAS.",
      icon: TrendingUp,
      deliverables: [
        "Multi-Platform Paid Advertising (Meta, Google, LinkedIn, TikTok)",
        "Advanced Pixel & Conversion API Integrations",
        "Continuous Ad Creative Variations & A/B Testing",
        "Landing Page Conversion Funnel Architectures",
        "Granular Audience Cohort Targeting & Retargeting",
      ],
      ctaText: "Launch Campaigns",
      painPoints: [
        "Wasting huge marketing budgets on clicks that never buy anything.",
        "Inability to accurately track return on ad spend (ROAS) and conversions.",
        "High ad fatigue causing campaign performance to die out after two weeks.",
      ],
      benefits: [
        "Full funnel setup targeting prospects at every decision stage.",
        "Continuous creative refreshes keeping click-through rates (CTR) high.",
        "Transparent live reporting metrics matching real backend CRM returns.",
      ],
      faq: [
        {
          q: "What is a good starting ad budget?",
          a: "We recommend a testing budget that allows for fast audience verification, which we scale upwards once target ROAS is satisfied.",
        },
        {
          q: "Do you build custom landing pages for ads?",
          a: "Absolutely. High-converting dedicated landing pages are built for all paid search and social campaigns to maximize lead capture.",
        },
      ],
    },
    "web-development": {
      id: "web-development",
      title: "Web Design & Development",
      category: "Web Tech",
      shortDesc: "Modern, responsive, and conversion-focused websites.",
      detailedDesc: "We build blazing-fast React and Next.js websites that pass Core Web Vitals with flying colors, offering an uncompromising experience that ranks higher.",
      icon: Code,
      deliverables: [
        "Custom Next.js & React Responsive Architecture",
        "100% Core Web Vitals Speed & Performance Focus",
        "Ultra-Premium UX/UI Custom Prototyping",
        "Secure CMS, API & CRM Pipeline integrations",
        "Modern SEO-Ready Clean Coding Practices",
      ],
      ctaText: "Build My Website",
      painPoints: [
        "Slow loading speeds causing high visitor bounce rates.",
        "Outdated designs that fail to convey professional brand authority.",
        "Clunky mobile responsive behaviors losing critical viewport customers.",
      ],
      benefits: [
        "Next.js server-side rendering for instant page transitions.",
        "Premium brutalist or clean theme options tailored to your identity.",
        "Interactive micro-animations keeping users active and engaged.",
      ],
      faq: [
        {
          q: "Why do you use Next.js instead of standard WordPress?",
          a: "Next.js websites load up to 10x faster, offer superior custom security, rank dramatically better on search engines, and avoid plugin bloat.",
        },
        {
          q: "Is the design responsive on all viewports?",
          a: "Yes, every container is meticulously engineered to fit mobile, tablet, and ultra-wide desktop monitors seamlessly.",
        },
      ],
    },
    "content-writing": {
      id: "content-writing",
      title: "Content Writing & Blogging",
      category: "Organic",
      shortDesc: "SEO-optimized content that attracts and converts users.",
      detailedDesc: "We draft industry-leading educational blog series, whitepapers, and copy that establishes your brand as a primary source of authoritative knowledge.",
      icon: FileText,
      deliverables: [
        "E-E-A-T Compliant Authoritative Copywriting",
        "Strategic Content Calendars & Topic Cluster Maps",
        "High-Value downloadable Whitepapers & Case Studies",
        "High-Performance Email Copywriting & Newsletters",
        "Natural Semantic Internal & External Linking Setup",
      ],
      ctaText: "Get Content Plan",
      painPoints: [
        "Generic AI articles that search engines penalize for low quality.",
        "High-effort blog writing that fails to capture organic intent.",
        "Inability to establish author credibility (E-E-A-T) on Google.",
      ],
      benefits: [
        "Expert-written, value-first articles that solve real user problems.",
        "Higher search crawl rates due to organized topic clusters.",
        "Premium downloadable resources that capture high-intent leads.",
      ],
      faq: [
        {
          q: "Do you write standard copywriting pages as well?",
          a: "Yes, we write high-impact landing page copy, pitch decks, whitepapers, and customer educational series.",
        },
        {
          q: "How do you ensure search engines trust the articles?",
          a: "We integrate comprehensive schema code, leverage human expert citations, and align structured headings matching real searches.",
        },
      ],
    },
    branding: {
      id: "branding",
      title: "Graphic Design & Branding",
      category: "Design",
      shortDesc: "Create a strong visual identity that stands out.",
      detailedDesc: "From custom typography and high-end design assets to unique market positioning, we construct premium visual ecosystems that demand attention.",
      icon: Award,
      deliverables: [
        "Premium Visual Guidelines & Identity Design",
        "Custom SVGs, Typography & Graphic Systems",
        "Multi-Channel Interactive Visual Design Templates",
        "High-End Marketing Collateral & Digital Product Assets",
        "Branding Asset Pack (Logos, Icons, Typography)",
      ],
      ctaText: "Design My Brand",
      painPoints: [
        "Brand style that looks cheap and fails to justify high ticket prices.",
        "Visual assets that appear disjointed across web and social channels.",
        "Generic typography failing to make your visual message memorable.",
      ],
      benefits: [
        "Unified brand styling books that keep visual assets completely consistent.",
        "Custom vectorized branding illustrations that scale infinitely.",
        "Unforgettable typographic pairings representing direct corporate authority.",
      ],
      faq: [
        {
          q: "What do we receive in the branding pack?",
          a: "You receive standard logo lockups, corporate color system maps, vector typography assets, social templates, and a brand style manual.",
        },
        {
          q: "Can we integrate this visual identity into our existing site?",
          a: "Absolutely, we coordinate templates directly to keep visual integration on your custom sites fluid.",
        },
      ],
    },
    "lead-gen": {
      id: "lead-gen",
      title: "Lead Generation",
      category: "Paid Ads",
      shortDesc: "Generate high-quality leads that convert into customers.",
      detailedDesc: "We build conversion paths, landing pages, and smart lead forms optimized for capture, bringing high-intent prospects straight to your pipeline.",
      icon: Megaphone,
      deliverables: [
        "High-Converting Lead Form Architecture & UX",
        "Automated CRM Lead Pipeline Routing Setup",
        "Lead Quality Scoring & Instant Verification Filters",
        "Custom Automated Follow-Up Sequence Integrations",
        "In-Depth Analytics Dashboards & Attribution Tracking",
      ],
      ctaText: "Acquire High-Value Leads",
      painPoints: [
        "Attracting low-quality leads that clog your sales team's schedule.",
        "High lead acquisition costs that make scaling paid budgets unprofitable.",
        "Slow response times causing warm prospects to go cold instantly.",
      ],
      benefits: [
        "Smart multi-step qualification filters to verify intent before booking.",
        "Automated instant dispatch systems sending leads to CRM pipelines.",
        "Highly precise channel tracking validating exactly where profits originate.",
      ],
      faq: [
        {
          q: "How do you filter out spam form submissions?",
          a: "We construct custom multi-step smart validation inputs, domain checks, and double-opt mechanisms to verify leads.",
        },
        {
          q: "Can this integrate with our current CRM?",
          a: "Yes, we build custom webhooks connecting lead data straight into HubSpot, Salesforce, Zoho, or active custom platforms.",
        },
      ],
    },
  };

  const service = servicesData[serviceId];

  // Fallback if the route is invalid
  if (!service) {
    return (
      <>
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center min-h-screen text-center px-6">
          <h2 className="font-display text-3xl font-black uppercase mb-4">Service Not Found</h2>
          <p className="font-body text-slate-500 mb-8 max-w-md">The request category does not exist in our systems.</p>
          <Button href="/services">View All Services</Button>
        </main>
        <Footer />
      </>
    );
  }

  const Icon = service.icon;
  const isLight = themeMode === "singular-light";
  const isDarkSingular = themeMode === "singular-dark";

  return (
    <>
      <Header />

      {/* Sticky Offer Bar */}
      <div className={`sticky top-[81px] md:top-[89px] z-40 w-full flex items-center justify-between px-6 md:px-margin-desktop py-3 border-b-2 transition-colors duration-300 ${
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
      </div>

      <main className={`flex-grow w-full pt-16 pb-24 transition-colors duration-500 overflow-hidden ${
        isLight ? "bg-white" : isDarkSingular ? "bg-[#0a0a0a]" : "bg-[#0f0e0e]"
      }`}>
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop relative">

          {/* Back button */}
          <div className="mb-10">
            <button
              onClick={() => router.push("/services")}
              className={`inline-flex items-center gap-2 font-display text-[10px] font-black uppercase tracking-wider transition-colors hover:text-brand-accent ${
                isLight ? "text-slate-500" : "text-slate-400"
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to all services
            </button>
          </div>

          {/* Hero Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 relative z-10">
            <div className="lg:col-span-8">
              <span className={`font-body text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                isLight 
                  ? "bg-slate-100 text-slate-600 border border-slate-200/40" 
                  : "bg-white/5 text-slate-400 border border-white/5"
              }`}>
                {service.category} Strategy
              </span>
              
              <h1 className={`font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight mt-4 mb-6 ${
                isLight ? "text-slate-900" : "text-white"
              }`}>
                {service.title} <span className="text-brand-accent">Solutions</span>
              </h1>
              
              <p className={`font-body text-base sm:text-lg leading-relaxed max-w-2xl ${
                isLight ? "text-slate-600" : "text-slate-400"
              }`}>
                {service.detailedDesc}
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-2xl flex items-center justify-center border-2 shadow-2xl ${
                isLight 
                  ? "bg-slate-50 border-slate-900/10 text-brand-accent shadow-slate-100" 
                  : "bg-[#141414] border-white/10 text-brand-accent shadow-black"
              }`}>
                <Icon className="w-12 h-12 sm:w-16 sm:h-16 stroke-[2]" />
              </div>
            </div>
          </div>

          {/* Grid Panel: Pain Points vs Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 relative z-10">
            
            {/* Pain Points Card */}
            <div className={`p-8 rounded-2xl border-2 ${
              isLight ? "bg-slate-50/60 border-slate-100" : "bg-[#141414]/30 border-white/5"
            }`}>
              <h3 className={`font-display text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 ${
                isLight ? "text-slate-800" : "text-slate-200"
              }`}>
                <XCircle className="w-4 h-4 text-red-500" /> Key Bottlenecks Solved
              </h3>
              
              <div className="space-y-4">
                {service.painPoints.map((point, index) => (
                  <p key={index} className={`font-body text-xs sm:text-sm font-medium ${
                    isLight ? "text-slate-600" : "text-slate-400"
                  }`}>
                    • {point}
                  </p>
                ))}
              </div>
            </div>

            {/* Benefits Card */}
            <div className={`p-8 rounded-2xl border-2 ${
              isLight ? "bg-slate-50/60 border-slate-100" : "bg-[#141414]/30 border-white/5"
            }`}>
              <h3 className={`font-display text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 ${
                isLight ? "text-slate-800" : "text-slate-200"
              }`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Revenue Advantages
              </h3>
              
              <div className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <p key={index} className={`font-body text-xs sm:text-sm font-medium ${
                    isLight ? "text-slate-600" : "text-slate-400"
                  }`}>
                    • {benefit}
                  </p>
                ))}
              </div>
            </div>

          </div>

          {/* Deliverables Board */}
          <div className={`p-8 sm:p-12 rounded-2xl border-2 mb-16 relative z-10 ${
            themeMode === "brutalist"
              ? "bg-[#111] border-black text-white shadow-[8px_8px_0px_rgba(0,0,0,1)]"
              : isLight
                ? "bg-slate-50 border-slate-900/10 shadow-slate-100/50 text-slate-800"
                : "bg-[#141414] border-white/10 shadow-black/60 text-white"
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-8 border-b border-outline-variant/10">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-brand-accent shrink-0" />
                <h2 className={`font-display text-xl sm:text-2xl font-black uppercase tracking-tight ${
                  isLight ? "text-slate-900" : "text-white"
                }`}>
                  Core Deliverables Timeline
                </h2>
              </div>
              
              <Button
                href="#contact"
                className="w-full sm:w-auto font-body font-extrabold text-[10px] sm:text-xs uppercase tracking-wider"
              >
                {service.ctaText} <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.deliverables.map((del, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-display font-black text-brand-accent">{idx + 1}</span>
                  </div>
                  <span className={`font-body text-xs sm:text-sm font-semibold leading-relaxed ${
                    isLight ? "text-slate-700" : "text-slate-300"
                  }`}>
                    {del}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Custom FAQs Section */}
          <div className="max-w-3xl mx-auto mb-16 relative z-10">
            <h3 className={`font-display text-xl font-black uppercase tracking-tight text-center mb-8 flex items-center justify-center gap-2.5 ${
              isLight ? "text-slate-900" : "text-white"
            }`}>
              <HelpCircle className="w-5 h-5 text-brand-accent" /> Frequently Asked Questions
            </h3>
            
            <div className="space-y-6">
              {service.faq.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-xl border ${
                    isLight ? "bg-slate-50/50 border-slate-100" : "bg-[#141414]/30 border-white/5"
                  }`}
                >
                  <h4 className={`font-display text-sm font-black uppercase tracking-wide mb-2.5 ${
                    isLight ? "text-slate-900" : "text-white"
                  }`}>
                    {item.q}
                  </h4>
                  <p className={`font-body text-xs sm:text-sm leading-relaxed ${
                    isLight ? "text-slate-500" : "text-slate-400"
                  }`}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Consultation Ribbon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`p-8 sm:p-12 rounded-3xl border text-center relative overflow-hidden transition-all duration-300 ${
              isLight 
                ? "bg-slate-50 border-slate-200/60 text-slate-900" 
                : "bg-surface-container-low border-white/10 text-white"
            }`}
          >
            <div className="absolute inset-0 bg-brand-accent/5 pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
                Let&apos;s build your dynamic strategy roadmap
              </h3>
              <p className={`font-body text-sm sm:text-base mb-8 max-w-lg mx-auto ${
                isLight ? "text-slate-600" : "text-slate-400"
              }`}>
                Book a direct growth workshop for {service.title}. We will audit your current channels and layout a high-performance roadmap completely free of charge.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="#contact" className="w-full sm:w-auto font-body font-extrabold uppercase text-xs">
                  Schedule Free Workshop
                </Button>
                <a
                  href="https://wa.me/918700049448"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full border-2 font-body text-xs font-extrabold uppercase tracking-wider transition-colors duration-300 ${
                    isLight 
                      ? "border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white" 
                      : "border-white text-white hover:bg-white hover:text-black"
                  }`}
                >
                  Quick Chat on WhatsApp
                </a>
              </div>

              {/* Social Proof Row */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-8 border-t border-outline-variant/10">
                <div className="flex -space-x-3">
                  {["JD", "MK", "AS"].map((initials, idx) => (
                    <div
                      key={idx}
                      className={`w-9 h-9 rounded-full flex items-center justify-center border-2 text-[10px] font-display font-black tracking-wider ${
                        isLight
                          ? "bg-slate-900 text-white border-white"
                          : "bg-[#111] text-brand-accent border-[#1c1b1b]"
                      }`}
                    >
                      {initials}
                    </div>
                  ))}
                </div>

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

                <span
                  className={`font-body text-xs font-bold uppercase tracking-wider ${
                    isLight ? "text-slate-600" : "text-slate-400"
                  }`}
                >
                  50+ brands scaled
                </span>
              </div>

            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
