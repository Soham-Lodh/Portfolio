// middleware/authAdmin.js

import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Token missing.",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Validate admin
    if (
      decoded.email !== process.env.ADMIN_EMAIL ||
      decoded.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }

    // Attach admin data to request
    req.admin = decoded;

    next();
  } catch (err) {
    console.error("Admin auth error:", err);

    return res.status(401).json({
      success: false,
      message: "Authorization failed.",
      error: err.message,
    });
  }
};

export default authAdmin;