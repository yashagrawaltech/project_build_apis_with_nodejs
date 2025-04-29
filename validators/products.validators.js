import { body } from "express-validator";

export const productValidation = [
    body("name")
        .exists()
        .withMessage("Product name is required")
        .isString()
        .withMessage("Product name must be a string")
        .trim(),

    body("description")
        .exists()
        .withMessage("Product description is required")
        .isString()
        .withMessage("Product description must be a string")
        .trim(),

    body("price")
        .exists()
        .withMessage("Product price is required")
        .isNumeric()
        .withMessage("Product price must be a number")
        .isFloat({ min: 0 })
        .withMessage("Price must be a positive number"),

    body("stock")
        .exists()
        .withMessage("Stock quantity is required")
        .isNumeric()
        .withMessage("Stock must be a number")
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative number"),

    body("category")
        .exists()
        .withMessage("Product category is required")
        .isString()
        .withMessage("Product category must be a string")
        .isIn([
            "Electronics",
            "Clothing",
            "Home",
            "Books",
            "Beauty",
            "Sports",
            "Toys",
        ])
        .withMessage("Invalid category"),

    body("images")
        .isArray()
        .withMessage("Images must be an array")
        .optional()
        .custom((images) => {
            if (images.length === 0) {
                throw new Error("At least one image is required");
            }
            images.forEach((image) => {
                if (!image.url || !image.altText) {
                    throw new Error("Each image must have a URL and alt text");
                }
            });
            return true;
        }),
];
