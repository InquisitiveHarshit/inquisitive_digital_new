"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";

export const Footer: React.FC = () => {
  const { themeMode } = useTheme();
  const isLight = themeMode === "singular-light";
  return (
    <footer className="bg-background w-full border-t border-outline-variant/30 py-20 px-6 md:px-margin-desktop">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Info Column */}
        <div className="md:col-span-5 flex flex-col gap-8">
          <a href="/" className="flex items-center group cursor-pointer animate-pulse-subtle">
            <Image
              alt="Inquisitive Digital Logo"
              className="h-25 w-auto object-contain group-hover:scale-[1.03] transition-transform duration-300"
              src={isLight ? "/logo_black_name.png" : "/logo_white_name.png"}
              width={240}
              height={100}
            />
          </a>
          <p className="font-body text-on-surface-variant max-w-md text-base leading-relaxed">
            Engineered growth for ambitious brands. Brutally honest data, uncompromising execution.
          </p>
          <div className="mt-auto font-display text-xs text-on-surface-variant uppercase tracking-widest pt-12 md:pt-0">
            © {new Date().getFullYear()} Inquisitive Digital. All rights reserved.
          </div>
        </div>

        {/* Links Column */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-16 mt-12 md:mt-0">
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-xs text-brand-accent uppercase border-b border-outline-variant/30 pb-4 mb-2 tracking-widest">
              Expertise
            </h4>
            <a className="font-body text-on-surface-variant hover:text-brand-accent transition-colors text-base" href="/services#seo">
              SEO (Search Engine Optimization)
            </a>
            <a className="font-body text-on-surface-variant hover:text-brand-accent transition-colors text-base" href="/services#performance-marketing">
              SEM & PPC Ads
            </a>
            <a className="font-body text-on-surface-variant hover:text-brand-accent transition-colors text-base" href="/services#content-writing">
              Content Marketing
            </a>
            <a className="font-body text-on-surface-variant hover:text-brand-accent transition-colors text-base" href="/services#social-media">
              Social Media Strategy
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-display text-xs text-brand-accent uppercase border-b border-outline-variant/30 pb-4 mb-2 tracking-widest">
              Company
            </h4>
            <a className="font-body text-on-surface-variant hover:text-brand-accent transition-colors text-base" href="/privacy">
              Privacy Policy
            </a>
            <div className="font-body text-on-surface-variant mt-4 text-base">
              <strong className="text-on-surface block mb-2 font-bold tracking-widest uppercase text-xs">
                HQ
              </strong>
              Noida Office: Sector 62, Noida, UP
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
