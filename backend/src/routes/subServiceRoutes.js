import express from "express";
import {
  getAllSubServices,
  getSubServiceBySlug,
} from "../controllers/subServiceController.js";

const router = express.Router();

// GET /api/sub-services       — list active sub-services
router.get("/", getAllSubServices);

// GET /api/sub-services/:slug — get sub-service by slug
router.get("/:slug", getSubServiceBySlug);

export default router;
