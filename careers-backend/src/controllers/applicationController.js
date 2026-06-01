import Application from "../models/Application.js";

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
