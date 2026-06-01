import { body, validationResult } from "express-validator";

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg
    });
  }
  next();
};

export const validateJob = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("department").trim().notEmpty().withMessage("Department is required"),
  body("location").trim().notEmpty().withMessage("Location is required"),
  body("type")
    .trim()
    .toLowerCase()
    .isIn(["full-time", "part-time", "remote", "contract"])
    .withMessage("Type must be: full-time, part-time, remote, or contract"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("requirements")
    .isArray({ min: 1 })
    .withMessage("Requirements must be a non-empty array"),
  body("requirements.*")
    .trim()
    .notEmpty()
    .withMessage("Requirement value cannot be empty"),
  body("salary_range")
    .optional({ nullable: true })
    .trim(),
  handleValidationErrors
];

export const validateApplication = [
  // Validate that either name or full_name is provided and not empty
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty"),
  body("full_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Full name cannot be empty"),
  body().custom((value) => {
    if (!value.name && !value.full_name) {
      throw new Error("Full Name is required");
    }
    return true;
  }),
  body("email").trim().isEmail().withMessage("Please enter a valid email address"),
  body("phone").trim().notEmpty().withMessage("Phone Number is required"),
  body("cover_letter")
    .optional()
    .trim(),
  body("coverLetter")
    .optional()
    .trim(),
  handleValidationErrors
];

export const validateStatusUpdate = [
  body("status")
    .trim()
    .toLowerCase()
    .isIn(["pending", "shortlisted", "rejected"])
    .withMessage("Status must be: pending, shortlisted, or rejected"),
  handleValidationErrors
];
