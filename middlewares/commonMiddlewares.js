import { validationResult } from "express-validator";
import config from "../config.js";
import User from "../models/user.model.js";
import { decodeAuthToken } from "../utils/utils.js";

// Middleware to handle errors and send a standardized error response
export const errorHandler = (err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message ? err.message : "something went wrong", // Error message to be sent in the response
        success: false,
        stack: config.nodeEnv === "development" ? err.stack : undefined, // Include stack trace only in development mode
        data: null,
        error: err.errors || undefined,
    });
};

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg || "Validation failed");
        error.statusCode = 400;
        error.errors = errors.array(); // Attach all validation errors for reference
        return next(error); // Pass to global error handler
    }

    // console.log("Validation successful");
    next();
};

export const protectedRoute = async (req, res, next) => {
    try {
        // console.log(req.cookies)
        // console.log(req.headers)

        const token =
            (req.cookies && req.cookies.authToken) ||
            (req.headers["authorization"] &&
                req.headers["authorization"].split(" ")[1]);

        // console.log(token);

        if (!token)
            return res.status(401).json({
                success: false,
                message: "unauthorized access",
                data: null,
            });

        const decodedToken = decodeAuthToken(token);
        if (!decodedToken)
            return res.status(401).json({
                success: false,
                message: "unauthorized access",
                data: null,
            });

        // console.log(decodedToken);

        const user = await User.findById(decodedToken.id);
        if (!user)
            return res.status(401).json({
                success: false,
                message: "unauthorized access",
                data: null,
            });

        // console.log(user);

        req.user = user;
        next();
    } catch (error) {
        throw new Error(error.message ? error.message : "something went wrong");
    }
};
