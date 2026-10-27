"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Globe,
  MapPin,
  Flag,
  Filter,
  ChevronDown,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Code2,
  UploadCloud,
  Image as ImageIcon,
} from "lucide-react";
import GoogleDocsPasteModal from "@/components/admin/GoogleDocsPasteModal";
import { parseGoogleDocsHtml } from "@/lib/utils/htmlParser";

/* ─── Types ─────────────────────────────────────────────────────────────────── */

interface CityFAQ {
  question: string;
  answer: string;
  tag?: string;
}

interface CityItem {
  id: string; // synthetic key: `${serviceId}_${countrySlug}_${slug}`
  serviceId: string;
  serviceSlug: string;
  serviceTitle: string;
  countrySlug: string;
  countryName: string;
  countryFlag: string;
  name: string;
  slug: string;
  imageUrl?: string;
  description: string;
  headline?: string;
  popularServices: string[];
  seoTitle?: string;
  seoDescription?: string;
  faqs?: CityFAQ[];
  sections?: any[];
}

interface ServiceOption {
  _id: string;
  title: string;
  slug: string;
}

interface CountryOption {
  name: string;
  slug: string;
  flag: string;
}

function toSlug(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/* ─── Main Component ─────────────────────────────────────────────────────────── */

export default function LocationsAdmin() {
  // ── Mode: "cities" (like BlogsAdmin) vs "countries" ─────────────────────────
  const [activeSubTab, setActiveSubTab] = useState<"cities" | "countries">("cities");

  // ── Cities & Services Data ──────────────────────────────────────────────────
  const [cities, setCities] = useState<CityItem[]>([]);
  const [serviceOptions, setServiceOptions] = useState<ServiceOption[]>([]);
  const [countryOptions, setCountryOptions] = useState<Record<string, CountryOption[]>>({});
  const [loading, setLoading] = useState(true);

  // ── Filters (for Cities view) ───────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [filterService, setFilterService] = useState("All");
  const [filterCountry, setFilterCountry] = useState("All");

  // ── City Drawer (Add / Edit) ────────────────────────────────────────────────
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<CityItem | null>(null);
  const [drawerSaving, setDrawerSaving] = useState(false);

  // Form Fields
  const [formServiceId, setFormServiceId] = useState("");
  const [formCountrySlug, setFormCountrySlug] = useState("");
  const [isCustomCountry, setIsCustomCountry] = useState(false);
  const [newCountryName, setNewCountryName] = useState("");
  const [newCountryFlag, setNewCountryFlag] = useState("🌐");

  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formHeadline, setFormHeadline] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formDescription, setFormDescription] = useState("");
  const [formPopularServices, setFormPopularServices] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [formSeoTitle, setFormSeoTitle] = useState("");
  const [formSeoDesc, setFormSeoDesc] = useState("");
  const [formFaqs, setFormFaqs] = useState<CityFAQ[]>([]);
  const [formSections, setFormSections] = useState<any[]>([]);

  // ── Google Docs HTML Paste Modal ────────────────────────────────────────────
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);

  // ── Delete Confirmation ─────────────────────────────────────────────────────
  const [deleteCityTarget, setDeleteCityTarget] = useState<CityItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ── Toast Messages ──────────────────────────────────────────────────────────
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const notify = (type: "success" | "error", message: string) => {
    if (type === "success") {
      setSuccessMsg(message);
      setTimeout(() => setSuccessMsg(null), 4000);
    } else {
      setErrorMsg(message);
      setTimeout(() => setErrorMsg(null), 4000);
    }
  };

  // ── Fetch Cities & Structure ────────────────────────────────────────────────
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/cities");
      const json = await res.json();
      if (json.success) {
        setCities(json.cities || []);
        setServiceOptions(json.serviceOptions || []);
        setCountryOptions(json.countryOptions || {});
      } else {
        throw new Error(json.message || "Failed to load cities data");
      }
    } catch (err: any) {
      console.error(err);
      notify("error", err.message || "Failed to load cities data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // ── Drawer Open / Close ─────────────────────────────────────────────────────
  const openDrawer = (city: CityItem | null) => {
    setEditingCity(city);
    setIsCustomCountry(false);
    setNewCountryName("");
    setNewCountryFlag("🌐");
    setTagInput("");

    if (city) {
      setFormServiceId(city.serviceId);
      setFormCountrySlug(city.countrySlug);
      setFormName(city.name);
      setFormSlug(city.slug);
      setFormHeadline(city.headline || "");
      setFormImageUrl(city.imageUrl || "");
      setFormDescription(city.description || "");
      setFormPopularServices([...city.popularServices]);
      setFormSeoTitle(city.seoTitle || "");
      setFormSeoDesc(city.seoDescription || "");
      setFormFaqs(city.faqs && city.faqs.length > 0 ? [...city.faqs] : []);
      setFormSections(city.sections && city.sections.length > 0 ? [...city.sections] : []);
    } else {
      // Create defaults
      const defaultServiceId =
        filterService !== "All"
          ? filterService
          : serviceOptions[0]?._id || "";
      setFormServiceId(defaultServiceId);

      const availableCountries = countryOptions[defaultServiceId] || [];
      const defaultCountrySlug =
        filterCountry !== "All" && availableCountries.some((c) => c.slug === filterCountry)
          ? filterCountry
          : availableCountries[0]?.slug || "usa";
      setFormCountrySlug(defaultCountrySlug);

      setFormName("");
      setFormSlug("");
      setFormHeadline("");
      setFormImageUrl("");
      setFormDescription("");
      setFormPopularServices(["Local Map Pack Dominance", "Enterprise SEO", "Local Citations"]);
      setFormSeoTitle("");
      setFormSeoDesc("");
      setFormFaqs([
        {
          question: "How long does it take to see organic rankings in this city?",
          answer: "Local map pack and high-intent local keywords typically begin ranking within 60 to 90 days with our targeted geo-optimization.",
        },
      ]);
      setFormSections([]);
    }
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingCity(null);
    setDrawerSaving(false);
  };

  // ── Auto-generate slug when name changes ────────────────────────────────────
  const handleNameChange = (nameVal: string) => {
    setFormName(nameVal);
    if (!editingCity || !formSlug || formSlug === `seo-in-${toSlug(editingCity.name)}`) {
      const generated = toSlug(nameVal);
      setFormSlug(generated ? `seo-in-${generated}` : "");
    }
  };

  // ── Tag Handlers ────────────────────────────────────────────────────────────
  const addTag = (text?: string) => {
    const val = (text || tagInput).trim();
    if (val && !formPopularServices.includes(val)) {
      setFormPopularServices([...formPopularServices, val]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setFormPopularServices(formPopularServices.filter((t) => t !== tag));
  };

  // ── FAQ Handlers ────────────────────────────────────────────────────────────
  const addFaq = () => {
    setFormFaqs([...formFaqs, { question: "", answer: "" }]);
  };

  const updateFaq = (index: number, key: "question" | "answer", val: string) => {
    const updated = [...formFaqs];
    updated[index] = { ...updated[index], [key]: val };
    setFormFaqs(updated);
  };

  const removeFaq = (index: number) => {
    setFormFaqs(formFaqs.filter((_, i) => i !== index));
  };

  // ── Section Handlers ────────────────────────────────────────────────────────
  const addSection = () => {
    setFormSections([
      ...formSections,
      { heading: "", subheading: "", text: "", listItems: [] },
    ]);
  };

  const updateSection = (index: number, key: string, val: any) => {
    const updated = [...formSections];
    updated[index] = { ...updated[index], [key]: val };
    setFormSections(updated);
  };

  const removeSection = (index: number) => {
    setFormSections(formSections.filter((_, i) => i !== index));
  };

  // ── Cloudinary Image Upload Handler ─────────────────────────────────────────
  const handleCityImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setFormImageUrl(data.url);
        notify("success", "City image uploaded to Cloudinary successfully!");
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (err: any) {
      notify("error", err.message || "Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  // ── Google Docs HTML Parse Handler ──────────────────────────────────────────
  const handleGoogleDocsParse = (html: string) => {
    try {
      const parsed = parseGoogleDocsHtml(html);

      if (parsed.title) {
        setFormHeadline(parsed.title);
        // Extract clean city name if formatted as "SEO in Jaipur" or "SEO Services in London"
        const cleanName = parsed.title
          .replace(/^(SEO(\s*\/\s*AEO\s*\/\s*GEO)?(\s+services?)?\s+in\s+)/i, "")
          .replace(/\s*\|.*$/, "")
          .trim();
        if (!formName || formName === "Unnamed city") {
          setFormName(cleanName || parsed.title);
        }
        if (!formSlug) {
          const genSlug = toSlug(cleanName || parsed.title);
          setFormSlug(genSlug ? `seo-in-${genSlug}` : "");
        }
      }

      if (parsed.slug) {
        setFormSlug(toSlug(parsed.slug));
      }

      if (parsed.intro || parsed.excerpt) {
        const raw = parsed.intro || parsed.excerpt;
        const cleanDesc = raw.replace(/<[^>]+>/g, "").trim();
        setFormDescription(cleanDesc);
      }

      if (parsed.seoTitle) {
        setFormSeoTitle(parsed.seoTitle);
      }

      if (parsed.seoDescription) {
        setFormSeoDesc(parsed.seoDescription);
      }

      if (parsed.sections && parsed.sections.length > 0) {
        setFormSections((prev) => [...prev, ...parsed.sections]);
      }

      if (parsed.faqs && parsed.faqs.length > 0) {
        const formattedFaqs: CityFAQ[] = parsed.faqs.map((f: any) => ({
          question: f.question,
          answer: typeof f.answer === "string"
            ? f.answer.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "").trim()
            : f.answer,
          tag: f.tag || "FAQ",
        }));
        setFormFaqs((prev) => [...prev, ...formattedFaqs]);
      }

      notify("success", "Successfully parsed city content from HTML / Google Docs!");
    } catch (err: any) {
      console.error(err);
      notify("error", "Failed to parse HTML content: " + (err.message || "Unknown error"));
    }
  };

  // ── Save City (Create / Edit) ───────────────────────────────────────────────
  const handleSaveCity = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formServiceId) {
      notify("error", "Please select a service.");
      return;
    }
    if (!formCountrySlug && !newCountryName) {
      notify("error", "Please select or specify a country.");
      return;
    }
    if (!formName.trim()) {
      notify("error", "Please enter a city name.");
      return;
    }
    if (!formSlug.trim()) {
      notify("error", "Please enter a valid URL slug.");
      return;
    }

    setDrawerSaving(true);
    try {
      const payload: any = {
        serviceId: formServiceId,
        countrySlug: formCountrySlug,
        name: formName.trim(),
        slug: formSlug.trim(),
        headline: formHeadline.trim(),
        imageUrl: formImageUrl.trim(),
        description: formDescription.trim(),
        popularServices: formPopularServices,
        seoTitle: formSeoTitle.trim(),
        seoDescription: formSeoDesc.trim(),
        faqs: formFaqs.filter((f) => f.question.trim()),
        sections: formSections,
      };

      if (isCustomCountry && newCountryName.trim()) {
        payload.newCountryName = newCountryName.trim();
        payload.newCountryFlag = newCountryFlag.trim() || "🌐";
        payload.countrySlug = toSlug(newCountryName);
      }

      const method = editingCity ? "PUT" : "POST";
      if (editingCity) {
        payload.originalSlug = editingCity.slug;
      }

      const res = await fetch("/api/admin/cities", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to save city");
      }

      notify(
        "success",
        editingCity
          ? `City "${formName}" updated successfully!`
          : `City "${formName}" published successfully!`
      );
      closeDrawer();
      fetchAllData();
    } catch (err: any) {
      notify("error", err.message || "Failed to save city.");
    } finally {
      setDrawerSaving(false);
    }
  };

  // ── Delete City ─────────────────────────────────────────────────────────────
  const handleDeleteCity = async () => {
    if (!deleteCityTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch("/api/admin/cities", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: deleteCityTarget.serviceId,
          countrySlug: deleteCityTarget.countrySlug,
          citySlug: deleteCityTarget.slug,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to delete city");
      }

      notify("success", `City "${deleteCityTarget.name}" deleted.`);
      setCities((prev) => prev.filter((c) => c.id !== deleteCityTarget.id));
      setDeleteCityTarget(null);
    } catch (err: any) {
      notify("error", err.message || "Failed to delete city.");
    } finally {
      setIsDeleting(false);
    }
  };

  const currentDrawerService = useMemo(() => {
    return serviceOptions.find((s) => s._id === formServiceId);
  }, [serviceOptions, formServiceId]);

  const currentLiveCityUrl = useMemo(() => {
    if (!currentDrawerService?.slug || !formCountrySlug || !formSlug) return null;
    return `/services/${currentDrawerService.slug}/${formCountrySlug}/${formSlug}`;
  }, [currentDrawerService, formCountrySlug, formSlug]);

  // ── Countries Subtab State & Handlers ───────────────────────────────────────
  const [countryManageServiceId, setCountryManageServiceId] = useState<string>("");
  const [countryList, setCountryList] = useState<any[]>([]);
  const [countryFetching, setCountryFetching] = useState(false);
  const [countrySaving, setCountrySaving] = useState(false);
  const [openSeoIndexes, setOpenSeoIndexes] = useState<Record<number, boolean>>({});

  const selectedCountryManageService = useMemo(() => {
    return serviceOptions.find((s) => s._id === countryManageServiceId);
  }, [serviceOptions, countryManageServiceId]);

  useEffect(() => {
    if (serviceOptions.length > 0 && !countryManageServiceId) {
      setCountryManageServiceId(serviceOptions[0]._id);
    }
  }, [serviceOptions, countryManageServiceId]);

  const loadServiceLocations = async (sId: string) => {
    if (!sId) return;
    setCountryFetching(true);
    try {
      const res = await fetch(`/api/admin/services/${sId}/locations`);
      const json = await res.json();
      if (json.success) {
        const rawCountries = json.data || [];
        const normalized = rawCountries.map((c: any) => ({
          ...c,
          headline: c.headline || "",
          description: c.description || "",
          ctaTitle: c.ctaTitle || "",
          ctaDescription: c.ctaDescription || "",
          seoTitle: c.seoTitle || "",
          seoDescription: c.seoDescription || "",
        }));
        setCountryList(normalized);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCountryFetching(false);
    }
  };

  useEffect(() => {
    if (activeSubTab === "countries" && countryManageServiceId) {
      loadServiceLocations(countryManageServiceId);
    }
  }, [activeSubTab, countryManageServiceId]);

  const handleSaveCountries = async () => {
    if (!countryManageServiceId) return;
    setCountrySaving(true);
    try {
      const res = await fetch(`/api/admin/services/${countryManageServiceId}/locations`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locations: countryList }),
      });
      const json = await res.json();
      if (json.success) {
        notify("success", "Countries saved successfully!");
        fetchAllData();
      } else {
        throw new Error(json.message || "Failed to save countries");
      }
    } catch (err: any) {
      notify("error", err.message || "Error saving countries");
    } finally {
      setCountrySaving(false);
    }
  };

  // ── Filtered Cities List ────────────────────────────────────────────────────
  const filteredCities = useMemo(() => {
    return cities.filter((city) => {
      const matchesSearch =
        searchQuery === "" ||
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.countryName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesService =
        filterService === "All" || city.serviceId === filterService;

      const matchesCountry =
        filterCountry === "All" || city.countrySlug === filterCountry;

      return matchesSearch && matchesService && matchesCountry;
    });
  }, [cities, searchQuery, filterService, filterCountry]);

  // Unique country slugs for filter dropdown
  const uniqueFilterCountries = useMemo(() => {
    const map = new Map<string, string>();
    cities.forEach((c) => {
      if (!map.has(c.countrySlug)) {
        map.set(c.countrySlug, `${c.countryFlag} ${c.countryName}`);
      }
    });
    return Array.from(map.entries());
  }, [cities]);

  // Countries available for the currently selected service in the drawer
  const drawerAvailableCountries = useMemo(() => {
    return countryOptions[formServiceId] || [];
  }, [countryOptions, formServiceId]);

  /* ═══════════════════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════════════ */

  return (
    <>
      {/* Toast Messages */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-[80] flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border bg-[#111] border-emerald-500/40 text-emerald-400 text-sm font-semibold"
          >
            <Check className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </motion.div>
        )}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-[80] flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border bg-[#111] border-red-500/40 text-red-400 text-sm font-semibold"
          >
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        {/* ── Top Header & Tab Switcher ─────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black font-display uppercase tracking-tight flex items-center gap-2.5">
              <MapPin className="w-7 h-7 text-brand-accent" />
              Service Locations
            </h1>
            <p className="text-white/40 text-sm mt-1">
              {cities.length} active cities &middot; manage landing pages, localized SEO, and regional coverage.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* View switcher tabs */}
            <div className="bg-white/5 border border-white/10 p-1 rounded-xl flex items-center">
              <button
                type="button"
                onClick={() => setActiveSubTab("cities")}
                className={`px-4 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all ${activeSubTab === "cities"
                  ? "bg-brand-accent text-slate-900 shadow-sm"
                  : "text-white/50 hover:text-white"
                  }`}
              >
                Cities Directory
              </button>
              <button
                type="button"
                onClick={() => setActiveSubTab("countries")}
                className={`px-4 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all ${activeSubTab === "countries"
                  ? "bg-brand-accent text-slate-900 shadow-sm"
                  : "text-white/50 hover:text-white"
                  }`}
              >
                Country Hubs (Hero Content)
              </button>
            </div>

            {activeSubTab === "cities" && (
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    openDrawer(null);
                    setIsPasteModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white font-display text-xs uppercase font-extrabold tracking-wider hover:bg-white/20 transition-all shadow-xl"
                >
                  <Code2 className="w-4 h-4 text-brand-accent" />
                  Paste from Google Docs
                </button>
                <button
                  onClick={() => openDrawer(null)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-accent text-slate-900 font-display text-xs uppercase font-extrabold tracking-wider hover:bg-white transition-all shadow-xl shadow-brand-accent/20"
                >
                  <Plus className="w-4 h-4" /> New City
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Helper Banner */}
        {activeSubTab === "cities" && (
          <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-white/80">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-brand-accent shrink-0" />
              <span>
                Want to edit the Country Hub hero title, description, or badges (e.g. <strong>/services/seo-aeo-geo/india</strong>)? Switch to <strong>Country Hubs</strong>.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveSubTab("countries")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-accent/10 hover:bg-brand-accent text-brand-accent hover:text-slate-900 font-bold tracking-wide transition-all self-start sm:self-auto shrink-0"
            >
              <span>Go to Country Hubs</span>
              <span>&rarr;</span>
            </button>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════════
            TAB 1: CITIES DIRECTORY (modeled like BlogsAdmin)
           ═════════════════════════════════════════════════════════════════════ */}
        {activeSubTab === "cities" && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-wrap gap-3 items-center">
              {/* Search */}
              <div className="relative flex-1 min-w-[220px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search city by name, slug, or country..."
                  className="w-full bg-transparent border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent transition-all"
                />
              </div>

              {/* Service filter */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                  Service:
                </span>
                <select
                  value={filterService}
                  onChange={(e) => setFilterService(e.target.value)}
                  className="bg-[#111] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent"
                >
                  <option value="All">All Services</option>
                  {serviceOptions.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Country filter */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                  Country:
                </span>
                <select
                  value={filterCountry}
                  onChange={(e) => setFilterCountry(e.target.value)}
                  className="bg-[#111] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent"
                >
                  <option value="All">All Countries</option>
                  {uniqueFilterCountries.map(([slug, label]) => (
                    <option key={slug} value={slug}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={fetchAllData}
                className="p-2 rounded-xl border border-white/10 hover:bg-white/5 text-white/40 hover:text-white transition-all ml-auto"
                title="Refresh from server"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Cities Table */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 bg-white/5 border border-white/10 rounded-2xl">
                <Loader2 className="w-8 h-8 text-brand-accent animate-spin mb-3" />
                <p className="text-white/40 text-sm">Loading cities...</p>
              </div>
            ) : filteredCities.length === 0 ? (
              <div className="text-center py-20 bg-white/5 border border-white/10 border-dashed rounded-2xl">
                <MapPin className="w-10 h-10 text-white/20 mx-auto mb-3" />
                <p className="text-white/60 text-base font-bold">No cities found</p>
                <p className="text-white/30 text-xs mt-1 mb-5">
                  {searchQuery || filterService !== "All" || filterCountry !== "All"
                    ? "Try adjusting your search or filters."
                    : "Get started by adding your first city landing page."}
                </p>
                <button
                  onClick={() => openDrawer(null)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-accent text-slate-900 font-display text-xs uppercase font-extrabold tracking-wider hover:bg-white transition-all"
                >
                  <Plus className="w-4 h-4" /> Add City Now
                </button>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-x-auto shadow-2xl">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40 bg-white/[0.02]">
                      <th className="py-4 px-6">City Name & URL</th>
                      <th className="py-4 px-6">Country</th>
                      <th className="py-4 px-6">Service</th>
                      <th className="py-4 px-6">Tags / Capabilities</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredCities.map((city) => {
                      const liveUrl = `/services/${city.serviceSlug}/${city.countrySlug}/${city.slug}`;

                      return (
                        <tr
                          key={city.id}
                          className="hover:bg-white/[0.03] transition-colors group"
                        >
                          {/* City Name & Slug */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2.5">
                              <MapPin className="w-4 h-4 text-brand-accent shrink-0" />
                              <div>
                                <p className="font-bold text-white text-sm group-hover:text-brand-accent transition-colors">
                                  {city.name}
                                </p>
                                <p className="text-[11px] font-mono text-white/40 mt-0.5">
                                  /{city.slug}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Country */}
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white">
                              <span className="text-base leading-none select-none">
                                {city.countryFlag}
                              </span>
                              <span>{city.countryName}</span>
                            </span>
                          </td>

                          {/* Service */}
                          <td className="py-4 px-6">
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
                              {city.serviceTitle}
                            </span>
                          </td>

                          {/* Tags */}
                          <td className="py-4 px-6">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {city.popularServices.slice(0, 3).map((tag, i) => (
                                <span
                                  key={i}
                                  className="text-[9px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-white/60 border border-white/5"
                                >
                                  {tag}
                                </span>
                              ))}
                              {city.popularServices.length > 3 && (
                                <span className="text-[9px] font-bold text-brand-accent px-1">
                                  +{city.popularServices.length - 3}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <a
                                href={liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg text-white/40 hover:text-brand-accent hover:bg-brand-accent/10 transition-colors"
                                title="View live page"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                              <button
                                onClick={() => openDrawer(city)}
                                className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                                title="Edit city"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteCityTarget(city)}
                                className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                                title="Delete city"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════════
            TAB 2: COUNTRY HUBS MANAGEMENT (Clean, unbloated per-service)
           ═════════════════════════════════════════════════════════════════════ */}
        {activeSubTab === "countries" && (
          <div className="space-y-6">
            {/* Service selector */}
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Select Service
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <select
                    value={countryManageServiceId}
                    onChange={(e) => setCountryManageServiceId(e.target.value)}
                    className="bg-[#111] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-brand-accent"
                  >
                    {serviceOptions.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.title} ({s.slug})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSaveCountries}
                  disabled={countrySaving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-accent text-slate-900 font-display text-xs uppercase font-extrabold tracking-wider hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-brand-accent/20"
                >
                  {countrySaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  {countrySaving ? "Saving..." : "Save Countries"}
                </button>
              </div>
            </div>

            {/* Countries List */}
            {countryFetching ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white/5 border border-white/10 rounded-2xl">
                <Loader2 className="w-8 h-8 text-brand-accent animate-spin mb-3" />
                <p className="text-white/40 text-sm">Loading countries...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {countryList.map((country, cIdx) => {
                  const isSeoOpen = !!openSeoIndexes[cIdx];
                  const liveHubUrl =
                    selectedCountryManageService?.slug && country.slug
                      ? `/services/${selectedCountryManageService.slug}/${country.slug}`
                      : null;

                  return (
                    <div
                      key={cIdx}
                      className="bg-[#111] border border-white/10 rounded-2xl p-6 space-y-5"
                    >
                      {/* Header Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/5">
                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            value={country.flag || "🌐"}
                            onChange={(e) => {
                              const updated = [...countryList];
                              updated[cIdx].flag = e.target.value;
                              setCountryList(updated);
                            }}
                            className="w-12 text-center text-2xl bg-white/5 border border-white/10 rounded-xl py-1.5 focus:outline-none focus:border-brand-accent"
                            title="Country Flag emoji"
                          />
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                              Country Hub #{cIdx + 1}
                            </p>
                            <p className="text-base font-extrabold text-white">
                              {country.name || "Unnamed country"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-white/60 border border-white/5 font-mono">
                            {country.cities?.length || 0} cities configured
                          </span>

                          {liveHubUrl && (
                            <a
                              href={liveHubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-brand-accent hover:text-slate-900 border border-white/10 text-xs font-bold text-white transition-all shadow-sm"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Preview Live Hub</span>
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              setCountryList(
                                countryList.filter((_, i) => i !== cIdx)
                              );
                            }}
                            className="p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Delete Country"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Basic Identity & Headline */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                            Country Name *
                          </label>
                          <input
                            type="text"
                            value={country.name || ""}
                            onChange={(e) => {
                              const updated = [...countryList];
                              updated[cIdx].name = e.target.value;
                              if (
                                !country.slug ||
                                country.slug === toSlug(country.name)
                              ) {
                                updated[cIdx].slug = toSlug(e.target.value);
                              }
                              setCountryList(updated);
                            }}
                            className="w-full mt-1.5 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-accent"
                            placeholder="e.g. India"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                            URL Slug *
                          </label>
                          <input
                            type="text"
                            value={country.slug || ""}
                            onChange={(e) => {
                              const updated = [...countryList];
                              updated[cIdx].slug = toSlug(e.target.value);
                              setCountryList(updated);
                            }}
                            className="w-full mt-1.5 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-accent"
                            placeholder="e.g. india"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                            Hero Headline (H1)
                          </label>
                          <input
                            type="text"
                            value={country.headline || ""}
                            onChange={(e) => {
                              const updated = [...countryList];
                              updated[cIdx].headline = e.target.value;
                              setCountryList(updated);
                            }}
                            className="w-full mt-1.5 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-accent"
                            placeholder={`Default: ${selectedCountryManageService?.title || "SEO"} service in ${country.name || "Country"}`}
                          />
                          <p className="text-[10px] text-white/30 mt-1">
                            Leave empty to use &ldquo;{selectedCountryManageService?.title || "Service"} service in {country.name || "Country"}&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* Description (Lead Paragraph) */}
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                            Hero Description (Lead Paragraph)
                          </label>
                          <span className="text-[10px] text-white/30">
                            Displayed beneath the main title
                          </span>
                        </div>
                        <textarea
                          rows={3}
                          value={country.description || ""}
                          onChange={(e) => {
                            const updated = [...countryList];
                            updated[cIdx].description = e.target.value;
                            setCountryList(updated);
                          }}
                          placeholder="Select your city below to explore localized keyword targets, market competitive insights, and dedicated SEO tactics engineered for your area."
                          className="w-full mt-1.5 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-accent leading-relaxed resize-y"
                        />
                      </div>

                      {/* Right-Side Hero CTA Box Settings */}
                      <div className="bg-white/5 border border-white/5 p-4 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                            Right-Side Hero CTA Card
                          </p>
                          <span className="text-[10px] text-white/30">
                            Appears opposite the headline on the country hub
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                              CTA Title
                            </label>
                            <input
                              type="text"
                              value={country.ctaTitle || ""}
                              onChange={(e) => {
                                const updated = [...countryList];
                                updated[cIdx].ctaTitle = e.target.value;
                                setCountryList(updated);
                              }}
                              placeholder={`Need Custom Organic Growth in ${country.name || "Country"}?`}
                              className="w-full mt-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                              CTA Description
                            </label>
                            <textarea
                              rows={2}
                              value={country.ctaDescription || ""}
                              onChange={(e) => {
                                const updated = [...countryList];
                                updated[cIdx].ctaDescription = e.target.value;
                                setCountryList(updated);
                              }}
                              placeholder={`Whether you are expanding nationally across ${country.name || "Country"} or targeting high-conversion local niches...`}
                              className="w-full mt-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent resize-none leading-relaxed"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Collapsible SEO Metadata */}
                      <div className="border-t border-white/5 pt-3">
                        <button
                          type="button"
                          onClick={() => {
                            setOpenSeoIndexes((prev) => ({
                              ...prev,
                              [cIdx]: !prev[cIdx],
                            }));
                          }}
                          className="inline-flex items-center gap-2 text-xs text-brand-accent hover:underline font-bold"
                        >
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform ${isSeoOpen ? "rotate-180" : ""
                              }`}
                          />
                          <span>
                            {isSeoOpen
                              ? "Hide SEO & Meta Tags"
                              : "Edit SEO & Meta Tags for this Country Hub"}
                          </span>
                        </button>

                        {isSeoOpen && (
                          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                            <div>
                              <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                                SEO Meta Title
                              </label>
                              <input
                                type="text"
                                value={country.seoTitle || ""}
                                onChange={(e) => {
                                  const updated = [...countryList];
                                  updated[cIdx].seoTitle = e.target.value;
                                  setCountryList(updated);
                                }}
                                placeholder={`${country.headline || `${selectedCountryManageService?.title || "SEO"} in ${country.name || "Country"}`} | Regional Search Optimization`}
                                className="w-full mt-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                                SEO Meta Description
                              </label>
                              <textarea
                                rows={2}
                                value={country.seoDescription || ""}
                                onChange={(e) => {
                                  const updated = [...countryList];
                                  updated[cIdx].seoDescription = e.target.value;
                                  setCountryList(updated);
                                }}
                                placeholder="Discover top-tier search marketing across..."
                                className="w-full mt-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent resize-none"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Live Preview Box (matches user screenshot with 2-column layout) */}
                      <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-brand-accent flex items-center gap-1.5 font-bold">
                            <Sparkles className="w-3 h-3 text-brand-accent" />
                            Live Website Preview (Hero + Right CTA)
                          </span>
                          {liveHubUrl && (
                            <span className="text-[10px] font-mono text-white/40">
                              {liveHubUrl}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 border-t border-white/10 pt-4 items-center">
                          {/* Left Column Preview */}
                          <div className="md:col-span-7 space-y-2">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-brand-accent uppercase tracking-wider">
                              <Globe className="w-3 h-3" />
                              <span>
                                Regional Coverage Hub &bull; {country.name || "Country"}
                              </span>
                            </div>
                            <h4 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                              {country.headline ? (
                                country.headline
                              ) : (
                                <span>
                                  {selectedCountryManageService?.title || "SEO / AEO / GEO"} service in{" "}
                                  <span className="text-brand-accent">
                                    {country.name || "India"}
                                  </span>
                                </span>
                              )}
                            </h4>
                            <p className="text-xs text-white/70 leading-relaxed">
                              {country.description ||
                                "Select your city below to explore localized keyword targets, market competitive insights, and dedicated SEO tactics engineered for your area."}
                            </p>
                          </div>

                          {/* Right Column CTA Preview */}
                          <div className="md:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2.5">
                            <h5 className="font-display font-extrabold text-sm text-white">
                              {country.ctaTitle || `Need Custom Organic Growth in ${country.name || "Country"}?`}
                            </h5>
                            <p className="text-[11px] text-white/60 leading-relaxed">
                              {country.ctaDescription ||
                                `Whether you are expanding nationally across ${country.name || "Country"} or targeting high-conversion local niches, our SEO strategists are ready to audit your presence.`}
                            </p>
                            <div className="space-y-2 pt-1">
                              <div className="w-full text-center py-2 rounded-full bg-brand-accent text-slate-900 font-extrabold text-[10px] uppercase tracking-wider">
                                Schedule Country Strategy Call
                              </div>
                              <div className="w-full text-center py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-[10px] uppercase font-bold">
                                Back to {selectedCountryManageService?.title || "Services"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={() => {
                    setCountryList([
                      ...countryList,
                      {
                        name: "",
                        slug: "",
                        flag: "🌐",
                        headline: "",
                        description: "",
                        ctaTitle: "",
                        ctaDescription: "",
                        cities: [],
                      },
                    ]);
                  }}
                  className="w-full py-4 rounded-2xl border border-dashed border-white/20 text-white/50 hover:text-brand-accent hover:border-brand-accent/40 hover:bg-brand-accent/5 transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Another Country
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          CITY SLIDE-OVER DRAWER (Matches BlogsAdmin slide-over exactly)
         ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="absolute inset-0 bg-black/80 backdrop-blur-xs"
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="relative w-full max-w-3xl bg-[#0d0d0d] border-l border-white/10 h-full shadow-2xl flex flex-col justify-between z-10"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#0d0d0d]">
                <div>
                  <h3 className="text-xl font-display font-black uppercase tracking-tight flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-brand-accent" />
                    {editingCity ? "Edit City Landing Page" : "Add New City Landing Page"}
                  </h3>
                  <p className="text-xs text-white/40 mt-0.5">
                    Configure localized content, capabilities, and SEO tags.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {currentLiveCityUrl && (
                    <a
                      href={currentLiveCityUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-brand-accent hover:text-slate-900 border border-white/10 text-xs font-bold text-white transition-all shadow-sm"
                      title="Open live page in new tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Live Page</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsPasteModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-accent/15 border border-brand-accent/30 text-brand-accent text-xs font-bold uppercase tracking-wider hover:bg-brand-accent hover:text-slate-900 transition-all"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    Paste HTML
                  </button>
                  <button
                    onClick={closeDrawer}
                    className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Drawer Form Body */}
              <form
                onSubmit={handleSaveCity}
                className="flex-1 overflow-y-auto p-6 space-y-10"
              >
                {/* 1. SERVICE & COUNTRY ASSIGNMENT */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black font-display uppercase tracking-widest text-brand-accent border-b border-white/10 pb-2">
                    1. Target Service & Country
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Service */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                        Target Service *
                      </label>
                      <select
                        value={formServiceId}
                        onChange={(e) => {
                          setFormServiceId(e.target.value);
                          const avail = countryOptions[e.target.value] || [];
                          if (avail.length > 0) {
                            setFormCountrySlug(avail[0].slug);
                          }
                        }}
                        required
                        className="w-full bg-[#161616] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-accent"
                      >
                        {serviceOptions.map((s) => (
                          <option key={s._id} value={s._id}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Country */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                          Target Country *
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsCustomCountry(!isCustomCountry)}
                          className="text-[10px] text-brand-accent hover:underline font-bold"
                        >
                          {isCustomCountry ? "← Choose existing" : "+ Add new country"}
                        </button>
                      </div>

                      {!isCustomCountry ? (
                        <select
                          value={formCountrySlug}
                          onChange={(e) => setFormCountrySlug(e.target.value)}
                          required
                          className="w-full bg-[#161616] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-accent"
                        >
                          {drawerAvailableCountries.map((c) => (
                            <option key={c.slug} value={c.slug}>
                              {c.flag} {c.name} ({c.slug})
                            </option>
                          ))}
                          {drawerAvailableCountries.length === 0 && (
                            <option value="usa">🇺🇸 United States</option>
                          )}
                        </select>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newCountryFlag}
                            onChange={(e) => setNewCountryFlag(e.target.value)}
                            placeholder="🌐"
                            className="w-12 text-center bg-[#161616] border border-white/10 rounded-xl px-2 py-2 text-sm focus:outline-none focus:border-brand-accent"
                            title="Flag emoji"
                          />
                          <input
                            type="text"
                            value={newCountryName}
                            onChange={(e) => setNewCountryName(e.target.value)}
                            placeholder="e.g. France"
                            className="flex-1 bg-[#161616] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-brand-accent"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. CITY BASICS */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black font-display uppercase tracking-widest text-brand-accent border-b border-white/10 pb-2">
                    2. City Basics & URLs
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                        City Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="e.g. Chicago"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-brand-accent transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                        URL Slug *
                      </label>
                      <input
                        type="text"
                        required
                        value={formSlug}
                        onChange={(e) => setFormSlug(toSlug(e.target.value))}
                        placeholder="e.g. seo-in-chicago"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder:text-white/20 focus:outline-none focus:border-brand-accent transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                      Editorial Headline (Optional H1 override)
                    </label>
                    <input
                      type="text"
                      value={formHeadline}
                      onChange={(e) => setFormHeadline(e.target.value)}
                      placeholder="e.g. Accelerate High-Intent Organic Growth in Chicago"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-brand-accent transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                      City Description / Executive Summary
                    </label>
                    <textarea
                      rows={3}
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="Describe the regional competitive search landscape and how we dominate it..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-brand-accent resize-none transition-all"
                    />
                  </div>
                </div>

                {/* 3. FEATURED CITY IMAGE (CLOUDINARY) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div>
                      <h4 className="text-xs font-black font-display uppercase tracking-widest text-brand-accent">
                        3. Featured City Image (Cloudinary)
                      </h4>
                      <p className="text-[10px] text-white/40 mt-0.5">
                        Displayed at the top of the city article page. Upload directly to Cloudinary or paste an image URL.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleCityImageUpload}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 shrink-0"
                      >
                        {uploadingImage ? (
                          <Loader2 className="w-4 h-4 animate-spin text-brand-accent" />
                        ) : (
                          <UploadCloud className="w-4 h-4 text-brand-accent" />
                        )}
                        {uploadingImage ? "Uploading to Cloudinary..." : "Upload from Computer"}
                      </button>
                      <span className="text-white/30 text-xs text-center sm:text-left">OR</span>
                      <input
                        type="text"
                        value={formImageUrl}
                        onChange={(e) => setFormImageUrl(e.target.value)}
                        placeholder="Paste Cloudinary or image URL..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-brand-accent"
                      />
                    </div>

                    {formImageUrl && (
                      <div className="rounded-xl overflow-hidden border border-white/10 h-48 relative bg-black/50 group">
                        <img
                          src={formImageUrl}
                          alt="City preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => setFormImageUrl("")}
                            className="p-2 bg-red-500/90 hover:bg-red-500 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove Image</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. POPULAR SERVICES / PILLS */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black font-display uppercase tracking-widest text-brand-accent border-b border-white/10 pb-2">
                    4. Capabilities & Service Tags
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {formPopularServices.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-bold"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-400 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                      placeholder="Type capability tag and press Enter..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-brand-accent"
                    />
                    <button
                      type="button"
                      onClick={() => addTag()}
                      className="px-4 py-2 rounded-xl bg-brand-accent/15 border border-brand-accent/25 text-brand-accent text-xs font-extrabold hover:bg-brand-accent/25 transition-all"
                    >
                      Add Tag
                    </button>
                  </div>

                  {/* Suggestion Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] uppercase font-bold text-white/30 mr-1">
                      Suggestions:
                    </span>
                    {[
                      "Local Map Pack Dominance",
                      "Enterprise SEO",
                      "Local Citations & GBP",
                      "B2B Lead Generation",
                      "E-Commerce SEO",
                      "High-ROI Authority Links",
                    ].map((sug, si) => (
                      <button
                        key={si}
                        type="button"
                        onClick={() => addTag(sug)}
                        className="text-[10px] text-white/40 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        + {sug}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. LOCAL MARKET FAQS */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <h4 className="text-xs font-black font-display uppercase tracking-widest text-brand-accent">
                      5. Local Market FAQs
                    </h4>
                    <button
                      type="button"
                      onClick={addFaq}
                      className="text-xs font-extrabold text-brand-accent hover:text-white flex items-center gap-1 uppercase tracking-wider"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Question
                    </button>
                  </div>

                  {formFaqs.length === 0 && (
                    <p className="text-xs text-white/30 italic py-2">
                      No custom FAQs added. Default regional FAQs will be shown automatically.
                    </p>
                  )}

                  <div className="space-y-3">
                    {formFaqs.map((faq, fIdx) => (
                      <div
                        key={fIdx}
                        className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3 relative group"
                      >
                        <button
                          type="button"
                          onClick={() => removeFaq(fIdx)}
                          className="absolute top-3 right-3 p-1 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="pr-8">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                            Question #{fIdx + 1}
                          </label>
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => updateFaq(fIdx, "question", e.target.value)}
                            placeholder="e.g. How long does local SEO take in this city?"
                            className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                            Answer
                          </label>
                          <textarea
                            rows={2}
                            value={faq.answer}
                            onChange={(e) => updateFaq(fIdx, "answer", e.target.value)}
                            placeholder="Provide a clear, authoritative response..."
                            className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. EDITORIAL CONTENT SECTIONS */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div>
                      <h4 className="text-xs font-black font-display uppercase tracking-widest text-brand-accent">
                        6. Editorial Content Sections
                      </h4>
                      <p className="text-[10px] text-white/40 mt-0.5">
                        Rich content sections parsed from Google Docs / HTML or created manually.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsPasteModalOpen(true)}
                        className="text-[11px] font-bold text-white/60 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Code2 className="w-3.5 h-3.5 text-brand-accent" />
                        Paste HTML
                      </button>
                      <button
                        type="button"
                        onClick={addSection}
                        className="text-[11px] font-extrabold text-slate-900 bg-brand-accent hover:opacity-90 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 uppercase tracking-wider"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Section
                      </button>
                    </div>
                  </div>

                  {formSections.length === 0 && (
                    <div className="text-center py-8 bg-white/[0.02] border border-dashed border-white/10 rounded-xl p-4">
                      <p className="text-xs text-white/40 mb-2">
                        No custom content sections added yet.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsPasteModalOpen(true)}
                        className="inline-flex items-center gap-1.5 text-xs text-brand-accent font-bold hover:underline"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Paste Google Docs / HTML to populate automatically
                      </button>
                    </div>
                  )}

                  <div className="space-y-4">
                    {formSections.map((sec, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3 relative group"
                      >
                        <button
                          type="button"
                          onClick={() => removeSection(sIdx)}
                          className="absolute top-3 right-3 p-1 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                          title="Remove Section"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="pr-8">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                            Section #{sIdx + 1} Heading (H2)
                          </label>
                          <input
                            type="text"
                            value={sec.heading || ""}
                            onChange={(e) => updateSection(sIdx, "heading", e.target.value)}
                            placeholder="e.g. 1. The Competitive Search Landscape in Chicago"
                            className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                            Subheading (Optional H3)
                          </label>
                          <input
                            type="text"
                            value={sec.subheading || ""}
                            onChange={(e) => updateSection(sIdx, "subheading", e.target.value)}
                            placeholder="e.g. Local Map Pack Proximity Factors"
                            className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                            Section Content (HTML or Paragraphs)
                          </label>
                          <textarea
                            rows={4}
                            value={sec.text || ""}
                            onChange={(e) => updateSection(sIdx, "text", e.target.value)}
                            placeholder="Write or paste paragraph content here (HTML tags like <p>, <strong>, <a> are supported)..."
                            className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent font-mono leading-relaxed resize-y"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7. SEO METADATA */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black font-display uppercase tracking-widest text-brand-accent border-b border-white/10 pb-2">
                    7. Search Engine Optimization (SEO)
                  </h4>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                      Custom Meta Title (Optional)
                    </label>
                    <input
                      type="text"
                      value={formSeoTitle}
                      onChange={(e) => setFormSeoTitle(e.target.value)}
                      placeholder="e.g. Top SEO Services in Chicago | Inquisitive Digital"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-brand-accent transition-all"
                    />
                    <p className="text-[10px] text-white/30">
                      Recommended: 50-60 characters. Leave empty to use automated pattern.
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                      Custom Meta Description (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formSeoDesc}
                      onChange={(e) => setFormSeoDesc(e.target.value)}
                      placeholder="e.g. Accelerate organic traffic and map pack rankings for your Chicago enterprise..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-brand-accent resize-none transition-all"
                    />
                    <p className="text-[10px] text-white/30">
                      Recommended: 150-160 characters.
                    </p>
                  </div>
                </div>

                {/* 8. LIVE PAGE PREVIEW CARD */}
                <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-brand-accent flex items-center gap-1.5 font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
                      Live City Landing Page Preview
                    </span>
                    {currentLiveCityUrl && (
                      <a
                        href={currentLiveCityUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono text-brand-accent hover:underline flex items-center gap-1"
                      >
                        <span>{currentLiveCityUrl}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <div className="border-t border-white/10 pt-4 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-brand-accent uppercase tracking-wider">
                      <MapPin className="w-3 h-3" />
                      <span>
                        {formName || "City Name"} &bull; {formCountrySlug.toUpperCase()}
                      </span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                      {formHeadline || `${currentDrawerService?.title || "SEO"} in ${formName || "City"}`}
                    </h4>

                    {formImageUrl && (
                      <div className="rounded-xl overflow-hidden border border-white/10 h-36 relative bg-black/40">
                        <img
                          src={formImageUrl}
                          alt="City visual"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <p className="text-xs text-white/70 leading-relaxed font-body">
                      {formDescription || "No description entered yet. Describe your local service strategy..."}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="px-2.5 py-1 rounded-lg bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[11px] font-bold">
                        {formSections.length} Editorial Content Sections
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/60 text-[11px] font-mono">
                        {formFaqs.length} Custom FAQs
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/60 text-[11px] font-mono">
                        {formPopularServices.length} Capability Tags
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions inside Form */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeDrawer}
                    className="px-5 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={drawerSaving}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-brand-accent text-slate-900 font-display font-black text-xs uppercase tracking-wider hover:bg-white disabled:opacity-50 transition-all shadow-xl shadow-brand-accent/20"
                  >
                    {drawerSaving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    {drawerSaving
                      ? "Saving..."
                      : editingCity
                        ? "Update City"
                        : "Publish City"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════════
          DELETE CONFIRMATION MODAL
         ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {deleteCityTarget && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteCityTarget(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-[#121212] border border-red-500/30 rounded-2xl p-6 space-y-4 shadow-2xl z-10"
            >
              <div className="flex items-center gap-3 text-red-400">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Delete City Landing Page?</h3>
                  <p className="text-xs text-white/50">This action cannot be undone.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-xs text-white/80 space-y-1 font-mono">
                <p>
                  <span className="text-white/40">City:</span> {deleteCityTarget.name}
                </p>
                <p>
                  <span className="text-white/40">Country:</span> {deleteCityTarget.countryName}
                </p>
                <p>
                  <span className="text-white/40">Service:</span> {deleteCityTarget.serviceTitle}
                </p>
                <p>
                  <span className="text-white/40">URL:</span> /{deleteCityTarget.slug}
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteCityTarget(null)}
                  disabled={isDeleting}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteCity}
                  disabled={isDeleting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  {isDeleting ? "Deleting..." : "Delete Permanently"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Google Docs / Raw HTML Paste Modal */}
      <GoogleDocsPasteModal
        isOpen={isPasteModalOpen}
        onClose={() => setIsPasteModalOpen(false)}
        onParse={handleGoogleDocsParse}
        title="Paste City Content (HTML / Google Docs)"
        populateLabel="Populate City Form"
      />
    </>
  );
}
