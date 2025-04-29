import { body } from "express-validator";
import User from "../models/user.model.js";

export const validateUser = [
    body("fullName")
        .notEmpty()
        .withMessage("User's fullname is required")
        .isString()
        .withMessage("User's fullname must be a string"),

    body("email")
        .notEmpty()
        .withMessage("User's email is required")
        .isEmail()
        .withMessage("Please fill a valid email address")
        .normalizeEmail()
        .custom(async (value) => {
            const user = await User.findOne({ email: value });
            if (user) {
                throw new Error("Email already in use");
            }
            return true;
        }),

    body("password")
        .notEmpty()
        .withMessage("User's password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),

    body("mobileNumber")
        .optional()
        .isMobilePhone()
        .withMessage("Please provide a valid mobile number"),

    body("address.street")
        .notEmpty()
        .withMessage("Street address is required")
        .isString()
        .withMessage("Street address must be a string"),

    body("address.city")
        .notEmpty()
        .withMessage("City is required")
        .isString()
        .withMessage("City must be a string"),

    body("address.state")
        .notEmpty()
        .withMessage("State is required")
        .isString()
        .withMessage("State must be a string"),

    body("address.postalCode")
        .notEmpty()
        .withMessage("Postal code is required")
        .isString()
        .withMessage("Postal code must be a string"),

    body("address.country")
        .notEmpty()
        .withMessage("Country is required")
        .isString()
        .withMessage("Country must be a string"),
];

export const validateUserForLogin = [
    body("email")
        .notEmpty()
        .withMessage("User's email is required")
        .isEmail()
        .withMessage("Please fill a valid email address")
        .normalizeEmail()
        .custom(async (value, { req }) => {
            const user = await User.findOne({ email: value });
            if (!user) {
                throw new Error("Email or password is incorrect");
            }
            // Store the user in req for later use
            req.user = user;
            return true;
        }),

    body("password")
        .notEmpty()
        .withMessage("User's password is required")
        .isLength({ min: 6 })
        .withMessage("Email or password is incorrect")
        .custom(async (value, { req }) => {
            const user = req.user; // Get the user from the previous validation step
            if (user) {
                const isMatch = await user.comparePassword(value);
                if (!isMatch) {
                    throw new Error("Email or password is incorrect");
                }
                return true;
            }
            throw new Error("something went wrong");
        }),
];
