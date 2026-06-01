import express from "express";
import {
  adminGetAllServices,
  adminGetServiceById,
  adminCreateService,
  adminUpdateService,
  adminDeleteService,
} from "../../controllers/serviceController.js";

const router = express.Router();

// GET    /api/admin/services       — list all (incl. inactive)
router.get("/", adminGetAllServices);

// GET    /api/admin/services/:id   — get single service by _id
router.get("/:id", adminGetServiceById);

// POST   /api/admin/services       — create service
router.post("/", adminCreateService);

// PUT    /api/admin/services/:id   — update service
router.put("/:id", adminUpdateService);

// DELETE /api/admin/services/:id   — delete service
router.delete("/:id", adminDeleteService);

export default router;
