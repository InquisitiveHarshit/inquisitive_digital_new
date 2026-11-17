"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { useTheme } from "@/components/ThemeProvider";
import {
  ArrowRight,
  ChevronRight,
  Search,
  Share2,
  TrendingUp,
  Code,
  Database,
  FileText,
  Palette,
} from "lucide-react";

interface SubServiceDetailClientProps {
  subService: any;
  relatedSubServices: any[];
}

const CORE_SERVICES = [
  {
    slug: "seo-services",
    title: "SEO, AEO & GEO",
    desc: "Rank higher on Google and AI search",
    href: "/services/seo-services",
    icon: Search,
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    desc: "Build brand awareness & engagement",
    href: "/services/social-media-marketing",
    icon: Share2,
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    desc: "Data-driven ROI campaigns",
    href: "/services/performance-marketing",
    icon: TrendingUp,
  },
  {
    slug: "web-development",
    title: "Web Development",
    desc: "Blazing fast Next.js & React sites",
    href: "/services/web-development",
    icon: Code,
  },
  {
    slug: "data-engineering",
    title: "Data Engineering",
    desc: "Pipelines, orchestration & RAG agents",
    href: "/services/data-engineering",
    icon: Database,
  },
  {
    slug: "content-marketing",
    title: "Content Marketing & Blogging",
    desc: "SEO optimized authoritative content",
    href: "/services/content-marketing",
    icon: FileText,
  },
  {
    slug: "creative-services",
    title: "Creative Services",
    desc: "Design, branding & video production",
    href: "/services/creative-services",
    icon: Palette,
  },
];

