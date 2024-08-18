import express from "express";
import rateLimit from "express-rate-limit";
const router = express.Router();

import {
  signUp,
  signIn,
} from "../services/authService";
import {
  signUpValidator,
  signInValidator,
} from "../utils/validators/authValidator";


// Rate limiter middleware to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});


router.use(limiter);
/**
 * @route   POST /auth/sign-up
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  "/sign-up",
  signUpValidator,
  signUp
);


/**
 * @route   POST /auth/sign-in
 * @desc    Authenticate user and get token
 * @access  Public
 */
router.post("/sign-in", signInValidator, signIn);

export default router;
