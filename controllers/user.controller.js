import mongoose from "mongoose";
import config from "../config.js";
import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "user data fetched successfully",
            data: {
                user: req.user,
            },
        });
    } catch (error) {
        throw new Error(error.message ? error.message : "something went wrong");
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.isValidObjectId(id))
            return res.status(400).json({
                success: false,
                message: "user not found",
                data: null,
            });

        const user = await User.findById(id);

        if (!user)
            return res.status(400).json({
                success: false,
                message: "user not found",
                data: null,
            });

        return res.status(200).json({
            success: true,
            message: "user data fetched successfully",
            data: {
                user,
            },
        });
    } catch (error) {
        throw new Error(error.message ? error.message : "something went wrong");
    }
};

export const registerUser = async (req, res) => {
    // console.log("user registration started");
    try {
        const { fullName, email, password, mobileNumber, address } = req.body;

        const userData = {
            fullName,
            email,
            password,
            mobileNumber,
            address,
        };

        // console.log(userData);

        const user = await User.insertOne(userData);
        if (!user) {
            throw new Error(
                "something went wrong while saving user in the database"
            );
        }

        // console.log(user);

        const savedUser = await User.findOne({ email });
        if (!savedUser) {
            throw new Error(
                "something went wrong while saving user in the database"
            );
        }

        // console.log(savedUser);

        const token = await savedUser.generateAuthToken();
        if (!token) {
            throw new Error("something went wrong while generating auth token");
        }

        // console.log(token);

        const cookieOptions = {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            secure: config.nodeEnv === "production", // Use secure cookies in production
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Set cookie expiration to 1 day
        };

        return res
            .status(201)
            .cookie("authToken", token, cookieOptions)
            .json({
                success: true,
                message: "user registered successfully",
                data: {
                    user: savedUser,
                    token,
                },
            });
    } catch (error) {
        throw new Error(error.message ? error.message : "something went wrong");
    }
};

export const loginUser = async (req, res) => {
    try {
        const { user } = req;
        // console.log(user)
        const token = user.generateAuthToken();

        const cookieOptions = {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            secure: config.nodeEnv === "production", // Use secure cookies in production
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Set cookie expiration to 1 day
        };

        return res.status(200).cookie("authToken", token, cookieOptions).json({
            success: true,
            message: "user loggedin successfully",
            data: {
                user,
                token,
            },
        });
    } catch (error) {
        throw new Error(error.message ? error.message : "something went wrong");
    }
};
