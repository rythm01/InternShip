"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdminUser = exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Define a middleware function that verifies the JWT token and adds the user information to the request
const authenticateUser = (req, res, next) => {
    // Get the JWT token from the request headers
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        if (!token) {
            return res
                .status(401)
                .json({ message: "Authorization header is required" });
        }
        // Verify the JWT token and extract the payload
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "null");
        // console.log(decoded)
        // Add the user information to the request object
        req.user = decoded.id;
        console.log(req.user);
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid JWT token" });
    }
};
exports.authenticateUser = authenticateUser;
// Define a middleware function that verifies the JWT token and adds the user information to the request
const authenticateAdminUser = (req, res, next) => {
    // Get the JWT token from the request headers
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        if (!token) {
            return res
                .status(401)
                .json({ message: "Authorization header is required" });
        }
        // Verify the JWT token and extract the payload
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "null");
        // Add the user information to the request object
        if (decoded.role != "admin")
            return res
                .status(200)
                .json({
                success: false,
                message: "You are not authorized to perform this task.",
            });
        req.admin = decoded.id;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid JWT token" });
    }
};
exports.authenticateAdminUser = authenticateAdminUser;
