import bcrypt from "bcrypt";
import User from "../models/user.js";
import Role from "../models/role.js";
import generateToken from "../utils/jwtUtils.js";

async function login(email, password) {
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        // Fetch role type
        const role = await Role.findById(existingUser.role_id);
        if (!role) {
            throw new Error("User role not found");
        }

        const token = await generateToken(existingUser);
        return { token, role: role.role_type }; // Return role type instead of ObjectId
    } catch (error) {
        console.error("Login Error:", error.message);
        throw error;
    }
}

export default login;
