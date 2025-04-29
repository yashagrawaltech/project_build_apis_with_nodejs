import { Router } from "express";
import { handleValidationErrors, protectedRoute } from "../middlewares/commonMiddlewares.js";
import { productValidation } from "../validators/products.validators.js";
import { addProduct, getAllProducts, getProduct } from "../controllers/product.controller.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProduct);

router.post("/", protectedRoute, productValidation, handleValidationErrors, addProduct);

export default router;
