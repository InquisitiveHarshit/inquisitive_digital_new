"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

interface BlogCardProps {
  slug: string;
  date: string;
  readTime: string;
  category: string;
  title: string;
  desc: string;
  image: string;
  delay?: number;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  slug,
  date,
  readTime,
  category,
  title,
  desc,
  image,
  delay = 0,
}) => {
  const { themeMode } = useTheme();
  const isLight = themeMode === "singular-light";

  return (
    <Link href={`/blogs/${slug}`} className="block h-full">
      <motion.article
        className={`${isLight ? "bg-white border-slate-200" : "bg-[#111111] border-[#2a2a2a]"} rounded-xl border-2 overflow-hidden flex flex-col group cursor-pointer shadow-[8px_8px_0px_0px_#f5c200] hover:shadow-[12px_12px_0px_0px_#f5c200] hover:-translate-y-1 hover:-translate-x-1 h-full transition-all duration-300`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
      >
        {/* Card Image */}
        <div className="w-full h-[35%] min-h-[240px] overflow-hidden relative flex-shrink-0 bg-[#1a1a1a]">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
          {image && (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
        </div>

        {/* Card Content */}
        <div className="p-6 md:p-8 flex flex-col flex-grow">
          {/* Meta Row */}
          <div className={`flex justify-between items-center mb-5 text-xs font-medium ${isLight ? "text-slate-600" : "text-[#d2c5ab]"}`}>
            <span className={`${isLight ? "bg-slate-100 text-slate-700" : "bg-[#222222] text-[#e5e2e1]"} px-3 py-1.5 rounded-full uppercase tracking-wider text-[10px]`}>
              {category}
            </span>
            <span>{readTime}</span>
          </div>

          {/* Title */}
          <h3 className={`font-display text-xl font-bold uppercase mb-3 leading-snug group-hover:text-brand-accent transition-colors duration-300 line-clamp-2 ${isLight ? "text-slate-900" : "text-[#e5e2e1]"}`}>
            {title}
          </h3>

          {/* Short Desc */}
          <p className={`font-body text-sm leading-relaxed mb-8 flex-grow line-clamp-3 ${isLight ? "text-slate-600" : "text-[#d2c5ab]"}`}>
            {desc}
          </p>

          {/* Footer / Action */}
          <div className={`flex justify-between items-center pt-5 border-t text-sm mt-auto ${isLight ? "border-slate-200" : "border-[#2a2a2a]"}`}>
            <span className={isLight ? "text-slate-600" : "text-[#d2c5ab]"}>{date}</span>
            <span className="text-brand-accent uppercase tracking-wider font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
              READ MORE <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};
