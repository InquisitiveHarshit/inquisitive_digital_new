"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
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
  Palette,
  Loader2,
} from "lucide-react";
import { BlogCard } from "@/components/ui/BlogCard";
import { blogs } from "@/app/blogs/data";

// Maps icon string from MongoDB to Lucide component
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  Share2,
  TrendingUp,
  Code,
  FileText,
  Palette,
};

// ─── TypeScript interfaces for the MongoDB service document ───────────────────

interface StatItem      { value: string; label: string; source?: string }
interface BenefitItem   { title: string; desc: string }
interface ServiceItem   { title: string; desc: string }
interface PillItem      { title: string; desc: string }
interface ProcessStep   { number: string; title: string; desc: string }
interface WhyUsItem     { title: string; desc: string }
interface OutcomeItem   { title: string; desc: string }
interface PainPoint     { title: string; desc: string }
interface LeadBenefit   { title: string; desc: string }
interface FaqItem       { q: string; a: string }

interface SubSection {
  tag: string;
  heading: string;
  subheading: string;
  description: string;
  services: string[];
}

interface ServiceData {
  _id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  ctaText: string;
  deliverables: string[];
  painPoints: string[];
  benefits: string[];
  faq: FaqItem[];

  heroSection?: { ctaText1?: string; ctaText2?: string };

  statsSection?: {
    tag: string;
    heading: string;
    stats: StatItem[];
  };

  whatIsSection?: {
    tag: string;
    heading: string;
    description: string;
    secondaryDescription: string;
  };

  whyMattersSection?: {
    tag: string;
    heading: string;
    intro: string;
    benefits: BenefitItem[];
  };

  servicesSection?: {
    tag: string;
    heading: string;
    services: ServiceItem[];
    aeo?: SubSection;
    geo?: SubSection;
    seoContent?: SubSection;
    thoughtLeadership?: SubSection;
    branding?: SubSection;
    marketingCreative?: SubSection;
    motionGraphics?: SubSection;
  };

  approachSection?: {
    tag?: string;
    heading?: string;
    mainDescription?: string;
    secondaryDescription?: string;
    pills?: PillItem[];
  };

  deliverablesSection?: {
    tag?: string;
    heading?: string;
    items?: string[];
    itemSubtext?: string;
    guaranteeText?: string;
    guaranteeCtaText?: string;
  };

  processSection?: {
    tag: string;
    heading: string;
    steps: ProcessStep[];
  };

  whyUsSection?: {
    tag: string;
    heading: string;
    items: WhyUsItem[];
  };

  resultsSection?: {
    tag: string;
    heading: string;
    description: string;
    outcomes: OutcomeItem[];
  };

  inactionSection?: {
    tag?: string;
    heading?: string;
    painPoints?: PainPoint[];
  };

  leadFormSection?: {
    tag?: string;
    heading?: string;
    benefits?: LeadBenefit[];
  };
}

