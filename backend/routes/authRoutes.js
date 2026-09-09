import express from "express";

import {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
  verifyEmail,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

import { validate } from "../middleware/validateMiddleware.js";

import { registerSchema, loginSchema } from "../validations/authValidation.js";

import {
  loginRateLimiter,
  registerRateLimiter,
} from "../middleware/rateLimitMiddleware.js";

import {
  generateCsrfToken,
} from "../middleware/csrfMiddleware.js";

const router = express.Router();

// Register
router.post(
  "/register",
  registerRateLimiter,
  validate(registerSchema),
  registerUser,
);

// Login
router.post(
  "/login",
  loginRateLimiter,
  validate(loginSchema),
  loginUser,
);

router.get("/verify-email/:token", verifyEmail);

// Current user
router.get("/me", protect, getMe);

// Logout
router.post("/logout", logoutUser);

// CSRF-token
router.get("/csrf-token", (req, res) => {
  const csrfToken = generateCsrfToken(req, res);

  return res.status(200).json({
    success: true,
    data: {
      csrfToken,
    },
  });
});

export default router;
