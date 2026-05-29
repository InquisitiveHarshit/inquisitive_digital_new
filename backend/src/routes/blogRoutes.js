import express from "express";
import { getAllBlogs, getBlogBySlug } from "../controllers/blogController.js";

const router = express.Router();

// GET /api/blogs
router.get("/", getAllBlogs);

// GET /api/blogs/:slug
router.get("/:slug", getBlogBySlug);

export default router;
