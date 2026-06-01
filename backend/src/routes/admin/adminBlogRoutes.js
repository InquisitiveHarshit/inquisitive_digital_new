import express from "express";
import {
  adminGetAllBlogs,
  adminGetBlogById,
  adminCreateBlog,
  adminUpdateBlog,
  adminDeleteBlog,
} from "../../controllers/blogController.js";

const router = express.Router();

// GET    /api/admin/blogs         — list all (incl. drafts)
router.get("/", adminGetAllBlogs);

// GET    /api/admin/blogs/:id     — get single blog by _id
router.get("/:id", adminGetBlogById);

// POST   /api/admin/blogs         — create blog
router.post("/", adminCreateBlog);

// PUT    /api/admin/blogs/:id     — update blog
router.put("/:id", adminUpdateBlog);

// DELETE /api/admin/blogs/:id     — delete blog
router.delete("/:id", adminDeleteBlog);

export default router;
