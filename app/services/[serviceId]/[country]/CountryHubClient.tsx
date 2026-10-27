"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import {
  MapPin,
  ArrowRight,
  Search,
  ChevronRight,
  Sparkles,
  PhoneCall,
  Globe,
  SlidersHorizontal,
  CheckCircle2,
} from "lucide-react";
import { LocationCountryData } from "@/lib/data/locations";

interface CountryHubClientProps {
  serviceSlug: string;
  serviceTitle: string;
  country: LocationCountryData;
}

export default function CountryHubClient({
  serviceSlug,
  serviceTitle,
  country,
}: CountryHubClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCities = country.cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-background text-on-surface font-body selection:bg-brand-accent selection:text-background overflow-x-hidden antialiased relative min-h-screen flex flex-col">
      <Header />

      {/* Background Soft Orbs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-brand-accent/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-surface-container-high blur-[120px]" />
      </div>

      <main className="flex-1">
        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="relative pt-28 pb-0 px-4 md:px-margin-desktop overflow-hidden">
          {/* Background grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Accent radial glow */}
          <div className="absolute top-0 left-1/3 w-[700px] h-[500px] rounded-full bg-brand-accent/6 blur-[100px] pointer-events-none" />

          <div className="max-w-container-max mx-auto relative z-10">

            {/* ── TOP BAND: breadcrumb + eyebrow ── */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
              <motion.nav
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-1.5 text-[11px] text-on-surface-variant font-medium flex-wrap"
                aria-label="Breadcrumb"
              >
                <Link href="/services" className="hover:text-brand-accent transition-colors">Services</Link>
                <ChevronRight className="w-3 h-3 opacity-40" />
                <Link href={`/services/${serviceSlug}`} className="hover:text-brand-accent transition-colors">{serviceTitle}</Link>
                <ChevronRight className="w-3 h-3 opacity-40" />
                <span className="text-brand-accent font-bold">{country.flag} {country.name}</span>
              </motion.nav>

              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest"
              >
                <Globe className="w-3 h-3" />
                Regional Hub
              </motion.span>
            </div>

            {/* ── MAIN HERO: left heading / right card ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start pb-12 border-b border-outline-variant/25">

              {/* LEFT */}
              <div className="flex flex-col">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 }}
                  className="font-display text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-extrabold tracking-tight text-on-surface leading-[1.08] mb-4"
                >
                  {country.headline ? (
                    country.headline
                  ) : (
                    <>
                      {serviceTitle}{" "}
                      <span className="relative inline-block">
                        <span className="relative z-10">service in</span>
                      </span>{" "}
                      <span className="text-brand-accent">{country.name}</span>
                    </>
                  )}
                </motion.h1>

                {/* Accent underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="origin-left h-[3px] w-20 bg-gradient-to-r from-brand-accent to-brand-accent/30 rounded-full mb-5"
                />

                {/* Description — max 4 lines */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.18 }}
                  className="font-body text-sm text-on-surface-variant leading-[1.8] max-w-lg"
                >
                  {country.description ||
                    `Select your city below to explore localized keyword targets, market competitive insights, and dedicated ${serviceTitle} tactics engineered for your area.`}
                </motion.p>

                {/* Chip row */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex flex-wrap gap-2 mt-6"
                >
                  {[
                    `${country.cities?.length || 0} Cities`,
                    "Localized Strategy",
                    "Enterprise & SMB",
                  ].map((label) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-display font-bold text-on-surface-variant uppercase tracking-wider"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5 text-brand-accent shrink-0" />
                      {label}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT: CTA card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full lg:sticky lg:top-28"
              >
                <div className="relative bg-surface-container-low/80 backdrop-blur-sm border border-outline-variant/60 rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.45)] transition-all duration-300 hover:border-brand-accent/30 group">
                  {/* Yellow accent strip at top */}
                  <div className="h-1 w-full bg-gradient-to-r from-brand-accent/60 via-brand-accent to-brand-accent/60" />

                  <div className="p-6 sm:p-7">
                    {/* Glow */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-brand-accent/8 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-accent/12 transition-all duration-500" />

                    <h3 className="font-display text-xl font-extrabold text-on-surface leading-snug mb-2 tracking-tight pr-6">
                      {country.ctaTitle || `Need Custom Organic Growth in ${country.name}?`}
                    </h3>

                    <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-5">
                      {country.ctaDescription ||
                        `Expanding across ${country.name}? Our strategists will audit your presence and deliver a city-by-city growth roadmap.`}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <Link
                        href="/contact-us"
                        className="flex-1 inline-flex items-center justify-center gap-2 font-display font-extrabold uppercase tracking-wider text-background bg-brand-accent px-5 py-3 rounded-xl text-[11px] hover:shadow-[0_8px_24px_rgba(245,194,0,0.4)] hover:opacity-95 transition-all duration-300"
                      >
                        <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                        Book Strategy Call
                      </Link>
                      <Link
                        href={`/services/${serviceSlug}`}
                        className="flex-1 inline-flex items-center justify-center font-display font-bold uppercase tracking-wider text-on-surface-variant border border-outline-variant/60 hover:border-brand-accent/40 hover:text-on-surface px-5 py-3 rounded-xl text-[11px] transition-all duration-300"
                      >
                        ← Back
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CITY CARDS SECTION ────────────────────────────────────────── */}
        <section className="py-14 px-4 md:px-margin-desktop">
          <div className="max-w-container-max mx-auto">
            {/* Search & Filter Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <div>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-on-surface">
                  Available Services in Cities Across{" "}
                  <span className="text-brand-accent">{country.name}</span>
                </h2>
                <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1">
                  Click on any city below to view localized service specs and
                  case studies.
                </p>
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="text"
                  placeholder="Filter by city name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-full text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>
            </div>

            {/* Cards Grid */}
            {filteredCities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCities.map((city, idx) => {
                  const cityHref = `/services/${serviceSlug}/${country.slug}/${city.slug}`;

                  return (
                    <motion.div
                      key={city.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="group flex flex-col justify-between bg-surface-container-low border border-outline-variant hover:border-brand-accent/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:-translate-y-1"
                    >
                      <div>
                        {/* City Badge & Pin */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-outline-variant/80 text-brand-accent font-display text-[11px] font-bold tracking-wide">
                            <MapPin className="w-3 h-3" />
                            {country.name}
                          </span>
                          <span className="text-xs font-mono text-on-surface-variant/60 group-hover:text-brand-accent transition-colors">
                            #{String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>

                        {/* City Title */}
                        <h3 className="font-display text-xl sm:text-2xl font-extrabold text-on-surface group-hover:text-brand-accent transition-colors mb-2.5">
                          {city.name}
                        </h3>

                        {/* City Description */}
                        <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-5 line-clamp-3">
                          {city.description ||
                            `Tailored ${serviceTitle} designed to rank on page #1 for top competitive search terms in ${city.name}.`}
                        </p>

                      </div>

                      {/* Action Button */}
                      <Link
                        href={cityHref}
                        className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-background border border-outline-variant group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-background font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 mt-2"
                      >
                        <span>Explore {city.name} Page</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-surface-container-low rounded-2xl border border-outline-variant p-8">
                <p className="font-display text-lg font-bold text-on-surface mb-2">
                  No cities matching &quot;{searchQuery}&quot;
                </p>
                <p className="font-body text-xs text-on-surface-variant mb-4">
                  Try checking the spelling or browse all active locations.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-2 bg-brand-accent text-background rounded-full text-xs font-bold uppercase tracking-wider hover:opacity-90"
                >
                  Clear Filter
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── BOTTOM CALL TO ACTION ────────────────────────────────────── */}
        <section className="py-14 px-4 md:px-margin-desktop border-t border-outline-variant/30 bg-surface-container-low/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-on-surface mb-3">
              Need Custom Organic Growth in {country.name}?
            </h2>
            <p className="font-body text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto mb-8">
              Whether you are expanding nationally across {country.name} or
              targeting high-conversion local niches, our SEO strategists are
              ready to audit your presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center font-display font-bold uppercase tracking-wider text-background bg-brand-accent px-7 py-3.5 rounded-full text-xs sm:text-sm hover:shadow-[0_8px_20px_rgb(245,194,0,0.3)] transition-all duration-300"
              >
                Schedule Country Strategy Call
              </Link>
              <Link
                href={`/services/${serviceSlug}`}
                className="inline-flex items-center justify-center font-display font-bold uppercase tracking-wider text-on-surface bg-surface-container-high border border-outline-variant px-7 py-3.5 rounded-full text-xs sm:text-sm hover:bg-surface-container-highest transition-all duration-300"
              >
                Back to {serviceTitle}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FloatingWhatsApp />
    </div>
  );
}
