"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Lock, 
  Settings, 
  Filter, 
  Download, 
  X, 
  Check, 
  ChevronRight,
  TrendingUp,
  Inbox,
  AlertTriangle,
  Loader2,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockJobs, mockApplications, Job, Application } from "../careers/data";

// Audit request type
interface Audit {
  id: string;
  name: string;
  email: string;
  website: string;
  message: string;
  created_at: string;
}
import BlogsAdmin from "./BlogsAdmin";

const API_BASE = "";

type ActiveTab = "overview" | "jobs" | "applications" | "blogs" | "audits";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  
  // Data States
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [appFilterJob, setAppFilterJob] = useState("All");
  const [appFilterStatus, setAppFilterStatus] = useState("All");

  // Job Drawer State
  const [isJobDrawerOpen, setIsJobDrawerOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [jobFormTitle, setJobFormTitle] = useState("");
  const [jobFormDept, setJobFormDept] = useState("");
  const [jobFormLoc, setJobFormLoc] = useState("");
  const [jobFormType, setJobFormType] = useState<"Full-time" | "Part-time" | "Remote">("Full-time");
  const [jobFormDesc, setJobFormDesc] = useState("");
  const [jobFormSalary, setJobFormSalary] = useState("");
  const [jobFormReqs, setJobFormReqs] = useState<string[]>([]);
  const [currentReqInput, setCurrentReqInput] = useState("");

  // Application Details Drawer State
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // Delete Confirm Modal State
  const [deleteConfirmJobId, setDeleteConfirmJobId] = useState<string | null>(null);

  // Notification Banners
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fetch jobs & applications on mount
  useEffect(() => {
    async function fetchAdminData() {
      try {
        // Fetch Jobs
        const jobsRes = await fetch(`${API_BASE}/api/admin/jobs`, { cache: "no-store" });
        let fetchedJobs: Job[] = [];
        if (jobsRes.ok) {
          const jobsJson = await jobsRes.json();
          fetchedJobs = jobsJson.data || jobsJson.jobs || [];
          if (fetchedJobs.length > 0) setJobs(fetchedJobs);
        }

        // Fetch Applications
        const appsRes = await fetch(`${API_BASE}/api/admin/applications`, { cache: "no-store" });
        if (appsRes.ok) {
          const appsJson = await appsRes.json();
          const fetchedApps = appsJson.data || appsJson.applications || [];
          if (fetchedApps.length > 0) setApplications(fetchedApps);
        }

        // Fetch Audits
        const auditsRes = await fetch(`${API_BASE}/api/admin/audits`, { cache: "no-store" });
        if (auditsRes.ok) {
          const auditsJson = await auditsRes.json();
          const fetchedAudits = auditsJson.data || auditsJson.audits || [];
          if (fetchedAudits.length > 0) setAudits(fetchedAudits);
        }
      } catch (err) {
        console.warn("Backend admin endpoints not reachable. Using fallback mock database.");
      } finally {
        setLoading(false);
      }
    }
    fetchAdminData();
  }, []);

  // Utility to trigger quick banners
  const triggerNotification = (type: "success" | "error", message: string) => {
    if (type === "success") {
      setSuccessMsg(message);
      setTimeout(() => setSuccessMsg(null), 4000);
    } else {
      setErrorMsg(message);
      setTimeout(() => setErrorMsg(null), 4000);
    }
  };

  // Helper mapping: Job ID -> Job Title
  // job_id can be a plain string ID (mock data) OR a populated object {_id, title} from the API
  const getJobTitle = (jobId: string | { _id: string; title: string; department: string }) => {
    if (jobId && typeof jobId === "object" && jobId.title) return jobId.title;
    const id = typeof jobId === "string" ? jobId : jobId?._id;
    const j = jobs.find((x) => x.id === id);
    return j ? j.title : "Unknown Role";
  };

  // Helper mapping: Job ID -> Department
  const getJobDept = (jobId: string | { _id: string; title: string; department: string }) => {
    if (jobId && typeof jobId === "object" && jobId.department) return jobId.department;
    const id = typeof jobId === "string" ? jobId : jobId?._id;
    const j = jobs.find((x) => x.id === id);
    return j ? j.department : "Engineering";
  };

  // --- STATS COMPUTATION ---
  const stats = useMemo(() => {
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter((j) => j.is_active !== false).length;
    const totalApps = applications.length;

    // Applications in the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newThisWeek = applications.filter(
      (app) => new Date(app.applied_at) >= sevenDaysAgo
    ).length;

    return { totalJobs, activeJobs, totalApps, newThisWeek };
  }, [jobs, applications]);

  // --- RECENT APPLICATIONS (LAST 10) ---
  const recentApplications = useMemo(() => {
    return [...applications]
      .sort((a, b) => new Date(b.applied_at).getTime() - new Date(a.applied_at).getTime())
      .slice(0, 10);
  }, [applications]);

  // --- APPLICATIONS LIST WITH FILTERS ---
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesJob = appFilterJob === "All" || app.job_id === appFilterJob;
      const matchesStatus = appFilterStatus === "All" || app.status === appFilterStatus;
      return matchesJob && matchesStatus;
    });
  }, [applications, appFilterJob, appFilterStatus]);

  // --- JOB DRAWER OPEN/CLOSE & PRE-FILL ---
  const openJobDrawer = (job: Job | null = null) => {
    if (job) {
      setEditingJob(job);
      setJobFormTitle(job.title);
      setJobFormDept(job.department);
      setJobFormLoc(job.location);
      setJobFormType(job.type);
      setJobFormDesc(job.description);
      setJobFormSalary(job.salary || "");
      setJobFormReqs(job.requirements);
    } else {
      setEditingJob(null);
      setJobFormTitle("");
      setJobFormDept("");
      setJobFormLoc("");
      setJobFormType("Full-time");
      setJobFormDesc("");
      setJobFormSalary("");
      setJobFormReqs([]);
    }
    setIsJobDrawerOpen(true);
  };

  const closeJobDrawer = () => {
    setIsJobDrawerOpen(false);
    setEditingJob(null);
  };

  // --- JOB REQUIREMENTS TAG INPUT ---
  const handleAddRequirement = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = currentReqInput.trim();
      if (val && !jobFormReqs.includes(val)) {
        setJobFormReqs((prev) => [...prev, val]);
        setCurrentReqInput("");
      }
    }
  };

  const handleRemoveRequirement = (req: string) => {
    setJobFormReqs((prev) => prev.filter((r) => r !== req));
  };

  // --- JOBS CRUD ACTIONS ---
  // Create / Update Job
  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobFormTitle.trim() || !jobFormDept.trim() || !jobFormLoc.trim() || !jobFormDesc.trim()) {
      triggerNotification("error", "Please fill in all required fields.");
      return;
    }

    const payload = {
      title: jobFormTitle.trim(),
      department: jobFormDept.trim(),
      location: jobFormLoc.trim(),
      type: jobFormType,
      description: jobFormDesc.trim(),
      requirements: jobFormReqs,
      salary_range: jobFormSalary.trim() || null,
      is_active: editingJob ? editingJob.is_active : true,
    };

    try {
      if (editingJob) {
        // PUT Update Job
        const res = await fetch(`${API_BASE}/api/admin/jobs/${editingJob.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to update job");
        const json = await res.json();
        const updatedJob = json.data || { ...editingJob, ...payload };

        setJobs((prev) => prev.map((j) => (j.id === editingJob.id ? updatedJob : j)));
        triggerNotification("success", `Job "${payload.title}" updated successfully!`);
      } else {
        // POST Create Job
        const res = await fetch(`${API_BASE}/api/admin/jobs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to create job");
        const json = await res.json();
        const newJob = json.data || {
          id: `job-${Date.now()}`,
          ...payload,
          salary: payload.salary_range || "",
          applications_count: 0,
        };

        setJobs((prev) => [newJob, ...prev]);
        triggerNotification("success", `Job "${payload.title}" created successfully!`);
      }
      closeJobDrawer();
    } catch (err) {
      console.warn("Backend API offline. Applying changes to local state only.");
      // Fallback local update
      if (editingJob) {
        setJobs((prev) =>
          prev.map((j) =>
            j.id === editingJob.id
              ? { ...j, ...payload, salary: payload.salary_range || "" }
              : j
          )
        );
        triggerNotification("success", `Job "${payload.title}" updated locally!`);
      } else {
        const localNewJob: Job = {
          id: `job-${Date.now()}`,
          ...payload,
          salary: payload.salary_range || "",
          applications_count: 0,
        };
        setJobs((prev) => [localNewJob, ...prev]);
        triggerNotification("success", `Job "${payload.title}" created locally!`);
      }
      closeJobDrawer();
    }
  };

  // Toggle Job Active Switch
  const handleToggleJobActive = async (job: Job) => {
    const newStatus = job.is_active === false ? true : false;
    try {
      const res = await fetch(`${API_BASE}/api/admin/jobs/${job.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to toggle status");
      setJobs((prev) =>
        prev.map((j) => (j.id === job.id ? { ...j, is_active: newStatus } : j))
      );
      triggerNotification("success", `Job "${job.title}" is now ${newStatus ? "Active" : "Inactive"}`);
    } catch (err) {
      console.warn("Backend API offline. Toggling active status locally.");
      setJobs((prev) =>
        prev.map((j) => (j.id === job.id ? { ...j, is_active: newStatus } : j))
      );
      triggerNotification("success", `Job "${job.title}" set to ${newStatus ? "Active" : "Inactive"} locally`);
    }
  };

  // Delete Job (and cascaded applications)
  const handleDeleteJob = async () => {
    if (!deleteConfirmJobId) return;

    try {
      const res = await fetch(`${API_BASE}/api/admin/jobs/${deleteConfirmJobId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete job");

      setJobs((prev) => prev.filter((j) => j.id !== deleteConfirmJobId));
      setApplications((prev) => prev.filter((app) => app.job_id !== deleteConfirmJobId));
      triggerNotification("success", "Job and associated applications deleted successfully.");
    } catch (err) {
      console.warn("Backend API offline. Deleting job from local state.");
      setJobs((prev) => prev.filter((j) => j.id !== deleteConfirmJobId));
      setApplications((prev) => prev.filter((app) => app.job_id !== deleteConfirmJobId));
      triggerNotification("success", "Job deleted locally.");
    } finally {
      setDeleteConfirmJobId(null);
    }
  };

  // --- APPLICATION STATUS UPDATE ---
  const handleUpdateAppStatus = async (appId: string, newStatus: "pending" | "shortlisted" | "rejected") => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/applications/${appId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");

      setApplications((prev) =>
        prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
      );
      if (selectedApp?.id === appId) {
        setSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      triggerNotification("success", `Application status updated to ${newStatus}.`);
    } catch (err) {
      console.warn("Backend API offline. Updating status locally.");
      setApplications((prev) =>
        prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
      );
      if (selectedApp?.id === appId) {
        setSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      triggerNotification("success", `Application status updated to ${newStatus} locally.`);
    }
  };

  // Status Badge Helper
  const getStatusBadge = (status: "pending" | "shortlisted" | "rejected") => {
    const styles = {
      pending: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
      shortlisted: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
      rejected: "bg-red-500/10 text-red-500 border border-red-500/20",
    };
    return (
      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col md:flex-row font-sans">
      
      {/* Toast notifications */}
      <AnimatePresence>
        {successMsg && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border bg-[#111] border-emerald-500/40 text-emerald-400 text-sm font-semibold">
            <Check className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border bg-[#111] border-red-500/40 text-red-400 text-sm font-semibold">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 bg-[#0d0d0d] border-r border-white/5 flex-col min-h-screen shrink-0">
        <div className="px-6 py-6 border-b border-white/5 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-accent flex items-center justify-center">
            <span className="text-black font-black text-sm">ID</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">Inquisitive</p>
            <p className="text-brand-accent text-[9px] font-extrabold uppercase tracking-widest">Careers Admin</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold transition-all ${
              activeTab === "overview"
                ? "bg-brand-accent/10 text-brand-accent border border-brand-accent/20"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold transition-all ${
              activeTab === "jobs"
                ? "bg-brand-accent/10 text-brand-accent border border-brand-accent/20"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            All Jobs
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold transition-all ${
              activeTab === "applications"
                ? "bg-brand-accent/10 text-brand-accent border border-brand-accent/20"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            <FileText className="w-4 h-4" />
            Applications
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold transition-all ${
              activeTab === "blogs"
                ? "bg-brand-accent/10 text-brand-accent border border-brand-accent/20"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Blogs
          </button>
          <button
            onClick={() => setActiveTab("audits")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold transition-all ${
              activeTab === "audits"
                ? "bg-brand-accent/10 text-brand-accent border border-brand-accent/20"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            <FileText className="w-4 h-4" />
            Audits
          </button>
        </nav>

        <div className="px-6 py-6 border-t border-white/5">
          <a
            href="/"
            className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors"
          >
            <Eye className="w-4 h-4" /> Live Site
          </a>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#0d0d0d] border-t border-white/10 z-40 flex justify-around py-3 px-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex flex-col items-center gap-1 text-[9px] uppercase tracking-wider font-bold transition-all ${
            activeTab === "overview" ? "text-brand-accent" : "text-white/40"
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          Overview
        </button>
        <button
          onClick={() => setActiveTab("jobs")}
          className={`flex flex-col items-center gap-1 text-[9px] uppercase tracking-wider font-bold transition-all ${
            activeTab === "jobs" ? "text-brand-accent" : "text-white/40"
          }`}
        >
          <Briefcase className="w-5 h-5" />
          Jobs
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          className={`flex flex-col items-center gap-1 text-[9px] uppercase tracking-wider font-bold transition-all ${
            activeTab === "applications" ? "text-brand-accent" : "text-white/40"
          }`}
        >
          <FileText className="w-5 h-5" />
          Applications
        </button>
        <button
          onClick={() => setActiveTab("blogs")}
          className={`flex flex-col items-center gap-1 text-[9px] uppercase tracking-wider font-bold transition-all ${
            activeTab === "blogs" ? "text-brand-accent" : "text-white/40"
          }`}
        >
          <BookOpen className="w-5 h-5" />
          Blogs
        </button>
      </nav>

      {/* MAIN CONTAINER */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-10 min-h-screen">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[70vh]">
            <Loader2 className="w-10 h-10 text-brand-accent animate-spin mb-4" />
            <p className="text-white/50 text-sm">Loading admin dashboard...</p>
          </div>
        ) : (
          <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">

            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-black font-display uppercase tracking-tight">Dashboard Overview</h1>
                  <p className="text-white/40 text-sm mt-1">Real-time statistics and latest candidate submissions.</p>
                </div>

                {/* Stats cards row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Total Jobs", val: stats.totalJobs },
                    { label: "Active Jobs", val: stats.activeJobs },
                    { label: "Total Applications", val: stats.totalApps },
                    { label: "New This Week", val: stats.newThisWeek, hasTrend: true },
                  ].map((card, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-all duration-300 relative overflow-hidden group"
                    >
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">{card.label}</p>
                        <p className="text-4xl md:text-5xl font-black">{card.val}</p>
                      </div>
                      {card.hasTrend && card.val > 0 && (
                        <div className="absolute right-4 bottom-4 w-7 h-7 rounded-full bg-brand-accent/15 flex items-center justify-center text-brand-accent">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Recent Applications (Last 10) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-white/40">Recent Applications</h2>
                    <button
                      onClick={() => setActiveTab("applications")}
                      className="text-xs text-brand-accent font-extrabold flex items-center gap-1 hover:underline"
                    >
                      View All <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40">
                          <th className="py-4 px-6">Candidate</th>
                          <th className="py-4 px-6">Role Applied</th>
                          <th className="py-4 px-6">Date</th>
                          <th className="py-4 px-6">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {recentApplications.map((app) => (
                          <tr
                            key={app.id}
                            onClick={() => setSelectedApp(app)}
                            className="hover:bg-white/5 transition-colors cursor-pointer group"
                          >
                            <td className="py-4 px-6 font-bold text-white group-hover:text-brand-accent transition-colors">
                              {app.full_name}
                            </td>
                            <td className="py-4 px-6 text-white/80">{getJobTitle(app.job_id)}</td>
                            <td className="py-4 px-6 text-white/60">
                              {new Date(app.applied_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </td>
                            <td className="py-4 px-6">{getStatusBadge(app.status)}</td>
                          </tr>
                        ))}
                        {recentApplications.length === 0 && (
                          <tr>
                            <td colSpan={4} className="py-10 text-center text-white/20">
                              No applications submitted yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ALL JOBS */}
            {activeTab === "jobs" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-black font-display uppercase tracking-tight">Manage Jobs</h1>
                    <p className="text-white/40 text-sm mt-1">{jobs.length} total jobs created</p>
                  </div>
                  <button
                    onClick={() => openJobDrawer(null)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-accent text-slate-900 font-display text-xs uppercase font-extrabold tracking-wider hover:bg-white transition-all shadow-xl self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" /> Add New Job
                  </button>
                </div>

                {/* Jobs Table */}
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40">
                        <th className="py-4 px-6">Job Title</th>
                        <th className="py-4 px-6">Department</th>
                        <th className="py-4 px-6">Location</th>
                        <th className="py-4 px-6">Type</th>
                        <th className="py-4 px-6 text-center">Applications</th>
                        <th className="py-4 px-6 text-center">Active Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {jobs.map((job) => (
                        <tr key={job.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 px-6 font-bold text-white">{job.title}</td>
                          <td className="py-4 px-6 text-white/80">{job.department}</td>
                          <td className="py-4 px-6 text-white/60">{job.location}</td>
                          <td className="py-4 px-6">
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-accent/15 text-brand-accent border border-brand-accent/20">
                              {job.type}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-center font-bold">{job.applications_count || 0}</td>
                          
                          {/* Active / Inactive Toggle Switch */}
                          <td className="py-4 px-6 text-center">
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() => handleToggleJobActive(job)}
                                className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 focus:outline-none ${
                                  job.is_active !== false ? "bg-brand-accent" : "bg-white/10"
                                }`}
                              >
                                <span
                                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                                    job.is_active !== false ? "translate-x-5" : "translate-x-0"
                                  }`}
                                />
                              </button>
                            </div>
                          </td>

                          {/* Action Buttons */}
                          <td className="py-4 px-6 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => openJobDrawer(job)}
                                className="p-2 rounded-lg text-white/40 hover:text-brand-accent hover:bg-brand-accent/10 transition-all"
                                title="Edit"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmJobId(job.id)}
                                className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: APPLICATIONS */}
            {activeTab === "applications" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-black font-display uppercase tracking-tight">Applications</h1>
                  <p className="text-white/40 text-sm mt-1">{filteredApplications.length} candidate applications found</p>
                </div>

                {/* Filter bar */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-wrap gap-6 items-center">
                  <div className="flex items-center gap-2 text-white/40 text-sm">
                    <Filter className="w-4 h-4" /> Filters:
                  </div>

                  {/* Filter by Job Title */}
                  <div className="flex flex-col gap-1 shrink-0">
                    <select
                      value={appFilterJob}
                      onChange={(e) => setAppFilterJob(e.target.value)}
                      className="bg-transparent border border-white/15 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-brand-accent cursor-pointer"
                    >
                      <option value="All" className="text-black">All Jobs</option>
                      {jobs.map((job) => (
                        <option key={job.id} value={job.id} className="text-black">
                          {job.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Filter by Status */}
                  <div className="flex flex-col gap-1 shrink-0">
                    <select
                      value={appFilterStatus}
                      onChange={(e) => setAppFilterStatus(e.target.value)}
                      className="bg-transparent border border-white/15 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-brand-accent cursor-pointer"
                    >
                      <option value="All" className="text-black">All Statuses</option>
                      <option value="pending" className="text-black">Pending</option>
                      <option value="shortlisted" className="text-black">Shortlisted</option>
                      <option value="rejected" className="text-black">Rejected</option>
                    </select>
                  </div>
                </div>

                {/* Applications Table */}
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40">
                        <th className="py-4 px-6">Applicant Name</th>
                        <th className="py-4 px-6">Email</th>
                        <th className="py-4 px-6">Phone</th>
                        <th className="py-4 px-6">Role Applied</th>
                        <th className="py-4 px-6">Applied Date</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 px-6 font-bold text-white">{app.full_name}</td>
                          <td className="py-4 px-6 text-white/70">{app.email}</td>
                          <td className="py-4 px-6 text-white/60">{app.phone}</td>
                          <td className="py-4 px-6 font-semibold">{getJobTitle(app.job_id)}</td>
                          <td className="py-4 px-6 text-white/60">
                            {new Date(app.applied_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </td>
                          <td className="py-4 px-6">{getStatusBadge(app.status)}</td>
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => setSelectedApp(app)}
                              className="px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider hover:bg-brand-accent hover:text-slate-900 hover:border-brand-accent transition-all"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredApplications.length === 0 && (
                        <tr>
                          <td colSpan={7} className="py-20 text-center text-white/20">
                            No applications match the active filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: BLOGS */}
            {activeTab === "blogs" && (
              <BlogsAdmin />
            )}
            {activeTab === "audits" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-black font-display uppercase tracking-tight">Audit Requests</h1>
                  <p className="text-white/40 text-sm">{audits.length} total audits</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40">
                        <th className="py-4 px-6">Name</th>
                        <th className="py-4 px-6">Email</th>
                        <th className="py-4 px-6">Website</th>
                        <th className="py-4 px-6">Message</th>
                        <th className="py-4 px-6">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {audits.map((a) => (
                        <tr key={a.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 px-6 font-bold text-white">{a.name}</td>
                          <td className="py-4 px-6 text-white/70">{a.email}</td>
                          <td className="py-4 px-6 text-white/70">{a.website}</td>
                          <td className="py-4 px-6 text-white/70 max-w-xs">{a.message}</td>
                          <td className="py-4 px-6 text-white/60">
                            {new Date(a.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </td>
                        </tr>
                      ))}
                      {audits.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-10 text-center text-white/20">
                            No audit requests yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}
      </main>

      {/* --- ADD/EDIT JOB DRAWER (SLIDE-IN MODAL) --- */}
      <AnimatePresence>
        {isJobDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={closeJobDrawer}
              className="absolute inset-0 bg-black/80 backdrop-blur-xs"
            />
            {/* Slide-in body */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl bg-[#0d0d0d] border-l border-white/10 h-full shadow-2xl flex flex-col justify-between z-10"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xl font-display font-black uppercase tracking-tight">
                  {editingJob ? "Edit Job Posting" : "Add New Job Posting"}
                </h3>
                <button
                  onClick={closeJobDrawer}
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Form Scrollable Body */}
              <form onSubmit={handleSaveJob} className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Title */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-white/50">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobFormTitle}
                    onChange={(e) => setJobFormTitle(e.target.value)}
                    placeholder="e.g. Senior Frontend Developer"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-all"
                  />
                </div>

                {/* Department */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-white/50">
                    Department *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobFormDept}
                    onChange={(e) => setJobFormDept(e.target.value)}
                    placeholder="e.g. Engineering, Marketing"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-all"
                  />
                </div>

                {/* Location */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-white/50">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobFormLoc}
                    onChange={(e) => setJobFormLoc(e.target.value)}
                    placeholder="e.g. Noida / Remote"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-all"
                  />
                </div>

                {/* Job Type Dropdown */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-white/50">
                    Job Type *
                  </label>
                  <select
                    value={jobFormType}
                    onChange={(e) => setJobFormType(e.target.value as any)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent cursor-pointer"
                  >
                    <option value="Full-time" className="text-black">Full-time</option>
                    <option value="Part-time" className="text-black">Part-time</option>
                    <option value="Remote" className="text-black">Remote</option>
                  </select>
                </div>

                {/* Salary Range (optional) */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-white/50">
                    Salary Range (Optional)
                  </label>
                  <input
                    type="text"
                    value={jobFormSalary}
                    onChange={(e) => setJobFormSalary(e.target.value)}
                    placeholder="e.g. ₹12L - ₹18L or $80k - $100k"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-all"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-white/50">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={jobFormDesc}
                    onChange={(e) => setJobFormDesc(e.target.value)}
                    placeholder="Provide a detailed job description..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-all resize-none"
                  />
                </div>

                {/* Requirements Tag Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-white/50">
                    Requirements * (Type & Press Enter)
                  </label>
                  <div className="w-full bg-white/5 border border-white/10 rounded-xl p-3 flex flex-wrap gap-2 items-center">
                    {jobFormReqs.map((req, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 text-xs font-semibold text-white border border-white/10"
                      >
                        {req}
                        <button
                          type="button"
                          onClick={() => handleRemoveRequirement(req)}
                          className="hover:text-red-400 focus:outline-none"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={currentReqInput}
                      onChange={(e) => setCurrentReqInput(e.target.value)}
                      onKeyDown={handleAddRequirement}
                      placeholder={jobFormReqs.length === 0 ? "e.g. 3+ years experience with React" : ""}
                      className="flex-1 min-w-[120px] bg-transparent text-sm focus:outline-none py-1"
                    />
                  </div>
                </div>

                {/* Submit button trigger */}
                <button type="submit" className="hidden" id="job-form-submit-trigger" />
              </form>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-white/10 flex gap-4">
                <button
                  type="button"
                  onClick={() => document.getElementById("job-form-submit-trigger")?.click()}
                  className="flex-1 py-4.5 rounded-xl bg-brand-accent text-slate-900 font-display text-xs uppercase font-extrabold tracking-wider hover:bg-white transition-all shadow-xl cursor-pointer"
                >
                  {editingJob ? "Save Changes" : "Publish Job"}
                </button>
                <button
                  type="button"
                  onClick={closeJobDrawer}
                  className="flex-1 py-4.5 rounded-xl border border-white/10 text-white/60 font-display text-xs uppercase font-extrabold tracking-wider hover:border-white/30 hover:text-white transition-all"
                >
                  Cancel
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- APPLICATION DETAIL DRAWER (RIGHT SIDE SLIDE-IN) --- */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedApp(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xs"
            />
            {/* Drawer Body */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl bg-[#0d0d0d] border-l border-white/10 h-full shadow-2xl flex flex-col justify-between z-10"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-display font-black uppercase tracking-tight">Candidate Profile</h3>
                  <p className="text-xs text-brand-accent font-extrabold uppercase tracking-widest mt-1">
                    Role: {getJobTitle(selectedApp.job_id)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable details */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Candidate Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white/5 border border-white/15 p-5 rounded-2xl">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Full Name</span>
                    <p className="text-base font-bold text-white mt-1">{selectedApp.full_name}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Applied Date</span>
                    <p className="text-base text-white mt-1">
                      {new Date(selectedApp.applied_at).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Email Address</span>
                    <p className="text-sm font-semibold text-brand-accent mt-1 break-all">{selectedApp.email}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Phone Number</span>
                    <p className="text-sm font-semibold text-white mt-1">{selectedApp.phone}</p>
                  </div>
                </div>

                {/* Status Update section */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-white/50">
                    Application Status
                  </label>
                  <div className="flex items-center gap-4">
                    <select
                      value={selectedApp.status}
                      onChange={(e) => handleUpdateAppStatus(selectedApp.id, e.target.value as any)}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-brand-accent cursor-pointer w-48"
                    >
                      <option value="pending" className="text-black">Pending</option>
                      <option value="shortlisted" className="text-black">Shortlisted</option>
                      <option value="rejected" className="text-black">Rejected</option>
                    </select>
                    {getStatusBadge(selectedApp.status)}
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-wider font-bold text-white/50 block">Cover Letter</span>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-sm leading-relaxed max-h-48 overflow-y-auto">
                    {selectedApp.cover_letter ? (
                      <p className="whitespace-pre-line text-white/80">{selectedApp.cover_letter}</p>
                    ) : (
                      <p className="italic text-white/30">No cover letter provided.</p>
                    )}
                  </div>
                </div>

                {/* Resume Download section */}
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-wider font-bold text-white/50 block">Attached Resume</span>
                  <div className="border border-white/10 rounded-xl p-4.5 flex items-center justify-between bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="text-left max-w-[200px] sm:max-w-xs">
                        <p className="text-sm font-bold truncate text-white">
                          {selectedApp.resume_original_name || "candidate_resume.pdf"}
                        </p>
                        <p className="text-xs text-white/40">Click to view/download file</p>
                      </div>
                    </div>
                    
                    {/* Download Button */}
                    <a
                      href={`${API_BASE}${selectedApp.resume_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-brand-accent text-slate-900 hover:bg-white transition-all flex items-center justify-center"
                      title="Download Resume"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/10">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="w-full py-4 rounded-xl border border-white/10 text-white/60 font-display text-xs uppercase font-extrabold tracking-wider hover:border-white/30 hover:text-white transition-all"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- DELETE JOB CONFIRMATION MODAL --- */}
      <AnimatePresence>
        {deleteConfirmJobId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmJobId(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xs"
            />
            {/* Dialog Content */}
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
                <h3 className="text-xl font-display font-black uppercase tracking-tight text-white">Delete Job Posting?</h3>
                <p className="text-white/50 text-sm mt-2 leading-relaxed">
                  Are you sure you want to delete this job posting? This action will permanently remove it along with all associated candidate applications. This cannot be undone.
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleDeleteJob}
                  className="flex-1 py-3.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-display text-xs uppercase font-extrabold tracking-wider transition-all"
                >
                  Delete Permanently
                </button>
                <button
                  onClick={() => setDeleteConfirmJobId(null)}
                  className="flex-1 py-3.5 rounded-xl border border-white/10 text-white/60 font-display text-xs uppercase font-extrabold tracking-wider hover:border-white/30 hover:text-white transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
