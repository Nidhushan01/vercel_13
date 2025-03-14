import userService from "../services/signup.js";
import OTP from "../models/otp.js";
import sendOTP from "../utils/mailer.js";

async function createUser(req, res) {
    try {
        const { email, password } = req.body;

        // Check if the user already exists
        const existingUser = await userService.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Generate OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP in MongoDB
        await OTP.create({ email, otp: otpCode });

        // Send OTP via email
        await sendOTP(email, otpCode);

        res.status(200).json({ message: "OTP sent to email. Verify to complete registration." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

async function verifyOTP(req, res) {
    try {
        const { email, otp, password } = req.body;

        // Verify OTP
        const user = await userService.verifyOTP(email, otp, password);

        res.status(200).json({ message: "Registration complete. You are now a customer.", user });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}
async function registerTrainer(req, res) {
    try {
        const { email, password } = req.body;
        const existingUser = await userService.findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        await OTP.create({ email, otp: otpCode });
        await sendOTP(email, otpCode);

        res.status(200).json({ message: "OTP sent to email. Verify to complete registration." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function verifyTrainerOTP(req, res) {
    try {
        const { email, otp, password } = req.body;
        const user = await userService.verifyOTP(email, otp, password, "trainer");

        res.status(200).json({ message: "Trainer registration complete. Waiting for admin approval.", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



export { createUser, verifyOTP, registerTrainer,verifyTrainerOTP};
