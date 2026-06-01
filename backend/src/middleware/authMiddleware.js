import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

/**
 * Middleware: Verify JWT and attach admin to req.admin
 * Usage: add `protect` to any admin route that needs authentication
 */
export const protect = async (req, res, next) => {
  try {
    // 1. Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorised — no token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Fetch admin (exclude password)
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin || !admin.isActive) {
      return res.status(401).json({
        success: false,
        message: "Not authorised — account not found or inactive",
      });
    }

    // 4. Attach to request
    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

/**
 * Middleware: Restrict to super_admin role only
 * Must be used AFTER `protect`
 */
export const superAdminOnly = (req, res, next) => {
  if (req.admin?.role !== "super_admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied — super admin only",
    });
  }
  next();
};
