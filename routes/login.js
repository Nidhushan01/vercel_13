import express from "express";
import cors from "cors";
import { login } from "../controllers/login.js";  // Use curly braces {}


const router = express.Router();

router.post("/login", cors(), login);

export default router;