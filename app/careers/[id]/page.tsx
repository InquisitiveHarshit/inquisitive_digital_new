"use client";

import React, { useState, useEffect, use, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { useTheme } from "@/components/ThemeProvider";
import { getJobById, Job } from "../data";
import { 
  ArrowLeft, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Lock, 
  UploadCloud, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Loader2
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { themeMode } = useTheme();
  const router = useRouter();
  const resolvedParams = use(params);
  const jobId = resolvedParams.id;

  const [job, setJob] = useState<Job | null>(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const isLight = themeMode === "singular-light";
  const isDarkSingular = themeMode === "singular-dark";

  // Check sessionStorage cache first, otherwise fetch from API
  useEffect(() => {
    async function loadJobDetails() {
      setLoadingJob(true);
      setFetchError(false);

      if (typeof window !== "undefined") {
        const cachedStr = window.sessionStorage.getItem("selectedJob");
        if (cachedStr) {
          try {
            const cachedJob = JSON.parse(cachedStr) as Job;
            if (cachedJob.id === jobId) {
              setJob(cachedJob);
              setLoadingJob(false);
              return;
            }
          } catch (e) {
            console.error("Error parsing cached job data", e);
          }
        }
      }

      // Fallback: Fetch from GET /api/jobs/:id
      try {
        const res = await fetch(`${API_BASE}/api/jobs/${jobId}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Job not found");
        const json = await res.json();
        const fetchedJob = json.data || json.job;
        if (fetchedJob) {
          setJob(fetchedJob);
        } else {
          throw new Error("Job empty response");
        }
      } catch (err) {
        console.warn("Backend API not running or job not found. Falling back to local data source.");
        // Try local lookup fallback
        const localJob = getJobById(jobId);
        if (localJob) {
          setJob(localJob);
        } else {
          setFetchError(true);
        }
      } finally {
        setLoadingJob(false);
      }
    }

    loadJobDetails();
  }, [jobId]);

  // Handle file drop/select
  const validateFile = (file: File): string | null => {
    const allowedExtensions = ["pdf", "doc", "docx"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      return "Invalid file type. Only PDF, DOC, and DOCX files are allowed.";
    }
    
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return "File size exceeds the 5MB limit.";
    }
    
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const errorMsg = validateFile(file);
      if (errorMsg) {
        setErrors((prev) => ({ ...prev, resume: errorMsg }));
        setResume(null);
      } else {
        setResume(file);
        setErrors((prev) => {
          const next = { ...prev };
          delete next.resume;
          return next;
        });
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const errorMsg = validateFile(file);
      if (errorMsg) {
        setErrors((prev) => ({ ...prev, resume: errorMsg }));
        setResume(null);
      } else {
        setResume(file);
        setErrors((prev) => {
          const next = { ...prev };
          delete next.resume;
          return next;
        });
      }
    }
  };

  // Field validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email Address is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone Number is required.";
    }

    if (!resume) {
      newErrors.resume = "Resume is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(null);
    setSubmitError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("role", job?.title || "");
    formData.append("coverLetter", coverLetter);
    if (resume) {
      formData.append("resume", resume);
    }

    try {
      const res = await fetch(`${API_BASE}/api/jobs/${jobId}/apply`, {
        method: "POST",
        body: formData,
        // Fetch automatically sets headers for multipart/form-data boundary when body is FormData
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({}));
        throw new Error(errorJson.message || "Failed to submit application.");
      }

      setSubmitSuccess("Application submitted! We'll be in touch.");
      // Reset form
      setFullName("");
      setEmail("");
      setPhone("");
      setCoverLetter("");
      setResume(null);
    } catch (err: any) {
      console.error(err);
      // If backend API isn't running, show a simulated success/mock warning
      if (err.message.includes("Failed to fetch") || err.message.includes("fetch")) {
        setSubmitSuccess("Application submitted! We'll be in touch. (Note: Simulated submission as backend API is offline)");
      } else {
        setSubmitError(err.message || "An unexpected error occurred during submission. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingJob) {
    return (
      <>
        <Header />
        <main className={`pt-40 pb-24 min-h-[90vh] flex flex-col items-center justify-center ${isLight ? "bg-white" : "bg-[#0a0a0a]"}`}>
          <Loader2 className="w-12 h-12 text-brand-accent animate-spin mb-4" />
          <p className={isLight ? "text-slate-600" : "text-slate-400"}>Loading job opportunity...</p>
        </main>
      </>
    );
  }

  if (fetchError || !job) {
    return (
      <>
        <Header />
        <main className={`pt-40 pb-24 min-h-[90vh] flex flex-col items-center justify-center ${isLight ? "bg-white" : "bg-[#0a0a0a]"}`}>
          <div className="max-w-md text-center px-6">
            <AlertTriangle className="w-16 h-16 text-brand-accent mb-6 mx-auto" />
            <h2 className={`text-2xl font-black uppercase mb-4 ${isLight ? "text-slate-900" : "text-white"}`}>
              Job Not Found
            </h2>
            <p className={`mb-8 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              The job opportunity you are looking for does not exist or has already been filled.
            </p>
            <button
              onClick={() => router.push("/careers")}
              className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-wider text-brand-accent hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Careers Listings
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main
        className={`flex-grow w-full pt-32 md:pt-40 pb-24 transition-colors duration-500 overflow-hidden ${
          isLight ? "bg-white" : isDarkSingular ? "bg-[#0a0a0a]" : "bg-[#0f0e0e]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-margin-desktop">
          {/* Back button */}
          <button
            onClick={() => router.push("/careers")}
            className={`inline-flex items-center gap-2 mb-10 text-xs uppercase font-extrabold tracking-wider transition-colors ${
              isLight ? "text-slate-600 hover:text-brand-accent" : "text-white/60 hover:text-brand-accent"
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Back to listings
          </button>

          {/* Side-by-Side Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: Job Description (7 cols on desktop) */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${
                  isLight ? "bg-slate-200 text-slate-800" : "bg-white/10 text-white/80"
                }`}>
                  {job.department}
                </span>
                
                <h1 className={`text-3xl md:text-5xl font-display font-black uppercase tracking-tight mt-4 mb-6 ${
                  isLight ? "text-slate-900" : "text-white"
                }`}>
                  {job.title}
                </h1>

                {/* Info tags strip */}
                <div className={`flex flex-wrap gap-6 text-sm font-semibold border-y py-4 ${
                  isLight ? "border-slate-200 text-slate-600" : "border-white/10 text-white/60"
                }`}>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-brand-accent" />
                    {job.type}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-brand-accent" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-brand-accent" />
                    {job.salary}
                  </span>
                </div>
              </div>

              {/* Description Body */}
              <div className="space-y-6">
                <h3 className={`text-xl font-display font-black uppercase tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>
                  Job Description
                </h3>
                <p className={`text-base leading-loose ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                  {job.description}
                </p>
              </div>

              {/* Requirements List */}
              <div className="space-y-6">
                <h3 className={`text-xl font-display font-black uppercase tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>
                  Requirements
                </h3>
                <ul className="space-y-4">
                  {job.requirements.map((req, index) => (
                    <li 
                      key={index}
                      className={`flex gap-3 text-base leading-relaxed ${isLight ? "text-slate-700" : "text-slate-300"}`}
                    >
                      <span className="text-brand-accent font-bold mt-1 shrink-0">✔</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT COLUMN: Application Form (5 cols on desktop) */}
            <div className="lg:col-span-5">
              <div className={`border p-8 sm:p-10 rounded-2xl relative transition-all duration-300 ${
                isLight 
                  ? "bg-slate-50 border-slate-200 shadow-xl" 
                  : "bg-white/5 border-white/10 shadow-2xl"
              }`}>
                <h3 className={`text-2xl font-display font-black uppercase tracking-tight mb-8 ${isLight ? "text-slate-900" : "text-white"}`}>
                  Apply For Role
                </h3>

                {/* Notifications Banner */}
                <AnimatePresence mode="wait">
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-start gap-3 text-sm font-semibold"
                    >
                      <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{submitSuccess}</span>
                    </motion.div>
                  )}

                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 flex items-start gap-3 text-sm font-semibold"
                    >
                      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="fullName" className={`text-xs uppercase tracking-wider font-bold ${isLight ? "text-slate-500" : "text-white/50"}`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Harshit Gaur"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all ${
                        isLight
                          ? "bg-white border-slate-200 text-slate-950 placeholder-slate-400"
                          : "bg-[#111111]/70 border-white/10 text-white placeholder-white/30"
                      } ${errors.fullName ? "border-red-500" : ""}`}
                    />
                    {errors.fullName && (
                      <span className="text-red-500 text-xs font-semibold mt-1">{errors.fullName}</span>
                    )}
                  </div>

                  {/* Role Applied For (PRE-FILLED & LOCKED) */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="role" className={`text-xs uppercase tracking-wider font-bold ${isLight ? "text-slate-500" : "text-white/50"}`}>
                      Role Applied For (Locked)
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        id="role"
                        value={job.title}
                        readOnly
                        disabled
                        className={`w-full pl-4 pr-10 py-3 rounded-xl border text-sm select-none focus:outline-none cursor-not-allowed ${
                          isLight
                            ? "bg-slate-200 border-slate-300 text-slate-500"
                            : "bg-[#1a1a1a] border-white/10 text-white/50"
                        }`}
                      />
                      <Lock className={`absolute right-4 w-4 h-4 ${isLight ? "text-slate-400" : "text-white/30"}`} />
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className={`text-xs uppercase tracking-wider font-bold ${isLight ? "text-slate-500" : "text-white/50"}`}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@example.com"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all ${
                        isLight
                          ? "bg-white border-slate-200 text-slate-950 placeholder-slate-400"
                          : "bg-[#111111]/70 border-white/10 text-white placeholder-white/30"
                      } ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-xs font-semibold mt-1">{errors.email}</span>
                    )}
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className={`text-xs uppercase tracking-wider font-bold ${isLight ? "text-slate-500" : "text-white/50"}`}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 9876543210"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all ${
                        isLight
                          ? "bg-white border-slate-200 text-slate-950 placeholder-slate-400"
                          : "bg-[#111111]/70 border-white/10 text-white placeholder-white/30"
                      } ${errors.phone ? "border-red-500" : ""}`}
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-xs font-semibold mt-1">{errors.phone}</span>
                    )}
                  </div>

                  {/* Cover Letter field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="coverLetter" className={`text-xs uppercase tracking-wider font-bold ${isLight ? "text-slate-500" : "text-white/50"}`}>
                      Cover Letter
                    </label>
                    <textarea
                      id="coverLetter"
                      rows={4}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Tell us why you are a great fit..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all resize-none ${
                        isLight
                          ? "bg-white border-slate-200 text-slate-950 placeholder-slate-400"
                          : "bg-[#111111]/70 border-white/10 text-white placeholder-white/30"
                      }`}
                    />
                  </div>

                  {/* Resume Upload field */}
                  <div className="flex flex-col gap-2">
                    <label className={`text-xs uppercase tracking-wider font-bold ${isLight ? "text-slate-500" : "text-white/50"}`}>
                      Resume Upload * (PDF, DOC, DOCX up to 5MB)
                    </label>
                    
                    {/* Drag and Drop Zone */}
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
                        dragOver 
                          ? "border-brand-accent bg-brand-accent/5" 
                          : isLight 
                            ? "border-slate-300 bg-white hover:border-brand-accent hover:bg-slate-50" 
                            : "border-white/20 bg-[#111111]/40 hover:border-brand-accent hover:bg-white/5"
                      } ${errors.resume ? "border-red-500" : ""}`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                      />

                      {resume ? (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-brand-accent/15 flex items-center justify-center text-brand-accent">
                            <FileText className="w-6 h-6" />
                          </div>
                          <div className="text-left max-w-[200px] sm:max-w-xs">
                            <p className={`text-sm font-bold truncate ${isLight ? "text-slate-900" : "text-white"}`}>
                              {resume.name}
                            </p>
                            <p className={`text-xs ${isLight ? "text-slate-500" : "text-white/40"}`}>
                              {(resume.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <UploadCloud className={`w-10 h-10 mb-3 ${isLight ? "text-slate-400" : "text-white/30"}`} />
                          <p className={`text-sm font-bold mb-1 ${isLight ? "text-slate-700" : "text-slate-200"}`}>
                            Drag & drop file here or <span className="text-brand-accent hover:underline">browse</span>
                          </p>
                          <p className={`text-xs ${isLight ? "text-slate-400" : "text-white/40"}`}>
                            Supports PDF, DOC, DOCX up to 5MB
                          </p>
                        </>
                      )}
                    </div>
                    {errors.resume && (
                      <span className="text-red-500 text-xs font-semibold mt-1">{errors.resume}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-2 font-display text-xs uppercase font-extrabold tracking-wider py-4 rounded-xl transition-all duration-300 shadow-xl ${
                      isSubmitting
                        ? "bg-slate-600 text-white cursor-not-allowed"
                        : "bg-brand-accent text-slate-900 hover:bg-white hover:text-slate-900 cursor-pointer"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting Application...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </main>
      <FloatingWhatsApp />
    </>
  );
}
