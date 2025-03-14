import express from 'express';
import { changePassword } from '../controllers/userController.js'; // Adjusted import syntax

const router = express.Router();

// Route for changing the password
router.post('/change-password', changePassword);

export default router;
