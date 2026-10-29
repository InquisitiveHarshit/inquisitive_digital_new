import express from "express";
import blogRoutes from "./blogRoutes.js";
import serviceRoutes from "./serviceRoutes.js";
import subServiceRoutes from "./subServiceRoutes.js";
import jobRoutes from "./jobRoutes.js";
import adminBlogRoutes from "./admin/adminBlogRoutes.js";
import adminServiceRoutes from "./admin/adminServiceRoutes.js";
import adminSubServiceRoutes from "./admin/adminSubServiceRoutes.js";
import adminJobRoutes from "./admin/adminJobRoutes.js";
import adminApplicationRoutes from "./admin/adminApplicationRoutes.js";
import adminUploadRoutes from "./admin/uploadRoutes.js";

const router = express.Router();

// ─── Public Routes ────────────────────────────────────────────────────────────
router.use("/blogs", blogRoutes);
router.use("/services", serviceRoutes);
router.use("/sub-services", subServiceRoutes);
router.use("/jobs", jobRoutes);

// ─── Admin Routes ─────────────────────────────────────────────────────────────
// Prefix: /api/admin/*
router.use("/admin/blogs", adminBlogRoutes);
router.use("/admin/services", adminServiceRoutes);
router.use("/admin/sub-services", adminSubServiceRoutes);
router.use("/admin/jobs", adminJobRoutes);
router.use("/admin/applications", adminApplicationRoutes);
router.use("/admin/upload", adminUploadRoutes);

export default router;
