import mongoose from "mongoose";

const subServiceSchema = new mongoose.Schema(
  {
    // Main title — renders as H1
    title: {
      type: String,
      required: [true, "Sub-service title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    // Parent service (e.g. "seo-services", "social-media-marketing", etc.)
    parentService: {
      type: String,
      trim: true,
      default: "",
    },
    // Introduction text
    intro: {
      type: String,
      trim: true,
    },
    // Short excerpt for listing cards
    excerpt: {
      type: String,
      trim: true,
    },
    // Structured sections
    sections: [
      {
        heading: { type: String, trim: true },       // H2 heading
        subheading: { type: String, trim: true },     // H3 subheading (optional)
        text: { type: String },                       // paragraph text / HTML
        listItems: [{ type: String }],                // bullet points
        metaLinking: { type: String },                // meta linking
        image: {
          url: { type: String },
          alt: { type: String },
        },
        subsections: [
          {
            subheading: { type: String, trim: true },
            text: { type: String },
            listItems: [{ type: String }],
            metaLinking: { type: String },
            image: {
              url: { type: String },
              alt: { type: String },
            },
          },
        ],
      },
    ],
    // FAQs
    faqs: [
      {
        question: { type: String, trim: true },
        answer:   { type: String, trim: true },
        tag:      { type: String, trim: true, default: "FAQ" },
      },
    ],
    // Hero image
    heroImage: {
      url: { type: String },
      alt: { type: String },
      filename: { type: String },
    },
    heroImageUrl: {
      type: String,
      trim: true,
    },
    heroImageAlt: {
      type: String,
      trim: true,
    },
    // Author
    author: {
      type: String,
      trim: true,
      default: "Inquisitive Digital",
    },
    // Category / tags
    category: {
      type: String,
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    // SEO
    seoTitle: {
      type: String,
      trim: true,
    },
    seoDescription: {
      type: String,
      trim: true,
    },
    // JSON-LD structured data script
    script: {
      type: String,
      trim: true,
      default: "",
    },
    // Admin controls
    isActive: {
      type: Boolean,
      default: true,
    },
    priority: {
      type: Number,
      default: 0,
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug from title
subServiceSchema.pre("validate", async function () {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
});

// If heroImageUrl provided but no heroImage, use it
subServiceSchema.pre("save", async function () {
  if (this.heroImageUrl && (!this.heroImage || !this.heroImage.url)) {
    this.heroImage = {
      url: this.heroImageUrl,
      alt: this.heroImageAlt || this.title,
      filename: "external",
    };
  }
});

// Virtual formatted date
subServiceSchema.virtual("date").get(function () {
  const d = this.publishDate || this.createdAt || new Date();
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(d));
});

subServiceSchema.set("toJSON", { virtuals: true });
subServiceSchema.set("toObject", { virtuals: true });

const SubService = mongoose.models.SubService || mongoose.model("SubService", subServiceSchema);
export default SubService;
