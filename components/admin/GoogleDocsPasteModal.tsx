"use client";

import React, { useState } from "react";
import { X, Zap, Eye, Code2, ArrowRight, ChevronDown, ChevronUp, Info } from "lucide-react";

interface GoogleDocsPasteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onParse: (html: string) => void;
}

type Step = "paste" | "preview";

const HTML_RULES = [
  {
    tag: "<h1>",
    mapsTo: "Title",
    example: "<h1>Mercedes E Class Chauffeur London</h1>",
    note: "Only one H1. Used as the blog title.",
  },
  {
    tag: "<p> (before first H2)",
    mapsTo: "Intro Paragraph",
    example: "<p>Welcome to our service...</p>",
    note: "All paragraphs before the first H2 are merged into the intro.",
  },
  {
    tag: "<h2>",
    mapsTo: "New Section (Heading)",
    example: "<h2>Our Airport Transfer Service</h2>",
    note: "Each H2 creates a new content section.",
  },
  {
    tag: "<p> (after an H2)",
    mapsTo: "Section Paragraph Text",
    example: "<p>We cover all major airports...</p>",
    note: "Consecutive paragraphs are merged into one section text.",
  },
  {
    tag: "<h3>",
    mapsTo: "Subsection (inside a Section)",
    example: "<h3>Heathrow Transfers</h3>",
    note: "H3s inside a section become subsections.",
  },
  {
    tag: "<ul> / <ol>",
    mapsTo: "Bullet List Items",
    example: "<ul><li>Heathrow</li><li>Gatwick</li></ul>",
    note: "List items attach to the nearest section or subsection above.",
  },
  {
    tag: '<h2 id="faq">',
    mapsTo: "FAQ Section",
    example: "<h2>Frequently Asked Questions</h2>",
    note: 'Any H2 containing "FAQ" or "Frequently Asked Questions" triggers FAQ mode.',
  },
  {
    tag: "<h3> (inside FAQ section)",
    mapsTo: "FAQ Question",
    example: "<h3>Do you offer 24/7 service?</h3>",
    note: "Each H3 after the FAQ heading becomes a new FAQ question.",
  },
  {
    tag: "<p> (inside FAQ section)",
    mapsTo: "FAQ Answer",
    example: "<p>Yes, we are available around the clock.</p>",
    note: "Paragraphs after each FAQ H3 become the answer.",
  },
  {
    tag: "Title:- ...",
    mapsTo: "Title (inline format)",
    example: "<p>Title:- My Blog Post Title</p>",
    note: 'Inline format. Use "Field:- Value" on a single line.',
  },
  {
    tag: "Description:- ...",
    mapsTo: "SEO Meta Description",
    example: "<p>Description:- Book a Mercedes...</p>",
    note: null,
  },
  {
    tag: "Primary Keyword:- ...",
    mapsTo: "SEO Meta Title (if not set)",
    example: "<p>Primary Keyword:- Mercedes E Class London</p>",
    note: null,
  },
  {
    tag: "Category:- ...",
    mapsTo: "Category",
    example: "<p>Category:- Chauffeur Services</p>",
    note: null,
  },
  {
    tag: "Author:- ...",
    mapsTo: "Author",
    example: "<p>Author:- JK Chauffeurs Team</p>",
    note: null,
  },
];

