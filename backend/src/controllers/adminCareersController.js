import Job from "../models/Job.js";
import Application from "../models/Application.js";

// GET /api/admin/jobs - Get all jobs with application count
export const getAdminJobs = async (req, res, next) => {
  try {
    const jobs = await Job.aggregate([
      {
        $lookup: {
          from: "applications",
          localField: "_id",
          foreignField: "job_id",
          as: "applications"
        }
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          title: 1,
          department: 1,
          location: 1,
          type: 1,
          description: 1,
          requirements: 1,
          salary_range: 1,
          is_active: 1,
          created_at: 1,
          updated_at: 1,
          applications_count: { $size: "$applications" }
        }
      },
      {
        $sort: { created_at: -1 }
      }
    ]);

    res.json({
      success: true,
      data: jobs
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/admin/jobs - Create a new job listing
export const createJob = async (req, res, next) => {
  try {
    const { title, department, location, type, description, requirements, salary_range } = req.body;

    const job = await Job.create({
      title,
      department,
      location,
      type: type.toLowerCase(),
      description,
      requirements,
      salary_range: salary_range || null
    });

    res.status(201).json({
      success: true,
      data: job
    });
  } catch (err) {
    next(err);
  }
};

// PUT /api/admin/jobs/:id - Update job fields (including is_active toggle)
export const updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
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

// DELETE /api/admin/jobs/:id - Delete job listing and associated applications
export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // Cascade delete all applications for this job
    await Application.deleteMany({ job_id: id });

    res.json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/applications - Get all applications (with job title and department populated)
export const getApplications = async (req, res, next) => {
  try {
    const { job_id, status } = req.query;
    const query = {};

    if (job_id && job_id !== "All") {
      query.job_id = job_id;
    }

    if (status && status !== "All") {
      query.status = status.toLowerCase();
    }

    // Populate Job details (title and department)
    const applications = await Application.find(query)
      .populate("job_id", "title department")
      .sort({ applied_at: -1 });

    res.json({
      success: true,
      data: applications
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/applications/:id - Get a single application with full job details
export const getApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id).populate("job_id");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    res.json({
      success: true,
      data: application
    });
  } catch (err) {
    next(err);
  }
};

// PUT /api/admin/applications/:id/status - Update application status only
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      id,
      { status: status.toLowerCase() },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    res.json({
      success: true,
      data: application
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/stats - Retrieve dashboard overview numbers
export const getStats = async (req, res, next) => {
  try {
    const total_jobs = await Job.countDocuments();
    const active_jobs = await Job.countDocuments({ is_active: { $ne: false } });
    const total_applications = await Application.countDocuments();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const new_this_week = await Application.countDocuments({
      applied_at: { $gte: sevenDaysAgo }
    });

    res.json({
      success: true,
      data: {
        total_jobs,
        active_jobs,
        total_applications,
        new_this_week
      }
    });
  } catch (err) {
    next(err);
  }
};
