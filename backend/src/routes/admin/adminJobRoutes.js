import express from "express";
import { getAdminJobs, createJob, updateJob, deleteJob } from "../../controllers/adminCareersController.js";
import { validateJob } from "../../middleware/careersValidate.js";

const router = express.Router();

router.get("/", getAdminJobs);
router.post("/", validateJob, createJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;