export default function GoogleDocsPasteModal({
  isOpen,
  onClose,
  onParse,
}: GoogleDocsPasteModalProps) {
  const [inputHtml, setInputHtml] = useState("");
  const [step, setStep] = useState<Step>("paste");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showRules, setShowRules] = useState(false);

  if (!isOpen) return null;

  const handleContinue = () => {
    const trimmed = inputHtml.trim();
    if (!trimmed) {
      setErrorMsg("Please paste some HTML content before continuing.");
      return;
    }
    setErrorMsg(null);
    setStep("preview");
  };

  const handlePopulate = () => {
    onParse(inputHtml.trim());
    handleClose();
  };

  const handleClose = () => {
    setInputHtml("");
    setErrorMsg(null);
    setStep("paste");
    setShowRules(false);
    onClose();
  };

  const handleBack = () => setStep("paste");

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />

      <div
        className="relative bg-[#0d0d0d] border border-white/10 rounded-2xl w-full max-w-5xl shadow-2xl z-10 flex flex-col"
        style={{ height: "90vh" }}
      >
        {/* ── HEADER ── */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 shrink-0">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-display font-black uppercase tracking-tight text-white">
              {step === "paste" ? "Paste HTML Content" : "Preview & Confirm"}
            </h3>
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
              <span className={`px-2.5 py-1 rounded-full transition-colors ${step === "paste" ? "bg-brand-accent text-slate-900" : "bg-white/10 text-white/40"}`}>
                1. Paste
              </span>
              <ArrowRight className="w-3 h-3 text-white/30" />
              <span className={`px-2.5 py-1 rounded-full transition-colors ${step === "preview" ? "bg-brand-accent text-slate-900" : "bg-white/10 text-white/40"}`}>
                2. Preview & Confirm
              </span>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ══════════ STEP 1: PASTE ══════════ */}
        {step === "paste" && (
          <>
            <div className="px-6 pt-4 shrink-0 space-y-3">

              {/* How to get HTML */}
              <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-xl p-4 text-xs text-white/60 space-y-1">
                <p className="font-bold text-brand-accent uppercase tracking-wider text-[10px]">How to get HTML from Google Docs</p>
                <p>Go to <strong className="text-white">File → Download → Web Page (.html, zipped)</strong> → Unzip → open the <code className="bg-white/10 px-1 rounded">.html</code> in Notepad → Select All → Copy → Paste below.</p>
              </div>

              {/* Collapsible Rules */}
              <button
                type="button"
                onClick={() => setShowRules((v) => !v)}
                className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white hover:bg-white/8 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-brand-accent" />
                  HTML Structure Rules — what maps to what?
                </span>
                {showRules ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showRules && (
                <div className="bg-black/60 border border-white/10 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto max-h-64 overflow-y-auto">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-white/40">
                          <th className="text-left px-4 py-2.5 font-bold w-[28%]">HTML Tag / Format</th>
                          <th className="text-left px-4 py-2.5 font-bold w-[18%]">Maps To</th>
                          <th className="text-left px-4 py-2.5 font-bold w-[30%]">Example</th>
                          <th className="text-left px-4 py-2.5 font-bold w-[24%]">Note</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {HTML_RULES.map((r, i) => (
                          <tr key={i} className="hover:bg-white/3 transition-colors">
                            <td className="px-4 py-2.5">
                              <code className="bg-brand-accent/10 text-brand-accent px-1.5 py-0.5 rounded text-[10px] font-mono">
                                {r.tag}
                              </code>
                            </td>
                            <td className="px-4 py-2.5 font-bold text-white/80">{r.mapsTo}</td>
                            <td className="px-4 py-2.5">
                              <code className="text-white/40 font-mono text-[10px] break-all">{r.example}</code>
                            </td>
                            <td className="px-4 py-2.5 text-white/40">{r.note || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm font-semibold">
                  {errorMsg}
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col px-6 pb-4 pt-3 min-h-0 gap-2">
              <div className="flex items-center gap-2 shrink-0">
                <Code2 className="w-4 h-4 text-brand-accent" />
                <label className="text-xs uppercase tracking-wider font-bold text-brand-accent">Paste HTML Here</label>
                {inputHtml && (
                  <span className="ml-auto text-xs text-white/30">{inputHtml.length.toLocaleString()} characters</span>
                )}
              </div>
              <textarea
                className="flex-1 bg-white/5 border border-white/20 rounded-xl p-4 text-sm text-white/80 font-mono focus:outline-none focus:border-brand-accent transition-colors resize-none leading-relaxed"
                placeholder={"<h1>Blog Title</h1>\n<p>Primary Keyword:- Mercedes E Class London</p>\n<p>Description:- Your meta description here...</p>\n<p>Intro paragraph text here...</p>\n\n<h2>First Section Heading</h2>\n<p>Section paragraph...</p>\n<ul>\n  <li>Bullet point one</li>\n  <li>Bullet point two</li>\n</ul>\n\n<h2>Frequently Asked Questions</h2>\n<h3>What is the price?</h3>\n<p>Prices start from £50.</p>"}
                value={inputHtml}
                onChange={(e) => setInputHtml(e.target.value)}
                spellCheck={false}
              />
            </div>

            <div className="border-t border-white/10 px-6 py-4 shrink-0 flex justify-end gap-3">
              <button onClick={handleClose} className="px-5 py-2.5 rounded-xl border border-white/10 text-white/60 font-bold text-xs uppercase hover:text-white hover:bg-white/5 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleContinue}
                disabled={!inputHtml.trim()}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/10 text-white font-display text-xs uppercase font-extrabold tracking-wider hover:bg-white/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue to Preview <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {/* ══════════ STEP 2: PREVIEW ══════════ */}
        {step === "preview" && (
          <>
            <div className="flex-1 min-h-0 flex flex-col md:flex-row">

              {/* Left: Raw HTML */}
              <div className="flex flex-col w-full md:w-2/5 border-r border-white/10 min-h-0">
                <div className="flex items-center gap-2 px-6 py-3 border-b border-white/5 shrink-0 bg-white/3">
                  <Code2 className="w-4 h-4 text-white/40" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white/40">Raw HTML</span>
                  <span className="ml-auto text-xs text-white/25">{inputHtml.length.toLocaleString()} chars</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <pre className="text-[11px] text-white/40 font-mono whitespace-pre-wrap break-all leading-relaxed">
                    {inputHtml}
                  </pre>
                </div>
              </div>

              {/* Right: Rendered Preview */}
              <div className="flex flex-col w-full md:w-3/5 min-h-0">
                <div className="flex items-center gap-2 px-6 py-3 border-b border-white/5 shrink-0">
                  <Eye className="w-4 h-4 text-brand-accent" />
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">Rendered Preview</span>
                  <span className="ml-auto text-xs text-white/30">Confirm this looks correct before populating</span>
                </div>
                <div className="flex-1 overflow-y-auto px-8 py-6">
                  <div
                    className="
                      max-w-none text-white/80
                      [&_h1]:text-2xl [&_h1]:font-black [&_h1]:text-white [&_h1]:mb-4 [&_h1]:mt-2 [&_h1]:leading-tight
                      [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-brand-accent [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:border-b [&_h2]:border-white/10 [&_h2]:pb-1
                      [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mb-2 [&_h3]:mt-5
                      [&_h4]:text-sm [&_h4]:font-semibold [&_h4]:text-white/80 [&_h4]:mb-1 [&_h4]:mt-4
                      [&_p]:text-white/70 [&_p]:mb-3 [&_p]:leading-relaxed [&_p]:text-sm
                      [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ul]:text-white/70 [&_ul]:text-sm
                      [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_ol]:text-white/70 [&_ol]:text-sm
                      [&_li]:mb-1
                      [&_strong]:text-white [&_strong]:font-bold
                      [&_em]:text-white/60 [&_em]:italic
                      [&_a]:text-brand-accent [&_a]:underline
                      [&_table]:w-full [&_table]:text-sm [&_table]:border-collapse [&_table]:mb-4
                      [&_td]:border [&_td]:border-white/10 [&_td]:p-2 [&_td]:text-white/60
                      [&_th]:border [&_th]:border-white/10 [&_th]:p-2 [&_th]:bg-white/10 [&_th]:font-bold [&_th]:text-white/80
                      [&_hr]:border-white/10 [&_hr]:my-4
                      [&_blockquote]:border-l-4 [&_blockquote]:border-brand-accent [&_blockquote]:pl-4 [&_blockquote]:text-white/50 [&_blockquote]:italic
                    "
                    dangerouslySetInnerHTML={{ __html: inputHtml }}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 px-6 py-4 shrink-0 flex items-center justify-between gap-3">
              <button onClick={handleBack} className="px-5 py-2.5 rounded-xl border border-white/10 text-white/60 font-bold text-xs uppercase hover:text-white hover:bg-white/5 transition-colors">
                ← Back & Edit
              </button>
              <button
                onClick={handlePopulate}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-accent text-slate-900 font-display text-xs uppercase font-extrabold tracking-wider hover:bg-white transition-all shadow-xl"
              >
                <Zap className="w-4 h-4" />
                Populate Blog Form
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
