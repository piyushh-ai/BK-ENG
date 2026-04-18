import { Router } from "express";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { getAdmin, getAllUsers, getSales, login, register, updateRole } from "../controllers/auth.controller.js";
import { adminAuth, isAuthenticated } from "../middleware/auth.middleware.js";

const authRouter = Router()


/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", registerValidator, register);

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post("/login", loginValidator, login);

/**
 * @route GET /api/auth/admin/me
 * @desc Get current user
 * @access Private
 */
authRouter.get("/admin/me", adminAuth, getAdmin);

/**
 * @route GET /api/auth/sales/me
 * @desc Get current user
 * @access Private
 */
authRouter.get("/sales/me", isAuthenticated, getSales);

/**
 * @route PUT /api/auth/update-role/:id
 * @desc Update user role
 * @access Private
 */
authRouter.put("/update-role/:id", adminAuth, updateRole);

/**
 * @route GET /api/auth/all-users
 * @desc Get all users
 * @access Private
 */
authRouter.get("/all-users", adminAuth, getAllUsers);

export default authRouter
