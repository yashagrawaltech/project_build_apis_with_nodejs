import { Router } from "express";
import { handleValidationErrors, protectedRoute } from "../middlewares/commonMiddlewares.js";
import { getCurrentUser, getUser, loginUser, registerUser } from "../controllers/user.controller.js";
import { validateUser, validateUserForLogin } from "../validators/user.validators.js";

const router = Router();

router.get("/", protectedRoute, getCurrentUser )

router.post("/register", validateUser, handleValidationErrors, registerUser)
router.post("/login", validateUserForLogin, handleValidationErrors, loginUser)

router.get("/:id", getUser )

export default router