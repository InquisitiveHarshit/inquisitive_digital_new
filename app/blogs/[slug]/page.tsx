"use client";

import React, { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { blogs as staticBlogs, getBlogBySlug } from "../data";
import type { BlogPost } from "../data";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
// import { BlogCard } from "@/components/ui/BlogCard";

const API_BASE = "";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { themeMode } = useTheme();
  const resolvedParams = use(params);

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>(staticBlogs);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  const isLight = themeMode === "singular-light";
  const isDarkSingular = themeMode === "singular-dark";

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch the specific blog
        const res = await fetch(`${API_BASE}/api/blogs/${resolvedParams.slug}`, {
          cache: "no-store",
        });
        if (res.status === 404) {
          // Try static fallback
          const staticBlog = getBlogBySlug(resolvedParams.slug);
          if (!staticBlog) {
            setNotFoundState(true);
            return;
          }
          setBlog(staticBlog);
        } else if (!res.ok) {
          throw new Error("API error");
        } else {
          const data = await res.json();
          setBlog(data.data || data.blog);
        }

        // Fetch all blogs for prev/next navigation
        try {
          const allRes = await fetch(`${API_BASE}/api/blogs`, { cache: "no-store" });
          if (allRes.ok) {
            const allData = await allRes.json();
            const blogsArray = allData.data || allData.blogs;
            if (blogsArray?.length > 0) setAllBlogs(blogsArray);
          }
        } catch {
          // keep static allBlogs
        }
      } catch {
        // API unavailable, use static data
        const staticBlog = getBlogBySlug(resolvedParams.slug);
        if (!staticBlog) {
          setNotFoundState(true);
          return;
        }
        setBlog(staticBlog);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [resolvedParams.slug]);

  if (notFoundState) notFound();

  // Determine prev/next blogs
  const currentIndex = blog ? allBlogs.findIndex((b) => b.slug === blog.slug) : -1;
  const prevBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const nextBlog =
    currentIndex >= 0 && currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

  // ── Loading skeleton ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <>
        <Header />
        <main
          className={`overflow-x-hidden transition-colors duration-500 ${isLight ? "bg-white" : isDarkSingular ? "bg-[#0a0a0a]" : "bg-[#0f0e0e]"
            }`}
          style={{ minHeight: "100vh" }}
        >
          <div className="pt-40 pb-8 max-w-6xl mx-auto px-4 md:px-8">
            <div
              className={`h-6 w-24 rounded mb-6 animate-pulse ${isLight ? "bg-slate-200" : "bg-white/10"
                }`}
            />
            <div
              className={`h-12 w-3/4 rounded mb-4 animate-pulse ${isLight ? "bg-slate-200" : "bg-white/10"
                }`}
            />
            <div
              className={`h-6 w-1/3 rounded animate-pulse ${isLight ? "bg-slate-100" : "bg-white/5"
                }`}
            />
          </div>
        </main>
        <FloatingWhatsApp />
      </>
    );
  }

  if (!blog) return null;

  return (
    <>
      <Header />
      <main
        className={`overflow-x-hidden transition-colors duration-500 ${isLight ? "bg-white" : isDarkSingular ? "bg-[#0a0a0a]" : "bg-[#0f0e0e]"
          }`}
        style={{ minHeight: "100vh" }}
      >
        {/* Page Header */}
        <header
          className="pt-40 pb-8 w-full text-center relative overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(245, 194, 0, 0.15) 0%, rgba(245, 194, 0, 0.05) 45%, transparent 100%)",
          }}
        >
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-[0.3em] mb-6 block font-bold text-brand-accent"
            >
              {blog.category || "Insights"}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className={`text-3xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-display font-black uppercase tracking-tight mb-8 ${isLight ? "text-slate-900" : "text-white"
                }`}
            >
              {blog.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`flex items-center justify-center gap-4 text-sm font-semibold ${isLight ? "text-slate-500" : "text-white/50"
                }`}
            >
              <span>{blog.date}</span>
              <span className="w-1 h-1 rounded-full bg-brand-accent opacity-50" />
              <span>{blog.readTime}</span>
            </motion.div>
          </div>
        </header>

        {/* Blog Content Grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-12 md:pb-20">
          <div className="grid lg:grid-cols-3 gap-10 md:gap-16">
            {/* Main Content — 2/3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              {blog.imageUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`w-full mb-8 md:mb-12 rounded-2xl overflow-hidden shadow-2xl h-[250px] md:h-[350px] lg:h-[400px] border ${isLight ? "border-slate-200" : "border-white/10"
                    }`}
                >
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}

              {blog.excerpt && (
                <p
                  className={`text-lg md:text-xl leading-relaxed mb-8 font-medium ${isLight ? "text-slate-700" : "text-white/80"
                    }`}
                >
                  {blog.excerpt}
                </p>
              )}

              {/* Blog Markdown-like Content (Legacy fallback) */}
              {blog.content && (
                <div
                  className={`font-body text-base md:text-lg leading-loose prose max-w-none ${isLight
                    ? "prose-slate"
                    : "prose-invert prose-p:text-slate-300 prose-headings:text-white prose-li:text-slate-300"
                    } prose-a:text-brand-accent prose-a:underline prose-a:font-semibold hover:prose-a:text-brand-accent/80 prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:mb-6 prose-ul:mb-6 prose-ul:list-disc prose-ul:pl-6`}
                >
                  {(() => {
                    const lines = blog.content.split("\n").map(l => l.trim());
                    const elements: React.ReactNode[] = [];
                    let currentList: string[] = [];
                    let currentParagraph: string[] = [];

                    const flushParagraph = () => {
                      if (currentParagraph.length > 0) {
                        elements.push(<p key={`p-${elements.length}`} dangerouslySetInnerHTML={{ __html: currentParagraph.join(" ") }} />);
                        currentParagraph = [];
                      }
                    };

                    const flushList = () => {
                      if (currentList.length > 0) {
                        elements.push(
                          <ul key={`ul-${elements.length}`} className="list-disc pl-6 space-y-2 marker:text-brand-accent ml-4 my-6">
                            {currentList.map((item, idx) => (
                              <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                            ))}
                          </ul>
                        );
                        currentList = [];
                      }
                    };

                    for (let i = 0; i < lines.length; i++) {
                      const line = lines[i];
                      
                      if (!line) {
                        flushParagraph();
                        flushList();
                        continue;
                      }

                      if (line.startsWith("### ")) {
                        flushParagraph();
                        flushList();
                        elements.push(
                          <h3 key={`h3-${elements.length}`} className={isLight ? "text-slate-800" : "text-white"}>
                            {line.replace("### ", "")}
                          </h3>
                        );
                      } else if (line.startsWith("## ")) {
                        flushParagraph();
                        flushList();
                        elements.push(
                          <h2 key={`h2-${elements.length}`} className="text-brand-accent">
                            {line.replace("## ", "")}
                          </h2>
                        );
                      } else if (line.startsWith("- ") || line.startsWith("* ")) {
                        flushParagraph();
                        currentList.push(line.replace(/^[-*]\s+/, ""));
                      } else {
                        flushList();
                        currentParagraph.push(line);
                      }
                    }

                    flushParagraph();
                    flushList();

                    return elements;
                  })()}
                </div>
              )}

              {/* Structured Sections */}
              {blog.sections && blog.sections.length > 0 && (
                <div
                  className={`font-body text-base md:text-lg leading-loose prose max-w-none ${isLight
                    ? "prose-slate"
                    : "prose-invert prose-p:text-slate-300 prose-headings:text-white prose-li:text-slate-300"
                    } prose-a:text-brand-accent prose-a:underline prose-a:font-semibold hover:prose-a:text-brand-accent/80 prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:mb-6 prose-ul:mb-6 prose-ul:list-disc prose-ul:pl-6`}
                >
                  {blog.sections.map((section, index) => (
                    <div key={index} className="mb-12">
                      {section.heading && (
                        <h2 className="text-brand-accent">{section.heading}</h2>
                      )}

                      {section.subheading && (
                        <h3 className={`text-xl font-bold mb-4 ${isLight ? "text-slate-800" : "text-white"}`}>
                          {section.subheading}
                        </h3>
                      )}

                      {section.text && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: section.text.includes("<")
                              ? section.text
                              : section.text.split("\n").filter(l => l.trim()).map(l => `<p>${l}</p>`).join("")
                          }}
                        />
                      )}

                      {section.listItems && section.listItems.length > 0 && (
                        <ul className="list-disc pl-6 space-y-2 marker:text-brand-accent ml-4 my-6">
                          {section.listItems.map((item, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                          ))}
                        </ul>
                      )}

                      {section.metaLinking && (
                        <div
                          className={`mt-6 p-4 rounded-lg border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/10"}`}
                        >
                          <h4 className={`text-sm font-bold uppercase mb-2 ${isLight ? "text-slate-900" : "text-white"}`}>Meta Linking</h4>
                          <div
                            className="text-brand-accent underline underline-offset-4 font-semibold"
                            dangerouslySetInnerHTML={{
                              __html: section.metaLinking.includes("<")
                                ? section.metaLinking
                                : section.metaLinking.split("\n").filter(l => l.trim()).map(l => `<p>${l}</p>`).join("")
                            }}
                          />
                        </div>
                      )}

                      {section.subsections && section.subsections.length > 0 && (
                        <div className="mt-8 space-y-8">
                          {section.subsections.map((sub, subIdx) => (
                            <div key={subIdx}>
                              {sub.subheading && (
                                <h3 className={`text-lg font-bold mb-3 ${isLight ? "text-slate-800" : "text-white"}`}>
                                  {sub.subheading}
                                </h3>
                              )}
                              {sub.text && (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: sub.text.includes("<")
                                      ? sub.text
                                      : sub.text.split("\n").filter(l => l.trim()).map(l => `<p>${l}</p>`).join("")
                                  }}
                                />
                              )}
                              {sub.listItems && sub.listItems.length > 0 && (
                                <ul className="list-disc pl-6 space-y-2 marker:text-brand-accent ml-4 my-4">
                                  {sub.listItems.map((item, i) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                                  ))}
                                </ul>
                              )}
                              
                              {sub.metaLinking && (
                                <div
                                  className={`mt-4 p-4 rounded-lg border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/10"}`}
                                >
                                  <h4 className={`text-sm font-bold uppercase mb-2 ${isLight ? "text-slate-900" : "text-white"}`}>Meta Linking</h4>
                                  <div
                                    className="text-brand-accent underline underline-offset-4 font-semibold"
                                    dangerouslySetInnerHTML={{
                                      __html: sub.metaLinking.includes("<")
                                        ? sub.metaLinking
                                        : sub.metaLinking.split("\n").filter(l => l.trim()).map(l => `<p>${l}</p>`).join("")
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {section.image?.url && (
                        <img
                          src={section.image.url}
                          alt={section.image.alt || section.heading || "Blog image"}
                          className="w-full rounded-2xl my-8 shadow-lg"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* FAQs */}
              {blog.faqs && blog.faqs.length > 0 && (
                <div className="mt-16">
                  <h2 className={`text-2xl md:text-3xl font-display font-black uppercase tracking-tight mb-8 ${isLight ? "text-slate-900" : "text-white"}`}>
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {blog.faqs.map((faq, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-2xl border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/10"}`}
                      >
                        <h3 className={`text-lg font-bold mb-3 ${isLight ? "text-slate-900" : "text-white"}`}>
                          {faq.question}
                        </h3>
                        <div
                          className={`text-base leading-relaxed ${isLight ? "text-slate-600" : "text-slate-300"}`}
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
                className={`lg:hidden flex flex-col sm:flex-row items-center gap-4 rounded-2xl p-4 sm:p-5 border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/10"
                  }`}
              >
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-semibold text-sm mb-0.5 ${isLight ? "text-slate-900" : "text-white"
                      }`}
                  >
                    Ready to Scale?
                  </p>
                  <p
                    className={`text-xs leading-relaxed ${isLight ? "text-slate-500" : "text-white/50"
                      }`}
                  >
                    Partner with Inquisitive Digital to grow your brand.
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

              {/* Desktop sticky sidebar */}
              <div
                className={`hidden lg:block lg:sticky lg:top-32 rounded-2xl p-6 md:p-8 space-y-6 border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/10"
                  }`}
              >
                <h3
                  className={`text-xl font-display font-bold uppercase ${isLight ? "text-slate-900" : "text-white"
                    }`}
                >
                  Need a Marketing Partner?
                </h3>
                <p
                  className={`text-sm font-medium leading-relaxed ${isLight ? "text-slate-600" : "text-white/60"
                    }`}
                >
                  Book a discovery call to learn how our creative strategies can scale your brand
                  minus the fluff.
                </p>

                <div className="w-12 h-1 rounded-full bg-brand-accent" />

                <Link
                  href="/contact-us"
                  className="block w-full text-center px-6 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 bg-brand-accent text-slate-900 border-2 border-transparent hover:-translate-y-1"
                  style={{ boxShadow: isLight ? "6px 6px 0px 0px #000" : "6px 6px 0px 0px #f5c200" }}
                >
                  Book a Call
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
                    {[
                      { label: "Our Services", href: "/services" },
                      { label: "About Us", href: "/about-us" },
                      { label: "All Blogs", href: "/blogs" },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block text-sm transition-colors duration-200 text-brand-accent hover:text-brand-accent/80"
                      >
                        → {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="text-center pt-4">
                  <p
                    className={`text-xs font-bold uppercase mb-2 ${isLight ? "text-slate-500" : "text-white/40"
                      }`}
                  >
                    Or reach out via email
                  </p>
                  <a
                    href="mailto:info@inquisitivedigital.com"
                    className="text-sm font-bold transition-colors text-brand-accent hover:underline underline-offset-4"
                  >
                    info@inquisitivedigital.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Prev/Next Navigation */}
        {(prevBlog || nextBlog) && (
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
            <div
              className={`rounded-2xl p-6 md:p-8 border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/10"
                }`}
            >
              <div
                className={`flex flex-col md:flex-row gap-6 ${prevBlog && nextBlog ? "justify-between" : "justify-center"
                  }`}
              >
                {prevBlog && (
                  <Link
                    href={`/blogs/${prevBlog.slug}`}
                    className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 border ${isLight
                      ? "bg-white border-slate-200 hover:border-brand-accent hover:shadow-lg"
                      : "bg-white/5 border-white/10 hover:border-brand-accent hover:bg-brand-accent/5"
                      } ${prevBlog && nextBlog ? "md:w-[48%]" : "md:w-auto"}`}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 bg-brand-accent/10 group-hover:bg-brand-accent">
                      <ChevronLeft className="w-5 h-5 text-brand-accent group-hover:text-slate-900" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs font-bold uppercase tracking-wider mb-1 ${isLight ? "text-slate-400" : "text-white/40"
                          }`}
                      >
                        Previous
                      </p>
                      <h4
                        className={`font-bold text-sm md:text-base line-clamp-2 transition-colors ${isLight
                          ? "text-slate-900 group-hover:text-brand-accent"
                          : "text-white group-hover:text-brand-accent"
                          }`}
                      >
                        {prevBlog.title}
                      </h4>
                    </div>
                  </Link>
                )}

                {nextBlog && (
                  <Link
                    href={`/blogs/${nextBlog.slug}`}
                    className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 border ${isLight
                      ? "bg-white border-slate-200 hover:border-brand-accent hover:shadow-lg"
                      : "bg-white/5 border-white/10 hover:border-brand-accent hover:bg-brand-accent/5"
                      } ${prevBlog && nextBlog ? "md:w-[48%]" : "md:w-auto"}`}
                  >
                    <div className="flex-1 min-w-0 text-right">
                      <p
                        className={`text-xs font-bold uppercase tracking-wider mb-1 ${isLight ? "text-slate-400" : "text-white/40"
                          }`}
                      >
                        Next
                      </p>
                      <h4
                        className={`font-bold text-sm md:text-base line-clamp-2 transition-colors ${isLight
                          ? "text-slate-900 group-hover:text-brand-accent"
                          : "text-white group-hover:text-brand-accent"
                          }`}
                      >
                        {nextBlog.title}
                      </h4>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 bg-brand-accent/10 group-hover:bg-brand-accent">
                      <ChevronRight className="w-5 h-5 text-brand-accent group-hover:text-slate-900" />
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div
          className="py-16 md:py-24"
          style={{
            background: isLight
              ? "linear-gradient(180deg, #ffffff 0%, rgba(245, 194, 0, 0.05) 50%, #ffffff 100%)"
              : "linear-gradient(180deg, var(--color-background) 0%, rgba(245, 194, 0, 0.05) 50%, var(--color-background) 100%)",
          }}
        >
          <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-3xl md:text-5xl font-display font-black uppercase mb-6 ${isLight ? "text-slate-900" : "text-white"
                }`}
            >
              Read More <span className="text-brand-accent">Articles</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`font-semibold mb-10 ${isLight ? "text-slate-600" : "text-white/60"}`}
            >
              Explore more insights and strategies from Inquisitive Digital.
            </motion.p>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-slate-900"
            >
              View All Posts
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </main>
      <FloatingWhatsApp />
    </>
  );
}
