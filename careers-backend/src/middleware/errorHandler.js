export const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.stack || err.message}`);

  // Handle Multer size limits or custom extension validation errors
  if (err.code === "LIMIT_FILE_SIZE" || err.message?.includes("Only PDF, DOC, DOCX files are allowed")) {
    return res.status(400).json({
      success: false,
      message: "Only PDF, DOC, DOCX files are allowed. Max 5MB."
    });
  }

  // Handle mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: messages.join(". ")
    });
  }

  // Handle mongoose CastError (e.g. invalid UUID format lookup)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format"
    });
  }

  // Default fallback
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error"
  });
};
