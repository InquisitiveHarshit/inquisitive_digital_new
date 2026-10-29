import SubService from "../models/SubService.js";
import slugify from "slugify";
import { sitemapState } from "../utils/sitemapCache.js";

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC CONTROLLERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /api/sub-services
 * Returns all active sub-services.
 * Supports optional ?category= and ?parentService= query params.
 */
export const getAllSubServices = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.category) {
      filter.category = { $regex: req.query.category, $options: "i" };
    }
    if (req.query.parentService) {
      filter.parentService = { $regex: req.query.parentService, $options: "i" };
    }

    const subServices = await SubService.find(filter)
      .sort({ priority: -1, createdAt: -1 });

    res.json({ success: true, count: subServices.length, data: subServices });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/sub-services/:slug
 * Returns a single sub-service by slug.
 */
export const getSubServiceBySlug = async (req, res, next) => {
  try {
    const subService = await SubService.findOne({ slug: req.params.slug, isActive: true });
    if (!subService) {
      return res.status(404).json({ success: false, message: "Sub-service not found" });
    }
    res.json({ success: true, data: subService });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN CONTROLLERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /api/admin/sub-services
 * Returns all sub-services including drafts (isActive: false).
 */
export const adminGetAllSubServices = async (req, res, next) => {
  try {
    const subServices = await SubService.find().sort({ priority: -1, createdAt: -1 });
    res.json({ success: true, count: subServices.length, data: subServices });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/admin/sub-services/:id
 * Returns a single sub-service with full content, by _id.
 */
export const adminGetSubServiceById = async (req, res, next) => {
  try {
    const subService = await SubService.findById(req.params.id);
    if (!subService) {
      return res.status(404).json({ success: false, message: "Sub-service not found" });
    }
    res.json({ success: true, data: subService });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/admin/sub-services
 * Creates a new sub-service. Auto-generates slug from title if not provided.
 */
export const adminCreateSubService = async (req, res, next) => {
  try {
    const payload = { ...req.body };

    if (!payload.slug && payload.title) {
      payload.slug = slugify(payload.title, { lower: true, strict: true, trim: true });
    } else if (payload.slug) {
      payload.slug = slugify(payload.slug, { lower: true, strict: true, trim: true });
    }

    const subService = await SubService.create(payload);

    sitemapState.bust(); // invalidate sitemap cache
    res.status(201).json({ success: true, data: subService });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/admin/sub-services/:id
 * Updates an existing sub-service. Regenerates slug if title changes.
 */
export const adminUpdateSubService = async (req, res, next) => {
  try {
    if (req.body.slug) {
      req.body.slug = slugify(req.body.slug, { lower: true, strict: true, trim: true });
    } else if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true, trim: true });
    }

    const subService = await SubService.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!subService) {
      return res.status(404).json({ success: false, message: "Sub-service not found" });
    }

    sitemapState.bust();
    res.json({ success: true, data: subService });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/admin/sub-services/:id
 * Deletes a sub-service by _id.
 */
export const adminDeleteSubService = async (req, res, next) => {
  try {
    const subService = await SubService.findByIdAndDelete(req.params.id);
    if (!subService) {
      return res.status(404).json({ success: false, message: "Sub-service not found" });
    }

    sitemapState.bust();
    res.json({ success: true, message: "Sub-service deleted successfully" });
  } catch (err) {
    next(err);
  }
};
