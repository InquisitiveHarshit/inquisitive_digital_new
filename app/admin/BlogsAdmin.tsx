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
  BookOpen,
  Image as ImageIcon,
  UploadCloud,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

/* ─── Types ─────────────────────────────────────────────────────────────────── */

interface BlogImage {
  url: string;
  alt: string;
  filename?: string;
}

interface BlogSubsection {
  subheading: string;
  text: string;
  listItems: string[];
  image: BlogImage;
}

interface BlogSection {
  heading: string;
  subheading: string;
  text: string;
  listItems: string[];
  image: BlogImage;
  subsections: BlogSubsection[];
}

interface BlogFAQ {
  question: string;
  answer: string;
  tag: string;
}

interface BlogPost {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  intro: string;
  excerpt: string;
  category: string;
  tags: string[];
  sections: BlogSection[];
  faqs: BlogFAQ[];
  heroImage: BlogImage;
  author: string;
  seoTitle: string;
  seoDescription: string;
  script: string;
  isActive: boolean;
  priority: number;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
}

/* ─── Component ─────────────────────────────────────────────────────────────── */

export default function BlogsAdmin() {
  // ── Data ──────────────────────────────────────────────────────────────────
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // ── Filters ───────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState<"All" | "active" | "draft">("All");

  // ── Drawer ────────────────────────────────────────────────────────────────
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [drawerLoading, setDrawerLoading] = useState(false);

  // ── Form State ────────────────────────────────────────────────────────────
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formIntro, setFormIntro] = useState("");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formTags, setFormTags] = useState(""); // comma separated
  const [formAuthor, setFormAuthor] = useState("Inquisitive Digital");
  const [formIsActive, setFormIsActive] = useState(true);
  const [formPriority, setFormPriority] = useState(0);
  
  const [formHeroImage, setFormHeroImage] = useState<BlogImage>({ url: "", alt: "", filename: "" });
  const [formSections, setFormSections] = useState<BlogSection[]>([]);
  const [formFaqs, setFormFaqs] = useState<BlogFAQ[]>([]);

  // SEO
  const [formSeoTitle, setFormSeoTitle] = useState("");
  const [formSeoDesc, setFormSeoDesc] = useState("");
  const [formScript, setFormScript] = useState("");

  // Upload state
  const [uploadingImage, setUploadingImage] = useState(false);

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
     FETCH
     ═══════════════════════════════════════════════════════════════════════ */

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/admin/blogs`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        setBlogs(json.data || []);
      }
    } catch {
      console.warn("Could not reach blog admin API.");
    } finally {
      setLoading(false);
    }
  };

  /* ═══════════════════════════════════════════════════════════════════════════
     FILTERING
     ═══════════════════════════════════════════════════════════════════════ */

  const categories = useMemo(() => {
    return Array.from(new Set(blogs.map((b) => b.category).filter(Boolean)));
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        !searchQuery ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.slug && blog.slug.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = filterCategory === "All" || blog.category === filterCategory;
      const matchesStatus =
        filterStatus === "All" ||
        (filterStatus === "active" && blog.isActive) ||
        (filterStatus === "draft" && !blog.isActive);
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [blogs, searchQuery, filterCategory, filterStatus]);

  /* ═══════════════════════════════════════════════════════════════════════════
     DRAWER OPEN / CLOSE
     ═══════════════════════════════════════════════════════════════════════ */

  const openDrawer = async (blog: BlogPost | null = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormTitle(blog.title || "");
      setFormSlug(blog.slug || "");
      setFormIntro(blog.intro || "");
      setFormExcerpt(blog.excerpt || "");
      setFormCategory(blog.category || "");
      setFormTags((blog.tags || []).join(", "));
      setFormAuthor(blog.author || "Inquisitive Digital");
      setFormIsActive(blog.isActive ?? true);
      setFormPriority(blog.priority || 0);
      setFormHeroImage(blog.heroImage || { url: "", alt: "", filename: "" });
      setFormSections([]);
      setFormFaqs([]);
      setFormSeoTitle(blog.seoTitle || "");
      setFormSeoDesc(blog.seoDescription || "");
      setFormScript(blog.script || "");
      setIsDrawerOpen(true);

      const blogId = blog._id || blog.id;
      if (blogId) {
        setDrawerLoading(true);
        try {
          const res = await fetch(`${API_BASE}/api/admin/blogs/${blogId}`, { cache: "no-store" });
          if (res.ok) {
            const json = await res.json();
            const full = json.data;
            if (full) {
              setEditingBlog(full);
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
      setEditingBlog(null);
      setFormTitle("");
      setFormSlug("");
      setFormIntro("");
      setFormExcerpt("");
      setFormCategory("");
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
    setEditingBlog(null);
    setDrawerLoading(false);
  };

  /* ═══════════════════════════════════════════════════════════════════════════
     IMAGE UPLOAD
     ═══════════════════════════════════════════════════════════════════════ */
  
  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${API_BASE}/api/admin/upload`, {
        method: "POST",
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
     DYNAMIC FORM HANDLERS
     ═══════════════════════════════════════════════════════════════════════ */
  
  const addSection = () => {
    setFormSections([
      ...formSections, 
      { heading: "", subheading: "", text: "", listItems: [], image: { url: "", alt: "" }, subsections: [] }
    ]);
  };
  
  const removeSection = (idx: number) => {
    setFormSections(formSections.filter((_, i) => i !== idx));
  };
  
  const updateSection = (idx: number, field: keyof BlogSection, value: any) => {
    const updated = [...formSections];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormSections(updated);
  };

  const addSectionListItem = (sectionIdx: number) => {
    const updated = [...formSections];
    updated[sectionIdx].listItems.push("");
    setFormSections(updated);
  };

  const updateSectionListItem = (sectionIdx: number, itemIdx: number, value: string) => {
    const updated = [...formSections];
    updated[sectionIdx].listItems[itemIdx] = value;
    setFormSections(updated);
  };

  const removeSectionListItem = (sectionIdx: number, itemIdx: number) => {
    const updated = [...formSections];
    updated[sectionIdx].listItems = updated[sectionIdx].listItems.filter((_, i) => i !== itemIdx);
    setFormSections(updated);
  };

  const addSubsection = (sectionIdx: number) => {
    const updated = [...formSections];
    updated[sectionIdx].subsections.push({ subheading: "", text: "", listItems: [], image: { url: "", alt: "" } });
    setFormSections(updated);
  };

  const updateSubsection = (sectionIdx: number, subIdx: number, field: keyof BlogSubsection, value: any) => {
    const updated = [...formSections];
    updated[sectionIdx].subsections[subIdx] = { ...updated[sectionIdx].subsections[subIdx], [field]: value };
    setFormSections(updated);
  };

  const removeSubsection = (sectionIdx: number, subIdx: number) => {
    const updated = [...formSections];
    updated[sectionIdx].subsections = updated[sectionIdx].subsections.filter((_, i) => i !== subIdx);
    setFormSections(updated);
  };

  const addFaq = () => {
    setFormFaqs([...formFaqs, { question: "", answer: "", tag: "FAQ" }]);
  };

  const updateFaq = (idx: number, field: keyof BlogFAQ, value: string) => {
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

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim() || !formCategory.trim()) {
      notify("error", "Please fill in all required fields (Title, Category).");
      return;
    }

    const payload = {
      title: formTitle.trim(),
      slug: formSlug.trim(),
      intro: formIntro.trim(),
      excerpt: formExcerpt.trim(),
      category: formCategory.trim(),
      tags: formTags.split(",").map((t) => t.trim()).filter(Boolean),
      heroImage: formHeroImage,
      sections: formSections,
      faqs: formFaqs,
      author: formAuthor.trim() || "Inquisitive Digital",
      isActive: formIsActive,
      priority: formPriority,
      seoTitle: formSeoTitle.trim(),
      seoDescription: formSeoDesc.trim(),
      script: formScript.trim(),
    };

    try {
      if (editingBlog) {
        const blogId = editingBlog._id || editingBlog.id;
        const res = await fetch(`${API_BASE}/api/admin/blogs/${blogId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update blog");
        const json = await res.json();
        const updated = json.data || { ...editingBlog, ...payload };
        setBlogs((prev) => prev.map((b) => ((b._id || b.id) === blogId ? { ...b, ...updated } : b)));
        notify("success", `Blog "${payload.title}" updated successfully!`);
      } else {
        const res = await fetch(`${API_BASE}/api/admin/blogs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create blog");
        const json = await res.json();
        const newBlog = json.data;
        setBlogs((prev) => [newBlog, ...prev]);
        notify("success", `Blog "${payload.title}" published successfully!`);
      }
      closeDrawer();
    } catch {
      notify("error", editingBlog ? "Failed to update blog." : "Failed to create blog.");
    }
  };

  const handleToggleActive = async (blog: BlogPost) => {
    const newStatus = !blog.isActive;
    const blogId = blog._id || blog.id;
    try {
      const res = await fetch(`${API_BASE}/api/admin/blogs/${blogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newStatus }),
      });
      if (!res.ok) throw new Error("Toggle failed");
      setBlogs((prev) => prev.map((b) => ((b._id || b.id) === blogId ? { ...b, isActive: newStatus } : b)));
      notify("success", `"${blog.title}" is now ${newStatus ? "Published" : "Draft"}`);
    } catch {
      notify("error", "Failed to toggle blog status.");
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/blogs/${deleteConfirmId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setBlogs((prev) => prev.filter((b) => (b._id || b.id) !== deleteConfirmId));
      notify("success", "Blog deleted successfully.");
    } catch {
      notify("error", "Failed to delete blog.");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-brand-accent animate-spin mb-3" />
        <p className="text-white/40 text-sm">Loading blogs…</p>
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
            <h1 className="text-3xl font-black font-display uppercase tracking-tight">Manage Blogs</h1>
            <p className="text-white/40 text-sm mt-1">
              {blogs.length} total &middot; {blogs.filter((b) => b.isActive).length} published &middot; {blogs.filter((b) => !b.isActive).length} drafts
            </p>
          </div>
          <button
            onClick={() => openDrawer(null)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-accent text-slate-900 font-display text-xs uppercase font-extrabold tracking-wider hover:bg-white transition-all shadow-xl self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> New Blog Post
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or slug…"
              className="w-full bg-transparent border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-accent transition-all"
            />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40">
                <th className="py-4 px-6">Title</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Author</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredBlogs.map((blog) => (
                <tr key={blog._id || blog.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-bold text-white">{blog.title}</p>
                    <p className="text-xs text-white/30 mt-0.5">/{blog.slug}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-brand-accent/15 text-brand-accent border border-brand-accent/20">
                      {blog.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-white/60">{blog.author}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleToggleActive(blog)}
                      className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none ${blog.isActive ? "bg-brand-accent" : "bg-white/10"}`}
                    >
                      <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${blog.isActive ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <a href={`/blogs/${blog.slug}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-white/40 hover:text-brand-accent hover:bg-brand-accent/10">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button onClick={() => openDrawer(blog)} className="p-2 rounded-lg text-white/40 hover:text-brand-accent hover:bg-brand-accent/10">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteConfirmId(blog._id || blog.id || null)} className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBlogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-white/20">No blogs match.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }} onClick={closeDrawer} className="absolute inset-0 bg-black/80 backdrop-blur-xs" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="relative w-full max-w-4xl bg-[#0d0d0d] border-l border-white/10 h-full shadow-2xl flex flex-col justify-between z-10">
              <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
                <h3 className="text-xl font-display font-black uppercase tracking-tight">{editingBlog ? "Edit Blog Post" : "Create New Blog Post"}</h3>
                <button onClick={closeDrawer} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSaveBlog} className="flex-1 overflow-y-auto p-6 space-y-12">
                {drawerLoading ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-brand-accent animate-spin mb-4" />
                    <p className="text-white/40 text-sm">Loading full content...</p>
                  </div>
                ) : (
                  <>
                    {/* BASICS */}
                    <div className="space-y-6">
                      <h4 className="text-sm font-black font-display uppercase tracking-widest text-brand-accent border-b border-white/10 pb-2">1. Basics</h4>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wider font-bold text-white/50">Title *</label>
                        <input type="text" required value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wider font-bold text-white/50">URL Slug (Optional - Autogenerated if empty)</label>
                        <input type="text" value={formSlug} onChange={(e) => setFormSlug(e.target.value)} placeholder="e.g. 10-seo-strategies" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs uppercase tracking-wider font-bold text-white/50">Category *</label>
                          <input type="text" required value={formCategory} onChange={(e) => setFormCategory(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs uppercase tracking-wider font-bold text-white/50">Author</label>
                          <input type="text" value={formAuthor} onChange={(e) => setFormAuthor(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wider font-bold text-white/50">Intro Paragraph</label>
                        <textarea rows={3} value={formIntro} onChange={(e) => setFormIntro(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent resize-none" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wider font-bold text-white/50">Card Excerpt</label>
                        <textarea rows={2} value={formExcerpt} onChange={(e) => setFormExcerpt(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent resize-none" />
                      </div>
                    </div>

                    {/* HERO IMAGE */}
                    <div className="space-y-6">
                      <h4 className="text-sm font-black font-display uppercase tracking-widest text-brand-accent border-b border-white/10 pb-2">2. Hero Image</h4>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleHeroImageUpload} />
                          <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploadingImage} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50">
                            {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                            {uploadingImage ? "Uploading..." : "Upload from Computer"}
                          </button>
                          <span className="text-white/40 text-sm">OR</span>
                          <input type="text" value={formHeroImage.url} onChange={(e) => setFormHeroImage({ ...formHeroImage, url: e.target.value })} placeholder="Paste Cloudinary URL..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent" />
                        </div>
                        {formHeroImage.url && (
                          <div className="mt-2 rounded-xl overflow-hidden border border-white/10 h-64 relative bg-black/50">
                            <img src={formHeroImage.url} alt="Hero preview" className="w-full h-full object-cover" />
                            <button type="button" onClick={() => setFormHeroImage({ url: "", alt: "", filename: "" })} className="absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg backdrop-blur-sm transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CONTENT BUILDER */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <h4 className="text-sm font-black font-display uppercase tracking-widest text-brand-accent">3. Content Sections</h4>
                        <button type="button" onClick={addSection} className="text-xs uppercase font-bold text-brand-accent hover:text-white flex items-center gap-1">
                          <Plus className="w-3 h-3" /> Add Section
                        </button>
                      </div>

                      {formSections.length === 0 && (
                        <div className="text-center py-10 bg-white/5 border border-white/10 border-dashed rounded-2xl text-white/30 text-sm">
                          No sections added yet. Click "Add Section" to begin writing.
                        </div>
                      )}

                      {formSections.map((sec, sIdx) => (
                        <div key={sIdx} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5 relative group">
                          <button type="button" onClick={() => removeSection(sIdx)} className="absolute top-4 right-4 p-2 text-white/20 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          
                          <div className="flex flex-col gap-2 w-full pr-10">
                            <label className="text-[10px] uppercase tracking-wider font-bold text-white/50">Section {sIdx + 1} Heading (H2)</label>
                            <input type="text" value={sec.heading} onChange={(e) => updateSection(sIdx, "heading", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-accent" />
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase tracking-wider font-bold text-white/50">Paragraph Text</label>
                            <textarea rows={4} value={sec.text} onChange={(e) => updateSection(sIdx, "text", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-accent resize-y" />
                          </div>

                          {/* List Items */}
                          <div className="space-y-2 pl-4 border-l-2 border-white/10">
                            <div className="flex justify-between items-center">
                              <label className="text-[10px] uppercase tracking-wider font-bold text-white/50">Bullet Points</label>
                              <button type="button" onClick={() => addSectionListItem(sIdx)} className="text-[10px] uppercase font-bold text-white/40 hover:text-brand-accent flex items-center gap-1"><Plus className="w-3 h-3"/> Add Bullet</button>
                            </div>
                            {sec.listItems.map((li, liIdx) => (
                              <div key={liIdx} className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                                <input type="text" value={li} onChange={(e) => updateSectionListItem(sIdx, liIdx, e.target.value)} className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-brand-accent" />
                                <button type="button" onClick={() => removeSectionListItem(sIdx, liIdx)} className="p-1.5 text-white/30 hover:text-red-400 rounded-lg"><X className="w-4 h-4" /></button>
                              </div>
                            ))}
                          </div>

                          {/* Subsections */}
                          <div className="space-y-4 pt-4 border-t border-white/10">
                            <div className="flex justify-between items-center">
                              <label className="text-xs uppercase tracking-wider font-bold text-white/70">Subsections (H3)</label>
                              <button type="button" onClick={() => addSubsection(sIdx)} className="text-[10px] uppercase font-bold bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg text-white transition-colors flex items-center gap-1"><Plus className="w-3 h-3"/> Add Subsection</button>
                            </div>
                            {sec.subsections.map((sub, subIdx) => (
                              <div key={subIdx} className="bg-black/40 border border-white/5 rounded-xl p-4 space-y-3 relative">
                                <button type="button" onClick={() => removeSubsection(sIdx, subIdx)} className="absolute top-2 right-2 p-1.5 text-white/20 hover:text-red-400 transition-colors"><X className="w-4 h-4"/></button>
                                <div className="flex flex-col gap-1 pr-8">
                                  <label className="text-[9px] uppercase tracking-wider font-bold text-white/40">Subheading (H3)</label>
                                  <input type="text" value={sub.subheading} onChange={(e) => updateSubsection(sIdx, subIdx, "subheading", e.target.value)} className="w-full bg-transparent border-b border-white/10 px-2 py-1 text-sm focus:outline-none focus:border-brand-accent" />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <label className="text-[9px] uppercase tracking-wider font-bold text-white/40">Text</label>
                                  <textarea rows={2} value={sub.text} onChange={(e) => updateSubsection(sIdx, subIdx, "text", e.target.value)} className="w-full bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-accent resize-y" />
                                </div>
                              </div>
                            ))}
                          </div>

                        </div>
                      ))}
                    </div>

                    {/* FAQS */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <h4 className="text-sm font-black font-display uppercase tracking-widest text-brand-accent">4. FAQs</h4>
                        <button type="button" onClick={addFaq} className="text-xs uppercase font-bold text-brand-accent hover:text-white flex items-center gap-1">
                          <Plus className="w-3 h-3" /> Add FAQ
                        </button>
                      </div>
                      <div className="space-y-3">
                        {formFaqs.map((faq, fIdx) => (
                          <div key={fIdx} className="flex gap-3 bg-white/5 border border-white/10 rounded-xl p-4 relative pr-12">
                             <button type="button" onClick={() => removeFaq(fIdx)} className="absolute top-4 right-4 p-1.5 text-white/20 hover:text-red-400 rounded-lg transition-colors"><Trash2 className="w-4 h-4"/></button>
                             <div className="flex-1 space-y-3">
                               <input type="text" placeholder="Question..." value={faq.question} onChange={(e) => updateFaq(fIdx, "question", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:border-brand-accent" />
                               <textarea placeholder="Answer..." rows={2} value={faq.answer} onChange={(e) => updateFaq(fIdx, "answer", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-accent resize-none" />
                             </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SEO & ADMIN */}
                    <div className="space-y-6">
                      <h4 className="text-sm font-black font-display uppercase tracking-widest text-brand-accent border-b border-white/10 pb-2">5. SEO & Settings</h4>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wider font-bold text-white/50">SEO Meta Title</label>
                        <input type="text" value={formSeoTitle} onChange={(e) => setFormSeoTitle(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wider font-bold text-white/50">SEO Meta Description</label>
                        <textarea rows={2} value={formSeoDesc} onChange={(e) => setFormSeoDesc(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent resize-none" />
                      </div>
                      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4">
                        <div>
                          <p className="text-sm font-bold text-white">Publish Status</p>
                          <p className="text-xs text-white/40 mt-0.5">{formIsActive ? "Live to public" : "Saved as draft"}</p>
                        </div>
                        <button type="button" onClick={() => setFormIsActive(!formIsActive)} className={`relative w-12 h-7 rounded-full transition-colors focus:outline-none ${formIsActive ? "bg-brand-accent" : "bg-white/10"}`}>
                          <span className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${formIsActive ? "translate-x-5" : "translate-x-0"}`} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Hidden submit trigger */}
                <button type="submit" className="hidden" id="blog-form-submit-trigger" />
              </form>

              <div className="p-6 border-t border-white/10 flex gap-4 shrink-0 bg-[#0d0d0d]">
                <button type="button" onClick={() => document.getElementById("blog-form-submit-trigger")?.click()} className="flex-1 py-4 rounded-xl bg-brand-accent text-slate-900 font-display text-xs uppercase font-extrabold tracking-wider hover:bg-white transition-all shadow-xl cursor-pointer">
                  {editingBlog ? "Save Changes" : "Publish Blog"}
                </button>
                <button type="button" onClick={closeDrawer} className="flex-1 py-4 rounded-xl border border-white/10 text-white/60 font-display text-xs uppercase font-extrabold tracking-wider hover:border-white/30 hover:text-white transition-all">
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }} onClick={() => setDeleteConfirmId(null)} className="absolute inset-0 bg-black/85 backdrop-blur-xs" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-[#0d0d0d] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6 z-10">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center"><Trash2 className="w-6 h-6 text-red-500" /></div>
              <div>
                <h3 className="text-xl font-display font-black uppercase tracking-tight text-white">Delete Blog Post?</h3>
                <p className="text-white/50 text-sm mt-2">This action is permanent.</p>
              </div>
              <div className="flex gap-4">
                <button onClick={handleDelete} className="flex-1 py-3.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-display text-xs uppercase font-extrabold">Delete</button>
                <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-3.5 rounded-xl border border-white/10 text-white/60 hover:text-white">Cancel</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
