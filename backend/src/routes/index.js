import express from "express";
import blogRoutes from "./blogRoutes.js";
import serviceRoutes from "./serviceRoutes.js";
import adminBlogRoutes from "./admin/adminBlogRoutes.js";
import adminServiceRoutes from "./admin/adminServiceRoutes.js";

const router = express.Router();

// ─── Public Routes ────────────────────────────────────────────────────────────
router.use("/blogs", blogRoutes);
router.use("/services", serviceRoutes);

// ─── Admin Routes ─────────────────────────────────────────────────────────────
// Prefix: /api/admin/*
router.use("/admin/blogs", adminBlogRoutes);
router.use("/admin/services", adminServiceRoutes);

export default router;
