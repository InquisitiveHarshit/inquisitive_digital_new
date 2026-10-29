"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  X,
  Check,
  Search,
  AlertTriangle,
  Loader2,
  ExternalLink,
  Layers,
  UploadCloud,
  ChevronDown,
  ChevronUp,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GoogleDocsPasteModal from "@/components/admin/GoogleDocsPasteModal";
import { parseGoogleDocsHtml } from "@/lib/utils/htmlParser";

const API_BASE = "";

/* ─── Types ─────────────────────────────────────────────────────────────────── */

interface SubServiceImage {
  url: string;
  alt: string;
  filename?: string;
}

interface SubServiceSubsection {
  subheading: string;
  text: string;
  listItems: string[];
  metaLinking?: string;
  image: SubServiceImage;
}

interface SubServiceSection {
  heading: string;
  subheading: string;
  text: string;
  listItems: string[];
  metaLinking?: string;
  image: SubServiceImage;
  subsections: SubServiceSubsection[];
}

interface SubServiceFAQ {
  question: string;
  answer: string;
  tag: string;
}

interface SubServiceItem {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  parentService?: string;
  intro?: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  sections?: SubServiceSection[];
  faqs?: SubServiceFAQ[];
  heroImage?: SubServiceImage;
  author?: string;
  seoTitle?: string;
  seoDescription?: string;
  script?: string;
  isActive: boolean;
  priority?: number;
  publishDate?: string;
  createdAt: string;
  updatedAt: string;
}

const DEFAULT_PARENT_SERVICES = [
  { slug: "seo-services", name: "SEO / AEO / GEO" },
  { slug: "social-media-marketing", name: "Social Media Marketing" },
  { slug: "performance-marketing", name: "Performance Marketing" },
  { slug: "web-development", name: "Web Design & Development" },
  { slug: "content-marketing", name: "Content Writing & Blogging" },
  { slug: "creative-services", name: "Graphic Design & Branding" },
];

/* ─── Component ─────────────────────────────────────────────────────────────── */

