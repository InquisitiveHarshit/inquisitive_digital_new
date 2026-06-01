import Blog from "../models/Blog.js";
import slugify from "slugify";
import { sitemapState } from "../utils/sitemapCache.js";

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC CONTROLLERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /api/blogs
 * Returns all active blogs, newest first.
 * Supports optional ?category=SEO query param for filtering.
 */
export const getAllBlogs = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.category) {
      filter.category = { $regex: req.query.category, $options: "i" };
    }

    const blogs = await Blog.find(filter)
      .select("-content") // exclude heavy content from listing
      .sort({ createdAt: -1 });

    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/blogs/:slug
 * Returns a single blog post by slug.
 */
export const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isActive: true });
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, data: blog });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN CONTROLLERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /api/admin/blogs
 * Returns all blogs including drafts (isActive: false).
 */
export const adminGetAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().select("-content").sort({ createdAt: -1 });
    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/admin/blogs/:id
 * Returns a single blog with full content, by _id.
 */
export const adminGetBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, data: blog });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/admin/blogs
 * Creates a new blog. Auto-generates slug from title if not provided.
 */
export const adminCreateBlog = async (req, res, next) => {
  try {
    const payload = { ...req.body };

    // Auto-generate slug from title if not explicitly provided
    if (!payload.slug && payload.title) {
      payload.slug = slugify(payload.title, { lower: true, strict: true, trim: true });
    } else if (payload.slug) {
      payload.slug = slugify(payload.slug, { lower: true, strict: true, trim: true });
    }

    const blog = await Blog.create(payload);

    sitemapState.bust(); // invalidate sitemap cache
    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/admin/blogs/:id
 * Updates an existing blog. Regenerates slug if title changes.
 */
export const adminUpdateBlog = async (req, res, next) => {
  try {
    // If slug is provided, slugify it. Else if title is updated and no slug provided, generate from title
    if (req.body.slug) {
      req.body.slug = slugify(req.body.slug, { lower: true, strict: true, trim: true });
    } else if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true, trim: true });
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    sitemapState.bust();
    res.json({ success: true, data: blog });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/admin/blogs/:id
 * Hard-deletes a blog by _id.
 */
export const adminDeleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    sitemapState.bust();
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (err) {
    next(err);
  }
};
