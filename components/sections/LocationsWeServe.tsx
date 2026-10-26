"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Globe, ArrowRight } from "lucide-react";
import { LocationCountryData as LocationCountry } from "@/lib/data/locations";

interface LocationsWeServeProps {
  serviceSlug: string;          // e.g. "seo-services"
  locations: LocationCountry[]; // countries + their cities
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LocationsWeServe({ serviceSlug, locations }: LocationsWeServeProps) {
  if (!locations || locations.length === 0) return null;

  return (
    <section className="py-16 px-4 md:px-margin-desktop relative border-t border-outline-variant/30">
      <div className="max-w-container-max mx-auto">

        {/* ── Section Header ─────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-4 shadow-sm"
          >
            <Globe className="w-3 h-3" />
            Coverage
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface mb-4"
          >
            Locations We <span className="text-brand-accent">Serve</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-body text-on-surface-variant max-w-2xl mx-auto text-sm sm:text-base"
          >
            We deliver expert SEO strategies tailored to each market — browse
            the countries and cities where we operate.
          </motion.p>
        </div>

        {/* ── Columns Grid ───────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {locations.map((country, idx) => {
            const hubHref = `/services/${serviceSlug}/${country.slug}`;

            return (
              <motion.div
                key={country.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="flex flex-col bg-surface-container-low border border-outline-variant rounded-2xl overflow-hidden hover:border-brand-accent/40 transition-colors duration-300 group"
              >
                {/* Country Header */}
                <Link
                  href={hubHref}
                  className="flex items-center gap-3 px-5 py-4 border-b border-outline-variant/60 hover:bg-brand-accent/5 transition-colors duration-200"
                >
                  <span className="text-2xl leading-none select-none">{country.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-extrabold text-sm text-on-surface truncate group-hover:text-brand-accent transition-colors duration-200">
                      {country.name}
                    </p>
                    <p className="font-body text-[10px] text-on-surface-variant mt-0.5">
                      {country.cities.length} {country.cities.length === 1 ? "city" : "cities"}
                    </p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-on-surface-variant opacity-0 group-hover:opacity-100 group-hover:text-brand-accent transition-all duration-200 flex-shrink-0" />
                </Link>

                {/* City List — max 5 shown */}
                <ul className="flex flex-col divide-y divide-outline-variant/30 flex-1">
                  {country.cities.slice(0, 5).map((city) => {
                    const cityHref = `/services/${serviceSlug}/${country.slug}/${city.slug}`;
                    return (
                      <li key={city.slug}>
                        <Link
                          href={cityHref}
                          className="flex items-center gap-2.5 px-5 py-3 hover:bg-brand-accent/5 transition-colors duration-150 group/city"
                        >
                          <MapPin className="w-3 h-3 text-brand-accent opacity-50 flex-shrink-0 group-hover/city:opacity-100 transition-opacity duration-150" />
                          <span className="font-body text-xs text-on-surface-variant group-hover/city:text-on-surface transition-colors duration-150 leading-snug">
                            {city.name}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* "View all" footer — always links to country hub page */}
                <Link
                  href={hubHref}
                  className="flex items-center justify-center gap-1.5 px-5 py-3 border-t border-outline-variant/60 text-[10px] font-display font-bold uppercase tracking-wider text-brand-accent hover:bg-brand-accent/10 transition-all duration-200 group/footer"
                >
                  {country.cities.length > 5 ? (
                    <>
                      View all {country.cities.length} cities
                      <ArrowRight className="w-3 h-3 group-hover/footer:translate-x-0.5 transition-transform duration-150" />
                    </>
                  ) : (
                    <>
                      View {country.name} hub
                      <ArrowRight className="w-3 h-3 group-hover/footer:translate-x-0.5 transition-transform duration-150" />
                    </>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom note ────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center font-body text-xs text-on-surface-variant mt-10"
        >
          Don&apos;t see your city?{" "}
          <Link
            href="/contact-us"
            className="text-brand-accent font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            Get in touch
          </Link>{" "}
          — we work worldwide.
        </motion.p>
      </div>
    </section>
  );
}