export default function SubServicesAdmin({ onSessionExpired }: { onSessionExpired?: () => void }) {
  // ── Data ──────────────────────────────────────────────────────────────────
  const [subServices, setSubServices] = useState<SubServiceItem[]>([]);
  const [parentServiceList, setParentServiceList] = useState<{ slug: string; name: string }[]>(DEFAULT_PARENT_SERVICES);
  const [loading, setLoading] = useState(true);

  // ── Filters ───────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [filterParent, setFilterParent] = useState("All");
  const [filterStatus, setFilterStatus] = useState<"All" | "active" | "draft">("All");

  // ── Drawer ────────────────────────────────────────────────────────────────
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SubServiceItem | null>(null);
  const [drawerLoading, setDrawerLoading] = useState(false);

  // ── Form State ────────────────────────────────────────────────────────────
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formParentService, setFormParentService] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formIntro, setFormIntro] = useState("");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formTags, setFormTags] = useState("");
  const [formAuthor, setFormAuthor] = useState("Inquisitive Digital");
  const [formIsActive, setFormIsActive] = useState(true);
  const [formPriority, setFormPriority] = useState(0);

  const [formHeroImage, setFormHeroImage] = useState<SubServiceImage>({ url: "", alt: "", filename: "" });
  const [formSections, setFormSections] = useState<SubServiceSection[]>([]);
  const [formFaqs, setFormFaqs] = useState<SubServiceFAQ[]>([]);

  // SEO
  const [formSeoTitle, setFormSeoTitle] = useState("");
  const [formSeoDesc, setFormSeoDesc] = useState("");
  const [formScript, setFormScript] = useState("");

  // Upload state
  const [uploadingImage, setUploadingImage] = useState(false);

  // Paste Modal
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);

  // Delete Confirm
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Toasts
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const notify = (type: "success" | "error", message: string) => {
    if (type === "success") {
      setSuccessMsg(message);
      setTimeout(() => setSuccessMsg(null), 4000);
    } else {
      setErrorMsg(message);
      setTimeout(() => setErrorMsg(null), 4000);
    }
  };

  /* ═══════════════════════════════════════════════════════════════════════════
     FETCH DATA
     ═══════════════════════════════════════════════════════════════════════ */

  useEffect(() => {
    fetchSubServices();
    fetchServicesList();
  }, []);

  const fetchServicesList = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/services`);
      if (res.ok) {
        const json = await res.json();
        const services = json.data || [];
        if (Array.isArray(services) && services.length > 0) {
          const mapped = services.map((s: any) => ({
            slug: s.slug || s._id,
            name: s.title || s.name || s.slug,
          }));
          setParentServiceList(mapped);
        }
      }
    } catch {
      // fallback to DEFAULT_PARENT_SERVICES
    }
  };

  const fetchSubServices = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/api/admin/sub-services`, {
        cache: "no-store",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.status === 401) {
        onSessionExpired?.();
        return;
      }
      if (res.ok) {
        const json = await res.json();
        setSubServices(json.data || []);
      }
    } catch {
      console.warn("Could not reach sub-service admin API.");
    } finally {
      setLoading(false);
    }
  };

  /* ═══════════════════════════════════════════════════════════════════════════
     FILTERING
     ═══════════════════════════════════════════════════════════════════════ */

  const uniqueParents = useMemo(() => {
    const list = Array.from(new Set(subServices.map((s) => s.parentService).filter(Boolean)));
    return list;
  }, [subServices]);

  const filteredSubServices = useMemo(() => {
    return subServices.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.slug && item.slug.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.parentService && item.parentService.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesParent = filterParent === "All" || item.parentService === filterParent;
      const matchesStatus =
        filterStatus === "All" ||
        (filterStatus === "active" && item.isActive) ||
        (filterStatus === "draft" && !item.isActive);
      return matchesSearch && matchesParent && matchesStatus;
    });
  }, [subServices, searchQuery, filterParent, filterStatus]);

  /* ═══════════════════════════════════════════════════════════════════════════
     DRAWER OPEN / CLOSE
     ═══════════════════════════════════════════════════════════════════════ */

  const openDrawer = async (item: SubServiceItem | null = null) => {
    if (item) {
      setEditingItem(item);
      setFormTitle(item.title || "");
      setFormSlug(item.slug || "");
      setFormParentService(item.parentService || "");
      setFormCategory(item.category || "");
      setFormIntro(item.intro || "");
      setFormExcerpt(item.excerpt || "");
      setFormTags((item.tags || []).join(", "));
      setFormAuthor(item.author || "Inquisitive Digital");
      setFormIsActive(item.isActive ?? true);
      setFormPriority(item.priority || 0);
      setFormHeroImage(item.heroImage || { url: "", alt: "", filename: "" });
      setFormSections([]);
      setFormFaqs([]);
      setFormSeoTitle(item.seoTitle || "");
      setFormSeoDesc(item.seoDescription || "");
      setFormScript(item.script || "");
      setIsDrawerOpen(true);

      const itemId = item._id || item.id;
      if (itemId) {
        setDrawerLoading(true);
        try {
          const token = localStorage.getItem("adminToken");
          const res = await fetch(`${API_BASE}/api/admin/sub-services/${itemId}`, {
            cache: "no-store",
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });
          if (res.ok) {
            const json = await res.json();
            const full = json.data;
            if (full) {
              setEditingItem(full);
              setFormSections(full.sections || []);
              setFormFaqs(full.faqs || []);
            }
          }
        } catch {
          // ignore
        } finally {
          setDrawerLoading(false);
        }
      }
    } else {
      setEditingItem(null);
      setFormTitle("");
      setFormSlug("");
      setFormParentService(parentServiceList[0]?.slug || "");
      setFormCategory("");
      setFormIntro("");
      setFormExcerpt("");
      setFormTags("");
      setFormAuthor("Inquisitive Digital");
      setFormIsActive(true);
      setFormPriority(0);
      setFormHeroImage({ url: "", alt: "", filename: "" });
      setFormSections([]);
      setFormFaqs([]);
      setFormSeoTitle("");
      setFormSeoDesc("");
      setFormScript("");
      setIsDrawerOpen(true);
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingItem(null);
    setDrawerLoading(false);
  };

  /* ═══════════════════════════════════════════════════════════════════════════
     GOOGLE DOCS PARSE & IMAGE UPLOAD
     ═══════════════════════════════════════════════════════════════════════ */

  const handleGoogleDocsParse = (html: string) => {
    const parsed = parseGoogleDocsHtml(html);

    if (parsed.title) setFormTitle(parsed.title);
    if (parsed.slug) setFormSlug(parsed.slug);
    if (parsed.category) setFormCategory(parsed.category);
    if (parsed.author) setFormAuthor(parsed.author);
    if (parsed.excerpt) setFormExcerpt(parsed.excerpt);
    if (parsed.seoTitle) setFormSeoTitle(parsed.seoTitle);
    if (parsed.seoDescription) setFormSeoDesc(parsed.seoDescription);

    if (parsed.intro) {
      setFormIntro((prev) => (prev ? prev + "\n\n" + parsed.intro : parsed.intro));
    }
    if (parsed.sections.length > 0) {
      setFormSections((prev) => [...prev, ...parsed.sections]);
    }
    if (parsed.faqs.length > 0) {
      setFormFaqs((prev) => [...prev, ...parsed.faqs]);
    }

    notify("success", "Successfully parsed sub-service content from Google Docs!");
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/api/admin/upload`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setFormHeroImage({ url: data.url, alt: formTitle, filename: data.public_id });
        notify("success", "Hero image uploaded successfully!");
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (err: any) {
      notify("error", err.message || "Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  /* ═══════════════════════════════════════════════════════════════════════════
     DYNAMIC SECTIONS & FAQS HANDLERS
     ═══════════════════════════════════════════════════════════════════════ */

  const addSection = () => {
    setFormSections([
      ...formSections,
      {
        heading: "",
        subheading: "",
        text: "",
        listItems: [],
        image: { url: "", alt: "" },
        subsections: [],
      },
    ]);
  };

  const removeSection = (idx: number) => {
    setFormSections(formSections.filter((_, i) => i !== idx));
  };

  const updateSection = (idx: number, field: keyof SubServiceSection, value: any) => {
    const updated = [...formSections];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormSections(updated);
  };

  const addSubsection = (sectionIdx: number) => {
    const updated = [...formSections];
    updated[sectionIdx].subsections.push({
      subheading: "",
      text: "",
      listItems: [],
      image: { url: "", alt: "" },
    });
    setFormSections(updated);
  };

  const updateSubsection = (
    sectionIdx: number,
    subIdx: number,
    field: keyof SubServiceSubsection,
    value: any
  ) => {
    const updated = [...formSections];
    updated[sectionIdx].subsections[subIdx] = {
      ...updated[sectionIdx].subsections[subIdx],
      [field]: value,
    };
    setFormSections(updated);
  };

  const removeSubsection = (sectionIdx: number, subIdx: number) => {
    const updated = [...formSections];
    updated[sectionIdx].subsections = updated[sectionIdx].subsections.filter(
      (_, i) => i !== subIdx
    );
    setFormSections(updated);
  };

  const addFaq = () => {
    setFormFaqs([...formFaqs, { question: "", answer: "", tag: "FAQ" }]);
  };

  const updateFaq = (idx: number, field: keyof SubServiceFAQ, value: string) => {
    const updated = [...formFaqs];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormFaqs(updated);
  };

  const removeFaq = (idx: number) => {
    setFormFaqs(formFaqs.filter((_, i) => i !== idx));
  };

  /* ═══════════════════════════════════════════════════════════════════════════
     CRUD
     ═══════════════════════════════════════════════════════════════════════ */

  const handleSaveSubService = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      notify("error", "Sub-service title is required.");
      return;
    }

    const payload = {
      title: formTitle.trim(),
      slug: formSlug.trim(),
      parentService: formParentService.trim(),
      category: formCategory.trim(),
      intro: formIntro.trim(),
      excerpt: formExcerpt.trim(),
      tags: formTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      heroImage: formHeroImage,
      sections: formSections.map((sec) => ({
        ...sec,
        listItems: sec.listItems ? sec.listItems.filter((item) => item.trim() !== "") : [],
        subsections: (sec.subsections || []).map((sub) => ({
          ...sub,
          listItems: sub.listItems ? sub.listItems.filter((item) => item.trim() !== "") : [],
        })),
      })),
      faqs: formFaqs,
      author: formAuthor.trim() || "Inquisitive Digital",
      isActive: formIsActive,
      priority: formPriority,
      seoTitle: formSeoTitle.trim(),
      seoDescription: formSeoDesc.trim(),
      script: formScript.trim(),
    };

    try {
      const token = localStorage.getItem("adminToken");
      if (editingItem) {
        const itemId = editingItem._id || editingItem.id;
        const res = await fetch(`${API_BASE}/api/admin/sub-services/${itemId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update sub-service");
        const json = await res.json();
        const updated = json.data || { ...editingItem, ...payload };
        setSubServices((prev) =>
          prev.map((s) => ((s._id || s.id) === itemId ? { ...s, ...updated } : s))
        );
        notify("success", `Sub-service "${payload.title}" updated successfully!`);
      } else {
        const res = await fetch(`${API_BASE}/api/admin/sub-services`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create sub-service");
        const json = await res.json();
        const newItem = json.data;
        setSubServices((prev) => [newItem, ...prev]);
        notify("success", `Sub-service "${payload.title}" created successfully!`);
      }
      closeDrawer();
    } catch {
      notify("error", editingItem ? "Failed to update sub-service." : "Failed to create sub-service.");
    }
  };

  const handleToggleActive = async (item: SubServiceItem) => {
    const newStatus = !item.isActive;
    const itemId = item._id || item.id;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/api/admin/sub-services/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ isActive: newStatus }),
      });
      if (!res.ok) throw new Error("Toggle failed");
      setSubServices((prev) =>
        prev.map((s) => ((s._id || s.id) === itemId ? { ...s, isActive: newStatus } : s))
      );
      notify("success", `"${item.title}" is now ${newStatus ? "Published" : "Draft"}`);
    } catch {
      notify("error", "Failed to toggle sub-service status.");
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/api/admin/sub-services/${deleteConfirmId}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Delete failed");
      setSubServices((prev) => prev.filter((s) => (s._id || s.id) !== deleteConfirmId));
      notify("success", "Sub-service deleted successfully.");
    } catch {
      notify("error", "Failed to delete sub-service.");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-brand-accent animate-spin mb-3" />
        <p className="text-white/40 text-sm">Loading sub-services…</p>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {successMsg && (
          <div className="fixed top-6 right-6 z-[60] flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border bg-[#111] border-emerald-500/40 text-emerald-400 text-sm font-semibold">
            <Check className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="fixed top-6 right-6 z-[60] flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border bg-[#111] border-red-500/40 text-red-400 text-sm font-semibold">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black font-display uppercase tracking-tight flex items-center gap-3">
              <Layers className="w-7 h-7 text-brand-accent" />
              Manage Sub Services
            </h1>
            <p className="text-white/40 text-sm mt-1">
              {subServices.length} total &middot;{" "}
              {subServices.filter((s) => s.isActive).length} published &middot;{" "}
              {subServices.filter((s) => !s.isActive).length} drafts
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
            <button
              onClick={() => {
                openDrawer(null);
                setIsPasteModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white font-display text-xs uppercase font-extrabold tracking-wider hover:bg-white/20 transition-all shadow-xl cursor-pointer"
            >
              <FileText className="w-4 h-4 text-brand-accent" />
              Paste from Google Docs
            </button>
            <button
              onClick={() => openDrawer(null)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-accent text-slate-900 font-display text-xs uppercase font-extrabold tracking-wider hover:bg-white transition-all shadow-xl cursor-pointer"
            >
              <Plus className="w-4 h-4" /> New Sub Service
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, slug, or parent service…"
              className="w-full bg-transparent border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-accent transition-all"
            />
          </div>

          {uniqueParents.length > 0 && (
            <select
              value={filterParent}
              onChange={(e) => setFilterParent(e.target.value)}
              className="bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white/80 focus:outline-none focus:border-brand-accent"
            >
              <option value="All" className="bg-[#111]">All Parent Services</option>
              {uniqueParents.map((parent) => (
                <option key={parent} value={parent} className="bg-[#111]">
                  {parent}
                </option>
              ))}
            </select>
          )}

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white/80 focus:outline-none focus:border-brand-accent"
          >
            <option value="All" className="bg-[#111]">All Statuses</option>
            <option value="active" className="bg-[#111]">Published Only</option>
            <option value="draft" className="bg-[#111]">Drafts Only</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40">
                <th className="py-4 px-6">Sub Service</th>
                <th className="py-4 px-6">Parent Service</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredSubServices.map((item) => (
                <tr key={item._id || item.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-bold text-white">{item.title}</p>
                    <p className="text-xs text-white/30 mt-0.5">/{item.slug}</p>
                  </td>
                  <td className="py-4 px-6">
                    {item.parentService ? (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-brand-accent/15 text-brand-accent border border-brand-accent/20">
                        {item.parentService}
                      </span>
                    ) : (
                      <span className="text-white/30 text-xs">—</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-white/60">
                    {item.category || "—"}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleToggleActive(item)}
                      className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none cursor-pointer ${
                        item.isActive ? "bg-brand-accent" : "bg-white/10"
                      }`}
                      title={item.isActive ? "Click to set as Draft" : "Click to Publish"}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          item.isActive ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <a
                        href={`/sub-services/${item.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-white/40 hover:text-brand-accent hover:bg-brand-accent/10 transition-colors"
                        title="View Live Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => openDrawer(item)}
                        className="p-2 rounded-lg text-white/40 hover:text-brand-accent hover:bg-brand-accent/10 transition-colors cursor-pointer"
                        title="Edit Sub Service"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(item._id || item.id || null)}
                        className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer"
                        title="Delete Sub Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredSubServices.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-white/20">
                    No sub-services match the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT DRAWER */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="absolute inset-0 bg-black/80 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl bg-[#0d0d0d] border-l border-white/10 h-full shadow-2xl flex flex-col justify-between z-10"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-display font-black uppercase tracking-tight">
                    {editingItem ? "Edit Sub Service" : "Create New Sub Service"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsPasteModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-accent/10 border border-brand-accent/30 text-brand-accent text-xs font-bold uppercase tracking-wider hover:bg-brand-accent hover:text-slate-900 transition-all cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Paste from Google Docs
                  </button>
                </div>
                <button
                  onClick={closeDrawer}
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Form */}
              <form onSubmit={handleSaveSubService} className="flex-1 overflow-y-auto p-6 space-y-12">
                {drawerLoading ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-brand-accent animate-spin mb-4" />
                    <p className="text-white/40 text-sm">Loading full content...</p>
                  </div>
                ) : (
                  <>
                    {/* 1. BASICS */}
                    <div className="space-y-6">
                      <h4 className="text-sm font-black font-display uppercase tracking-widest text-brand-accent border-b border-white/10 pb-2">
                        1. Service Hierarchy & Basics
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs uppercase tracking-wider font-bold text-white/50">
                            Parent Service *
                          </label>
                          <div className="flex gap-2">
                            <select
                              value={formParentService}
                              onChange={(e) => setFormParentService(e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent text-white"
                            >
                              <option value="" className="bg-[#111]">-- Select Parent Service --</option>
                              {parentServiceList.map((srv) => (
                                <option key={srv.slug} value={srv.slug} className="bg-[#111]">
                                  {srv.name} ({srv.slug})
                                </option>
                              ))}
                            </select>
                          </div>
                          <input
                            type="text"
                            placeholder="Or type custom parent slug (e.g. seo-services)"
                            value={formParentService}
                            onChange={(e) => setFormParentService(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-brand-accent text-white/70"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs uppercase tracking-wider font-bold text-white/50">
                            Category / Sub-category
                          </label>
                          <input
                            type="text"
                            value={formCategory}
                            onChange={(e) => setFormCategory(e.target.value)}
                            placeholder="e.g. Technical SEO, Lead Funnel, Paid Search"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wider font-bold text-white/50">
                          Sub-Service Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={formTitle}
                          onChange={(e) => {
                            setFormTitle(e.target.value);
                            if (!editingItem && !formSlug) {
                              // live auto slug
                              setFormSlug(
                                e.target.value
                                  .toLowerCase()
                                  .replace(/[^a-z0-9]+/g, "-")
                                  .replace(/(^-|-$)/g, "")
                              );
                            }
                          }}
                          placeholder="e.g. Generative Engine Optimization (GEO)"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wider font-bold text-white/50">
                          URL Slug (Optional - Autogenerated if empty)
                        </label>
                        <input
                          type="text"
                          value={formSlug}
                          onChange={(e) => setFormSlug(e.target.value)}
                          placeholder="e.g. generative-engine-optimization"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs uppercase tracking-wider font-bold text-white/50">
                            Author / Prepared By
                          </label>
                          <input
                            type="text"
                            value={formAuthor}
                            onChange={(e) => setFormAuthor(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs uppercase tracking-wider font-bold text-white/50">
                            Display Priority (Higher shows first)
                          </label>
                          <input
                            type="number"
                            value={formPriority}
                            onChange={(e) => setFormPriority(Number(e.target.value) || 0)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wider font-bold text-white/50">
                          Intro Paragraph
                        </label>
                        <textarea
                          rows={3}
                          value={formIntro}
                          onChange={(e) => setFormIntro(e.target.value)}
                          placeholder="Executive overview introducing this sub-service..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent resize-none"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wider font-bold text-white/50">
                          Card Excerpt
                        </label>
                        <textarea
                          rows={2}
                          value={formExcerpt}
                          onChange={(e) => setFormExcerpt(e.target.value)}
                          placeholder="Brief 1-2 sentence description for preview cards..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent resize-none"
                        />
                      </div>
                    </div>

                    {/* 2. HERO IMAGE */}
                    <div className="space-y-6">
                      <h4 className="text-sm font-black font-display uppercase tracking-widest text-brand-accent border-b border-white/10 pb-2">
                        2. Hero Image
                      </h4>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 flex-wrap">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleHeroImageUpload}
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingImage}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            {uploadingImage ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <UploadCloud className="w-4 h-4" />
                            )}
                            {uploadingImage ? "Uploading..." : "Upload from Computer"}
                          </button>
                          <span className="text-white/40 text-sm">OR</span>
                          <input
                            type="text"
                            value={formHeroImage.url}
                            onChange={(e) =>
                              setFormHeroImage({ ...formHeroImage, url: e.target.value })
                            }
                            placeholder="Paste Image URL..."
                            className="flex-1 min-w-[200px] bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
                          />
                        </div>
                        {formHeroImage.url && (
                          <div className="mt-2 rounded-xl overflow-hidden border border-white/10 h-64 relative bg-black/50">
                            <img
                              src={formHeroImage.url}
                              alt="Hero preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setFormHeroImage({ url: "", alt: "", filename: "" })
                              }
                              className="absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg backdrop-blur-sm transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 3. CONTENT SECTIONS */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <h4 className="text-sm font-black font-display uppercase tracking-widest text-brand-accent">
                          3. Content Sections
                        </h4>
                        <button
                          type="button"
                          onClick={addSection}
                          className="text-xs uppercase font-bold text-brand-accent hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" /> Add Section
                        </button>
                      </div>

                      {formSections.length === 0 && (
                        <div className="text-center py-10 bg-white/5 border border-white/10 border-dashed rounded-2xl text-white/30 text-sm">
                          No sections added yet. Click &quot;Add Section&quot; or &quot;Paste from Google Docs&quot; to import content.
                        </div>
                      )}

                      {formSections.map((sec, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5 relative group"
                        >
                          <button
                            type="button"
                            onClick={() => removeSection(sIdx)}
                            className="absolute top-4 right-4 p-2 text-white/20 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="flex flex-col gap-2 w-full pr-10">
                            <label className="text-[10px] uppercase tracking-wider font-bold text-white/50">
                              Section {sIdx + 1} Heading (H2)
                            </label>
                            <input
                              type="text"
                              value={sec.heading}
                              onChange={(e) => updateSection(sIdx, "heading", e.target.value)}
                              placeholder="e.g. How Our Methodology Works"
                              className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-accent"
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase tracking-wider font-bold text-white/50">
                              Paragraph Text (HTML allowed)
                            </label>
                            <textarea
                              rows={4}
                              value={sec.text}
                              onChange={(e) => updateSection(sIdx, "text", e.target.value)}
                              placeholder="Section narrative text..."
                              className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-accent resize-y"
                            />
                          </div>

                          {/* Bullet Points */}
                          <div className="space-y-2 pl-4 border-l-2 border-white/10">
                            <label className="text-[10px] uppercase tracking-wider font-bold text-white/50">
                              Bullet Points (One per line)
                            </label>
                            <textarea
                              rows={3}
                              value={sec.listItems ? sec.listItems.join("\n") : ""}
                              onChange={(e) =>
                                updateSection(sIdx, "listItems", e.target.value.split("\n"))
                              }
                              placeholder="Key deliverable or bullet point per line..."
                              className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-accent resize-y"
                            />
                          </div>

                          {/* Subsections */}
                          <div className="space-y-4 pt-4 border-t border-white/10">
                            <div className="flex justify-between items-center">
                              <label className="text-xs uppercase tracking-wider font-bold text-white/70">
                                Subsections (H3)
                              </label>
                              <button
                                type="button"
                                onClick={() => addSubsection(sIdx)}
                                className="text-[10px] uppercase font-bold bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg text-white transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" /> Add Subsection
                              </button>
                            </div>
                            {sec.subsections.map((sub, subIdx) => (
                              <div
                                key={subIdx}
                                className="bg-black/40 border border-white/5 rounded-xl p-4 space-y-3 relative"
                              >
                                <button
                                  type="button"
                                  onClick={() => removeSubsection(sIdx, subIdx)}
                                  className="absolute top-2 right-2 p-1.5 text-white/20 hover:text-red-400 transition-colors cursor-pointer"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                                <div className="flex flex-col gap-1 pr-8">
                                  <label className="text-[9px] uppercase tracking-wider font-bold text-white/40">
                                    Subheading (H3)
                                  </label>
                                  <input
                                    type="text"
                                    value={sub.subheading}
                                    onChange={(e) =>
                                      updateSubsection(sIdx, subIdx, "subheading", e.target.value)
                                    }
                                    className="w-full bg-transparent border-b border-white/10 px-2 py-1 text-sm focus:outline-none focus:border-brand-accent"
                                  />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <label className="text-[9px] uppercase tracking-wider font-bold text-white/40">
                                    Text
                                  </label>
                                  <textarea
                                    rows={2}
                                    value={sub.text}
                                    onChange={(e) =>
                                      updateSubsection(sIdx, subIdx, "text", e.target.value)
                                    }
                                    className="w-full bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-accent resize-y"
                                  />
                                </div>
                                <div className="flex flex-col gap-1 mt-2">
                                  <label className="text-[9px] uppercase tracking-wider font-bold text-white/40">
                                    Bullet Points (One per line)
                                  </label>
                                  <textarea
                                    rows={2}
                                    value={sub.listItems ? sub.listItems.join("\n") : ""}
                                    onChange={(e) =>
                                      updateSubsection(sIdx, subIdx, "listItems", e.target.value.split("\n"))
                                    }
                                    placeholder="Paste or type bullet points here..."
                                    className="w-full bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-accent resize-y"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 4. FAQS */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <h4 className="text-sm font-black font-display uppercase tracking-widest text-brand-accent">
                          4. FAQs
                        </h4>
                        <button
                          type="button"
                          onClick={addFaq}
                          className="text-xs uppercase font-bold text-brand-accent hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" /> Add FAQ
                        </button>
                      </div>
                      <div className="space-y-3">
                        {formFaqs.map((faq, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex gap-3 bg-white/5 border border-white/10 rounded-xl p-4 relative pr-12"
                          >
                            <button
                              type="button"
                              onClick={() => removeFaq(fIdx)}
                              className="absolute top-4 right-4 p-1.5 text-white/20 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="flex-1 space-y-3">
                              <input
                                type="text"
                                placeholder="Question..."
                                value={faq.question}
                                onChange={(e) => updateFaq(fIdx, "question", e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:border-brand-accent"
                              />
                              <textarea
                                placeholder="Answer..."
                                rows={2}
                                value={faq.answer}
                                onChange={(e) => updateFaq(fIdx, "answer", e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-accent resize-none"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 5. SEO & PUBLISH */}
                    <div className="space-y-6">
                      <h4 className="text-sm font-black font-display uppercase tracking-widest text-brand-accent border-b border-white/10 pb-2">
                        5. SEO & Settings
                      </h4>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wider font-bold text-white/50">
                          SEO Meta Title
                        </label>
                        <input
                          type="text"
                          value={formSeoTitle}
                          onChange={(e) => setFormSeoTitle(e.target.value)}
                          placeholder="e.g. Expert Generative Engine Optimization Services | Inquisitive Digital"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wider font-bold text-white/50">
                          SEO Meta Description
                        </label>
                        <textarea
                          rows={2}
                          value={formSeoDesc}
                          onChange={(e) => setFormSeoDesc(e.target.value)}
                          placeholder="Compelling meta description for search snippets..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent resize-none"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wider font-bold text-white/50">
                          Structured Data / Script (JSON-LD)
                        </label>
                        <textarea
                          rows={3}
                          value={formScript}
                          onChange={(e) => setFormScript(e.target.value)}
                          placeholder='{"@context": "https://schema.org", "@type": "Service", ...}'
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono focus:outline-none focus:border-brand-accent resize-y"
                        />
                      </div>
                      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4">
                        <div>
                          <p className="text-sm font-bold text-white">Publish Status</p>
                          <p className="text-xs text-white/40 mt-0.5">
                            {formIsActive ? "Live to public" : "Saved as draft"}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormIsActive(!formIsActive)}
                          className={`relative w-12 h-7 rounded-full transition-colors focus:outline-none cursor-pointer ${
                            formIsActive ? "bg-brand-accent" : "bg-white/10"
                          }`}
                        >
                          <span
                            className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${
                              formIsActive ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Hidden submit trigger */}
                <button type="submit" className="hidden" id="subservice-form-submit-trigger" />
              </form>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-white/10 flex gap-4 shrink-0 bg-[#0d0d0d]">
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("subservice-form-submit-trigger")?.click()
                  }
                  className="flex-1 py-4 rounded-xl bg-brand-accent text-slate-900 font-display text-xs uppercase font-extrabold tracking-wider hover:bg-white transition-all shadow-xl cursor-pointer"
                >
                  {editingItem ? "Save Changes" : "Publish Sub Service"}
                </button>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="flex-1 py-4 rounded-xl border border-white/10 text-white/60 font-display text-xs uppercase font-extrabold tracking-wider hover:border-white/30 hover:text-white transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRM MODAL */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmId(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-[#0d0d0d] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6 z-10"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-display font-black uppercase tracking-tight text-white">
                  Delete Sub Service?
                </h3>
                <p className="text-white/50 text-sm mt-2">
                  This action is permanent and cannot be undone.
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleDelete}
                  className="flex-1 py-3.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-display text-xs uppercase font-extrabold cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-3.5 rounded-xl border border-white/10 text-white/60 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GOOGLE DOCS PASTE MODAL */}
      <GoogleDocsPasteModal
        isOpen={isPasteModalOpen}
        onClose={() => setIsPasteModalOpen(false)}
        onParse={handleGoogleDocsParse}
        title="Import Sub-Service from Google Docs"
        populateLabel="Populate Sub-Service Form"
      />
    </>
  );
}
