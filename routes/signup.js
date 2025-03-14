import express from "express";
import { createUser, verifyOTP } from "../controllers/signup.js";
import { registerTrainer,verifyTrainerOTP } from "../controllers/signup.js";

const router = express.Router();

// Register a new user
router.post("/register", createUser);

// Verify OTP to complete registration
router.post("/verify-otp", verifyOTP);
router.post("/register-trainer", registerTrainer);
router.post("/verify-trainer-otp", verifyTrainerOTP);


export default router;
