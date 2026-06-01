import express from "express";
import { 
  getAdminJobs, 
  createJob, 
  updateJob, 
  deleteJob, 
  getStats 
} from "../controllers/adminController.js";
import { 
  getApplications, 
  getApplicationById, 
  updateApplicationStatus 
} from "../controllers/applicationController.js";
import { validateJob, validateStatusUpdate } from "../middleware/validate.js";

const router = express.Router();

// Stats Endpoint
router.get("/stats", getStats);

// Job Management Endpoints
router.get("/jobs", getAdminJobs);
router.post("/jobs", validateJob, createJob);
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);

// Application Management Endpoints
router.get("/applications", getApplications);
router.get("/applications/:id", getApplicationById);
router.put("/applications/:id/status", validateStatusUpdate, updateApplicationStatus);

export default router;
