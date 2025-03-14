import express from "express";
import { approveTrainer } from "../controllers/admin.js";
import { authenticateToken,authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/approve-trainer", authenticateToken,authorizeAdmin,approveTrainer);

export default router;
