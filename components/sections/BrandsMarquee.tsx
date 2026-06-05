"use client";

import React from "react";
import { useTheme } from "@/components/ThemeProvider";

const brandLogos = [
  "https://res.cloudinary.com/dvdfhripy/image/upload/v1754642365/Artboard_1_ud0l5b.png",
  "https://res.cloudinary.com/dvdfhripy/image/upload/v1754642366/Artboard_4_caj7e3.png",
  "https://res.cloudinary.com/dvdfhripy/image/upload/v1754642366/Artboard_5_plsdqq.png",
  "https://res.cloudinary.com/dvdfhripy/image/upload/v1754642366/Artboard_6_frgwse.png",
  "https://res.cloudinary.com/dvdfhripy/image/upload/v1754642367/Artboard_7_ecfuil.png",
  "https://res.cloudinary.com/dvdfhripy/image/upload/v1754642366/Artboard_8_xd1zcj.png",
  "https://res.cloudinary.com/dvdfhripy/image/upload/v1754642367/Artboard_9_te6hzo.png",
  "https://res.cloudinary.com/dvdfhripy/image/upload/v1754642367/Artboard_10_l3rzqr.png",
  "https://res.cloudinary.com/dvdfhripy/image/upload/v1754642367/Artboard_11_dcyxu0.png",
  "https://res.cloudinary.com/dzvwqhzgf/image/upload/v1755779421/the_grreenish_affairss_f1tfml.png",
  "https://res.cloudinary.com/dzvwqhzgf/image/upload/v1755779421/deconique_tr850g.png",
  "https://res.cloudinary.com/dzvwqhzgf/image/upload/v1756206171/12_wznxog.png",
  "https://res.cloudinary.com/dzvwqhzgf/image/upload/v1756205791/13_qmfmse.png",
  "https://res.cloudinary.com/dzvwqhzgf/image/upload/v1755779420/sikka_utsayt.png",
  "https://res.cloudinary.com/dzvwqhzgf/image/upload/v1755779420/godrej_majesty_akfmng.png",
  "https://res.cloudinary.com/dzvwqhzgf/image/upload/v1755779421/geogress_lrcpsz.png",
  "https://res.cloudinary.com/dzvwqhzgf/image/upload/v1755779420/kuchipoo_czebmy.png",
  "https://res.cloudinary.com/dzvwqhzgf/image/upload/v1755779420/JK_hcwhzz.png"
];

export const BrandsMarquee: React.FC = () => {
  const { themeMode } = useTheme();
  
  return (
    <section className={`py-16 border-b overflow-hidden relative ${themeMode === "singular-dark" ? "bg-[#0a0a0a] border-white/10" : themeMode === "singular-light" ? "bg-slate-50 border-slate-200" : "bg-[#111111] border-white/5"}`}>
      <div className="max-w-container-max mx-auto px-6 mb-10 text-center">
        <p className={`text-sm sm:text-base font-bold uppercase tracking-[0.2em] ${themeMode === "singular-dark" || themeMode === "brutalist" ? "text-slate-400" : "text-slate-500"}`}>
          Trusted By Industry Leaders
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex">
        {/* Gradient Masks for fading edges */}
        <div className={`absolute top-0 left-0 w-24 sm:w-40 h-full z-10 pointer-events-none ${themeMode === "singular-dark" ? "bg-gradient-to-r from-[#0a0a0a] to-transparent" : themeMode === "singular-light" ? "bg-gradient-to-r from-slate-50 to-transparent" : "bg-gradient-to-r from-[#111111] to-transparent"}`}></div>
        <div className={`absolute top-0 right-0 w-24 sm:w-40 h-full z-10 pointer-events-none ${themeMode === "singular-dark" ? "bg-gradient-to-l from-[#0a0a0a] to-transparent" : themeMode === "singular-light" ? "bg-gradient-to-l from-slate-50 to-transparent" : "bg-gradient-to-l from-[#111111] to-transparent"}`}></div>
        
        {/* Scrolling Track */}
        <div className="flex w-max animate-[marquee_50s_linear_infinite] hover:[animation-play-state:paused]">
          {[...brandLogos, ...brandLogos].map((logo, idx) => (
            <div key={idx} className="flex items-center justify-center w-[120px] sm:w-[160px] mx-6 sm:mx-10 shrink-0 group">
              <img 
                src={logo} 
                alt="Brand Partner Logo" 
                className={`w-full max-h-[70px] object-contain transition-all duration-300 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 ${themeMode === "singular-dark" || themeMode === "brutalist" ? "brightness-[2] group-hover:brightness-100" : ""}`}
                loading="lazy" 
              />
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
};
