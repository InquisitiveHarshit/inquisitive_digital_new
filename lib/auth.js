import jwt from "jsonwebtoken";
import Admin from "../backend/src/models/Admin.js";
import connectDB from "./mongodb.js";

const JWT_SECRET = process.env.JWT_SECRET || "inquisitive_digital_super_secret_change_in_production";

/**
 * Verifies the authorization header and returns the authenticated admin user.
 * Throws an Error if unauthorized, which should be caught by the route handler.
 * 
 * @param {Request} req - The Next.js Request object
 * @returns {Promise<Object>} The authenticated Admin document
 */
export async function verifyAuth(req) {
  await connectDB();

  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Not authorised — no token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin || !admin.isActive) {
      throw new Error("Not authorised — account not found or inactive");
    }

    return admin;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token expired");
    }
    throw new Error("Invalid token");
  }
}

/**
 * Checks if the verified admin has the super_admin role.
 * 
 * @param {Object} admin - The Admin document returned from verifyAuth
 */
export function checkSuperAdmin(admin) {
  if (admin.role !== "super_admin") {
    throw new Error("Access denied — super admin only");
  }
}
