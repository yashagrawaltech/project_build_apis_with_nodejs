import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0, "Price must be a positive number"],
        },
        stock: {
            type: Number,
            required: [true, "Stock quantity is required"],
            min: [0, "Stock must be a non-negative number"],
        },
        category: {
            type: String,
            required: [true, "Product category is required"],
            enum: [
                "Electronics",
                "Clothing",
                "Home",
                "Books",
                "Beauty",
                "Sports",
                "Toys",
            ], // Example categories
        },
        images: [
            {
                url: {
                    type: String,
                    required: [true, "Image URL is required"],
                },
                altText: {
                    type: String,
                    required: [true, "Image alt text is required"],
                },
            },
        ],
        ratings: {
            average: {
                type: Number,
                default: 0,
                min: [0, "Rating must be at least 0"],
                max: [5, "Rating cannot exceed 5"],
            },
            count: {
                type: Number,
                default: 0,
            },
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
