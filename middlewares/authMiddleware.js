import jwt from "jsonwebtoken";
import secretkey from "../config/jwtconfig.js";

function authenticateToken(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No Token Provided" });
    }

    try {
        const decoded = jwt.verify(token, secretkey);
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
}

// Middleware for admin-only access
function authorizeAdmin(req, res, next) {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Access Denied. Admins only" });
    }
    next();
}

export { authenticateToken, authorizeAdmin };
