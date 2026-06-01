import Job from "../models/Job.js";
import Application from "../models/Application.js";

// GET /api/jobs - Get all active jobs (with search/filtering)
export const getActiveJobs = async (req, res, next) => {
  try {
    const { search, department, type, location } = req.query;
    const query = { is_active: { $ne: false } }; // default to true

    if (department && department !== "All") {
      query.department = { $regex: new RegExp(`^${department}$`, "i") };
    }

    if (type && type !== "All") {
      query.type = type.toLowerCase();
    }

    if (location && location !== "All") {
      query.location = { $regex: new RegExp(`^${location}$`, "i") };
    }

    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { title: searchRegex },
        { department: searchRegex },
        { location: searchRegex }
      ];
    }

    const jobs = await Job.find(query).sort({ created_at: -1 });
    
    res.json({
      success: true,
      data: jobs
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/jobs/:id - Get a single active job
export const getActiveJobById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findOne({ _id: id, is_active: { $ne: false } });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or is no longer active"
      });
    }

    res.json({
      success: true,
      data: job
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/jobs/:id/apply - Apply for a job (multipart/form-data)
export const applyForJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { full_name, email, phone, cover_letter } = req.body;

    // Check if job is active
    const job = await Job.findOne({ _id: id, is_active: { $ne: false } });
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job position not found or is no longer accepting applications"
      });
    }

    // Verify file upload parsed by multer
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume is required"
      });
    }

    // Save Application record
    const application = await Application.create({
      job_id: id,
      full_name,
      email,
      phone,
      cover_letter: cover_letter || "",
      resume_url: `/uploads/resumes/${req.file.filename}`,
      resume_original_name: req.file.originalname
    });

    res.status(201).json({
      success: true,
      data: {
        id: application.id
      }
    });
  } catch (err) {
    next(err);
  }
};
