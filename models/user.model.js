import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import config from "../config.js";
import jwt from "jsonwebtoken";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const addressSchema = new Schema(
    {
        street: {
            type: String,
            required: [true, "Street address is required"],
        },
        city: {
            type: String,
            required: [true, "City is required"],
        },
        state: {
            type: String,
            required: [true, "State is required"],
        },
        postalCode: {
            type: String,
            required: [true, "Postal code is required"],
        },
        country: {
            type: String,
            required: [true, "Country is required"],
        },
    },
    {
        _id: false, // Prevents creating a separate _id for the address subdocument
    }
);

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: [true, "User's fullname is required"],
        },
        email: {
            type: String,
            required: [true, "User's email is required"],
            unique: true,
            index: true,
            match: [emailRegex, "Please fill a valid email address"],
        },
        password: {
            type: String,
            required: [true, "User's password is required"],
            min: 6
        },
        cart: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
        mobileNumber: {
            type: String,
            index: true,
        },
        address: addressSchema,
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next(); // Call next() to proceed with saving
    }

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
});

userSchema.methods.comparePassword = async function (passwordArg) {
    // console.log(passwordArg)
    // console.log(await bcrypt.compare(passwordArg, this.password))
    return await bcrypt.compare(passwordArg, this.password);
};

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id }, config.jwt_secret, {
        expiresIn: "1d", // Token expiration time
    });
    return token;
};

const User = mongoose.model("User ", userSchema);

export default User;
