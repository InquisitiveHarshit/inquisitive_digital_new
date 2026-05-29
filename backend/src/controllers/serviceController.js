import Service from "../models/Service.js";
import slugify from "slugify";
import { sitemapState } from "../utils/sitemapCache.js";

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC CONTROLLERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /api/services
 * Returns all active services, ordered by the `order` field.
 */
export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isActive: true })
      .select("-description") // exclude heavy content from listing
      .sort({ order: 1, createdAt: -1 });

    res.json({ success: true, count: services.length, data: services });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/services/:slug
 * Returns a single service with full content, by slug.
 */
export const getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isActive: true });
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN CONTROLLERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /api/admin/services
 * Returns all services including inactive ones.
 */
export const adminGetAllServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: services.length, data: services });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/admin/services/:id
 * Returns a single service by _id (full data).
 */
export const adminGetServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/admin/services
 * Creates a new service. Auto-generates slug from title.
 */
export const adminCreateService = async (req, res, next) => {
  try {
    const { title, shortDescription, description, icon, imageUrl,
            features, deliverables, isActive, order, metaTitle, metaDescription } = req.body;

    const slug = slugify(title, { lower: true, strict: true, trim: true });

    const service = await Service.create({
      title, slug, shortDescription, description, icon, imageUrl,
      features, deliverables, isActive, order, metaTitle, metaDescription,
    });

    sitemapState.bust();
    res.status(201).json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/admin/services/:id
 * Updates an existing service. Regenerates slug if title changes.
 */
export const adminUpdateService = async (req, res, next) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true, trim: true });
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    sitemapState.bust();
    res.json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/admin/services/:id
 * Hard-deletes a service by _id.
 */
export const adminDeleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    sitemapState.bust();
    res.json({ success: true, message: "Service deleted successfully" });
  } catch (err) {
    next(err);
  }
};
