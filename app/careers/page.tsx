"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { useTheme } from "@/components/ThemeProvider";
import { mockJobs, Job } from "./data";
import { Search, MapPin, Briefcase, DollarSign, ArrowRight, Inbox } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function CareersPage() {
  const { themeMode } = useTheme();
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter States
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  const isLight = themeMode === "singular-light";
  const isDarkSingular = themeMode === "singular-dark";

  // Fetch jobs from backend on mount
  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch(`${API_BASE}/api/jobs`, { cache: "no-store" });
        if (!res.ok) throw new Error("API error");
        const json = await res.json();
        const jobsArray = json.data || json.jobs;
        if (jobsArray && jobsArray.length > 0) {
          setJobs(jobsArray);
        }
      } catch (err) {
        console.warn("Backend API not running or failed. Falling back to static mock jobs.");
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  // Compute unique filters dynamically based on fetched/fallback jobs
  const departments = useMemo(() => {
    const depts = new Set(jobs.map((j) => j.department));
    return ["All", ...Array.from(depts)];
  }, [jobs]);

  const jobTypes = ["All", "Full-time", "Part-time", "Remote"];

  const locations = useMemo(() => {
    const locs = new Set(jobs.map((j) => j.location));
    return ["All", ...Array.from(locs)];
  }, [jobs]);

  // Real-time filtering logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = selectedDept === "All" || job.department === selectedDept;
      const matchesType = selectedType === "All" || job.type === selectedType;
      const matchesLoc = selectedLocation === "All" || job.location === selectedLocation;

      return matchesSearch && matchesDept && matchesType && matchesLoc;
    });
  }, [jobs, searchQuery, selectedDept, selectedType, selectedLocation]);

  // View & Apply button click
  const handleViewAndApply = (job: Job) => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("selectedJob", JSON.stringify(job));
    }
    router.push(`/careers/${job.id}`);
  };

  return (
    <>
      <Header />
      <main
        className={`flex-grow w-full pt-32 md:pt-40 pb-24 min-h-[85vh] transition-colors duration-500 overflow-hidden flex flex-col items-center justify-start ${
          isLight ? "bg-white" : isDarkSingular ? "bg-[#0a0a0a]" : "bg-[#0f0e0e]"
        }`}
      >
        {/* Page Hero Header */}
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop relative text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.3em] mb-4 block font-bold text-brand-accent animate-pulse-subtle"
          >
            Join Our Team
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight mb-6 ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            CAREERS AT <span className="text-brand-accent">INQUISITIVE</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-body text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${
              isLight ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Work with a group of performance marketers, engineers, and designers who thrive on building premium digital solutions without the fluff.
          </motion.p>
        </div>

        {/* Search and Filters Section */}
        <div className="max-w-6xl w-full mx-auto px-6 mb-12">
          <div
            className={`p-6 rounded-2xl border ${
              isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/10"
            } space-y-6`}
          >
            {/* Search Input */}
            <div className="relative flex items-center">
              <Search className={`absolute left-4 w-5 h-5 ${isLight ? "text-slate-400" : "text-white/40"}`} />
              <input
                type="text"
                placeholder="Search jobs by title, department, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all ${
                  isLight
                    ? "bg-white border-slate-200 text-slate-950 placeholder-slate-400"
                    : "bg-[#111111]/70 border-white/10 text-white placeholder-white/30"
                }`}
              />
            </div>

            {/* Filter Chips / Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Department Dropdown */}
              <div className="flex flex-col gap-2">
                <label className={`text-xs uppercase tracking-wider font-bold ${isLight ? "text-slate-500" : "text-white/50"}`}>
                  Department
                </label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all cursor-pointer ${
                    isLight
                      ? "bg-white border-slate-200 text-slate-950 focus:border-brand-accent"
                      : "bg-[#111111]/70 border-white/10 text-white focus:border-brand-accent"
                  }`}
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept} className={isLight ? "text-slate-950" : "text-black"}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Job Type Dropdown */}
              <div className="flex flex-col gap-2">
                <label className={`text-xs uppercase tracking-wider font-bold ${isLight ? "text-slate-500" : "text-white/50"}`}>
                  Job Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all cursor-pointer ${
                    isLight
                      ? "bg-white border-slate-200 text-slate-950 focus:border-brand-accent"
                      : "bg-[#111111]/70 border-white/10 text-white focus:border-brand-accent"
                  }`}
                >
                  {jobTypes.map((type) => (
                    <option key={type} value={type} className={isLight ? "text-slate-950" : "text-black"}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Dropdown */}
              <div className="flex flex-col gap-2">
                <label className={`text-xs uppercase tracking-wider font-bold ${isLight ? "text-slate-500" : "text-white/50"}`}>
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all cursor-pointer ${
                    isLight
                      ? "bg-white border-slate-200 text-slate-950 focus:border-brand-accent"
                      : "bg-[#111111]/70 border-white/10 text-white focus:border-brand-accent"
                  }`}
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc} className={isLight ? "text-slate-950" : "text-black"}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Listings Grid */}
        <div className="max-w-6xl w-full mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`rounded-2xl border h-[240px] animate-pulse ${
                    isLight ? "bg-slate-50 border-slate-200" : "bg-[#111111] border-[#222222]"
                  }`}
                />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredJobs.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {filteredJobs.map((job) => (
                    <motion.div
                      key={job.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ y: -4 }}
                      className={`p-6 rounded-2xl border flex flex-col justify-between h-full transition-all duration-300 relative overflow-hidden group ${
                        isLight
                          ? "bg-slate-50 border-slate-200 hover:border-brand-accent/50 hover:bg-slate-100/50 hover:shadow-xl"
                          : "bg-white/5 border-white/10 hover:border-brand-accent/50 hover:bg-brand-accent/5"
                      }`}
                    >
                      {/* Job Header Info */}
                      <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${
                            isLight ? "bg-slate-200 text-slate-800" : "bg-white/10 text-white/80"
                          }`}>
                            {job.department}
                          </span>
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-brand-accent/15 text-brand-accent">
                            {job.type}
                          </span>
                        </div>
                        <h3 className={`text-xl font-bold font-display uppercase tracking-tight mb-2 ${
                          isLight ? "text-slate-900" : "text-white"
                        }`}>
                          {job.title}
                        </h3>
                        
                        {/* Meta Tags */}
                        <div className={`flex flex-wrap gap-4 text-xs font-semibold mb-4 ${
                          isLight ? "text-slate-500" : "text-white/50"
                        }`}>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3.5 h-3.5 text-brand-accent" />
                            {job.salary}
                          </span>
                        </div>

                        {/* Description snippet */}
                        <p className={`text-sm leading-relaxed mb-6 ${
                          isLight ? "text-slate-600" : "text-slate-400"
                        }`}>
                          {job.description.length > 100
                            ? `${job.description.slice(0, 100)}...`
                            : job.description}
                        </p>
                      </div>

                      {/* View & Apply Button */}
                      <button
                        onClick={() => handleViewAndApply(job)}
                        className={`w-full inline-flex items-center justify-center gap-2 font-display text-xs uppercase font-extrabold tracking-wider py-3.5 rounded-lg border-2 transition-all duration-300 ${
                          isLight
                            ? "bg-transparent text-slate-900 border-slate-900 hover:bg-slate-900 hover:text-white"
                            : "bg-transparent text-brand-accent border-brand-accent/40 hover:border-brand-accent hover:bg-brand-accent/10"
                        }`}
                      >
                        View & Apply <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                /* Empty state */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`py-20 text-center rounded-2xl border flex flex-col items-center justify-center ${
                    isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/10"
                  }`}
                >
                  <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mb-6">
                    <Inbox className="w-8 h-8 text-brand-accent" />
                  </div>
                  <h3 className={`text-xl font-bold uppercase tracking-tight mb-2 ${isLight ? "text-slate-900" : "text-on-surface"}`}>
                    No Jobs Found
                  </h3>
                  <p className={`text-sm leading-relaxed max-w-sm ${isLight ? "text-slate-500" : "text-white/50"}`}>
                    We couldn't find any jobs matching your current search or filters. Try adjusting your settings.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedDept("All");
                      setSelectedType("All");
                      setSelectedLocation("All");
                    }}
                    className="mt-6 text-xs uppercase font-extrabold tracking-wider text-brand-accent hover:underline"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </main>
      <FloatingWhatsApp />
    </>
  );
}
