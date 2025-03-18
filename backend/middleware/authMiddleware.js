const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const authMiddleware = (req, res, next) => {
    // Get the token from request headers
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // Add user data to request object
        next(); // Move to the next middleware or route
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};
const verifyToken = (req, res, next) => {
    // Your token verification logic
    next();
};

module.exports = { authMiddleware, verifyToken };
