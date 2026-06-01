import express from "express";
import { getAllServices, getServiceBySlug } from "../controllers/serviceController.js";

const router = express.Router();

// GET /api/services
router.get("/", getAllServices);

// GET /api/services/:slug
router.get("/:slug", getServiceBySlug);

export default router;
