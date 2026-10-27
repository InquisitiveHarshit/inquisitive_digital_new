"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { useTheme } from "@/components/ThemeProvider";
import {
  MapPin,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Target,
  Shield,
  Clock,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Globe,
  Share2,
  Calendar,
  User,
  Sparkles,
  Mail,
  Check,
} from "lucide-react";
import { LocationCityData, LocationCountryData } from "@/lib/data/locations";

interface CityPageClientProps {
  serviceSlug: string;
  serviceTitle: string;
  country: LocationCountryData;
  city: LocationCityData;
  otherCities: LocationCityData[];
}

export default function CityPageClient({
  serviceSlug,
  serviceTitle,
  country,
  city,
  otherCities,
}: CityPageClientProps) {
  const { themeMode } = useTheme();
  const isLight = themeMode === "singular-light";
  const isDarkSingular = themeMode === "singular-dark";

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const toggleFaq = (idx: number) =>
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    website: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.website) return;
    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("name", formData.fullName);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("website", formData.website);
      payload.append(
        "message",
        `[City Service Page: ${city.name}, ${country.name}] ` + formData.message
      );

      const res = await fetch("/api/audit", {
        method: "POST",
        body: payload,
      });

      if (!res.ok) throw new Error("Failed to submit audit request");
      setFormSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const localFaqs =
    city.faqs && city.faqs.length > 0
      ? city.faqs.map((f) => ({ q: f.question, a: f.answer }))
      : [
        {
          q: `How long does it take to see SEO results in ${city.name}?`,
          a: `In competitive metropolitan markets like ${city.name}, high-intent long-tail keywords and Google Business Profile optimizations typically begin showing significant movement within 60 to 90 days. High-volume head terms usually require 4 to 6 months of persistent technical fixes, localized citations, and authoritative link acquisition.`,
        },
        {
          q: `Why do I need a localized ${city.name} SEO strategy instead of general national SEO?`,
          a: `Search algorithms weight geo-proximity, local citation consistency (NAP), and local relevance signals heavily for searchers within ${city.name}. A generic national campaign misses hyper-local landing page context, Google 3-Pack signals, and borough/suburb-specific intent.`,
        },
        {
          q: `Do you provide Google Maps / Local 3-Pack optimization in ${city.name}?`,
          a: `Yes. We handle end-to-end Google Business Profile optimization, local citation building across industry directories, review generation strategy, and geo-tagged schema markup tailored to ${city.name}.`,
        },
        {
          q: `Can you target multi-location businesses across ${country.name}?`,
          a: `Absolutely. We architect scalable programmatic and hierarchical page structures so each regional hub ranks independently without competing with your main service pages.`,
        },
      ];

  return (
    <>
      <Header />

      <main
        className={`overflow-x-hidden transition-colors duration-500 ${isLight ? "bg-white" : isDarkSingular ? "bg-[#0a0a0a]" : "bg-[#0f0e0e]"
          }`}
        style={{ minHeight: "100vh" }}
      >
        {/* ── BLOG-STYLE EDITORIAL HERO HEADER ──────────────────────────── */}
        <header
          className="pt-36 sm:pt-40 pb-12 w-full text-center relative overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(245, 194, 0, 0.16) 0%, rgba(245, 194, 0, 0.04) 50%, transparent 100%)",
          }}
        >
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            {/* Category / Location Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-brand-accent">
                {serviceTitle}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent opacity-60" />
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-on-surface-variant flex items-center gap-1">
                <span>{country.flag}</span>
                <span>{city.name}, {country.name}</span>
              </span>
            </motion.div>

            {/* Main Editorial H1 Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className={`text-3xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-display font-black uppercase tracking-tight mb-8 break-words ${isLight ? "text-slate-900" : "text-white"
                }`}
            >
              {city.headline ? (
                <span>{city.headline}</span>
              ) : (
                <>
                  {serviceTitle} in <span className="text-brand-accent">{city.name}</span>
                </>
              )}
            </motion.h1>

            {/* Author / Metadata Row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`flex items-center justify-center gap-4 text-xs sm:text-sm font-semibold flex-wrap ${isLight ? "text-slate-500" : "text-white/60"
                }`}
            >
              <span className={`font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
                By Inquisitive Digital Search Team
              </span>
              <span className="w-1 h-1 rounded-full bg-brand-accent opacity-50" />
              <span>Verified Market Guide</span>
              <span className="w-1 h-1 rounded-full bg-brand-accent opacity-50" />
              <span>7 min read</span>
              <span className="w-1 h-1 rounded-full bg-brand-accent opacity-50" />
              <span className="text-brand-accent">{country.name} Regional Desk</span>
            </motion.div>
          </div>
        </header>

        {/* ── BREADCRUMB STRIP ───────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-2">
          <nav
            className="flex items-center flex-wrap gap-2 text-xs text-on-surface-variant font-medium"
            aria-label="Breadcrumb"
          >
            <Link href="/services" className="hover:text-brand-accent transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <Link
              href={`/services/${serviceSlug}`}
              className="hover:text-brand-accent transition-colors"
            >
              {serviceTitle}
            </Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <Link
              href={`/services/${serviceSlug}/${country.slug}`}
              className="hover:text-brand-accent transition-colors flex items-center gap-1"
            >
              <span>{country.flag}</span>
              <span>{country.name}</span>
            </Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <span className="text-brand-accent font-semibold">{city.name}</span>
          </nav>
        </div>

        {/* ── MAIN EDITORIAL ARTICLE GRID (2/3 CONTENT + 1/3 SIDEBAR) ─── */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-20">
          <div className="grid lg:grid-cols-3 gap-10 md:gap-16 items-start">

            {/* ═══════════ MAIN EDITORIAL COLUMN (2/3) ═══════════ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 min-w-0"
            >
              {/* Featured City Visual (Custom Cloudinary Image) */}
              <div
                className={`w-full mb-10 rounded-2xl overflow-hidden shadow-2xl h-[280px] sm:h-[360px] md:h-[420px] relative border ${
                  isLight ? "border-slate-200" : "border-white/10"
                }`}
              >
                <img
                  src={
                    city.imageUrl ||
                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                  }
                  alt={city.headline || `${serviceTitle} in ${city.name}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Lead Paragraph / Excerpt */}
              <p
                className={`text-base sm:text-lg md:text-xl leading-relaxed mb-10 font-medium ${isLight ? "text-slate-700" : "text-white/85"
                  }`}
              >
                {city.description ||
                  `In a fast-moving commercial market like ${city.name}, high-intent organic search engine visibility is the single most sustainable acquisition channel your brand can build. Our regional strategy is engineered to capture high-value queries before your competitors do.`}
              </p>



                  {/* ── Dynamic Content Sections OR Default Playbook ───── */}
                  {city.sections && city.sections.length > 0 ? (
                    <div className="space-y-12 mb-12">
                      {city.sections.map((section: any, idx: number) => (
                        <div key={idx} className="space-y-4">
                          {section.heading && (
                            <h2 className="text-brand-accent text-2xl sm:text-3xl font-display font-black uppercase tracking-tight">
                              {section.heading}
                            </h2>
                          )}
                          {section.subheading && (
                            <h3 className={`text-lg sm:text-xl font-display font-bold ${isLight ? "text-slate-800" : "text-white"}`}>
                              {section.subheading}
                            </h3>
                          )}
                          {section.text && (
                            <div
                              className={`font-body text-sm sm:text-base leading-relaxed space-y-4 prose max-w-none ${isLight
                                  ? "text-slate-700 prose-p:text-slate-700 prose-headings:text-slate-900"
                                  : "text-slate-300 prose-p:text-slate-300 prose-headings:text-white"
                                } prose-a:text-brand-accent prose-a:underline prose-strong:text-white prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6`}
                              dangerouslySetInnerHTML={{
                                __html: section.text.includes("<")
                                  ? section.text
                                  : section.text.split("\n").filter((l: string) => l.trim()).map((l: string) => `<p>${l}</p>`).join("")
                              }}
                            />
                          )}
                          {section.listItems && section.listItems.length > 0 && !(section.text && (section.text.includes("<ul>") || section.text.includes("<ol>"))) && (
                            <ul className="list-disc pl-6 space-y-2 marker:text-brand-accent ml-4 my-4 font-body text-sm sm:text-base">
                              {section.listItems.map((item: string, i: number) => (
                                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                ) : (
                <>
                  {/* ── Section 1 ────────────────────────────────────────── */}
                  <div className="mb-12">
                    <h2 className="text-brand-accent text-2xl sm:text-3xl font-display font-black uppercase mb-4 tracking-tight">
                      1. The Competitive Search Landscape in {city.name}
                    </h2>
                    <div
                      className={`font-body text-sm sm:text-base leading-relaxed space-y-4 ${isLight ? "text-slate-700" : "text-slate-300"
                        }`}
                    >
                      <p>
                        Ranking in {city.name} isn&apos;t simply a matter of stuffing &ldquo;{city.name}&rdquo; into your title tags. Search algorithms utilize sophisticated proximity factors, localized entity graph verification, and user behavioral signals to surface businesses.
                      </p>
                      <p>
                        When customers in {city.name} search for high-value services, they look for businesses with verifiable regional trust: consistent Google Business Profile reviews, local media mentions, and localized landing pages that answer their exact pain points.
                      </p>
                    </div>
                  </div>

                  {/* ── Section 3: Mid-Article Callout Box ─────────────────── */}
                  <div
                    className="my-12 p-6 sm:p-8 rounded-2xl relative overflow-hidden border border-brand-accent/30"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(245,194,0,0.12) 0%, rgba(245,194,0,0.02) 100%)",
                    }}
                  >
                    <div className="flex items-center gap-2 text-brand-accent text-xs font-bold uppercase tracking-wider mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Pro Tip for {city.name} Brands</span>
                    </div>
                    <h3
                      className={`text-lg sm:text-xl font-display font-black uppercase mb-3 ${isLight ? "text-slate-900" : "text-white"
                        }`}
                    >
                      Never run duplicate content across sister cities
                    </h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed mb-5 ${isLight ? "text-slate-700" : "text-white/80"
                        }`}
                    >
                      Search engines penalize doorway pages that only swap out the city name. Each market page must contain localized case studies, region-specific customer pain points, and distinct geo-coordinates.
                    </p>
                    <a
                      href="#audit-form"
                      className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-brand-accent uppercase tracking-wider underline underline-offset-4 hover:opacity-80"
                    >
                      <span>Request a custom content audit for your city presence</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </>
              )}

                {/* ── Section 4: Local FAQs Accordion ───────────────────── */}
                <div className="mb-12">
                  <h2 className="text-brand-accent text-2xl sm:text-3xl font-display font-black uppercase mb-6 tracking-tight">
                    Frequently Asked Questions
                  </h2>

                  <div className="space-y-3">
                    {localFaqs.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div
                          key={idx}
                          className={`border rounded-xl overflow-hidden ${isLight
                            ? "bg-slate-50 border-slate-200"
                            : "bg-[#181818] border-white/10"
                            }`}
                        >
                          <button
                            onClick={() => toggleFaq(idx)}
                            className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-sm text-on-surface hover:text-brand-accent transition-colors"
                          >
                            <span className={isLight ? "text-slate-900" : "text-white"}>
                              {faq.q}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-brand-accent transition-transform duration-200 flex-shrink-0 ml-3 ${isOpen ? "rotate-180" : ""
                                }`}
                            />
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div
                                  className={`px-5 pb-5 text-xs sm:text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-slate-300"
                                    }`}
                                >
                                  {faq.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ── Section 5: Interactive Audit Form ─────────────────── */}
                <div id="audit-form" className="mt-14 scroll-mt-36">
                  <div
                    className={`p-6 sm:p-8 rounded-2xl border ${isLight
                      ? "bg-slate-50 border-slate-200 shadow-lg"
                      : "bg-[#181818] border-white/10 shadow-2xl"
                      }`}
                  >
                    <div className="mb-6">
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-accent block mb-2">
                        Ready to Scale in {city.name}?
                      </span>
                      <h3
                        className={`text-xl sm:text-2xl font-display font-black uppercase ${isLight ? "text-slate-900" : "text-white"
                          }`}
                      >
                        Get Your Free {city.name} Search Audit
                      </h3>
                      <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5">
                        We&apos;ll analyze your organic rankings, competitor gaps, and Google Map Pack visibility across {city.name}.
                      </p>
                    </div>

                    {formSubmitted ? (
                      <div className="p-8 rounded-xl bg-brand-accent/10 border border-brand-accent/30 text-center">
                        <CheckCircle2 className="w-10 h-10 text-brand-accent mx-auto mb-3" />
                        <h4 className="font-display text-lg font-bold text-on-surface mb-1">
                          Audit Request Submitted!
                        </h4>
                        <p className="text-xs text-on-surface-variant">
                          Our regional search strategist for {city.name} will prepare your comprehensive report within 24 hours.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-display font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                              Your Name *
                            </label>
                            <input
                              required
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              placeholder="John Doe"
                              className="w-full px-4 py-2.5 rounded-lg bg-background border border-outline-variant text-xs sm:text-sm text-on-surface focus:outline-none focus:border-brand-accent"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-display font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                              Work Email *
                            </label>
                            <input
                              required
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="john@company.com"
                              className="w-full px-4 py-2.5 rounded-lg bg-background border border-outline-variant text-xs sm:text-sm text-on-surface focus:outline-none focus:border-brand-accent"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-display font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                              Phone
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+1 (555) 000-0000"
                              className="w-full px-4 py-2.5 rounded-lg bg-background border border-outline-variant text-xs sm:text-sm text-on-surface focus:outline-none focus:border-brand-accent"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-display font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                              Website URL *
                            </label>
                            <input
                              required
                              type="url"
                              name="website"
                              value={formData.website}
                              onChange={handleInputChange}
                              placeholder="https://yourbrand.com"
                              className="w-full px-4 py-2.5 rounded-lg bg-background border border-outline-variant text-xs sm:text-sm text-on-surface focus:outline-none focus:border-brand-accent"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-display font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                            Primary Goal in {city.name}
                          </label>
                          <textarea
                            rows={3}
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder={`Target keywords, local competitors, or issues in ${city.name}...`}
                            className="w-full px-4 py-2.5 rounded-lg bg-background border border-outline-variant text-xs sm:text-sm text-on-surface focus:outline-none focus:border-brand-accent resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 rounded-lg bg-brand-accent text-slate-900 font-display font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"
                          style={{
                            boxShadow: isLight
                              ? "4px 4px 0px 0px #000"
                              : "4px 4px 0px 0px #f5c200",
                          }}
                        >
                          {isSubmitting ? "Generating Audit Request..." : `Claim Free ${city.name} Audit`}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
            </motion.div>

            {/* ═══════════ EDITORIAL SIDEBAR (1/3) ═══════════ */}
            <div className="flex flex-col gap-8 lg:sticky lg:top-32">

              {/* 1. Primary CTA Box (Blog-style neo-brutalist) */}
              <div
                className={`rounded-2xl p-6 md:p-8 space-y-6 border ${isLight ? "bg-slate-50 border-slate-200" : "bg-[#181818] border-white/10"
                  }`}
              >
                <div className="flex items-center gap-2 text-brand-accent text-xs font-bold uppercase tracking-widest">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{country.flag} {country.name} Desk</span>
                </div>

                <h3
                  className={`text-xl font-display font-bold uppercase ${isLight ? "text-slate-900" : "text-white"
                    }`}
                >
                  Scale Your {city.name} Organic Share
                </h3>

                <p
                  className={`text-xs sm:text-sm font-medium leading-relaxed ${isLight ? "text-slate-600" : "text-white/60"
                    }`}
                >
                  Book a strategic discovery call to review keyword volume, competitor weaknesses, and ranking roadmaps in {city.name}.
                </p>

                <div className="w-12 h-1 rounded-full bg-brand-accent" />

                <a
                  href="#audit-form"
                  className="block w-full text-center px-6 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 bg-brand-accent text-slate-900 border-2 border-transparent hover:-translate-y-0.5"
                  style={{
                    boxShadow: isLight
                      ? "5px 5px 0px 0px #000"
                      : "5px 5px 0px 0px #f5c200",
                  }}
                >
                  Get {city.name} Audit
                </a>

                <div className={`w-full h-px ${isLight ? "bg-slate-200" : "bg-white/10"}`} />

                {/* Quick Navigation Links */}
                <div>
                  <h4
                    className={`text-xs font-bold uppercase tracking-wider mb-3 ${isLight ? "text-slate-900" : "text-white"
                      }`}
                  >
                    Quick Navigation
                  </h4>
                  <div className="space-y-2.5 font-semibold text-xs">
                    <Link
                      href={`/services/${serviceSlug}/${country.slug}`}
                      className="block text-brand-accent hover:underline"
                    >
                      ← Back to {country.name} Hub
                    </Link>
                    <Link
                      href={`/services/${serviceSlug}`}
                      className="block text-brand-accent hover:underline"
                    >
                      ← All {serviceTitle}
                    </Link>
                    <Link
                      href="/blogs"
                      className="block text-brand-accent hover:underline"
                    >
                      → Marketing Insights & Case Studies
                    </Link>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <p
                    className={`text-[10px] font-bold uppercase mb-1 ${isLight ? "text-slate-500" : "text-white/40"
                      }`}
                  >
                    Direct Consultation
                  </p>
                  <a
                    href="mailto:info@inquisitivedigital.com"
                    className="block text-xs font-bold text-brand-accent hover:underline break-all"
                  >
                    info@inquisitivedigital.com
                  </a>
                </div>
              </div>

              {/* 2. Sister Cities Widget (Internal Linking) */}
              {otherCities.length > 0 && (
                <div
                  className={`rounded-2xl p-6 border ${isLight ? "bg-slate-50 border-slate-200" : "bg-[#181818] border-white/10"
                    }`}
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-1.5 h-5 rounded-full bg-brand-accent" />
                    <h3
                      className={`text-base font-display font-bold uppercase tracking-tight ${isLight ? "text-slate-900" : "text-white"
                        }`}
                    >
                      Other {country.name} Cities
                    </h3>
                  </div>

                  <ul className="space-y-2">
                    {otherCities.map((otherCity) => (
                      <li key={otherCity.slug}>
                        <Link
                          href={`/services/${serviceSlug}/${country.slug}/${otherCity.slug}`}
                          className={`flex items-center justify-between p-2.5 rounded-lg text-xs font-medium transition-colors ${isLight
                            ? "hover:bg-slate-200/60 text-slate-700"
                            : "hover:bg-white/10 text-slate-300"
                            }`}
                        >
                          <span className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-brand-accent" />
                            <span>{otherCity.name}</span>
                          </span>
                          <ArrowRight className="w-3 h-3 text-brand-accent opacity-70" />
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/services/${serviceSlug}/${country.slug}`}
                    className="mt-4 block text-center text-[11px] font-bold uppercase tracking-wider text-brand-accent hover:underline pt-3 border-t border-outline-variant/30"
                  >
                    View All {country.name} Locations ({country.cities.length}) →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <FloatingWhatsApp />
    </>
  );
}
