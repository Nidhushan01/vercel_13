import User from "../models/user.js";
import OTP from "../models/otp.js";
import bcrypt from "bcrypt";
import Role from "../models/role.js";

// Find user by email
async function findUserByEmail(email) {
    return await User.findOne({ email });
}

// Create a user after OTP verification
async function createUser(userData) {
    const { email, password, roleType } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = await Role.findOne({ role_type: roleType });

    if (!role) {
        throw new Error(`${roleType} role not found. Please check your roles collection.`);
    }

    const isTrainer = roleType === "trainer";
    const newUser = new User({
        email,
        password: hashedPassword,
        role_id: role._id,
        isVerified: true,
        isApproved: !isTrainer // Trainers require admin approval
    });

    return await newUser.save();
}

async function verifyOTP(email, otp, password, roleType = "customer") {  // Default roleType is "customer"
    const storedOTP = await OTP.findOne({ email, otp });

    if (!storedOTP) {
        throw new Error("Invalid or expired OTP");
    }

    await OTP.deleteOne({ email, otp });

    return await createUser({ email, password, roleType });
}


export default { findUserByEmail, createUser, verifyOTP };
