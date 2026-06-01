import express from "express";
import rateLimit from "express-rate-limit";
import { getActiveJobs, getActiveJobById, applyForJob } from "../controllers/jobController.js";
import { upload } from "../config/multer.js";
import { validateApplication } from "../middleware/validate.js";

const router = express.Router();

// Rate limiting: 100 req/15min public
const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again after 15 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiting: 20 req/15min on /apply
const applyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Too many application attempts, please try again after 15 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Route mapping
router.get("/", publicLimiter, getActiveJobs);
router.get("/:id", publicLimiter, getActiveJobById);
router.post("/:id/apply", applyLimiter, upload.single("resume"), validateApplication, applyForJob);

export default router;
