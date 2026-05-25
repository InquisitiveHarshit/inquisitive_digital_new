"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  TrendingDown,
  Target,
  Shield,
  Clock,
  BarChart3,
  Zap,
  AlertTriangle,
  Mail,
  User,
  Globe,
  Search,
  Share2,
  TrendingUp,
  Code,
  FileText,
  Award,
  Megaphone,
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

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", website: "", challenge: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.website) {
      setFormSubmitted(true);
    }
  };

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const toggleFaq = (index: number) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  if (!service) {
    return (
      <div className="w-full bg-background text-on-surface font-body overflow-x-hidden antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
          <h2 className="font-display text-2xl font-extrabold uppercase mb-4 text-brand-accent">Service Not Found</h2>
          <p className="font-body text-on-surface-variant mb-6 max-w-sm">The requested category does not exist in our systems.</p>
          <button onClick={() => router.push("/services")} className="bg-surface-container-high text-on-surface hover:bg-brand-accent hover:text-background px-6 py-3 rounded-full font-display text-sm font-bold uppercase tracking-wider transition-colors duration-300 border border-outline-variant">
            View All Services
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = service.icon;
  const painPointIcons = [TrendingDown, AlertTriangle, Clock];

  return (
    <div className="w-full bg-background text-on-surface font-body selection:bg-brand-accent selection:text-background overflow-x-hidden antialiased relative">
      <Header />

      {/* Soft Background Orbs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-brand-accent/20 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-surface-container-high blur-[100px]"></div>
      </div>

      {/* SECTION 1 — HERO (Minimal & Tight) */}
      <section className="relative min-h-[65vh] flex flex-col justify-center items-center text-center pt-28 pb-12 px-6 md:px-margin-desktop overflow-hidden">
        <div className="w-full absolute top-28 left-0 px-6 md:px-margin-desktop flex justify-start z-20">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={() => router.push("/services")}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors text-on-surface-variant hover:text-brand-accent bg-surface-container-low px-3 py-3 rounded-full border border-outline-variant shadow-sm"
          >
            <ArrowRight className="w-3 h-3 rotate-180" />
          </motion.button>
        </div>

        <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-on-surface tracking-tight leading-[1.1] mb-5"
          >
            {service.title.split(" ").slice(0, -1).join(" ")} <span className="text-brand-accent">{service.title.split(" ").slice(-1)}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
            className="font-body text-on-surface-variant text-lg sm:text-xl font-normal leading-relaxed max-w-2xl mb-8"
          >
            {service.shortDesc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center"
          >
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center font-display font-bold uppercase tracking-wider text-background bg-brand-accent px-6 py-3 rounded-full text-xs sm:text-sm transition-all duration-300 hover:shadow-[0_8px_20px_rgb(245,194,0,0.3)] hover:-translate-y-0.5"
            >
              {service.ctaText}
            </a>
            <a
              href="#approach"
              className="inline-flex items-center justify-center font-display font-bold uppercase tracking-wider text-on-surface bg-surface-container-low border border-outline-variant px-6 py-3 rounded-full text-xs sm:text-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-container-high hover:shadow-sm"
            >
              Explore Approach
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — WHAT WE ACTUALLY DO */}
      <section id="approach" className="py-12 px-4 md:px-margin-desktop relative">
        <div className="max-w-container-max mx-auto relative z-10 bg-surface-container-low rounded-3xl p-6 md:p-10 border border-outline-variant shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-10">
            <div className="lg:col-span-5 lg:sticky lg:top-8">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-3 py-1 rounded-full bg-background border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-4"
              >
                The Approach
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.1] text-on-surface"
              >
                How We Make Growth Predictable
              </motion.h2>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-xl sm:text-2xl font-bold leading-relaxed text-on-surface"
              >
                {service.detailedDesc}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-body text-base font-normal leading-relaxed text-on-surface-variant opacity-90"
              >
                Most agencies focus strictly on front-end metrics to validate their value. We don't. At Inquisitive Digital, {service.title.toLowerCase()} is treated as a strict system engineering challenge. We eliminate variables by combining predictive models, server-side data, and meticulous direct-response frameworks. This allows us to spot fatigue before it kills your momentum and extract maximum yield from every resource deployed.
              </motion.p>
            </div>
          </div>

          <div className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "No Vanity Metrics", desc: "We optimize for cash revenue, not generic engagement." },
                { title: "Full Funnel Ownership", desc: "From strategic assets to high-converting user paths." },
                { title: "Transparent Reporting", desc: "Direct live attribution dashboard and zero fluff." }
              ].map((pill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                  className="flex flex-col gap-3 bg-background rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md border border-outline-variant"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent font-display border border-outline-variant">
                    <span className="font-bold text-base">0{i + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-on-surface tracking-wide">{pill.title}</h4>
                    <p className="font-body text-xs text-on-surface-variant mt-1.5 opacity-90 leading-relaxed">{pill.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — OUR PROCESS */}
      <section className="py-12 px-4 md:px-margin-desktop relative">
        <div className="max-w-container-max mx-auto relative z-10">
          <div className="text-center mb-10">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm"
            >
              THE PACE APPROACH
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface"
            >
              Our 4-Stage PACE Approach
            </motion.h2>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {[
                {
                  title: "PREPARE",
                  subtitle: "DISCOVER | MODEL",
                  desc: "Understand the business and its revenue funnel."
                },
                {
                  title: "ACT",
                  subtitle: "PLAN | EXECUTE",
                  desc: "Identify opportunities and attack leverage points within that funnel."
                },
                {
                  title: "CALIBRATE",
                  subtitle: "MEASURE | ADAPT",
                  desc: "Make necessary course corrections to further align actions with the desired results."
                },
                {
                  title: "EVOLVE",
                  subtitle: "ITERATE | OPTIMIZE",
                  desc: "Constantly measure, adapt, and improve results at each identified lever in the funnel."
                }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, ease: "easeOut" }}
                  className="flex flex-col items-center text-center bg-surface-container-low p-6 rounded-2xl border border-outline-variant hover:bg-surface-container-high transition-colors duration-300 shadow-sm hover:shadow-md"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg mb-4 transition-colors duration-300 bg-background border border-outline-variant shadow-sm ${idx === 0 || idx === 3 ? 'text-brand-accent bg-brand-accent/5' : 'text-on-surface-variant'}`}>
                    0{idx + 1}
                  </div>
                  <h3 className="font-display text-base font-bold text-on-surface tracking-wide mb-1">{step.title}</h3>
                  <div className="text-[9px] font-display font-extrabold uppercase tracking-wider text-brand-accent mb-3">
                    {step.subtitle}
                  </div>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed opacity-90">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHAT'S INCLUDED */}
      <section className="py-12 px-4 md:px-margin-desktop relative">
        <div className="max-w-container-max mx-auto relative z-10 bg-surface-container-low rounded-3xl p-6 md:p-10 border border-outline-variant shadow-sm">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 rounded-full bg-background border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm"
            >
              WHAT YOU GET
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface"
            >
              Complete Deliverables
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {service.deliverables.map((deliverable, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                className="flex items-start gap-4 bg-background p-5 rounded-2xl cursor-default transition-all duration-300 hover:shadow-sm border border-outline-variant"
              >
                <div className="w-8 h-8 rounded-full bg-surface-container-low border border-outline-variant flex items-center justify-center text-brand-accent flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-on-surface tracking-wide mb-1">{deliverable}</h4>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed opacity-90">
                    Engineered to align directly with your overall growth trajectory.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-accent/5 p-6 lg:p-8 rounded-2xl border border-brand-accent/20 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center text-brand-accent flex-shrink-0 shadow-sm border border-outline-variant">
                <Shield className="w-6 h-6" />
              </div>
              <p className="font-body font-medium text-sm md:text-base leading-relaxed text-on-surface max-w-xl">
                Every single engagement includes full transparent reporting, a dedicated lead point of contact, and 30-day post-launch deployment support.
              </p>
            </div>
            <a
              href="#lead-form"
              className="flex-shrink-0 w-full md:w-auto font-display font-bold uppercase tracking-wider text-background bg-brand-accent px-6 py-3 rounded-full text-xs sm:text-sm transition-all duration-300 hover:shadow-[0_8px_20px_rgb(245,194,0,0.3)] hover:-translate-y-0.5 text-center"
            >
              Secure My Setup
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — RESULTS STRIP */}
      <section className="py-12 px-4 md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { val: "312%", label: "Net Sales Expansion", sub: "For lifestyle brand" },
              { val: "4.8x", label: "Sustained Client ROI", sub: "Across Q3 deployments" },
              { val: "-64%", label: "Decrease in CAC", sub: "Within 60 days" },
              { val: "₹25Cr+", label: "Margin Generated", sub: "Bottom-line pipeline" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-surface-container-low rounded-2xl p-6 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1 border border-outline-variant hover:shadow-sm"
              >
                <span className="block font-display text-3xl lg:text-4xl font-extrabold text-brand-accent tracking-tight mb-2">{stat.val}</span>
                <span className="font-body text-on-surface-variant text-[10px] uppercase tracking-widest font-bold">{stat.label}</span>
                <span className="font-body text-[10px] font-normal text-on-surface-variant opacity-80 block mt-3">{stat.sub}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="font-display text-xl sm:text-2xl font-medium text-on-surface leading-snug mb-6 opacity-90">
              "Inquisitive Digital stopped the guessing games. They restructured our entire setup and developed optimized custom funnels in under two weeks."
            </p>
            <div className="inline-flex flex-col items-center bg-surface-container-low border border-outline-variant px-5 py-2.5 rounded-full shadow-sm">
              <span className="block font-display font-bold text-on-surface text-xs tracking-wide">Vikram Mehta</span>
              <span className="font-body text-on-surface-variant text-[9px] uppercase tracking-widest font-semibold mt-0.5 opacity-90">CMO, Zenith Luxury Goods</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6 — THE COST OF NOT ACTING */}
      <section className="py-12 px-4 md:px-margin-desktop relative">
        <div className="max-w-container-max mx-auto relative z-10 bg-surface-container-low rounded-3xl p-6 md:p-10 border border-outline-variant shadow-sm">
          <div className="text-center mb-10">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 rounded-full bg-background border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm"
            >
              WHAT INACTION COSTS YOU
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface"
            >
              The Price of Stagnation
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {service.painPoints.map((point, index) => {
              const DynamicIcon = painPointIcons[index % painPointIcons.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, ease: "easeOut" }}
                  className="bg-background p-6 rounded-2xl border border-outline-variant transition-transform duration-300 hover:-translate-y-1 hover:shadow-sm text-center flex flex-col items-center shadow-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-surface-container-low border border-outline-variant flex items-center justify-center text-on-surface mb-4 shadow-sm">
                    <DynamicIcon className="w-5 h-5 opacity-80 text-brand-accent" />
                  </div>
                  <h3 className="font-display text-base font-bold tracking-wide text-on-surface mb-3">{point}</h3>
                  <p className="font-body text-xs font-normal text-on-surface-variant leading-relaxed opacity-90">
                    Every day spent running unoptimized campaigns allows your closest competitors to lock down crucial real estate and audiences.
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7 — INLINE LEAD FORM */}
      <section id="lead-form" className="py-12 px-4 md:px-margin-desktop relative">
        <div className="max-w-container-max mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-brand-accent/5 rounded-3xl p-6 md:p-10 border border-brand-accent/20">
            <div className="lg:col-span-6 flex flex-col items-start">
              <motion.span
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block px-3 py-1 rounded-full bg-background border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm"
              >
                FREE TELEMETRY REPORT
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface leading-tight mb-8"
              >
                Ready to Stop Guessing and Start Growing?
              </motion.h2>

              <div className="space-y-4">
                {service.benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4 bg-background p-4 rounded-2xl border border-outline-variant shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-surface-container-low border border-outline-variant flex items-center justify-center text-brand-accent flex-shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-on-surface text-base mb-0.5">{benefit}</h4>
                      <p className="font-body font-normal text-xs text-on-surface-variant opacity-90">Our senior engineers map out exactly how this will impact your bottom line.</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-6 w-full"
            >
              <div className="bg-background rounded-2xl p-6 md:p-8 shadow-xl shadow-brand-accent/5 border border-outline-variant">
                {!formSubmitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <h3 className="font-display text-on-surface text-lg font-extrabold tracking-wide mb-6 text-center">
                      Request System Audit
                    </h3>

                    <div className="space-y-1.5">
                      <div className="relative">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant opacity-70" />
                        <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" className="w-full bg-surface-container-low border border-outline-variant rounded-full px-12 py-3 text-xs font-body text-on-surface placeholder-on-surface-variant/70 focus:border-brand-accent/50 focus:bg-background focus:ring-4 focus:ring-brand-accent/10 focus:outline-none transition-all duration-300" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant opacity-70" />
                        <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="Business Email" className="w-full bg-surface-container-low border border-outline-variant rounded-full px-12 py-3 text-xs font-body text-on-surface placeholder-on-surface-variant/70 focus:border-brand-accent/50 focus:bg-background focus:ring-4 focus:ring-brand-accent/10 focus:outline-none transition-all duration-300" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="relative">
                        <Globe className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant opacity-70" />
                        <input type="url" name="website" required value={formData.website} onChange={handleInputChange} placeholder="Website URL" className="w-full bg-surface-container-low border border-outline-variant rounded-full px-12 py-3 text-xs font-body text-on-surface placeholder-on-surface-variant/70 focus:border-brand-accent/50 focus:bg-background focus:ring-4 focus:ring-brand-accent/10 focus:outline-none transition-all duration-300" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <textarea name="challenge" rows={3} value={formData.challenge} onChange={handleInputChange} placeholder="What's your biggest growth challenge?" className="w-full bg-surface-container-low border border-outline-variant rounded-2xl px-5 py-3 text-xs font-body text-on-surface placeholder-on-surface-variant/70 focus:border-brand-accent/50 focus:bg-background focus:ring-4 focus:ring-brand-accent/10 focus:outline-none transition-all duration-300 resize-none"></textarea>
                    </div>

                    <button type="submit" className="w-full bg-brand-accent text-background font-display font-bold text-xs uppercase tracking-wider py-3 rounded-full transition-all duration-300 hover:shadow-[0_8px_20px_rgb(245,194,0,0.3)] hover:-translate-y-0.5 mt-2">
                      GET MY FREE AUDIT →
                    </button>
                  </form>
                ) : (
                  <div className="py-8 px-4 text-center space-y-4">
                    <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent mx-auto mb-4 shadow-inner border border-brand-accent/20">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <h3 className="font-display text-on-surface text-2xl font-extrabold tracking-tight">Audit Initiated</h3>
                    <p className="font-body text-xs font-normal text-on-surface-variant leading-relaxed max-w-sm mx-auto">
                      Thank you, <span className="text-on-surface font-bold">{formData.fullName}</span>. Our engineers are analyzing <span className="text-brand-accent font-bold">{formData.website}</span>.
                      Your custom video breakdown will be delivered to <span className="text-on-surface font-bold">{formData.email}</span> within 48 hours.
                    </p>
                    <div className="pt-4">
                      <button onClick={() => { setFormSubmitted(false); setFormData({ fullName: "", email: "", website: "", challenge: "" }) }} className="font-display text-[10px] font-bold text-brand-accent uppercase tracking-widest hover:underline bg-surface-container-low border border-outline-variant px-4 py-1.5 rounded-full shadow-sm">Submit another</button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FAQ */}
      <section className="py-12 px-4 md:px-margin-desktop relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm"
            >
              COMMON QUESTIONS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface"
            >
              Frequently Asked Questions
            </motion.h2>
          </div>

          <div className="space-y-3">
            {service.faq.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-surface-container-low rounded-2xl transition-all duration-300 overflow-hidden border ${isOpen ? 'border-brand-accent shadow-sm' : 'border-outline-variant hover:border-outline-variant/80'}`}
                >
                  <button onClick={() => toggleFaq(index)} className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none">
                    <span className="font-display font-bold text-sm sm:text-base text-on-surface pr-4">{faq.q}</span>
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 border ${isOpen ? 'bg-brand-accent text-background border-brand-accent' : 'bg-background text-on-surface-variant border-outline-variant'}`}>
                      {isOpen ? <ChevronUp className="w-4 h-4 stroke-[2.5]" /> : <ChevronDown className="w-4 h-4 stroke-[2.5]" />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-6 font-body font-normal text-xs md:text-sm text-on-surface-variant leading-relaxed opacity-90">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
