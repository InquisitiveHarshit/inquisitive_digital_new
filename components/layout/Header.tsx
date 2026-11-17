"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  Sparkles,
  Sun,
  Moon,
  Search,
  Share2,
  TrendingUp,
  Code,
  FileText,
  Palette,
  Database,
  ChevronRight,
  ChevronDown,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, ThemeMode } from "@/components/ThemeProvider";

interface SubServiceNav {
  _id?: string;
  title: string;
  slug: string;
  parentService?: string;
  category?: string;
  isActive?: boolean;
}

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { themeMode, setTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSubService, setActiveSubService] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [openMobileSub, setOpenMobileSub] = useState<string | null>(null);
  const [subServices, setSubServices] = useState<SubServiceNav[]>([]);

  const handleThemeSwitch = (mode: ThemeMode) => {
    setTheme(mode);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // Fetch sub-services dynamically from API to populate cascading navigation
  useEffect(() => {
    let isMounted = true;
    const fetchSubServices = async () => {
      try {
        const res = await fetch("/api/sub-services");
        if (res.ok) {
          const json = await res.json();
          if (isMounted && Array.isArray(json.data)) {
            setSubServices(json.data);
          }
        }
      } catch (err) {
        console.warn("Could not load sub-services for header nav:", err);
      }
    };
    fetchSubServices();
    return () => {
      isMounted = false;
    };
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Blogs", href: "/blogs" },
    { label: "About Us", href: "/about-us" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  const dropdownServices = [
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

  const isLight = themeMode === "singular-light";
  const isDarkSingular = themeMode === "singular-dark";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${isLight
        ? scrolled
          ? "bg-white/95 backdrop-blur-md border-slate-200/60 py-4 shadow-md"
          : "bg-white/90 backdrop-blur-sm border-transparent py-6"
        : isDarkSingular
          ? scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-md border-white/10 py-4 shadow-lg"
            : "bg-[#0a0a0a]/90 backdrop-blur-sm border-transparent py-6"
          : scrolled
            ? "bg-background/95 backdrop-blur-md border-outline-variant/30 py-4 shadow-lg"
            : "bg-background/90 backdrop-blur-sm border-transparent py-6"
        }`}
    >
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop flex justify-between items-center">
        <Link href="/" className="flex items-center group cursor-pointer relative z-10">
          <Image
            alt="Inquisitive Digital Logo"
            className={`h-14 w-auto aspect-[1080/480] object-cover transition-transform duration-300 ${isLight ? "scale-[1.15]" : ""}`}
            src={isLight ? "/logo_black_name.png" : "/logo_white_name.png"}
            width={240}
            height={64}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
          {/* Home Link */}
          <Link
            className={`font-body text-xs uppercase tracking-wider font-semibold transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] hover:after:w-full after:transition-all after:duration-300 ${isLight
              ? "text-slate-700 hover:text-brand-accent after:bg-brand-accent"
              : isDarkSingular
                ? "text-slate-300 hover:text-brand-accent after:bg-brand-accent"
                : "text-on-surface-variant hover:text-brand-accent after:bg-brand-accent"
              }`}
            href="/"
          >
            Home
          </Link>

          {/* Services Dropdown with Cascading Sub-Services */}
          <div
            className="relative py-2"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => {
              setDropdownOpen(false);
              setActiveSubService(null);
            }}
          >
            <Link
              href="/services"
              className={`font-body text-xs uppercase tracking-wider font-semibold transition-all duration-300 relative flex items-center gap-1.5 after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] hover:after:w-full after:transition-all after:duration-300 ${isLight
                ? "text-slate-700 hover:text-brand-accent after:bg-brand-accent"
                : isDarkSingular
                  ? "text-slate-300 hover:text-brand-accent after:bg-brand-accent"
                  : "text-on-surface-variant hover:text-brand-accent after:bg-brand-accent"
                }`}
            >
              Services
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </Link>

            {/* Dropdown Menu (Parent Services + Cascading Flyout) */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute left-0 mt-2 w-80 rounded-2xl border p-2 shadow-2xl z-50 transition-colors duration-300 ${isLight
                    ? "bg-white border-slate-100 text-slate-800"
                    : isDarkSingular
                      ? "bg-[#141414] border-white/10 text-white"
                      : "bg-surface border-outline-variant text-on-surface shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                    }`}
                >
                  <div className="grid grid-cols-1 gap-1">
                    {dropdownServices.map((service) => {
                      const Icon = service.icon;
                      const children = subServices.filter(
                        (sub) => sub.parentService === service.slug && sub.isActive !== false
                      );
                      const hasChildren = children.length > 0;
                      const isSubActive = activeSubService === service.slug;

                      return (
                        <div
                          key={service.slug}
                          className="relative"
                          onMouseEnter={() => {
                            if (hasChildren) {
                              setActiveSubService(service.slug);
                            } else {
                              setActiveSubService(null);
                            }
                          }}
                        >
                          <Link
                            href={service.href}
                            onClick={() => {
                              setDropdownOpen(false);
                              setActiveSubService(null);
                            }}
                            className={`flex items-center gap-3 p-2.5 rounded-xl text-left transition-all duration-200 group ${isSubActive
                              ? isLight
                                ? "bg-slate-100 text-brand-accent shadow-sm"
                                : isDarkSingular
                                  ? "bg-white/10 text-brand-accent shadow-sm"
                                  : "bg-brand-accent text-black"
                              : isLight
                                ? "hover:bg-slate-50 hover:text-brand-accent"
                                : isDarkSingular
                                  ? "hover:bg-white/5 hover:text-brand-accent"
                                  : "hover:bg-brand-accent hover:text-black"
                              }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${isLight ? "bg-slate-100 text-brand-accent" : "bg-white/5 text-brand-accent"
                                }`}
                            >
                              <Icon className="w-4 h-4 stroke-[2]" />
                            </div>
                            <div className="flex-1 min-w-0 pr-1">
                              <div className="text-[11px] font-display font-extrabold uppercase tracking-wider leading-none flex items-center gap-1.5">
                                <span className="truncate">{service.title}</span>
                                {hasChildren && (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-brand-accent/20 text-brand-accent font-bold leading-none shrink-0">
                                    {children.length}
                                  </span>
                                )}
                              </div>
                              <div
                                className={`text-[9px] mt-1 font-body font-medium line-clamp-1 ${isLight ? "text-slate-400" : "text-slate-500"
                                  }`}
                              >
                                {service.desc}
                              </div>
                            </div>
                            {hasChildren && (
                              <ChevronRight
                                className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isSubActive ? "text-brand-accent translate-x-0.5" : "text-white/40"
                                  }`}
                              />
                            )}
                          </Link>

                          {/* Cascading Sub-Services Flyout Menu */}
                          <AnimatePresence>
                            {hasChildren && isSubActive && (
                              <motion.div
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -6 }}
                                transition={{ duration: 0.18 }}
                                className="absolute left-full top-0 pl-1.5 w-80 z-[60]"
                              >
                                <div
                                  className={`max-h-[75vh] overflow-y-auto rounded-2xl border p-2.5 shadow-2xl backdrop-blur-md transition-colors duration-300 ${isLight
                                    ? "bg-white/98 border-slate-200 text-slate-800 shadow-xl"
                                    : isDarkSingular
                                      ? "bg-[#141414]/98 border-white/10 text-white shadow-2xl"
                                      : "bg-surface border-outline-variant text-on-surface shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                                    }`}
                                  style={{
                                    scrollbarWidth: "thin",
                                  }}
                                >
                                  {/* Flyout Header */}
                                  <div className="px-2 py-1.5 mb-1.5 border-b border-white/10 flex items-center justify-between">
                                    <span className="text-[10px] font-display font-bold uppercase tracking-widest text-brand-accent flex items-center gap-1.5">
                                      <Layers className="w-3 h-3 text-brand-accent" />
                                      {service.title}
                                    </span>
                                    <span className="text-[9px] text-white/50 font-mono font-medium">
                                      {children.length} {children.length === 1 ? "Sub-service" : "Sub-services"}
                                    </span>
                                  </div>

                                  {/* Sub-services Links */}
                                  <div className="flex flex-col gap-1">
                                    {children.map((child) => (
                                      <Link
                                        key={child.slug}
                                        href={`/sub-services/${child.slug}`}
                                        onClick={() => {
                                          setDropdownOpen(false);
                                          setActiveSubService(null);
                                        }}
                                        className={`flex items-start gap-2.5 p-2 rounded-xl text-left transition-all duration-200 group/sub ${isLight
                                          ? "hover:bg-slate-50 hover:text-brand-accent"
                                          : isDarkSingular
                                            ? "hover:bg-white/5 hover:text-brand-accent"
                                            : "hover:bg-brand-accent/20 hover:text-brand-accent"
                                          }`}
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0 mt-1.5 group-hover/sub:scale-125 transition-transform" />
                                        <div className="flex-1 min-w-0">
                                          <div className="text-[11px] font-medium leading-snug text-on-surface line-clamp-2 group-hover/sub:text-brand-accent transition-colors">
                                            {child.title}
                                          </div>
                                          {child.category && (
                                            <span className="text-[8px] uppercase tracking-wider opacity-60 block mt-0.5 font-bold text-brand-accent">
                                              {child.category}
                                            </span>
                                          )}
                                        </div>
                                      </Link>
                                    ))}
                                  </div>

                                  {/* Direct link to main service page */}
                                  <div className="pt-2 mt-2 border-t border-white/10 px-2">
                                    <Link
                                      href={service.href}
                                      onClick={() => {
                                        setDropdownOpen(false);
                                        setActiveSubService(null);
                                      }}
                                      className="text-[10px] font-display font-bold uppercase tracking-wider text-brand-accent hover:underline flex items-center justify-between"
                                    >
                                      <span>View {service.title} Overview →</span>
                                    </Link>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Other Nav Links */}
          {navLinks
            .filter((link) => link.label !== "Services" && link.label !== "Home")
            .map((link) => (
              <Link
                key={link.label}
                className={`font-body text-xs uppercase tracking-wider font-semibold transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] hover:after:w-full after:transition-all after:duration-300 ${isLight
                  ? "text-slate-700 hover:text-brand-accent after:bg-brand-accent"
                  : isDarkSingular
                    ? "text-slate-300 hover:text-brand-accent after:bg-brand-accent"
                    : "text-on-surface-variant hover:text-brand-accent after:bg-brand-accent"
                  }`}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
        </nav>

        {/* Actions & Theme Switcher */}
        <div className="flex items-center gap-4 relative z-20">
          {/* Dynamic Theme Switcher (Icon-only) */}
          <div
            className={`flex items-center rounded-full p-0.5 border transition-all duration-300 ${isLight
              ? "bg-slate-100 border-slate-200"
              : "bg-black/40 backdrop-blur-md border-white/10"
              }`}
          >
            <button
              onClick={() => handleThemeSwitch("singular-light")}
              className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${themeMode === "singular-light"
                ? "bg-white text-black border border-slate-200 shadow-sm"
                : isLight
                  ? "text-slate-400 hover:text-slate-700"
                  : "text-white/50 hover:text-white"
                }`}
              title="Light Mode"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleThemeSwitch("singular-dark")}
              className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${themeMode === "singular-dark"
                ? "bg-brand-accent text-black border border-brand-accent shadow-sm"
                : isLight
                  ? "text-slate-400 hover:text-slate-700"
                  : "text-white/50 hover:text-white"
                }`}
              title="Dark Mode"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Contact Us Button */}
          <div className="hidden lg:flex flex-col items-center gap-1.5">
            <Link
              href="/audit-form"
              className={`inline-flex items-center justify-center font-body font-extrabold uppercase tracking-wider text-[11px] py-2.5 px-6 transition-all duration-300 select-none cursor-pointer border-2 hover:scale-[1.03] ${isLight
                ? "bg-brand-accent text-black border-black hover:bg-black hover:text-brand-accent hover:border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] rounded-full"
                : isDarkSingular
                  ? "bg-brand-accent text-black border-brand-accent hover:bg-white hover:text-black hover:border-white shadow-[3px_3px_0px_rgba(255,255,255,0.2)] rounded-full"
                  : "bg-brand-accent text-background hover:bg-white border-brand-accent hover:border-white rounded-sm shadow-[0_4px_16px_rgba(245,194,0,0.18)]"
                }`}
            >
              Free Audit Form
            </Link>
            <a
              href="tel:+917310777430"
              className={`text-[10px] font-body font-bold hover:underline ${isLight ? "text-slate-600" : "text-slate-400"
                }`}
            >
              +91 7310 777 430
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 transition-colors focus:outline-none ${isLight
              ? "text-slate-800 hover:text-brand-accent"
              : isDarkSingular
                ? "text-white hover:text-brand-accent"
                : "text-on-surface hover:text-brand-accent"
              }`}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div
          className={`lg:hidden fixed top-[81px] left-0 w-full h-[calc(100vh-81px)] overflow-y-auto z-40 flex flex-col items-center justify-start gap-6 py-10 px-6 transition-all duration-300 border-t ${isLight
            ? "bg-white/98 backdrop-blur-lg border-slate-100 text-slate-900"
            : isDarkSingular
              ? "bg-[#0a0a0a]/98 backdrop-blur-lg border-white/10 text-white"
              : "bg-background/98 backdrop-blur-lg border-outline-variant/30 text-on-surface"
            }`}
        >
          {/* Home Link */}
          <Link
            className={`font-body text-lg uppercase tracking-wider font-semibold transition-colors duration-300 ${isLight
              ? "text-slate-800 hover:text-brand-accent"
              : isDarkSingular
                ? "text-white hover:text-brand-accent"
                : "text-on-surface hover:text-brand-accent"
              }`}
            href="/"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>

          {/* Services Accordion with Cascading Sub-Services */}
          <div className="w-full flex flex-col items-center max-w-sm">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className={`flex items-center gap-2 font-body text-lg uppercase tracking-wider font-semibold transition-colors duration-300 ${isLight
                ? "text-slate-800 hover:text-brand-accent"
                : isDarkSingular
                  ? "text-white hover:text-brand-accent"
                  : "text-on-surface hover:text-brand-accent"
                }`}
            >
              Services
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Collapsible Mobile Sub-Services */}
            <AnimatePresence>
              {mobileServicesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex flex-col gap-2 mt-3 w-full items-stretch overflow-hidden"
                >
                  {dropdownServices.map((service) => {
                    const children = subServices.filter(
                      (sub) => sub.parentService === service.slug && sub.isActive !== false
                    );
                    const hasChildren = children.length > 0;
                    const isExpanded = openMobileSub === service.slug;

                    return (
                      <div
                        key={service.slug}
                        className={`w-full rounded-xl p-2 transition-colors border ${isLight ? "border-slate-100 bg-slate-50/50" : "border-white/5 bg-white/[0.02]"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <Link
                            href={service.href}
                            onClick={() => setIsOpen(false)}
                            className={`text-xs font-body font-bold uppercase tracking-wide transition-colors ${isLight
                              ? "text-slate-800 hover:text-brand-accent"
                              : "text-white hover:text-brand-accent"
                              }`}
                          >
                            {service.title}
                          </Link>
                          {hasChildren && (
                            <button
                              onClick={() => setOpenMobileSub(isExpanded ? null : service.slug)}
                              className="p-1.5 text-brand-accent flex items-center gap-1"
                              aria-label="Toggle sub-services"
                            >
                              <span className="text-[10px] font-bold bg-brand-accent/20 px-1.5 py-0.5 rounded-full">
                                {children.length}
                              </span>
                              <ChevronDown
                                className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
                                  }`}
                              />
                            </button>
                          )}
                        </div>

                        {/* Collapsible Children in Mobile */}
                        <AnimatePresence>
                          {hasChildren && isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="pl-3 pt-2 pb-1 flex flex-col gap-2 border-l-2 border-brand-accent/40 my-1 ml-1"
                            >
                              {children.map((child) => (
                                <Link
                                  key={child.slug}
                                  href={`/sub-services/${child.slug}`}
                                  onClick={() => setIsOpen(false)}
                                  className={`text-xs font-body transition-colors leading-snug flex items-center gap-2 ${isLight
                                    ? "text-slate-600 hover:text-brand-accent"
                                    : "text-slate-400 hover:text-brand-accent"
                                    }`}
                                >
                                  <span className="w-1 h-1 rounded-full bg-brand-accent shrink-0" />
                                  <span>{child.title}</span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                  <Link
                    href="/services"
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-body uppercase tracking-wide font-extrabold text-brand-accent mt-2 text-center"
                  >
                    View All Services →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Other Nav links */}
          {navLinks
            .filter((link) => link.label !== "Services" && link.label !== "Home")
            .map((link) => (
              <Link
                key={link.label}
                className={`font-body text-lg uppercase tracking-wider font-semibold transition-colors duration-300 ${isLight
                  ? "text-slate-800 hover:text-brand-accent"
                  : isDarkSingular
                    ? "text-white hover:text-brand-accent"
                    : "text-on-surface hover:text-brand-accent"
                  }`}
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

          <div className="mt-4 flex flex-col items-center gap-2 w-full max-w-sm">
            <Link
              href="/audit-form"
              onClick={() => setIsOpen(false)}
              className={`inline-flex items-center justify-center font-body font-extrabold uppercase tracking-wider text-xs py-3.5 px-8 transition-all duration-300 select-none cursor-pointer border-2 hover:scale-[1.02] w-full text-center ${isLight
                ? "bg-brand-accent text-black border-black hover:bg-black hover:text-brand-accent hover:border-brand-accent shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-full"
                : isDarkSingular
                  ? "bg-brand-accent text-black border-brand-accent hover:bg-white hover:text-black hover:border-white shadow-[4px_4px_0px_rgba(255,255,255,0.2)] rounded-full"
                  : "bg-brand-accent text-background hover:bg-white border-brand-accent hover:border-white rounded-sm shadow-[0_6px_20px_rgba(245,194,0,0.2)]"
                }`}
            >
              Free Audit Form
            </Link>
            <a
              href="tel:+917310777430"
              className={`text-xs font-body font-bold hover:underline ${isLight ? "text-slate-600" : "text-slate-400"
                }`}
            >
              +91 7310 777 430
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
