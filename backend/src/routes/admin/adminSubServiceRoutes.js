import express from "express";
import {
  adminGetAllSubServices,
  adminGetSubServiceById,
  adminCreateSubService,
  adminUpdateSubService,
  adminDeleteSubService,
} from "../../controllers/subServiceController.js";

const router = express.Router();

// GET    /api/admin/sub-services         — list all (incl. drafts)
router.get("/", adminGetAllSubServices);

// GET    /api/admin/sub-services/:id     — get single sub-service by _id
router.get("/:id", adminGetSubServiceById);

// POST   /api/admin/sub-services         — create sub-service
router.post("/", adminCreateSubService);

// PUT    /api/admin/sub-services/:id     — update sub-service
router.put("/:id", adminUpdateSubService);

// DELETE /api/admin/sub-services/:id     — delete sub-service
router.delete("/:id", adminDeleteSubService);

export default router;
