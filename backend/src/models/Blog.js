import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      maxlength: [500, "Excerpt cannot exceed 500 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    readTime: {
      type: String,
      default: "5 min read",
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    metaTitle: {
      type: String,
      default: "",
    },
    metaDescription: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      default: "Inquisitive Digital",
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

// Virtual: formatted date for frontend display
blogSchema.virtual("date").get(function () {
  return this.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

blogSchema.set("toJSON", { virtuals: true });

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
