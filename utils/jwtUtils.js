import jwt from "jsonwebtoken";
import secretkey from "../config/jwtconfig.js";  
import Role from "../models/role.js";  // Import Role model

async function generateToken(user) {
    const role = await Role.findById(user.role_id); // Fetch role details

    const payload = {
        id: user._id,
        email: user.email,
        role: role ? role.role_type : "unknown",  // Store role type instead of ObjectId
    };

    return jwt.sign(payload, secretkey, { expiresIn: "1h" });
}

export default generateToken;
