"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import {
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Layers,
  Sparkles,
  CheckCircle2,
  Calendar,
  User,
  ExternalLink,
} from "lucide-react";

interface SubServiceDetailClientProps {
  subService: any;
  relatedSubServices: any[];
}

export default function SubServiceDetailClient({
  subService,
  relatedSubServices,
}: SubServiceDetailClientProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const sections = subService.sections || [];
  const faqs = subService.faqs || [];
  const heroImgUrl = subService.heroImage?.url || subService.heroImageUrl;

  const displayDate = subService.createdAt
    ? new Date(subService.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently Updated";

  return (
    <div className="w-full bg-[#0a0a0a] text-white font-body selection:bg-brand-accent selection:text-slate-900 overflow-x-hidden antialiased min-h-screen flex flex-col">
      <Header />
      <FloatingWhatsApp />

      {/* Background Soft Orbs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-brand-accent/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-white/5 blur-[120px]" />
      </div>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-36 pb-16 px-4 md:px-8 overflow-hidden border-b border-white/10">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="max-w-5xl mx-auto relative z-10">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-xs text-white/50 mb-8 flex-wrap"
            >
              <Link href="/services" className="hover:text-brand-accent transition-colors">
                Services
              </Link>
              <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              {subService.parentService && (
                <>
                  <Link
                    href={`/services/${subService.parentService}`}
                    className="hover:text-brand-accent transition-colors capitalize"
                  >
                    {subService.parentService.replace(/-/g, " ")}
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                </>
              )}
              <span className="text-brand-accent font-semibold">{subService.title}</span>
            </motion.nav>

            {/* Badges */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              {subService.category && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/15 border border-brand-accent/30 text-brand-accent text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  {subService.category}
                </span>
              )}
              {subService.parentService && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/70 text-xs font-medium uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5" />
                  {subService.parentService}
                </span>
              )}
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-[1.08] mb-6"
            >
              {subService.title}
            </motion.h1>

            {/* Metadata Bar */}
            <div className="flex items-center gap-6 text-xs text-white/50 pb-8 flex-wrap border-b border-white/10">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-brand-accent" />
                {subService.author || "Inquisitive Digital"}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-accent" />
                {displayDate}
              </span>
            </div>

            {/* Intro / Excerpt */}
            {subService.intro && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-8 text-lg md:text-xl text-white/80 leading-relaxed font-light whitespace-pre-line"
              >
                {subService.intro}
              </motion.div>
            )}

            {/* Hero Image */}
            {heroImgUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative max-h-[500px]"
              >
                <img
                  src={heroImgUrl}
                  alt={subService.heroImage?.alt || subService.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </div>
        </section>

        {/* CONTENT SECTIONS */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto">
          <div className="space-y-16">
            {sections.map((section: any, idx: number) => (
              <article
                key={idx}
                className="p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm space-y-6"
              >
                {section.heading && (
                  <h2 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tight text-white flex items-center gap-3">
                    <span className="w-2.5 h-8 bg-brand-accent rounded-full shrink-0" />
                    {section.heading}
                  </h2>
                )}

                {section.subheading && (
                  <h3 className="text-lg md:text-xl font-display font-bold text-brand-accent uppercase tracking-wide">
                    {section.subheading}
                  </h3>
                )}

                {section.text && (
                  <div
                    className="text-white/70 text-base md:text-lg leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{ __html: section.text }}
                  />
                )}

                {section.listItems && section.listItems.length > 0 && (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {section.listItems.map((item: string, iIdx: number) => (
                      <li
                        key={iIdx}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5 text-sm text-white/80"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.image?.url && (
                  <div className="rounded-xl overflow-hidden border border-white/10 my-4 max-h-96">
                    <img
                      src={section.image.url}
                      alt={section.image.alt || section.heading}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Subsections */}
                {section.subsections && section.subsections.length > 0 && (
                  <div className="pt-6 border-t border-white/10 space-y-6">
                    {section.subsections.map((sub: any, sIdx: number) => (
                      <div
                        key={sIdx}
                        className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3"
                      >
                        {sub.subheading && (
                          <h4 className="text-lg font-display font-bold text-white uppercase tracking-wide">
                            {sub.subheading}
                          </h4>
                        )}
                        {sub.text && (
                          <div
                            className="text-white/70 text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: sub.text }}
                          />
                        )}
                        {sub.listItems && sub.listItems.length > 0 && (
                          <ul className="space-y-2 pt-2">
                            {sub.listItems.map((sItem: string, siIdx: number) => (
                              <li key={siIdx} className="flex items-start gap-2 text-xs text-white/80">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0" />
                                <span>{sItem}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* FAQS SECTION */}
        {faqs.length > 0 && (
          <section className="py-16 px-4 md:px-8 border-t border-white/10 bg-white/[0.01]">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-3">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">
                  Got Questions?
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tight text-white">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq: any, fIdx: number) => {
                  const isOpen = openFaqIndex === fIdx;
                  return (
                    <div
                      key={fIdx}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(fIdx)}
                        className="w-full p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-base md:text-lg text-white hover:text-brand-accent transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-brand-accent transition-transform duration-300 shrink-0 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 text-white/70 text-sm md:text-base leading-relaxed border-t border-white/5 pt-4">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA SECTION */}
        <section className="py-20 px-4 md:px-8 border-t border-white/10 relative overflow-hidden">
          <div className="max-w-4xl mx-auto p-10 md:p-14 rounded-3xl bg-gradient-to-br from-brand-accent/20 via-brand-accent/5 to-transparent border border-brand-accent/30 text-center relative z-10 space-y-6">
            <span className="px-3.5 py-1 rounded-full bg-brand-accent/20 text-brand-accent text-xs font-extrabold uppercase tracking-widest border border-brand-accent/40 inline-block">
              Take Action Today
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight text-white">
              Ready to Accelerate with {subService.title}?
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
              Speak with our senior strategists to construct a tailored execution roadmap engineered for sustainable ROI.
            </p>
            <div className="pt-4 flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-accent text-slate-900 font-display font-black uppercase tracking-wider text-sm hover:bg-white transition-all shadow-xl shadow-brand-accent/20"
              >
                Schedule Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/15 hover:border-white/40 text-white font-display font-bold uppercase tracking-wider text-sm transition-all"
              >
                Explore All Services
              </Link>
            </div>
          </div>
        </section>

        {/* RELATED SUB-SERVICES */}
        {relatedSubServices.length > 0 && (
          <section className="py-16 px-4 md:px-8 border-t border-white/10">
            <div className="max-w-6xl mx-auto space-y-8">
              <h3 className="text-xl font-display font-black uppercase tracking-wider text-white">
                Related Sub Services
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedSubServices.map((related: any) => (
                  <Link
                    key={related.slug}
                    href={`/sub-services/${related.slug}`}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-accent/50 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-brand-accent mb-2">
                        <span>{related.category || related.parentService || "Service"}</span>
                      </div>
                      <h4 className="text-lg font-display font-bold text-white group-hover:text-brand-accent transition-colors">
                        {related.title}
                      </h4>
                      {related.excerpt && (
                        <p className="text-xs text-white/50 mt-2 line-clamp-2">
                          {related.excerpt}
                        </p>
                      )}
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-brand-accent font-bold">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
