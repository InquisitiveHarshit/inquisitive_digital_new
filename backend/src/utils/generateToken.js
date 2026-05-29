import jwt from "jsonwebtoken";

/**
 * Generates a signed JWT for an admin user.
 * @param {string} id - Mongoose Admin document _id
 * @returns {string} Signed JWT string
 */
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};
