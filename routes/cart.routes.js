import { Router } from "express";
import {
    handleValidationErrors,
    protectedRoute,
} from "../middlewares/commonMiddlewares.js";
import {
    addCartItem,
    deleteCartItem,
    getCartItems,
    editCartItem,
} from "../controllers/cart.controller.js";
import {
    addToCartValidation,
    editCartValidation,
} from "../validators/cart.validators.js";

const router = Router();

router.use(protectedRoute);

router.get("/", getCartItems);
router.post("/", addToCartValidation, handleValidationErrors, addCartItem);
router.put("/:id", editCartValidation, handleValidationErrors, editCartItem);
router.delete("/:id", deleteCartItem);

export default router;
