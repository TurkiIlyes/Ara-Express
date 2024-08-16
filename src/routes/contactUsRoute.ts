import express from "express";
import rateLimit from "express-rate-limit";
const router = express.Router();

import { contactUs } from "../services/contactUsService";
import { contactUsValidator } from "../utils/validators/contactUsValidator";

// Rate limiter middleware to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});

router.use(limiter);
/**
 * @route   POST /sign-up
 * @desc    Register a new user
 * @access  Public
 */
router.post("/", contactUsValidator, contactUs);

export default router;
