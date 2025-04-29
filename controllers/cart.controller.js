import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getCartItems = async (req, res) => {
    try {
        const { _id } = req.user._id;

        const cart = await User.aggregate([
            {
                $match: { _id: _id }, // Match the user by their _id
            },
            {
                $unwind: "$cart", // Unwind the cart array to get individual product IDs
            },
            {
                $lookup: {
                    from: "products", // The name of the Product collection
                    localField: "cart", // Field from the User collection
                    foreignField: "_id", // Field from the Product collection
                    as: "cartItems", // Output array field
                },
            },
            {
                $unwind: "$cartItems", // Unwind the cartItems array to get individual product details
            },
            {
                $group: {
                    _id: "$cartItems._id", // Group by product ID
                    item: { $first: "$cartItems" }, // Get the product details
                    totalQuantity: { $sum: 1 }, // Count each occurrence as 1
                },
            },
            {
                $project: {
                    item: 1, // Include product details
                    quantity: "$totalQuantity", // Rename totalQuantity to quantity
                },
            },
        ]);

        if (!cart) {
            return res.status(400).json({
                success: false,
                message: "unabe to fetch cart items",
                data: null,
            });
        }

        return res.status(200).json({
            success: true,
            message: "cart items fetched successfully",
            data: {
                cart,
            },
        });
    } catch (error) {
        throw new Error(error.message ? error.message : "something went wrong");
    }
};

export const addCartItem = async (req, res) => {
    const { productId } = req.body;

    req.user.cart.push(productId);
    await req.user.save();

    return res.status(200).json({
        success: true,
        message: "item added to cart successfully",
        data: {
            cart: req.user.cart,
        },
    });
};

export const deleteCartItem = async (req, res) => {
    const { id } = req.params;

    if (!id || !mongoose.isValidObjectId(id)) {
        throw new Error("invalid product id");
    }

    const filteredCartItems = req.user.cart.filter(
        (i) => i._id.toString() !== id
    );

    // console.log(filteredCartItems);

    if (filteredCartItems) {
        req.user.cart = [...filteredCartItems];
        await req.user.save();
    }

    return res.status(200).json({
        success: true,
        message: "item deleted from cart successfully",
        data: {
            cart: req.user.cart,
        },
    });
};

export const editCartItem = async (req, res) => {
    const { quantity } = req.body;

    const { id } = req.params;

    if (!id || !mongoose.isValidObjectId(id)) {
        throw new Error("invalid product id");
    }

    const product = req.user.cart.find((i) => i._id.toString() === id);

    if (!product) {
        return res.status(400).json({
            success: false,
            message: "item not found in cart",
            data: null,
        });
    }

    const filteredCartItems = req.user.cart.filter(
        (i) => i._id.toString() !== id
    );

    // console.log(filteredCartItems);

    const newArray = new Array(quantity).fill(id);

    // console.log(newArray);

    req.user.cart = [...filteredCartItems, ...newArray];
    await req.user.save();

    return res.status(200).json({
        success: true,
        message: "item quantity updated successfully",
        data: {
            cart: req.user.cart,
        },
    });
};
