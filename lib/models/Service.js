import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    // ── Core Identity ──────────────────────────────────────────────────
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
    },
    category: {
      type: String,
      default: "",
    },
    icon: {
      type: String,   // Lucide icon name, e.g. "Search", "TrendingUp"
      default: null,
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    ctaText: {
      type: String,
      default: "",
    },

    // ── Simple Arrays ──────────────────────────────────────────────────
    deliverables: { type: [String], default: [] },
    painPoints:   { type: [String], default: [] },
    benefits:     { type: [String], default: [] },
    faq: {
      type: [{ q: String, a: String }],
      default: [],
    },

    // ── Rich Page Sections (flexible Mixed objects) ────────────────────
    heroSection:         { type: mongoose.Schema.Types.Mixed, default: null },
    approachSection:     { type: mongoose.Schema.Types.Mixed, default: null },
    deliverablesSection: { type: mongoose.Schema.Types.Mixed, default: null },
    inactionSection:     { type: mongoose.Schema.Types.Mixed, default: null },
    leadFormSection:     { type: mongoose.Schema.Types.Mixed, default: null },
    statsSection:        { type: mongoose.Schema.Types.Mixed, default: null },
    whatIsSection:       { type: mongoose.Schema.Types.Mixed, default: null },
    whyMattersSection:   { type: mongoose.Schema.Types.Mixed, default: null },
    servicesSection:     { type: mongoose.Schema.Types.Mixed, default: null },
    processSection:      { type: mongoose.Schema.Types.Mixed, default: null },
    whyUsSection:        { type: mongoose.Schema.Types.Mixed, default: null },
    resultsSection:      { type: mongoose.Schema.Types.Mixed, default: null },

    // ── Meta / Admin ───────────────────────────────────────────────────
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    imageUrl:        { type: String, default: null },
    metaTitle:       { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    schemaData:      { type: mongoose.Schema.Types.Mixed, default: null },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);
export default Service;
