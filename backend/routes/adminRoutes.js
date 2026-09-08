import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin-only route
router.get("/dashboard", protect, authorizeRoles("admin"), (req, res) => {
  return res
    .status(200)
    .json({
      success: true,
      message: "Welcome to Admin Dashboard",
      data: { user: req.user },
    });
});

export default router;