// ─────────────────────────────────────────────────────────────────────────────

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params?.serviceId as string;

  // Service data fetched from MongoDB
  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!serviceId) return;
    async function fetchService() {
      try {
        const res = await fetch(`/api/services/${serviceId}`);
        const json = await res.json();
        if (json.success && json.data) {
          setService(json.data);
          // Scroll to top after data is loaded and rendered
          setTimeout(() => window.scrollTo(0, 0), 10);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchService();
  }, [serviceId]);

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

  // Loading state
  if (loading) {
    return (
      <div className="w-full bg-background text-on-surface font-body overflow-x-hidden antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-brand-accent" />
        </main>
      </div>
    );
  }

  // Not found state
  if (notFound || !service) {
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
      </div>
    );
  }

  // Resolve the icon from the string stored in MongoDB
  const Icon = ICON_MAP[service.icon] ?? Search;
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
            {service.shortDescription}
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
              {service.heroSection?.ctaText1 ?? service.ctaText}
            </a>
            <a
              href="#approach"
              className="inline-flex items-center justify-center font-display font-bold uppercase tracking-wider text-on-surface bg-surface-container-low border border-outline-variant px-6 py-3 rounded-full text-xs sm:text-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-container-high hover:shadow-sm"
            >
              {service.heroSection?.ctaText2 ?? "Explore Approach"}
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECTION 1.1 — STATS */}
      {service.statsSection && (
        <section className="py-12 px-4 md:px-margin-desktop relative">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-10">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm"
              >
                {service.statsSection.tag}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface"
              >
                {service.statsSection.heading}
              </motion.h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.statsSection.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-surface-container-low border border-outline-variant rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-sm"
                >
                  <span className="font-display text-5xl md:text-7xl font-extrabold text-brand-accent mb-4 tracking-tighter">
                    {stat.value}
                  </span>
                  <span className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed max-w-sm">
                    {stat.label}
                  </span>
                  {stat.source && (
                    <span className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant opacity-60 mt-4 font-bold">
                      Source: {stat.source}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 1.2 — WHAT IS */}
      {service.whatIsSection && (
        <section className="py-12 px-4 md:px-margin-desktop relative">
          <div className="max-w-container-max mx-auto relative z-10 bg-brand-accent/5 rounded-3xl p-6 md:p-10 border border-brand-accent/20 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block px-3 py-1 rounded-full bg-background border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-4 shadow-sm"
                >
                  {service.whatIsSection.tag}
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.1] text-on-surface"
                >
                  {service.whatIsSection.heading}
                </motion.h2>
              </div>
              <div className="lg:col-span-7 space-y-6">
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-display text-xl sm:text-2xl font-bold leading-relaxed text-on-surface"
                >
                  {service.whatIsSection.description}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="font-body text-base font-normal leading-relaxed text-on-surface-variant opacity-90"
                >
                  {service.whatIsSection.secondaryDescription}
                </motion.p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 1.3 — WHY IT MATTERS */}
      {service.whyMattersSection && (
        <section className="py-12 px-4 md:px-margin-desktop relative">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-10 max-w-3xl mx-auto">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm"
              >
                {service.whyMattersSection.tag}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface mb-6"
              >
                {service.whyMattersSection.heading}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-body text-base font-normal leading-relaxed text-on-surface-variant opacity-90"
              >
                {service.whyMattersSection.intro}
              </motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.whyMattersSection.benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-background border border-outline-variant flex items-center justify-center text-brand-accent mb-4 shadow-sm">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h3 className="font-display text-base font-bold text-on-surface mb-2">{benefit.title}</h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed opacity-90">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 1.4 — SERVICES SECTION */}
      {service.servicesSection && (
        <section className="py-12 px-4 md:px-margin-desktop relative">
          <div className="max-w-container-max mx-auto relative z-10 bg-surface-container-low rounded-3xl p-6 md:p-10 border border-outline-variant shadow-sm">
            <div className="text-center mb-10 max-w-3xl mx-auto">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-3 py-1 rounded-full bg-background border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm"
              >
                {service.servicesSection.tag}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface mb-6"
              >
                {service.servicesSection.heading}
              </motion.h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              {service.servicesSection.services.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-background p-6 rounded-2xl border border-outline-variant flex flex-col shadow-sm"
                >
                  <h4 className="font-display font-bold text-lg text-on-surface mb-3 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent border border-brand-accent/20 flex-shrink-0">
                      <Target className="w-4 h-4" />
                    </span>
                    {item.title}
                  </h4>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed opacity-90 pl-11">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* AEO and GEO Nested Sections */}
            {(service.servicesSection.aeo || service.servicesSection.geo) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-outline-variant/50">
                {service.servicesSection.aeo && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-background p-6 lg:p-8 rounded-3xl border border-outline-variant shadow-sm relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-bl-full -z-10" />
                    <span className="inline-block px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm">
                      {service.servicesSection.aeo.tag}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-extrabold text-on-surface mb-2">{service.servicesSection.aeo.heading}</h3>
                    <h4 className="font-display text-sm font-bold text-brand-accent mb-4">{service.servicesSection.aeo.subheading}</h4>
                    <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
                      {service.servicesSection.aeo.description}
                    </p>
                    <ul className="space-y-3">
                      {service.servicesSection.aeo.services.map((li, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                          <span className="font-body text-xs text-on-surface font-medium">{li}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {service.servicesSection.geo && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-brand-accent/5 p-6 lg:p-8 rounded-3xl border border-brand-accent/20 shadow-sm relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-background/50 rounded-bl-full -z-10" />
                    <span className="inline-block px-3 py-1 rounded-full bg-background border border-brand-accent/20 text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm">
                      {service.servicesSection.geo.tag}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-extrabold text-on-surface mb-2">{service.servicesSection.geo.heading}</h3>
                    <h4 className="font-display text-sm font-bold text-brand-accent mb-4">{service.servicesSection.geo.subheading}</h4>
                    <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
                      {service.servicesSection.geo.description}
                    </p>
                    <ul className="space-y-3">
                      {service.servicesSection.geo.services.map((li, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                          <span className="font-body text-xs text-on-surface font-medium">{li}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            )}

            {/* Content Marketing Sub-Sections: SEO Content + Thought Leadership */}
            {(service.servicesSection.seoContent || service.servicesSection.thoughtLeadership) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-outline-variant/50">
                {[service.servicesSection.seoContent, service.servicesSection.thoughtLeadership]
                  .filter(Boolean)
                  .map((sub, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className={`p-6 lg:p-8 rounded-3xl border shadow-sm relative overflow-hidden ${
                        idx === 0
                          ? "bg-background border-outline-variant"
                          : "bg-brand-accent/5 border-brand-accent/20"
                      }`}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-bl-full -z-10" />
                      <span className="inline-block px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm">
                        {sub!.tag}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-extrabold text-on-surface mb-2">{sub!.heading}</h3>
                      <h4 className="font-display text-sm font-bold text-brand-accent mb-4">{sub!.subheading}</h4>
                      <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">{sub!.description}</p>
                      <ul className="space-y-3">
                        {sub!.services.map((li, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                            <span className="font-body text-xs text-on-surface font-medium">{li}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
              </div>
            )}

            {/* Creative Services Sub-Sections: Branding + Marketing Creative + Motion Graphics */}
            {(service.servicesSection.branding || service.servicesSection.marketingCreative || service.servicesSection.motionGraphics) && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-outline-variant/50">
                {[service.servicesSection.branding, service.servicesSection.marketingCreative, service.servicesSection.motionGraphics]
                  .filter(Boolean)
                  .map((sub, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className={`p-6 rounded-3xl border shadow-sm relative overflow-hidden ${
                        idx === 1
                          ? "bg-brand-accent/5 border-brand-accent/20"
                          : "bg-background border-outline-variant"
                      }`}
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-bl-full -z-10" />
                      <span className="inline-block px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm">
                        {sub!.tag}
                      </span>
                      <h3 className="font-display text-lg sm:text-xl font-extrabold text-on-surface mb-2">{sub!.heading}</h3>
                      <h4 className="font-display text-xs font-bold text-brand-accent mb-4">{sub!.subheading}</h4>
                      <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-5">{sub!.description}</p>
                      <ul className="space-y-2.5">
                        {sub!.services.map((li, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                            <span className="font-body text-xs text-on-surface font-medium">{li}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
              </div>
            )}
          </div>
        </section>
      )}

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
                {service.approachSection?.tag ?? "The Approach"}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.1] text-on-surface"
              >
                {service.approachSection?.heading ?? "How We Make Growth Predictable"}
              </motion.h2>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-xl sm:text-2xl font-bold leading-relaxed text-on-surface"
              >
                {service.approachSection?.mainDescription ?? service.description}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-body text-base font-normal leading-relaxed text-on-surface-variant opacity-90"
              >
                {service.approachSection?.secondaryDescription ?? `Most agencies focus strictly on front-end metrics to validate their value. We don't. At Inquisitive Digital, ${service.title.toLowerCase()} is treated as a strict system engineering challenge. We eliminate variables by combining predictive models, server-side data, and meticulous direct-response frameworks. This allows us to spot fatigue before it kills your momentum and extract maximum yield from every resource deployed.`}
              </motion.p>
            </div>
          </div>

          <div className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(service.approachSection?.pills ?? [
                { title: "No Vanity Metrics", desc: "We optimize for cash revenue, not generic engagement." },
                { title: "Full Funnel Ownership", desc: "From strategic assets to high-converting user paths." },
                { title: "Transparent Reporting", desc: "Direct live attribution dashboard and zero fluff." }
              ]).map((pill, i) => (
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
      {service.processSection && (
        <section className="py-12 px-4 md:px-margin-desktop relative">
          <div className="max-w-container-max mx-auto relative z-10">
            <div className="text-center mb-10">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm"
              >
                {service.processSection.tag}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface"
              >
                {service.processSection.heading}
              </motion.h2>
            </div>

            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {service.processSection.steps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, ease: "easeOut" }}
                    className="flex flex-col items-center text-center bg-surface-container-low p-6 rounded-2xl border border-outline-variant hover:bg-surface-container-high transition-colors duration-300 shadow-sm hover:shadow-md"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg mb-4 transition-colors duration-300 bg-background border border-outline-variant shadow-sm ${idx === 0 || idx === service.processSection!.steps.length - 1 ? 'text-brand-accent bg-brand-accent/5' : 'text-on-surface-variant'}`}>
                      {step.number}
                    </div>
                    <h3 className="font-display text-base font-bold text-on-surface tracking-wide mb-1">{step.title}</h3>
                    <p className="font-body text-xs text-on-surface-variant leading-relaxed opacity-90">
                      {step.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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
              {service.deliverablesSection?.tag ?? "WHAT YOU GET"}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface"
            >
              {service.deliverablesSection?.heading ?? "Complete Deliverables"}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {(service.deliverablesSection?.items ?? service.deliverables).map((deliverable, index) => (
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
                    {service.deliverablesSection?.itemSubtext ?? "Engineered to align directly with your overall growth trajectory."}
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
                {service.deliverablesSection?.guaranteeText ?? "Every single engagement includes full transparent reporting, a dedicated lead point of contact, and 30-day post-launch deployment support."}
              </p>
            </div>
            <a
              href="#lead-form"
              className="flex-shrink-0 w-full md:w-auto font-display font-bold uppercase tracking-wider text-background bg-brand-accent px-6 py-3 rounded-full text-xs sm:text-sm transition-all duration-300 hover:shadow-[0_8px_20px_rgb(245,194,0,0.3)] hover:-translate-y-0.5 text-center"
            >
              {service.deliverablesSection?.guaranteeCtaText ?? "Secure My Setup"}
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4.1 — PROCESS SECTION */}
      {service.processSection && (
        <section className="py-12 px-4 md:px-margin-desktop relative">
          <div className="max-w-container-max mx-auto relative z-10">
            <div className="text-center mb-10">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm"
              >
                {service.processSection.tag}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface"
              >
                {service.processSection.heading}
              </motion.h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {service.processSection.steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, ease: "easeOut" }}
                  className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant hover:bg-surface-container-high transition-colors shadow-sm flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg mb-4 text-brand-accent bg-brand-accent/10 border border-brand-accent/20">
                    {step.number}
                  </div>
                  <h3 className="font-display text-base font-bold text-on-surface mb-2">{step.title}</h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed opacity-90">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4.2 — WHY US SECTION */}
      {service.whyUsSection && (
        <section className="py-12 px-4 md:px-margin-desktop relative">
          <div className="max-w-container-max mx-auto relative z-10 bg-brand-accent/5 rounded-3xl p-6 md:p-10 border border-brand-accent/20 shadow-sm">
            <div className="text-center mb-10">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-3 py-1 rounded-full bg-background border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm"
              >
                {service.whyUsSection.tag}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface"
              >
                {service.whyUsSection.heading}
              </motion.h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.whyUsSection.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-background p-6 rounded-2xl border border-outline-variant shadow-sm"
                >
                  <h3 className="font-display text-base font-bold text-on-surface mb-2 flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-accent flex-shrink-0" />
                    {item.title}
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed opacity-90 pl-6">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4.3 — DYNAMIC RESULTS SECTION */}
      {service.resultsSection ? (
        <section className="py-12 px-4 md:px-margin-desktop relative">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-10 max-w-3xl mx-auto">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-3 shadow-sm"
              >
                {service.resultsSection.tag}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface mb-4"
              >
                {service.resultsSection.heading}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-body text-base font-normal leading-relaxed text-on-surface-variant opacity-90"
              >
                {service.resultsSection.description}
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {service.resultsSection.outcomes.map((outcome, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-surface-container-low rounded-2xl p-6 flex flex-col transition-transform duration-300 hover:-translate-y-1 border border-outline-variant shadow-sm"
                >
                  <h3 className="font-display font-bold text-sm text-brand-accent uppercase tracking-wide mb-2">{outcome.title}</h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed opacity-90">{outcome.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : (
      /* SECTION 5 — RESULTS STRIP (Fallback) */
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
      )}

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
              {service.inactionSection?.tag ?? "WHAT INACTION COSTS YOU"}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface"
            >
              {service.inactionSection?.heading ?? "The Price of Stagnation"}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {(service.inactionSection?.painPoints
              ? service.inactionSection.painPoints.map((p, index) => {
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
                      <h3 className="font-display text-base font-bold tracking-wide text-on-surface mb-3">{p.title}</h3>
                      <p className="font-body text-xs font-normal text-on-surface-variant leading-relaxed opacity-90">{p.desc}</p>
                    </motion.div>
                  );
                })
              : service.painPoints.map((point, index) => {
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
                })
            )}
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
                {service.leadFormSection?.tag ?? "FREE TELEMETRY REPORT"}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface leading-tight mb-8"
              >
                {service.leadFormSection?.heading ?? "Ready to Stop Guessing and Start Growing?"}
              </motion.h2>

              <div className="space-y-4">
                {(service.leadFormSection?.benefits
                  ? service.leadFormSection.benefits.map((b, idx) => (
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
                          <h4 className="font-display font-bold text-on-surface text-base mb-0.5">{b.title}</h4>
                          <p className="font-body font-normal text-xs text-on-surface-variant opacity-90">{b.desc}</p>
                        </div>
                      </motion.div>
                    ))
                  : service.benefits.map((benefit, idx) => (
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
                    ))
                )}
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

      {/* SECTION 9 — RELATED INSIGHTS */}
      <section className="py-12 px-4 md:px-margin-desktop relative border-t border-outline-variant/30">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface mb-4"
            >
              Related <span className="text-brand-accent">Insights</span>
            </motion.h2>
            <p className="font-body text-on-surface-variant max-w-2xl mx-auto">
              Explore our latest strategies and playbooks to accelerate your growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.slice(0, 3).map((blog, index) => (
              <div key={blog.id}>
                <BlogCard
                  slug={blog.slug}
                  date={blog.date}
                  readTime={blog.readTime}
                  category={blog.category}
                  title={blog.title}
                  desc={blog.excerpt}
                  image={blog.imageUrl || [
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80"
                  ][index % 3]}
                  delay={0.1 * (index + 1)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FloatingWhatsApp />
    </div>
  );
}
