import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) {
            throw new Error(
                "something went wrong while fetching products from the database"
            );
        }

        // console.log(products);

        return res.status(201).json({
            success: true,
            message: "all products fetched successfully",
            data: {
                products,
            },
        });
    } catch (error) {
        throw new Error(error.message ? error.message : "something went wrong");
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.isValidObjectId(id)) {
            throw new Error("invalid product id");
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "product not found",
                data: null,
            });
        }

        // console.log(product);

        return res.status(201).json({
            success: true,
            message: "product fetched successfully",
            data: {
                product,
            },
        });
    } catch (error) {
        throw new Error(error.message ? error.message : "something went wrong");
    }
};

export const addProduct = async (req, res) => {
    // console.log("product registration started");
    try {
        const { name, description, price, stock, category, images } = req.body;

        const productData = {
            name,
            description,
            price,
            stock,
            category,
            images,
        };

        // console.log(productData);

        const product = await Product.insertOne(productData);
        if (!product) {
            throw new Error(
                "something went wrong while saving product in the database"
            );
        }

        // console.log(product);

        return res.status(201).json({
            success: true,
            message: "product registered successfully",
            data: {
                product,
            },
        });
    } catch (error) {
        throw new Error(error.message ? error.message : "something went wrong");
    }
};
