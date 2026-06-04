"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";
import { MapPin, Phone } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Footer: React.FC = () => {
  const { themeMode } = useTheme();
  const isLight = themeMode === "singular-light";
  const isDark = themeMode === "singular-dark";

  const linkClass = `font-body text-sm transition-colors duration-200 ${isLight ? "text-slate-600 hover:text-brand-accent" : "text-slate-400 hover:text-brand-accent"
    }`;

  const headingClass = `font-display text-[10px] uppercase tracking-[0.2em] font-bold mb-5 pb-3 border-b ${isLight
    ? "text-slate-900 border-slate-200"
    : "text-white border-white/10"
    }`;

  return (
    <footer
      className={`w-full border-t transition-colors duration-300 ${isLight
        ? "bg-white border-slate-100"
        : isDark
          ? "bg-[#080808] border-white/10"
          : "bg-background border-outline-variant/30"
        }`}
    >
      {/* Main Footer Grid */}
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop py-16 md:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

        {/* Column 1 – Brand */}
        <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-1">
          <a href="/" className="flex items-center cursor-pointer">
            <Image
              alt="Inquisitive Digital Logo"
              className={`w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] origin-left ${isLight ? "h-20 scale-[2]" : "h-14 scale-[0.8]"}`}
              src={isLight ? "/logo_black_name.png" : "/logo_white_name.png"}
              width={240}
              height={100}
            />
          </a>
          <p className={`font-body text-sm leading-relaxed max-w-xs ${isLight ? "text-slate-500" : "text-slate-400"}`}>
            If you want cute, hire a puppy. If you want <span className="text-brand-accent font-bold">GROWTH</span>, hire us. Data, tech, and a healthy dose of curiosity.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-2">
            <a
              href="https://www.instagram.com/inquisitivedigital"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 hover:border-brand-accent hover:text-brand-accent ${isLight ? "border-slate-200 text-slate-500" : "border-white/10 text-slate-400"
                }`}
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/company/inquisitive-digital/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 hover:border-brand-accent hover:text-brand-accent ${isLight ? "border-slate-200 text-slate-500" : "border-white/10 text-slate-400"
                }`}
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2 – Services */}
        <div className="flex flex-col">
          <h4 className={headingClass}>Our Services</h4>
          <div className="flex flex-col gap-3">
            <a className={linkClass} href="/services/seo">SEO / AEO / GEO</a>
            <a className={linkClass} href="/services/performance-marketing">Performance Marketing</a>
            <a className={linkClass} href="/services/social-media">Social Media Marketing</a>
            <a className={linkClass} href="/services/web-development">Web Development</a>
            <a className={linkClass} href="/services/content-writing">Content Marketing</a>
          </div>
        </div>

        {/* Column 3 – Company */}
        <div className="flex flex-col">
          <h4 className={headingClass}>Company</h4>
          <div className="flex flex-col gap-3">
            <a className={linkClass} href="/about-us">About Us</a>
            <a className={linkClass} href="/careers">Careers</a>
            <a className={linkClass} href="/contact-us">Contact Us</a>
            <a className={linkClass} href="/blogs">Blog</a>
          </div>
        </div>

        {/* Column 4 – Contact */}
        <div className="flex flex-col">
          <h4 className={headingClass}>Contact</h4>
          <div className="flex flex-col gap-5">

            {/* Address */}
            <div className="flex gap-3">
              <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
              <p className={`font-body text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                Suite 001, H-36, Sector 63,<br />
                Noida, Uttar Pradesh 201301
              </p>
            </div>

            {/* Phone */}
            <a
              href="tel:+917310777430"
              className={`flex gap-3 items-center font-body text-sm transition-colors hover:text-brand-accent ${isLight ? "text-slate-600" : "text-slate-400"}`}
            >
              <Phone className="w-4 h-4 text-brand-accent shrink-0" />
              +91-7310-777-430
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/inquisitivedigital"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex gap-3 items-center font-body text-sm transition-colors hover:text-brand-accent ${isLight ? "text-slate-600" : "text-slate-400"}`}
            >
              <InstagramIcon className="w-4 h-4 text-brand-accent shrink-0" />
              @inquisitivedigital
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/inquisitive-digital/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex gap-3 items-center font-body text-sm transition-colors hover:text-brand-accent ${isLight ? "text-slate-600" : "text-slate-400"}`}
            >
              <LinkedinIcon className="w-4 h-4 text-brand-accent shrink-0" />
              Inquisitive Digital
            </a>

          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className={`border-t ${isLight ? "border-slate-100" : "border-white/5"}`}>
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className={`font-body text-xs ${isLight ? "text-slate-400" : "text-slate-600"}`}>
            © {new Date().getFullYear()} Inquisitive Digital. All rights reserved.
          </p>
          <p className={`font-body text-xs ${isLight ? "text-slate-400" : "text-slate-600"}`}>
            Built with ❤️ in Noida, India.
          </p>
        </div>
      </div>
    </footer>
  );
};