export default function SubServiceDetailClient({
  subService,
  relatedSubServices,
}: SubServiceDetailClientProps) {
  const { themeMode } = useTheme();

  const isLight = themeMode === "singular-light";
  const isDarkSingular = themeMode === "singular-dark";

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
    <>
    <Header />
    <FloatingWhatsApp />

    <main
              className = {`overflow-x-hidden transition-colors duration-500 min-h-screen ${isLight ? "bg-white text-slate-900" : isDarkSingular ? "bg-[#0a0a0a] text-white" : "bg-[#0f0e0e] text-white"
                }`}
      >
            {/* Page Header — styled like Blog Detail */}
            <header
              className="pt-40 pb-8 w-full text-center relative overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle at 50% 0%, rgba(245, 194, 0, 0.15) 0%, rgba(245, 194, 0, 0.05) 45%, transparent 100%)",
              }}
            >
              <div className="max-w-6xl mx-auto px-4 md:px-8">
                {/* Breadcrumb / Category */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] mb-6 font-bold text-brand-accent flex-wrap"
                >
                  <Link href="/services" className="hover:underline">
                    Services
                  </Link>
                  {subService.parentService && (
                    <>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40 inline" />
                      <Link
                        href={`/services/${subService.parentService}`}
                        className="hover:underline capitalize"
                      >
                        {subService.parentService.replace(/-/g, " ")}
                      </Link>
                    </>
                  )}
                  {subService.category && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-brand-accent opacity-50" />
                      <span>{subService.category}</span>
                    </>
              )}
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className={`text-3xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-display font-black uppercase tracking-tight mb-8 break-words ${isLight ? "text-slate-900" : "text-white"
                  }`}
              >
                {subService.title}
              </motion.h1>

          {/* Metadata Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={`flex items-center justify-center gap-4 text-sm font-semibold flex-wrap ${isLight ? "text-slate-500" : "text-white/50"
              }`}
          >
            <span className={`font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
              By {subService.author || "Inquisitive Digital"}
            </span>
            <span className="w-1 h-1 rounded-full bg-brand-accent opacity-50" />
            <span>{displayDate}</span>
            {subService.parentService && (
              <>
                <span className="w-1 h-1 rounded-full bg-brand-accent opacity-50" />
                <span className="capitalize">{subService.parentService.replace(/-/g, " ")}</span>
              </>
            )}
          </motion.div>
        </div>
      </header>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-12 md:pb-20">
              <div className="grid lg:grid-cols-3 gap-10 md:gap-16">
                {/* Main Content — 2/3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="lg:col-span-2 min-w-0"
                >
                  {/* Hero Image */}
                  {heroImgUrl && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className={`w-full mb-8 md:mb-12 rounded-2xl overflow-hidden shadow-2xl h-[250px] md:h-[350px] lg:h-[400px] border ${isLight ? "border-slate-200" : "border-white/10"
                        }`}
                    >
                      <img
                        src={heroImgUrl}
                        alt={subService.heroImage?.alt || subService.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}

                  {/* Note: Excerpt / Short description is omitted inside the page */}

              {/* Intro Text */}
                  {subService.intro && (
                    <div
                      className={`text-base md:text-lg leading-relaxed mb-8 font-medium ${isLight ? "text-slate-700" : "text-white/80"
                        } space-y-4`}
                      dangerouslySetInnerHTML={{
                        __html: subService.intro.includes("<")
                          ? subService.intro
                          : subService.intro
                            .split("\n\n")
                            .filter((p: string) => p.trim())
                            .map((p: string) => `<p>${p}</p>`)
                            .join(""),
                      }}
                    />
                  )}

                    {/* Content Sections — styled like Blog sections */ }
              {sections.length > 0 && (
                    <div
                      className={`blog-content font-body text-sm md:text-base leading-relaxed prose max-w-none break-words overflow-hidden ${isLight
                          ? "prose-slate"
                          : "prose-invert prose-p:text-slate-300 prose-headings:text-white prose-li:text-slate-300"
                        } prose-a:text-brand-accent prose-a:underline prose-a:font-semibold hover:prose-a:text-brand-accent/80 prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight prose-h2:text-xl prose-h2:md:text-3xl prose-h2:mt-6 prose-h2:mb-4 prose-h3:text-lg prose-h3:md:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:mb-4 prose-ul:mb-4 prose-ul:list-disc prose-ul:pl-6`}
                    >
                      {sections.map((section: any, index: number) => (
                        <div key={index} className="mb-12">
                          {section.heading && (
                            <h2 className="text-brand-accent text-xl md:text-3xl font-display font-black uppercase mb-4 mt-6">
                              {section.heading}
                            </h2>
                          )}

                          {section.subheading && (
                            <h3 className={`text-lg md:text-xl font-bold mb-4 ${isLight ? "text-slate-800" : "text-white"}`}>
                              {section.subheading}
                            </h3>
                          )}

                          {section.text && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: section.text.includes("<")
                                  ? section.text
                                  : section.text
                                    .split("\n")
                                    .filter((l: string) => l.trim())
                                    .map((l: string) => `<p>${l}</p>`)
                                    .join(""),
                              }}
                            />
                          )}

                          {section.listItems &&
                            section.listItems.length > 0 &&
                            !(section.text && (section.text.includes("<ul>") || section.text.includes("<ol>"))) && (
                              <ul className="list-disc pl-6 space-y-2 marker:text-brand-accent ml-4 my-6">
                                {section.listItems.map((item: string, i: number) => (
                                  <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                              </ul>
                            )}

                          {section.metaLinking && (
                            <div
                              className={`mt-6 p-4 rounded-lg border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/10"
                                }`}
                            >
                              <h4 className={`text-sm font-bold uppercase mb-2 ${isLight ? "text-slate-900" : "text-white"}`}>
                                Meta Linking
                              </h4>
                              <div
                                    className="text-brand-accent underline underline-offset-4 font-semibold break-all"
                                    dangerouslySetInnerHTML={{
                                      __html: section.metaLinking.includes("<")
                                        ? section.metaLinking
                                        : section.metaLinking
                                          .split("\n")
                                          .filter((l: string) => l.trim())
                                          .map((l: string) => `<p>${l}</p>`)
                                          .join(""),
                                    }}
                          />
                                  </div>
                                )}

                                {section.image?.url && (
                                  <img
                                    src={section.image.url}
                                    alt={section.image.alt || section.heading || "Sub-service image"}
                                    className="w-full rounded-2xl my-8 shadow-lg object-cover max-h-[450px]"
                                  />
                                )}

                      {section.subsections && section.subsections.length > 0 && (
                                      <div className="mt-8 space-y-8">
                                        {section.subsections.map((sub: any, subIdx: number) => (
                                          <div key={subIdx}>
                                            {sub.subheading && (
                                              <h3 className={`text-xl font-bold mb-3 ${isLight ? "text-slate-800" : "text-white"}`}>
                                                {sub.subheading}
                                              </h3>
                                            )}
                                            {sub.text && (
                                              <div
                                                dangerouslySetInnerHTML={{
                                                  __html: sub.text.includes("<")
                                                    ? sub.text
                                                    : sub.text
                                                      .split("\n")
                                                      .filter((l: string) => l.trim())
                                                      .map((l: string) => `<p>${l}</p>`)
                                                      .join(""),
                                  }}
                                />
                              )}
                                            {sub.listItems &&
                                              sub.listItems.length > 0 &&
                                              !(sub.text && (sub.text.includes("<ul>") || sub.text.includes("<ol>"))) && (
                                                <ul className="list-disc pl-6 space-y-2 marker:text-brand-accent ml-4 my-4">
                                                  {sub.listItems.map((item: string, i: number) => (
                                                    <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                                                  ))}
                                                </ul>
                                              )}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                    </div>
                  ))}
                        </div>
                      )}

              {/* FAQs Section */}
              {faqs.length > 0 && (
                <div className="mt-16">
                  <h2
                    className={`text-2xl md:text-3xl font-display font-black uppercase tracking-tight mb-8 ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}
                  >
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {faqs.map((faq: any, index: number) => (
                      <div
                        key={index}
                        className={`p-6 rounded-2xl border ${
                          isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/10"
                        }`}
                      >
                        <h3 className={`text-lg font-bold mb-3 ${isLight ? "text-slate-900" : "text-white"}`}>
                          {faq.question}
                        </h3>
                        <div
                          className={`text-sm md:text-base leading-relaxed break-words ${
                            isLight ? "text-slate-600" : "text-slate-300"
                          }`}
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={`w-full h-px my-12 ${isLight ? "bg-slate-200" : "bg-white/10"}`} />
            </motion.div>

                    {/* Sidebar — 1/3 */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="lg:col-span-1"
                    >
                      {/* Mobile strip */}
                      <div
                        className={`lg:hidden flex flex-col sm:flex-row items-center gap-4 rounded-2xl p-4 sm:p-5 border mb-8 ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/10"
                          }`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold text-sm mb-0.5 ${isLight ? "text-slate-900" : "text-white"}`}>
                            Ready to Accelerate?
                          </p>
                          <p className={`text-xs leading-relaxed ${isLight ? "text-slate-500" : "text-white/50"}`}>
                            Speak with our senior strategists to engineer measurable ROI.
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-2 flex-shrink-0">
                          <Link
                            href="/contact-us"
                            className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap bg-brand-accent text-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                          >
                            Contact Us
                          </Link>
                        </div>
                      </div>

                      {/* Sidebar Content Container */}
                      <div className="flex flex-col gap-8 lg:gap-6 lg:sticky lg:top-32 mt-8 lg:mt-0">
                        {/* Desktop CTA Box */}
                        <div
                          className={`hidden lg:block rounded-2xl p-6 md:p-8 space-y-6 border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/10"
                            }`}
                        >
                          <h3 className={`text-xl font-display font-bold uppercase ${isLight ? "text-slate-900" : "text-white"}`}>
                            Need a Strategic Partner?
                          </h3>
                          <p
                            className={`text-sm font-medium leading-relaxed ${isLight ? "text-slate-600" : "text-white/60"
                              }`}
                          >
                            Speak with our specialists to build a tailored roadmap for {subService.title}.
                          </p>

                          <div className="w-12 h-1 rounded-full bg-brand-accent" />

                          <Link
                            href="/contact-us"
                            className="block w-full text-center px-6 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 bg-brand-accent text-slate-900 border-2 border-transparent hover:-translate-y-1"
                            style={{ boxShadow: isLight ? "6px 6px 0px 0px #000" : "6px 6px 0px 0px #f5c200" }}
                          >
                            Schedule Consultation
                          </Link>

                          <div className={`w-full h-px ${isLight ? "bg-slate-200" : "bg-white/10"}`} />

                          <div>
                            <h4
                              className={`text-sm font-bold uppercase mb-4 ${isLight ? "text-slate-900" : "text-white"
                                }`}
                            >
                              Quick Links
                            </h4>
                            <div className="space-y-3 font-semibold">
                              {subService.parentService && (
                                <Link
                                  href={`/services/${subService.parentService}`}
                                  className="block text-sm transition-colors duration-200 text-brand-accent hover:text-brand-accent/80 capitalize"
                                >
                                  → {subService.parentService.replace(/-/g, " ")}
                                </Link>
                              )}
                              <Link
                                href="/services"
                                className="block text-sm transition-colors duration-200 text-brand-accent hover:text-brand-accent/80"
                              >
                                → All Services
                              </Link>
                              <Link
                                href="/about-us"
                                className="block text-sm transition-colors duration-200 text-brand-accent hover:text-brand-accent/80"
                              >
                                → About Us
                              </Link>
                              <Link
                                href="/blogs"
                                className="block text-sm transition-colors duration-200 text-brand-accent hover:text-brand-accent/80"
                              >
                                → Insights & Blogs
                              </Link>
                            </div>
                          </div>
                        </div>

                    {/* All Core Services in Sidebar — matching the user's reference image */}
                    <div
                      className={`rounded-2xl p-6 border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/[0.03] border-white/10"
                        }`}
                    >
                      <div className="flex items-center justify-between mb-5">
                        <h4
                          className={`text-xs font-bold uppercase tracking-[0.2em] text-brand-accent`}
                        >
                          Our Services
                        </h4>
                        <Link
                          href="/services"
                          className="text-[11px] font-semibold text-white/40 hover:text-brand-accent transition-colors"
                        >
                          View All
                        </Link>
                      </div>

                            <div className="space-y-2.5">
                              {CORE_SERVICES.map((srv) => {
                                const IconComponent = srv.icon;
                                const isCurrentParent = subService.parentService === srv.slug;
                                return (
                                  <Link
                                    key={srv.slug}
                                    href={srv.href}
                                    className={`group flex items-center gap-3.5 p-3 rounded-xl transition-all border ${isCurrentParent
                                        ? isLight
                                          ? "bg-brand-accent/15 border-brand-accent/40"
                                          : "bg-brand-accent/10 border-brand-accent/30"
                                        : isLight
                                          ? "bg-white border-slate-200/60 hover:border-brand-accent/50 hover:bg-slate-100/50"
                                          : "bg-white/[0.02] border-white/5 hover:border-brand-accent/40 hover:bg-white/[0.05]"
                                      }`}
                                  >
                                    <div
                                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isLight
                                          ? "bg-slate-100 text-slate-800 group-hover:bg-brand-accent group-hover:text-slate-900"
                                          : "bg-white/5 text-brand-accent group-hover:bg-brand-accent group-hover:text-slate-900"
                                        }`}
                                    >
                                      <IconComponent className="w-5 h-5 transition-transform group-hover:scale-110" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                      <p
                                        className={`text-xs font-display font-bold uppercase tracking-wide group-hover:text-brand-accent transition-colors truncate ${isLight ? "text-slate-900" : "text-white"
                                          }`}
                                      >
                                        {srv.title}
                                      </p>
                                      <p
                                        className={`text-[11px] truncate mt-0.5 ${isLight ? "text-slate-500" : "text-white/50"
                                          }`}
                                      >
                                        {srv.desc}
                                      </p>
                                    </div>

                                    <ChevronRight
                                      className="w-4 h-4 shrink-0 transition-all opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 text-brand-accent"
                                    />
                                  </Link>
                            );
                    })}
                          </div>
                        </div>
                      </div>
            </motion.div>
              </div>
            </div>

              {/* BOTTOM SECTION: Related Sub-Services Carousel / Grid */}
              {relatedSubServices.length > 0 && (
                <section
                  className={`py-16 px-4 md:px-8 border-t ${isLight ? "bg-slate-50/50 border-slate-200" : "border-white/10"
                    }`}
                >
                  <div className="max-w-7xl mx-auto space-y-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <h3
                        className={`text-2xl font-display font-black uppercase tracking-wider ${isLight ? "text-slate-900" : "text-white"
                          }`}
                      >
                        Explore Related Capabilities
                      </h3>
                      <Link
                        href="/services"
                        className="text-xs uppercase font-bold text-brand-accent hover:underline flex items-center gap-1"
                      >
                        View All Services <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {relatedSubServices.map((related: any) => (
                  <Link
                    key={related.slug}
                    href={`/sub-services/${related.slug}`}
                    className={`p-6 rounded-2xl border transition-all flex flex-col justify-between group ${
                      isLight
                        ? "bg-white border-slate-200 hover:border-brand-accent hover:shadow-lg"
                        : "bg-white/5 border-white/10 hover:border-brand-accent/50"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-brand-accent mb-2">
                        <span>{related.category || related.parentService || "Service"}</span>
                      </div>
                      <h4
                        className={`text-lg font-display font-bold group-hover:text-brand-accent transition-colors ${
                          isLight ? "text-slate-900" : "text-white"
                        }`}
                      >
                        {related.title}
                      </h4>
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
      </>
      );
}
