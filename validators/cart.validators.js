import { body } from "express-validator";

export const addToCartValidation = [
    body("productId")
        .exists()
        .withMessage("Product ID is required")
        .isMongoId()
        .withMessage("Invalid Product ID format"),
];

export const editCartValidation = [
    body("quantity")
        .exists()
        .withMessage("Quantity is required")
        .isInt({ gt: 0 })
        .withMessage("Product quantity must be a positive integer"),
];
