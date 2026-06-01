import express from "express";
import { getApplications, getApplicationById, updateApplicationStatus, getStats } from "../../controllers/adminCareersController.js";
import { validateStatusUpdate } from "../../middleware/careersValidate.js";

const router = express.Router();

router.get("/", getApplications);
router.get("/stats", getStats);
router.get("/:id", getApplicationById);
router.put("/:id/status", validateStatusUpdate, updateApplicationStatus);

export default router;
