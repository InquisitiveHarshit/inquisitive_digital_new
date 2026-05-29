/**
 * Global error handler — must be the LAST middleware registered in server.js
 * Catches errors from next(err) calls anywhere in the app.
 */
export const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);

  // Mongoose duplicate key error (e.g. duplicate slug)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `A record with that ${field} already exists`,
    });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: messages.join(". "),
    });
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid ID format`,
    });
  }

  // Default: 500
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};
